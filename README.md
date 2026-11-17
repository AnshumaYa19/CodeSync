# Code-Sync 🚀
### A Real-Time Collaborative Code Editor

Code-Sync is a web-based collaborative coding platform that allows multiple users to work together in a shared coding environment. It provides real-time code synchronization, room-based collaboration, code execution, AI-powered coding assistance, and an interactive workspace.

The platform aims to make collaborative programming easier by bringing coding, communication, and collaboration tools together in one place.

---

## ✨ Features

### 1. Real-Time Code Collaboration
- Create and join coding rooms.
- Collaborate with multiple users in the same workspace.
- Synchronize code changes in real time.
- View other users' cursor positions and typing activity.
- Track users joining and leaving a room.

### 2. Code Editor
- Interactive code editor powered by CodeMirror.
- Syntax highlighting for supported programming languages.
- File and folder management.
- Create, rename, update, and delete files and directories.
- Manage multiple open files within the workspace.

### 3. Code Execution
- Execute code directly from the editor.
- Supports multiple programming languages through the Piston-compatible execution API.
- View program output and errors.
- Provide custom input through standard input (stdin).

### 4. AI Coding Assistant
- AI-powered coding assistance using the Pollinations API.
- Generate code from natural-language prompts.
- Get coding assistance without leaving the editor.

### 5. Real-Time Chat
- Communicate with other participants inside a coding room.
- Exchange messages while collaborating.

### 6. Collaborative Drawing
- Interactive drawing workspace powered by tldraw.
- Share drawings and visual ideas with other room participants.
- Synchronize drawing updates in real time.

### 7. User Experience
- Room-based collaboration.
- Online and offline participant status.
- Responsive workspace layout.
- Toast notifications for user actions and errors.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Styling | CSS, Tailwind CSS |
| Code Editor | CodeMirror |
| Backend | Node.js, Express.js |
| Real-Time Communication | Socket.IO |
| Code Execution | OnlineCompiler / Piston-compatible API |
| AI Integration | Pollinations API |
| Drawing | tldraw |
| HTTP Requests | Axios |
| Routing | React Router |
| Notifications | React Hot Toast |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```text
Code-Sync/
│
└── Code-Sync-main/
    │
    ├── client/
    │   ├── public/
    │   ├── src/
    │   │   ├── api/
    │   │   ├── assets/
    │   │   ├── components/
    │   │   ├── context/
    │   │   ├── hooks/
    │   │   ├── pages/
    │   │   └── ...
    │   ├── package.json
    │   └── vite.config.js
    │
    └── server/
        ├── src/
        │   ├── types/
        │   └── server.js
        ├── public/
        ├── package.json
        └── .env
```

---

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (v22.12.0 or later)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/AnshumaYa19/CodeSync.git
```

### 2. Navigate to the Project Directory

```bash
cd CodeSync/Code-Sync-main
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

Configure the following variables:

```env
PORT=3000

# Code Execution API
PISTON_API_URL=https://api.onlinecompiler.io/api/v2/piston
PISTON_API_KEY=your_onlinecompiler_api_key

# AI Coding Assistant
POLLINATIONS_API_URL=https://gen.pollinations.ai/v1
POLLINATIONS_API_KEY=your_pollinations_secret_key
POLLINATIONS_MODEL=openai/gpt-5.4-nano
```

Replace the placeholder values with your own API credentials.

For the frontend, create a `.env` file inside the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

**Important:** Never upload API keys or secret environment variables to GitHub. Keep `.env` files private.

---

## ▶️ Running the Project

You need to run the frontend and backend separately.

### Start the Backend

```bash
cd server
npm run dev
```

The backend runs at:

```text
http://localhost:3000
```

### Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Vite will display the local development URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to access Code-Sync.

---

## 🔌 Backend API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/piston/runtimes` | Fetch supported programming language runtimes |
| POST | `/api/piston/execute` | Execute submitted code |
| POST | `/api/copilot/generate` | Generate code using the AI assistant |

The application also uses Socket.IO events for real-time room communication, file synchronization, participant activity, chat, and drawing updates.

---

## 🔄 How It Works

1. A user opens Code-Sync and creates or joins a coding room.
2. Other participants join the same room using its room ID.
3. Socket.IO establishes real-time communication between participants.
4. Code changes, file updates, cursor positions, and user activities are synchronized.
5. Users can execute their code through the integrated execution API.
6. The AI coding assistant helps generate code from user prompts.
7. Participants can communicate through chat and collaborate using the drawing workspace.

---

## 🔮 Future Improvements

- User authentication and personalized profiles.
- Persistent room and project storage.
- More advanced AI debugging and code explanation.
- Collaborative code review and suggestions.
- Improved editor customization and themes.
- Project export and import functionality.
- Deployment and production optimization.

---

## 🤝 Contributing

Contributions, suggestions, and feature requests are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Open a Pull Request.

---

## 👩‍💻 Author

**Anshuma Yadav**

- GitHub: [@AnshumaYa19](https://github.com/AnshumaYa19)

---

⭐ If you find Code-Sync useful, consider giving the repository a star!

**Code together. Build together. Sync together.**
