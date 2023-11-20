from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = 'users'
    userid = Column(String, primary_key=True)
    description = Column(String)
    password = Column(String)
    # shopping_lists = relationship('ShoppingList', back_populates='owner')

class ShoppingList(Base):
    __tablename__ = 'lists'
    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    userid = Column(String, ForeignKey('users.userid'))
    items = relationship('Items')
    avgprice = 10
    # owner = relationship('User', back_populates='shopping_lists')

class Items(Base):
    __tablename__ = 'items'
    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    link = Column(String)
    price = Column(Float)
    listid = Column(String, ForeignKey('lists.id'))