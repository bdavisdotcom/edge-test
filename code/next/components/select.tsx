import { ComponentProps, forwardRef } from "react";

export type SelectOption<T> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type SelectProps<T> = {
  options: SelectOption<T>[];
  placeholder?: string;
  value?: T;
  required?: boolean;
} & Omit<ComponentProps<"select">, "children">;

const Select = forwardRef(function SelectWithoutRef<T extends string | number>(
  { options, placeholder, required, ...props }: SelectProps<T>,
  ref: React.Ref<HTMLSelectElement>
) {
  return (
    <select
      className="bg-lightgray rounded pl-5 pr-10 py-4 h-[58px] text-sm font-normal w-full appearance-none cursor-pointer outline-none bg-no-repeat bg-right-5 bg-[url('/icons/chevron-down.svg')] transition-colors border border-solid border-lightgray focus:border-blue disabled:text-black/50 disabled:cursor-not-allowed"
      ref={ref}
      {...props}
    >
      {placeholder && (
        <option value="" hidden={required}>
          {placeholder}
        </option>
      )}
      {options.map(({ label, ...option }, index) => (
        <option {...option} key={index}>
          {label}
        </option>
      ))}
    </select>
  );
});

export { Select };
export default Select;
