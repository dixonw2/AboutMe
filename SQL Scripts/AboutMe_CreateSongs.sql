DROP TABLE IF EXISTS v_songs;

CREATE TABLE IF NOT EXISTS song
(
	id SERIAL PRIMARY KEY,
	song TEXT NOT NULL,
	artist TEXT NOT NULL,
	album TEXT NOT NULL,
	genre TEXT NOT NULL,
	time TEXT NOT NULL,
	applemusiclink TEXT NOT NULL,
	spotifylink TEXT NOT NULL,
	year_id INT,
	CONSTRAINT fk_year
	FOREIGN KEY(year_id) REFERENCES year(id)
);

DO $$
DECLARE v_year INT;
BEGIN
v_year := (SELECT id FROM year WHERE year = 2017);
CREATE TEMP TABLE v_songs
(
	song TEXT,
	artist TEXT,
	album TEXT,
	genre TEXT,
	time TEXT,
	applemusiclink TEXT,
	spotifylink TEXT,
	year_id INT
);

INSERT INTO v_songs VALUES
('Bear Claws', 'The Academic', 'Tales from the Backseat', 'Alternative', '3:33', 'https://music.apple.com/us/album/bear-claws/1481420364?i=1481420639', 'https://open.spotify.com/track/3lJIMpVTbmEwUXy0m4U9lU?si=Y2tEAMNZTcKHv-5rtUW-uw', v_year),
('Never Sorry', 'All That Remains', 'Madness', 'Heavy Metal', '3:38', 'https://music.apple.com/us/album/never-sorry/1440946633?i=1215489068', 'https://open.spotify.com/track/3LNYKMfgG2UScseEv92XeP?si=q79um6KaRBKIi42XgnAuUA', v_year),
('Shape of You', 'Ed Sheeran', '÷', 'Pop', '3:54', 'https://music.apple.com/us/album/shape-of-you/1193701079?i=1193701392', 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=vRSBIh8IRoyyx28ki8A4kA', v_year),
('Sleeping Powder', 'Gorillaz', 'Sleeping Powder - Single', 'Alternative', '2:46', 'https://music.apple.com/us/album/sleeping-powder/1247590076?i=1247590729', 'https://open.spotify.com/track/5pE9vMyvVNOpZFutt6lyy4?si=1YzqViPySviqvfAUOpRtfg', v_year),
('Call Ins', 'He Is Legend', 'Few', 'Rock', '3:42', 'https://music.apple.com/us/album/call-ins/1440879185?i=1203489960', 'https://open.spotify.com/track/2sIPY6ELRwL5ZKswDhAdpD?si=WxWyzgOlT5i44zEsXsPbPA', v_year),
('State of the Art', 'Incubus', '8', 'Alternative', '3:47', 'https://music.apple.com/us/album/state-of-the-art/1440881253?i=1214441702', 'https://open.spotify.com/track/7mVIEjxqffN2F1Q3NUHKPG?si=ubA1Qd83QzuaE8OvuuNaSA', v_year),
('Black Butterflies and Deja Vu', 'The Maine', 'Lovely Little Lonely', 'Alternative', '3:23', 'https://music.apple.com/us/album/black-butterflies-and-d%C3%A9j%C3%A0-vu/1209457468?i=1209457776', 'https://open.spotify.com/track/6QZ8h3RqIgTRTo3hfaqryx?si=MQs_VDxiSxmNvV69Mc90pw', v_year),
('How Do You Feel?', 'The Maine', 'Lovely Little Lonely', 'Alternative', '4:22', 'https://music.apple.com/us/album/how-do-you-feel/1209457468?i=1209458135', 'https://open.spotify.com/track/6AH3IbS61PiabZYKVBqKAk?si=qe6392WFRFmMtYxvKWGPEQ', v_year),
('Less Than', 'Nine Inch Nails', 'Add Violence - EP', 'Alternative', '3:30', 'https://music.apple.com/us/album/less-than/1260014946?i=1260015502', 'https://open.spotify.com/track/7jDKJSjIjT93v7brsZDcoT?si=3lWNDdyqT562pPjKkFMJnw', v_year),
('The Doomed', 'A Perfect Circle', 'Eat the Elephant', 'Rock', '4:42', 'https://music.apple.com/us/album/the-doomed/1340651075?i=1340651425', 'https://open.spotify.com/track/44OUZyiPnJc4pOZw4J6pid?si=aFGC39FcSrOfbHYrseFdaw', v_year),
('Fabuless', 'Stone Sour', 'Hydrograd', 'Heavy Rock', '4:01', 'https://music.apple.com/us/album/fabuless/1229163139?i=1229163686', 'https://open.spotify.com/track/72GH838JaxrCA8IFcXqgXm?si=PRGwwKLBTxmf_PuCrXSFmw', v_year),
('Rx (Medicate)', 'Theory of a Deadman', 'Wake Up Call', 'Rock', '3:53', 'https://music.apple.com/us/album/rx-medicate/1262126917?i=1262126920', 'https://open.spotify.com/track/2UZtI2HUyLRzqBjodvcUmY?si=9PWzuSoET9GBqNBw7yEHiQ', v_year),
('Feels Like Summer', 'Weezer', 'Pacific Daydream', 'Alternative', '3:15', 'https://music.apple.com/us/album/feels-like-summer/1270328038?i=1270328050', 'https://open.spotify.com/track/2jz1bw1p0WQj0PDnVDP0uY?si=zELXa9yQQnGE1DyfFrG-Tg', v_year);
END $$;

INSERT INTO song (song, artist, album, genre, time, applemusiclink, spotifylink, year_id)
SELECT VS.song, VS.artist, VS.album, VS.genre, VS.time, VS.applemusiclink, VS.spotifylink, VS.year_id
FROM v_songs VS
LEFT JOIN song S ON S.song = VS.song AND S.artist = VS.artist
WHERE S.id IS NULL;

SELECT s.song, s.artist, s.album, s.genre, s.time, y.year
FROM song s
JOIN year y ON y.id = s.year_id;