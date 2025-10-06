from database import Base
from sqlalchemy import Column, Integer, String, DateTime, func


class Comment(Base):
    __tablename__ = "FavoriteSongsOfYearComments"
    __table_args__ = {"schema": "Music"}

    year = Column("Year", Integer, primary_key=True)
    comment = Column("Comment", String(512), nullable=False)
    date_created = Column(
        "DateCreated",
        DateTime,
        nullable=False,
        server_default=func.sysutcdatetime(),
    )
    date_updated = Column(
        "DateUpdated", DateTime, nullable=True, onupdate=func.sysutcdatetime()
    )
