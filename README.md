This is a small microservices proyect of Parking control and management App

# Table of contents

- [Table of contents](#table-of-contents)
- [Project setup](#project-setup)
- [Start project](#start-project)
- [Project composition](#project-composition)
  - [NGINX](#nginx)
  - [Parking Auth App](#parking-auth-app)
    - [Technologies](#technologies)
  - [Parking Admin App](#parking-admin-app)
    - [Technologies](#technologies-1)
  - [Parking Events App](#parking-events-app)
    - [Technologies](#technologies-2)
- [Other features](#other-features)

# Project setup

This project will execute some docker containers

Copy `.env.example` into new file `.env`

```bash
$ cp ./.env.example ./.env
```

The `.env` file contain commentaries for each variable

## Database setup

You just need to change the values of your `.env` file for MONGO environment variables

Then change the values you want for your mongo credentials

NOTE: Please be carefull seting up your values in your env

# Start project

The project is configured via `docker-compose` file, so you will need to have installed docker & docker-compose commands.

Then execute the following command below

```sh
$ docker-compose up -d
```

# Project composition

## NGINX

Nginx works as API Gateway in this case

- http://localhost:8000/admin -> http://localhost:3000/api
- http://localhost:8000/events -> -> http://localhost:3001/api

## Parking Auth App

This project works as a layer for users authentication via access tokens with `json web tokens`

### Technologies

    - Nest JS
    - Node JS
    - Yarn
    - Passport JS

## Parking Admin App

This project handles the basic crud operations for:

    - CRUD Users
    - CRUD Vehicles

### Technologies

    - Nest JS
    - Node JS
    - Yarn
    - Nest Mongoose / Mongoose

## Parking Events App

This project handles with the following responsibilities:

    - Check-in and Check-out registry
    - Calculate payments for residents and guests
    - Generate payment receipts
    - Restart month registry

### Technologies

    - Laravel
    - PHP
    - Laravel MongoDB

# Other features

Admin and Auth apps are configured to use swagger, so you are able to see swagger documentation on

- http://localhost:3000/api-docs (Admin App)
- http://localhost:3001/api-docs (Auth App)

NOTE: This will only work if you don't modify anything on the project setup
