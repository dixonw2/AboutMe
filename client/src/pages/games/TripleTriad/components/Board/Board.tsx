import Card from "../Card/Card";
import styles from "./Board.module.css";

import type { TripleTriadCard } from "@/types/triple-triad/TripleTriadCard";

const Board = ({
  board,
  onPlayCard,
  hasSelected,
}: {
  board: (TripleTriadCard | null)[][];
  onPlayCard: (row: number, col: number) => void;
  hasSelected: boolean;
}) => {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${styles.cell} ${
              hasSelected ? styles.empty : styles.filled
            }`}
            onClick={() => onPlayCard(rowIndex, colIndex)}
          >
            {cell && (
              <div className={styles.filled}>
                <Card card={cell} selected={false} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
