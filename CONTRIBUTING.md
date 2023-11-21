# Contribution Guidelines

## Setup

### Requirements

- Setup your node version to match the one specified in the `.nvmrc` file. (Check out [`fnm`](https://github.com/Schniz/fnm) for easy node version management)

### Installation

This repository uses [Yarn](https://yarnpkg.com/) as its package manager. To install the dependencies, run:

```bash
yarn
```

## Running the Apps

To run the Apps locally, you'll first have to create your Wix App to have permissions to work with the Wix CLI (you won't have permissions on the Apps in this repository unless you are a Collaborator).

### Create a Wix App

1. Go to [Wix Developers](https://dev.wix.com/) and sign in with your Wix account.
2. Click on the **My Apps** tab.
3. Click on the **Create New App** button.
4. Copy the `App ID` of your new App.
5. Replace the `appId` value in the relevant `wix.config.json`.

### Run the local development server

To run the local development server, run the following command in the relevant App directory:

```bash
yarn dev
```

## Code Style

This repository uses ESLint to enforce a consistent code style and best practices. Make sure to lint your code before committing, or configure your IDE to lint and format on save.

## Testing

Changes to the Apps in this repository should be covered by tests. The repository uses Vitest as the test runner, and we strive to cover our code with integration tests. Check out the existing tests to get an idea of what tests to write. To run the tests, run the following command in the relevant App directory:

```bash
yarn test
```
