DROP TABLE IF EXISTS images;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    board_id INTEGER NOT NULL REFERENCES boards(id),
    uploader_id INTEGER NOT NULL REFERENCES users(id),
    imageurl VARCHAR(300) NOT NULL,
    description TEXT,
    location VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
