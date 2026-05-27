require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../models')

// Middleware to check if user is an Admin
const isAdminToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).json({ message: "No token attached to request header." })

        const token = authHeader.split(' ')[1]
        const parsedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (parsedToken.role !== 'ADMIN') {
            return res.status(403).json({ error: "Access denied. Admins only." })
        }

        next() // User is an admin, proceed
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // expired token error
            return res.status(403).json({ error: "Expired token. Login to refresh your token." })
        }
        if (error instanceof jwt.JsonWebTokenError) {
            // invalid token error
            return res.status(403).json({ error: "Invalid token." })
        }

        res.status(500).json({ error: "Server authentication error" })
    }
}

module.exports = {
    isAdminToken,
}