SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
SET NAMES utf8mb4;
INSERT INTO `user` (
        `id`,
        `username`,
        `email`,
        `password`,
        `role`,
        `refreshToken`,
        `lastSignInAt`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        '9b434131-464b-4944-b1c1-7937c6b8246p',
        'Bettor',
        'bettor@example.com',
        '$2b$10$.G/59nKi8X52Pnq7Qoi1Nuq3Mr.4Ch8RkHfsLcuq5avBGRtkyxOvm',
        'bettor',
        NULL,
        NULL,
        NOW(),
        NULL
    ),
    (
        '9b434131-464b-4944-b1c1-7937c6b8246b',
        'Bookmaker',
        'bookmaker@example.com',
        '$2b$10$S2HhgY9VP3O79SlelGfl0.2fSZ.ZkTAL5fA6Yh0JjCbB14VuD1Sv6',
        'bookmaker',
        NULL,
        NULL,
        NOW(),
        NULL
    );