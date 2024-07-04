const express = require('express')

const cors = require('cors');



const app = express()

const port = 4000

app.use(cors())

const db = require('./db/mongoDb')

app.use(express.json())

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))


db()

const weatherRouter = require('./Routes/weatherRouter')



app.use('/',weatherRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))