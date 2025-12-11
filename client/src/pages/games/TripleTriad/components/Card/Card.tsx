import styles from "./Card.module.css";
import type { TripleTriadCard } from "@/types/triple-triad/TripleTriadCard";

import { getBackground } from "@/utils/triple-triad";

const Card = ({
  card,
  selected,
}: {
  card: TripleTriadCard;
  selected: boolean;
}) => {
  const getImgPath = () => {
    const name = card.cardName.toLowerCase().replace(/[\s\-,]/g, "");
    return `/assets/triple-triad/cards/${name}.png`;
  };

  const getValue = (value: number) => {
    return value === 10 ? "A" : value.toString();
  };

  return (
    <div
      className={`${styles.cardContainer} ${selected ? styles.selected : ""}`}
    >
      <img
        src={getImgPath()}
        style={{
          backgroundImage: getBackground(card.isPlayer),
        }}
        alt={card.cardName}
        className={`${styles.cardImage}`}
      />

      <div className={`${styles.cardValue} ${styles.top}`}>
        {getValue(card.up)}
      </div>
      <div className={`${styles.cardValue} ${styles.right}`}>
        {getValue(card.right)}
      </div>
      <div className={`${styles.cardValue} ${styles.bottom}`}>
        {getValue(card.down)}
      </div>
      <div className={`${styles.cardValue} ${styles.left}`}>
        {getValue(card.left)}
      </div>
      <div className={`${styles.cardValue} ${styles.text}`}>
        {card.cardName}
      </div>
    </div>
  );
};

export default Card;
