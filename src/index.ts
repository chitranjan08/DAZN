import  express from "express";
import  bodyParser from "body-parser";
import cors from "cors"
import http from "http"
import mongoose from "mongoose"
import movieRoutes from './routes/movieRoutes';
const app = express()

app.use(cors({
   credentials:true
}))

app.use(bodyParser.json())

app.use('/movies', movieRoutes);
// app.post('/login', login(secretKey));

const server = http.createServer(app)

server.listen(8080,()=>{
    console.log("server running on 8080")
})

const mongourl = "mongodb+srv://chitranjan:chitranjan@cluster0.p34d8ev.mongodb.net/"
mongoose.Promise=Promise;
mongoose.connect(mongourl)
mongoose.connection.on('error', (error:Error)=>console.log(error));;
export default app
