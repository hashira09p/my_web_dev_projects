import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalists",
  password: "123456",
  port: 5432
});

db.connect();

async function getItems() {
  const result = await db.query("SELECT id, title FROM items ORDER BY id ASC");
  return result
}

app.get("/", async (req, res) => {
  let items = await getItems();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items.rows,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {  // This is update route. I used app.post because the html doesn't support patch.
  const updatedItem = req.body.updatedItemTitle;
  const itemId = req.body.updatedItemId;

  await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedItem, itemId]);

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;

  await db.query("DELETE FROM items WHERE id = $1", [itemId]);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
