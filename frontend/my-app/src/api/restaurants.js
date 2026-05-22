import api from './axios.js'

const API_BASE = 'http://localhost:3000';

export async function getRestaurants() {
  const res = await fetch(`${API_BASE}/restaurants`);
  return res.json();
}

export async function getRestaurantDetails(restaurantId) {
  const res = await fetch(`${API_BASE}/restaurants/${restaurantId}`);
  return res.json();
}

export async function getBranchMenu(restaurantId, branchId) {
  const res = await fetch(`${API_BASE}/restaurants/${restaurantId}/branches/${branchId}/menu`);
  return res.json();
}