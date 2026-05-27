# Digitale Talenter Case Project API
An API to support `User` functionality in the Digitale Talenter case projects.

## Endpoints

### `GET` `/users/:username`
Get the details of the user provided in the `:username` field.

```json
{
    "username": "warren-west",
    "pokemon": [
        55,
        1
    ],
    "watchlist": [
        10,
        13
    ],
    "favJokes": [
        113,
        141
    ],
    "wishlist": [
        14,
        18
    ]
}
```

### `POST` `/users`
Create a new user record. The request body needs `username` and `password` fields. A new user will have the role of `GUEST`.

```json
{
    "message": "User created successfully",
    "user": {
        "id": "6a16c45a7e1737b14ca9ee51",
        "username": "warren-west",
        "role": "GUEST",
        "pokemon": [],
        "watchlist": [],
        "favJokes": [],
        "wishlist": []
    }
}
```

### `POST` `/users/login`
Log in. The request body needs `username` and `password` fields.

```json
{
    "token": "eyJhbGciOi......",
    "_id": "6a16a5aa44445561d167be3f",
    "username": "warren-west",
    "role": "GUEST",
    "favJokes": [
        113,
        141
    ],
    "pokemon": [
        55,
        1
    ],
    "watchlist": [
        10,
        13
    ],
    "wishlist": [
        14,
        18
    ]
}
```

### `POST` `/users/:username/jokes`
#### (Team Funny Bucket)
Add a new joke ID to the given user's favourite jokes. The request requires a `jokeId` field.

```json
{
    "message": "Joke favorited",
    "favJokes": [
        113,
        141
    ]
}
```

### `POST` `/users/:username/pokemon`
#### (Team Pokemon)
Add a new pokemon ID to the given user's caught pokemon. The request requires a `pokemonId` field.

```json
{
    "message": "Pokemon added successfully",
    "pokemon": [
        55,
        1
    ]
}
```

### `POST` `/users/:username/watchlist`
#### (Team Binged)
Add a new TV show ID to the given user's watchlist. The request requires a `showId` field.

```json
{
    "message": "Watchlist updated",
    "watchlist": [
        10,
        13
    ]
}
```

### `POST` `/users/:username/wishlist`
#### (Team eBuy)
Add a new product ID to the given user's product wishlist. The request requires a `productId` field.

```json
{
    "message": "Wishlist updated",
    "wishlist": [
        14,
        18
    ]
}
```

### `PUT` `/users/:username/promote`

Upgrades the given user's role from `"GUEST"` to `"ADMIN"`. This is a protected route, needing a valid token attached to the request. Only a user with the `role` of `"ADMIN"` can access this endpoint.

```json
{
    "message": "User 'warren-west' role set to ADMIN."
}
```