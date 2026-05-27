require('dotenv').config()
const router = require('express').Router()
const db = require('../models')
const jwt = require('jsonwebtoken')

// GET /users/:username
router.get('/:username', async (req, res) => {
    const { username } = req.params
    try {
        const user = await db.User.findOne({ username }).lean()

        if (!user) return res.status(404).json({ message: "User not found" })

        const responsePayload = {
            username: user.username,
            pokemon: user.pokemon || [],
            watchlist: user.shows || [],
            favJokes: user.jokes || [],
            wishlist: user.products || []
        }

        res.json(responsePayload)

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// POST /users
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body

        // Validation
        if (!username) return res.status(400).json({ error: "Username is required" })
        if (!password) return res.status(400).json({ error: "Password is required" })

        // .exists() is faster than .findOne()
        const userExists = await db.User.exists({ username })
        if (userExists) return res.status(400).json({ error: "Username is already taken" })

        const newUser = await db.User.create({ username, password })

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
                pokemon: newUser.pokemon,
                watchlist: newUser.shows,
                favJokes: newUser.jokes,
                wishlist: newUser.products
            }
        })

    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// POST /users/login
router.post('/login', async (req, res) => {
    const username = req.body.username
    const passwordBody = req.body.password

    // basic validation
    if (!username) return res.status(400).json({ message: "No username provided." })
    if (!passwordBody) return res.status(400).json({ message: "No password provided." })

    try {
        const user = await db.User.findOne({ username }).lean()
        console.log(user)

        // user doesn't exist
        if (!user) return res.status(404).json({ message: `404: ${username} does not exist.` })

        if (user.password !== passwordBody) return res.status(401).json({ message: "Incorrect login credentials." })

        const { password, ...rest } = user

        const token = jwt.sign({ ...rest }, process.env.JWT_SECRET, { expiresIn: '2h' })

        // TODO: Configure return object
        return res.json({ token, ...rest })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

// POST /users/:username/pokemon
router.post('/:username/pokemon', async (req, res) => {
    const { pokemonId } = req.body

    if (!pokemonId) return res.status(400).json({ error: "pokemonId is required" })

    try {
        // $addToSet ensures they can't catch the exact same duplicate item ID twice
        const updatedUser = await db.User.findOneAndUpdate(
            { username: req.params.username },
            { $addToSet: { pokemon: pokemonId } },
            { new: true, select: 'pokemon' }
        )

        if (!updatedUser) return res.status(404).json({ error: "User not found" })

        res.json({ message: "Pokemon added successfully", pokemon: updatedUser.pokemon })
    } catch (error) {
        res.status(500).json({ error: "Database update failed" })
    }
})

// POST /users/:username/watchlist
router.post('/:username/watchlist', async (req, res) => {
    const { showId } = req.body

    if (!showId) return res.status(400).json({ error: "showId is required" })

    try {
        const updatedUser = await db.User.findOneAndUpdate(
            { username: req.params.username },
            { $addToSet: { shows: showId } },
            { new: true, select: 'shows' }
        )

        if (!updatedUser) return res.status(404).json({ error: "User not found" })

        res.json({ message: "Watchlist updated", watchlist: updatedUser.shows })
    } catch (error) {
        res.status(500).json({ error: "Database update failed" })
    }
})

// POST /users/:username/jokes
router.post('/:username/jokes', async (req, res) => {
    const { jokeId } = req.body

    if (!jokeId) return res.status(400).json({ error: "jokeId is required" })

    try {
        const updatedUser = await db.User.findOneAndUpdate(
            { username: req.params.username },
            { $addToSet: { jokes: jokeId } },
            { new: true, select: 'jokes' }
        )

        if (!updatedUser) return res.status(404).json({ error: "User not found" })

        res.json({ message: "Joke favorited", favJokes: updatedUser.jokes })
    } catch (error) {
        res.status(500).json({ error: "Database update failed" })
    }
})

// POST /users/:username/wishlist
router.post('/:username/wishlist', async (req, res) => {
    const { productId } = req.body

    if (!productId) return res.status(400).json({ error: "productId is required" })

    try {
        const updatedUser = await db.User.findOneAndUpdate(
            { username: req.params.username },
            { $addToSet: { products: productId } },
            { new: true, select: 'products' }
        )

        if (!updatedUser) return res.status(404).json({ error: "User not found" })

        res.json({ message: "Wishlist updated", wishlist: updatedUser.products })
    } catch (error) {
        res.status(500).json({ error: "Database update failed" })
    }
})

module.exports = router