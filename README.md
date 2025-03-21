# E-2 Market

##  About the Project
E-2 Market is a **MERN stack** web application designed for users to buy and sell used products efficiently. This platform provides a seamless experience for listing products, managing user accounts, and handling transactions securely.

##  Features
-  **Buy & Sell Used Products**
-  **Image Upload with Cloudinary**
-  **JWT Authentication & Authorization**
-  **Secure File Storage with Multer**
-  **Real-time Updates & Notifications**
- **User Dashboard to Manage Listings**
-  **RESTful API with Express & MongoDB**

##  Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt.js
- **Storage:** Cloudinary, Multer



## Installation & Setup
### Prerequisites:
- Install **Node.js** & **MongoDB** on your system
- Cloudinary account for image storage

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/e-2-market.git
cd e-2-market
```

### **2. Install Dependencies**
#### Backend:
```bash
cd backend
npm install express mongoose bcrypt jsonwebtoken dotenv multer cloudinary cors mongoose-aggregate-paginate-v2 cookie-parser
```



### **3. Configure Environment Variables**
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4. Start the Application**
#### Start Backend Server:
```bash
cd backend
npm run dev
```
#### Start Frontend :
```bash
cd frontend
npm start
```


##  Security & Authentication
- Uses **JWT (JSON Web Token)** for secure authentication.
- Passwords are **hashed using bcrypt.js** before storing in MongoDB.
- Protected API routes ensure **only authenticated users** can perform specific actions.

## Image Upload
- Implemented using **Multer** for handling file uploads.
- Images are stored on **Cloudinary** for scalability and performance.


 
    


