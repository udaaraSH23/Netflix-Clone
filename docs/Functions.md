# Important Functions -Backend - Express

## Config
**db.js** - Connect to MongoDb
- Connect to DB

## Middlewear 
**auth.js** - jwt Authorization
- Authorization / Authentication with Role Management
- Refresh Token
- Jwt Utils
- Session Mangement

**Rate Limiting**
- Rate Limiting for Authentication

## Model
**userModel.js** - Model for user
- User Schema
- wishlist Schema - Watched to be watched and watching

**tvSeriesModel.js** - Model for tvSeries 
- Tv Series Schema

**reviewModel.js** - Model for review
- Review Schema

**movieModel.js** - Model for movie
- Movie Schema




## Controller
### Add Exeptional Handling

**AuthController.js** - Controller Logic for authentication
- Register User
- Log the user

**userController.js** - Controller Logic for user
- Save User detais updated values
- Save wishlist items

**tvSeriesController.js** - Controller Logic for user

- Get tvseries all - one
- Update tv series
- Delete


**reviewController.js** - Controller Logic for user

- Get review of a tv series
- Update or add review of tv series
- Edit reviews


**MovieController.js** - Controller Logic for user
- Get all movies or one
- Update 
- Delete



## Repository

### Helper functions for service 
**userRepository.js** - repository functions of user

**tvSeriesRepository.js** - repository functions of tvSeries

**reviewRepository.js** - repository functions of reviews

**movieRepository.js** - repository functions of movies

## Service
### Helper functions for Controller with Logic
**userService.js** - service functions of user

**tvSeriesService.js** - service functions of tv Series

**reviewService.js** - service functions of reviews

**movieService.js** - service functions of movies

## Exceptions
- need to create Custom

## Utils
- jwt

# Important Functions - Frontend

## Admin Panel

- Add, Edit, Delete Movies /Tv Series / Reviews 
- User Count

## User Functionalities

- View Movie / Tv Series List
- View Movie / Tv Series Detail Add to Wishlist
- View Reviews / Add Review

### User Profile
- View Wishlist
- View User Details


## Test Cases