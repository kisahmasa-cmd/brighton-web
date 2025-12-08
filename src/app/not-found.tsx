import { Metadata } from "next";
import ErrorPage from "@/components/custom/ErrorPage";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Page not found",
  robots: {
    index: false, // noindex
    follow: false, // nofollow
  },
};

export default function NotFoundPage() {
  return <ErrorPage isNotFound />;
}
