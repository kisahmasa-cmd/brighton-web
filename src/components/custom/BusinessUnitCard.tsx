// src/components/custom/BusinessUnitCard.tsx
"use client";
import { useState } from "react";
import { BusinessUnitData } from "../../../types/business-unit-types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, ChevronUp, Building2, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BusinessUnitCardProps {
  isOpen: boolean;
  onToggle: () => void;
  businessUnit: BusinessUnitData;
}

export default function BusinessUnitCard({ businessUnit, isOpen, onToggle }: BusinessUnitCardProps) {
  // Main office is the businessUnit itself
  const mainOffice = businessUnit;
  // Sub-offices are in Subs array
  const subOffices = businessUnit.Subs || [];
  const totalLocations = 1 + subOffices.length;

  const businessName = businessUnit.Alias || businessUnit.Name;

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden">
        <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            {/* <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-yellow-600" />
            </div> */}
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 text-lg">{businessName}</h3>
              <p className="text-sm text-gray-500">
                {mainOffice.City}, {mainOffice.Location?.Province?.Title || mainOffice.ProvinceName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-label-xl sm:text-sm">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{totalLocations} lokasi</span>
            {isOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-6 pb-6">
          <div className="space-y-4 mt-4">
            {/* Main Office */}
            <div className="px-6 py-4 border-l-2 border-yellow-400 bg-yellow-50 rounded-r-lg">
              <div className="flex items-start justify-between gap-4 mb-2">
                <Link href={`alamat-kantor/detail/${mainOffice?.Path || "#"}`}>
                  <h4 className="font-bold text-gray-900 text-base">{mainOffice.Name}</h4>
                </Link>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full whitespace-nowrap">Kantor Utama</span>
              </div>

              <div className="space-y-2 text-label-xl sm:text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                  <div>
                    <p className="leading-relaxed">{mainOffice.Address}</p>
                    <p className="text-gray-500 mt-1">
                      {mainOffice.City}
                      {mainOffice.Location?.Province?.Title && `, ${mainOffice.Location.Province.Title}`}
                      {mainOffice.MapURL && (
                        <>
                          <br />
                          <a href={mainOffice.MapURL} target="_blank" rel="noindex nofollow" aria-label="Lihat lokasi di Google Maps">
                            <Badge className="text-gray-800">
                              <ExternalLink />
                              Lihat Map
                            </Badge>
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {mainOffice.Phone && (
                  <div className="flex items-center gap-2 text-label-xl sm:text-sm">
                    <Phone className="w-4 h-4 flex-shrink-0 text-gray-400 btn-contact-phone" />
                    <a href={`tel:${mainOffice.Phone}`} className="text-yellow-600 hover:text-yellow-700 hover:underline">
                      {mainOffice.Phone}
                    </a>
                  </div>
                )}

                {mainOffice.Email && (
                  <div className="flex items-center gap-2 text-label-xl sm:text-sm">
                    <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <a href={`mailto:${mainOffice.Email}`} className="text-yellow-600 hover:text-yellow-700 hover:underline break-all">
                      {mainOffice.Email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Sub Offices */}
            {subOffices.map((subOffice) => (
              <div key={subOffice.ID} className="px-6 py-4 border-l-2 border-gray-300 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Link href={`alamat-kantor/detail/${subOffice?.Path || "#"}`}>
                    <h4 className="font-bold text-gray-900 text-base">{subOffice.Name}</h4>
                  </Link>
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full whitespace-nowrap">Cabang</span>
                </div>

                <div className="space-y-2 text-label-xl sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <div>
                      <p className="leading-relaxed">{subOffice.Address}</p>
                      <p className="text-gray-500 mt-1">
                        {subOffice.City}
                        {subOffice.Location?.Province?.Title && `, ${subOffice.Location.Province.Title}`}
                        {subOffice.MapURL && (
                          <>
                            <br />
                            <a href={subOffice.MapURL} target="_blank" rel="noindex nofollow" aria-label="Lihat lokasi di Google Maps">
                              <Badge className="text-gray-800">
                                <ExternalLink />
                                Lihat Map
                              </Badge>
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {subOffice.Phone && (
                    <div className="flex items-center gap-2 text-label-xl sm:text-sm">
                      <Phone className="w-4 h-4 flex-shrink-0 text-gray-400 btn-contact-phone" />
                      <a href={`tel:${subOffice.Phone}`} className="text-yellow-600 hover:text-yellow-700 hover:underline">
                        {subOffice.Phone}
                      </a>
                    </div>
                  )}

                  {subOffice.Email && (
                    <div className="flex items-center gap-2 text-label-xl sm:text-sm">
                      <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                      <a href={`mailto:${subOffice.Email}`} className="text-yellow-600 hover:text-yellow-700 hover:underline break-all">
                        {subOffice.Email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
