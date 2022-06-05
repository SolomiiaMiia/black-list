CREATE TABLE [dbo].[DossierDisprove]
(
    [Id] int NOT NULL IDENTITY (1,1) PRIMARY KEY, 
    
    [Text] NVARCHAR(MAX) NOT NULL,
    [Author] NVARCHAR(MAX) NOT NULL,
    [Phone] NVARCHAR(MAX) NULL,
    [Email] NVARCHAR(MAX) NULL,
    [Date] DATETIME2 NOT NULL,
)
