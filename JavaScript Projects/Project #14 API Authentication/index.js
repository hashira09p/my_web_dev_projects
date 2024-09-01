import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";



const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "JEROME1234";
const yourPassword = "JEROME1234";
var yourAPIKey = "0d329946-23dd-49b8-ba58-ca06312e3997";
var yourBearerToken = "70428a81-7957-4b35-b46e-bf74aa84d5e1";


app.use(bodyParser.urlencoded({extended:true}))


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

/*app.post("/register", async(req,res) => { // YOU CAN USE THIS METHOD IF YOU WANT TO REGISTER A NEW ACCOUNT.
  console.log(req.body.username)
  try{
    const response = await axios.post("https://secrets-api.appbrewery.com/register", {
      username : req.body.username,
      password : req.body.password
    })
    res.render("index.ejs", {
      content: response.data.success
    })
    console.log(response.data.succes)
  }
  catch(error){
    console.error("Failed To make request," + error.message);
  }
})*/

app.get("/noAuth", async(req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    console.log(response.data.secret);
    res.render("index.ejs",{
      content:response.data.secret
    });
  }
  catch(error){
    console.error("Failed To Make request", error.message);
  }
});

app.get("/basicAuth", (req,res) =>{

  const token = `${yourUsername}:${yourPassword}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const session_url = 'https://secrets-api.appbrewery.com/all?page=1';

  var config = {
    method: 'get',
    url: session_url,
    headers: { Authorization: 'Basic '+ encodedToken }
  };

  axios(config)
  .then(function (response) {
    res.render("index.ejs", {
      content: response.data[Math.floor(Math.random() * response.data.length)].secret
    });
  })
  .catch(function (error) {
    console.log(error);
  });
})



/*app.get("/basicAuth", async (req, res) => {
  
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=1",{
      auth:{
        username: yourUsername,
        password: yourPassword
      }
    });

    res.render("index.ejs", {
      content: response.data[Math.floor(Math.random() * response.data.length)].secret
    })
  }

  catch(err){
    console.log("Failed To Make Request,", err.message);
  }
});*/


app.get("/apiKey", async(req, res) => {
  console.log(yourBearerToken)
  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    
    res.render("index.ejs",{
      content: response.data[Math.floor(Math.random() * response.data.length)].secret
    })
  }
  catch(err){
    console.log("Failed To Make Request,", err.message);
  }
});

app.get("/bearerToken", (req, res) => {
  
  /*const session_url = "https://secrets-api.appbrewery.com/get-auth-token";

  var config = {
    username: yourUsername,
    password: yourPassword
  }

  axios.post(session_url,config)
  .then(function(response)  {
    yourBearerToken = response.data.token;
    console.log(yourBearerToken)
  })
  .catch(function(error){
    console.error("Can't fetch data,",error.message)
  })*/


  var token= {    
    headers:{Authorization: `Bearer  `+ yourBearerToken}
  }

  axios.get("https://secrets-api.appbrewery.com/secrets/2",token)
  .then((response) => {
    console.log(yourBearerToken)
    console.log(response.data.secret);
    res.render("index.ejs", {
      content:response.data.secret
    });
  })
  .catch(function(error){
    console.error("Can't fetch data,",error.message)
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
