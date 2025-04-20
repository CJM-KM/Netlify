import axios from 'axios';

const API_URL = 'https://localhost:5001/api';

const apiService = {
  // Journey endpoints
  getJourneys: () => axios.get(`${API_URL}/Journey`),
  getJourney: (id) => axios.get(`${API_URL}/Journey/${id}`),
  createJourney: (journey) => axios.post(`${API_URL}/Journey`, journey),
  updateJourney: (id, journey) => axios.put(`${API_URL}/Journey/${id}`, journey),
  deleteJourney: (id) => axios.delete(`${API_URL}/Journey/${id}`),

  // Stage endpoints
  getStages: () => axios.get(`${API_URL}/Stage`),
  getStage: (id) => axios.get(`${API_URL}/Stage/${id}`),
  createStage: (stage) => axios.post(`${API_URL}/Stage`, stage),
  updateStage: (id, stage) => axios.put(`${API_URL}/Stage/${id}`, stage),
  deleteStage: (id) => axios.delete(`${API_URL}/Stage/${id}`),

  // Touchpoint endpoints
  getTouchpoints: () => axios.get(`${API_URL}/Touchpoint`),
  getTouchpoint: (id) => axios.get(`${API_URL}/Touchpoint/${id}`),
  createTouchpoint: (touchpoint) => axios.post(`${API_URL}/Touchpoint`, touchpoint),
  updateTouchpoint: (id, touchpoint) => axios.put(`${API_URL}/Touchpoint/${id}`, touchpoint),
  deleteTouchpoint: (id) => axios.delete(`${API_URL}/Touchpoint/${id}`),
};

export default apiService; 