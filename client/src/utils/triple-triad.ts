import type { TripleTriadCard } from "@/types/triple-triad/TripleTriadCard";

const getBackground = (isPlayer: boolean | null) => {
  // if card is not assigned to a player, default to player background
  return `url('/assets/triple-triad/cards/${
    isPlayer === undefined || isPlayer ? "" : "opponent"
  }background.png')`;
};

// returns which adjacent cards should be flipped for a given index
const getAdjacentFlips = (
  row: number,
  col: number,
  card: TripleTriadCard,
  boardState: (TripleTriadCard | null)[][]
) => {
  const flips: Array<{ r: number; c: number; card: TripleTriadCard }> = [];
  const up = boardState[row - 1]?.[col];
  const left = boardState[row]?.[col - 1];
  const down = boardState[row + 1]?.[col];
  const right = boardState[row]?.[col + 1];

  if (up && up.isPlayer !== card.isPlayer && up.down < card.up)
    flips.push({ r: row - 1, c: col, card: up });
  if (left && left.isPlayer !== card.isPlayer && left.right < card.left)
    flips.push({ r: row, c: col - 1, card: left });
  if (down && down.isPlayer !== card.isPlayer && down.up < card.down)
    flips.push({ r: row + 1, c: col, card: down });
  if (right && right.isPlayer !== card.isPlayer && right.left < card.right)
    flips.push({ r: row, c: col + 1, card: right });

  return flips;
};

export { getBackground, getAdjacentFlips };
