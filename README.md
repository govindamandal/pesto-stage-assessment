# OTT Platform - My List Feature

## Overview
This project enhances an OTT platform by adding a "My List" feature, which allows users to save their favourite movies and TV shows to a personalized list. The backend services manage this feature, including adding, removing, and listing saved items.

## Instructions

### Setting Up
1. Clone the repository:
   ```bash
   git clone https://github.com/govindamandal/pesto-stage-assessment.git
   cd pesto-stage-assessment
   ```
2. Install dependencies:
    ```bash
        npm install
    ```

3. Set up MongoDB:
    Ensure MongoDB is running on your local machine or provide a MongoDB URI in an environment variable.

4. Start the application:
    ```bash
        npm start
    ```
    OR in the development mode
    ```bash
        npm run dev
    ```
### Running Tests

To run integration tests:

    ```bash
        npm run test
    ```
## API Endpoints

### Add a user
URL: /user
Method: POST
Request Body:

```json
{
    "username": "testuser",
    "preferences": {
        "favoriteGenres": ["Comedy"],
        "dislikedGenres": ["Drama"]
    }
}
```

Response:
201 OK: { message: "User was added successfully", data: user_data }.
401 Bad Request: { message: "Error: username is already taken" }

### Add a movie
URL: /movie
Method: POST
Request Body:

```json
{
    "title": "Inception",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    "genres": ["Action", "SciFi"],
    "releaseDate": "2010-07-16T00:00:00Z",
    "director": "Christopher Nolan",
    "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
}
```

Response:
201 OK: { message: 'Movie was added successfully', data: result }


### Add a movie
URL: /tvshow
Method: POST
Request Body:

```json
{
    "title": "Breaking Bad",
    "description": "A high school chemistry teacher turned methamphetamine producer.",
    "episodes": [
        {
            "episodeNumber": 1,
            "seasonNumber": 1,
            "releaseDate": "2008-01-20T00:00:00Z",
            "director": "Vince Gilligan",
            "actors": ["Bryan Cranston", "Aaron Paul"]
        }
    ]
}
```

Response:
201 OK: { message: 'TVShow was added successfully', data: result }


### Add to My List
URL: /mylist
Method: POST
Request Body:
```json
{
  "userId": "6661299ce36a4ea3bd7dfb2c",
  "contentId": "6661299ce36a4ea3bd7dfb2f",
  "contentType": "movie" | "tvshow"
}
```
Response:
200 OK: Item added to list.
400 Bad Request: Invalid content ID.
404 Not Found: User not found

