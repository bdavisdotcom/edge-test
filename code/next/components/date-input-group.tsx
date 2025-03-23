import InputGroup, { InputGroupProps, popInputGroupProps } from "./input-group";
import { Controller, FieldValues, Path } from "react-hook-form";
import DateInput, { DateInputProps } from "@/components/date-input";

type Props<V extends FieldValues, T extends Path<V>> = Omit<
  InputGroupProps<V, T>,
  "children"
> &
  Omit<DateInputProps<T>, "onChange" | "onBlur" | "value" | "name">;

function DateInputGroup<V extends FieldValues, T extends Path<V>>(
  props: Props<V, T>
) {
  const [groupProps, inputProps] = popInputGroupProps(props);

  const { form, name } = groupProps;
  return (
    <InputGroup {...groupProps}>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { ref, ...field } }) => (
          <DateInput {...field} {...inputProps} />
        )}
      />
    </InputGroup>
  );
}

export { DateInputGroup };
export default DateInputGroup;
