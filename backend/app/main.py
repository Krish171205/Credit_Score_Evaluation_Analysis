from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes
from app.core.database import users_collection

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Credit Score Backend!"}




@app.get("/test-db")
async def test_db():
    user = await users_collection.find_one()
    if user:
        return {"status": "Connected ✅", "sample_user_email": user.get("email", "No email field")}
    else:
        return {"status": "Connected ✅", "message": "No users found"}
