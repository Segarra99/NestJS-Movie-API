# Movie API

## Table of Contents
1. [Introduction](#introduction)
2. [Setup](#setup)
    - [Clone the Repository](#1-clone-the-repository)
    - [Install Dependencies](#2-install-dependencies)
    - [Database Configuration](#3-database-configuration)
    - [Run Migrations](#4-run-migrations)
    - [Start the Application](#5-start-the-application)
3. [Functionalities](#functionalities)
4. [API Endpoints](#api-endpoints)
5. [API Documentation](#api-documentation)

## Introduction
This is a simple Movie API built with NestJS and PostgreSQL. It provides endpoints to manage movies and genres.

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Segarra99/NestJS-Movie-API.git
cd NestJS-Movie-API
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Configuration
Create a PostgreSQL database.
Update database connection settings in app.module.ts.

### 4. Run Migrations
```bash
npm run migration:run
```

### 5. Start the Application
```bash
npm run start
```

### 6. The application should now be running on http://localhost:3000.


### Implemented Functionalities

### Create Movie:

Endpoint: POST /api/movies\
Create a new movie with the provided details.

### Update Movie:

Endpoint: PATCH /api/movies/:id\
Update the details of an existing movie by ID.

### Delete Movie:

Endpoint: DELETE /api/movies/:id\
Delete a movie by ID.

### Get All Movies:

Endpoint: GET /api/movies\
Retrieve a list of all movies.

### Get Movie by ID:

Endpoint: GET /api/movies/:id\
Retrieve details of a specific movie by ID.

### Search Movies:

Endpoint: GET /api/movies/search\
Search for movies based on title and/or genre.

### Create Genre:

Endpoint: POST /api/movies/genres\
Create a new genre.

### Delete Genre:

Endpoint: DELETE /api/movies/genres/:id\
Delete a genre by ID.

### Get All Genres:

Endpoint: GET /api/movies/genres\
Retrieve a list of all genres.

### API Endpoints
Movies:

POST /api/movies\
PATCH /api/movies/:id\
DELETE /api/movies/:id\
GET /api/movies\
GET /api/movies/:id\
GET /api/movies/search

Genres:

POST /api/movies/genres\
DELETE /api/movies/genres/:id\
GET /api/movies/genres\
API Documentation

### API Documentation
Explore the API using Swagger UI:

http://localhost:3000/api
