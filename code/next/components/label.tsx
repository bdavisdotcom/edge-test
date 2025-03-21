import { ComponentProps } from "react";

type Props = {
  required?: boolean;
  label: React.ReactNode;
  description?: React.ReactNode;
} & Omit<ComponentProps<"label">, "aria-required">;

function Label({
  className = "",
  required = false,
  children,
  label,
  description,
  ...props
}: Props) {
  return (
    <label
      className={`uppercase text-sm font-medium ${className}`}
      {...props}
      aria-required={required}
    >
      {label}
      {required && <span className="text-orange">*</span>}
      {description && (
        <span className="text-xs text-darkblue normal-case font-normal">
          &nbsp;{description}
        </span>
      )}
      {children}
    </label>
  );
}

export { Label };
export default Label;
