import axios from "axios";

const { CLIENT_ID, SECRET } = process.env;

export default async function auth(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") return res.status(200).send("ok");
  //
  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      { grant_type: "client_credentials" },
      {
        auth: {
          username: CLIENT_ID,
          password: SECRET,
        },
      }
    );
    console.log("data", data);
    return res.status(200).json(data);
  } catch (error) {
    const { message } = error.response ? error.response.data : error;
    return res.status(400).json({ message });
  }
}
