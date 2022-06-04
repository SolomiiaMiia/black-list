CREATE TABLE [dbo].[Settings]
(
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [VideoLink] NVARCHAR(MAX) NOT NULL,  
    [NewDossierText] NVARCHAR(MAX) NOT NULL, 
    [DisproveDossierText] NVARCHAR(MAX) NOT NULL,
    [CreationDate] DATETIME2 NOT NULL
)
