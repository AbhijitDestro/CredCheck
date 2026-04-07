# CredCheck - Modern Certificate Issuance & Verification System

CredCheck is a comprehensive platform designed to streamline the process of issuing, managing, and verifying digital certificates. It provides a robust solution for educational institutions and organizations to handle credentials efficiently while offering students a secure portal to access and verify their achievements.

## 🚀 Features

### For Issuers (Institutions/Organizations)
- **Bulk & Single Issuance**: Issue certificates individually or in batches via optimized Excel/CSV upload.
- **Performance Optimized**: High-performance bulk database operations and non-blocking background email notifications.
- **Management Dashboard**: Real-time statistics on issued, downloaded, and revoked certificates.
- **Certificate Revocation**: Formally invalidate credentials when necessary.
- **Digital Signatures**: Manage organizational profiles and digital signatures for certificate authenticity.
- **PDF Generation**: Automated generation of professional PDF certificates.

### For Students
- **Digital Certificate Wallet**: A centralized dashboard to view, manage, and download all earned certificates.
- **Instant Verification**: Publicly accessible verification portal to validate credential authenticity using a unique ID.
- **Automated Notifications**: Receive instant email alerts as soon as a certificate is issued.
- **Secure Access**: Secure JWT-based authentication ensuring privacy of educational records.

### General
- **Responsive UI**: Fully optimized for Desktop, Tablet, and Mobile experiences.
- **Production Ready**: Configurable CORS, secure headers, and detailed deployment documentation.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Email Service**: [Nodemailer](https://nodemailer.com/)
- **File Processing**: [xlsx](https://github.com/SheetJS/sheetjs) (Excel) & [pdf-lib](https://pdf-lib.js.org/) (PDF)
- **Security**: [Helmet](https://helmetjs.github.io/) & [CORS](https://github.com/expressjs/cors)

---

## 📁 Project Structure

```text
├── backend/            # Express API, Models, Controllers, and Utils
├── frontend/           # React Application (Vite, Tailwind)
├── DEPLOYMENT.md       # Step-by-step production deployment guide
└── README.md           # Project overview and documentation
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local instance
- SMTP Server (Gmail, SendGrid, Mailtrap, etc.)

### Installation & Setup

For detailed instructions on setting up environment variables and deploying to production (Render/Vercel), please refer to the [**DEPLOYMENT.md**](./DEPLOYMENT.md) file.

1. **Clone the repo**
   ```bash
   git clone <repository-url>
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env and add required variables
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create .env and add VITE_API_URL
   npm run dev
   ```

---

## 📄 License

Distributed under the ISC License.
