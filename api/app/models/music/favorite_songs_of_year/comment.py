from database import Base
from sqlalchemy import Column, Integer, String, Text, DateTime, func


class Comment(Base):
    __tablename__ = "FavoriteSongsOfYearComments"
    __table_args__ = {"schema": "Music"}

    year = Column("Year", Integer, primary_key=True, autoincrement=False)
    comment = Column("Comment", Text, nullable=False)
    date_created = Column(
        "DateCreated",
        DateTime,
        nullable=False,
        server_default=func.sysutcdatetime(),
    )
    date_updated = Column(
        "DateUpdated", DateTime, nullable=True, onupdate=func.sysutcdatetime()
    )
