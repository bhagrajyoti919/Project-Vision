from app.database.dynamo import users_table

async def generate_ideas(user_id: str):
    response = users_table.get_item(Key={"user_id": user_id})
    if "Item" not in response:
        return ["User not found"]

    prefs = response["Item"]
    interests = prefs.get("interests", [])

    sample = {
        "cloud": "🌥️ Serverless Backup Management System",
        "healthcare": "🩺 AI Medical Symptom Checker with NLP",
        "automation": "⚙️ Smart Waste Segregation System (IoT)"
    }

    selected = interests[0].lower()
    return [sample.get(selected, "🤖 AI Research Topic Recommender System")]
