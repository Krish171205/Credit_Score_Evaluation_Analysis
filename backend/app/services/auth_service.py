from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
import os

# Load environment variables
SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")  # Replace with a secure key in production
ALGORITHM = os.getenv("ALGORITHM", "HS256")  # Default to HS256 if not set

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hashes a plain text password."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies if a plain text password matches its hashed version."""
    return pwd_context.verify(plain_password, hashed_password)

# JWT Token generation
def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """Generates a JWT token with expiration."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# JWT Token verification
def verify_access_token(token: str):
    """Verifies and decodes a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # Returns decoded data if token is valid
    except JWTError:
        return None  # Returns None if token is invalid
