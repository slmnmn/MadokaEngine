from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # para permitir peticiones desde el frontend

# Conexion al servidor
client = MongoClient('mongodb+srv://simonrinconr05:uTADEO2025@cluster0.f2lvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client["Madoka"]
collection = db["MadokaGirls"]

# Obtener todas las chicas mágicas
@app.route("/monas", methods=["GET"])
def get_profiles():
    monas = list(collection.find({}, {"_id": 0})) 
    return jsonify(monas)

# Crear una nueva chica mágica
@app.route("/monas", methods=["POST"])
def create_profile():
    data = request.json
    data["id"] = collection.count_documents({}) + 1  # Asignar un ID incremental
    collection.insert_one(data)
    return jsonify({"mensaje": "Chica mágica creada exitosamente"})

# Editar una chica mágica existente
@app.route("/monas/<id>", methods=["PUT"])
def update_profile(id):
    data = request.json
    collection.update_one({"id": int(id)}, {"$set": data})
    return jsonify({"mensaje": "Chica mágica actualizada exitosamente"})

# Borrar una chica mágica
@app.route("/monas/<id>", methods=["DELETE"])
def delete_profile(id):
    result = collection.delete_one({"id": int(id)})
    if result.deleted_count > 0:
        return jsonify({"mensaje": "Chica mágica eliminada exitosamente"})
    else:
        return jsonify({"mensaje": "Chica mágica no encontrada"}), 404

if __name__ == "__main__":
    app.run(debug=True)


