import axios from "axios";
import { getErrorResponse, allowCors } from "../api-utils";

const { CLIENT_ID, SECRET } = process.env;

async function auth(_, res) {
  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      { auth: { username: CLIENT_ID, password: SECRET } }
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(getErrorResponse(error));
  }
}

const handler = allowCors(auth);

export default handler;
