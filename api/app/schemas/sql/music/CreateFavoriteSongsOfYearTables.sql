------- Create initial comments -------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE [name] = 'FavoriteSongsOfYearComments' AND schema_id = SCHEMA_ID('Music'))
BEGIN
    CREATE TABLE Music.FavoriteSongsOfYearComments (
        [Year] INT PRIMARY KEY,
        Comment NVARCHAR(MAX) NOT NULL,
		DateCreated DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
		DateLastUpdated DATETIME2,
    );
END

CREATE TABLE #TempYearsComments (
	[Year] INT UNIQUE,
	Comment NVARCHAR(MAX) NOT NULL
);

INSERT INTO #TempYearsComments ([Year], Comment)
VALUES
	(2017, N'2017 was the first year I made this list, and was before I made the rule of only one song per artist.  Looking back on it, I most definitely would switch out about half the songs with other ones released that year.  I find this to be the case with every year, however.  Sometimes it''s because my taste in music evolves, but it mostly seems to be because I start listening to a song the year after it''s released, especially if it was late in the year.  This is the year where it''s the former rather than the latter, however.' + CHAR(10) + CHAR(10) + 'Out of my existing list, though, the three that I''ve kept listening to consistently since are Bear Claws, How Do You Feel?, and Less Than.'),
	(2018, N'After not liking that my 2017 list contained a couple songs from the same artist, I decided to impose the rule of no more than one song per artist.  An artist/band being featured on another artist/band''s song is okay, but it explicitly cannot be their song.  This made it more interesting for me since not only did I have to narrow down to a single song off of an album, I had to listen to songs and albums by other artists I may not have listened to before.' + CHAR(10) + CHAR(10) + 'As far as songs I would switch out with other ones released in 2018, I would probably switch out only a couple at most.  I really enjoyed most of the music I listened to that year and haven''t discovered more than a couple songs released in 2018 since that I would replace the others with.' + CHAR(10) + CHAR(10) + 'Out of my existing list, the three I''ve continued listening to the most is difficult to pin down, but most likely Starlight, What is Love?, and Voices in My Head.'),
	(2019, N'This year actually was somewhat difficult to get enough songs for the list.  There were five albums that I primarily listened to because they were so good, meaning I didn''t listen to more artists I would have liked to because I had those albums almost exclusively on repeat at various times throughout the year.  If I did not create the rule of no more than one song per artist this list would have consisted of songs primarily by FEVER 333, BABYMETAL, TWICE, and The Maine.  I''m pretty sure the entire summer of 2019 I listened to almost exclusively FEVER 333, and October and November seemed as if BABYMETAL and TWICE had a reservation for my time.  I ultimately decided on enough songs to consist of a solid list, though.' + CHAR(10) + CHAR(10) + 'As with 2018, there''s one song, maybe two I would switch out with a song on this list, but overall I think the list was a pretty good one.' + CHAR(10) + CHAR(10) + 'Out of my existing list, the three I''ve continued listening to the most, without question, are Brand New Day, LOVE FOOLISH, and THE INNOCENT.'),
	(2020, N'TWICE makes their third appearance, as does BABYMETAL (even if it is just a feature)!  If I had been more into TWICE in 2017, they would have made an appearance every year since I''ve started this.  Overall, I was somewhat pleased with the music released in 2020.  System of a Down, a favorite of mine, released their first music in over a decade.  Selena Gomez and DREAMCATCHER, a new find for me, had superb albums released at the beginning of the year (I vividly remember this because of COVID), so it was difficult picking one song from each album.  Besides those and the FEVER 333 song, though, I kind of struggled to really get a solid top 13.  John the Ghost is the singer for one of my favorite bands that has made many appearances already (The Maine), so that wasn''t very difficult, but otherwise there are a few songs I haven''t listened to much since.  I had hoped that quarantine would provide artists with some more time, but of course they may have easily just taken it as time off.  I had several concerts lined up for this year, and every single one got cancelled, so it would make sense.' + CHAR(10) + CHAR(10) + 'Out of this year, the three songs I''ve continued to listen to are A Sweeter Place, UP NO MORE, and PRESENCE IS STRENGTH.'),
	(2021, N'This year was, like 2019, a bit difficult to compile.  Most of the songs are songs I listened to towards the beginning of the year.  TWICE again makes an appearance, and another K-Pop artist (IU) makes a first appearance.  I''ve listened to several of the artists on the list previously, so it was nice to hear their newer music and to say I''m still a fan.  The Hunna was a band I discovered at a show for Jimmy Eat World years ago, so I was happy to enjoy some of their newer music.  As for some of the others (The Blue Stones, ERRA, IU, and Teenage Wrist), I loved discovering their music this year and obsessively listening to it.  While I was down in Georgia for work, these artists accompanied me while I was sitting in a warehouse for 11 hours a day.' + CHAR(10) + CHAR(10) + 'For this year, the three songs that I''ve religiously listened to are Bad Place, Lilac, and Always The Same.  Lilac is a song I listened to over 40 times in a single day while I was in Georgia, for example!  I can''t say I''m proud of that detail.'),
	(2022, N'This was once again another year that I found it difficult to find enough new music to fill the list.  ERRA and The Blue Stones make a return, and Electric Callboy was a fantastic discovery!  I was not surprised that TWICE made the list again.  When I first listened to Talk that Talk I wasn''t that impressed, but it quickly became one of my favorites of theirs.' + CHAR(10) + CHAR(10) + 'Despite the trouble I had with finding songs to add to the list, I listen to most of the songs on this list a lot to this day.  Now that I''ve given more music from the year a chance there are songs I would certainly swap out with others that are on the list, but overall I enjoyed it.  The three songs on this list that I listen to the most still today are Neon, Loved You a Little, and Talk that Talk.'),
	(2023, N'Finally, for the first time since I started this list, Avenged Sevenfold released a new album (their first since 2016).  Avenged Sevenfold has been my all time favorite band since 2008, so I always celebrate new music from them.  In 2017 they began "evolving" their album from 2016 by adding covers, but I did''nt quite want to add them to the list.  Besides that, there are several new additions that I am happy to have learned about (notably Calva Louise and Make Them Suffer).  MISAMO was a bit of a sheepish addition, however, since they''re a subunit of TWICE.' + CHAR(10) + CHAR(10) + 'I still find myself listening to nearly every song on this list, and besides maybe one or two I can''t think of many other songs I would replace something on this list with.  Out of the songs on it, though, I''d say that the three songs I continue to listen to the most to this day are Cosmic, Ghost Of Me, and Essence.'),
	(2024, N'Unlike a couple of the previous years, I found it difficult to actually trim this down to just 13. Unsurprisingly, TWICE has made it once again, and I''m sure this will be the case for 2025. I''m writing this retrospective a bit earlier than I have in previous years, so I only have maybe one or two songs that I''d replace in this list now.  Overall, however, I do like how diverse the music in this list seems to be, genre-wise; it''s a pretty solid representation of the music I listen to.  Little Big is a group my sister, friend, and I have been listening to since late 2019.  They''re a weird Russian rave group that makes some funny music and great music videos, and my sister, my friend, and I have gone to Chicago and Detroit to see them live now, and it was great both times.' + CHAR(10) + CHAR(10) + 'Out of the songs in 2024, the three I certainly listen to the most still are RATATA, Suffocate, and Good Graces.');

