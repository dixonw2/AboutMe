DROP TABLE IF EXISTS v_songs;
DROP TABLE IF EXISTS v_year;
DROP TABLE IF EXISTS v_yearlycomment;

CREATE TABLE IF NOT EXISTS "MusicYear"
(
	"Id" SERIAL PRIMARY KEY,
	"Year" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Song"
(
	"Id" SERIAL PRIMARY KEY,
	"SongName" TEXT NOT NULL,
	"Artist" TEXT NOT NULL,
	"Album" TEXT NOT NULL,
	"Genre" TEXT NOT NULL,
	"Time" TEXT NOT NULL,
	"AppleMusicLink" TEXT NOT NULL,
	"SpotifyLink" TEXT NOT NULL,
	"IdYear" INT NOT NULL,
	CONSTRAINT fk_year
	FOREIGN KEY("IdYear") REFERENCES "MusicYear"("Id")
);

CREATE TABLE IF NOT EXISTS "YearlyComment"
(
	"Id" SERIAL PRIMARY KEY,
	"Comment" TEXT NOT NULL,
	"IdYear" INT NOT NULL,
	CONSTRAINT fk_year
	FOREIGN KEY("IdYear") REFERENCES "MusicYear"("Id")
);

DO $$
DECLARE
	v_year2017 INT;
	v_year2018 INT;
	v_year2019 INT;
BEGIN

CREATE TEMP TABLE v_year
(
	year INT
);

INSERT INTO v_year VALUES
	(2017),
	(2018),
	(2019);

INSERT INTO "MusicYear" ("Year")
SELECT vy.year
FROM v_year vy
LEFT JOIN "MusicYear" y ON y."Year" = vy.year
WHERE y."Id" IS NULL;

v_year2017 := (SELECT "Id" FROM "MusicYear" WHERE "Year" = 2017);
v_year2018 := (SELECT "Id" FROM "MusicYear" WHERE "Year" = 2018);
v_year2019 := (SELECT "Id" FROM "MusicYear" WHERE "Year" = 2019);

CREATE TEMP TABLE v_yearlycomment
(
	comment TEXT,
	idyear INT
);

INSERT INTO v_yearlycomment VALUES
	('2017 was the first year I made this list, and was before I made the rule of only one song per artist.  Looking back on it, I most definitely would switch out about half the songs with other ones released that year.  I find this to be the case with every year, however.  Sometimes it''s because my taste in music evolves, but it mostly seems to be because I start listening to a song the year after it''s released, especially if it was late in the year.  This is the year where it''s the former rather than the latter, however.--+--Out of my existing list, though, the three that I''ve kept listening to consistently since are Bear Claws, How Do You Feel?, and Less Than.', v_year2017),
	('After not liking that my 2017 list contained a couple songs from the same artist, I decided to impose the rule of no more than one song per artist.  An artist/band being featured on another artist/band''s song is okay, but it explicitly cannot be their song.  This made it more interesting for me since not only did I have to narrow down to a single song off of an album, I listened to songs and albums by other artists I may not have listened to before.--+--As far as songs I would switch out with other ones released in 2018, I would probably switch out a couple at most.  I really enjoyed most of the music I listened to that year and haven''t discovered more than a couple songs released in 2018 since that I would replace the others with.--+--Out of my existing list, the three I''ve continued listening to the most is difficult to pin down, but most likely Starlight, What is Love?, and Voices in My Head.', v_year2018),
	('This year actually was somewhat difficult to get enough songs for the list.  There were five albums that I primarily listened to because they were so good, meaning I didn''t listen to more artists I would have liked to because I had those albums almost exclusively on repeat at various times throughout the year.  If I did not create the rule of no more than one song per artist this list would have consisted of songs primarily by FEVER 333, BABYMETAL, TWICE, and The Maine.  I''m pretty sure the entire summer of 2019 I listened to almost exclusively FEVER 333, and October and November seemed as if BABYMETAL and TWICE had a reservation for my ears.  I ultimately decided on enough songs to consist of a solid list, though.--+--As with 2018, there''s one song, maybe two I would switch out with a song on this list, but overall I think the list was a pretty good one.--+--Out of my existing list, the three I''ve continued listening to the most, without question, are Brand New Day, LOVE FOOLISH, and THE INNOCENT.', v_year2019);

INSERT INTO "YearlyComment" ("Comment", "IdYear")
SELECT vyc.comment, vyc.idyear
FROM v_yearlycomment vyc
LEFT JOIN "YearlyComment" yc ON yc."IdYear" = vyc.idyear
WHERE yc."Id" IS NULL;

CREATE TEMP TABLE v_songs
(
	songname TEXT,
	artist TEXT,
	album TEXT,
	genre TEXT,
	time TEXT,
	applemusiclink TEXT,
	spotifylink TEXT,
	idyear INT NOT NULL
);

INSERT INTO v_songs (songname, artist, album, genre, time, applemusiclink, spotifylink, idyear) VALUES
	('Bear Claws', 'The Academic', 'Tales from the Backseat', 'Alternative', '3:33', 'https://music.apple.com/us/album/bear-claws/1481420364?i=1481420639', 'https://open.spotify.com/track/3lJIMpVTbmEwUXy0m4U9lU?si=Y2tEAMNZTcKHv-5rtUW-uw', v_year2017),
	('Never Sorry', 'All That Remains', 'Madness', 'Heavy Metal', '3:38', 'https://music.apple.com/us/album/never-sorry/1440946633?i=1215489068', 'https://open.spotify.com/track/3LNYKMfgG2UScseEv92XeP?si=q79um6KaRBKIi42XgnAuUA', v_year2017),
	('Shape of You', 'Ed Sheeran', '÷', 'Pop', '3:54', 'https://music.apple.com/us/album/shape-of-you/1193701079?i=1193701392', 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=vRSBIh8IRoyyx28ki8A4kA', v_year2017),
	('Sleeping Powder', 'Gorillaz', 'Sleeping Powder - Single', 'Alternative', '2:46', 'https://music.apple.com/us/album/sleeping-powder/1247590076?i=1247590729', 'https://open.spotify.com/track/5pE9vMyvVNOpZFutt6lyy4?si=1YzqViPySviqvfAUOpRtfg', v_year2017),
	('Call Ins', 'He Is Legend', 'Few', 'Rock', '3:42', 'https://music.apple.com/us/album/call-ins/1440879185?i=1203489960', 'https://open.spotify.com/track/2sIPY6ELRwL5ZKswDhAdpD?si=WxWyzgOlT5i44zEsXsPbPA', v_year2017),
	('State of the Art', 'Incubus', '8', 'Alternative', '3:47', 'https://music.apple.com/us/album/state-of-the-art/1440881253?i=1214441702', 'https://open.spotify.com/track/7mVIEjxqffN2F1Q3NUHKPG?si=ubA1Qd83QzuaE8OvuuNaSA', v_year2017),
	('Black Butterflies and Deja Vu', 'The Maine', 'Lovely Little Lonely', 'Alternative', '3:23', 'https://music.apple.com/us/album/black-butterflies-and-d%C3%A9j%C3%A0-vu/1209457468?i=1209457776', 'https://open.spotify.com/track/6QZ8h3RqIgTRTo3hfaqryx?si=MQs_VDxiSxmNvV69Mc90pw', v_year2017),
	('How Do You Feel?', 'The Maine', 'Lovely Little Lonely', 'Alternative', '4:22', 'https://music.apple.com/us/album/how-do-you-feel/1209457468?i=1209458135', 'https://open.spotify.com/track/6AH3IbS61PiabZYKVBqKAk?si=qe6392WFRFmMtYxvKWGPEQ', v_year2017),
	('Less Than', 'Nine Inch Nails', 'Add Violence - EP', 'Alternative', '3:30', 'https://music.apple.com/us/album/less-than/1260014946?i=1260015502', 'https://open.spotify.com/track/7jDKJSjIjT93v7brsZDcoT?si=3lWNDdyqT562pPjKkFMJnw', v_year2017),
	('The Doomed', 'A Perfect Circle', 'Eat the Elephant', 'Rock', '4:42', 'https://music.apple.com/us/album/the-doomed/1340651075?i=1340651425', 'https://open.spotify.com/track/44OUZyiPnJc4pOZw4J6pid?si=aFGC39FcSrOfbHYrseFdaw', v_year2017),
	('Fabuless', 'Stone Sour', 'Hydrograd', 'Heavy Rock', '4:01', 'https://music.apple.com/us/album/fabuless/1229163139?i=1229163686', 'https://open.spotify.com/track/72GH838JaxrCA8IFcXqgXm?si=PRGwwKLBTxmf_PuCrXSFmw', v_year2017),
	('Rx (Medicate)', 'Theory of a Deadman', 'Wake Up Call', 'Rock', '3:53', 'https://music.apple.com/us/album/rx-medicate/1262126917?i=1262126920', 'https://open.spotify.com/track/2UZtI2HUyLRzqBjodvcUmY?si=9PWzuSoET9GBqNBw7yEHiQ', v_year2017),
	('Feels Like Summer', 'Weezer', 'Pacific Daydream', 'Alternative', '3:15', 'https://music.apple.com/us/album/feels-like-summer/1270328038?i=1270328050', 'https://open.spotify.com/track/2jz1bw1p0WQj0PDnVDP0uY?si=zELXa9yQQnGE1DyfFrG-Tg', v_year2017),

	('Voices in my Head', 'Ashley Tisdale', 'Symptoms', 'Pop', '3:19', 'https://music.apple.com/us/album/voices-in-my-head/1439274076?i=1439274082', 'https://open.spotify.com/track/0Tyt3SyqRIsN0XHRyhD75J?si=lpG8T3WqRCW9lPnq6rWRZQ', v_year2018),
	('Starlight', 'BABYMETAL', 'METAL GALAXY', 'Metal', '3:36', 'https://music.apple.com/us/album/starlight/1475662687?i=1475663365', 'https://open.spotify.com/track/2iAIBHvSNH5oHrCCpmeaBV?si=S4h-k5gcS-GwTn9rPWaxPA', v_year2018),
	('Zombie', 'Bad Wolves', 'Zombie - Single', 'Hard Rock', '4:15', 'https://music.apple.com/us/album/zombie/1337765138?i=1337765670', 'https://open.spotify.com/track/1vNoA9F5ASnlBISFekDmg3?si=m7dQp_NXQUq0Uco1SHMJ0A', v_year2018),
	('Dice', 'BAND-MAID', 'World Domination', 'Rock', '4:03', 'https://music.apple.com/us/album/dice/1339560562?i=1339560706', 'https://open.spotify.com/track/26P0PvxuRYcgzxeHZ4rjD0?si=WfNu38s9RzSdtXWyvQp4mw', v_year2018),
	('The Dark Sentencer', 'Coheed and Cambria', 'The Unheavenly Creatures', 'Rock', '7:45', 'https://music.apple.com/us/album/the-dark-sentencer/1403404699?i=1403404719', 'https://open.spotify.com/track/0mP3O68nZjScrbgiD9UilH?si=NTrZYsczQvypVI22h0Dm9w', v_year2018),
	('Age of Man', 'Greta Van Fleet', 'Anthem of the Peaceful Army', 'Rock', '6:06', 'https://music.apple.com/us/album/age-of-man/1435351050?i=1435351490', 'https://open.spotify.com/track/54DIzLw4LLxB3n1XiiQftU?si=ZdHxkEnuSvGiXbWvTaKV8Q', v_year2018),
	('Supplies', 'Justin Timberlake', 'Man of the Woods', 'Pop', '3:46', 'https://music.apple.com/us/album/supplies/1330759954?i=1330760178', 'https://open.spotify.com/track/6jT85s2dZ55HBqjXYi2rfI?si=vFU9NkFkQ82xe_KPMpbHOg', v_year2018),
	('Over and Out', 'Nine Inch Nails', 'Bad Witch', 'Alternative', '7:50', 'https://music.apple.com/us/album/over-and-out/1383304609?i=1383305129', 'https://open.spotify.com/track/1J8CqSsS6ErrveimQyCvZa?si=g0JNXkWAT-u--PRJtFb-6Q', v_year2018),
	('Disillusioned', 'A Perfect Circle', 'Eat the Elephant', 'Rock', '5:54', 'https://music.apple.com/us/album/disillusioned/1340651075?i=1340651416', 'https://open.spotify.com/track/1O9DWF3578RHMxZg2nLPeM?si=X2P7kOpMQnm1i9RqUrgDCg', v_year2018),
	('Body Talks', 'The Struts', 'YOUNG & DANGEROUS', 'Rock', '2:58', 'https://music.apple.com/us/album/body-talks/1435805372?i=1435805536', 'https://open.spotify.com/track/6spaGIZEfeDYlgAupMI34k?si=AXzlF88cTPCuxgEm4tkdew', v_year2018),
	('COLORS', 'Tenacious D', 'Post-Apocalypto', 'Rock', '2:20', 'https://music.apple.com/us/album/colors/1434624186?i=1434624879', 'https://open.spotify.com/track/40rChMoUd1VXb4TKgTuTSP?si=e1c7lIuLRtGoeEvgAoAdaA', v_year2018),
	('My Blood', 'twenty one pilots', 'Trench', 'Alternative', '3:49', 'https://music.apple.com/us/album/my-blood/1422828208?i=1422828213', 'https://open.spotify.com/track/5HeKOKc4phmLn8e4I7EkzD?si=Fc2HzHleRu6xWysTHN_s9w', v_year2018),
	('What is Love?', 'TWICE', 'What is Love?', 'K-Pop', '3:28', 'https://music.apple.com/us/album/what-is-love/1500793132?i=1500793145', 'https://open.spotify.com/track/7ogyhvfoPn27BDswIUHMm1?si=21kbV4pYRgqjVzG5myxxWg', v_year2018),

	('Feeling so Good', 'Ashley Tisdale', 'Symptoms', 'Pop', '3:07', 'https://music.apple.com/us/album/feeling-so-good/1457934050?i=1457934217', 'https://open.spotify.com/track/4GAFlFLouTialsJv1kiKaC?si=KeGHDOGISVK1OfkpPfmBjQ', v_year2019),
	('Brand New Day', 'BABYMETAL', 'METAL GALAXY', 'Metal', '4:11', 'https://music.apple.com/us/album/brand-new-day-feat-tim-henson-scott-lepage/1475662687?i=1475663063', 'https://open.spotify.com/track/0FpJdOwxVYjN0UCIG6ovcR?si=0WGaMwj5RMaTWr899XuI4A', v_year2019),
	('Promise Me', 'Badflower', 'OK, I''M SICK', 'Alternative', '3:50', 'https://music.apple.com/us/album/promise-me/1440357164?i=1440357294', 'https://open.spotify.com/track/5TU1cWjUGyVKjSnIIxRSEf?si=lDZLgyyfTaO3u69RMIvQ0g', v_year2019),
	('mother tongue', 'Bring Me the Horizon', 'amo', 'Rock', '3:37', 'https://music.apple.com/us/album/mother-tongue/1439239477?i=1439240076', 'https://open.spotify.com/track/5IwUFTiNkarb5HEtNRtRtc?si=eqv3SLmxR-Oz8Rzo4-zA2A', v_year2019),
	('THE INNOCENT', 'FEVER 333', 'STRENGTH IN NUMB333RS', 'Hard Rock', '3:22', 'https://music.apple.com/us/album/the-innocent/1441326645?i=1441326655', 'https://open.spotify.com/track/1Y2FJpsOmfqfFuqS0KatUu?si=HQ9weJNfSA2RrFxmDc-G7w', v_year2019),
	('Flowers on the Grave', 'The Maine', 'You Are OK', 'Alternative', '9:23', 'https://music.apple.com/us/album/flowers-on-the-grave/1451377141?i=1451377387', 'https://open.spotify.com/track/2rsgWz1uCAsUlcjD12axTx?si=lRnJCghrSY2tWAn-zNNI7g', v_year2019),
	('Miracle Man', 'Oliver Tree', 'Ugly is Beautiful', 'Alternative', '2:05', 'https://music.apple.com/us/album/miracle-man/1514394064?i=1514394491', 'https://open.spotify.com/track/2PFnwW05Wh0MYkfZxSwfuf?si=70DtyT-GTpOOlYK_uFtMpw', v_year2019),
	('Diseased Almost', 'Puddle of Mudd', 'Welcome to Galvania', 'Rock', '3:42', 'https://music.apple.com/us/album/diseased-almost/1471037643?i=1471037656', 'https://open.spotify.com/track/7HaT692mQsfESjwD3TH8Uo?si=mk5lzRy7Q-ez-dI5gSPmGQ', v_year2019),
	('Beast', 'Saint Asonia', 'Flawed Design', 'Rock', '3:27', 'https://music.apple.com/us/album/beast/1478636853?i=1478637002', 'https://open.spotify.com/track/0AVKG4Qu7ubCzPlrWuhpMS?si=MmIgMU2BRMmwYDxIUS30cw', v_year2019),
	('Nero Forte', 'Slipknot', 'We Are Not Your Kind', 'Metal', '5:15', 'https://music.apple.com/us/album/nero-forte/1463706038?i=1463706044', 'https://open.spotify.com/track/56fiFTRrSiHHH3gBeaTg2P?si=_rMlPQsyRJSctPAQGLb80w', v_year2019),
	('Descending', 'Tool', 'Fear Inoculum', 'Rock', '13:38', 'https://music.apple.com/us/album/descending/1475686696?i=1475687061', 'https://open.spotify.com/track/0aTiUssEOy0Mt69bsavj6K?si=qKoZqggfQe2JniXWa6oWCg', v_year2019),
	('LOVE FOOLISH', 'TWICE', 'Feel Special', 'K-Pop', '3:11', 'https://music.apple.com/us/album/love-foolish/1500796072?i=1500796478', 'https://open.spotify.com/track/5ipJi9h2ghaThn6EUwO3B2?si=p8ZSd5rpSzCE9QHjZ33TvA', v_year2019),
	('Blow Me (feat. Jason Aalon Butler)', 'The Used', 'Heartwork', 'Rock', '3:21', 'https://music.apple.com/us/album/blow-me-feat-jason-aalon-butler/1496886925?i=1496887423', 'https://open.spotify.com/track/1vS7jjy99wfMVVC9nzZtX1?si=dT74ShvvRtGcUfwlkU0fsw', v_year2019);

INSERT INTO "Song" ("SongName", "Artist", "Album", "Genre", "Time", "AppleMusicLink", "SpotifyLink", "IdYear")
SELECT vs.songname, vs.artist, vs.album, vs.genre, vs.time, vs.applemusiclink, vs.spotifylink, vs.idyear
FROM v_songs vs
LEFT JOIN "Song" s ON s."SongName" = vs.songname AND s."Artist" = vs.artist
WHERE s."Id" IS NULL;
END $$;