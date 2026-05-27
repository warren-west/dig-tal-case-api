require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const { seedDatabaseIfEmpty } = require('./models/seedDb')

// use middleware routes
app.use(express.json())

// import routes
const userRouter = require('./routes/users')

// connect routes
app.use('/users', userRouter)

// Attempt DB connection
db.mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB Atlas successfully.')

        // Run the seed function before turning on the API server
        await seedDatabaseIfEmpty()

        // Start Express server after successful DB connection
        app.listen(3000, () => {
            console.log(`Server is listening on port 3000...`)
        })
    })
    .catch((error) => {
        console.error('❌ Database connection failed:', error.message)
        process.exit(1) // Crash the app immediately if the DB isn't working
    })