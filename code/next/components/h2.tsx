import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function H2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={twMerge("text-darkblue mb-4 leading-snug text-3xl", className)}
      {...props}
    ></h2>
  );
}

export { H2 };
export default H2;
