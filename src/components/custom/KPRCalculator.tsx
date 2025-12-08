"use client";

import {useState, useEffect} from "react";
import {Input} from "@/components/ui/input";

interface KPRCalculatorProps {
  enableResult?: boolean,
  styleInput?: string | "border",
  onValueChange?: (resultInstallment: number) => void,
  defaultPrice?: string,
  defaultDownPayment?: string,
  defaultTimePeriod?: string,
  defaultInterestRate?: string
}

export default function KPRCalculator({
  enableResult = true,
  styleInput,
  onValueChange,
  defaultPrice,
  defaultDownPayment,
  defaultTimePeriod,
  defaultInterestRate
}: KPRCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<string>(defaultPrice ?? "");
  const [downPayment, setDownPayment] = useState<string>(defaultDownPayment ?? "");
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>(defaultTimePeriod ?? "");
  const [interestRate, setInterestRate] = useState<string>(defaultInterestRate ?? "");
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0);

  const formatCurrency = (value: string): string => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(Number(number));
  };

  const parseCurrency = (value: string): number => {
    return Number(value.replace(/\D/g, ""));
  };

  useEffect(() => {
    const price = parseCurrency(propertyPrice);
    let dp = parseCurrency(downPayment);
    if (dp > price) {
      dp = price;
      setDownPayment(price.toString());
    }
    const loan = price - dp;
    setLoanAmount(loan.toString());
  }, [propertyPrice, downPayment]);

  const calculateKPR = () => {
    const P = parseCurrency(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const installment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyInstallment(Math.round(installment));

      if (onValueChange) {
        onValueChange(Math.round(installment));
      }
    } else {
      setMonthlyInstallment(0);

      if (onValueChange) {
        onValueChange(0);
      }
    }
  };

  useEffect(() => {
    calculateKPR();
  }, [loanAmount, timePeriod, interestRate]);

  const sendToWhatsApp = () => {
    const phoneNumber = "62813456709";
    const message = `Ajuan KPR - Simulasi Perhitungan

Harga Properti: Rp. ${formatCurrency(propertyPrice)}
Uang Muka: Rp. ${formatCurrency(downPayment)}
Jumlah Pinjaman: Rp. ${formatCurrency(loanAmount)}
Jangka Waktu Pinjaman: ${timePeriod} Tahun
Suku Bunga per Tahun: ${interestRate}%
Angsuran per Bulan: Rp. ${new Intl.NumberFormat("id-ID").format(monthlyInstallment)}

Saya ingin mengajukan KPR dengan detail simulasi di atas.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const containerClassName = () => {
    return enableResult ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8' : 'grid grid-cols-1 gap-6 lg:gap-8';
  }

  const getStyleInput = () => {
    return styleInput == "border" ? "" : "px-4 py-6 lg:text-base rounded-lg border-0 focus:ring-2 focus:ring-yellow-600 outline-none bg-white";
  }

  return (
    <div className="w-full mx-auto">
      <div className={containerClassName()}>
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Harga Properti (Rp)</label>
            <Input
              type="text"
              value={formatCurrency(propertyPrice)}
              onChange={(e) => setPropertyPrice(e.target.value.replace(/\D/g, ""))}
              className={`w-full ${getStyleInput()}`}
            />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Uang Muka (Rp)</label>
            <Input
              type="text"
              value={formatCurrency(downPayment)}
              onChange={(e) => setDownPayment(e.target.value.replace(/\D/g, ""))}
              className={`w-full ${getStyleInput()}`}
            />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Jumlah Pinjaman (Rp)</label>
            <Input
              type="text"
              value={formatCurrency(loanAmount)}
              readOnly
              className={`w-full ${getStyleInput()}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Jangka Waktu Pinjaman (Tahun)</label>
              <Input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className={`w-full ${getStyleInput()}`}
              />
            </div>

            <div>
              <label className="block text-gray-900 font-semibold mb-2">Suku Bunga per Tahun (%)</label>
              <Input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className={`w-full ${getStyleInput()}`}
              />
            </div>
          </div>
        </div>

        {/* Result Section */}
        {enableResult && (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Hasil Simulasi KPR</h2>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 divide-y sm:divide-y-0 sm:grid-cols-2 sm:divide-x divide-gray-600 text-center">
                <div className="pb-4 sm:pb-0 sm:pr-4">
                  <p className="text-gray-600 text-sm mb-2">Harga Properti (Rp)</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">Rp. {formatCurrency(propertyPrice)}</p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-4">
                  <p className="text-gray-600 text-sm mb-2">Jumlah Angsuran/Bulan</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">Rp. {new Intl.NumberFormat("id-ID").format(monthlyInstallment)}</p>
                </div>
              </div>
            </div>

            <button onClick={sendToWhatsApp} className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
              Ajukan KPR
            </button>

            <p className="text-sm text-gray-800 leading-relaxed">
              *Hasil dari perhitungan simulasi KPR ini hanya merupakan perkiraan saja. Untuk perhitungan tepatnya, pihak
              bank akan memberikan ilustrasi angsuran Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
