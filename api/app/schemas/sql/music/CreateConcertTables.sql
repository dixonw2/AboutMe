IF NOT EXISTS (SELECT * FROM sys.tables WHERE [name] = 'Events' AND [schema_id] = SCHEMA_ID('Music'))
BEGIN
	CREATE TABLE Music.[Events] (
		Id INT IDENTITY(1,1) PRIMARY KEY,
		EventName NVARCHAR(64),
		Headliner NVARCHAR(64),
		[Date] DATE NOT NULL,
		Venue NVARCHAR(64) NOT NULL
	);
END

CREATE TABLE #TempEvents (
	EventName NVARCHAR(64),
	Headliner NVARCHAR(64),
	[Date] DATE NOT NULL,
	Venue NVARCHAR(64) NOT NULL
);

INSERT INTO #TempEvents(EventName, Headliner, [Date], Venue)
VALUES
	('Nightmare After Christmas', 'Avenged Sevenfold', '2011-01-29', 'U.S. Bank Arena'),
	('Inked Music Tour', 'Alesana', '2012-10-16', 'Bogart''s'),
	('Hail to the King', 'Avenged Sevenfold', '2013-10-06', 'U.S. Bank Arena'),
	('Rock on the Range', 'Slipknot', '2015-05-15', 'MAPFRE Stadium'),
	('Rock on the Range', 'Judas Priest', '2015-05-16', 'MAPFRE Stadium'),
	('Rock on the Range', 'Linkin Park', '2015-05-17', 'MAPFRE Stadium'),
	(NULL, 'Coheed and Cambria', '2015-10-13', 'Bogart''s'),
	('The American Lines Tour ''16', 'The Maine & Mayday Parade', '2016-03-12', 'Bogart''s'),
	('BABYMETAL WORLD TOUR 2016', 'BABYMETAL', '2016-05-13', 'House of Blues Chicago'),
	('Vans Warped Tour ''16', NULL, '2016-07-21', 'Riverbend Music Center'),
	(NULL, 'Avenged Sevenfold', '2016-09-20', 'Allen County War Memorial Coliseum'),
	('Louder Than Life', 'Avenged Sevenfold', '2016-10-01', 'Champion''s Park'),
	('Louder Than Life', 'Slipknot', '2016-10-02', 'Champion''s Park'),
	('Integrity Blues', 'Jimmy Eat World', '2016-10-15', 'Bogart''s'),
	('Carolina Rebellion', 'Soundgarden', '2017-05-05', 'Rock City Campgrounds at Charlotte Motor Speedway'),
	('Carolina Rebellion', 'Def Leppard', '2017-05-06', 'Rock City Campgrounds at Charlotte Motor Speedway'),
	('Carolina Rebellion', 'Avenged Sevenfold', '2017-05-07', 'Rock City Campgrounds at Charlotte Motor Speedway'),
	('Tour de Columbus', 'twenty one pilots', '2017-06-22', 'Express! Live'),
	('The Stage', 'Avenged Sevenfold', '2017-07-10', 'Riverbend Music Center'),
	('8 Tour', 'Incubus', '2017-07-27', 'Riverbend Music Center'),
	('The Serenity of Summer Tour', 'Korn', '2017-08-01', 'Riverbend Music Center'),
	('Every Trick in the Book Tour (Part 1)', 'Ice Nine Kills', '2017-10-07', 'Rockstar Pro Arena'),
	('Fall 2017', 'A Perfect Circle', '2017-11-19', 'BB&T Arena'),
	('Fry Your Brain With The Maine', 'The Maine', '2018-04-21', 'Newport Music Hall'),
	('2018 North American Tour', 'Buckethead', '2018-04-28', 'Madison Theater'),
	('Rock on the Range', 'Alice in Chains', '2018-05-18', 'MAPFRE Stadium'),
	('Rock on the Range', 'Avenged Sevenfold', '2018-05-19', 'MAPFRE Stadium'),
	('Rock on the Range', 'Tool', '2018-05-20', 'MAPFRE Stadium'),
	(NULL, 'Incubus', '2018-06-01', 'Express! Live'),
	('Vans Warped Tour ''18', NULL, '2018-07-19', 'Riverbend Music Center'),
	('Chaos and Earthquakes Tour', 'Nonpoint', '2018-09-20', 'The Blue Note'),
	('Post Apocalypto', 'Tenacious D', '2018-11-10', 'Express! Live'),
	('Bad Christian Roadshow', 'Emery', '2018-11-17', 'Zanzabar'),
	('Come On and Walk Among Us Tour', 'Coheed and Cambria', '2019-02-23', 'Bogart''s'),
	('40th Anniversary of The Wall Tour', 'Pink Droyd', '2019-04-20', 'Bogart''s'),
	('2019 U.S. Tour', 'Tool', '2019-05-08', 'KFC Yum Center'),
	('Sonic Temple', 'System of a Down', '2019-05-17', 'MAPFRE Stadium'),
	('Sonic Temple', 'Disturbed', '2019-05-18', 'MAPFRE Stadium'),
	('Sonic Temple', 'Foo Fighters', '2019-05-19', 'MAPFRE Stadium'),
	(NULL, 'The Maine', '2019-05-21', 'Old National Centre'),
	('Muddfest', 'Puddle of Mudd', '2019-06-23', 'Riverfront Live'),
	('Summer Gods Tour', 'Third Eye Blind', '2019-07-17', 'PNC Pavilion'),
	('Sad Summer Festival', NULL, '2019-07-20', 'Express! Live'),
	('Ember', 'Breaking Benjamin', '2019-08-07', 'Riverbend Music Center'),
	('North American Tour', 'Korn & Alice In Chains', '2019-08-18', 'Riverbend Music Center'),
	('METAL GALAXY WORLD TOUR', 'BABYMETAL', '2019-09-06', 'Coca-Cola Roxy'),
	('Louder Than Life', 'Slipknot', '2019-09-27', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Louder Than Life', 'Guns N'' Roses', '2019-09-28', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Louder Than Life', 'Disturbed', '2019-09-29', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Fear Inoculum', 'Tool', '2019-11-05', 'Heritage Bank Center'),
	('20 Years of Make Yourself and Beyond', 'Incubus', '2019-11-11', 'Taft Theatre'),
	(NULL, 'A Day to Remember', '2021-09-10', 'PromoWest Pavilion at Ovation'),
	(NULL, 'Coheed and Cambria & The Used', '2021-09-11', 'Express! Live'),
	('Side Summer 2021', 'All Time Low', '2021-09-12', 'Andrew J. Brady ICON Music Center'),
	('4th World Tour III', 'TWICE', '2022-02-24', 'State Farm Arena'),
	('Apocalypse: Save Us World Tour', 'DREAMCATCHER', '2022-07-03', 'Old Forester''s Paristown Hall'),
	('Louder Than Life', 'Nine Inch Nails', '2022-09-22', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Louder Than Life', 'Slipknot', '2022-09-23', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Louder Than Life', 'Kiss', '2022-09-24', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Louder Than Life', 'Red Hot Chili Peppers', '2022-09-25', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Sonic Temple', 'Avenged Sevenfold', '2023-05-26', 'Historic Crew Stadium'),
	(NULL, 'Little Big', '2023-06-18', 'Joe''s Live'),
	('READY TO BE TOUR V', 'TWICE', '2023-07-09', 'Truist Park'),
	('So Much For (Tour) Dust', 'Fall Out Boy', '2023-07-15', 'Riverbend Music Center'),
	('Sad Summer Festival', NULL, '2023-07-19', 'Andrew J. Brady ICON Music Center'),
	('Apocalypse: From Us World Tour', 'DREAMCATCHER', '2023-09-07', 'Taft Theatre'),
	('Louder Than Life', 'Foo Fighters', '2023-09-21', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Louder Than Life', 'Tool', '2023-09-22', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Louder Than Life', 'Avenged Sevenfold', '2023-09-23', 'Highland Festival Grounds at the Kentucky Expo Center'),
	('Life is but a Dream', 'Avenged Sevenfold', '2024-03-13', 'Heritage Bank Center'),
	('Lobster Popstar Tour', 'Little Big', '2024-05-30', 'Saint Andrew''s Hall'),
	('I Am Hollyweird', 'He Is Legend', '2024-06-05', 'Eastside Bowl'),
	('H.E.R.E.H.', 'IU', '2024-07-19', 'State Farm Arena'),
	('Guts World Tour', 'Olivia Rodrigo', '2024-07-24', 'Rupp Arena'),
	('BABYMETAL World Tour', 'BABYMETAL', '2024-11-23', 'Andrew J. Brady ICON Music Center'),
	('Louder Than Life', 'Avenged Sevenfold', '2025-09-19', 'Highland Festival Grounds at the Kentucky Expo Center');

INSERT INTO Music.[Events] (EventName, Headliner, [Date], Venue)
SELECT te.EventName, te.Headliner, te.[Date], te.Venue
FROM #TempEvents te
LEFT JOIN Music.[Events] e ON e.EventName = te.EventName AND e.Headliner = te.Headliner AND e.[Date] = te.[Date] AND e.Venue = te.Venue
WHERE e.Id IS NULL;
	
IF NOT EXISTS (SELECT * FROM sys.tables WHERE [name] = 'Artists' AND [schema_id] = SCHEMA_ID('Music'))
BEGIN
	CREATE TABLE Music.Artists (
		Id INT IDENTITY(1,1) PRIMARY KEY,
		Artist NVARCHAR(64) NOT NULL UNIQUE
	);
END

CREATE TABLE #TempArtists (
	Artist NVARCHAR(64),
	[Date] DATE NOT NULL,
	SetOrder INT NOT NULL
);

