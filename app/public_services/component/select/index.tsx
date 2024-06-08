import React from "react";
import { SelectItem, Select, SelectProps } from "@nextui-org/react";

interface ShowItem {
  label: string;
  value: number;
}

interface SelectBoxProps extends Omit<SelectProps, "children"> {
  show: ShowItem[];
  label: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({ show, label, ...rest }) => {
  return (
    <div className="flex justify-center items-center mb-3 w-full ml-40">
      <div
        style={{ width: "171px" }}
        className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 flex-col"
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500px",
            position: "relative",
            top: "12px",
          }}
        >
          نمایش بر اساس
        </span>
        <Select
          style={{ backgroundColor: "white" }}
          size={"sm"}
          label={label}
          placeholder="مبلغ خرید"
          className="max-w-xs"
          {...rest}
        >
          {show.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectBox;
