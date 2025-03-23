import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/icon";
import { parse } from "date-fns";

export type DateInputProps<T> = {
  value?: T | string;
  placeholder?: string;
} & Omit<ReactDatePickerProps, "placeholderText" | "value">;

function DateInput<T extends Date>({
  className,
  placeholder,
  value,
  ...props
}: DateInputProps<T>) {
  const date =
    typeof value === "string" ? parse(value, "yyyy-MM-dd", new Date()) : value;

  return (
    <label className="relative">
      <DatePicker
        {...props}
        selected={date}
        placeholderText={placeholder}
        className={twMerge(
          "border-offgray placeholder-black/45 text-base font-normal normal-case border border-solid rounded pl-5 pr-10 py-4 w-full outline-none transition-colors focus:border-blue disabled:bg-lightgray disabled:color-black/50",
          className
        )}
      />
      <Icon
        name="calendar"
        className="fill-lightgrayblue"
        containerClassName="absolute right-3 top-[19px]"
      />
    </label>
  );
}

export { DateInput };
export default DateInput;
