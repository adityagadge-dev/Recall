import json
from bson import json_util
from db import client

db = client["Gamified_edu"]

export_data = {}
for col in db.list_collection_names():
    docs = list(db[col].find().limit(2))  # Fetches 2 sample documents per collection
    export_data[col] = docs

# Prints JSON text you can copy and paste here
print(json.dumps(export_data, default=json_util.default, indent=2))