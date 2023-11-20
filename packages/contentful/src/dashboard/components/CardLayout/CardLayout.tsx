import React from 'react';
import { TextButton, Card } from '@wix/design-system';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export default function CardLayout({ children, title }: Props) {
	const openDocs = () =>
		window.open('https://github.com/wix-incubator/cli-apps/tree/master/packages/contentful', '_blank');

	return (
		<Card>
			<Card.Content>
				<Card.Header title={title} suffix={<TextButton onClick={openDocs}>Documentation</TextButton>}/>
				<Card.Divider />
				<Card.Content>{children}</Card.Content>
			</Card.Content>
		</Card>
	);
}
