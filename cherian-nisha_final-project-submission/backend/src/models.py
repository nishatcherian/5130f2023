from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = 'users'
    userid = Column(String, primary_key=True)
    password = Column(String)
    # shopping_lists = relationship('ShoppingList', back_populates='owner')


class ShoppingList(Base):
    __tablename__ = 'lists'
    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    userid = Column(String, ForeignKey('users.userid'))
    items = relationship('Items')
    # owner = relationship('User', back_populates='shopping_lists')

    @hybrid_property
    def avgprice(self):
        return self.calculate_avg_price()

    def calculate_avg_price(self):
        price_list = [item.price for item in self.items]
        if len(price_list) == 0:
            return 0
        return sum(price_list)/len(price_list)


class Items(Base):
    __tablename__ = 'items'
    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    link = Column(String)
    price = Column(Float)
    listid = Column(String, ForeignKey('lists.id'))
