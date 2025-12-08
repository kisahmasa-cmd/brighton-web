"use client";

import { useEffect, useState } from "react";
import { TestimoniData } from "../../../types/testimoni-types";
import TestimoniCardV2 from "./TestimoniCardV2";

function distributeItems<T>(items: T[], columns: number): T[][] {
  const result = Array.from({ length: columns }, () => [] as T[]);
  for (let i = 0; i < columns; i++) {
    for (let j = i; j < items.length; j += columns) {
      result[i].push(items[j]);
    }
  }
  return result;
}

interface TestimoniesGridProps {
  slug: string;
  data: TestimoniData[];
}

const TestimoniesGrid: React.FC<TestimoniesGridProps> = ({ slug, data }) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) setColumns(3);
      else if (window.innerWidth >= 768) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const distributed = distributeItems(data, columns);

  return (
    <div
      className={`grid gap-4 ${
        columns === 1
          ? "grid-cols-1"
          : columns === 2
            ? "md:grid-cols-2"
            : "lg:grid-cols-3"
      }`}
    >
      {distributed.map((columnItems, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {columnItems.map((item, index) => (
            <div key={index}>
              <TestimoniCardV2
                isAgent={slug === "agen"}
                isShowButton={false}
                isFullText
                data={item}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TestimoniesGrid;
