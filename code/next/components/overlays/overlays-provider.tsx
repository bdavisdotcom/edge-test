"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import useConfirm, { ConfirmFunction } from "@/components/overlays/use-confirm";
import { NotifyFunction, useNotification } from "@/components/overlays/use-notification";

type OverlaysContextProps = {
  confirm: ConfirmFunction;
  notify: NotifyFunction;
};

const OverlaysContext = createContext<OverlaysContextProps>({
  confirm: async () => true,
  notify: async () => undefined,
});

export const useOverlay = () => useContext(OverlaysContext);

export const OverlaysProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [Confirmation, confirm] = useConfirm();
  const [Notification, notify] = useNotification();

  return (
    <OverlaysContext.Provider value={{ confirm, notify }}>
      {Confirmation}
      {Notification}
      {children}
    </OverlaysContext.Provider>
  );
};
