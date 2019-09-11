// Get an API key from https://www.themoviedb.org/settings/api
// (you need to sign up!) Then paste it in here.
const API_KEY = 'insert your API key here!';
const BASE_URL = 'https://api.themoviedb.org/3';

const waitABit = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

export async function getMovies() {
  await waitABit(1000);
  const response = await fetch(
    `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
}

export async function getMovie(id) {
  await waitABit(1000);
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}
