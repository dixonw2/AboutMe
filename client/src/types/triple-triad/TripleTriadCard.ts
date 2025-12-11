export interface TripleTriadCard {
  id: number;
  cardName: string;
  left: number;
  up: number;
  right: number;
  down: number;
  element: string | null;
  level: number;
  isPlayer: boolean | null;
}
