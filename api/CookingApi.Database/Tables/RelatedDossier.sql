CREATE TABLE [dbo].[RelatedDossier]
(
    [DossierId] INT NOT NULL,
    [RelatedDossierId] INT NOT NULL,
    CONSTRAINT PK_RelatedDossier PRIMARY KEY ([DossierId], [RelatedDossierId]),
    CONSTRAINT FK_RelatedDossier_Dossier FOREIGN KEY ([DossierId]) REFERENCES [Dossier](Id),
    CONSTRAINT FK_RelatedDossier_RelatedDossierId FOREIGN KEY ([RelatedDossierId]) REFERENCES [Dossier](Id),
)
GO
CREATE INDEX IX_RelatedDossier_RelatedDossierId ON [RelatedDossier] ([RelatedDossierId])
GO
