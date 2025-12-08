import { Quote } from "lucide-react";

const CharityQuote = () => {
  return (
    <div className="py-6">
      <div className="p-6 relative">
        <Quote className="w-10 h-10 absolute top-0 left-0 rotate-180" />
        <p className="text-xl font-bold italic text-center px-8">
          Ada lebih dari 432 orang & anak yang menantikan & sudah menerima
          bantuan Anda melalui Program #BrightonPeduli
        </p>
        <Quote className="w-10 h-10 absolute bottom-0 right-0" />
      </div>
    </div>
  );
};

export default CharityQuote;
