import styles from "../FavoriteSongsOfYear.module.css";
import type Year from "@/types/favorite-songs/Year";
import { formatDate } from "@/utils/date-time";

const YearInfo = ({ year }: { year: Year }) => {
  return (
    <div className={styles["comment"]}>
      <h1 className={styles["year-header"]}>{year.year}</h1>
      <h4 className={styles["year-subheader"]}>
        {formatDate(year.dateCreated)}
      </h4>
      <p>{year.comment}</p>
    </div>
  );
};

export default YearInfo;
