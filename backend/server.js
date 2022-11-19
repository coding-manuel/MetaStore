const express = require('express')
const cors = require('cors')
const { getBucket } = require('./s3.js')
const dotenv = require("dotenv").config()
const app = express()

app.use(cors())

app.get("/uploadurl", getBucket)

app.listen(8080, () => console.log("listening on port 8080"))