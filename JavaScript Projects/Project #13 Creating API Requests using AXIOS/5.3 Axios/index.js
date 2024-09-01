import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async(req, res) => {
  try{
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    res.render("index.ejs", {
      result: response.data
    });
  }
  catch(error){
    console.error("Failed to make request,", error.message);
    res.status(500).send("Failed to fecth activity. Please Try Again");
  }
})

app.post("/submit", async (req, res) => {
  var type = req.body.type;
  var participants = req.body.participants;
  
  console.log(type);
  console.log(participants);
  
  try{
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?${type}&&${participants}`);
    var r = Math.floor(Math.random()*response.data.length);
    console.log(response.data)
    console.log(response.data)
    console.log(r);
    res.render("index.ejs", {
      resultActivity: response.data[r].activity,
      resultType: response.data[r].type,
      resultParticipants: response.data[r].participants
    })
  }

  catch(error){
    console.error("Failed to make request,", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria."
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
