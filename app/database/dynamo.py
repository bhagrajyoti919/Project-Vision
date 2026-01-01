import boto3
from app.core.config import (
    AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION,
    USERS_TABLE, PROJECTS_TABLE, TEAMS_TABLE
)

dynamodb = boto3.resource(
    "dynamodb",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

users_table = dynamodb.Table(USERS_TABLE)          # UserPreferences
projects_table = dynamodb.Table(PROJECTS_TABLE)    # ProjectIdeas
teams_table = dynamodb.Table(TEAMS_TABLE)          # TeamMembers
