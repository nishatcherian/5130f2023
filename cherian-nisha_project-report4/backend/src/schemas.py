from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    userid: str
    description: str
    password: str

    class Config:
        orm_mode = True


class UserPassword(BaseModel):
    userid: str
    password: str


class Item(BaseModel):
    id: str = None
    name: str
    description: str
    link: str
    price: float
    listid: str

    class Config:
        orm_mode = True


class ShoppingList(BaseModel):
    id: str = None
    name: str
    description: str
    userid: str
    avgprice: Optional[int] = 10
    items: Optional[list[Item]] = []

    class Config:
        orm_mode = True
