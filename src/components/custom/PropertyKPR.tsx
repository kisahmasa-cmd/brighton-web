import React from "react";
import KPRCalculator from "@/components/custom/KPRCalculator";
import {formatCurrency} from "../../../utils/formatCurrency";

interface PropertyKPRProps {
  priceMin: string | number;
  installment?: number;
  onInstallmentChange?: (value: number) => void;
}

const PropertyKPR = ({
  priceMin,
  installment,
  onInstallmentChange,
}: PropertyKPRProps) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Simulasi KPR</h2>
      <KPRCalculator
        enableResult={false}
        defaultPrice={priceMin.toString()}
        defaultDownPayment={(Number(priceMin) * 20 / 100).toString()}
        defaultTimePeriod={"15"}
        defaultInterestRate={"5"}
        styleInput="border"
        onValueChange={onInstallmentChange}
      />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="w-full rounded-2xl text-center p-6 bg-yellow-100 border border-gray-200">
          <p className="text-sm">Harga Properti</p>
          <p className="font-semibold text-xl">{formatCurrency(priceMin)}</p>
        </div>
        <div className="w-full rounded-2xl text-center p-6 bg-yellow-100 border border-gray-200">
          <p className="text-sm">Jumlah Angsuran/Bulan</p>
          <p className="font-semibold text-xl">{formatCurrency(installment ?? 0)}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyKPR;