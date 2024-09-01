import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const myToken = "70428a81-7957-4b35-b46e-bf74aa84d5e1"

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port,() => {
  console.log("Port 3000 is listening")
})

app.get("/",(req, res) => {
  res.render("index.ejs",{
    content: "Waiting for data"
  })
})

app.post("/get-secret", (req, res) => {
  const id = req.body.id;
  
  var config = {
    method: 'get',
    url: `https://secrets-api.appbrewery.com/secrets/${id}`,
    headers: {Authorization: `Bearer ${myToken}`}
  }

  axios(config)
  .then((response) => {
    
    var data = JSON.stringify(response.data)

    res.render("index.ejs", {
      content: data
    });
  })
  .catch((error) => {
    console.error("Failed to make request," , error.message);
  });
});

app.post("/post-secret", async(req, res) => {
  const newsecret = req.body.secret;
  const newscore = req.body.score
  
  const bodyData ={
    secret: newsecret,
    score: newscore,
  }

  const auth = {headers:{
    Authorization:`Bearer ${myToken}`
  }}

  try{
    const response = await axios.post(`https://secrets-api.appbrewery.com/secrets`,bodyData, auth);

    var data = JSON.stringify(response.data);
    
    res.render("index.ejs", {
      content: data
    });
  }
  catch(error){
    console.error("Failed To Post Requst," , error.message)
  }
});

app.post("/get-secret", (req, res) => {
  const id = req.body.id;
  
  var config = {
    method: 'get',
    url: `https://secrets-api.appbrewery.com/secrets/${id}`,
    headers: {Authorization: `Bearer ${myToken}`}
  }

  axios(config)
  .then((response) => {
    
    var data = JSON.stringify(response.data)

    res.render("index.ejs", {
      content: data
    });
  })
  .catch((error) => {
    console.error("Failed to make request," , error.message);
  });
});

app.post("/put-secret", async (req, res) => {
  const id = req.body.id;
  var updatedSecret = req.body.secret;
  var updatedScore = req.body.score;

  const body = {
    secret : updatedSecret,
    score : updatedScore
  }

  const auth = {
    headers: {
      Authorization: `Bearer ${myToken}`
    }
  }

  try{
    const response = await axios.put(`https://secrets-api.appbrewery.com/secrets/${id}`, body, auth)

    res.render("index.ejs",{
      content: JSON.stringify(response.data)
    })
  }
  catch(error){
    console.error("Failed to make request," , error.message);
  };
});

app.post("/patch-secret", async(req, res) => {
  const id = req.body.id;
  var updatedSecret = req.body.secret;
  var updatedScore = req.body.score;

  const body = {
    secret : updatedSecret,
    score : updatedScore
  }

  const auth = {
    headers: {
      Authorization: `Bearer ${myToken}`
    }
  }

  try{
    const response = await axios.patch(`https://secrets-api.appbrewery.com/secrets/${id}`, body, auth)

    res.render("index.ejs",{
      content: JSON.stringify(response.data)
    })
  }
  catch(error){
    console.error("Failed to make request," , error.message);
  };
});

app.post("/delete-secret", async(req, res) => {
  const id = req.body.id;

  var config = {
    method: 'delete',
    url: `https://secrets-api.appbrewery.com/secrets/${id}`,
    headers: {
      Authorization: `Bearer ${myToken}`
    }
  }

  axios(config)
  .then((response) => {
    res.render("index.ejs", {
      content: response.data.message
    })
  })
  .catch((error) => {
    console.error("Failed To Make Request,", error.message);
  });
})