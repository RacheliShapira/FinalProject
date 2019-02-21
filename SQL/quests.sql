DROP TABLE IF EXISTS quests;

CREATE TABLE quests(
    id SERIAL PRIMARY KEY,
    board_name VARCHAR(300) NOT NULL CHECK (board_name <> ''),
    board_img VARCHAR(300) NOT NULL,
    description TEXT,
    type VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
