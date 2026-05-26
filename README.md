# Sharan Kumar - Full-Stack Developer Portfolio

An award-winning, premium, dark-themed developer portfolio website showcasing engineering skills, interactive products, and scalable experiences.

---

## Repository Structure

```text
sharan-portfolio/
├── frontend/             # React + Vite (Framer Motion, CSS, responsive design)
│   ├── public/           # Static assets (including profile picture)
│   ├── src/              # React components & styles
│   └── package.json      # Frontend package configuration
├── backend/              # Python FastAPI Application
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py       # API routing and business logic
│   └── requirements.txt  # Python backend dependencies
├── package.json          # Root wrapper with convenient scripts
├── .gitignore            # Global ignores
└── README.md             # Project documentation
```

---

## Getting Started

### 1. Frontend Development

From the root directory, you can run the following standard commands which delegate automatically to the frontend folder:

- **Run Dev Server**:
  ```bash
  npm run dev
  ```
- **Build Production Assets**:
  ```bash
  npm run build
  ```
- **Lint Code**:
  ```bash
  npm run lint
  ```

Alternatively, you can navigate directly to the `frontend/` folder:
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend Development

To spin up the Python FastAPI backend:

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server using Uvicorn:
   ```bash
   uvicorn app.main:app --reload
   ```

The backend API documentation will be available locally at `http://127.0.0.1:8000/docs`.
