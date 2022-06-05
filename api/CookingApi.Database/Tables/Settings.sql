CREATE TABLE [dbo].[Settings]
(
    [Id] int NOT NULL IDENTITY (1,1) PRIMARY KEY, 
    [VideoLink] NVARCHAR(MAX) NOT NULL,  
    [NewDossierText] NVARCHAR(MAX) NOT NULL, 
    [DisproveDossierText] NVARCHAR(MAX) NOT NULL
)
