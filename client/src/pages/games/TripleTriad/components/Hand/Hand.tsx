import Card from "../Card/Card";
import type { TripleTriadCard } from "@/types/triple-triad/TripleTriadCard";
import styles from "./Hand.module.css";

const Hand = ({
  cards,
  onSelect,
  selected,
}: {
  cards: TripleTriadCard[];
  onSelect: (card: TripleTriadCard) => void;
  selected: TripleTriadCard | null;
}) => {
  return (
    <div className={styles.hand}>
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onSelect(card)}
          className={styles.cardWrapper}
        >
          <Card
            card={card}
            selected={selected?.id === card.id && !!card.isPlayer}
          />
        </div>
      ))}
    </div>
  );
};

export default Hand;
