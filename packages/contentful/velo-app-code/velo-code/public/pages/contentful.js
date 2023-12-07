// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import React, { useState, useEffect } from 'react';
import { render, W } from '@wix/react-velo';
import wixLocation from 'wix-location';
import wixFetch from 'wix-fetch';
import { addIntegration } from 'backend/add-integration';

function App() {
    const [spaces, setSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState({ id: '', value: '' });
    const [environments, setEnvironments] = useState([]);
    const [selectedEnv, setSelectedEnv] = useState({ id: '', value: '' });
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({ id: '', value: '' });
    const [urlParams, setUrlParams] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [isConnectingInProgress, setIsConnectingInProgress] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(wixLocation.url.split('#')[1]);
        setUrlParams(params);
    }, ['']);

    useEffect(() => {
        urlParams &&
            wixFetch
            .fetch('https://api.contentful.com/spaces', {
                method: 'GET',
                headers: { Authorization: `Bearer ${urlParams.get('access_token')}` },
            })
            .then(res => res.json())
            .then(data => {
                setSpaces(
                    data.items.map((space) => ({
                        value: space.sys.id,
                        label: space.name,
                    }))
                );
            });
    }, [urlParams]);

    useEffect(() => {
        selectedSpace.id &&
            wixFetch.fetch(
                `https://api.contentful.com/spaces/${selectedSpace.id}/environments`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${urlParams.get('access_token')}`,
                    },
                }
            )
            .then(res => res.json())
            .then((data) => {
                setEnvironments(
                    data.items.map((env) => ({ value: env.sys.id, label: env.name }))
                );
            });
    }, [selectedSpace]);

       useEffect(() => {
        selectedEnv.id &&
            wixFetch.fetch(
                `https://api.contentful.com/spaces/${selectedSpace.id}/environments/${selectedEnv.id}/locales`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${urlParams.get('access_token')}`,
                    },
                }
            )
            .then(res => res.json())
            .then((data) => {
                setLanguages(
                    data.items.map((locale) => ({ value: locale.code, label: locale.name }))
                );
            });
    }, [selectedEnv]);

    const connect = () => {
        setIsConnectingInProgress(true);
        const state = JSON.parse(urlParams.get('state'))
        const wixCode = state.code;
        const authorization = state.authorization;
        const token = urlParams.get('access_token');

        return addIntegration({ contentfulToken: token, wixCode, spaceId: selectedSpace.id, envId: selectedEnv.id, apiKey, authorization, locale: selectedLanguage.id })
            .then(data => {
                setIsConnectingInProgress(false);
                if (state.alreadyInstalled) {
                    return wixLocation.to('https://manage.wix.com/contentful-funnel-nextjs/close-window');
                } else if (data.accessToken) {
                    return wixLocation.to(
                        `https://www.wix.com/installer/close-window?access_token=${data.accessToken}`
                    );
                }
            })
            .catch(err => {
                setIsConnectingInProgress(false);
                console.error(err);
            });
    };

    return (
    <W.container>
        <W.spaces options={spaces} onChange={(e) =>
            setSelectedSpace({
                id: e.target.value
            })} />
        <W.envs options={environments} onChange={(e) =>
            setSelectedEnv({
                id: e.target.value
            })} />
        <W.languages options={languages} onChange={(e) =>
            setSelectedLanguage({
            id: e.target.value
                })} />
        <W.apiKey onChange={(e) => setApiKey(e.target.value)} value={apiKey}/>
        <W.connect onClick={connect} label={isConnectingInProgress ? 'Loading' : 'Connect'}/>
    </W.container>
    );
}

$w.onReady(() => render(App, $w, React));