from fastapi import status, HTTPException
from fastapi.encoders import jsonable_encoder

class UserService:

    @staticmethod
    async def create_user(request, user):
        try:
            user = jsonable_encoder(user)
            new_user = request.app.database["users"].insert_one(user)
            created_user = request.app.database["users"].find_one(
                {
                    "_id": new_user.inserted_id
                }
            )
            return created_user

        except:
            raise pymongo.errors.OperationFailure("Something went wrong!")

    
    @staticmethod
    async def authenticate_user(request, email, password):
        try:
            user = request.app.database["users"].find_one({ "email": email })
            if user:
                if user['password'] == password:
                    return HTTPException(
                        status_code=status.HTTP_200_OK,
                        detail=user
                    )
                else:
                    return HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Incorrect password!"
                    )
            else:
                return HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Incorrect Email!"
                )
        except:
            return "Something went wrong!"

    @staticmethod
    async def update_user(username, request, user):
        user_id = request.app.database["users"].find_one({ "username": username })
        if user_id is not None:
            user = {k: v for k,v in user.dict().items() if v is not None}
            if len(user) >= 1:
                update_result = request.app.database["users"].update_one({"username": username},{"$set": user})
                if update_result.modified_count == 0:
                    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"There is no data to update with this username {username}")
                if update_result:
                    return HTTPException(
                        status_code=status.HTTP_200_OK,
                        detail=user
                    )
            if (existing_user := request.app.database["users"].find_one({"username": username})) is not None:
                return HTTPException(
                        status_code=status.HTTP_200_OK,
                        detail=existing_user
                    ) 

        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'User with {username} not found')



    @staticmethod
    async def delete_user(username, request):
        delete_result = request.app.database["users"].delete_one({"username": username})
        if delete_result.deleted_count == 1:
            return HTTPException(status_code=status.HTTP_200_OK, detail="Successfully deleted") 

        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
