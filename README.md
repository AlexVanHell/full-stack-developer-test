This is a small microservices proyect of Parking control and management App

# Table of contents

-[Project Setup]

# Project Setup

This project will execute some docker containers

Copy `.env.example` into new file `.env`

```sh
$ cp ./.env.example ./.env
```

## Setup Database

You just need to change the values of your `.env` file for MONGO environment variables

Then change the values you want for your mongo credentials

# Up services

Using docker compose

```sh
$ docker-compose up -d
```

# Project composition

## Parking Admin App

This project handles the basic crud operations for:

    - Users
    - Vehicles

### Technologies

    - Nest JS
    - Node JS

## Parking Admin App

This project handles the basic crud operations for:

    - Users
    - Vehicles

### Technologies

    - Nest JS
    - Node JS

## Parking Events App

This pro

- Check-in and Check-out registry
