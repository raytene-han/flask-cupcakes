"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy


DEFAULT_IMG_URL = 'https://tinyurl.com/demo-cupcake'


db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Cupcake model."""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    flavor = db.Column(db.String(50),
                       nullable=False)
    size = db.Column(db.String(50),
                    nullable=False)
    rating = db.Column(db.Integer,
                       nullable=False)
    image = db.Column(db.Text,
                      nullable=False,
                      default=DEFAULT_IMG_URL)

    def serialize(self):
        """Returns dictionary of properties."""

        return {
                "id": self.id,
                "flavor": self.flavor,
                "size": self.size,
                "rating": self.rating,
                "image": self.image
                }