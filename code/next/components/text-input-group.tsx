import InputGroup, { InputGroupProps, popInputGroupProps } from "@/components/input-group";
import { FieldValues, Path, PathValue } from "react-hook-form";
import TextInput, { TextInputProps } from "@/components/text-input";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";

type Props<V extends FieldValues, T extends Path<V>> = Omit<
  InputGroupProps<V, T>,
  "children"
> &
  Omit<TextInputProps, "form" | "name">;

function TextInputGroup<V extends FieldValues, T extends Path<V>>(
  props: Props<V, T>
) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [groupProps, inputProps] = popInputGroupProps(props);

  const { form, name } = groupProps;

  return (
    <InputGroup {...groupProps}>
      <div className="relative flex-1">
        {inputProps.type === "wysiwyg" ? (
          <ReactQuill
            className="min-h-10"
            theme="snow"
            onChange={(value) =>
              form.setValue(name, value as PathValue<V, T>, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
            value={form.watch(name)}
            readOnly={inputProps.readOnly}
          />
        ) : (
          <TextInput {...inputProps} {...form.register(name)} />
        )}
      </div>
    </InputGroup>
  );
}

export { TextInputGroup };
export default TextInputGroup;
