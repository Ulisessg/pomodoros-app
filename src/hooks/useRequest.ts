import { useCallback, useRef, useState } from "react";

export default function useRequest(): UseRequest {
  const allowedStatus = useRef<Map<Status, string>>(
    new Map([
      ["none", ""],
      ["pending", ""],
      ["fulfilled", ""],
      ["error", ""],
    ])
  );
  const [status, setStatus] = useState<Status>("none");

  const restartStatus = useCallback(async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 2000);
    });
    setStatus("none");
  }, []);

  const updateStatus: UseRequest["updateStatus"] = (newStatus) => {
    if (typeof allowedStatus.current.get(newStatus) === "undefined") {
      throw new Error("Status no allowed");
    }
    setStatus(newStatus);
  };
  return {
    status,
    updateStatus,
    restartStatus,
  };
}

interface UseRequest {
  status: Status;
  // eslint-disable-next-line no-unused-vars
  updateStatus: (newStatus: Status) => void;
  restartStatus: () => Promise<void>;
}

export type Status = "none" | "pending" | "fulfilled" | "error";
