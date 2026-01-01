import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = os.getenv("APP_NAME")
APP_ENV = os.getenv("APP_ENV")
APP_VERSION = os.getenv("APP_VERSION")

# Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# AWS
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_REGION = os.getenv("AWS_REGION")

# DynamoDB Tables
USERS_TABLE = os.getenv("DYNAMO_USERS_TABLE", "Users")
PROJECTS_TABLE = os.getenv("DYNAMO_PROJECTS_TABLE", "Projects")
TEAMS_TABLE = os.getenv("DYNAMO_TEAMS_TABLE", "Teams")
