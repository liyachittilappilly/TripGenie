from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import recommend

app = Flask(__name__)
CORS(app)

# simple memory (session simulation)
user_context = {}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "").lower()

    # extract info (basic NLP)
    if "goa" in message:
        user_context["destination"] = "goa"
    if "manali" in message:
        user_context["destination"] = "manali"
    if "kerala" in message:
        user_context["destination"] = "kerala"

    if "beach" in message:
        user_context["type"] = "beach"
    if "adventure" in message:
        user_context["type"] = "adventure"

    if "under" in message:
        words = message.split()
        for w in words:
            if w.isdigit():
                user_context["budget"] = int(w)

    # generate recommendation
    results = recommend(user_context)

    reply = "Here are best options:\n"
    for pkg in results:
        reply += f"{pkg['destination']} - ₹{pkg['price']} ({pkg['duration']} days)\n"

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True)