INSERT INTO Music.FavoriteSongsOfYearComments ([Year], Comment)
SELECT tyc.[Year], tyc.Comment
FROM #TempYearsComments tyc
LEFT JOIN Music.FavoriteSongsOfYearComments yc ON yc.[Year] = tyc.[Year] AND yc.Comment = tyc.Comment
WHERE yc.[Year] IS NULL;
GO


------- Initial favorite songs -------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE [name] = 'FavoriteSongsOfYear' AND [schema_id] = SCHEMA_ID('Music'))
BEGIN
    CREATE TABLE Music.FavoriteSongsOfYear (
		Id INT IDENTITY(1,1) PRIMARY KEY,
        SongName NVARCHAR(256) NOT NULL,
        Artist NVARCHAR(128) NOT NULL,
        Album NVARCHAR(128) NOT NULL,
        Genre NVARCHAR(32) NOT NULL,
        SongLength TIME NOT NULL,
        AppleMusicLink NVARCHAR(256) NOT NULL,
        SpotifyLink NVARCHAR(256) NOT NULL,
        [Year] INT NOT NULL,
        CONSTRAINT UN_FavoriteSongsOfYear UNIQUE (SongName, Artist),
		CONSTRAINT FK_CommentOfFavoritesYear FOREIGN KEY ([Year]) REFERENCES Music.FavoriteSongsOfYearComments([Year]) ON DELETE CASCADE
    );
END

CREATE TABLE #TempSongs (
        SongName NVARCHAR(256) NOT NULL,
        Artist NVARCHAR(128) NOT NULL,
        Album NVARCHAR(128) NOT NULL,
        Genre NVARCHAR(32) NOT NULL,
        SongLength TIME NOT NULL,
        AppleMusicLink NVARCHAR(256) NOT NULL,
        SpotifyLink NVARCHAR(256) NOT NULL,
        Year INT NOT NULL,
        CONSTRAINT UN_TempSongs UNIQUE (SongName, Artist)
    );
   
