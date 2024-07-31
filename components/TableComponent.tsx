import moment from "moment";
import { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataRow } from "@/lib/utils";

const groupDataByYear = (data: DataRow[]) => {
  const yearMap: { [key: string]: DataRow[] } = {};
  const uniqueYears: DataRow[] = [];

  data.forEach((row) => {
    const year = moment(row.date).year().toString();
    if (!yearMap[year]) {
      yearMap[year] = [];
    }
    yearMap[year].push(row);
  });

  for (const year in yearMap) {
    if (yearMap[year].length === 1) {
      uniqueYears.push(yearMap[year][0]);
      delete yearMap[year];
    }
  }

  return { yearMap, uniqueYears };
};

const TableComponent = ({ data }: { data: DataRow[] }) => {
  const { yearMap, uniqueYears } = groupDataByYear(data);
  const allUnique =
    Object.keys(yearMap).length === 0 && uniqueYears.length === data.length;

  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="bg-slate-100 ">
          <TableHead className="font-bold">Date</TableHead>
          <TableHead className="font-bold">First Name</TableHead>
          <TableHead className="font-bold">Last Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allUnique ? (
          data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{moment(row.date).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
            </TableRow>
          ))
        ) : (
          <>
            {Object.keys(yearMap).map((year) => (
              <Fragment key={year}>
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">
                    {year}
                  </TableCell>
                </TableRow>
                {yearMap[year].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {moment(row.date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
            {uniqueYears.length > 0 && (
              <>
                <TableRow>
                  <TableCell className="font-bold" colSpan={3}>
                    Unique Years
                  </TableCell>
                </TableRow>
                {uniqueYears.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {moment(row.date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
