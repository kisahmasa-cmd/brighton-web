"use client"

import {useState, useEffect} from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {PropertyBasicInfo} from "../../../types/property-types";
import {formatSlug} from "../../../utils/formatSlug";

export default function InputPropertyType({
  propertyTypes = [],
  isMobile = false,
  value,
  onChangeAction,
  style,
  enableAll
}: {
  propertyTypes?: PropertyBasicInfo[],
  isMobile?: boolean,
  value?: string,
  onChangeAction?: (value: string, label: string) => void,
  style?: string,
  enableAll?: boolean
}) {
  const [propertyType, setPropertyType] = useState(value ?? "")

  // Sync with external value
  useEffect(() => {
    if (value !== undefined) {
      setPropertyType(value)
    }
  }, [value])

  // Handle value change
  const handleValueChange = (newValue: string) => {
    // If "all" is selected, set to empty string to reset
    const finalValue = newValue === "all" ? "" : newValue
    setPropertyType(finalValue)

    // Call external onChangeAction if provided
    if (onChangeAction) {
      const foundItem = propertyTypes.find(item => formatSlug(item.value) === newValue);
      const label = foundItem ? foundItem.label : "";
      onChangeAction(finalValue, label)
    }
  }

  const handleSelectAll = () => {
    if (enableAll) {
      return <SelectItem value="all" className="px-3 py-2 font-medium">Semua Tipe</SelectItem>
    }
  }

  return (
    <Select value={propertyType} onValueChange={handleValueChange}>
      <SelectTrigger size={isMobile ? "sm" : "default"} className={
        isMobile ?
          "flex-1 bg-white border-0 rounded-lg shadow transition-shadow"
          :
          style === "input"
            ? "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
            : "border-0 rounded-full cursor-pointer hover:bg-gray-100 font-medium"}>
        <SelectValue placeholder="Pilih Tipe"/>
      </SelectTrigger>

      <SelectContent align="end" className={!isMobile && style !== "input" ? "p-4 w-60" : ""}>
        <SelectGroup>
          {/* Reset option */}
          {handleSelectAll()}
          {propertyTypes?.length > 0 ? (
            propertyTypes?.map((type) => (
              <SelectItem key={type.value} value={formatSlug(type.value)} className="px-3 py-2">
                {type.label}
              </SelectItem>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 text-sm">Tidak ada data</div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
