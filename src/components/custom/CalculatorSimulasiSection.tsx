import KPRCalculator from "./KPRCalculator";

export function CalculatorSimulasiSection() {
  return (
    <>
      {/* KPR Simulator */}
      <section className="bg-primary py-8 px-4 md:py-12">
        <div className="container max-w-7xl mx-auto">
          <KPRCalculator />
        </div>
      </section>

      {/* Partnership Section */}
      <section className="bg-white py-8 px-4 md:py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            {/* Main Text */}
            <h2 className="text-black text-sm md:text-base font-bold">
              Brighton Bekerjasama Dengan Seluruh Bank Terkemuka Di Indonesia{" "}
              <span className="text-black font-normal">Untuk Membantu Pendanaan Properti Anda Dalam Bentuk KPR, KPA, Take Over, Atau KMK.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base max-w-4xl mx-auto">Prosenya Mudah, Cepat Dan Gratis! Tapa Tambahan Biaya. Bank-bank Yang Bekerjasama Dengan Kami Diantaranya:</p>
          </div>
        </div>
      </section>
    </>
  );
}
