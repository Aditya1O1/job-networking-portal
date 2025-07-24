text
# AI-Powered Job & Networking Portal

A modern, full-stack platform connecting job seekers and recruiters, featuring user authentication, AI-powered skill extraction, blockchain wallet payments (MetaMask), and a smart, filterable job feed. Built with Node.js, Express, MongoDB, and pure HTML/CSS/JavaScript frontend enhanced with Tailwind CSS for a beautiful, responsive UI.

---

## 🚀 Live Demo

- **Frontend (User Portal):**  
  [Your Frontend URL Here] (e.g. Vercel or Netlify)

- **Backend API:**  
  [Your Backend URL Here] (e.g. Render, Railway, Heroku)

*Update these URLs after deployment.*

---

## 📁 Folder Structure

job-networking-portal/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── frontend/
├── index.html
├── login.html
├── register.html
├── profile.html
├── job-form.html
├── script.js
├── login.js
├── profile.js
├── job-form.js
└── style.css (optional; mostly Tailwind)

text

---

## ✨ Features

- User registration and login with JWT-based authentication
- Profile management with AI-powered skill extraction from bio
- Job posting with wallet connection and on-chain fee payment (MetaMask, Sepolia testnet)
- Live job feed with skill-based filtering
- Responsive and elegant UI built with Tailwind CSS
- Secure backend with Node.js, Express.js, MongoDB Atlas, and Mongoose
- Protected endpoints via authentication middleware
- Wallet integration via `ethers.js`

---

## 🛠️ Installation & Local Setup

### Prerequisites:

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)
- [MetaMask Wallet Browser Extension](https://metamask.io/)

### Steps:

1. **Clone Repository**

git clone https://github.com/Aditya1O1/job-networking-portal.git
cd job-networking-portal

text

2. **Backend Setup**

cd backend
npm install

text

3. **Create `.env` file inside `backend` folder (do NOT commit this file!)**

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key

text

4. **Run Backend Server**

npm start

text

5. **Frontend Setup**

- Static files; no build needed.
- Serve via VS Code Live Server, or open `frontend/index.html` in a modern browser.
- **Note:** To enable MetaMask wallet payment features, serve over HTTP(S), not local `file://`.

---

## 🧑‍💻 How To Use

### 1. Register and Login

- Access `/register.html` to create a new account.
- Login via `/login.html`.
- JWT token and user info are stored in browser `localStorage` for authenticated requests.

### 2. Edit Profile (`/profile.html`)

- Add name, bio, LinkedIn URL, skills, and your public wallet address.
- Use the "🧠 Suggest Skills from Bio" button to automatically extract tech skills.
- Save updates to the backend securely.

### 3. Post a Job (`/job-form.html`)

- Connect your MetaMask wallet to pay the platform fee (0.001 SepoliaETH).
- After payment confirmation, fill the job details (title, description, skills, budget).
- Submit the job; it's saved linked to your user account.

### 4. Browse Jobs (`/index.html`)

- View all posted jobs on a clean job feed.
- Filter jobs by skill to find relevant postings quickly.

---

## ⚡ API Endpoints

| Endpoint          | Method | Description                             | Authentication Required |
|-------------------|--------|---------------------------------------|------------------------|
| `/api/register`   | POST   | Register a new user                    | No                     |
| `/api/login`      | POST   | Authenticate user and get JWT token   | No                     |
| `/api/profile`    | GET    | Get current user profile               | Yes                    |
| `/api/profile`    | POST   | Update profile fields                  | Yes                    |
| `/api/jobs`       | POST   | Create a new job listing               | Yes                    |
| `/api/jobs`       | GET    | List all jobs, with optional skill filter | No                  |
| `/api/jobs/me`    | GET    | Get jobs posted by the logged-in user | Yes                    |

Include JWT token in HTTP Authorization header as:  
`Authorization: Bearer <token>`

---

## 💡 Tech Stack

- **Frontend:** HTML, JavaScript, Tailwind CSS (CDN)
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Auth:** JWT & bcryptjs for secure authentication
- **Blockchain:** MetaMask wallet, `ethers.js` library
- **Deployment:** Frontend on Vercel/Netlify; Backend on Render/Railway/Heroku

---

## 🤖 AI/ML Feature

- Skill extraction logic runs on the frontend in `profile.js`.
- User’s bio text is scanned for keywords from a predefined list.
- Suggested skills are automatically added to improve discoverability.

---

## 💸 Payments & Wallets

- Users pay a platform fee in ETH on Sepolia testnet before posting a job.
- Payment flows use MetaMask wallet and `ethers.js`.
- The admin wallet address is configurable in `frontend/job-form.js`.

---

## 🛡️ Security Notes

- Never hardcode secrets — use `.env` files and environment variables.
- Use HTTPS in production for secure data transmission.
- JWT token expiry and refresh logic can be enhanced for production apps.

---

## 📄 License

This project is under the **MIT License**.

---

## 📝 Credits

Developed and maintained by **Aditya1O1**

---

## 🙏 Contributions & Issues

- Pull requests and issues are welcome.
- Please fork and add features or report bugs!

---

## 📢 Disclaimer

This project is for educational/demo purposes on testnets only.  
Do not use with real funds or production sensitive information.

---

**Happy coding, applying, and building! 🚀**

---
