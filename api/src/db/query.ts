import { db } from './db';

export const allProposals = db.any('select * from proposals');

export const getStats = db.one(
  'SELECT (SELECT COUNT(*) FROM proposals WHERE started_at IS NOT NULL) AS proposed_total, (SELECT COUNT(*) FROM proposals WHERE concluded_at IS NOT NULL) AS concluded_total'
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
