import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function H1({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={twMerge("text-darkblue mb-4 leading-snug text-5xl", className)}
      {...props}
    ></h1>
  );
}

export { H1 };
export default H1;
