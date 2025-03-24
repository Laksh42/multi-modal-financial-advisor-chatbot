from pydantic_settings import BaseSettings
from typing import Optional, List
import os
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # App settings
    APP_NAME: str = "Multi-Modal Financial Advisor Chatbot"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # API Keys
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", "api_key_placeholder")
    HUGGINGFACE_TOKEN: Optional[str] = os.getenv("HUGGINGFACE_TOKEN", "api_key_placeholder")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "secret_key_placeholder")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    
    # Database
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "financial_advisor")
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Model settings
    RAG_TOP_K: int = 3
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4")
    OPENAI_VISION_MODEL: str = os.getenv("OPENAI_VISION_MODEL", "gpt-4-vision-preview")
    
    # File storage paths
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    DATA_DIR: str = os.getenv("DATA_DIR", "./data")
    PRODUCTS_FILE: str = os.getenv("PRODUCTS_FILE", "./data/products.csv")

    class Config:
        env_file = ".env"

# Create settings instance
settings = Settings()