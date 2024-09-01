import {dirname} from "path";
import express from "express"
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended:true}));



app.listen(3000, () =>{
    console.log("Port 3000 is currently listening")
})
 
app.get("/",(req, res) =>{
    res.sendFile( _dirname + "/public/index.html");
});

app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if(email ==="jeromeabelida19@gmail.com" && password === "12345678"){
        res.sendFile(_dirname + "/public/secret.html");
        console.log(email , password);
    }
    else{
        res.sendFile( _dirname + "/public/index.html");
    }
})

