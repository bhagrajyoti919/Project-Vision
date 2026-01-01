from app.database.dynamo import users_table

async def match_teams(user_id: str):
    user = users_table.get_item(Key={"user_id": user_id})

    if "Item" not in user:
        return {"error": "User not found"}

    my_interests = user["Item"]["interests"]

    data = users_table.scan().get("Items", [])
    
    matches = [u for u in data if u["user_id"] != user_id 
               and any(tag in u.get("interests", []) for tag in my_interests)]

    return {"suggested_team_members": matches}
