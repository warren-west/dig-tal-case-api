const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the Digitale Talenter Case Project API.",
        info: "Documentation available at https://github.com/warren-west/dig-tal-case-api",
        endpoints: [
            {
                method: "GET",
                url: "/users/:username",
                description: "Get the details of the user provided in the `:username` field."
            },
            {
                method: "POST",
                url: "/users",
                description: "Create a new user record. The request body needs `username` and `password` fields. A new user will have the role of `GUEST`."
            },
            {
                method: "POST",
                url: "/users/login",
                description: ""
            },
            {
                method: "POST",
                url: "/users",
                description: "Log in. The request body needs `username` and `password` fields."
            },
            {
                method: "POST",
                url: "/users/:username/jokes",
                description: "Add a new joke ID to the given user's favourite jokes. The request requires a `jokeId` field."
            },
            {
                method: "POST",
                url: "/users/:username/pokemon",
                description: "Add a new pokemon ID to the given user's caught pokemon. The request requires a `pokemonId` field."
            },
            {
                method: "POST",
                url: "/users/:username/watchlist",
                description: "Add a new TV show ID to the given user's watchlist. The request requires a `showId` field."
            },
            {
                method: "POST",
                url: "/users/:username/wishlist",
                description: "Add a new product ID to the given user's product wishlist. The request requires a `productId` field."
            },
            {
                method: "PUT",
                url: "/users/:username/promote",
                description: `Upgrades the given user's role from "GUEST" to "ADMIN". This is a protected route, needing a valid token attached to the request. Only a user with the role of "ADMIN" can access this endpoint.`
            }
        ]
     })
})

module.exports = router