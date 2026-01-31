const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3004;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

const dbClient = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectToDatabase() {
  try {
    await dbClient.connect();
    console.log("✅ Successfully connected to the database!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
  }
}

connectToDatabase();

const getTodos = (request, response) => {
  dbClient.query("SELECT * FROM public.todos", (error, results) => {
    if (error) {
      console.error("Error executing query", error.stack);
      return response.status(500).json({ message: "Internal Server Error" });
    }
    response.status(200).json(results.rows);
  });
};

app.get("/", async (req, res) => {
  res.send("Hello World from backend");
});

app.get("/todos", (req, res) => {
  getTodos(req, res);
});

app.post("/todos", async (req, res) => {
  const { todo, completed } = req.body;
  console.log(
    `adding task with text: ${todo} and status completed ${completed}`
  );
  if (!todo || typeof completed === "undefined") {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const id = uuidv4();
    const result = await dbClient.query(
      "INSERT INTO public.todos (id, todo, completed) VALUES ($1, $2, $3) RETURNING *",
      [id, todo, completed]
    );

    const newTodo = result.rows[0];

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error inserting todo into database:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid completed status" });
  }

  try {
    const result = await dbClient.query(
      "UPDATE public.todos SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
