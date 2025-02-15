# 📅 Timetable Management System

## 📌 Description
Timetable Management System is a web-based application that allows administrators to efficiently generate and manage timetables for teachers. It provides a secure authentication system for admins and teachers and an admin panel to manage timetables dynamically.

## 🚀 Features
- 🛡️ **Secure Authentication & Authorization** (Admin & Teacher Roles)
- 📅 **Automatic Timetable Generation**
- 🏫 **Admin Panel** to manage and update timetables
- 🧑‍🏫 **Teacher Dashboard** for viewing assigned schedules
- 📊 **User-Friendly Interface** built with React and Tailwind CSS

## 🛠️ Tech Stack
### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtoken&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📥 Installation and Setup for Backend

Follow these steps to set up and run the project:

### Step 1: Make sure you have Nodejs and VS Code installed in you system
### Step 2: Clone the Repository
```sh
git clone https://github.com/your-username/timetable-management.git
cd timetable-management
```
### Step 3: Goto server folder, open terminal and run the command
```sh
npm install
```
### Step 4: open the folder in VS code

### Step 5: Create .env file in the server directory and copy the contents of .env.sample into .env file

### Step 6: Update the PORT and DB_URL

You can use either **MongoDB Atlas (Cloud)** or **MongoDB Local**. Update the `.env` file accordingly.

#### Option 1: Using MongoDB Atlas (Cloud)
1. **Create an account** on [MongoDB Atlas](https://www.mongodb.com/atlas) (if you don’t have one).
2. **Create a new Cluster** and select a free-tier database.
3. **Get the connection string** from your cluster. It should look like:

4. Replace `<username>` and `<password>` with your credentials.
5. Update your `.env` file in the backend directory:
```env
PORT=5000
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/timetableDB?retryWrites=true&w=majority
```
## 🛠️ Installing MongoDB Community Server (Local Setup)

If you want to run MongoDB locally instead of using MongoDB Atlas, follow these steps to install MongoDB Community Server.

#### Option 2: Using MongoDB Community server
- Visit the official MongoDB website:  
  👉 [MongoDB Download Page](https://www.mongodb.com/try/download/community)
- Select **your OS** (Windows, macOS, or Linux).
- Choose the **MongoDB Community Server** version.
- Download and install MongoDB.

### 📌 Step 2: Start the MongoDB Server
#### Windows:
1. Open **Command Prompt (cmd)** as Administrator.
2. Navigate to the MongoDB installation directory:
   ```sh
   cd C:\Program Files\MongoDB\Server\6.0\bin
   ```

### Step 7: Hit the command
  ```sh
  npm start
  ```

## 📥 Installation and Setup for Frontend
### Step 1: Goto frontend folder, open terminal and run the command
```sh
npm install
```
Step 2: Start development server of ReactJS
```sh
npm run dev
```

Step 3: Open you browser and hit the url
[Time Table Management](http://localhost:5173)
