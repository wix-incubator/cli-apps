import React from 'react';
import {
	Box,
	CustomModalLayout,
	TextButton,
	Loader,
	Dropdown,
} from '@wix/design-system';
import { useDashboard } from '@wix/dashboard-react';
import { useTranslation } from 'react-i18next';
import { getItems } from '../../hooks/items-service';
import { ShareUrlModal } from '../ShareUrlModal/ShareUrlModal';
import { ExtensionProps } from '../../types/types';
import { Item } from '../LinksDashboardPage/items';

export const SelectModal = (props: Item) => {
	const { closeModal } = useDashboard();
	const { t } = useTranslation();
	const { isLoading, data } = getItems(props);
	const [selectedId, setSelectedId] = React.useState<string>('');
	const [shareModalProps, setShareModalProps] = React.useState<ExtensionProps>(
    {} as ExtensionProps,
	);

	const handleCloseClick = () => {
		closeModal?.();
	};

	const openModal = () => {
		let componentData;
		if (props.containerId) {
			const menuItems = (
        props as any
			)._giza_environment.gizaApi.getContainerMenuItems(props.containerId);
			const compId = menuItems.find((item: any) => item.menuItem).componentId;
			const model = menuItems.find((item: any) => item.Extension).Extension()
				.props.appModel;
			componentData =
        model.componentsById[compId].compData.backOfficeExtension.menuItem
        	.action.openComponent.componentParams;
		}
		setShareModalProps({
			...componentData,
			...props.extension,
			...props,
			selectedId,
		});
	};

	return (
		<>
			{!isLoading && shareModalProps.selectedId ? (
				<ShareUrlModal {...shareModalProps} />
			) : !isLoading && !shareModalProps.selectedId ? (
				<CustomModalLayout
					dataHook="container"
					primaryButtonText={t('Select')}
					title={t('Select Item')}
					onCloseButtonClick={handleCloseClick}
					primaryButtonOnClick={openModal}
					sideActions={
						<TextButton
							dataHook="CancelButton"
							size="small"
							onClick={handleCloseClick}
						>
							{t('links-modal.cancel')}
						</TextButton>
					}
				>
					{
						<div style={{ height: '200px' }}>
							<Box>
								<Dropdown
									maxHeightPixels={180}
									options={data?.map((item) => ({
										id: item.id,
										value: item.name,
									}))}
									onSelect={(item) => setSelectedId(item.id as string)}
								/>
							</Box>
						</div>
					}
				</CustomModalLayout>
			) : (
				<Loader />
			)}
		</>
	);
};
