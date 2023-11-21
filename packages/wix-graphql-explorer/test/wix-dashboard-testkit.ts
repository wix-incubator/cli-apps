import { Host, ObserveState, StateObserver } from "@wix/dashboard-react";

export function dashboardPageProps() {
  const host: Host = {
    channel: {
      observeState: ((callback: StateObserver<{}, {}>) => {
        callback({}, {});
        return {
          disconnect() {},
        };
      }) as ObserveState,
      updateHeight: () => {},
      closeModal: () => {},
      openModal: () => ({
        modalClosed: Promise.resolve(null),
      }),
      getAccessToken: () => Promise.resolve(""),
      navigate(): void {},
      showToast: () => ({
        remove() {
          return;
        },
      }),
    },
  };
  return { host };
}
