from fastapi import Depends, FastAPI, HTTPException, Query
from sqlalchemy.orm import Session
import dboperations
import models
import schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/users/checkpassword')
def check_user_password(userpassword: schemas.UserPassword, db: Session = Depends(get_db)):
    if dboperations.check_user_password(db=db, userid=userpassword.userid,
                                        password=userpassword.password):
        return True
    return False

@app.post('/users')
def create_users(user: schemas.UserPassword, db: Session = Depends(get_db)):
    return dboperations.create_user(db, user)

@app.get('/lists', response_model=list[schemas.ShoppingList])
def get_lists(userid: str = Query(), db: Session = Depends(get_db)):
    return dboperations.get_lists(db=db, userid=userid)

@app.get('/lists/{listid}', response_model=schemas.ShoppingList)
def get_list_by_id(listid: str, db: Session = Depends(get_db)):
    return dboperations.get_list_by_id(db=db, listid=listid)[0]


@app.post('/lists')
def create_lists(shoppinglist: schemas.ShoppingList, db: Session = Depends(get_db)):
    return dboperations.create_list(db, shoppinglist)


@app.get('/lists/{listid}/items', response_model=list[schemas.Item])
def get_items(listid: str, db: Session = Depends(get_db)):
    return dboperations.get_items(db=db, listid=listid)

@app.post('/lists/{listid}/items')
def create_item(item: schemas.Item, db: Session = Depends(get_db)):
    return dboperations.create_item(db=db, item=item)

@app.delete('/lists/{listid}')
def delete_list(listid: str, db: Session = Depends(get_db)):
    return dboperations.delete_list(db=db, listid=listid)

@app.delete('/lists/{listid}/items/{itemid}')
def delete_item(listid: str, itemid: str, db: Session = Depends(get_db)):
    return dboperations.delete_item(db=db, itemid=itemid)
