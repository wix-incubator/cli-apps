
import { ExternalLink, GetStarted } from '@wix/wix-ui-icons-common';
import React from 'react';
import {
	WixIdentity,
	WixIdentityPicker,
} from '../components/WixIdentityPicker';
import graphqlLogo from './graphql_logo.png';
import { Button, Card, EmptyState, Image, TextButton } from '@wix/design-system';

export function GrapiQLEmptyState(props: {
  onSelectIdentity: (identity: WixIdentity) => void;
}) {
	const [selectedIdentity, setSelectedIdentity] =
    React.useState<WixIdentity | null>(null);

	return (
		<EmptyState
			image={
				<Image fit="contain" height="100px" src={graphqlLogo} transparent />
			}
			title="Explore the Wix GraphQL API"
			subtitle="Experiment with the Wix GraphQL API using the GraphiQL IDE."
			theme="page"
		>
			<div className="flex flex-col space-y-4">
				<Card>
					<Card.Subheader title="Wix Identity for GraphQL Queries" />
					<Card.Content>
						<WixIdentityPicker
							value={selectedIdentity}
							onChange={setSelectedIdentity}
						/>
						<div className="mt-4">
							<Button
								prefixIcon={<GetStarted />}
								disabled={selectedIdentity === null}
								onClick={() => {
									if (selectedIdentity) {
										props.onSelectIdentity(selectedIdentity);
										setSelectedIdentity(null);
									}
								}}
							>
                Go
							</Button>
						</div>
					</Card.Content>
				</Card>
				<div>
					<a href="https://dev.wix.com/docs/graphql" target="_blank" rel="noreferrer">
						<TextButton prefixIcon={<ExternalLink />}>
              Wix GraphQL API Documentation
						</TextButton>
					</a>
				</div>
			</div>
		</EmptyState>
	);
}
