import type TripleTriadCard from "@/types/TripleTriadCard";

const Card = ({
  card,
  opponent,
}: {
  card: TripleTriadCard;
  opponent: boolean;
}) => {
  const getCardImage = (cardName: string) => {
    const name = cardName.toLowerCase().replace(/[\s\-,]/g, "");
    return `/assets/triple-triad/cards/${name}.png`;
  };

  return (
    <img
      key={card.id}
      src={getCardImage(card.cardName)}
      alt={card.cardName}
      style={{
        backgroundImage: `url(/assets/triple-triad/cards/${
          opponent ? "opponent" : ""
        }background.png)`,
      }}
    />
  );
};

export default Card;
