import CharityCard from "@/components/custom/CharityCard";
import { CharityData } from "../../../types/charity-types";
import SearchEmpty from "./SearchEmpty";

interface CharityCardListProps {
  data: CharityData[];
  dataTotal: number;
}

const CharityCardList: React.FC<CharityCardListProps> = ({
  data,
  dataTotal,
}) => {
  return (
    <div className="flex flex-col py-6">
      {/* title */}
      <h2 className="mb-2 font-bold text-2xl">
        Para Penerima Bantuan #BrightonPeduli
      </h2>
      {/* count */}
      <p className="text-sm">
        Menampilkan {data.length} dari total {dataTotal}
      </p>
      {/* card list */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {data.map((charity, index) => (
            <CharityCard key={index} data={charity} />
          ))}
        </div>
      ) : (
        <SearchEmpty />
      )}
    </div>
  );
};

export default CharityCardList;
