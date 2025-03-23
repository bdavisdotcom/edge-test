import { twMerge } from "tailwind-merge";
import { PropsWithChildren, useState } from "react";
import { Icon } from "@/components/icon";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
} & PropsWithChildren;

function Modal({ isOpen, handleClose, children }: Props) {
  return (
    <div
      className={twMerge("relative z-30", !isOpen && "pointer-events-none")}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={twMerge(
          "fixed inset-0 bg-[#000E33] bg-opacity-90 transition-opacity",
          isOpen
            ? "ease-out duration-300 opacity-100"
            : "ease-in duration-200 opacity-0"
        )}
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6 text-center sm:p-0">
          <div
            className={twMerge(
              "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl min-h-96 flex items-center justify-center",
              isOpen
                ? "ease-out duration-300 opacity-100 translate-y-0 sm:scale-100"
                : "ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            )}
          >
            <button
              className="uppercase text-xs font-bold gap-2 flex items-center absolute top-9 right-9"
              onClick={handleClose}
            >
              Close
              <div className="border-2 border-darkblue h-12 w-12 flex justify-center items-center rounded-full">
                <Icon name="plus" className="rotate-45" />
              </div>
            </button>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Modal };
export default Modal;
