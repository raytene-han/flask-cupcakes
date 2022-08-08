"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request

from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config["SECRET_KEY"] = "oh-so-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///cupcakes"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

connect_db(app)
db.create_all()


@app.get("/api/cupcakes")
def list_all_cupcakes():
    """Lists all cupcakes in database.
    Return JSON {cupcakes: [{id, flavor, size, rating, image}, ...]}."""

    cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in cupcakes]

    return jsonify(cupcakes=serialized)


@app.get("/api/cupcakes/<int:cupcake_id>")
def list_single_cupcake(cupcake_id):
    """List information about single cupcake.
    Return JSON {cupcake: {id, flavor, size, rating, image}} or 404 if not
    found."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)


@app.post("/api/cupcakes")
def create_cupcake():
    """Create new cupcake & return it.
    Return JSON {cupcake: {id, flavor, size, rating, image}}."""

    # flavor = request.json["flavor"]
    # size = request.json["size"]
    # rating = request.json["rating"]
    # image = request.json["image"]
    # TODO: list comp [flavor, size, rating, image] = request.json.values()
    data = {key: value for key, value in request.json.items()}
    new_cupcake = Cupcake(**data)
    # new_cupcake = Cupcake(flavor=flavor,
    #                       size=size,
    #                       rating=rating,
    #                       image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return (jsonify(cupcake=serialized), 201)
