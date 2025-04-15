from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user_model import UserCreate, UserResponse, UserInDB
from app.services.auth_service import hash_password, verify_password, create_access_token, verify_access_token
from app.core.database import users_collection
from datetime import timedelta
from bson import ObjectId

router = APIRouter()

# OAuth2 scheme for token-based authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="signin")

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    """Register a new user"""
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    new_user = {"email": user.email, "hashed_password": hashed_password}
    result = await users_collection.insert_one(new_user)

    return UserResponse(email=user.email)

@router.post("/signin")
async def signin(form_data: OAuth2PasswordRequestForm = Depends()):
    """Authenticate user and return JWT token"""
    db_user = await users_collection.find_one({"email": form_data.username})  # OAuth2 uses 'username' for email
    if not db_user or not verify_password(form_data.password, db_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": form_data.username}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/user")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Retrieve user information from JWT token."""
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    email = payload.get("sub")  # Extract email from token payload
    user = await users_collection.find_one({"email": email}, {"_id": 0, "hashed_password": 0})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user  # Return user data (excluding sensitive fields)
