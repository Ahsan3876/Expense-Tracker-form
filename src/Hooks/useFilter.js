import { useState } from "react";

export default function useFilter(dataList, callBack) {
  const [query, setQuery] = useState("");
  const filteredData = dataList.filter((data) =>
    callBack(data).toLowerCase().includes(query)
  );
  return [filteredData, setQuery];
}
