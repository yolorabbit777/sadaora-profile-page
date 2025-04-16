# Sadaora

Sadaora is a web application designed for managing user profiles and connecting with others. This project consists of a client-side application built with React and a server-side application built with Node.js and Express.

## Table of Contents

-   [Setup Instructions](#setup-instructions)
-   [Architectural Decisions](#architectural-decisions)
-   [Assumptions Made](#assumptions-made)
-   [Live App](#live-app)
-   [Contributing](#contributing)
-   [License](#license)

## Setup Instructions

### Client

The client-side application is built using React and provides a user-friendly interface for users to manage their profiles.

### Features

-   User authentication (login and registration)
-   Profile management (create, edit, and view profiles)
-   Image upload to Cloudinary
-   Responsive design

1. Navigate to the client directory:

    ```bash
    cd client
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `client` directory and add the following environment variables:

    ```plaintext
    REACT_APP_CLOUDINARY_UPLOAD_PRESET=sadaora
    REACT_APP_CLOUDINARY_CLOUD_NAME=dlxzrs2kv
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

### Server

The server-side application is built using Node.js and Express. It handles API requests and manages user data.

### Features

-   RESTful API for user authentication and profile management
-   JWT-based authentication
-   Database integration with Sequelize and PostgreSQL
-   Image upload handling with Cloudinary

1. Navigate to the server directory:

    ```bash
    cd server
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following environment variables:

    ```plaintext
    PORT=5000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_NAME=sadaora
    JWT_SECRET=sadaora_secret
    JWT_EXPIRES_IN=7d
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

5. The server will run on `http://localhost:5050`.

## Architectural Decisions

The Sadaora application is designed using a client-server architecture, where the client-side is built with React to provide a dynamic and responsive user interface. The server-side is built with Node.js and Express, serving as a RESTful API that handles authentication, user data management, and image uploads. The application uses JWT for secure authentication, ensuring that user sessions are managed effectively. The choice of PostgreSQL as the database allows for robust data management and scalability.

The application also integrates with Cloudinary for image uploads, providing a seamless experience for users to manage their profile pictures. This decision was made to offload the storage and processing of images, allowing the application to focus on core functionalities.

## Assumptions Made

-   Users have a basic understanding of how to run Node.js applications and manage environment variables.
-   The application is intended for development and testing purposes, and the database is set up locally using PostgreSQL.
-   The application assumes that the user will have access to the internet for Cloudinary image uploads.

## Live App

https://sadaora-profile-page.vercel.app/
