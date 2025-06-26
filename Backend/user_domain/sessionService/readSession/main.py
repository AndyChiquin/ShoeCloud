from flask import Flask
from app.routes.read_route import read_bp

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False  


app.register_blueprint(read_bp)     
@app.route("/")
def health():
    return {"status": "Session Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)

#test