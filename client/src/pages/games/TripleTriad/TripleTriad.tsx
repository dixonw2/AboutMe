import type { TripleTriadCard } from "@/types/triple-triad/TripleTriadCard";
import { useEffect, useState } from "react";

import styles from "./TripleTriad.module.css";
import Hand from "./components/Hand/Hand";
import Board from "./components/Board/Board";
import Button from "@/components/Button";

import { getAdjacentFlips } from "@/utils/triple-triad";

const TripleTriad = () => {
  const boardReset = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [hand, setHand] = useState<TripleTriadCard[]>([]);
  const [opponentHand, setOpponentHand] = useState<TripleTriadCard[]>([]);
  const [board, setBoard] = useState<(TripleTriadCard | null)[][]>(boardReset);
  const [selectedCard, setSelectedCard] = useState<TripleTriadCard | null>(
    null
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [gameType, setGameType] = useState("quickplay");

  const getRandomHands = async () => {
    const [player, opponent] = await Promise.all([
      fetch("/api/games/triple-triad/cards/random/hand"),
      fetch("/api/games/triple-triad/cards/random/hand"),
    ]);
    const playerData: TripleTriadCard[] = await player.json();
    const opponentData: TripleTriadCard[] = await opponent.json();
    setHand(playerData.map((card) => ({ ...card, isPlayer: true })));
    setOpponentHand(opponentData.map((card) => ({ ...card, isPlayer: false })));
  };

  const handleSelectCard = (card: TripleTriadCard) => {
    if (!card.isPlayer) return;
    if (selectedCard?.id === card.id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  };

  const handleReset = () => {
    setHand([]);
    setOpponentHand([]);
    getRandomHands();
    setBoard(boardReset);
  };

  const handleStart = () => {
    if (gameStarted) return;
    setGameStarted(true);
    if (gameType === "quickplay") {
      handleReset();
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

    // Update board state after both players move
    setBoard(newBoard);
    setHand((prev) => prev.filter((c) => c.id !== selectedCard.id));
    setSelectedCard(null);
  };

  const opponentPlayCard = (boardState: (TripleTriadCard | null)[][]) => {
    if (opponentHand.length === 0) return boardState;

    let bestNumFlips = -1;
    let bestMove: { row: number; col: number; card: TripleTriadCard } | null =
      null;

    for (const card of opponentHand) {
      for (let r = 0; r < boardState.length; r++) {
        for (let c = 0; c < boardState[r].length; c++) {
          if (boardState[r][c] !== null) continue;

          const numFlips = getAdjacentFlips(r, c, card, boardState).length;
          if (numFlips > bestNumFlips) {
            bestNumFlips = numFlips;
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

  useEffect(() => {
    setGameStarted(false);
  }, [gameType]);

  const playerScore = board.flat().filter((card) => card?.isPlayer).length;
  const oppScore = board.flat().filter((card) => card && !card.isPlayer).length;
  const gameOver = board.flat().filter((card) => card !== null).length === 9;

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
      <div>
        <Button
          onClick={() => setGameType("quickplay")}
          selected={gameType === "quickplay"}
        >
          QuickPlay
        </Button>
        <Button
          onClick={() => setGameType("gauntlet")}
          selected={gameType === "gauntlet"}
        >
          Gauntlet
        </Button>
      </div>
      {gameStarted && (
        <div>
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
            <h3>You: {playerScore}</h3>
            {gameOver && (
              <h3>Winner: {playerScore > oppScore ? "You" : "Opponent"}</h3>
            )}
            <h3>Opponent: {oppScore}</h3>
          </div>
        </div>
      )}
      {gameStarted && gameType === "quickplay" && (
        <button onClick={handleReset}>Reset Game</button>
      )}
      {!gameStarted && (
        <button onClick={handleStart} disabled={gameType === "gauntlet"}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default TripleTriad;
