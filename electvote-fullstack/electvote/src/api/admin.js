import client from './client';

/**
 * Create a new election (ADMIN only)
 * @param {{ title: string, startDate: string, endDate: string }} data
 * @returns {Promise<ElectionResponse>}
 */
export async function createElection(data) {
  const res = await client.post('/admin/elections', data);
  return res.data;
}

/**
 * Add a candidate to an election (ADMIN only)
 * @param {{ name: string, party: string, electionId: string }} data
 * @returns {Promise<ElectionResponse>}
 */
export async function addCandidate(data) {
  const res = await client.post('/admin/candidates', data);
  return res.data;
}
