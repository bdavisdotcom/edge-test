import { Button } from "@/components/button";
import { Modal } from "@/components/overlays/modal";

import { ReactElement, useState } from "react";
import { twMerge } from "tailwind-merge";

export type ConfirmFunction = (
  title: React.ReactNode,
  message?: React.ReactNode
) => Promise<boolean>;

const useConfirm = (): [ReactElement, ConfirmFunction] => {
  const [title, setTitle] = useState<React.ReactNode>();
  const [message, setMessage] = useState<React.ReactNode>();
  const [promise, setPromise] = useState<{
    resolve: (success: boolean) => void;
  }>();

  const confirm = (title: React.ReactNode, message?: React.ReactNode) => {
    setTitle(title);
    setMessage(message);
    return new Promise<boolean>((resolve, reject) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(undefined);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = (
    <Modal isOpen={!!promise} handleClose={handleCancel}>
      <div className="max-w-lg flex items-center justify-center flex-col gap-8">
        <p className={twMerge("text-2xl", !message && "text-center")}>
          {title}
        </p>
        {message && <p className="text-lg">{message}</p>}

        <div className="flex gap-5">
          <Button
            priority="secondary"
            onClick={handleCancel}
            size="large"
            className="w-48"
          >
            Cancel
          </Button>
          <Button
            priority="primary"
            onClick={handleConfirm}
            size="large"
            className="w-48"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );

  return [ConfirmationDialog, confirm];
};

export default useConfirm;
