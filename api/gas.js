import axios from "axios";
import { getErrorResponse, allowCors } from "../api-utils";

async function gas(req, res) {
  const { token, genre, page } = req.body;
  const offset = 4 * (page - 1);
  try {
    const url = `https://api.spotify.com/v1/search?q=genre%3A%22${genre}%22&type=artist&market=US&limit=4&offset=${offset}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { total, items } = data.artists;
    return res.status(200).json({ total, artists: items });
  } catch (error) {
    const errorResponse = getErrorResponse(error);
    if (errorResponse.message === "The access token expired") {
      return res.status(200).json(errorResponse);
    }
    return res.status(400).json(getErrorResponse(error));
  }
}

const handler = allowCors(gas);

export default handler;
