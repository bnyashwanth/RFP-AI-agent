import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchRFPs = () => axios.get(`${API_URL}/sales`);
export const fetchSKURecommendations = (id) => axios.get(`${API_URL}/technical/${id}`);
export const fetchPricing = (id) => axios.get(`${API_URL}/pricing/${id}`);
export const fetchFinalResponse = (id) => axios.get(`${API_URL}/master/${id}`);
