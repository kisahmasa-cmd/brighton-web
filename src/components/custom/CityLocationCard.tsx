// src/components/custom/CityLocationCard.tsx
"use client";
import { useState } from "react";
import { CityData } from "../../../types/business-unit-types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CityLocationCardProps {
  isOpen: boolean;
  onToggle: () => void;
  city: CityData;
}

export default function CityLocationCard({ city, isOpen, onToggle }: CityLocationCardProps) {
  const units = city.Units || [];

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden">
        <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-yellow-500" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 text-lg">{city.Title}</h3>
              <p className="text-sm text-gray-500">{city.Province?.Title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{units?.length ?? 0} lokasi</span>
            {isOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-6 pb-6 bg-white">
          {units?.length === 0 ? (
            <p className="text-gray-500 text-sm italic mt-2">Tidak ada lokasi tersedia di kota ini.</p>
          ) : (
            <div className="space-y-4 mt-4">
              {units.map((unit) => (
                <div key={unit.ID} className="px-6 py-4 border-l-2 border-yellow-400 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <Link href={`alamat-kantor/detail/${unit?.Path || "#"}`}>
                          <h4 className="font-bold text-gray-900 text-base">{unit.Name}</h4>
                        </Link>
                        {unit.ClassName === "OfficeData" && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">Kantor</span>}
                        {unit.ClassName === "OfficeHubData" && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap">Hub</span>}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                          <p className="leading-relaxed">
                            {unit.Address}

                            {unit.CityName && (
                              <>
                                ,<br />
                                {unit.CityName}
                              </>
                            )}

                            {unit.ProvinceName && (
                              <>
                                ,<br />
                                {unit.ProvinceName}
                              </>
                            )}

                            {unit.PostalCode && (
                              <>
                                ,<br />
                                {unit.PostalCode}
                              </>
                            )}

                            {unit.MapURL && (
                              <>
                                <br />
                                <a href={unit.MapURL} target="_blank" rel="noindex nofollow" aria-label="Lihat lokasi di Google Maps">
                                  <Badge className="text-gray-800">
                                    <ExternalLink />
                                    Lihat Map
                                  </Badge>
                                </a>
                              </>
                            )}
                          </p>
                        </div>

                        {unit.Phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 flex-shrink-0 text-gray-400 btn-contact-phone" />
                            <a href={`tel:${unit.Phone}`} className="text-yellow-600 hover:text-yellow-700 hover:underline">
                              {unit.Phone}
                            </a>
                          </div>
                        )}

                        {unit.Email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                            <a href={`mailto:${unit.Email}`} className="text-yellow-600 hover:text-yellow-700 hover:underline">
                              {unit.Email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
