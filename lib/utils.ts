import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import mockData from "./mockData.json"; // Adjust the path based on where you place the file

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type RawDataRow = {
  "d/m/yyyy": string;
  first_name: string;
  last_name: string;
};

export type DataRow = {
  date: Date;
  firstName: string;
  lastName: string;
};

export const getMockData = (): DataRow[] => {
  return (mockData as RawDataRow[]).map((item) => ({
    date: moment(item["d/m/yyyy"], "D/M/YYYY").toDate(),
    firstName: item.first_name,
    lastName: item.last_name,
  }));
};
