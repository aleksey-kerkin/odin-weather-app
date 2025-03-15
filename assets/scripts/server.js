import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "../../public")
  )
);

app.get("/api/weather", async (req, res) => {
  const location = req.query.location;
  const apiKey = process.env.VCP_API_KEY;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&unitGroup=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
