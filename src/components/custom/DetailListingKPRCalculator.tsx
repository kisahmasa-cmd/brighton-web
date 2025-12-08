"use client";

import { ButtonGroup, ButtonGroupText } from "../ui/button-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { InputGroup, InputGroupInput } from "../ui/input-group";

interface DetailListingKPRCalculatorProps {
  propertyPrice: number;
}

const onlyDigits = (value: string) => value.replace(/[^\d]/g, "");

const DetailListingKPRCalculator: React.FC<DetailListingKPRCalculatorProps> = ({
  propertyPrice,
}) => {
  const [downPaymentPercentage, setDownPaymentPercentage] =
    useState<number>(20);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(
    0.2 * propertyPrice,
  );
  const [loanTermYears, setLoanTermYears] = useState<number>(15);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(5);

  useEffect(() => {
    setDownPaymentAmount((propertyPrice * downPaymentPercentage) / 100);
  }, [downPaymentPercentage]);

  useEffect(() => {
    const percent = (downPaymentAmount / propertyPrice) * 100;
    if (!Number.isNaN(percent)) setDownPaymentPercentage(percent);
  }, [downPaymentAmount]);

  function calculateKPR() {
    const loanAmount = propertyPrice - downPaymentAmount;

    const monthlyInterestRate = interestRatePercent / 100 / 12;
    const totalMonths = loanTermYears * 12;

    // Monthly payment formula (annuity)
    const monthlyInstallment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

    return {
      loanAmount,
      monthlyInstallment,
    };
  }

  const { monthlyInstallment } = calculateKPR();

  return (
    <div className="space-y-2">
      <h2 className="font-bold text-2xl mb-2">Simulasi Cicilan KPR</h2>
      <div className="flex gap-4 items-center">
        <p className="flex-1">Harga Properti (Rp)</p>
        <p className="flex-2 font-bold">{formatCurrency(propertyPrice)}</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="flex-1">Uang Muka (Rp)</p>
        <div className="flex-2">
          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-1">
            <ButtonGroup className="w-full sm:w-28">
              <InputGroup >
                <InputGroupInput
                  type="text"
                  value={downPaymentPercentage.toFixed(0)}
                  onChange={(e) => {
                    const digits = onlyDigits(e.target.value);
                    setDownPaymentPercentage(Number(digits) || 0);
                  }}
                  inputMode="numeric"
                />
              </InputGroup>
              <ButtonGroupText asChild className="rounded-sm">
                <Label>%</Label>
              </ButtonGroupText>
            </ButtonGroup>
            <InputGroup className="w-full flex-1">
              <InputGroupInput
                type="text"
                value={Math.round(downPaymentAmount).toLocaleString("id-ID")}
                onChange={(e) => {
                  const digits = onlyDigits(e.target.value);
                  setDownPaymentAmount(Number(digits) || 0);
                }}
                inputMode="numeric"
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <p className="flex-1">Jangka Waktu</p>
        <div className="flex-2">
          <ButtonGroup className="w-full lg:w-2/3">
            <Input
              type="text"
              value={loanTermYears}
              onChange={(e) => {
                const digits = onlyDigits(e.target.value);
                setLoanTermYears(Number(digits) || 0);
              }}
              inputMode="numeric"
            />
            <ButtonGroupText asChild>
              <Label>tahun</Label>
            </ButtonGroupText>
          </ButtonGroup>
        </div>
      </div>
      <div className="flex gap-4  items-center">
        <p className="flex-1">Suku Bunga</p>
        <div className="flex-2">
          <ButtonGroup className="w-full lg:w-2/3">
            <Input
              type="text"
              value={interestRatePercent}
              onChange={(e) => {
                const digits = onlyDigits(e.target.value);
                setInterestRatePercent(Number(digits) || 0);
              }}
              inputMode="numeric"
            />
            <ButtonGroupText asChild>
              <Label>%</Label>
            </ButtonGroupText>
          </ButtonGroup>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <p className="flex-1">Jumlah Angsuran</p>
        <p className="flex-2 font-bold">
          Rp {Math.round(monthlyInstallment).toLocaleString("id-ID")}{" "}
          <sub className="font-normal">per bulan</sub>
        </p>
      </div>
    </div>
  );
};

export default DetailListingKPRCalculator;
