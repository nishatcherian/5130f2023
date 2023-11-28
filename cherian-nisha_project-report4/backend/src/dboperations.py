from sqlalchemy.orm import Session
import models
import schemas
import uuid


def check_user_password(db: Session, userid: str, password: str) -> bool:
    user = db.query(models.User).filter(models.User.userid == userid).filter(
        models.User.password == password).first()
    if user:
        return True
    return False


def get_lists(db: Session, userid: str):
    return db.query(models.ShoppingList).filter(models.ShoppingList.userid == userid)

def get_list_by_id(db: Session, listid: str):
    return db.query(models.ShoppingList).filter(models.ShoppingList.id == listid)

def create_list(db: Session, shoppinglist: schemas.ShoppingList):
    db_shopping_list = models.ShoppingList(id=uuid.uuid4(), name=shoppinglist.name,
                                           description=shoppinglist.description,
                                           userid=shoppinglist.userid)
    db.add(db_shopping_list)
    db.commit()
    db.refresh(db_shopping_list)
    return db_shopping_list

def get_items(db: Session, listid: str):
    return db.query(models.Items).filter(models.Items.listid == listid)

def create_item(db: Session, item: schemas.Item):
    db_item = models.Items(
        id = uuid.uuid4(), name = item.name, 
        description = item.description, link = item.link, 
        price=item.price, listid = item.listid
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_list(db: Session, listid: str):
    db_list = db.query(models.ShoppingList).filter(models.ShoppingList.id == listid).one()
    db.delete(db_list)
    db.commit()

def delete_item(db: Session, itemid: str):
    db_item = db.query(models.Items).filter(models.Items.id == itemid).one()
    db.delete(db_item)
    db.commit()
    
