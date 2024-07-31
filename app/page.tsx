"use client";
import { useState } from "react";
import TableComponent from "@/components/TableComponent";
import CustomData from "@/components/CustomData";
import { getMockData, DataRow } from "@/lib/utils";

export default function Home() {
  const [useMockData, setUseMockData] = useState(true);
  const [userData, setUserData] = useState<DataRow[]>([]);

  const handleAddRow = (row: DataRow) => {
    setUserData((prevData) => [...prevData, row]);
  };

  const mockData = getMockData();
  const dataToDisplay = useMockData ? mockData : userData;

  return (
    <div className="grid space-y-10 py-10 container">
      <div className="flex justify-center items-center">
        <label>
          <input
            className="mx-2"
            type="checkbox"
            checked={useMockData}
            onChange={() => setUseMockData((prev) => !prev)}
          />
          Use Mock Data
        </label>
      </div>
      {!useMockData && <CustomData onAddRow={handleAddRow} />}
      <TableComponent data={dataToDisplay} />
    </div>
  );
}
