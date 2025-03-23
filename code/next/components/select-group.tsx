import Select, { SelectProps } from "@/components/select";
import InputGroup, { InputGroupProps, popInputGroupProps } from "./input-group";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Props<V extends FieldValues, T extends Path<V>> = {
  registerOpts?: Parameters<UseFormReturn<V, T>["register"]>[1];
} & Omit<InputGroupProps<V, T>, "children"> &
  Omit<SelectProps<string | number>, "form" | "name">;

function SelectGroup<V extends FieldValues, T extends Path<V>>({
  registerOpts,
  ...props
}: Props<V, T>) {
  const [groupProps, inputProps] = popInputGroupProps(props);

  const { form, name, required } = groupProps;

  return (
    <InputGroup {...groupProps}>
      <Select
        {...inputProps}
        {...form.register(name, registerOpts)}
        required={required}
      />
    </InputGroup>
  );
}

export { SelectGroup };
export default SelectGroup;
