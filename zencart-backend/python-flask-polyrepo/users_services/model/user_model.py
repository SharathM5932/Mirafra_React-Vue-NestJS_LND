from bson import ObjectId

from database.database import users_collection


class UserModel:
    def __init__(self):
        pass

    # fetching the complete user data
    def get_user(self, user_id):
        try:
            user = users_collection.find_one({"_id": ObjectId(user_id)})

            if user:
                user["_id"] = str(user["_id"])

            return {
                "status": "success",
                "message": "User retrives successfully!",
                "data": user,
            }

        except Exception as e:
            return {
                "status": "error",
                "message": "Something went wrong. Please try again later.",
                "error": str(e),
            }

    def users(self):
        try:
            users = list(users_collection.find({}, {"hashedAndSaltedPassword": 0}))

            # Convert ObjectId to string
            for user in users:
                user["_id"] = str(user["_id"])

            return {
                "status": "success",
                "message": "Users retrieved successfully!",
                "data": users,
            }

        except Exception as e:
            return {
                "status": "error",
                "message": "Something went wrong. Please try again later.",
                "error": str(e),
            }
