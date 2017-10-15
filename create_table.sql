CREATE TABLE IF NOT EXISTS data(
    name    VARCHAR,
    time    time,
    date    date,
    info    TEXT
);

CREATE TABLE IF  NOT EXISTS users(
	admin		BOOLEAN			DEFAULT FALSE,
    username    VARCHAR(255)    UNIQUE,
    password    VARCHAR(1000)   UNIQUE
);