const getBackground = (isPlayer: boolean | null) => {
  // if card is not assigned to a player, default to player background
  return `url('/assets/triple-triad/cards/${
    isPlayer === undefined || isPlayer ? "" : "opponent"
  }background.png')`;
};

export { getBackground };
