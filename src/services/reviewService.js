import axios from 'axios';

export async function getReviews() {
  const response = await axios.get('/mock-data/reviews.json');
  return response.data;
}
