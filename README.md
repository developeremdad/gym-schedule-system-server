# **Gym Class Scheduling and Membership Management System - Backend**

## **Project Overview**

The backend system for the **Gym Class Scheduling and Membership Management System** provides APIs for managing gym operations such as class scheduling, trainer and trainee management, bookings, and user authentication. It handles role-based access, ensuring that each user (Admin, Trainer, or Trainee) has the appropriate permissions. The system uses MongoDB for data storage and JWT for secure authentication.

---

## **Technology Stack**

- **Backend Framework**: Express.js (Node.js)
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Other Tools**: Bcrypt, Dotenv, Zod

---

## **API Endpoints**

### **Authentication**

1. **Login**

   - **POST** `/auth/login`
   - **Body**:
     ```json
     {
       "email": "mdemdadullahahammed@gmail.com",
       "password": "12345"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "User is logged in successfully!",
       "data": {
         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA3NWY4YzU0OTM1MDcyZWEyMDIyMDEiLCJmdWxsTmFtZSI6ImFkbWluIiwiZW1haWwiOiJtZGVtZGFkdWxsYWhhaGFtbWVkQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODY3NTMyNCwiZXhwIjoxNzI4NzYxNzI0fQ.dN1DoOMzCm-rieqoz4UNUREWShfAvtCAJSxgVlfMutM"
       }
     }
     ```

---

### **Trainer Management**

1. **Create Trainer**

   - **POST** `/trainers/create`
   - **Body**:
     ```json
     {
       "fullName": "trainer 4",
       "email": "trainer4@gmail.com",
       "password": "12345"
     }
     ```

2. **Get All Trainers**

   - **GET** `/trainers?role=trainer`

3. **Get Trainer's Class Schedules**

   - **GET** `/trainers/my-class-schedule`

4. **Delete Trainer by Trainer ID**

   - **DELETE** `/trainers/6707787bf06e315366588b95`

---

### **Trainee Management**

1. **Create New Trainee**

   - **POST** `/trainees/create`
   - **Body**:
     ```json
     {
       "fullName": "trainee 4",
       "email": "trainee4@gmail.com",
       "password": "12345"
     }
     ```

---

### **Class Schedule Management**

1. **Create New Class Schedule**

   - **POST** `/classSchedules/create`
   - **Body**:
     ```json
     {
       "scheduleDate": "2024-10-10",
       "startTime": "15:00",
       "endTime": "17:00"
     }
     ```

2. **Get All Class Schedules**

   - **GET** `/classSchedules`

3. **Assign Trainer to Class Schedule**

   - **PATCH** `/classSchedules/assign-trainer/6707e8a7d677cc476485df65`
   - **Body**:
     ```json
     {
       "trainerId": "67076fb8c9c457df26ce4597"
     }
     ```

4. **Delete Class Schedule by Schedule ID**

   - **DELETE** `/classSchedules/6707e8d8d677cc476485df6a`

---

### **Booking Management**

1. **Create Booking by Schedule ID**

   - **POST** `/bookings/create/6707e8a7d677cc476485df65`

2. **Get My Bookings**

   - **GET** `/bookings/my-bookings`

3. **Cancel My Booking**

   - **DELETE** `/bookings/670809959f7b2a452df37e86`

---

## **Instructions to Run Locally**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/developeremdad/gym-schedule-system-server
   ```
2. **Install dependencies:**

   ```bash
   cd gym-schedule-system-server
   npm install
   ```

3. **Set up environment variables:** Create a .env file and add the necessary environment variables (MongoDB connection, JWT secret, etc.).
   ```bash
   npm run dev
   ```
4. **Access the API:** The API will be accessible at http://localhost:5000.

# Admin Credentials

- Email: mdemdadullahahammed@gmail.com
- Password: 12345

# Live Hosting Link

- Server: https://gym-system-server.vercel.app
- Site Live: https://devemdad-gym-schedule.vercel.app

### Happy Codding 💻
