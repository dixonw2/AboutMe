from pydantic import BaseModel


class YearsCommentSchema(BaseModel):
    year: int = None
    comment: str = None

    class Config:
        orm_mode = True
