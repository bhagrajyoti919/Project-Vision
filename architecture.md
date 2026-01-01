# Backend Architecture & API Documentation

This document outlines the backend architecture and API endpoints for the **Project Idea Platform**. The system is built using **FastAPI**, **DynamoDB**, and **Google Gemini AI**.

## 🔄 Core Workflow

The platform follows a **"Generate & Refine"** workflow:

1.  **Generate Idea**: The user clicks a button to generate a random, high-quality project idea.
    *   The backend creates a unique `user_id` (session ID) for this specific idea.
    *   The idea is saved to the database.
2.  **Get Details**: The frontend uses the returned `user_id` to call other endpoints. Each endpoint fetches the saved project context and generates specific details (Tech Stack, Architecture, etc.) on demand.
3.  **View History**: Users can view a list of all previously generated ideas.

---

## 🚀 API Endpoints

### 1. Project Generation (Entry Point)

#### **Generate New Project Idea**
*   **Method**: `GET`
*   **Path**: `/api/v1/project-idea`
*   **Description**: The main entry point. Generates a unique software project idea using AI, creates a new session (`user_id`), and saves it to the database.
*   **Parameters**: None.
*   **Response**:
    ```json
    {
      "user_id": "uuid-string-1234...",
      "project_title": "EcoSync Last-Mile Hub",
      "description": "An AI-driven logistics platform..."
    }
    ```

---

### 2. Project Details (Requires `user_id`)

All the following endpoints require the `user_id` returned from the `project-idea` endpoint.

#### **Get Tech Stack**
*   **Method**: `GET`
*   **Path**: `/api/v1/techstack/{user_id}`
*   **Description**: Analyzes the saved project and suggests a modern technology stack (Frontend, Backend, Database, DevOps).
*   **Response**: JSON object with categorized tech recommendations.

#### **Get Architecture Overview**
*   **Method**: `GET`
*   **Path**: `/api/v1/architecture/{user_id}`
*   **Description**: Provides a high-level architectural breakdown (e.g., Microservices vs. Monolith, Data Flow, Key Components).
*   **Response**: JSON object describing the system design.

#### **Get Implementation Guidance**
*   **Method**: `GET`
*   **Path**: `/api/v1/guidance/{user_id}`
*   **Description**: Generates a step-by-step roadmap for building the project, from MVP to advanced features.
*   **Response**: JSON list of development phases.

#### **Get Learning Resources**
*   **Method**: `GET`
*   **Path**: `/api/v1/resources/{user_id}`
*   **Description**: Suggests tutorials, documentation, and libraries relevant to the project's tech stack.
*   **Response**: JSON list of resources.

#### **Get Team Match**
*   **Method**: `GET`
*   **Path**: `/api/v1/team-match/{user_id}`
*   **Description**: Recommends the ideal team composition (e.g., "1 Frontend Dev, 1 AI Engineer") for building this specific project.
*   **Response**: JSON object with roles and responsibilities.

#### **Get Image Generation Prompt**
*   **Method**: `GET`
*   **Path**: `/api/v1/image-prompt/{user_id}`
*   **Description**: Generates a detailed prompt for AI art tools (Midjourney/DALL-E) to visualize the project concept.
*   **Response**:
    ```json
    {
      "image_prompt": "A futuristic dashboard...",
      "art_style": "Cyberpunk",
      "visual_elements": ["Holograms", "Dark Mode"]
    }
    ```

#### **Get External Media Links**
*   **Method**: `GET`
*   **Path**: `/api/v1/external-links/{user_id}`
*   **Description**: Provides direct search links for Vlogs, Newsletters, and YouTube videos related to the project's domain.
*   **Response**:
    ```json
    {
      "youtube_links": [{"title": "...", "url": "..."}],
      "newsletter_links": [...],
      "vlog_links": [...]
    }
    ```

---

### 3. Platform History

#### **Get Project History**
*   **Method**: `GET`
*   **Path**: `/api/v1/history`
*   **Description**: Retrieves a list of all generated project ideas.
*   **Parameters**: None.
*   **Response**:
    ```json
    [
      {
        "project_title": "Project Alpha",
        "description": "Description of alpha..."
      },
      {
        "project_title": "Project Beta",
        "description": "Description of beta..."
      }
    ]
    ```

---

## 🛠 Tech Stack

*   **Backend Framework**: FastAPI (Python)
*   **Database**: AWS DynamoDB (Local/Cloud)
*   **AI Engine**: Google Gemini (via `google-genai` SDK)
*   **Documentation**: Swagger UI available at `/docs` when running the server.
