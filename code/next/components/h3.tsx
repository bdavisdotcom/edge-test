import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function H3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={twMerge("text-darkblue mb-4 leading-snug text-xl", className)}
      {...props}
    ></h3>
  );
}

export { H3 };
export default H3;
