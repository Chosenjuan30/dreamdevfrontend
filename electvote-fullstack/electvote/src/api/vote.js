import client from './client';

/**
 * Cast a vote — requires JWT (voter must be logged in)
 * @param {{ electionId: string, candidateId: string }} data
 * @returns {Promise<VoteResponse>}
 */
export async function castVote(data) {
  const res = await client.post('/vote', data);
  return res.data; // ApiResponse<VoteResponse>
}

/**
 * Check if the authenticated voter has voted in an election
 * @param {string} electionId
 * @returns {Promise<boolean>}
 */
export async function hasVoted(electionId) {
  const res = await client.get('/vote/check', { params: { electionId } });
  return res.data.data; // boolean
}
