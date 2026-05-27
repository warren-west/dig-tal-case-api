const db = require('../models')

// Mock data to seed when the collection is empty
const seedUsers = [
    {
        username: "tommy",
        password: "1234",
        role: "GUEST",
        jokes: [],
        pokemon: [],
        products: [],
        shows: []
    },
    {
        username: "liza",
        password: "admin",
        role: "ADMIN",
        jokes: [],
        pokemon: [],
        products: [],
        shows: []
    },
    {
        username: "oleksandr",
        password: "1234",
        role: "GUEST",
        jokes: [],
        pokemon: [],
        products: [],
        shows: []
    },
    {
        username: "petter",
        password: "admin",
        role: "ADMIN",
        jokes: [],
        pokemon: [],
        products: [],
        shows: []
    },
    {
        username: "sarika",
        password: "1234",
        role: "GUEST",
        jokes: [],
        pokemon: [],
        products: [],
        shows: []
    },
    {
        username: "geir",
        password: "admin",
        role: "ADMIN",
        jokes: [],
        pokemon: [],
        products: [],
        shows: []
    },
]

// Helper function to seed the data safely
async function seedDatabaseIfEmpty() {
    try {
        // Count documents using estimatedDocumentCount
        const count = await db.User.estimatedDocumentCount()

        if (count === 0) {
            console.log('🌱 Database is empty! Seeding test users...')
            await db.User.insertMany(seedUsers)
            console.log('✅ Seeded database successfully.')
        } else {
            console.log(`ℹ️ Database already has ${count} users. Skipping seeding.`)
        }
    } catch (error) {
        console.error('❌ Error seeding database:', error)
    }
}

module.exports = {
    seedDatabaseIfEmpty,
}