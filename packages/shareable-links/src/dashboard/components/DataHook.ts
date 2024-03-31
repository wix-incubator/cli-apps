export const DataHook = {
	DashboardPage: {
		Container: 'links-dashboard',
		LearnMoreButton: 'links-dashboard-learn-more',
		CreateLinkServicePageButton:
      'links-dashboard-create-link-service-page-button',
		CreateLinkServiceListButton:
      'links-dashboard-create-link-service-list-button',
		CreateLinkServiceCalendarButton:
      'links-dashboard-create-link-service-calendar-button',
		CreateLinkPricingPlansButton:
      'links-dashboard-create-link-pricing-plans-button',
	},
	LinkSettingsModal: {
		Container: 'links-dashboard-link-settings-modal',
	},
	LinkOptionsModal: {
		Container: 'links-dashboard-link-options-modal',
		CancelButton: 'links-dashboard-link-options-modal-cancel-button',
		TypeDropdown: 'links-dashboard-link-options-modal-type-dropdown',
		StaffDropdown: 'links-dashboard-link-options-modal-staff-dropdown',
		ServicesDropdown: 'links-dashboard-link-options-modal-services-dropdown',
		LocationsDropdown: 'links-dashboard-link-options-modal-locations-dropdown',
	},
	ShareUrlModal: {
		Container: 'links-dashboard-share-url-modal',
		CancelButton: 'links-dashboard-share-url-modal-cancel-button',
		Label: 'share-url-modal-label',
		ShortLinkButton: 'short-link-cta',
		UrlInput: 'copy-link-text-box',
		ShortLinkNotificationError: 'short-link-notification-error',
		CopyLinkButton: 'copy-link-button',
		ErrorNotification: 'short-link-notification',
		ShareOptions: {
			QRCode: 'share-options-qr-code',
		},
	},
} as const;
