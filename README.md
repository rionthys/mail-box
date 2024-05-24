# Mail-box

To create an improvised mail server using Node.js with TypeScript and a relational database (PostgreSQL, without ORM
models), the server should include the following features:

- Registration
- Authorization
- Adding Emails
- Viewing All Emails
- Deleting Emails
- Editing Emails

Additionally, when a new email is added, implement real-time notifications for users who are online.

## Technologies:

- Node.js
- TypeScript
- Nest.js
- Passport.js
- PostgreSQL
- Sequelize
- Nginx

## Project Installation

### Step 1: Clone the Repository

Clone the project repository to your local machine.

```bash
git clone https://github.com/yourusername/mail-box.git
cd mail-box
```

### Step 2: Install Dependencies

Install the required dependencies using npm.
```
npm install
```

### Step 3: Environment Configuration
Create a .env file in the root directory of your project and add the necessary environment variables.

Example .env file:
```
# Database configuration
DATABASE_DIALECT=postgres
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
DATABASE_HOST=localhost
DATABASE_PORT=5432

# JWT Secret Key
JWT_SECRET_KEY=your_jwt_secret_key
```

### Step 4: Database Setup
Ensure you have a PostgreSQL database running and create a new database for the project.

### Production Mode
To build the project and start it in production mode:
```
npm run build
npm run start:prod
```

## API Documentation

### Authentication

#### Register

Endpoint: POST `/auth/register`

Headers:
```
Content-Type: application/json
```

Request Body:
- username (string): The username of the user (required)
- password (string): The password of the user (required)
- email (string): The email address of the user (required)

Response:
- 200 OK: Returns a message response if the registration is successful.

Example Request:
```
curl -X POST http://yourdomain.com/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "johndoe",
  "password": "password123",
  "email": "johndoe@example.com"
}'
```

Example Response:
```
{
  "success": true,
  "data": {
    "message": "User registered successfully."
  }
}
```

---

#### Login

Endpoint: POST `/auth/login`

Headers:
```
Content-Type: application/json
```

Request Body:
- username (string): The username of the user (required)
- password (string): The password of the user (required)

Response:
- 200 OK: Returns an access token if the login is successful.

Example Request:
```
curl -X POST http://yourdomain.com/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "johndoe",
  "password": "password123"
}'
```

Example Response:
```
{
  "success": true,
  "data": {
    "access_token": "your_access_token_here"
  }
}
```

---
### Mails

#### Get All Emails

Endpoint: GET `/mails/`

Headers:
```
Authorization: Bearer <token>
```

Example Request:
```
curl -X GET "http://yourdomain.com/mails/" \
-H "Authorization: Bearer your_jwt_token"
```

Example Response
```
{
  "success": true,
  "data": [
    [
      {
        "id": 1,
        "read": false,
        "title": "Welcome!",
        "content": "Welcome to our service.",
        "attachment": null,
        "from_email": "no-reply@yourdomain.com",
        "to_email": "user@example.com"
      }
    ]
  }
```

---

#### Send a Email

Endpoint: POST `/mails/send`

Headers:
```
Authorization: Bearer <token>
Content-Type: application/json
```

Request Body:
- title (string): The title of the message (required)
- content (string): The content of the message (required)
- attachment (any): The attachment of the message (optional)
- to_email (string): The recipient's email (required)

Example Request:
```
curl -X POST http://yourdomain.com/mails/send/ \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Meeting Reminder",
  "content": "Don'\''t forget about the meeting tomorrow.",
  "to_email": "recipient@example.com"
}'
```

Example Response:
```
{
  "success": true,
  "data": {
    "message": "successfully created"
  }
}
```

---

#### Edit a Mail

Endpoint: PATCH /mails/:id

Headers:
```
Authorization: Bearer <token>
Content-Type: application/json
```

Parameters:
- id (string): The ID of the mail to edit (required)

Request Body:
- title (string): The title of the message (optional)
- content (string): The content of the message (optional)
- attachment (any): The attachment of the message (optional)

Example Request:
```
curl -X PATCH http://yourdomain.com/mails/1 \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated Title",
  "content": "Updated content."
}'
```

Example Response: 
```
{
  "success": true,
  "data": {
    "message": "successfully updated"
  }
}
```

---

#### Delete a Mail

Endpoint: DELETE /mails/:id

Headers:
```
Authorization: Bearer <token>
Content-Type: application/json
```

Parameters:
- id (string): The ID of the mail to edit (required)

Example Request:
```
curl -X DELETE http://yourdomain.com/1 \
-H "Authorization: Bearer <token>"
```

Example Response: 
```
{
  "success": true,
  "data": {
    "message": "successfully deleted"
  }
}
```
