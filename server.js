const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json({ extended: false }));

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/thumbnail"));

app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
