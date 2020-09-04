const { NODE_ENV } = process.env;
const originUrl =
  NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://spotify-gas.vercel.app";

export const allowCors = (fn) => (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", originUrl);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
  return fn(req, res);
};

export function getErrorResponse(error) {
  const errorResponse = { message: error.message };
  if (error.response) {
    errorResponse.status = error.response.status;
    errorResponse.statusText = error.response.statusText;
    if (error.response.data) {
      errorResponse.status = error.response.data.error.status;
      errorResponse.message = error.response.data.error.message;
    }
  }
  return errorResponse;
}
