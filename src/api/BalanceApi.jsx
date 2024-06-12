import { useAxios } from "./index";

const fetchWithdrawalRequests = async () => {
  try {
    const response = await useAxios.get('/withdrawal-requests', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const confirmWithdrawalRequest = async (id) => {
  try {
    const response = await useAxios.post(`/confirm-withdrawal/${id}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchWithdrawalRequests, confirmWithdrawalRequest };