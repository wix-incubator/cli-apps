import { HttpResponse, graphql, http } from "msw";
import { setupServer } from "msw/node";
import { mockGetOAuthAppsQuery } from "../src/gql/graphql";

export const wixApisMockServer = setupServer(
  mockGetOAuthAppsQuery(() => {
    return HttpResponse.json({
      data: {
        authManagementOAuthAppsV1OAuthApps: {
          items: [
            {
              id: "1",
              name: "Website",
            },
            {
              id: "2",
              name: "Mobile App",
            },
          ],
        },
      },
    });
  }),
  graphql.query("IntrospectionQuery", () => {
    return HttpResponse.json({});
  }),
  http.post("https://www.wixapis.com/oauth2/token", () => {
    return HttpResponse.json({
      access_token: "123",
    });
  })
);
