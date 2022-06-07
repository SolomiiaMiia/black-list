CREATE TABLE [dbo].[File]
(
    [Id] int NOT NULL IDENTITY (1,1) PRIMARY KEY, 
    [Name] NVARCHAR(MAX) NOT NULL,  
    [Path] NVARCHAR(MAX) NOT NULL, 
    [Type] NVARCHAR(MAX) NOT NULL,
    [MimeType] NVARCHAR(MAX) NOT NULL Default('application/octet-stream'),
    [DossierId] INT NULL,
    [DossierDisproveId] INT NULL,
    CONSTRAINT FK_FileDossier FOREIGN KEY ([DossierId]) REFERENCES [Dossier](Id),
    CONSTRAINT FK_FileDossierDisprove FOREIGN KEY ([DossierDisproveId]) REFERENCES [DossierDisprove](Id)
)
GO
CREATE INDEX IX_DossierId ON [File] ([DossierId])
GO
CREATE INDEX IX_DossierDisproveId ON [File] ([DossierDisproveId])
GO
