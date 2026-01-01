async def generate_architecture_mermaid(title: str, tech_stack: list):
    mermaid = f"""
```mermaid
flowchart TD
A[User] --> B[{title}]
B --> C[Frontend: {tech_stack[0] if tech_stack else 'React'}]
B --> D[Backend: {tech_stack[1] if len(tech_stack)>1 else 'FastAPI'}]
D --> E[Database: DynamoDB]
D --> F[AI Services -> Gemini API]
D --> G[File Storage -> AWS S3]
E --> H[Logs and Monitoring]"""