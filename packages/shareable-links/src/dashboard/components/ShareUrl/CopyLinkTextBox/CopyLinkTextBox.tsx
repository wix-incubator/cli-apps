import {
	Box,
	CopyClipboard,
	Input,
	Text,
	TextButton,
} from '@wix/design-system';
import { DuplicateSmall, StatusCompleteFilled } from '@wix/wix-ui-icons-common';
import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
const CopiedIndication = () => {
	const {t} = useTranslation();

	return (
		<Box
			dataHook="copied-url-indication"
			verticalAlign="middle"
			gap="6px"
			alignSelf="center"
			color="#25A55A"
		>
			<StatusCompleteFilled />
			<Text weight="thin" size="small">
				{t('links-page.url-text-box.copied')}
			</Text>
		</Box>
	);
};

const CopyCta = ({ onClickCopy }: { onClickCopy: MouseEventHandler }) => {
	const {t} = useTranslation();

	return (
		<Box verticalAlign="middle" gap="9px" alignSelf="center">
			<TextButton
				dataHook="CopyLinkButton"
				onClick={onClickCopy}
				size="small"
				prefixIcon={<DuplicateSmall />}
			>
				{t('links-page.url-text-box.copy')}
			</TextButton>
		</Box>
	);
};

export const CopyLinkTextbox = ({
	url,
}: {
  url: string;
}) => {
	return (
		<CopyClipboard value={url} resetTimeout={3000}>
			{({ isCopied, copyToClipboard }) => (
				<Input
					dataHook="url-input"
					readOnly
					size="large"
					suffix={
						(
							<Box paddingRight="12px">
								{isCopied ? (
									<CopiedIndication />
								) : (
									<CopyCta
										onClickCopy={() => {
											copyToClipboard?.();
										}}
									/>
								)}
							</Box>
						)
					}
					value={url}
				/>
			)}
		</CopyClipboard>
	);
};
