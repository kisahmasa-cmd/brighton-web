"use client";

import * as React from "react";
import { Agent } from "../../../types/agent-types";
import AgentAdsPopup from "./AgentAdsPopup";

interface AgentAdsPopupWrapperProps {
  data: Agent;
  IDCodeWA?: string;
  TitleWA?: string;
  LinkWA?: string;
}

const AgentAdsPopupWrapper: React.FC<AgentAdsPopupWrapperProps> = ({ data, IDCodeWA, LinkWA, TitleWA }) => {
  const popupRef = React.useRef<{ openDialog: () => void }>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      popupRef.current?.openDialog();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <AgentAdsPopup
        data={data}
        onReady={(actions) => {
          popupRef.current = actions;
        }}
        IDCodeWA={IDCodeWA}
        LinkWA={LinkWA}
        TitleWA={TitleWA}
      />
    </div>
  );
};

export default AgentAdsPopupWrapper;
