from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

MONGO_URI = os.getenv("MONGO_URI")  # MongoDB URL from .env
DATABASE_NAME = "score_savvy_db"

client = AsyncIOMotorClient(MONGO_URI)
database = client[DATABASE_NAME]
users_collection = database["users"]  # Collection for user data
