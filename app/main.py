from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from app.config import settings
from app.database.mongodb import connect_to_mongo, close_mongo_connection
from app.api.auth import router as auth_router
from app.api.chat import router as chat_router
from app.api.recommendations import router as recommendations_router

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="A chatbot that recommends personalized financial products based on multimodal inputs",
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(recommendations_router, prefix="/api/recommendations", tags=["Recommendations"])

# Database connection events
app.add_event_handler("startup", connect_to_mongo)
app.add_event_handler("shutdown", close_mongo_connection)

# Root endpoint
@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/static/index.html")

# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "version": settings.APP_VERSION}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)