CREATE TABLE [dbo].[Dossier]
(
    [Id] int NOT NULL IDENTITY (1,1) PRIMARY KEY, 
    [LastName] NVARCHAR(MAX) NOT NULL,  
    [FirstName] NVARCHAR(MAX) NOT NULL, 
    [ThirdName] NVARCHAR(MAX) NOT NULL,
    [Position] NVARCHAR(MAX)  NULL,
    [PlaceOfWork] NVARCHAR(MAX) NULL,
    [Address] NVARCHAR(MAX) NOT NULL,
    [Region] NVARCHAR(MAX) NULL,
    [Locality] NVARCHAR(MAX) NULL,
    [Date] DATETIME2 NOT NULL,
    [Status] NVARCHAR(MAX) NOT NULL,
    [Text] NVARCHAR(MAX) NOT NULL,
    [IsAnonymous] BIT NOT NULL,
    [Author] NVARCHAR(MAX) NOT NULL,
    [Phone] NVARCHAR(MAX) NULL,
    [Email] NVARCHAR(MAX) NULL,
    [Type] NVARCHAR(MAX) NOT NULL,
    [DisproveDossierId] INT NULL,
    [Tags] NVARCHAR(MAX) NULL,
    CONSTRAINT FK_DossierDisproveDossier FOREIGN KEY ([DisproveDossierId]) REFERENCES DossierDisprove(Id),
)
GO

CREATE INDEX IX_DossierDisproveDossierId ON DossierDisprove (Id)
GO

