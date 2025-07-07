"use client";

import { useTransitionRouter } from "next-view-transitions";
import Button from "../Button";

const QueryButton = ({
  query,
  children,
}: {
  query: string;
  children: string;
}) => {
  const router = useTransitionRouter();

  return (
    <Button
      onClick={() => router.push(`/search?query=${query}`)}
      variant="secondary"
      className="border shadow-none"
    >
      {children}
    </Button>
  );
};

export default QueryButton;
