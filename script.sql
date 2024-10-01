IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [TypeCourses] (
    [Id] int NOT NULL IDENTITY,
    [TypeName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_TypeCourses] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Users] (
    [Id] int NOT NULL IDENTITY,
    [Email] nvarchar(max) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Courses] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [Price] float NOT NULL,
    [Thumbnails] nvarchar(max) NOT NULL,
    [AdviseVideo] nvarchar(max) NOT NULL,
    [TypeCourseId] int NOT NULL,
    CONSTRAINT [PK_Courses] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Courses_TypeCourses_TypeCourseId] FOREIGN KEY ([TypeCourseId]) REFERENCES [TypeCourses] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Courses_TypeCourseId] ON [Courses] ([TypeCourseId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240223165410_Initial', N'8.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [BackgroundColor] (
    [Id] int NOT NULL IDENTITY,
    [Start] nvarchar(max) NOT NULL,
    [End] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_BackgroundColor] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Banners] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Subtitle] nvarchar(max) NOT NULL,
    [Thumbnails] nvarchar(max) NOT NULL,
    [LinkAction] nvarchar(max) NOT NULL,
    [BtnTitle] nvarchar(max) NOT NULL,
    [BackgroundColorId] int NOT NULL,
    CONSTRAINT [PK_Banners] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Banners_BackgroundColor_BackgroundColorId] FOREIGN KEY ([BackgroundColorId]) REFERENCES [BackgroundColor] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Banners_BackgroundColorId] ON [Banners] ([BackgroundColorId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240224031018_add-banner-ver-2', N'8.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Banners].[LinkAction]', N'ActionLink', N'COLUMN';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240224040008_ver-3-banner', N'8.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240224041340_ver-4-add-banner', N'8.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Banners] DROP CONSTRAINT [FK_Banners_BackgroundColor_BackgroundColorId];
GO

DROP TABLE [BackgroundColor];
GO

DROP INDEX [IX_Banners_BackgroundColorId] ON [Banners];
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Banners]') AND [c].[name] = N'BackgroundColorId');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Banners] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Banners] DROP COLUMN [BackgroundColorId];
GO

ALTER TABLE [Banners] ADD [EndColor] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [Banners] ADD [StartColor] nvarchar(max) NOT NULL DEFAULT N'';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240224041815_add-banner-v5', N'8.0.2');
GO

COMMIT;
GO