INSERT INTO #TempSongs (SongName, Artist, Album, Genre, SongLength, AppleMusicLink, SpotifyLink, [Year])
VALUES
    ('Bear Claws', 'The Academic', 'Tales from the Backseat', 'Alternative', '00:03:33', 'https://music.apple.com/us/album/bear-claws/1481420364?i=1481420639', 'https://open.spotify.com/track/3lJIMpVTbmEwUXy0m4U9lU?si=Y2tEAMNZTcKHv-5rtUW-uw', 2017),
	('Never Sorry', 'All That Remains', 'Madness', 'Heavy Metal', '00:03:38', 'https://music.apple.com/us/album/never-sorry/1440946633?i=1215489068', 'https://open.spotify.com/track/3LNYKMfgG2UScseEv92XeP?si=q79um6KaRBKIi42XgnAuUA', 2017),
	('Shape of You', 'Ed Sheeran', '÷', 'Pop', '00:03:54', 'https://music.apple.com/us/album/shape-of-you/1193701079?i=1193701392', 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=vRSBIh8IRoyyx28ki8A4kA', 2017),
	('Sleeping Powder', 'Gorillaz', 'Sleeping Powder - Single', 'Alternative', '00:02:46', 'https://music.apple.com/us/album/sleeping-powder/1247590076?i=1247590729', 'https://open.spotify.com/track/5pE9vMyvVNOpZFutt6lyy4?si=1YzqViPySviqvfAUOpRtfg', 2017),
	('Call Ins', 'He Is Legend', 'Few', 'Rock', '00:03:42', 'https://music.apple.com/us/album/call-ins/1440879185?i=1203489960', 'https://open.spotify.com/track/2sIPY6ELRwL5ZKswDhAdpD?si=WxWyzgOlT5i44zEsXsPbPA', 2017),
	('State of the Art', 'Incubus', '8', 'Alternative', '00:03:47', 'https://music.apple.com/us/album/state-of-the-art/1440881253?i=1214441702', 'https://open.spotify.com/track/7mVIEjxqffN2F1Q3NUHKPG?si=ubA1Qd83QzuaE8OvuuNaSA', 2017),
	('Black Butterflies and Deja Vu', 'The Maine', 'Lovely Little Lonely', 'Alternative', '00:03:23', 'https://music.apple.com/us/album/black-butterflies-and-d%C3%A9j%C3%A0-vu/1209457468?i=1209457776', 'https://open.spotify.com/track/6QZ8h3RqIgTRTo3hfaqryx?si=MQs_VDxiSxmNvV69Mc90pw', 2017),
	('How Do You Feel?', 'The Maine', 'Lovely Little Lonely', 'Alternative', '00:04:22', 'https://music.apple.com/us/album/how-do-you-feel/1209457468?i=1209458135', 'https://open.spotify.com/track/6AH3IbS61PiabZYKVBqKAk?si=qe6392WFRFmMtYxvKWGPEQ', 2017),
	('Less Than', 'Nine Inch Nails', 'Add Violence - EP', 'Alternative', '00:03:30', 'https://music.apple.com/us/album/less-than/1260014946?i=1260015502', 'https://open.spotify.com/track/7jDKJSjIjT93v7brsZDcoT?si=3lWNDdyqT562pPjKkFMJnw', 2017),
	('The Doomed', 'A Perfect Circle', 'Eat the Elephant', 'Rock', '00:04:42', 'https://music.apple.com/us/album/the-doomed/1340651075?i=1340651425', 'https://open.spotify.com/track/44OUZyiPnJc4pOZw4J6pid?si=aFGC39FcSrOfbHYrseFdaw', 2017),
	('Fabuless', 'Stone Sour', 'Hydrograd', 'Heavy Rock', '00:04:01', 'https://music.apple.com/us/album/fabuless/1229163139?i=1229163686', 'https://open.spotify.com/track/72GH838JaxrCA8IFcXqgXm?si=PRGwwKLBTxmf_PuCrXSFmw', 2017),
	('Rx (Medicate)', 'Theory of a Deadman', 'Wake Up Call', 'Rock', '00:03:53', 'https://music.apple.com/us/album/rx-medicate/1262126917?i=1262126920', 'https://open.spotify.com/track/2UZtI2HUyLRzqBjodvcUmY?si=9PWzuSoET9GBqNBw7yEHiQ', 2017),
	('Feels Like Summer', 'Weezer', 'Pacific Daydream', 'Alternative', '00:03:15', 'https://music.apple.com/us/album/feels-like-summer/1270328038?i=1270328050', 'https://open.spotify.com/track/2jz1bw1p0WQj0PDnVDP0uY?si=zELXa9yQQnGE1DyfFrG-Tg', 2017),

	('Voices in my Head', 'Ashley Tisdale', 'Symptoms', 'Pop', '00:03:19', 'https://music.apple.com/us/album/voices-in-my-head/1439274076?i=1439274082', 'https://open.spotify.com/track/0Tyt3SyqRIsN0XHRyhD75J?si=lpG8T3WqRCW9lPnq6rWRZQ', 2018),
	('Starlight', 'BABYMETAL', 'METAL GALAXY', 'Metal', '00:03:36', 'https://music.apple.com/us/album/starlight/1475662687?i=1475663365', 'https://open.spotify.com/track/2iAIBHvSNH5oHrCCpmeaBV?si=S4h-k5gcS-GwTn9rPWaxPA', 2018),
	('Zombie', 'Bad Wolves', 'Zombie - Single', 'Hard Rock', '00:04:15', 'https://music.apple.com/us/album/zombie/1337765138?i=1337765670', 'https://open.spotify.com/track/1vNoA9F5ASnlBISFekDmg3?si=m7dQp_NXQUq0Uco1SHMJ0A', 2018),
	('Dice', 'BAND-MAID', 'World Domination', 'Rock', '00:04:03', 'https://music.apple.com/us/album/dice/1339560562?i=1339560706', 'https://open.spotify.com/track/26P0PvxuRYcgzxeHZ4rjD0?si=WfNu38s9RzSdtXWyvQp4mw', 2018),
	('The Dark Sentencer', 'Coheed and Cambria', 'The Unheavenly Creatures', 'Rock', '00:07:45', 'https://music.apple.com/us/album/the-dark-sentencer/1403404699?i=1403404719', 'https://open.spotify.com/track/0mP3O68nZjScrbgiD9UilH?si=NTrZYsczQvypVI22h0Dm9w', 2018),
	('Age of Man', 'Greta Van Fleet', 'Anthem of the Peaceful Army', 'Rock', '00:06:06', 'https://music.apple.com/us/album/age-of-man/1435351050?i=1435351490', 'https://open.spotify.com/track/54DIzLw4LLxB3n1XiiQftU?si=ZdHxkEnuSvGiXbWvTaKV8Q', 2018),
	('Supplies', 'Justin Timberlake', 'Man of the Woods', 'Pop', '00:03:46', 'https://music.apple.com/us/album/supplies/1330759954?i=1330760178', 'https://open.spotify.com/track/6jT85s2dZ55HBqjXYi2rfI?si=vFU9NkFkQ82xe_KPMpbHOg', 2018),
	('Over and Out', 'Nine Inch Nails', 'Bad Witch', 'Alternative', '00:07:50', 'https://music.apple.com/us/album/over-and-out/1383304609?i=1383305129', 'https://open.spotify.com/track/1J8CqSsS6ErrveimQyCvZa?si=g0JNXkWAT-u--PRJtFb-6Q', 2018),
	('Disillusioned', 'A Perfect Circle', 'Eat the Elephant', 'Rock', '00:05:54', 'https://music.apple.com/us/album/disillusioned/1340651075?i=1340651416', 'https://open.spotify.com/track/1O9DWF3578RHMxZg2nLPeM?si=X2P7kOpMQnm1i9RqUrgDCg', 2018),
	('Body Talks', 'The Struts', 'YOUNG & DANGEROUS', 'Rock', '00:02:58', 'https://music.apple.com/us/album/body-talks/1435805372?i=1435805536', 'https://open.spotify.com/track/6spaGIZEfeDYlgAupMI34k?si=AXzlF88cTPCuxgEm4tkdew', 2018),
	('COLORS', 'Tenacious D', 'Post-Apocalypto', 'Rock', '00:02:20', 'https://music.apple.com/us/album/colors/1434624186?i=1434624879', 'https://open.spotify.com/track/40rChMoUd1VXb4TKgTuTSP?si=e1c7lIuLRtGoeEvgAoAdaA', 2018),
	('My Blood', 'twenty one pilots', 'Trench', 'Alternative', '00:03:49', 'https://music.apple.com/us/album/my-blood/1422828208?i=1422828213', 'https://open.spotify.com/track/5HeKOKc4phmLn8e4I7EkzD?si=Fc2HzHleRu6xWysTHN_s9w', 2018),
	('What is Love?', 'TWICE', 'What is Love?', 'K-Pop', '00:03:28', 'https://music.apple.com/us/album/what-is-love/1500793132?i=1500793145', 'https://open.spotify.com/track/7ogyhvfoPn27BDswIUHMm1?si=21kbV4pYRgqjVzG5myxxWg', 2018),

	('Feeling so Good', 'Ashley Tisdale', 'Symptoms', 'Pop', '00:03:07', 'https://music.apple.com/us/album/feeling-so-good/1457934050?i=1457934217', 'https://open.spotify.com/track/4GAFlFLouTialsJv1kiKaC?si=KeGHDOGISVK1OfkpPfmBjQ', 2019),
	('Brand New Day', 'BABYMETAL', 'METAL GALAXY', 'Metal', '00:04:11', 'https://music.apple.com/us/album/brand-new-day-feat-tim-henson-scott-lepage/1475662687?i=1475663063', 'https://open.spotify.com/track/0FpJdOwxVYjN0UCIG6ovcR?si=0WGaMwj5RMaTWr899XuI4A', 2019),
	('Promise Me', 'Badflower', 'OK, I''M SICK', 'Alternative', '00:03:50', 'https://music.apple.com/us/album/promise-me/1440357164?i=1440357294', 'https://open.spotify.com/track/5TU1cWjUGyVKjSnIIxRSEf?si=lDZLgyyfTaO3u69RMIvQ0g', 2019),
	('mother tongue', 'Bring Me the Horizon', 'amo', 'Rock', '00:03:37', 'https://music.apple.com/us/album/mother-tongue/1439239477?i=1439240076', 'https://open.spotify.com/track/5IwUFTiNkarb5HEtNRtRtc?si=eqv3SLmxR-Oz8Rzo4-zA2A', 2019),
	('THE INNOCENT', 'FEVER 333', 'STRENGTH IN NUMB333RS', 'Hard Rock', '00:03:22', 'https://music.apple.com/us/album/the-innocent/1441326645?i=1441326655', 'https://open.spotify.com/track/1Y2FJpsOmfqfFuqS0KatUu?si=HQ9weJNfSA2RrFxmDc-G7w', 2019),
	('Flowers on the Grave', 'The Maine', 'You Are OK', 'Alternative', '00:09:23', 'https://music.apple.com/us/album/flowers-on-the-grave/1451377141?i=1451377387', 'https://open.spotify.com/track/2rsgWz1uCAsUlcjD12axTx?si=lRnJCghrSY2tWAn-zNNI7g', 2019),
	('Miracle Man', 'Oliver Tree', 'Ugly is Beautiful', 'Alternative', '00:02:05', 'https://music.apple.com/us/album/miracle-man/1514394064?i=1514394491', 'https://open.spotify.com/track/2PFnwW05Wh0MYkfZxSwfuf?si=70DtyT-GTpOOlYK_uFtMpw', 2019),
	('Diseased Almost', 'Puddle of Mudd', 'Welcome to Galvania', 'Rock', '00:03:42', 'https://music.apple.com/us/album/diseased-almost/1471037643?i=1471037656', 'https://open.spotify.com/track/7HaT692mQsfESjwD3TH8Uo?si=mk5lzRy7Q-ez-dI5gSPmGQ', 2019),
	('Beast', 'Saint Asonia', 'Flawed Design', 'Rock', '00:03:27', 'https://music.apple.com/us/album/beast/1478636853?i=1478637002', 'https://open.spotify.com/track/0AVKG4Qu7ubCzPlrWuhpMS?si=MmIgMU2BRMmwYDxIUS30cw', 2019),
	('Nero Forte', 'Slipknot', 'We Are Not Your Kind', 'Metal', '00:05:15', 'https://music.apple.com/us/album/nero-forte/1463706038?i=1463706044', 'https://open.spotify.com/track/56fiFTRrSiHHH3gBeaTg2P?si=_rMlPQsyRJSctPAQGLb80w', 2019),
	('Descending', 'Tool', 'Fear Inoculum', 'Rock', '00:13:38', 'https://music.apple.com/us/album/descending/1475686696?i=1475687061', 'https://open.spotify.com/track/0aTiUssEOy0Mt69bsavj6K?si=qKoZqggfQe2JniXWa6oWCg', 2019),
	('LOVE FOOLISH', 'TWICE', 'Feel Special', 'K-Pop', '00:03:11', 'https://music.apple.com/us/album/love-foolish/1500796072?i=1500796478', 'https://open.spotify.com/track/5ipJi9h2ghaThn6EUwO3B2?si=p8ZSd5rpSzCE9QHjZ33TvA', 2019),
	('Blow Me (feat. Jason Aalon Butler)', 'The Used', 'Heartwork', 'Rock', '00:03:21', 'https://music.apple.com/us/album/blow-me-feat-jason-aalon-butler/1496886925?i=1496887423', 'https://open.spotify.com/track/1vS7jjy99wfMVVC9nzZtX1?si=dT74ShvvRtGcUfwlkU0fsw', 2019),

	('Animals', 'Architects', 'For Those That Wish to Exist', 'Hard Rock', '00:04:04', 'https://music.apple.com/us/album/little-wonder/1533388849?i=1533388858', 'https://open.spotify.com/track/1Td7TGT1XtK2ojUjz1mGUV?si=8cfe9090e1c74da5', 2020),
	('Lemons', 'Ashley Tisdale', 'Lemons - Single', 'Pop', '00:02:39', 'https://music.apple.com/us/album/lemons/1514508650?i=1514508651', 'https://open.spotify.com/track/0Wes7TZVfPo4M1TK5c3F8Y?si=99cdb687f4d6478f', 2020),
	('Kingslayer (feat. BABYMETAL)', 'Bring Me The Horizon', 'POST HUMAN: SURVIVAL HORROR', 'Hard Rock', '00:03:40', 'https://music.apple.com/us/album/kingslayer-feat-babymetal/1535067172?i=1535067323', 'https://open.spotify.com/track/7CAbF0By0Fpnbiu6Xn5ZF7?si=34aad5b265ff4cd3', 2020),
	('Paradise', 'DREAMCATCHER', 'Dystopia: The Tree of Language', 'K-Pop', '00:04:04', 'https://music.apple.com/us/album/paradise/1499456109?i=1499456122', 'https://open.spotify.com/track/2zCUaUgenXGzhMQztjf9qd?si=f43911e7157a4a7d', 2020),
	('PRESENCE IS STRENGTH', 'FEVER 333', 'PRESENCE IS STRENGTH - Single', 'Rock', '00:02:42', 'https://music.apple.com/us/album/presence-is-strength/1501840074?i=1501840075', 'https://open.spotify.com/track/7kpYImqzb3AswxjNr1vkeq?si=5408615cb33a4afd', 2020),
	('MAGO', 'GFRIEND', N'回:Walpurgis Night', 'K-Pop', '00:03:19', 'https://music.apple.com/us/album/mago/1538729549?i=1538729550', 'https://open.spotify.com/track/46WaBBaEHzgbN88Ew0nh50?si=21407c3e95834d53', 2020),
	('Age of Machine', 'Greta Van Fleet', 'The Battle At Garden''s Gate', 'Rock', '00:06:54', 'https://music.apple.com/us/album/age-of-machine/1543007580?i=1543008237', 'https://open.spotify.com/track/6XALorRRo9aQdBIQN0UWyn?si=fc0671ef66e04b87', 2020),
	('Rolled Down Window', 'John the Ghost', 'For Those That Wish to Exist', 'Alternative', '00:04:04', 'https://music.apple.com/us/album/little-wonder/1533388849?i=1533388858', 'https://open.spotify.com/track/1Td7TGT1XtK2ojUjz1mGUV?si=8cfe9090e1c74da5', 2020),
	('A Sweeter Place (feat. Kid Cudi)', 'Selena Gomez', 'Rare', 'Pop', '00:04:23', 'https://music.apple.com/us/album/a-sweeter-place-feat-kid-cudi/1488413282?i=1488413386', 'https://open.spotify.com/track/4bb94wZVF1cX66vQjNeJTX?si=ba26a9b500954e9e', 2020),
	('Brothers (feat. Eddy Capparelli)', 'SIAMES', 'Home', 'Indie Pop', '00:04:06', 'https://music.apple.com/us/album/brothers-feat-eddy-capparelli/1495889131?i=1495889434', 'https://open.spotify.com/track/2Hla6QVdb2fJhQonnGLksC?si=271d5259de6b42d6', 2020),
	('Am I Talking To The Champagne (Or Talking To You)', 'The Struts', 'Strange Days', 'Rock', '00:05:47', 'https://music.apple.com/us/album/am-i-talking-to-the-champagne-or-talking-to-you/1530101176?i=1530101585', 'https://open.spotify.com/track/05h4hfkCzXIVBjju9chzxa?si=5d69cde9f1cc4153', 2020),
	('Protect The Land', 'System of a Down', 'Protect The Land - Single', 'Rock', '00:05:08', 'https://music.apple.com/us/album/protect-the-land/1538616280?i=1538616285', 'https://open.spotify.com/track/11ajcVj3qSyyMPUpTJUP3y?si=7cea37d17ebc48c5', 2020),
	('UP NO MORE', 'TWICE', 'Eyes wide open', 'K-Pop', '00:03:34', 'https://music.apple.com/us/album/up-no-more/1535654236?i=1535654254', 'https://open.spotify.com/track/1LiNP5q2thWScdvCRkJ584?si=08b0d3d4278b4b10', 2020),
	
	('Family', 'Badflower', 'This Is How The World Ends', 'Alternative', '00:04:07', 'https://music.apple.com/us/album/family/1573809059?i=1573809127', 'https://open.spotify.com/track/0QVqdSLCPskZiJpcYQTgvi?si=3c76417c9fe7457b', 2021),
	('Spirit', 'The Blue Stones', 'Hidden Gems', 'Rock', '00:04:03', 'https://music.apple.com/us/album/spirit/1545703292?i=1545703570', 'https://open.spotify.com/track/57xWuijtGZYZTz2zJE7Ohg?si=b6dbf65bda8c4af8', 2021),
	('Snowblood', 'ERRA', 'ERRA', 'Metal', '00:04:14', 'https://music.apple.com/us/album/snowblood/1543844375?i=1543845039', 'https://open.spotify.com/track/3pkfVWPONcWQU5UAxWyALx?si=a81e6acdc83d4d3b', 2021),
	('Broken Bells', 'Greta Van Fleet', 'The Battle at Garden''s Gate', 'Rock', '00:05:51', 'https://music.apple.com/us/album/broken-bells/1543007580?i=1543008231', 'https://open.spotify.com/track/2lXGcshKbu1QSq04zEIjAD?si=08c84887ab2f4e7a', 2021),
	('Bad Place', 'The Hunna', 'Bad Place - Single', 'Alternative', '00:02:20', 'https://music.apple.com/us/album/bad-place/1562741243?i=1562741245', 'https://open.spotify.com/track/2tQdcrh68WEhedANWbmP2s?si=a45f86388daf4388', 2021),
	('Lilac', 'IU', 'IU 5th Album ''LILAC''', 'K-Pop', '00:03:34', 'https://music.apple.com/us/album/lilac/1560113132?i=1560113134', 'https://open.spotify.com/track/5xrtzzzikpG3BLbo4q1Yul?si=834003d4068741df', 2021),
	('Dirty, Pretty, Beautiful', 'The Maine', 'XOXO: From Love & Anxiety In Real Time', 'Alternative', '00:03:52', 'https://music.apple.com/us/album/dirty-pretty-beautiful/1558238698?i=1558238978', 'https://open.spotify.com/track/065QVuYqbXzqPCSsc21AYZ?si=229932bcdb614cae', 2021),
	('Let The Bad Times Roll', 'The Offspring', 'Let The Bad Times Roll', 'Rock', '00:03:19', 'https://music.apple.com/us/album/let-the-bad-times-roll/1579605726?i=1579605740', 'https://open.spotify.com/track/0O2UONKvVfdwDyefKh5Yo1?si=e665c2d96ead4141', 2021),
	('good 4 u', 'Olivia Rodrigo', 'SOUR', 'Alternative', '00:02:58', 'https://music.apple.com/us/album/good-4-u/1560735414?i=1560735551', 'https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG?si=fe74a6dc20cb4091', 2021),
	('Always The Same (feat. Barbie Williams)', 'SIAMES', 'Always The Same - Single', 'Indie Rock', '00:03:41', 'https://music.apple.com/us/album/always-the-same/1551191206?i=1551191212', 'https://open.spotify.com/track/2yTzHEHhjw4NCabkoTA8v0?si=92ae124f4c8e46d0', 2021),
	('Earth is a Black Hole', 'Teenage Wrist', 'Earth is a Black Hole', 'Alternative', '00:02:56', 'https://music.apple.com/us/album/earth-is-a-black-hole/1533745059?i=1533745071', 'https://open.spotify.com/track/13a2v5JNOROuvh2MBMWxqb?si=78e016e02cf548e1', 2021),
	('F.I.L.A (Fall In Love Again)', 'TWICE', 'Formula of Love: O + T = <3', 'K-Pop', '00:03:11', 'https://music.apple.com/us/album/f-i-l-a-fall-in-love-again/1591509653?i=1591509663', 'https://open.spotify.com/track/4O1WbQwMV0W6Y2dUCvwoBx?si=f556c3da5ca44aa5', 2021),
	('Aloo Gobi', 'Weezer', 'OK Human', 'Alternative', '00:03:04', 'https://music.apple.com/us/album/aloo-gobi/1549768766?i=1549768924', 'https://open.spotify.com/track/6rSJz9u8Y9xixsh5fKu9hV?si=567265e483734d05', 2021),
	
	('be very afraid', 'Architects', 'the classic symptoms of a broken spirit', 'Hard Rock', '00:04:20', 'https://music.apple.com/us/album/be-very-afraid/1630014304?i=1630014645', 'https://open.spotify.com/track/1nXWhLumXogqFeijfa1uJd?si=23e987b617f64484', 2022),
	('Monochrome', 'BABYMETAL', 'Monochrome - Single', 'Metal', '00:03:57', 'https://music.apple.com/us/album/monochrome/1653446431?i=1653446439', 'https://open.spotify.com/track/2Rw6wkd0q3LXx5xsdjLs1P?si=316104b23db64086', 2022),
	('Don''t Miss', 'The Blue Stones', 'Pretty Monster', 'Rock', '00:03:08', 'https://music.apple.com/us/album/dont-miss/1643862547?i=1643862550', 'https://open.spotify.com/track/1ggbqc7jhg454UpFfSmdam?si=bf2122c0ed6b428b', 2022),
	('A Disappearing Act', 'Coheed and Cambria', 'Vaxis II: A Window of the Waking Mind', 'Hard Rock', '00:03:30', 'https://music.apple.com/us/album/a-disappearing-act/1594201540?i=1594201872', 'https://open.spotify.com/track/04flu1A6UXP4Stissk3G1l?si=cfe1076330fe46d2', 2022),
	('Cherry (Real Miracle)', 'DREAMCATCHER', 'Apocalypse: Save us', 'K-Pop', '00:03:15', 'https://music.apple.com/us/album/cherry-real-miracle-ji-u-solo/1695504843?i=1695504851', 'https://open.spotify.com/track/2TZYvSsXSvigKQShBS2OPE?si=28a1f2041f4f4a08', 2022),
	('Neon', 'Electric Callboy', 'TEKKNO', 'Metal', '00:03:12', 'https://music.apple.com/us/album/neon/1618490079?i=1618490422', 'https://open.spotify.com/track/5Ax3CrEaFiQHb65JMijp2J?si=ebc665dd75f44508', 2022),
	('Nigh to Silence', 'ERRA', 'ERRA', 'Rock', '00:05:05', 'https://music.apple.com/us/album/nigh-to-silence/1762964038?i=1762964053', 'https://open.spotify.com/track/08BV91W7OizUACboEkkx4p?si=22d87fcc659c4f1b', 2022),
	('Sour', 'He Is Legend', 'Endless Hallway', 'Rock', '00:03:47', 'https://music.apple.com/us/album/sour/1676711261?i=1676711743', 'https://open.spotify.com/track/03PwIVcBHZ2xeJ0sR7o9g4?si=cf1559816a374647', 2022),
	('Circles', 'The Hunna', 'The Hunna', 'Rock', '00:03:24', 'https://music.apple.com/us/album/circles/1634534556?i=1634535074', 'https://open.spotify.com/track/2Y9qfaLaSgFKoXrsZt9KI6?si=ade9be51591c411b', 2022),
	('Loved You a Little (feat. Taking Back Sunday & Charlotte Sands)', 'The Maine', 'Loved You A Little - Single', 'Alternative', '00:03:27', 'https://music.apple.com/us/album/loved-you-a-little/1603746695?i=1603746927', 'https://open.spotify.com/track/0IPKskRI33eRXjUhNUr9b5?si=57cb5aea9f53494a', 2022),
	('My Way (feat. Barbie Williams)', 'SIAMES', 'My Way [Single Version]', 'Pop', '00:02:59', 'https://music.apple.com/us/album/my-way/1644761389?i=1644761401', 'https://open.spotify.com/track/2aG8speTt7aje2gii3g6UK?si=dc8a1cdf3e92409d', 2022),
	('Talk that Talk', 'TWICE', 'BETWEEN 1&2', 'K-Pop', '00:02:57', 'https://music.apple.com/us/album/talk-that-talk/1635656322?i=1635656417', 'https://open.spotify.com/track/0RDqNCRBGrSegk16Avfzuq?si=2f01a98ee20344ad', 2022),
	('What Happens After You?', 'Weezer', 'SZNZ: Autumn', 'Alternative', '00:03:20', 'https://music.apple.com/us/album/what-happens-after-you/1645304165?i=1645304169', 'https://open.spotify.com/track/5x7Ffxc1Obg13x5IzM1XXV?si=94dff441ecf44280', 2022),
	
	('Cosmic', 'Avenged Sevenfold', 'Life Is But a Dream...', 'Hard Rock', '00:07:31', 'https://music.apple.com/us/album/cosmic/1676708908?i=1676708916', 'https://open.spotify.com/track/1xA87lWGnZlIjG8tw4327F?si=87e33e9f7c314930', 2023),
	('Time Wave', 'BABYMETAL', 'THE OTHER ONE', 'Metal', '00:04:50', 'https://music.apple.com/us/album/time-wave/1664467760?i=1664467771', 'https://open.spotify.com/track/4I5JsMUy4rCzkrymv15DbP?si=0a56388e9bab4c91', 2023),
	('Feast Is Over', 'Calva Louise', 'Feast Is Over - Single', 'Alternative', '00:03:12', 'https://music.apple.com/us/album/feast-is-over/1671195436?i=1671195461', 'https://open.spotify.com/track/1ajCWFb64q72MfXMftyNlV?si=74688f4dbc2e491c', 2023),
	('Cupid', 'FIFTY FIFTY', 'The Beginning', 'K-Pop', '00:02:55', 'https://music.apple.com/us/album/cupid/1762390380?i=1762390691', 'https://open.spotify.com/track/3VqSRkq3jRpsSEBngUcY6a?si=0dbc86fec7d74640', 2023),
	('Dramatic', 'Idina Menzel', 'Drama Queen', 'Pop', '00:03:13', 'https://music.apple.com/us/album/dramatic/1692527112?i=1692527115', 'https://open.spotify.com/track/1HmgWp6HhxeQTUp308gGch?si=adce4238a53248e4', 2023),
	('I AM', 'IVE', 'I''ve IVE', 'K-Pop', '00:03:04', 'https://music.apple.com/us/album/i-am/1680047093?i=1680047366', 'https://open.spotify.com/track/70t7Q6AYG6ZgTYmJWcnkUM?si=c57dfcdfcfb64455', 2023),
	('LOVE AGAIN', 'The Kid LAROI', 'LOVE AGAIN - Single', 'Pop', '00:02:27', 'https://music.apple.com/us/album/love-again/1663066825?i=1663066826', 'https://open.spotify.com/track/4sx6NRwL6Ol3V6m9exwGlQ?si=33c5adbcd4fc4d9f', 2023),
	('how to exit a room', 'The Maine', 'The Maine', 'Alternative', '00:03:45', 'https://music.apple.com/us/album/how-to-exit-a-room/1691215569?i=1691215868', 'https://open.spotify.com/track/5jztnScIemZ0f3Mld2lGFk?si=666d575f5b344c8b', 2023),
	('Ghost Of Me', 'Make Them Suffer', 'Ghost Of Me - Single', 'Metal', '00:03:51', 'https://music.apple.com/us/album/ghost-of-me/1683856190?i=1683856413', 'https://open.spotify.com/track/25Yfk4XBeglz1QoXhDqJ2w?si=94b7b5492e434e0c', 2023),
	('Do not touch', 'MISAMO', 'Masterpiece', 'J-Pop', '00:03:06', 'https://music.apple.com/us/album/do-not-touch/1691852603?i=1691852612', 'https://open.spotify.com/track/1w6b63TmaXFk1jhPOY0FkY?si=b7ca0fa87e5f48b3', 2023),
	('OMG', 'NewJeans', 'OMG - Single', 'K-Pop', '00:03:32', 'https://music.apple.com/us/album/omg/1659513441?i=1659513445', 'https://open.spotify.com/track/65FftemJ1DbbZ45DUfHJXE?si=dad8caa3e5c34da3', 2023),
	('Essence (feat. Super Computer)', 'Oliver Tree', 'Alone In A Crowd', 'Alternative', '00:02:48', 'https://music.apple.com/us/album/essence-feat-super-computer/1693015199?i=1693015501', 'https://open.spotify.com/track/3YQHgTo0898GHXRC2byH52?si=6d5509f281574093', 2023),
	('SET ME FREE (ENG)', 'TWICE', 'READY TO BE', 'K-Pop', '00:03:02', 'https://music.apple.com/us/album/set-me-free-eng/1669081578?i=1669081814', 'https://open.spotify.com/track/6bkTxw6m6vl8Oc3xtKBXN0?si=d8326ff3f6234d31', 2023),

	('upside down',  'AVRALIZE', 'upside down - Single', 'Metal', '00:04:05', 'https://music.apple.com/us/album/upside-down/1766341692?i=1766341746', 'https://open.spotify.com/track/205hZzJy7yfd2kyk7jSrze?si=7c51f377044c4ada', 2024),
	('RATATA (feat. Electric Callboy)', 'BABYMETAL', 'RATATA - Single', 'Metal', '00:03:36', 'https://music.apple.com/us/album/ratatata/1746116467?i=1746116468', 'https://open.spotify.com/track/14WYmNQWvR2TTWoRp8t9Ml?si=2406cef01c4a46ad', 2024),
	('Houdini', 'Eminem', 'The Death of Slim Shady (Coup De Grâce)', 'Rap', '00:03:47', 'https://music.apple.com/us/album/houdini/1755022177?i=1755022500', 'https://open.spotify.com/track/2HYFX63wP3otVIvopRS99Z?si=5f6981fb02be42d3', 2024),
	('I stan U', 'IU', 'The Winning - EP', 'K-Pop', '00:03:13', 'https://music.apple.com/us/album/i-stan-u/1731352613?i=1731352618', 'https://open.spotify.com/track/0NnXG9qhpf0E6elVQdWLE7?si=35faa70746e44a20', 2024),
	('Suffocate (feat. Poppy)', 'Knocked Loose', 'You Won''t Go Before You''re Supposed To', 'Metal', '00:02:45', 'https://music.apple.com/us/album/suffocate-feat-poppy/1732119298?i=1732119474', 'https://open.spotify.com/track/6PXYOVPBzO3xojFhQAvmde?si=1ee56b31b30a47ba', 2024),
	('Harrison Ave', 'Lil Dicky', 'Penith', 'Rap', '00:06:01', 'https://music.apple.com/us/album/harrison-ave/1720271825?i=1720272548', 'https://open.spotify.com/track/0q9loMHMdjPrOhHClKtZF3?si=3eb0070e110d4f9b', 2024),
	('Lobster Popstar', 'Little Big', 'Lobster Popstar', 'Pop', '00:02:34', 'https://music.apple.com/us/album/lobster-popstar/1732061653?i=1732061656', 'https://open.spotify.com/track/1Hxgf7uMR1qdx9cSnRmXt0?si=d4c756d71daa4c4c', 2024),
	('obsessed', 'Olivia Rodrigo', 'GUTS (spilled)', 'Pop', '00:02:51', 'https://music.apple.com/us/album/obsessed/1736994915?i=1736996063', 'https://open.spotify.com/track/6tNgRQ0K2NYZ0Rb9l9DzL8?si=4be0a98f18ec4734', 2024),
	('Medicate Me (feat. Dayseeker)', 'Rain City Drive', 'Medicate Me - Single', 'Rock', '00:02:47', 'https://music.apple.com/us/album/medicate-me/1740356783?i=1740356784', 'https://open.spotify.com/track/1EusMjYm7PZftlZn87vPWE?si=d823c08b3911407f', 2024),
	('Good Graces', 'Sabrina Carpenter', 'Short n'' Sweet', 'Pop', '00:03:05', 'https://music.apple.com/us/album/good-graces/1750307020?i=1750307081', 'https://open.spotify.com/track/102YUQbYmwdBXS7jwamI90?si=37895600fe764704', 2024),
	('Predator', 'Siamese', 'Elements', 'Metal', '00:03:41', 'https://music.apple.com/us/album/predator/1742548271?i=1742548554', 'https://open.spotify.com/track/6KzvDJvnykZfh2G3uslGnx?si=d544580576e9406b', 2024),
	('Soft Spine', 'Spiritbox', 'Tsunami Sea', 'Metal', '00:03:04', 'https://music.apple.com/us/album/soft-spine/1779147456?i=1779147890', 'https://open.spotify.com/track/3t5GlWUzGSt2lPuiSEPBFG?si=c4a946fc6cb24e40', 2024),
	('I GOT YOU', 'TWICE', 'With YOU-th - EP', 'K-Pop', '00:02:53', 'https://music.apple.com/us/album/i-got-you/1726087580?i=1726087587', 'https://open.spotify.com/track/0mgveJEIGjcN51w4JIQtI6?si=03b16ecd1fb541aa', 2024);

INSERT INTO Music.FavoriteSongsOfYear (SongName, Artist, Album, Genre, SongLength, AppleMusicLink, SpotifyLink, [Year])
SELECT ts.SongName, ts.Artist, ts.Album, ts.Genre, ts.SongLength, ts.AppleMusicLink, ts.SpotifyLink, ts.[Year]
FROM #TempSongs ts
LEFT JOIN Music.FavoriteSongsOfYear s ON s.SongName = ts.SongName AND s.Artist = ts.Artist
WHERE s.SongName IS NULL;
