CREATE TABLE TripleTriadCards (
	CardName NVARCHAR(256) NOT NULL PRIMARY KEY,
	[Left] CHAR NOT NULL,
	Up CHAR NOT NULL,
	[Right] CHAR NOT NULL,
	Down CHAR NOT NULL,
	Element NVARCHAR(32)
);

INSERT INTO TripleTriadCards (CardName, [Left], Up, [Right], Down, Element) VALUES
	('Geezard',		5, 1, 4, 1, NULL),
	('Funguar',		3, 5, 1, 1, NULL),
	('Bite Bug',	5, 1, 3, 3, NULL),
	('Red Bat',		2, 6, 1, 1, NULL),
	('Blobra',		5, 2, 3, 1,	NULL),
	('Gayla',		4, 2, 1, 4,	'Thunder');