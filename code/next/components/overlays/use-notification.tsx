"use client";

import { ReactElement, useState } from "react";
import Notification from "@/components/overlays/notification";

export type NotifyFunction = (
  title: React.ReactNode,
  message?: React.ReactNode
) => Promise<void>;

export const useNotification = (): [ReactElement, NotifyFunction] => {
  const [title, setTitle] = useState<React.ReactNode>();
  const [description, setDescription] = useState<React.ReactNode>();
  const [visible, setVisible] = useState(false);

  const notify = (title: React.ReactNode, message?: React.ReactNode) => {
    setTitle(title);
    setDescription(message);
    setVisible(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setVisible(false);
        resolve();
      }, 3000);
    });
  };

  const NotificationDialog = (
    <Notification
      key="notification"
      visible={visible}
      title={title ?? ""}
      description={description}
    />
  );

  return [NotificationDialog, notify];
};
