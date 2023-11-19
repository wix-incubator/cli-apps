import React from 'react';
import { Layout, Page } from '@wix/design-system';

interface Props {
  children?: React.ReactNode;
  dataHook?: string;
  title?: string;
}

export default function PageLayout({
	children,
	dataHook = '',
	title = '',
}: Props) {
	return (
		<Page>
			<Page.Header dataHook={dataHook} title={title} />
			<Page.Content>
				<Layout>{children}</Layout>
			</Page.Content>
		</Page>
	);
}
