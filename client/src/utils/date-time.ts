const formatDate = (date: string) => {
  const truncated = date.split(".")[0] + "Z";
  const dateString = new Date(truncated);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(dateString);
};

const convertToTime = (time: string) => {
  const [mm, ss] = time.split(":").map(Number);
  return `00:${mm.toString().padStart(2, "0")}:${ss
    .toString()
    .padStart(2, "0")}`;
};

const convertToDate = (date: string) => {
  // force timezone to have accurate date
  return new Date(`${date}T00:00:00`).toLocaleDateString();
};

export { formatDate, convertToTime, convertToDate };
