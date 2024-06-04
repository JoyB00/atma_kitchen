import axios from '.';

export const fetchWithdrawalRequests = async () => {
  const response = await axios.get('/api/withdrawal-requests');
  return response.data;
};

export const confirmWithdrawalRequest = async (id) => {
  const response = await axios.post(`/api/confirm-withdrawal/${id}`);
  return response.data;
};
