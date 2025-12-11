import type { TripleTriadCard } from "@/types/triple-triad/TripleTriadCard";
import { useEffect, useState } from "react";

import styles from "./TripleTriad.module.css";
import Hand from "./components/Hand/Hand";
import Board from "./components/Board/Board";

const TripleTriad = () => {
  const [hand, setHand] = useState<TripleTriadCard[]>([]);
  const [opponentHand, setOpponentHand] = useState<TripleTriadCard[]>([]);
  const [board, setBoard] = useState<(TripleTriadCard | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [selectedCard, setSelectedCard] = useState<TripleTriadCard | null>(
    null
  );

  useEffect(() => {
    const getHands = async () => {
      const [player, opponent] = await Promise.all([
        fetch("/api/games/triple-triad/cards/random/hand"),
        fetch("/api/games/triple-triad/cards/random/hand"),
      ]);
      const playerData: TripleTriadCard[] = await player.json();
      const opponentData: TripleTriadCard[] = await opponent.json();
      setHand(playerData.map((card) => ({ ...card, isPlayer: true })));
      setOpponentHand(
        opponentData.map((card) => ({ ...card, isPlayer: false }))
      );
    };
    getHands();
  }, []);

  const handleSelectCard = (card: TripleTriadCard) => {
    if (!card.isPlayer) return;
    if (selectedCard?.id === card.id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  };

  const handlePlayCard = (row: number, col: number) => {
    if (!selectedCard || board[row][col] !== null) return;

    let newBoard = board.map((r) => [...r]);
    newBoard[row][col] = selectedCard;

    const flips = getAdjacentFlips(row, col, selectedCard, newBoard);
    for (const f of flips) {
      newBoard[f.r][f.c] = { ...f.card, isPlayer: selectedCard.isPlayer };
    }

    newBoard = opponentPlayCard(newBoard);
    setBoard(newBoard);
    setHand((prev) => prev.filter((c) => c.id !== selectedCard.id));
    setSelectedCard(null);
  };

  // returns which cards should be flipped at a given index
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

  const evaluateMove = (
    row: number,
    col: number,
    card: TripleTriadCard,
    boardState: (TripleTriadCard | null)[][]
  ) => {
    return getAdjacentFlips(row, col, card, boardState).length;
  };

  const opponentPlayCard = (boardState: (TripleTriadCard | null)[][]) => {
    if (opponentHand.length === 0) return boardState;

    let bestScore = -1;
    let bestMove: { row: number; col: number; card: TripleTriadCard } | null =
      null;

    for (const card of opponentHand) {
      for (let r = 0; r < boardState.length; r++) {
        for (let c = 0; c < boardState[r].length; c++) {
          if (boardState[r][c] !== null) continue;

          const score = evaluateMove(r, c, card, boardState);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: r, col: c, card };
          }
        }
      }
    }

    if (!bestMove) return boardState;
    const newBoard = boardState.map((r) => [...r]);
    newBoard[bestMove.row][bestMove.col] = bestMove.card;

    const flips = getAdjacentFlips(
      bestMove.row,
      bestMove.col,
      bestMove.card,
      newBoard
    );
    for (const f of flips) {
      newBoard[f.r][f.c] = { ...f.card, isPlayer: bestMove.card.isPlayer };
    }

    setOpponentHand((prev) => prev.filter((c) => c.id !== bestMove!.card.id));

    return newBoard;
  };

  return (
    <div>
      <title>Triple Triad</title>
      <h1>Triple Triad</h1>
      <p>
        Triple Triad is a game from the video game Final Fantasy VIII. It's
        essentially a card game where the player selects five cards and battles
        the opponent by placing a card on a 3x3 grid. The goal is to "capture"
        their cards by placing a card on an adjacent space with a higher value
        on the touching side. The winner is whoever has the most cards once all
        spaces have been filled.
      </p>
      <div className={styles.gameLayout}>
        <Hand
          cards={hand}
          onSelect={handleSelectCard}
          selected={selectedCard}
        />
        <Board
          board={board}
          onPlayCard={handlePlayCard}
          hasSelected={!!selectedCard}
        />
        <Hand
          cards={opponentHand}
          onSelect={handleSelectCard}
          selected={selectedCard}
        />
      </div>
      <div className={styles.scoreLayout}>
        <div>
          You:{" "}
          {board.flat().filter((card) => card?.isPlayer).length + hand.length}
        </div>
        {board.flat().filter((card) => card !== null).length === 9 ? (
          <div>
            Winner:{" "}
            {board.flat().filter((card) => card?.isPlayer).length >
            board.flat().filter((card) => card && !card.isPlayer).length
              ? "You"
              : "Opponent"}
          </div>
        ) : (
          <div></div>
        )}
        <div>
          Opponent:{" "}
          {board.flat().filter((card) => card && !card.isPlayer).length +
            opponentHand.length}
        </div>
      </div>
    </div>
  );
};

export default TripleTriad;
