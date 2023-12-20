CREATE TABLE proposals(
  ID SERIAL PRIMARY KEY,
  uuid VARCHAR NOT NULL,
  proposer VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  milestones INT NOT NULL,
  amount_per_milestone INT NOT NULL,
  started_at timestamp without time zone default (now() at time zone 'utc'),
  concluded_at timestamp without time zone default (now() at time zone 'utc')
);

CREATE TABLE funding(
  ID SERIAL PRIMARY KEY,
  proposal_id INT REFERENCES proposals(ID)
)