project-idea-platform/
│
├── .env
├── .gitignore
├── requirements.txt
├── app/
│   ├── main.py
│   ├── __init__.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── preferences.py
│   │       ├── ideas.py
│   │       ├── techstack.py
│   │       ├── architecture.py
│   │       ├── guidance.py
│   │       ├── resources.py
│   │       ├── team_match.py
│   │       └── __init__.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── ai_provider.py
│   │
│   ├── database/
│   │   ├── dynamo.py
│   │   └── __init__.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── idea.py
│   │   └── __init__.py
│   │
│   └── services/
│       ├── idea_generator.py
│       ├── stack_recommender.py
│       ├── architecture_builder.py
│       ├── media_generator.py
│       ├── resources_fetcher.py
│       ├── team_match_engine.py
│       └── __init__.py
