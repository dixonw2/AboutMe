import React, { useEffect, useState } from "react";

export default function YearlyComment({ year }) {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getYearlyComment = async () => {
      const params = new URLSearchParams();
      if (year !== undefined && year !== null) {
        params.append("year", year);
      }
      const response = await fetch(
        `api/music/favorite-songs/comments?${params.toString()}`
      );
      const commentData = await response.json();
      setComment(commentData[0]);
      setLoading(false);
    };

    getYearlyComment();
  }, [year]);

  if (loading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

  const text = comment?.comment ?? "";
  return (
    <>
      {text.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </>
  );
}
