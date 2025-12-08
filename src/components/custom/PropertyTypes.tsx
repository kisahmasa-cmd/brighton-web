"use client"

import React, {useState} from "react";
import CardPropertyType from "@/components/custom/CardPropertyType";
import {PrimaryType} from "../../../types/property-types";
import {Agent} from "../../../types/agent-types";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../ui/carousel";
import ModalImage from "@/components/custom/ModalImage";
import {Photo} from "../../../types/api-types";
import dynamic from "next/dynamic";

interface PropertyTypesProps {
  types: PrimaryType[],
  agents: Agent | Agent[],
  propertyLink?: string,
  propertyTitle?: string
}

const PropertyTypes = ({types, agents, propertyLink, propertyTitle}: PropertyTypesProps) => {
  const [showFullscreenVariant, setShowFullscreenVariant] = useState(false);
  const [fullscreenIndexVariant, setFullscreenIndexVariant] = useState(0);

  if (!types || types.length === 0) return null;

  const getVariantImages = (): Photo[] => {
    return types.map((item) => item.Photo) || [];
  };

  const handleVariantClick = (index: number) => {
    setFullscreenIndexVariant(index);
    setShowFullscreenVariant(true);
  };

  return (
    <>
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Tipe Unit dan Harga
        </h2>
        <Carousel opts={{align: "start"}}>
          <CarouselContent>
            {types.map((variant, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 pb-4">
                <CardPropertyType
                  key={variant.ID}
                  type={variant}
                  agents={agents}
                  propertyTitle={propertyTitle}
                  propertyLink={propertyLink}
                  onClick={() => handleVariantClick(index)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 cursor-pointer shadow-lg"/>
          <CarouselNext className="right-0 translate-x-1/2 cursor-pointer shadow-lg"/>
        </Carousel>
      </div>

      {showFullscreenVariant && types && (
        <ModalImage
          images={getVariantImages()}
          initialIndex={fullscreenIndexVariant}
          onClose={() => setShowFullscreenVariant(false)}
        />
      )}
    </>
  );
};

export default PropertyTypes;
