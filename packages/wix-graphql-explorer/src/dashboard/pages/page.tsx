import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { IconButton, Page, Badge } from "@wix/design-system";
import { OAuthStrategy, createClient, useWix } from "@wix/sdk-react";
import { Settings } from "@wix/wix-ui-icons-common";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import React, { useMemo } from "react";
import { GrapiQLEmptyState } from "../components/GraphiQLEmptyState";
import { SettingsSidePanel } from "../components/SettingsSidePanel";
import { WixIdentity } from "../components/WixIdentityPicker";
import withLayout from "../layout";

export default withLayout(function Index() {
  const { fetcher, fetcherWixIdentity, setFetcherWixIdentity } =
    useGraphQLFetcher();

  const [sidePanelOpen, setSidePanelOpen] = React.useState(false);

  return (
    <div className="overflow-x-hidden h-full relative">
      <div id="page-main-pane" className="flex flex-col h-full p-5 space-y-4">
        <Page.Header
          title="Wix GraphQL Explorer"
          subtitle="Execute GraphQL queries against the Wix GraphQL API with your own business data."
          actionsBar={
            fetcherWixIdentity && (
              <div className="space-x-4">
                <Badge type="solid">
                  Identity:{" "}
                  {fetcherWixIdentity.type === "User"
                    ? "Logged In User"
                    : `Visitor (OAuth App: ${fetcherWixIdentity?.appName})`}
                </Badge>
                <IconButton
                  onClick={() => {
                    setSidePanelOpen(true);
                  }}
                >
                  <Settings />
                </IconButton>
              </div>
            )
          }
        />
        {fetcherWixIdentity !== null ? (
          <div className="grow">
            <GraphiQL fetcher={fetcher} />
          </div>
        ) : (
          <GrapiQLEmptyState onSelectIdentity={setFetcherWixIdentity} />
        )}
      </div>
      <SettingsSidePanel
        open={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        onSave={(wixIdentity) => {
          setFetcherWixIdentity(wixIdentity);
          setSidePanelOpen(false);
        }}
      />
    </div>
  );
});

function useGraphQLFetcher() {
  const wix = useWix();

  const [fetcherWixIdentity, setFetcherWixIdentity] =
    React.useState<WixIdentity | null>(null);

  return {
    setFetcherWixIdentity,
    fetcherWixIdentity,
    fetcher: useMemo(
      () =>
        createGraphiQLFetcher({
          url: "https://www.wixapis.com/graphql/alpha",
          async fetch(input, init) {
            const headers = new Headers(init?.headers);
            if (fetcherWixIdentity?.type === "Visitor") {
              const { headers: authHeaders } = await createClient({
                auth: OAuthStrategy({ clientId: fetcherWixIdentity.clientId }),
              }).auth.getAuthHeaders();
              headers.set("Authorization", authHeaders.Authorization);
            } else if (fetcherWixIdentity?.type === "User") {
              const { headers: authHeaders } = await wix.auth.getAuthHeaders();
              headers.set("Authorization", authHeaders.Authorization);
            }
            // @ts-expect-error fetch types from DOM and node are not compatible
            return fetch(input, { ...init, headers });
          },
        }),
      [fetcherWixIdentity]
    ),
  };
}
