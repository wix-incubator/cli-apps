import { useQuery } from '@tanstack/react-query';
import { useWix } from '@wix/sdk-react';
import React from 'react';
import { graphql } from '../../gql';
import { Badge, Box, Card, Dropdown, Heading, Layout, Radio, Text } from '@wix/design-system';

export type WixIdentity =
	| {
		type: 'Visitor';
		clientId: string;
		appName: string;
	}
	| {
		type: 'User';
	};

export function WixIdentityPicker(props: {
	value: WixIdentity | null;
	onChange: (value: WixIdentity | null) => void;
}) {
	const wix = useWix();

	const oauthApps = useQuery(['oauthApps'], () =>
		wix.graphql(
			graphql(`
        query GetOAuthApps {
          authManagementOAuthAppsV1OAuthApps {
            items {
              id
              name
            }
          }
        }
      `)
		)
	);

	const [selectedIdentityType, setSelectedIdentityType] = React.useState<
		'Visitor' | 'User' | null
	>(props.value?.type ?? null);

	return (
		<Layout cols={1} gap="12px">
			<Card>
				<Radio
					checked={selectedIdentityType === 'Visitor'}
					onChange={() => {
						setSelectedIdentityType('Visitor');
						props.onChange(null);
					}}
					label={
						<Box direction="vertical" className="items-start">
							<Heading size="small">Visitor</Heading>
							<Text size="small" secondary>
								Anonymous visitor access to business data
							</Text>
						</Box>
					}
				/>
				{selectedIdentityType === 'Visitor' && (
					<Dropdown
						status={oauthApps.isLoading ? 'loading' : undefined}
						placeholder="Please select an OAuth app"
						onSelect={(option) => {
							props.onChange({
								type: 'Visitor',
								clientId: option.id as string,
								appName: option.value as string,
							});
						}}
						className="mt-5"
						inContainer
						options={
							oauthApps.data?.data?.authManagementOAuthAppsV1OAuthApps?.items?.map(
								(oAuthApp) => ({
									id: oAuthApp!.id!,
									value: oAuthApp!.name!,
								})
							) ?? []
						}
					/>
				)}
			</Card>
			<Card>
				<Radio
					checked={selectedIdentityType === 'User'}
					onChange={() => {
						setSelectedIdentityType('User');
						props.onChange({ type: 'User' });
					}}
					label={
						<Box direction="vertical" className="items-start">
							<Heading size="small">Logged In User</Heading>
							<Text size="small" secondary>
								Query and manipulate business data on behalf of the logged in
								user
							</Text>
						</Box>
					}
				/>
				{selectedIdentityType === 'User' && (
					<Badge skin="warningLight" className="mt-2">
						⚠️ Using this option can mutate your business data
					</Badge>
				)}
			</Card>
		</Layout>
	);
}
