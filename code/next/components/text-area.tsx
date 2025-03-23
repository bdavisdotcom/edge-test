import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TextAreaProps = ComponentProps<"textarea">;

const TextArea = forwardRef(function TextAreaWithoutRef(
  { className, ...props }: TextAreaProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  return (
    <div className="relative before:block before:right-[1px] before:bottom-[4.5px] before:h-3.5 before:w-3.5 before:rounded-br before:absolute before:bg-white before:pointer-events-none after:block after:absolute after:bottom-2 after:right-1 after:pointer-events-none after:border-4 after:border-offgray/0 after:border-b-offgray/100 after:border-r-offgray/100">
      <textarea
        {...props}
        ref={ref}
        className={twMerge(
          "resize-y border-offgray placeholder-black/45 text-base font-normal normal-case border border-solid rounded px-5 py-4 w-full outline-none transition-colors focus:border-blue disabled:bg-lightgray disabled:color-black/50",
          className
        )}
      />
    </div>
  );
});

export { TextArea };
export default TextArea;
