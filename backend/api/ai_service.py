import json
from openai import OpenAI
from django.conf import settings


def get_openai_client():
    api_key = getattr(settings, "OPENAI_API_KEY", None)
    if not api_key:
        raise ValueError("OPENAI_API_KEY is missing.")
    return OpenAI(api_key=api_key)


def build_socius_prompt(question: str) -> str:
    return f"""
You are generating structured sociology analysis data for a web app called Socius AI.

The user question is:
"{question}"

Return JSON only. No markdown. No explanation outside JSON.

The JSON must have this exact shape:
{{
  "question": "string",
  "direct_answer": "2-4 sentence direct answer that clearly answers the user's question in plain language",
  "quick_summary": "1-2 sentence summary",
  "theory_comparison": "2-4 sentence comparison of how the theories differ",
  "key_concepts": ["string"],
  "nodes": [
    {{
      "id": "string-lowercase-dash-or-simple",
      "label": "string",
      "group": "core|economic|power|culture|meta",
      "kind": "concept|theorist",
      "description": "string",
      "theories": ["string"],
      "related": ["string"]
    }}
  ],
  "links": [
    {{
      "source": "node-id",
      "target": "node-id",
      "emphasis": true
    }}
  ],
  "theory_cards": [
    {{
      "name": "string",
      "concepts": ["string"],
      "text": "2-4 sentence explanation of the question according to that theory"
    }}
  ]
}}

Rules:
- Answer the user's question directly and clearly.
- The "direct_answer" must be the most helpful plain-language response.
- The theory cards must explain why the phenomenon happens according to each theory.
- Include 4 to 6 concept nodes max.
- Include 2 to 4 theorist nodes max.
- Use only these groups: core, economic, power, culture, meta.
- Use kind "concept" for social concepts and "theorist" for thinkers or theory labels.
- Make the first main node the central concept of the user's question.
- Keep descriptions concise but meaningful.
- Make links sociologically meaningful.
- "key_concepts" should contain 4 to 7 important terms.
- Return valid JSON only.

Preferred theorists when relevant:
Marx, Weber, Foucault, Bourdieu, Durkheim, Goffman, Feminist Theory, Intersectionality.

If the question is about productivity, work, labor, hustle culture:
favor Marx, Weber, Foucault, Bourdieu.

If the question is about beauty, body image, gender norms:
favor Feminist Theory, Bourdieu, Goffman, Foucault.

If the question is about institutions, society, identity:
favor Durkheim, Weber, Foucault, Goffman.

Return only JSON.
""".strip()


def generate_ai_analysis(question: str) -> dict:
    client = get_openai_client()

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=build_socius_prompt(question),
    )

    text = response.output_text.strip()

    try:
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Model returned invalid JSON: {text}") from exc

    return data