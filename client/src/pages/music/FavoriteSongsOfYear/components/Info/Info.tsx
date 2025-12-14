import styles from "./Info.module.css";
import type { Year } from "@/types/favorite-songs/Year";
import { formatDate } from "@/utils/date-time";

const Info = ({ year }: { year: Year }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.yearHeader}>{year.year}</h1>
      <h4 className={styles.yearSubHeader}>{formatDate(year.dateCreated)}</h4>
      <p className={styles.commentText}>{year.comment}</p>
    </div>
  );
};

export default Info;
