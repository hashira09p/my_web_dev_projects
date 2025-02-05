import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import ngrok from "ngrok"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432
});

db.connect();

async function getVisitedCountries() {
  let countriesVisited = [];
  let result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country) => { countriesVisited.push(country.country_code) });

  return countriesVisited;
}


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  const url = await ngrok.connect(port);
  console.log(`ngrok URL: ${url}`);
});

app.get("/", async (req, res) => {

  let data = await getVisitedCountries();

  console.log(data);
  res.render("index.ejs", {
    countries: data,
    total: data.length
  })
});

app.post("/add", async (req, res) => {
  try {
    let countryInput = req.body.country;

    let result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [countryInput.toLowerCase()]
    )

    console.log("result: " + result.rows[0].country_code.length);

    if (result.rows.length >= 0) {
      let data = await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [result.rows[0].country_code]);
      res.redirect("/");
    }
  } catch (err) {
    let data = await getVisitedCountries();

    console.log(err.message);
    res.render("index.ejs", {
      countries: data,
      total: data.length,
      error: "Already visited this Country"
    })
  }
})