import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchRFPs = () => axios.get(`${API_URL}/sales`);
export const fetchSKURecommendations = (id) => axios.get(`${API_URL}/technical/${id}`);
export const fetchPricing = (id) => axios.get(`${API_URL}/pricing/${id}`);
// Change this function to call the new '/data' endpoint
export const fetchFinalResponse = (id) => axios.get(`${API_URL}/master/${id}/data`);
