# taskmate-server

This repository serves as the backend codebase for the `TaskMate` project.

Visit TaskMate client repository [here](https://github.com/vishalkrsharma/taskmate-client)

## Table of Contents

- [taskmate-server](#taskmate-server)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage:](#usage)

## Features

- This repository is dedicated to the backend codebase of the "TaskMate" project.
- JWT (JSON Web Token) is employed for authenticating users.
  -The provided APIs facilitate the creation of new users, and user data is stored in a MongoDB database.
- User authentication and login functionalities, utilizing JWT, are integrated into the system.
- The repository also includes APIs for creating, deleting, and editing tasks, with data being pushed to a MongoDB database within the "TaskMate" project.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js installed
- npm or yarn or pnpm installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git [folder-name]
   ```

2. Navigate to the project directory:

   ```bash
   cd [folder-name]
   ```

3. Install dependencies:

   ```bash
   npm install
   or
   yarn install
   or
   pnpm install
   ```

4. Configuration:

   Create a new file named `.env` in the root of your project. You can use the provided `.env.example` file as a template. This file should contain sensitive information, such as API keys, database credentials, or any configuration specific to your environment.

   ```plaintext
   MONGO_URI=
   JWT_SECRET=
   ```

### Usage:

Start the project locally using the following command:

```bash
npm dev
or
yarn dev
or
pnpm dev
```

Visit http://localhost:3000 in your browser.
