import type { ReactNode } from "react";

const Comment = ({ children, year }: { children: ReactNode; year: number }) => {
  return (
    <>
      <h1>Favorite Songs of {year}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{children}</p>
    </>
  );
};

export default Comment;
