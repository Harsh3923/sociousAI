# SociousAI — Global Culture Analyzer

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=blue)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4.1-412991?style=for-the-badge&logo=openai&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

> **SociousAI** is an AI-powered sociological analysis platform that answers questions about human behavior and culture by generating interactive concept networks and multi-theory explanations — drawing from the works of Marx, Weber, Foucault, Bourdieu, Durkheim, Goffman, and more.

---

<!-- INSERT SCREENSHOT: Landing page / hero view with search bar -->
<!-- ![Landing Page](screenshots/landing.png) -->

---

## Table of Contents

- [Purpose](#purpose)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Directory](#file-directory)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Data Flow](#data-flow)
- [API Reference](#api-reference)

---

## Purpose

SociousAI bridges the gap between complex sociological theory and everyday curiosity. A user types any social question — *"Why are people obsessed with productivity?"* or *"Why do people seek validation on social media?"* — and the platform:

1. Answers the question in plain, accessible language.
2. Generates an **interactive knowledge graph** visualizing relationships between sociological concepts.
3. Presents **theory cards** from multiple sociological lenses so the user can see how different thinkers explain the same phenomenon.

It's a tool for students, researchers, and the intellectually curious to explore sociology without needing a textbook.

---

## Features

### AI Analysis Engine
- Powered by **OpenAI GPT-4.1-mini** with a custom sociological prompt
- Produces structured JSON: concept nodes, relational links, and theory cards
- Graceful fallback with pre-built mock analyses when the API is unavailable

### Interactive Concept Graph
- Force-directed 2D graph built with `react-force-graph-2d` and `d3-force`
- Nodes colored by group: `core`, `economic`, `power`, `culture`, `meta`
- Orbital constraints keep theorist nodes at the graph periphery
- Animated particles flow along emphasized concept links
- Click any node to inspect it in the side panel

### Concept Explorer Panel
- Detail sidebar that appears on node click
- Shows the concept's linked theories and related concepts
- Smooth transition from a placeholder state

### Theory Cards Grid
- 2–4 responsive columns of theory cards
- Each card shows the theorist's name, key concepts, and a 2–4 sentence explanation
- Supports theorists: Marx, Weber, Foucault, Bourdieu, Durkheim, Goffman, and others

### Direct Answer Section
- Plain-language explanation of the social phenomenon
- Quick one-liner summary
- Key concept badges
- Cross-theory comparison paragraph

### Dark UI
- Custom dark theme (`#070b14` background)
- World-map dot/grid overlay pattern
- Styled scrollbars with purple gradient

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Graph Visualization | react-force-graph-2d, d3-force |
| Backend Framework | Django 6.0 + Django REST Framework |
| Language (Backend) | Python 3.12 |
| AI / LLM | OpenAI API — GPT-4.1-mini |
| Database | SQLite3 |
| Cross-Origin | django-cors-headers |
| Env Management | python-dotenv |

---

## File Directory

```
sociousAI/
│
├── backend/                        # Django REST API
│   ├── config/
│   │   ├── settings.py             # Django project settings
│   │   ├── urls.py                 # Root URL configuration
│   │   ├── wsgi.py                 # WSGI entry point
│   │   └── asgi.py                 # ASGI entry point
│   ├── api/
│   │   ├── views.py                # Endpoint: POST /api/analyze/
│   │   ├── urls.py                 # API route definitions
│   │   ├── ai_service.py           # OpenAI prompt + API call logic
│   │   ├── models.py               # Django ORM models
│   │   ├── admin.py                # Django admin registration
│   │   ├── apps.py                 # App config
│   │   ├── tests.py                # Test suite
│   │   └── migrations/             # Database migration files
│   ├── manage.py                   # Django CLI entry point
│   ├── db.sqlite3                  # Local SQLite database
│   ├── .env                        # Environment variables (API keys)
│   └── venv/                       # Python virtual environment
│
└── frontend/                       # Next.js application
    ├── src/
    │   ├── app/
    │   │   ├── page.js             # Root page — state management + layout
    │   │   ├── layout.js           # App-wide HTML shell
    │   │   └── globals.css         # Global styles + Tailwind + dark theme
    │   └── components/
    │       ├── Navbar.jsx          # Top navigation bar
    │       ├── SearchBar.jsx       # Question input + submit button
    │       ├── ConceptGraph.jsx    # Interactive force-directed graph
    │       ├── ConceptPanel.jsx    # Clicked-node detail sidebar
    │       └── TheoryCards.jsx     # Theory perspective grid cards
    ├── public/                     # Static assets
    ├── package.json                # npm dependencies
    ├── next.config.mjs             # Next.js config
    ├── postcss.config.mjs          # PostCSS / Tailwind config
    └── jsconfig.json               # Path alias configuration
```

---

## Screenshots

> Replace the placeholders below with actual screenshots from your app.

### Landing / Home Page
<!-- INSERT SCREENSHOT: Full-page view with search bar and dark background -->
```
screenshots/01_landing.png
```

### Concept Graph — Force-Directed Visualization
<!-- INSERT SCREENSHOT: The interactive graph with colored nodes and links -->
```
screenshots/02_concept_graph.png
```

### Concept Panel — Node Detail Sidebar
<!-- INSERT SCREENSHOT: Click a node to see this side panel appear -->
```
screenshots/03_concept_panel.png
```

### Theory Cards Grid
<!-- INSERT SCREENSHOT: The 2-4 column theory card grid below the graph -->
```
screenshots/04_theory_cards.png
```

### Direct Answer Section
<!-- INSERT SCREENSHOT: The plain-language answer with key concept badges -->
```
screenshots/05_direct_answer.png
```

**To add screenshots:**
1. Create a `screenshots/` folder at the project root.
2. Take screenshots of each view listed above.
3. Replace the placeholder paths in the `![alt](path)` tags with your actual image files.

---

## Getting Started

### Prerequisites

- **Node.js** v20+ and **npm**
- **Python** 3.12+
- An **OpenAI API key**

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sociousAI.git
cd sociousAI
```

---

### 2. Backend Setup (Django)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers openai python-dotenv

# Create the .env file (see Environment Variables section)

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

The backend will be live at `http://127.0.0.1:8000`.

---

### 3. Frontend Setup (Next.js)

Open a **new terminal**, then:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be live at `http://localhost:3000`.

---

### 4. Open in Browser

Navigate to `http://localhost:3000`, type a sociological question, and click **Analyze Society**.

---

### Production Build (Frontend)

```bash
cd frontend
npm run build
npm start
```

---

## Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

> **Important:** Never commit your `.env` file to version control. Add `backend/.env` to your `.gitignore`.

The backend reads this key via `python-dotenv` inside `api/ai_service.py`.

---

## Data Flow

```
User types a question in SearchBar
        │
        ▼
page.js → handleAnalyze()
        │
        ▼
POST http://127.0.0.1:8000/api/analyze/
  { "question": "..." }
        │
        ▼
Django views.py → analyze_question()
        │
        ├─ Success → ai_service.py → OpenAI GPT-4.1-mini
        └─ Failure → build_mock_analysis() (fallback)
        │
        ▼
Structured JSON response:
  ├── direct_answer       Plain-language explanation
  ├── quick_summary       1–2 sentence summary
  ├── theory_comparison   How theories differ
  ├── key_concepts        Important terms list
  ├── nodes               Concept + theorist nodes
  ├── links               Relationships between nodes
  └── theory_cards        Per-theorist perspectives
        │
        ▼
Frontend renders:
  ├── ConceptGraph   → force-directed node/link graph
  ├── ConceptPanel   → detail sidebar on node click
  ├── TheoryCards    → theory perspective grid
  └── page.js        → direct answer + summary display
```

---

## API Reference

### `POST /api/analyze/`

Analyzes a sociological question using AI.

**Request Body:**
```json
{
  "question": "Why are people obsessed with productivity?"
}
```

**Response:**
```json
{
  "direct_answer": "...",
  "quick_summary": "...",
  "theory_comparison": "...",
  "key_concepts": ["capitalism", "discipline", "status"],
  "nodes": [
    { "id": "productivity", "label": "Productivity", "group": "core", ... }
  ],
  "links": [
    { "source": "productivity", "target": "capitalism", "emphasis": 2 }
  ],
  "theory_cards": [
    {
      "theorist": "Marx",
      "concepts": ["alienation", "labour"],
      "explanation": "..."
    }
  ]
}
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with curiosity and sociology.</p>
