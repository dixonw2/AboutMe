IF NOT EXISTS (SELECT * FROM sys.tables WHERE [name] = 'BlogAlbums' AND [schema_id] = SCHEMA_ID('Music'))
BEGIN
	CREATE TABLE Music.[BlogAlbums] (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        AlbumName NVARCHAR(128) NOT NULL,
        Artist NVARCHAR(128) NOT NULL,
        Genre NVARCHAR(32) NOT NULL,
        Review NVARCHAR(MAX) NOT NULL,
        Rating INT NOT NULL,
        AppleMusicLink NVARCHAR(256) NOT NULL,
        SpotifyLink NVARCHAR(256) NOT NULL,
        ReleaseDate DATE NOT NULL,
        AlbumArtPath NVARCHAR(128) NOT NULL,
		DateCreated DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
		CONSTRAINT UN_BlogAlbums UNIQUE(AlbumName, Artist)
	);
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE [name] = 'BlogAlbumSongs' AND [schema_id] = SCHEMA_ID('Music'))
BEGIN
    CREATE TABLE Music.[BlogAlbumSongs] (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        SongName NVARCHAR(256) NOT NULL,
        SongLength TIME NOT NULL,
        IdBlogAlbums INT NOT NULL,
        CONSTRAINT FK_BlogAlbums FOREIGN KEY (IdBlogAlbums) REFERENCES Music.BlogAlbums(Id) ON DELETE CASCADE
    )
END