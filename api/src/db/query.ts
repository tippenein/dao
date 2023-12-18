import { db } from './db'

export const allProposals = db.any('select * from proposals')
