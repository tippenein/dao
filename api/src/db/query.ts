import { PROPOSAL_UUID } from '../util';
import { db } from './db';

export const allProposals = db.any('select * from proposals');

export const getStats = db.one(
  `SELECT
    COALESCE((SELECT COUNT(*) FROM proposals WHERE started_at IS NOT NULL), 0) AS proposed_total,
    COALESCE((SELECT COUNT(*) FROM proposals WHERE concluded_at IS NOT NULL), 0) AS concluded_total
  `
);

export const updateProposalStart = (uuid: string) => {
  const id = db.one(
    `update proposals set started_at = now() where uuid = ${uuid} returning ID`,
    {
      uuid
    }
  );
  db.none(`insert into funding(proposal_id = ${id}`, {
    id
  });
};

export const insertProposal = (
  title: string,
  description: string,
  proposer: string,
) => {
  db.none(
    'insert into proposals(title, description, proposer, uuid) values (${title}, ${description}, ${proposer}, ${uuid})',
    { title, description, proposer, uuid: PROPOSAL_UUID }
  );
};
