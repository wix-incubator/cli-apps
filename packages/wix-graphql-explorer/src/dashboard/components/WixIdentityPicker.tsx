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
	} | {
		type: 'Member';
		clientId: string;
		appName: string;
		memberId: string;
		memberNickname: string;
	};

export function WixIdentityPicker(props: {
	value: WixIdentity | null;
	onChange: (value: WixIdentity | null) => void;
}) {
	const [selectedIdentityType, setSelectedIdentityType] = React.useState<
		'Visitor' | 'Member' | 'User' | null
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
					<OAuthAppPicker
						onChange={(value) => {
							props.onChange({
								type: 'Visitor',
								clientId: value.id,
								appName: value.name,
							});
						}}
					/>
				)}
			</Card>
			<Card>
				<Radio
					checked={selectedIdentityType === 'Member'}
					onChange={() => {
						setSelectedIdentityType('Member');
						props.onChange(null);
					}}
					label={
						<Box direction="vertical" className="items-start">
							<Heading size="small">Member</Heading>
							<Text size="small" secondary>
								Access and acf on behald of a specific member
							</Text>
						</Box>
					}
				/>
				{selectedIdentityType === 'Member' && (
					<MemberPicker onChange={(value) => {
						props.onChange({
							type: 'Member',
							clientId: value.clientId,
							appName: value.appName,
							memberId: value.memberId,
							memberNickname: value.memberNickname,
						});
					}} />
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

export function MemberPicker(props: {
	value?: { clientId: string; appName: string; memberId: string; memberNickname: string };
	onChange?: (value: { clientId: string; appName: string; memberId: string; memberNickname: string }) => void;
}) {
	const wix = useWix();
	const [selectedMember, setSelectedMember] = React.useState<{ id: string; nickname: string } | null>(
		props.value ? { id: props.value.memberId, nickname: props.value.memberNickname } : null
	);

	const members = useQuery(['members'], () =>
		wix.graphql(
			graphql(`
		query GetMembers {
			membersMembersV1Members {
				items {
					id
					profile {
						nickname
					}
				}
			}
		}
	  `)
		)
	);

	return (
		<>
			<Dropdown
				status={members.isLoading ? 'loading' : undefined}
				placeholder="Please select a member"
				onSelect={(option) => {
					setSelectedMember({ id: option.id as string, nickname: option.value as string });
				}}
				className="mt-5"
				inContainer
				options={
					members.data?.data?.membersMembersV1Members?.items?.map((member) => ({
						id: member!.id!,
						value: member!.profile!.nickname!,
					})) ?? []
				}
			/>
			{selectedMember && (
				<OAuthAppPicker
					onChange={(value) => {
						props.onChange?.({
							clientId: value.id,
							appName: value.name,
							memberId: selectedMember.id,
							memberNickname: selectedMember.nickname,
						});
					}}
				/>
			)}
		</>
	);
}

export function OAuthAppPicker(props: {
	value?: { id: string; name: string };
	onChange?: (value: { id: string; name: string }) => void;
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

	return (
		<Dropdown
			status={oauthApps.isLoading ? 'loading' : undefined}
			placeholder="Please select an OAuth app"
			onSelect={(option) => {
				props.onChange?.({ id: option.id as string, name: option.value as string });
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
	);
}