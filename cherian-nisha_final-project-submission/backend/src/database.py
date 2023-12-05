from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

mysqlurl = os.getenv('MYSQL_URL', '127.0.0.1')
SQLALCHEMY_DATABASE_URL= f'mysql://root:passwd123@{mysqlurl}:3306/shopping_list'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()