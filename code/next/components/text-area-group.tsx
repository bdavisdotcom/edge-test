import InputGroup, { InputGroupProps, popInputGroupProps } from "./input-group";
import { FieldValues, Path } from "react-hook-form";
import TextArea, { TextAreaProps } from "@/components/text-area";

type Props<V extends FieldValues, T extends Path<V>> = Omit<
  InputGroupProps<V, T>,
  "children"
> &
  Omit<TextAreaProps, "form" | "name">;

function TextAreaGroup<V extends FieldValues, T extends Path<V>>(
  props: Props<V, T>
) {
  const [groupProps, inputProps] = popInputGroupProps(props);

  const { form, name } = groupProps;

  return (
    <InputGroup {...groupProps}>
      <TextArea {...inputProps} {...form.register(name)} />
    </InputGroup>
  );
}

export { TextAreaGroup };
export default TextAreaGroup;
