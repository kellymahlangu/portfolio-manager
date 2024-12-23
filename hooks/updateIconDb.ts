import { createIconInDb } from "@/app/actions";
import { DeviconEntry } from "@/app/types";
import { prisma } from "@/lib/prisma";
import { useState, useCallback } from "react";

export function useBackgroundTask() {
  const [isRunning, setIsRunning] = useState(false);

  const updateIconDb = useCallback(async (entry: DeviconEntry) => {
    setIsRunning(true);

    // Simulate a long-running task
    const result = await createIconInDb(entry);

    return result;
  }, []);

  return { isRunning, updateIconDb };
}
