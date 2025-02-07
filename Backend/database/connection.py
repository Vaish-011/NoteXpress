from pymongo import MongoClient

MONGO_URI = "mongodb+srv://muskantomar43:zxDvnHtshU8fYGAY@cluster0.cj8jl.mongodb.net/%3Cdbname%3E?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)

db = client["LEARNBUDDY"]
user_collection = db["User"]
