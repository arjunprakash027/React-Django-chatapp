
# ChatApp Documentation

ChatApp is a chat application built using Django and React, with Docker for easy deployment using Docker Compose.

## Backend

The backend of the application is developed using Django and Django Rest Framework (DRF) to provide a robust API.

### Technologies Used

- Django: A high-level Python web framework for building the backend.
- Django Rest Framework (DRF): A powerful and flexible toolkit for building Web APIs.
- Tokenization: Token-based authentication is implemented to secure the APIs, ensuring unauthorized access is prevented.

### APIs

1. **User Registration API**
   - Endpoint: `/api/auth/register/`
   - Method: POST
   - Description: Allows users to register by providing their details. The backend stores the user information securely.

2. **Token Generation API**
   - Endpoint: `/api/auth/login/`
   - Method: POST
   - Description: Generates an access token for registered users. The token is used for subsequent API requests.

3. **Messages API**
   - Endpoint: `/api/chat/message/`
   - Methods: GET, POST
   - Description: Allows retrieval and posting of chat messages. The API is protected using token-based authentication.

4. **Rooms API**
   - Endpoint: `/api/chat/room/`
   - Methods: GET, POST
   - Description: Enables fetching and creation of chat rooms. The API is protected using token-based authentication.

### Key Learnings (Backend)

1. User authentication and authorization management.
2. Token-based authentication to validate incoming requests.
3. API management and development using Django Rest Framework.
4. Cross-Origin Resource Sharing (CORS) and other security concepts.
5. Leveraging Django Rest Framework for efficient API development.

## Frontend

The frontend of the application is developed using React, providing a seamless and interactive user interface.

### Technologies Used

- React: A JavaScript library for building user interfaces.
- Google Sign-In: Integration with Google Sign-In API to provide a secure login functionality.
- Token-based Authentication: The frontend sends tokens to the backend API for authentication and authorization.

### Features

1. **Google Sign-In**
   - Users can log in using their Google accounts. The frontend sends the user details to the backend, where tokens are generated and stored in session storage for future usage.

2. **Real-time Communication**
   - The frontend connects to the backend APIs to fetch room information and chat messages, using the tokens for authentication.

3. **Polling Mechanism**
   - The frontend implements a polling mechanism to regularly check the backend for new messages, ensuring users receive real-time updates.

### Key Learnings (Frontend)

1. Establishing connections with the backend using APIs.
2. Seamless integration of Google Sign-In for secure user authentication.
3. Implementation of polling mechanism to ensure real-time updates.
4. Token retrieval and authorization with the backend APIs.
5. Understanding React core concepts such as components and hooks.

## Deployment

The deployment process for ChatApp is simplified using Docker and Docker Compose.

### Technologies Used

- Docker: A containerization platform that provides an isolated environment for the application.
- Docker Compose: A tool for defining and running multi-container Docker applications.

### Instructions

1. Clone the GitHub repository: [https://github.com/arjunprakash027/React-Django-chatapp](https://github.com/arjunprakash027/React-Django-chatapp)

2. Ensure that Docker and Docker Compose are installed on your machine.

3. In the project root directory, run the following command to build and start the application:

   ```shell
   docker-compose up
   ```

   This

 will start both the frontend and backend services, making the application accessible.

## Conclusion

ChatApp is a feature-rich chat application built using Django, React, and Docker. It provides a seamless user experience with secure user authentication and real-time communication capabilities. The project allowed me to gain valuable insights into backend development, frontend integration, and DevOps practices using Docker and Docker Compose.

---
