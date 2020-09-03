import axios from "axios";

export default async function gas(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") return res.status(200).send("ok");
  //
  const { token, genre, page } = req.body;
  const offset = 5 * (page - 1);
  try {
    console.log("req.body", req.body);
    const { data } = axios.get(
      `https://api.spotify.com/v1/search?q=genre%3A%22${genre}%22&type=artist&market=US&limit=5&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("data", data);
    return res.status(200).json(data);
  } catch (error) {
    const { message } = error.response ? error.response.data : error;
    return res.status(400).json({ message });
  }
}
