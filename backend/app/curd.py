from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models import User, VerifyToken, ResetOTP
from schemas import RegisterRequest
import uuid
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash password
def hash_password(password: str):
    return pwd_context.hash(password)

# Register user (without password yet)
def create_user(db: Session, user_data: RegisterRequest):
    db_user = User(
        email=user_data.email,
        username=user_data.username,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        dob=user_data.dob,
        country=user_data.country,
        state=user_data.state,
        town=user_data.town,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Save email verification token
def create_verify_token(db: Session, user_id: int):
    token = str(uuid.uuid4())
    db_token = VerifyToken(user_id=user_id, token=token)
    db.add(db_token)
    db.commit()
    return db_token

# Set user password
def set_password(db: Session, token: str, new_password: str):
    token_entry = db.query(VerifyToken).filter(VerifyToken.token == token).first()
    if not token_entry:
        return None
    user = db.query(User).filter(User.id == token_entry.user_id).first()
    user.hashed_password = hash_password(new_password)
    user.is_verified = True
    db.commit()
    return user

# Authenticate user
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if user and user.hashed_password and pwd_context.verify(password, user.hashed_password):
        return user
    return None
