CREATE TABLE [dbo].[Courses]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Title] NVARCHAR(150) NOT NULL, 
    [ShortDescription] NVARCHAR(MAX) NOT NULL, 
    [Description] NVARCHAR(MAX) NOT NULL, 
    [Price] DECIMAL(19, 4) NOT NULL, 
    [Date] DATETIME NULL, 
    [IsDeleted] BIT NOT NULL, 
    [CreationDate] DATETIME2 NOT NULL
)
