from pydantic import BaseModel
from typing import Optional

class UserPassword(BaseModel):
    userid: str
    password: str

    class Config:
        orm_mode = True


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
    avgprice: Optional[float] = 0
    items: Optional[list[Item]] = []

    class Config:
        orm_mode = True
