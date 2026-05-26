from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Sharan Kumar Portfolio API",
    description="Backend API service for Sharan Kumar's full-stack developer portfolio",
    version="1.0.0"
)

# Enable CORS (Cross-Origin Resource Sharing) for local development and deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to the frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Sharan Kumar Portfolio API",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/skills")
async def get_skills():
    return {
        "programming": ["Python", "C", "C++", "TypeScript", "SQL"],
        "frontend": ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
        "backend": ["Node.js", "FastAPI", "REST APIs"],
        "ai_ml": ["TensorFlow", "LSTM", "Pandas", "NumPy", "Streamlit", "Matplotlib"],
        "tools": ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render"]
    }