INSERT INTO #TempArtists (Artist, [Date], SetOrder)
VALUES
	('New Medicine', '2011-01-29', 1),
	('Hollywood Undead', '2011-01-29', 2),
	('Stone Sour', '2011-01-29', 3),
	('Avenged Sevenfold', '2011-01-29', 4),

	('All Human', '2012-10-16', 1),
	('Glamour of the Kill', '2012-10-16', 2),
	('Vampires Everywhere!', '2012-10-16', 3),
	('In Fear and Faith', '2012-10-16', 4),
	('Alesana', '2012-10-16', 5),

	('Ghost', '2013-10-06', 1),
	('Deftones', '2013-10-06', 2),
	('Avenged Sevenfold', '2013-10-06', 3),

	('Breaking Benjamin', '2015-05-15', 1),
	('Slash featuring Myles Kennedy and the Conspirators', '2015-05-15', 2),
	('Marilyn Manson', '2015-05-15', 3),
	('Slipknot', '2015-05-15', 4),

	('Of Mice & Men', '2015-05-16', 1),
	('Tremonti', '2015-05-16', 2),
	('BABYMETAL', '2015-05-16', 3),
	('In This Moment', '2015-05-16', 4),
	('Papa Roach', '2015-05-16', 5),
	('Godsmack', '2015-05-16', 6),

	('Hollywood Undead', '2015-05-17', 1),
	('The Pretty Reckless', '2015-05-17', 2),
	('Anthrax', '2015-05-17', 3),
	('Halestorm', '2015-05-17', 4),
	('Volbeat', '2015-05-17', 5),
	('Rise Against', '2015-05-17', 6),
	('Linkin Park', '2015-05-17', 7),

	('Thank You Scientist', '2015-10-13', 1),
	('Cursive', '2015-10-13', 2),
	('Coheed and Cambria', '2015-10-13', 3),

	('Boymeetsworld', '2016-03-12', 1),
	('The Maine', '2016-03-12', 2),
	('Mayday Parade', '2016-03-12', 3),

	('BABYMETAL', '2016-05-13', 1),

	('The Color Morale', '2016-07-21', 1),
	('Crown the Empire', '2016-07-21', 2),
	('Ice Nine Kills', '2016-07-21', 3),
	('Teenage Bottlerocket', '2016-07-21', 4),
	('The Story So Far', '2016-07-21', 5),
	('Ghost Town', '2016-07-21', 6),
	('Sykes', '2016-07-21', 7),
	('Assuming We Survive', '2016-07-21', 8),
	('The Maine', '2016-07-21', 9),
	('Sleeping With Sirens', '2016-07-21', 10),

	('Avatar', '2016-09-20', 1),
	('Killswitch Engage', '2016-09-20', 2),
	('Avenged Sevenfold', '2016-09-20', 3),

	('I Prevail', '2016-10-01', 1),
	('The Amity Affliction', '2016-10-01', 2),
	('Motionless in White', '2016-10-01', 3),
	('Hellyeah', '2016-10-01', 4),
	('Anthrax', '2016-10-01', 5),
	('Pierce the Veil', '2016-10-01', 6),
	('The Cult', '2016-10-01', 7),
	('Slayer', '2016-10-01', 8),
	('Avenged Sevenfold', '2016-10-01', 9),

	('Alter Bridge', '2016-10-02', 1),
	('Ghost', '2016-10-02', 2),
	('Korn', '2016-10-02', 3),
	('Disturbed', '2016-10-02', 4),
	('Slipknot', '2016-10-02', 5),

	('Coconut Milk', '2016-10-15', 1),
	('The Hunna', '2016-10-15', 2),
	('Jimmy Eat World', '2016-10-15', 3),

	('Pierce the Veil', '2017-05-05', 1),
	('The Cult', '2017-05-05', 2),
	('Mastodon', '2017-05-05', 3),
	('Opeth', '2017-05-05', 4),
	('Gojira', '2017-05-05', 5),
	('A Perfect Circle', '2017-05-05', 6),
	('Soundgarden', '2017-05-05', 7),

	('Nothing More', '2017-05-06', 1),
	('All That Remains', '2017-05-06', 2),
	('In This Moment', '2017-05-06', 3),
	('The Pretty Reckless', '2017-05-06', 4),
	('Chevelle', '2017-05-06', 5),
	('In Flames', '2017-05-06', 6),
	('Korn', '2017-05-06', 7),

	('Skillet', '2017-05-07', 1),
	('Seether', '2017-05-07', 2),
	('Three Days Grace', '2017-05-07', 3),
	('Papa Roach', '2017-05-07', 4),
	('Volbeat', '2017-05-07', 5),
	('Coheed and Cambria', '2017-05-07', 6),
	('The Offspring', '2017-05-07', 7),
	('Avenged Sevenfold', '2017-05-07', 8),

	('MuteMath', '2017-06-22', 1),
	('twenty one pilots', '2017-06-22', 2),

	('Bloodgate', '2017-07-10', 1),
	('Volbeat', '2017-07-10', 2),
	('Avenged Sevenfold', '2017-07-10', 3),

	('Jimmy Eat World', '2017-07-27', 1),
	('Incubus', '2017-07-27', 2),

	('Skillet', '2017-08-01', 1),
	('Stone Sour', '2017-08-01', 2),

	('The AKO Vendetta', '2017-10-07', 1),
	('Avanti', '2017-10-07', 2),
	('New Haven', '2017-10-07', 3),
	('Phantoms', '2017-10-07', 4),
	('Lorna Shore', '2017-10-07', 5),
	('Ice Nine Kills', '2017-10-07', 6),

	('The Beta Machine', '2017-11-19', 1),
	('A Perfect Circle', '2017-11-19', 2),

	('The Technicolors', '2018-04-21', 1),
	('The Wreckers', '2018-04-21', 2),
	('The Maine', '2018-04-21', 3),

	('Buckethead', '2018-04-28', 1),

	('Greta Van Fleet', '2018-05-18', 1),
	('Atreyu', '2018-05-18', 2),
	('Machine Gun Kelly', '2018-05-18', 3),
	('Quicksand', '2018-05-18', 4),
	('Breaking Benjamin', '2018-05-18', 5),
	('A Perfect Circle', '2018-05-18', 6),

	('Jelly Roll', '2018-05-19', 1),
	('Asking Alexandria', '2018-05-19', 2),
	('Black Veil Brides', '2018-05-19', 3),
	('Three Days Grace', '2018-05-19', 4),
	('Stone Sour', '2018-05-19', 5),
	('Avenged Sevenfold', '2018-05-19', 6),

	('Shaman''s Harvest', '2018-05-20', 1),
	('Red Sun Rising', '2018-05-20', 2),
	('We Came as Romans', '2018-05-20', 3),
	('I Prevail', '2018-05-20', 4),
	('The Used', '2018-05-20', 5),
	('Baroness', '2018-05-20', 6),
	('BABYMETAL', '2018-05-20', 7),
	('Godsmack', '2018-05-20', 8),
	('Tool', '2018-05-20', 9),

	('Spirit Animal', '2018-06-01', 1),
	('Incubus', '2018-06-01', 2),

	('3OH!3', '2018-07-19', 1),
	('Simple Plan', '2018-07-19', 2),
	('Waterparks', '2018-07-19', 3),
	('Unearth', '2018-07-19', 4),
	('The Interrupters', '2018-07-19', 5),
	('Issues', '2018-07-19', 6),
	('Bowling for Soup', '2018-07-19', 7),
	('Mayday Parade', '2018-07-19', 8),
	('Reel Big Fish', '2018-07-19', 9),
	('We The Kings', '2018-07-19', 10),
	('Less Than Jake', '2018-07-19', 11),
	('The Maine', '2018-07-19', 12),

	('Glassworld', '2018-09-20', 1),
	('Letters From the Fire', '2018-09-20', 2),
	('He Is Legend', '2018-09-20', 3),

	('Wynchester', '2018-11-10', 1),
	('Tenacious D', '2018-11-10', 2),

	('Vocal Few', '2018-11-17', 1),
	('Tyson Motsenbocker', '2018-11-17', 2),
	('He Is Legend', '2018-11-17', 3),

	('Maps & Atlases', '2019-02-23', 1),
	('Coheed and Cambria', '2019-02-23', 2),

	('The Grove', '2019-04-20', 1),
	('Pink Droyd', '2019-04-20', 2),

	('All Souls', '2019-05-08', 1),
	('Tool', '2019-05-08', 2),

	('Wage War', '2019-05-17', 1),
	('Avatar', '2019-05-17', 2),
	('Beartooth', '2019-05-17', 3),
	('Bad Wolves', '2019-05-17', 4),
	('Parkway Drive', '2019-05-17', 5),
	('Tom Morello', '2019-05-17', 6),
	('Halestorm', '2019-05-17', 7),
	('Ghost', '2019-05-17', 8),
	('System of a Down', '2019-05-17', 9),

	('Boston Manor', '2019-05-18', 1),
	('While She Sleeps', '2019-05-18', 2),
	('FEVER 333', '2019-05-18', 3),
	('Gojira', '2019-05-18', 4),
	('In This Moment', '2019-05-18', 5),
	('Lamb of God', '2019-05-18', 6),
	('Papa Roach', '2019-05-18', 7),
	('Disturbed', '2019-05-18', 8),

	('The Struts', '2019-05-19', 1),
	('The Hives', '2019-05-19', 2),
	('Foo Fighters', '2019-05-19', 3),

	('Grayscale', '2019-05-21', 1),
	('The Maine', '2019-05-21', 2),

	('Tantric', '2019-06-23', 1),
	('Saving Abel', '2019-06-23', 2),
	('Saliva', '2019-06-23', 3),
	('Trapt', '2019-06-23', 4),
	('Puddle of Mudd', '2019-06-23', 5),

	('RA RA Riot', '2019-07-17', 1),
	('Jimmy Eat World', '2019-07-17', 2),
	('Third Eye Blind', '2019-07-17', 3),

	('Jetty Bones', '2019-07-20', 1),
	('Stand Atlantic', '2019-07-20', 2),
	('Just Friends', '2019-07-20', 3),
	('Mom Jeans', '2019-07-20', 4),
	('The Wonder Years', '2019-07-20', 5),
	('State Champs', '2019-07-20', 6),
	('Mayday Parade', '2019-07-20', 7),
	('The Maine', '2019-07-20', 8),

	('Three Days Grace', '2019-08-07', 1),
	('Chevelle', '2019-08-07', 2),
	('Breaking Benjamin', '2019-08-07', 3),

	('FEVER 333', '2019-08-18', 1),
	('Underoath', '2019-08-18', 2),
	('Alice in Chains', '2019-08-18', 3),

	('Avatar', '2019-09-06', 1),
	('BABYMETAL', '2019-09-06', 2),

	('Wilson', '2019-09-27', 1),
	('All Them Witches', '2019-09-27', 2),
	('New Years Day', '2019-09-27', 3),
	('Graveyard', '2019-09-27', 4),
	('Phillip H. Anselmo & The Illegals', '2019-09-27', 5),
	('Beartooth', '2019-09-27', 6),
	('I Prevail', '2019-09-27', 7),
	('Chevelle', '2019-09-27', 8),
	('A Day to Remember', '2019-09-27', 9),
	('Staind', '2019-09-27', 10),
	('Slipknot', '2019-09-27', 11),

	('Anti-Flag', '2019-09-28', 1),
	('Badflower', '2019-09-28', 2),
	('Suicidal Tendencies', '2019-09-28', 3),
	('Stone Temple Pilots', '2019-09-28', 4),
	('Halestorm', '2019-09-28', 5),
	('Ice Cube', '2019-09-28', 6),
	('Godsmack', '2019-09-28', 7),
	('Guns N'' Roses', '2019-09-28', 8),

	('Sick Puppies', '2019-09-29', 1),
	('Fire from the Gods', '2019-09-29', 2),
	('Sum 41', '2019-09-29', 3),
	('Demon Hunter', '2019-09-29', 4),
	('Three Days Grace', '2019-09-29', 5),
	('In This Moment', '2019-09-29', 6),
	('Breaking Benjamin', '2019-09-29', 7),
	('Marilyn Manson', '2019-09-29', 8),
	('Rob Zombie', '2019-09-29', 9),
	('Disturbed', '2019-09-29', 10),

	('Killing Joke', '2019-11-05', 1),
	('Tool', '2019-11-05', 2),

	('Le Butcherettes', '2019-11-11', 1),
	('Incubus', '2019-11-11', 2),

	('The Devil Wears Prada', '2021-09-10', 1),
	('The Ghost Inside', '2021-09-10', 2),
	('A Day to Remember', '2021-09-10', 3),

	('The Used', '2021-09-11', 1),
	('Coheed and Cambria', '2021-09-11', 2),

	('Grayscale', '2021-09-12', 1),
	('The Maine', '2021-09-12', 2),

	('TWICE', '2022-02-24', 1),

	('DREAMCATCHER', '2022-07-03', 1),

	('Spiritbox', '2022-09-22', 1),
	('Nothing More', '2022-09-22', 2),
	('Royal & the Serpent', '2022-09-22', 3),
	('Highly Suspect', '2022-09-22', 4),
	('Halestorm', '2022-09-22', 5),
	('Evanescence', '2022-09-22', 6),
	('Bring Me The Horizon', '2022-09-22', 7),
	('Tenacious D', '2022-09-22', 8),
	('Nine Inch Nails', '2022-09-22', 9),

	('In Flames', '2022-09-23', 1),
	('In This Moment', '2022-09-23', 2),
	('Mastodon', '2022-09-23', 3),
	('GWAR', '2022-09-23', 4),
	('Shinedown', '2022-09-23', 5),
	('Slipknot', '2022-09-23', 6),

	('Chevelle', '2022-09-24', 1),
	('Alice Cooper', '2022-09-24', 2),
	('Theory of a Deadman', '2022-09-24', 3),
	('Body Count', '2022-09-24', 4),
	('Rob Zombie', '2022-09-24', 5),
	('Kiss', '2022-09-24', 6),

	('The Struts', '2022-09-25', 1),
	('Jelly Roll', '2022-09-25', 2),
	('Oxymorrons', '2022-09-25', 3),
	('The Pretty Reckless', '2022-09-25', 4),
	('Papa Roach', '2022-09-25', 5),
	('Incubus', '2022-09-25', 6),
	('Bad Religion', '2022-09-25', 7),
	('Alice in Chains', '2022-09-25', 8),
	('Action Bronson', '2022-09-25', 9),
	('Red Hot Chili Peppers', '2022-09-25', 10),

	('Dayseeker', '2023-05-26', 1),
	('Black Stone Cherry', '2023-05-26', 2),
	('BAND-MAID', '2023-05-26', 3),
	('Dorothy', '2023-05-26', 4),
	('Chevelle', '2023-05-26', 5),
	('Queens of the Stone Age', '2023-05-26', 6),
	('Avenged Sevenfold', '2023-05-26', 7),

	('Little Big', '2023-06-18', 1),
	
	('TWICE', '2023-07-09', 1),

	('Bring Me The Horizon', '2023-07-15', 1),
	('Fall Out Boy', '2023-07-15', 2),

	('Mom Jeans', '2023-07-19', 1),
	('Hot Mulligan', '2023-07-19', 2),
	('Motion City Soundtrack', '2023-07-19', 3),
	('The Maine', '2023-07-19', 4),

	('DREAMCATCHER', '2023-09-07', 1),

	('Coheed and Cambria', '2023-09-21', 1),
	('nothing, nowhere.', '2023-09-21', 2),
	('L7', '2023-09-21', 3),
	('Rancid', '2023-09-21', 4),
	('Weezer', '2023-09-21', 5),
	('Foo Fighters', '2023-09-21', 6),

	('Luna Aura', '2023-09-22', 1),
	('Avatar', '2023-09-22', 2),
	('SiM', '2023-09-22', 3),
	('Bad Omens', '2023-09-22', 4),
	('Corey Taylor', '2023-09-22', 5),
	('Megadeth', '2023-09-22', 6),
	('Limp Bizkit', '2023-09-22', 7),
	('FEVER 333', '2023-09-22', 8),
	('Dance Gavin Dance', '2023-09-22', 9),
	('Godsmack', '2023-09-22', 10),
	('Tool', '2023-09-22', 11),

	('The Hu', '2023-09-23', 1),
	('Asking Alexandria', '2023-09-23', 2),
	('BABYMETAL', '2023-09-23', 3),
	('Pierce the Veil', '2023-09-23', 4),
	('Dethklok', '2023-09-23', 5),
	('Pantera', '2023-09-23', 6),
	('Avenged Sevenfold', '2023-09-23', 7),

	('Sullivan King', '2024-03-13', 1),
	('Poppy', '2024-03-13', 2),
	('Avenged Sevenfold', '2024-03-13', 3),

	('Little Big', '2024-05-30', 1),

	('Codeseven', '2024-06-05', 1),
	('Johnny Booth', '2024-06-05', 2),
	('He Is Legend', '2024-06-05', 3),

	('IU', '2024-07-19', 1),

	('Pink Patheress', '2024-07-24', 1),
	('Olivia Rodrigo', '2024-07-24', 2),

	('Scene Queen', '2024-11-23', 1),
	('BABYMETAL', '2024-11-23', 2),

	('Liliac', '2025-09-19', 1),
	('Thornhill', '2025-09-19', 2),
	('Insane Clown Posse', '2025-09-19', 3),
	('Dayseeker', '2025-09-19', 4),
	('Mudvayne', '2025-09-19', 5),
	('Spiritbox', '2025-09-19', 6),
	('Breaking Benjamin', '2025-09-19', 7),
	('Sleep Token', '2025-09-19', 8),
	('Avenged Sevenfold', '2025-09-19', 9);

