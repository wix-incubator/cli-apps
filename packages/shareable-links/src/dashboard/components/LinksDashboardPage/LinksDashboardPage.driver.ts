// import { screen } from '@testing-library/react';
// import { createDriver } from '@wix/bookings-jest-tests-utils';
// import {
//   ButtonTestkit,
//   TextButtonTestkit,
// } from '@wix/design-system/dist/testkit';
// import { mockHasConnectedPaymentMethods } from '../../../__tests__/mocks/api/cashier';
// import {
//   mockGetLinksSettings,
//   mockIsSiteReallyPublished,
// } from '../../../__tests__/mocks/api/links';
// import { mockAppsPendingStatus } from '../../../__tests__/mocks/api/managedApps';
// import { mockGetServicesCount } from '../../../__tests__/mocks/api/services';
// import { delay } from '../../utils/delay';
// import { DataHook } from '../DataHook';
// import { LinksDashboardPage } from './LinksDashboardPage';
//
// export const LinksDashboardPageDriver = createDriver({
//   Component: LinksDashboardPage,
//   defaultMountProps: {
//     apiMocks: {
//       getServicesCount: mockGetServicesCount(1),
//       getLinksSettings: mockGetLinksSettings(),
//       appsPendingStatus: mockAppsPendingStatus(),
//       isSiteReallyPublished: mockIsSiteReallyPublished(),
//       hasConnectedPaymentMethods: mockHasConnectedPaymentMethods(),
//     },
//   },
//   extend: ({ baseElement }) => {
//     const getLearnMoreButtonTestkit = () =>
//       TextButtonTestkit({
//         wrapper: baseElement,
//         dataHook: DataHook.DashboardPage.LearnMoreButton,
//       });
//     const getCreateLinkServiceListButtonTestkit = () =>
//       ButtonTestkit({
//         wrapper: baseElement,
//         dataHook: DataHook.DashboardPage.CreateLinkServiceListButton,
//       });
//     const getCreateLinkServicePageButtonTestkit = () =>
//       ButtonTestkit({
//         wrapper: baseElement,
//         dataHook: DataHook.DashboardPage.CreateLinkServicePageButton,
//       });
//     const getCreateLinkServiceCalendarButtonTestkit = () =>
//       ButtonTestkit({
//         wrapper: baseElement,
//         dataHook: DataHook.DashboardPage.CreateLinkServiceCalendarButton,
//       });
//     const getCreateLinkPricingPlansButtonTestkit = () =>
//       ButtonTestkit({
//         wrapper: baseElement,
//         dataHook: DataHook.DashboardPage.CreateLinkPricingPlansButton,
//       });
//
//     return {
//       waitForLoading: async () => {
//         await screen.findByTestId(DataHook.DashboardPage.Container);
//         await delay(100);
//       },
//       clickLearnMoreButton: async () => getLearnMoreButtonTestkit().click(),
//       clickCreateLinkServiceListButton: async () =>
//         getCreateLinkServiceListButtonTestkit().click(),
//       clickCreateLinkServiceCalendarButton: async () =>
//         getCreateLinkServiceCalendarButtonTestkit().click(),
//       clickCreateLinkServicePageButton: async () =>
//         getCreateLinkServicePageButtonTestkit().click(),
//       clickCreateLinkPricingPlansButton: async () =>
//         getCreateLinkPricingPlansButtonTestkit().click(),
//     };
//   },
// });
