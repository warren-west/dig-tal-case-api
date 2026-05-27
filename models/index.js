const mongoose = require('mongoose')

// Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Adding the Role field with Enum validation
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'GUEST'],
        default: 'GUEST',
        uppercase: true
    },

    // Storing just the raw IDs
    jokes: [Number],
    pokemon: [Number],
    products: [Number],
    shows: [Number]
}, {
    timestamps: false
})

const db = {}
db.mongoose = mongoose
db.User = mongoose.model('User', userSchema)

module.exports = db