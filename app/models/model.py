import uuid
from typing import Optional
from pydantic import BaseModel, Field


class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    
    class Config:
        orm_mode = True
    
class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]