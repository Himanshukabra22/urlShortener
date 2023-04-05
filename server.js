const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const crypto = require("crypto")
const app = express();
require("dotenv").config();

const shortenModel = require('./models/shorten.model')

// const authRoutes = require("./routes/userauth");
// const adminRoutes = require("./routes/adminauth");
// const eventrequestRoutes = require("./routes/eventRequest");
// const fetcheventrequestRoutes = require("./routes/fetcheventrequest");
// const permitevent = require("./routes/permitevent");
// const putUrlRoutes = require("./routes/putUrl");

// const userDataRoutes = require("./routes/user.data");
// const tradeRoutes = require("./routes/trade");
// const predictionRoutes = require("./routes/prediction");

const dbconnect = require("./db/dbconnect.js");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.static(__dirname + '/static'));
  
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  app.post('/',async (req, res) => {
    try {
        let value = crypto.randomBytes(10).toString('hex');
        let data = {
            client: req.body.url,
            shorten: value
        }
      const event = await shortenModel.create(data);
      if (!event) {
        return res.status(400).send({ status: "not ok", msg: "event request not created" });
      }
      return res.status(200).send({ status: "ok", msg: "event request created", url: value });
    } catch (error) {
      console.log(error);
    }
  })

  app.get('/shorten/:id',async(req,res)=>{
    try {
        let data = await shortenModel.findOne({shorten:req.params.id});
        if(data)
        {
            res.redirect(data.client);
        }
        else res.send({message: "not ok"})
    } catch (error) {
        console.log(error);
    }
  })
// app.use(authRoutes);
// app.use(adminRoutes);
// app.use(eventrequestRoutes);
// app.use(fetcheventrequestRoutes);
// app.use(putUrlRoutes);
// app.use(permitevent);

// app.use("/api/v1", userDataRoutes);
// app.use("/api/v1", tradeRoutes);
// app.use("/api/v1", predictionRoutes);

// let ans="";

// app.post("/register",Register)

const serverStart = async () => {
  try {
    await dbconnect(process.env.MONGO_URI);
    console.log("Connected to the DB");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
serverStart();
