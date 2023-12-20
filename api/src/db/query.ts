import { db } from './db';

export const allProposals = db.any('select * from proposals');

export const getStats = db.one(
  `SELECT
    COALESCE((SELECT COUNT(*) FROM proposals WHERE started_at IS NOT NULL), 0) AS proposed_total,
    COALESCE((SELECT COUNT(*) FROM proposals WHERE concluded_at IS NOT NULL), 0) AS concluded_total
  `
);
export const insertProposal = (
  title: string,
  description: string,
  proposer: string
) => {
  db.none(
    'insert into proposals(title, description, proposer) values (${title}, ${description}, ${proposer})',
    { title, description, proposer }
  );
};
