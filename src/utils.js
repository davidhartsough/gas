import axios from "axios";

const { NODE_ENV } = process.env;
const apiUrl =
  NODE_ENV === "development"
    ? "http://localhost:3000/api/"
    : "https://spotify-gas.vercel.app/api/";

export async function getToken() {
  const { data } = await axios.get(`${apiUrl}auth`);
  const token = data.access_token;
  localStorage.setItem("gasToken", token);
  return token;
}

async function gas(token, genre, page) {
  const { data } = await axios.post(`${apiUrl}gas`, { token, genre, page });
  return data;
}

export async function getArtists(genre, page = 1) {
  let token = localStorage.getItem("gasToken");
  if (!token) {
    token = await getToken();
  }
  let data = await gas(token, genre, page);
  if (data.message === "The access token expired") {
    token = await getToken();
    data = await gas(token, genre, page);
  }
  return data;
}
