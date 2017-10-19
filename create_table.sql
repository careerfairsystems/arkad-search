CREATE TABLE IF NOT EXISTS data(
    id      serial NOT NULL,
    name    VARCHAR,
    time    time without time zone,
    date    date,
    info    TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE IF  NOT EXISTS users(
	admin		BOOLEAN			DEFAULT FALSE,
    username    VARCHAR(255)    UNIQUE,
    password    VARCHAR(1000)   UNIQUE
);

CREATE TABLE IF NOT EXISTS searchqueries(
    query       VARCHAR(255),
    timeofquery timestamp DEFAULT CURRENT_TIMESTAMP
);