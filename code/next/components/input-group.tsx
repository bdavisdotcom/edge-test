import { FieldError, FieldValues, Path, UseFormReturn } from "react-hook-form";
import Label from "@/components/label";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type InputGroupProps<V extends FieldValues, T extends Path<V>> = {
  form: UseFormReturn<V, T>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  name: T;
  children:
    | React.ReactNode
    | ((props: T, form: UseFormReturn<V, T>) => JSX.Element);
  required?: boolean;
  className?: string;
};

type PopProps<V extends FieldValues, T extends Path<V>> = Omit<
  InputGroupProps<V, T>,
  "children"
>;

export function popInputGroupProps<
  V extends FieldValues,
  T extends Path<V>,
  Rest
>(
  props: PopProps<V, T> & Rest
): [
  PopProps<V, T>,
  Omit<
    PopProps<V, T> & Rest,
    "form" | "label" | "description" | "name" | "required" | "className"
  >
] {
  const { label, name, required, form, description, className, ...rest } =
    props;

  const groupProps: PopProps<V, T> = {
    label,
    name,
    required,
    form,
    description,
    className,
  };

  return [groupProps, rest];
}

function getErrorMessage(error: FieldError | undefined) {
  if (!error) return undefined;

  if (typeof error.message === "string") return error.message;

  const errors = Object.values(error)
    .map((e) =>
      typeof e === "string" ? e : "message" in e ? e.message : undefined
    )
    .filter((e) => e);

  return errors.join(", ");
}

function InputGroup<V extends FieldValues, T extends Path<V>>({
  label,
  description,
  name,
  children,
  required,
  form,
  className,
}: InputGroupProps<V, T>) {
  const { getFieldState, formState } = form;

  const { error } = getFieldState(name, formState);

  const message = useMemo(() => getErrorMessage(error), [error]);

  return (
    <div className={twMerge("mb-4 flex flex-col", className)}>
      {label && (
        <Label label={label} description={description} required={required} />
      )}
      {typeof children === "function" ? children(name, form) : children}
      {message && (
        <p className="text-orange text-xs font-medium mt-2">{message}</p>
      )}
    </div>
  );
}

export { InputGroup };
export default InputGroup;
