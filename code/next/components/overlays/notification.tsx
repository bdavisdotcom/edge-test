import { Icon } from "@/components/icon";

type Props = {
  visible: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
};

function Notification({ visible, title, description }: Props) {
  return (
    <div
      aria-hidden={visible ? "false" : "true"}
      role="alert"
      className="bg-orange text-white overflow-hidden flex flex-row fixed z-20 bottom-10 right-10 rounded-lg shadow-even shadow-orange/25 border w-96 transition-all duration-500 aria-hidden:-right-96"
    >
      <div className="bg-darkorange flex items-center justify-center w-14">
        <Icon className="fill-white size-8" name="check-circle" />
      </div>
      <div className="flex flex-col flex-1 gap-2 p-4">
        <p className="font-medium text-base leading-snug">{title}</p>
        {description && <p className="text-sm leading-snug">{description}</p>}
      </div>
    </div>
  );
}

export { Notification };
export default Notification;
