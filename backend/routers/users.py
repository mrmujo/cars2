from fastapi import APIRouter, Request, Body, status, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import UserBase, LoginBase, CurrentUser
from authentication import Authorisation

router = APIRouter()
auth_handler = Authorisation()

@router.post('/register', response_description="Register user")
async def register(request: Request, newUser: UserBase = Body(...)) -> UserBase:
    newUser.password = auth_handler.get_password_hash(newUser.password)
    newUser = jsonable_encoder(newUser)

    if(existing_email := await request.app.mongodb["users"].
            find_one({"email": newUser["email"]}) is not None):
        raise HTTPException(status_code=400, detail=f"User with email {newUser['email']} already exists")

    if(existing_username := await request.app.mongodb["users"].
            find_one({"username": newUser["username"]}) is not None):
        raise HTTPException(status_code=400, detail=f"User with username {newUser['username']} already exists")

    user = await request.app.mongodb["users"].insert_one(newUser)
    created_user = await request.app.mongodb["users"].find_one({"_id": user.inserted_id})

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

