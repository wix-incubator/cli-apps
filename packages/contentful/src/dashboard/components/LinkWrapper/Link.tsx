import React from 'react';
import {TextButton} from '@wix/design-system';
import type { TextButtonProps } from '@wix/design-system/dist/types/TextButton';

export type LinkProps = {
  children?: React.ReactNode,
  url: string,
} & TextButtonProps;

export const Link = ({children, url, ...textButtonProps}: LinkProps) => {
	return <TextButton onClick={() => window.open(url, '_blank')} {...textButtonProps}>{children}</TextButton>;
};