INSERT INTO Music.Artists (Artist)
SELECT DISTINCT ta.Artist
FROM #TempArtists ta
LEFT JOIN Music.Artists a ON a.Artist = ta.Artist
WHERE a.Id IS NULL;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE [Name] = 'ArtistsEvents')
BEGIN
	CREATE TABLE Music.ArtistsEvents (
		IdArtist INT NOT NULL,
		IdEvent INT NOT NULL,
		SetOrder INT NOT NULL,
		CONSTRAINT PK_ArtistsEvents PRIMARY KEY(IdArtist, IdEvent),
		CONSTRAINT FK_Artist FOREIGN KEY (IdArtist) REFERENCES Music.Artists(Id) ON DELETE CASCADE,
		CONSTRAINT FK_Event FOREIGN KEY (IdEvent) REFERENCES Music.Events(Id) ON DELETE CASCADE,
	);
END

INSERT INTO Music.ArtistsEvents (IdArtist, IdEvent, SetOrder)
SELECT a.Id, e.Id, ta.SetOrder
FROM #TempArtists ta
JOIN Music.Artists a ON a.Artist = ta.Artist
JOIN #TempEvents te ON te.[Date] = ta.[Date]
JOIN Music.[Events] e ON e.[Date] = te.[Date] AND e.Venue = te.Venue
LEFT JOIN Music.ArtistsEvents ae ON ae.IdArtist = a.Id AND ae.IdEvent  = e.Id
WHERE ae.IdArtist IS NULL;