import React from "react";
import {
  WixIdentity,
  WixIdentityPicker,
} from "../components/WixIdentityPicker";
import { Button, SidePanel } from "@wix/design-system";

export function SettingsSidePanel(props: {
  open: boolean;
  onClose: () => void;
  onSave: (wixIdentity: WixIdentity | null) => void;
}) {
  const [selectedIdentity, setSelectedIdentity] =
    React.useState<WixIdentity | null>(null);

  const right = props.open ? 0 : -440;

  return (
    <div
      className={`absolute top-0 h-full shadow-left transition-all z-50`}
      style={{ right }}
    >
      <SidePanel onCloseButtonClick={props.onClose}>
        <SidePanel.Header title="Wix Identity" />
        <SidePanel.Content>
          <WixIdentityPicker
            value={selectedIdentity}
            onChange={setSelectedIdentity}
          />
        </SidePanel.Content>
        <SidePanel.Footer>
          <Button
            onClick={() => {
              props.onSave(selectedIdentity);
              setSelectedIdentity(null);
            }}
            fullWidth
            disabled={selectedIdentity === null}
          >
            Save
          </Button>
        </SidePanel.Footer>
      </SidePanel>
    </div>
  );
}
