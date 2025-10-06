from models.about_me_model import AboutMeModel


class YearsCommentSchema(AboutMeModel):
    year: int = None
    comment: str = None
