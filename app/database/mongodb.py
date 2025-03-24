import logging
import motor.motor_asyncio
from pymongo.errors import ConnectionFailure
from app.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global client and database variables
client = None
db = None

async def connect_to_mongo():
    """
    Connect to MongoDB and set up global client and database variables.
    """
    global client, db
    try:
        # Create the MongoDB client
        client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL)
        # Access the specific database
        db = client[settings.MONGODB_DB_NAME]
        # Ping the database to verify connection
        await client.admin.command('ping')
        logger.info(f"Connected to MongoDB at {settings.MONGODB_URL}")
        return db
    except ConnectionFailure as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error connecting to MongoDB: {e}")
        # For development, we can continue even if MongoDB is not available
        logger.warning("Continuing without MongoDB connection...")
        return None

async def close_mongo_connection():
    """
    Close the MongoDB connection.
    """
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed")

async def get_database():
    """
    Get the database instance. Used as a dependency.
    """
    return db 