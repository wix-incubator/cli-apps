import calendar from '../../assets/images/calendar.png';
import serviceList from '../../assets/images/service_list.png';
import servicePage from '../../assets/images/service_page.png';
import productPage from '../../assets/images/product_page.png';
import category from '../../assets/images/category.png';
import { ExtensionProps } from '../../types/types';

export interface Item {
  title: string;
  subtitle: string;
  image: string;
  entity: string;
  dataCollectionId: string;
  entityField: string;
  containerId?: string;
  extension?: ExtensionProps;
}

export const apps: Record<string, string> = {
	'13d21c63-b5ec-5912-8397-c3a5ddb27a97': 'Wix Bookings',
	'215238eb-22a5-4c36-9e7b-e7c08025e04e': 'Wix Stores',
};

export const items: Record<string, Item[]> = {
	'13d21c63-b5ec-5912-8397-c3a5ddb27a97': [
		{
			title: 'links-page.card.services-list.title',
			subtitle: 'links-page.card.services-list.subtitle',
			image: serviceList,
			entity: 'service',
			dataCollectionId: 'Bookings/Staff',
			entityField: 'name',
			extension: {
				dataCollectionId: 'Bookings/Services',
				fieldName: '_id',
				redirectField: 'bookingsBook',
				redirectIdentifier: 'resourceId',
			},
		},
		{
			title: 'links-page.card.calendar.title',
			subtitle: 'links-page.card.calendar.subtitle',
			image: calendar,
			entity: 'service',
			dataCollectionId: 'Bookings/Schedule',
			entityField: 'name',
		},
		{
			title: 'links-page.card.service.title',
			subtitle: 'links-page.card.service.subtitle',
			image: servicePage,
			entity: 'service',
			dataCollectionId: 'Bookings/Services',
			entityField: 'serviceName',
		},
	],
	'215238eb-22a5-4c36-9e7b-e7c08025e04e': [
		{
			title: 'links-page.card.product.title',
			subtitle: 'links-page.card.product.subtitle',
			image: productPage,
			entity: 'product',
			dataCollectionId: 'Stores/Products',
			entityField: 'name',
			containerId: '5c6c70b7-5041-404d-81b6-1f7ce19acf0f',
		},
		{
			title: 'links-page.card.category.title',
			subtitle: 'links-page.card.category.subtitle',
			image: category,
			entity: 'category',
			dataCollectionId: 'Stores/Collections',
			entityField: 'name',
		},
	],
};
