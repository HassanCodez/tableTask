import { useState } from "react";
import moment from "moment";
import { DataRow } from "@/lib/utils";
import { Input } from "./ui/input";

const CustomData = ({ onAddRow }: { onAddRow: (row: DataRow) => void }) => {
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && firstName && lastName) {
      const newRow: DataRow = {
        date: moment(date).toDate(),
        firstName,
        lastName,
      };
      onAddRow(newRow);
      setDate("");
      setFirstName("");
      setLastName("");
    }
  };

  const inputClasses: string = "w-40 !outline-none";
  const inputContainer: string = "flex justify-between gap-2";
  return (
    <form onSubmit={handleSubmit} className="w-80 grid space-y-2 mx-auto">
      <div className={inputContainer}>
        <label>Date:</label>
        <Input
          className={inputClasses}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className={inputContainer}>
        <label>First Name:</label>
        <Input
          className={inputClasses}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className={inputContainer}>
        <label>Last Name:</label>
        <Input
          className={inputClasses}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <button
        className="w-full border py-1 rounded-lg md:hover:bg-[#f5f5f5] active:bg-[#e0e0e0] active:border-[#d0d0d0] transition-all duration-300"
        type="submit"
      >
        Add Row
      </button>
    </form>
  );
};

export default CustomData;
