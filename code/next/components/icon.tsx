import { ComponentProps } from "react";
import { ReactSVG } from "react-svg";

export type IconName = string;
// export type IconName =
//   | "arrow-left"
//   | "arrow-right"
//   | "bell"
//   | "calendar"
//   | "chevron-down"
//   | "chevron-up"
//   | "check-circle"
//   | "copy"
//   | "envelope"
//   | "eye"
//   | "eye-slash"
//   | "flag"
//   | "info-circle"
//   | "home"
//   | "lock"
//   | "map"
//   | "menu"
//   | "pen"
//   | "plus"
//   | "plus-square"
//   | "sort-ascending"
//   | "sort-descending"
//   | "search"
//   | "spinner"
//   | "three-musketeers"
//   | "trash"
//   | "user"
//   | "users";

type Props = {
  name: IconName;
  containerClassName?: string;
} & Omit<ComponentProps<typeof ReactSVG>, "src" | "ref">;

function Icon({ name, containerClassName, className, ...props }: Props) {
  const classes = className ? className.split(" ") : [];
  return (
    <ReactSVG
      className={containerClassName}
      src={`//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/${name}.svg`}
      beforeInjection={
        className ? (svg: any) => svg.classList.add(...classes) : undefined
      }
      loading={() => <div className={className}></div>}
      {...props}
    />
  );
}

export { Icon };
export default Icon;
