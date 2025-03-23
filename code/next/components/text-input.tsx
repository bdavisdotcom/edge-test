import { ComponentProps, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/icon";

export type TextInputProps = {
  setValue?: (value: string) => void;
  type?: Exclude<
    ComponentProps<"input">["type"],
    | "select"
    | "checkbox"
    | "radio"
    | "button"
    | "submit"
    | "reset"
    | "file"
    | "image"
    | "hidden"
    | "range"
  >;
} & Omit<ComponentProps<"input">, "type" | "form">;

const TextInput = forwardRef(function TextInputWithoutRef(
  { className, type = "text", ...props }: TextInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [inputType, setInputType] = useState(type);

  return (
    <>
      <input
        {...props}
        ref={ref}
        type={inputType}
        className={twMerge(
          "border-offgray placeholder-black/45 text-base font-normal normal-case border border-solid rounded px-5 py-4 w-full outline-none transition-colors focus:border-blue disabled:bg-lightgray disabled:color-black/50 text-black",
          type === "password" && "pr-12",
          className
        )}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-0 flex top-0 bottom-0 items-center px-4"
          onClick={() =>
            setInputType((val) => (val === "password" ? "text" : "password"))
          }
        >
          <Icon name={inputType === "password" ? "eye-slash" : "eye"} />
        </button>
      )}
    </>
  );
});

export { TextInput };
export default TextInput;
