const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// server health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Journey Log API is alive" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
