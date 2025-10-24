import { useEffect, useState } from "react";
import type TripleTriadCard from "@/types/TripleTriadCard";

const Card = () => {
  const [cards, setCards] = useState<TripleTriadCard[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const res = await fetch("api/triple-triad/cards");
      const data = await res.json();
      setCards(data);
    };
    getCards();
  }, []);

  const getCardImage = (cardName: string) => {
    const name = cardName.toLowerCase().replace(/[\s\-,]/g, "");
    return `/assets/triple-triad-cards/${name}.png`;
  };

  return (
    <div>
      {cards.map((card) => (
        <img
          key={card.id}
          src={getCardImage(card.cardName)}
          alt={card.cardName}
        />
      ))}
      <img src={getCardImage("back")} alt="Card Back" />
    </div>
  );
};

export default Card;
