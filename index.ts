import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { connectMongoDB } from './database/database'
import { setupSwagger } from './doc/swagger'
import routes from './routes'
require('dotenv').config()

const app = express()
connectMongoDB()

// Middleware to parse JSON bodies
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Setup Swagger
setupSwagger(app)

// Define a basic route
routes
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
