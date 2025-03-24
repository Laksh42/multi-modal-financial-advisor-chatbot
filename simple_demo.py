from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from pathlib import Path
import uvicorn

# Create the FastAPI application
app = FastAPI(
    title="Multi-Modal Financial Advisor Chatbot",
    description="Demo of a financial advisor chatbot frontend",
    version="0.1.0"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create static directories if they don't exist
static_dir = Path("app/static")
if not static_dir.exists():
    static_dir.mkdir(parents=True)
    
css_dir = Path("app/static/css")
if not css_dir.exists():
    css_dir.mkdir(parents=True)
    
js_dir = Path("app/static/js")
if not js_dir.exists():
    js_dir.mkdir(parents=True)
    
images_dir = Path("app/static/images")
if not images_dir.exists():
    images_dir.mkdir(parents=True)

# Mount static files for frontend
app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def index():
    """Serve the main frontend HTML."""
    return FileResponse("app/static/index.html")

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}

if __name__ == "__main__":
    # This block is used when running the application directly
    print("Starting demo server on http://localhost:8000")
    uvicorn.run("simple_demo:app", host="0.0.0.0", port=8000, reload=True) 