import type { SortingOptions as SortingOptionsType } from "../types";

interface SortingOptionsProps {
  sortBy: SortingOptionsType;
  setSortBy: React.Dispatch<React.SetStateAction<SortingOptionsType>>;
}

export default function SortingOptions({
  sortBy,
  setSortBy,
}: SortingOptionsProps) {
  function onNameSort() {
    if (sortBy === "NAME_ASCENDING") {
      setSortBy("NAME_DESCENDING");
    } else {
      setSortBy("NAME_ASCENDING");
    }
  }

  function onPriceSort() {
    if (sortBy === "PRICE_ASCENDING") {
      setSortBy("PRICE_DESCENDING");
    } else {
      setSortBy("PRICE_ASCENDING");
    }
  }

  function onQuantitySort() {
    if (sortBy === "QUANTITY_ASCENDING") {
      setSortBy("QUANTITY_DESCENDING");
    } else {
      setSortBy("QUANTITY_ASCENDING");
    }
  }

  return (
    <div>
      <span>Sort By: </span>
      <button
        onClick={onNameSort}
        className={sortBy.includes("NAME") ? "selected" : ""}
      >
        Name{" "}
        {sortBy.includes("NAME")
          ? sortBy === "NAME_ASCENDING"
            ? "↑"
            : "↓"
          : ""}
      </button>
      <button
        onClick={onPriceSort}
        className={sortBy.includes("PRICE") ? "selected" : ""}
      >
        Price{" "}
        {sortBy.includes("PRICE")
          ? sortBy === "PRICE_ASCENDING"
            ? "↑"
            : "↓"
          : ""}
      </button>
      <button
        onClick={onQuantitySort}
        className={sortBy.includes("QUANTITY") ? "selected" : ""}
      >
        Quantity{" "}
        {sortBy.includes("QUANTITY")
          ? sortBy === "QUANTITY_ASCENDING"
            ? "↑"
            : "↓"
          : ""}
      </button>
    </div>
  );
}
