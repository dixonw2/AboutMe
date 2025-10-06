IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'Music')
BEGIN
    EXEC('CREATE SCHEMA Music')
END
GO

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'Games')
BEGIN
    EXEC('CREATE SCHEMA Games')
END
GO