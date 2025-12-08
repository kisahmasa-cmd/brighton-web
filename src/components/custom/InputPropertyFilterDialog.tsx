"use client";

import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ChevronDown, SlidersHorizontal} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import React, {useState, useEffect} from "react";
import {PropertyBasicInfo, PropertyParams} from "../../../types/property-types";
import InputLocation from "./InputLocation";
import Link from "next/link";
import InputPropertyPriceRange from "@/components/custom/InputPropertyPriceRange";
import {buildPropertyUrl} from "../../../utils/buildPropertyUrl";
import ActionClear from "@/components/custom/ActionClear";

interface InputFilterDialogProps {
  isMobile?: boolean,
  propertyTypes?: PropertyBasicInfo[] | undefined,
  params?: PropertyParams,
  category?: string
}

export default function InputPropertyFilterDialog({
  isMobile,
  propertyTypes = [],
  params,
  category = "dijual"
}: InputFilterDialogProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter states
  const [activeTab, setActiveTab] = useState(category);
  const [type, setType] = useState<string>("");
  const [certificate, setCertificate] = useState<string>("");
  const [provinceID, setProvinceID] = useState<string>("");
  const [provinceTitle, setProvinceTitle] = useState<string>("");
  const [provinceSlug, setProvinceSlug] = useState<string>("");
  const [locationID, setLocationID] = useState<string>("");
  const [locationTitle, setLocationTitle] = useState<string>("");
  const [locationSlug, setLocationSlug] = useState<string>("");
  const [areaID, setAreaID] = useState<string>("");
  const [areaTitle, setAreaTitle] = useState<string>("");
  const [areaSlug, setAreaSlug] = useState<string>("");
  const [kT, setKT] = useState<string>("");
  const [kM, setKM] = useState<string>("");
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [lTMin, setLTMin] = useState<string>("");
  const [lTMax, setLTMax] = useState<string>("");
  const [lBMin, setLBMin] = useState<string>("");
  const [lBMax, setLBMax] = useState<string>("");

  // Sync all state with params when params change
  useEffect(() => {
    setType(params?.Type ?? "");
    setCertificate(params?.Certificate ?? "");
    setProvinceID(params?.ProvinceID?.toString() ?? "");
    setProvinceTitle(params?.ProvinceTitle ?? "");
    setProvinceSlug(params?.ProvinceSlug ?? "");
    setLocationID(params?.LocationID?.toString() ?? "");
    setLocationTitle(params?.LocationTitle ?? "");
    setLocationSlug(params?.LocationSlug ?? "");
    setAreaID(params?.AreaID?.toString() ?? "");
    setAreaTitle(params?.AreaTitle ?? "");
    setAreaSlug(params?.AreaSlug ?? "");
    setKT(params?.KT?.toString() ?? "");
    setKM(params?.KM?.toString() ?? "");
    setPriceMin(params?.PriceMin ?? null);
    setPriceMax(params?.PriceMax ?? null);
    setLTMin(params?.LTMin?.toString() ?? "");
    setLTMax(params?.LTMax?.toString() ?? "");
    setLBMin(params?.LBMin?.toString() ?? "");
    setLBMax(params?.LBMax?.toString() ?? "");
  }, [
    params?.Type,
    params?.Certificate,
    params?.ProvinceID,
    params?.ProvinceTitle,
    params?.ProvinceSlug,
    params?.LocationID,
    params?.LocationTitle,
    params?.LocationSlug,
    params?.AreaID,
    params?.AreaTitle,
    params?.AreaSlug,
    params?.KT,
    params?.KM,
    params?.PriceMin,
    params?.PriceMax,
    params?.LTMin,
    params?.LTMax,
    params?.LBMin,
    params?.LBMax
  ]);

  // Sync activeTab with category
  useEffect(() => {
    if (category) {
      setActiveTab(category);
    }
  }, [category]);

  // Build updated params
  const updatedParams: PropertyParams = {
    ...params,
    page: undefined,
    Type: type || undefined,
    Certificate: certificate || undefined,
    PriceMin: priceMin ? Number(priceMin) : undefined,
    PriceMax: priceMax ? Number(priceMax) : undefined,
    KT: kT ? Number(kT) : undefined,
    KM: kM ? Number(kM) : undefined,
    LTMin: lTMin ? Number(lTMin) : undefined,
    LTMax: lTMax ? Number(lTMax) : undefined,
    LBMin: lBMin ? Number(lBMin) : undefined,
    LBMax: lBMax ? Number(lBMax) : undefined,
    ProvinceID: provinceID ? Number(provinceID) : undefined,
    ProvinceTitle: provinceTitle ? provinceTitle : undefined,
    ProvinceSlug: provinceSlug ? provinceSlug : undefined,
    LocationID: locationID ? Number(locationID) : undefined,
    LocationTitle: locationTitle ? locationTitle : undefined,
    LocationSlug: locationSlug ? locationSlug : undefined,
    AreaID: areaID ? Number(areaID) : undefined,
    AreaTitle: areaTitle ? areaTitle : undefined,
    AreaSlug: areaSlug ? areaSlug : undefined,
    SortOrder: undefined,
    SortField: undefined,
  };

  const { pathname, query: queryParams } = buildPropertyUrl(activeTab, updatedParams);

  return (
    <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
      <DialogTrigger asChild>
        <Button size={isMobile ? "sm" : "default"} variant={isMobile ? "outline" : "ghost"}
                className={isMobile ? "flex-1 rounded-lg bg-white border-0 shadow transition-shadow" : "rounded-full px-6 font-medium cursor-pointer"}>
          <SlidersHorizontal className="hidden sm:block mr-2 h-4 w-4"/>
          Filter
          <ChevronDown className="sm:hidden h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen sn:max-w-2xl sm:h-auto h-full flex flex-col gap-0 sm:max-h-[90vh] max-h-screen overflow-y-auto sm:rounded-lg rounded-none w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Filter</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-2.5 py-4 flex-1 overflow-y-auto sm:overflow-hidden">
          {/* Transaksi */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Transaksi</label>
            <div className="col-span-3">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Dijual"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dijual">Dijual</SelectItem>
                  <SelectItem value="disewa">Disewa</SelectItem>
                  <SelectItem value="dijualsewa">Dijual / Disewa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tipe */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Tipe</label>
            <div className="col-span-3">
              <ActionClear
                value={type}
                onClear={() => setType("")}
              >
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Tipe"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-medium">Semua Tipe</SelectItem>
                    {propertyTypes?.length > 0 ? (
                      propertyTypes?.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-400 text-sm">Tidak ada data</div>
                    )}
                  </SelectContent>
                </Select>
              </ActionClear>
            </div>
          </div>

          {/* Sertifikat */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Sertifikat</label>
            <div className="col-span-3">
              <ActionClear
                value={certificate}
                onClear={() => setCertificate("")}
              >
                <Select value={certificate} onValueChange={setCertificate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Sertifikat"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SHM">SHM - Sertifikat Hak Milik</SelectItem>
                    <SelectItem value="HGB">HGB - Hak Guna Bangunan</SelectItem>
                    <SelectItem value="Surat Ijo">Surat Ijo</SelectItem>
                    <SelectItem value="PPJB">PPJB</SelectItem>
                    <SelectItem value="Lain-lain">Lain-lain</SelectItem>
                  </SelectContent>
                </Select>
              </ActionClear>
            </div>
          </div>

          {/* Location Component - Replaces Province, City, and District */}
          <InputLocation
            defaultProvince={provinceID}
            defaultCity={locationID}
            defaultDistrict={areaID}
            onProvinceChange={(value, title, slug) => {
              setProvinceID(value);
              setProvinceTitle(title);
              setProvinceSlug(slug);
            }}
            onCityChange={(value, title, slug) => {
              setLocationID(value);
              setLocationTitle(title);
              setLocationSlug(slug);
            }}
            onDistrictChange={(value, title, slug) => {
              setAreaID(value);
              setAreaTitle(title);
              setAreaSlug(slug);
            }}
          />

          {/* Kamar Tidur */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Kamar Tidur</label>
            <div className="col-span-3">
              <ActionClear
                value={kT}
                onClear={() => setKT("")}
              >
                <Select value={kT} onValueChange={setKT}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kamar Tidur"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </ActionClear>
            </div>
          </div>

          {/* Kamar Mandi */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Kamar Mandi</label>
            <div className="col-span-3">
              <ActionClear
                value={kM}
                onClear={() => setKM("")}
              >
                <Select value={kM} onValueChange={setKM}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kamar Mandi"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </ActionClear>
            </div>
          </div>

          {/* Harga */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Harga</label>
            <div className="col-span-3">
              <InputPropertyPriceRange
                style={"input"}
                valueMin={Number(priceMin)}
                valueMax={Number(priceMax)}
                withClear={true}
                onChange={(min, max) => {
                  setPriceMin(min);
                  setPriceMax(max);
                }}
              />
            </div>
          </div>

          {/* Luas Tanah */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">
              Luas Tanah (m<sup>2</sup>)
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <ActionClear
                value={lTMin}
                onClear={() => setLTMin("")}
              >
                <Input type="number" value={lTMin} onChange={(e) => setLTMin(e.target.value)} />
              </ActionClear>
              <span className="text-gray-500">s/d</span>
              <ActionClear
                value={lTMax}
                onClear={() => setLTMax("")}
              >
                <Input type="number" value={lTMax} onChange={(e) => setLTMax(e.target.value)} />
              </ActionClear>
            </div>
          </div>

          {/* Luas Bangunan */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">
              Luas Bangunan (m<sup>2</sup>)
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <ActionClear
                value={lBMin}
                onClear={() => setLBMin("")}
              >
                <Input type="number" value={lBMin} onChange={(e) => setLBMin(e.target.value)} />
              </ActionClear>
              <span className="text-gray-500">s/d</span>
              <ActionClear
                value={lBMax}
                onClear={() => setLBMax("")}
              >
                <Input type="number" value={lBMax} onChange={(e) => setLBMax(e.target.value)} />
              </ActionClear>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" className="font-bold px-8 rounded-full cursor-pointer">
              Batal
            </Button>
          </DialogClose>
          <Link
            href={{
              pathname,
              query: queryParams,
            }}
            onClick={() => setFilterOpen(false)}
          >
            <Button className="font-bold rounded-full text-black px-8 cursor-pointer">
              Cari
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
