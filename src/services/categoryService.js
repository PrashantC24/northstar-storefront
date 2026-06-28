import axios from 'axios';

export async function getCategories() {
  const response = await axios.get('/mock-data/categories.json');
  return response.data;
}
