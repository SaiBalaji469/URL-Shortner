const express = require("express")
const path = require("path")
const { connectToMondoDB } = require("./connect")
const URL = require("./models/url")

const cookieParser = require("cookie-parser")


const app = express()     
const PORT = 8001;


const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user") 
const { restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")


connectToMondoDB('mongodb://localhost:27017/short-url').then(
    ()=>{console.log("MongoDB connected")}
)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser())



app.use("/",checkAuth, staticRoute)
app.use("/url", restrictToLoggedinUserOnly, urlRoute)
app.use("/user", userRoute)




app.get('/url/:shortId', async (req, res)=>{
 const shortId = req.params.shortId;
 const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },

    }
 )
 res.redirect(entry.redirectURL);
})





app.listen(PORT, ()=>{console.log(`Server Started ${PORT}`)})