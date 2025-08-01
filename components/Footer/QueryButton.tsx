"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";

const QueryButton = ({
  query,
  children,
}: {
  query: string;
  children: string;
}) => {
  const router = useRouter();

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
