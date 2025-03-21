import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
// import Icon, { IconName } from "../text/icon";
import { useRouter } from "next/navigation";

type Priority = "primary" | "secondary" | "default" | "underline";

type Props = {
  loading?: boolean;
  priority?: Priority;
  dark?: boolean;
  size?: "default" | "large";
//   iconLeft?: IconName;
//   iconRight?: IconName;
  href?: string;
} & ComponentProps<"button">;

function Button({
  className,
  dark = false,
  priority = "default",
  size = "default",
//   iconLeft,
//   iconRight,
  children,
  loading,
  href,
  ...props
}: Props) {
  const router = useRouter();
  // const priorityVariants = {
  //   primary:
  //     "bg-yellow border-yellow text-black hover:bg-gold hover:border-gold",
  //   secondary:
  //     "bg-transparent border-yellow hover:bg-cream " +
  //     (dark ? "text-yellow hover:text-black" : "text-black"),
  //   default:
  //     "bg-indigo-800 text-black border-gray hover:bg-lightgray hover:border-offgray",
  //   underline:
  //     "text-darkblue underline gap-[3px] px-0 py-0 border-none font-medium text-xs uppercase",
  // };
  const disabled = props.disabled || loading;

  const iconVariants = {
    primary: "fill-black",
    secondary: dark ? "fill-yellow" : "fill-black",
    default: "fill-black",
    underline: "fill-darkblue",
  };

  const iconVariant = iconVariants[priority];

  return (
    <button
      onClick={() => {
        if (href) {
          router.push(href);
        }
      }}
      className={twMerge(
        "relative transition-all text-lg font-medium rounded px-[18px] border-2 border-solid inline-flex justify-between items-center gap-2 bg-indigo-800 text-white",
        size === "large" ? "leading-tight py-4 w-full justify-center" : "py-2",
        disabled && "pointer-events-none opacity-65",
        className
      )}
      {...props}
      disabled={disabled}
    >
      {/* {iconLeft &&
        (priority === "primary" && size === "default" ? (
          <div className="bg-gold -ml-[20px] self-stretch -my-2.5 px-3 flex items-center rounded-l mr-1">
            <Icon name={iconLeft} className="fill-white" />
          </div>
        ) : (
          <Icon name={iconLeft} className={iconVariant} />
        ))} */}
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center">
          {/* <Icon name="spinner" className="animate-spin h-5 w-5" /> */}
          Loading...
        </div>
      )}
      <span className={twMerge(loading && "text-[transparent]")}>
        {children}
      </span>
      {/* {iconRight && <Icon name={iconRight} className={iconVariant} />} */}
    </button>
  );
}

export { Button };
export default Button;
