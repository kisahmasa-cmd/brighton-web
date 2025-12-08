"use client";

import React, { useEffect, useRef } from "react";
import PropertyAdsPopup, { PropertyAdsPopupVariant } from "./PropertyAdsPopup";
import { Property } from "../../../types/property-types";

interface PropertyAdsPopupWrapperProps {
  variant: PropertyAdsPopupVariant;
  data: Property;
}

const PropertyAdsPopupWrapper: React.FC<PropertyAdsPopupWrapperProps> = ({
  variant,
  data,
}) => {
  const popupRef = useRef<{ openDialog: () => void }>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      popupRef.current?.openDialog();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <PropertyAdsPopup
        variant={variant}
        data={data}
        onReady={(actions) => {
          popupRef.current = actions;
        }}
      />
    </div>
  );
};

export default PropertyAdsPopupWrapper;
