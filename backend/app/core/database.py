from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

MONGODB_URI = os.getenv("MONGODB_URI")  # MongoDB URL from .env
DATABASE_NAME = "credit_score_db"

client = AsyncIOMotorClient(MONGODB_URI)
database = client[DATABASE_NAME]
users_collection = database["users"]  # Collection for user data
