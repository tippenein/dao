CREATE TABLE proposals(
  ID SERIAL PRIMARY KEY,
  proposer VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  started_at timestamp without time zone default (now() at time zone 'utc'),
  concluded_at timestamp without time zone default (now() at time zone 'utc')
);