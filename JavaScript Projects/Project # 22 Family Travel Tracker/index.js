import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function getAllUsers() {

  let users = [];

  const results = await db.query("SELECT id, name, color FROM users")

  results.rows.forEach((user) => { users.push(user) });

  return users;
}

// Async Functions

async function getAllCountries() {
  let countries = [];
  const result = await db.query("SELECT country_code FROM users JOIN visited_countries ON users.id = user_id WHERE users.id = $1", [currentUserId]);

  result.rows.forEach((country) => {
    countries.push(country.country_code);
  })
  return countries;
}

async function getUserColor() {
  const result = await db.query("SELECT color FROM users WHERE users.id = $1", [currentUserId]);
  // console.log(result.rows[0].color);
  return result.rows[0].color;
}

async function countryCode(country) {
  let result;
  try {
    result = await db.query("SELECT country_code FROM countries  WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [country.toLowerCase()]);
    return result.rows[0].country_code;

  } catch (err) {
    return "Can't find the country";
  }
}

// Routes

app.get("/", async (req, res) => {
  let users = await getAllUsers();
  let countries = await getAllCountries();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: await getUserColor(),
  });
});

app.post("/add", async (req, res) => {
  const country_code = await countryCode(req.body.country);
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);

  console.log(result.rows.length);
  try {
    if (result.rows.length > 0) {
      res.redirect("/");
    } else {
      await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)", [country_code, currentUserId]);

      console.log("success")
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.message);

    let users = await getAllUsers();
    let countries = await getAllCountries();

    console.log(users)

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: await getUserColor(),
      error: country_code // if the value of this variable is error that it gets to the output of the function countryCode();
    });
  }
});

app.post("/user", async (req, res) => {
  // console.log(req.body.user);

  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  let name = req.body.name;
  let color = req.body.color;

  console.log(name.length);

  if (name.length == 0) {
    res.render("new.ejs", {
      error: "Please input your name!"
    })
  } else {
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [name, color]);

    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
