import styles from "./Overview.module.css";

const Overview = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.containerHeader}>Favorite Songs</h1>
      <p className={styles.containerP}>
        One of my best friends has been ending his years by compiling a list of
        his top 13 songs from that year, so in 2017 I decided to do that as
        well! There are a couple rules, however.
      </p>
      <ul className={styles.containerList}>
        <li className={styles.containerListItem}>
          The song must be released during the current year. If it was released
          as a single the previous year but I didn't hear it until the current
          year AND it's included on an album that's been released during the
          current year, then it's fair game. If it was released as a single
          during the current year and I've heard it, then it can only be added
          to the list for that year.
        </li>
        <li className={styles.containerListItem}>
          Only one song per band/artist per year. This is a rule I added after
          2017 because I came to the realization that if a band releases an
          album I thoroughly enjoy, then the list will likely be filled with
          that album. This rule ensures that I'm still listening to new music
          throughout the year. One distinction about this, though, is if a
          member of a band releases music as a solo or with another group. For
          example, if System of a Down and Serj Tankian released music the same
          year, they both may be added to the list since they're different
          artists.
        </li>
        <li className={styles.containerListItem}>
          Covers <em>are</em> allowed, but should generally be rare. If I made a
          list in 2016, then Blank Space by I Prevail would have probably made
          the list. Bad Wolves' cover of Zombie made it in 2018 because it's a
          phenomenal cover. However, a cover can't be included simply because I
          like the original song. For example, in 2017, Avenged Sevenfold
          released a cover of Wish You Were Here by Pink Floyd, which is one of
          my favorite songs by them. Despite it being a favorite of mine by my
          favorite band, it did not make the cut because, as far as covers go,
          it's just simply <em>alright</em>.
        </li>
      </ul>
      <p className={styles.containerP}>
        Making this list every year has made me listen to a ton of new music I
        normally wouldn't listen to, and it's introduced me to several new bands
        that I wouldn't have heard of otherwise!
      </p>
    </div>
  );
};

export default Overview;
