import styles from "@/pages/music/FavoriteSongsOfYear/FavoriteSongsOfYear.module.css";

import { type ReactNode } from "react";

const Button = ({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      className={styles[selected ? "button-selected" : "button"]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
