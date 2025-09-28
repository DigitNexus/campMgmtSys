const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const campaignRoutes = require('./routes/campaign')
const cors = require('cors')
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(()=>{console.log("✅ MongoDB connected successfully")}).catch((err)=>{console.log("❌ Error occurred while connecting to MongoDB\n"+err)})
const app = express()
app.use(cors());
app.use(express.json())
app.use('/api/campaign', campaignRoutes)
app.listen(PORT, ()=>{console.log(`✅ Server listening on port ${PORT}`)})