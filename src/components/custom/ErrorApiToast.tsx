"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorApiToast(props: { error?: string }) {
  const { error } = props;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return null; // tidak render apa-apa
}
