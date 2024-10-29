import express from 'express'
import Template from './../template'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
const app = express()

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())


// Cấu hình CORS
const corsOptions = {
    origin: 'http://localhost:4000', // URL của frontend
    credentials: true, // Cho phép cookie
};
app.use(cors(corsOptions));


app.get('/', (req, res) => { res.status(200).send(Template()) })

app.use('/', userRoutes)
app.use('/', authRoutes)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { res.status(401).json({ "error": err.name + ": " + err.message }) }
    else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})





export default app