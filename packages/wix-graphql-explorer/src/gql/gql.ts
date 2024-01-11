/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n        query GetOAuthApps {\n          authManagementOAuthAppsV1OAuthApps {\n            items {\n              id\n              name\n            }\n          }\n        }\n      ": types.GetOAuthAppsDocument,
    "\n\t\tquery GetMembers {\n\t\t\tmembersMembersV1Members {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tprofile {\n\t\t\t\t\t\tnickname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t  ": types.GetMembersDocument,
    "\n\t\tquery GetOAuthApps {\n\t\t  authManagementOAuthAppsV1OAuthApps {\n\t\t\titems {\n\t\t\t  id\n\t\t\t  name\n\t\t\t}\n\t\t  }\n\t\t}\n\t  ": types.GetOAuthAppsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query GetOAuthApps {\n          authManagementOAuthAppsV1OAuthApps {\n            items {\n              id\n              name\n            }\n          }\n        }\n      "): typeof import('./graphql').GetOAuthAppsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery GetMembers {\n\t\t\tmembersMembersV1Members {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\tprofile {\n\t\t\t\t\t\tnickname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t  "): typeof import('./graphql').GetMembersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery GetOAuthApps {\n\t\t  authManagementOAuthAppsV1OAuthApps {\n\t\t\titems {\n\t\t\t  id\n\t\t\t  name\n\t\t\t}\n\t\t  }\n\t\t}\n\t  "): typeof import('./graphql').GetOAuthAppsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
