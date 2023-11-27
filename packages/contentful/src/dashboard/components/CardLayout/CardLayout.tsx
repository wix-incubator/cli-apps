import React from 'react';
import { Card } from '@wix/design-system';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export default function CardLayout({ children, title }: Props) {
	return (
		<Card>
			<Card.Content>
				<Card.Header title={title}/>
				<Card.Divider />
				<Card.Content>{children}</Card.Content>
			</Card.Content>
		</Card>
	);
}
