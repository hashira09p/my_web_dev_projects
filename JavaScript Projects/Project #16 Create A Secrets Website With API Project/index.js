import express from 'express'
import axios from 'axios'

const port = 3000;
const app = express();

app.use(express.static("public"))

app.listen(port, (req, res) => {
    console.log("Server is running in port 3000");
});

app.get("/", (req, res) =>{

    var config = {
        method: 'get',
        url: 'https://secrets-api.appbrewery.com/random',
    }

    axios(config)
    .then((response) => {
        
        console.log(response.data)
        
        res.render("index.ejs", {
            secret: response.data.secret,
            user: response.data.username
        })
    })
    .catch((error) => {
        console.error("Failed to make request", error.message);
    })

    
})