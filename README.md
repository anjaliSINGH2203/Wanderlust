# 🌍 Wanderlust – Travel & Property Listing Backend Framework

Wanderlust is a **full-featured backend framework** built for creating dynamic **travel, accommodation, and property listing platforms**.  
It focuses on **modularity, scalability, security, and clean architecture**, making it ideal for developers building modern and robust travel applications.

---

## ✨ Overview

Wanderlust streamlines backend development by providing pre-built modules, integrations, and utilities tailored for travel-based applications.

### Why Wanderlust?

This project simplifies the development of travel applications by providing:

- 🧩 **Modular Architecture:** Organized controllers, models, routes, and views for maintainability.
- 🌥️ **Cloudinary Integration:** Seamless image uploads and scalable media management.
- 🔐 **Authentication & Middleware:** Secure user login, authorization, and data validation.
- 🐞 **Error Handling Utilities:** Robust error classes and async error management.
- 🎯 **Seed Data & Testing:** Ready-to-use seed scripts for consistent development environments.
- 🗺️ **Location & Map Support:** Visualize listings with integrated mapping features.

---

# 🚀 Getting Started

## 🔧 Prerequisites

To run this project, you must have:

- **Programming Language:** JavaScript (Node.js)
- **Package Manager:** npm or yarn
- **MongoDB** (local or Atlas)
- **Cloudinary account** (for image storage)
- **Map API key** *(optional)*

---

# 📦 Installation

Follow these steps to set up the project:

### 1. Clone the repository

```bash
git clone https://github.com/anjali15MUG2023/Wanderlust
2. Navigate to the project directory
cd Wanderlust
3. Install the dependencies
npm install
⚙️ Configuration
Before running the project, create a .env file in the root directory.

Example .env file
PORT=8080
MONGO_URI=<your-mongodb-uri>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
JWT_SECRET=<your-jwt-secret>
MAPBOX_TOKEN=<optional-mapbox-token>
▶️ Usage
Run the project using:

npm start
The server will run on:

http://localhost:8080
🧪 Testing
To run the test suite:

npm test
📁 Project Structure
Wanderlust/
│
├── controllers/        # Core business logic
├── models/             # Mongoose database models
├── routes/             # Express routing system
├── middleware/         # Auth, validation, error handling
├── utils/              # Cloudinary, Mapbox, helper functions
├── seed/               # Database seeding scripts
├── views/              # EJS templates (if enabled)
├── public/             # Static assets
│
├── app.js              # Main application file
├── package.json
└── README.md
🔒 Authentication Features
Wanderlust provides secure authentication features such as:

User Registration

Secure Login with JWT

Role-Based Route Protection

Request Validation Middleware

Logout & Token Handling

☁️ Cloudinary Integration
Cloudinary is used for:

Uploading listing images

Managing media storage

Providing fast CDN delivery

Resizing & optimizing images

Uses:
multer-storage-cloudinary

🗺️ Location & Mapping
(Optional feature)

Supports services such as:

Mapbox Geocoding

Coordinates extraction

Location-based search

Map embeds

🌱 Seeding the Database
To insert sample listings and users into the database:

node seed/seed.js
🔥 API Endpoints (Example)
Below is a sample of key API routes:

📍 Listings
Method	Endpoint	Description
GET	/listings	Get all listings
POST	/listings	Create a new listing
GET	/listings/:id	Get listing by ID
PUT	/listings/:id	Update a listing
DELETE	/listings/:id	Remove a listing
👤 Authentication
Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Login user
POST	/logout	Logout user
🧰 Tech Stack
Node.js

Express.js

MongoDB + Mongoose

Cloudinary

JWT Authentication

Multer

Mapbox (optional)

EJS templating (optional)

🛠️ Future Enhancements
Possible future upgrades:

Advanced search & filtering

Booking/reservation system

Rating & review system

Admin dashboard

Real-time notifications

Recommendation engine

🤝 Contributing
Contributions are welcome!

Fork the repository

Create a new branch

Commit changes

Open a pull request

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgements
Cloudinary

Mapbox

Express.js

MongoDB

