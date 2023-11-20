export type languageType = { id: number; value: string };

export interface settingsFieldType {
  label: string;
  placeholder: string;
  errorStatusMessage: string;
  infoContent?: string;
}

export interface ExternalDatabaseConnectionType {
  configuration: {
    spaceId: string;
    environmentId: string;
    secretKey: string;
    apiKey: string;
    locale: string;
  };
  endpoint: string;
  name: string;
}
