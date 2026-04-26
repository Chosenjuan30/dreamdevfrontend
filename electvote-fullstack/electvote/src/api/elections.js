import client from './client';

/**
 * Get all elections, optionally filtered by status
 * @param {'OPEN'|'CLOSED'|'UPCOMING'} [status]
 * @returns {Promise<ElectionResponse[]>}
 */
export async function getAllElections(status) {
  const params = status ? { status } : {};
  const res = await client.get('/elections', { params });
  return res.data; // ApiResponse<ElectionResponse[]>
}

/**
 * Get a single election by ID
 * @param {string} id
 * @returns {Promise<ElectionResponse>}
 */
export async function getElectionById(id) {
  const res = await client.get(`/elections/${id}`);
  return res.data;
}

/**
 * Get live results for an election
 * @param {string} electionId
 * @returns {Promise<ResultResponse>}
 */
export async function getResults(electionId) {
  const res = await client.get(`/elections/${electionId}/results`);
  return res.data; // ApiResponse<ResultResponse>
}
