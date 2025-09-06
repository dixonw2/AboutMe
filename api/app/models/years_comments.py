from database import Base
from sqlalchemy import Column, Integer, String

class YearsComments(Base):
    __tablename__ = "YearsComments"
    
    year = Column("Year", Integer, index=True, nullable=False, primary_key=True)
    comment = Column("Comment", String(512), index=True, nullable=False)