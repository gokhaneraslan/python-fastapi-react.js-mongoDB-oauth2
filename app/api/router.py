from fastapi import APIRouter, Body,status, Request, HTTPException, Response, Depends
from typing import Any
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder
from app.models.model import User, UserUpdate
from app.services.user_service import UserService
import pymongo

router = APIRouter()


@router.get("/users", status_code=status.HTTP_200_OK)
async def get_users(request: Request, formdata: OAuth2PasswordRequestForm = Depends()) -> Any:
    users = list(request.app.database["users"].find(limit=100))
    
    return users

@router.post("/users", response_model=User, response_description="Create new user", status_code=status.HTTP_201_CREATED)
async def create(request: Request, user: User = Body(...)):
    if user is not None:
        try:
            return await UserService.create_user(request, user)
        except:
            return pymongo.errors.OperationFailure("Something went wrong")

    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Invalid Entry')

@router.post("/users/login", response_description= "Get a single user by username")
async def login(request: Request, formdata: OAuth2PasswordRequestForm = Depends()) -> Any:
    if formdata is not None:
        try:
            return await UserService.authenticate_user(request, formdata.username, formdata.password)
        except:
            return pymongo.errors.OperationFailure("Something went wrong")

    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Invalid Entry')

@router.put("/users/update/{username}", response_description="Update the user which you want", status_code=status.HTTP_202_ACCEPTED)
async def update_user(username: str, request: Request, user: UserUpdate = Body(...)):
    if username is not None:
        try:
            return await UserService.update_user(username, request, user)
        except:
            return pymongo.errors.OperationFailure("Something went wrong")

    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Authentication failed. Sign in again.')


@router.delete("/users/delete/{username}", response_description="Delete a User")
async def delete_user(username: str, request: Request, response: Response):
    if username is not None:
        try:
            return await UserService.delete_user(username, request)
        except:
            return pymongo.errors.OperationFailure("Something went wrong")

    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Invalid Entry')