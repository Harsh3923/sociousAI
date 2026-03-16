from django.http import JsonResponse
from rest_framework.decorators import api_view
from .ai_service import generate_ai_analysis


def build_mock_analysis(question: str):
    q = question.lower()

    if any(word in q for word in ["productivity", "work", "hustle", "career"]):
        return {
            "question": question,
            "direct_answer": "People chase productivity because modern society treats efficiency, ambition, and constant achievement as signs of worth. Productivity is not just about getting things done; it is also tied to identity, discipline, success, and status.",
            "quick_summary": "Productivity is socially rewarded, morally praised, and often linked to personal value.",
            "theory_comparison": "Marx explains productivity through capitalism and labor demands. Weber explains it through the work ethic and rationalization. Foucault focuses on self-discipline and surveillance, while Bourdieu shows how productivity can become a status signal.",
            "key_concepts": [
                "capitalism",
                "discipline",
                "status",
                "labor",
                "work ethic",
            ],
            "nodes": [
                {
                    "id": "productivity",
                    "label": "productivity",
                    "group": "core",
                    "kind": "concept",
                    "description": "A social value tied to efficiency, ambition, and measurable output.",
                    "theories": ["Weber", "Foucault", "Bourdieu"],
                    "related": ["capitalism", "status", "discipline", "labor"],
                },
                {
                    "id": "capitalism",
                    "label": "capitalism",
                    "group": "economic",
                    "kind": "concept",
                    "description": "An economic system that values productivity and profit.",
                    "theories": ["Marx", "Weber"],
                    "related": ["labor", "class"],
                },
                {
                    "id": "discipline",
                    "label": "discipline",
                    "group": "power",
                    "kind": "concept",
                    "description": "Self-regulation and behavioral control shaped by social expectations.",
                    "theories": ["Foucault"],
                    "related": ["surveillance", "institutions"],
                },
                {
                    "id": "status",
                    "label": "status",
                    "group": "culture",
                    "kind": "concept",
                    "description": "Prestige and symbolic worth within social hierarchies.",
                    "theories": ["Bourdieu"],
                    "related": ["distinction", "capital"],
                },
                {
                    "id": "marx",
                    "label": "Marx",
                    "group": "meta",
                    "kind": "theorist",
                    "description": "Karl Marx analyzed capitalism and labor exploitation.",
                    "theories": [],
                    "related": ["capitalism", "class"],
                },
                {
                    "id": "weber",
                    "label": "Weber",
                    "group": "meta",
                    "kind": "theorist",
                    "description": "Max Weber studied rationalization and the Protestant work ethic.",
                    "theories": [],
                    "related": ["productivity", "discipline"],
                },
                {
                    "id": "foucault",
                    "label": "Foucault",
                    "group": "meta",
                    "kind": "theorist",
                    "description": "Michel Foucault studied discipline and surveillance.",
                    "theories": [],
                    "related": ["discipline", "power"],
                },
                {
                    "id": "bourdieu",
                    "label": "Bourdieu",
                    "group": "meta",
                    "kind": "theorist",
                    "description": "Bourdieu studied status and symbolic capital.",
                    "theories": [],
                    "related": ["status"],
                },
            ],
            "links": [
                {"source": "productivity", "target": "capitalism", "emphasis": True},
                {"source": "productivity", "target": "discipline", "emphasis": True},
                {"source": "productivity", "target": "status", "emphasis": True},
                {"source": "capitalism", "target": "marx"},
                {"source": "discipline", "target": "foucault"},
                {"source": "productivity", "target": "weber"},
                {"source": "status", "target": "bourdieu"},
            ],
            "theory_cards": [
                {
                    "name": "Marx",
                    "concepts": ["capitalism", "labor"],
                    "text": "From a Marxist perspective, people chase productivity because capitalism rewards output and treats labor as a source of value. This pushes individuals to measure themselves through work and performance.",
                },
                {
                    "name": "Weber",
                    "concepts": ["work ethic", "discipline"],
                    "text": "Weber would argue that productivity is tied to the Protestant work ethic and the rational organization of modern life. Hard work becomes not just practical, but morally valued.",
                },
                {
                    "name": "Foucault",
                    "concepts": ["discipline", "surveillance"],
                    "text": "Foucault would say that people internalize discipline and monitor themselves constantly. They do not need external control all the time because they begin managing themselves according to social expectations.",
                },
                {
                    "name": "Bourdieu",
                    "concepts": ["status", "cultural capital"],
                    "text": "Bourdieu would explain productivity as a signal of competence, ambition, and distinction. Being productive can function like a marker of status and symbolic value.",
                },
            ],
        }

    if any(word in q for word in ["social media", "instagram", "validation", "likes"]):
        return {
            "question": question,
            "direct_answer": "Young people often seek social media validation because online spaces strongly shape identity, belonging, and recognition. Likes, comments, and visibility can feel like proof of worth, acceptance, and status.",
            "quick_summary": "Social media validation matters because it affects identity, recognition, and social standing.",
            "theory_comparison": "Goffman explains social media as a stage for self-presentation. Bourdieu highlights status and symbolic capital, while Foucault focuses on surveillance and self-monitoring in digital spaces.",
            "key_concepts": [
                "identity",
                "recognition",
                "status",
                "surveillance",
                "self-presentation",
            ],
            "nodes": [
                {
                    "id": "social-validation",
                    "label": "social validation",
                    "group": "core",
                    "kind": "concept",
                    "description": "The search for approval and recognition from others online.",
                    "theories": ["Goffman", "Bourdieu", "Foucault"],
                    "related": ["identity", "status", "recognition"],
                },
                {
                    "id": "identity",
                    "label": "identity",
                    "group": "culture",
                    "kind": "concept",
                    "description": "How individuals understand themselves through interaction and culture.",
                    "theories": ["Goffman"],
                    "related": ["presentation", "recognition"],
                },
                {
                    "id": "status",
                    "label": "status",
                    "group": "culture",
                    "kind": "concept",
                    "description": "Online approval functions as symbolic social capital.",
                    "theories": ["Bourdieu"],
                    "related": ["distinction"],
                },
                {
                    "id": "surveillance",
                    "label": "surveillance",
                    "group": "power",
                    "kind": "concept",
                    "description": "People constantly monitor themselves in digital spaces.",
                    "theories": ["Foucault"],
                    "related": ["discipline"],
                },
                {
                    "id": "goffman",
                    "label": "Goffman",
                    "group": "meta",
                    "kind": "theorist",
                    "description": "Goffman studied self-presentation and impression management.",
                    "theories": [],
                    "related": ["identity"],
                },
                {
                    "id": "bourdieu",
                    "label": "Bourdieu",
                    "group": "meta",
                    "kind": "theorist",
                    "description": "Bourdieu studied status and symbolic capital.",
                    "theories": [],
                    "related": ["status"],
                },
                {
                    "id": "foucault",
                    "label": "Foucault",
                    "group": "meta",
                    "kind": "theorist",
                    "description": "Foucault studied surveillance and power structures.",
                    "theories": [],
                    "related": ["power"],
                },
            ],
            "links": [
                {"source": "social-validation", "target": "identity", "emphasis": True},
                {"source": "social-validation", "target": "status", "emphasis": True},
                {"source": "social-validation", "target": "surveillance", "emphasis": True},
                {"source": "identity", "target": "goffman"},
                {"source": "status", "target": "bourdieu"},
                {"source": "surveillance", "target": "foucault"},
            ],
            "theory_cards": [
                {
                    "name": "Goffman",
                    "concepts": ["identity", "self-presentation"],
                    "text": "Goffman would say that social media is a stage where young people manage how they appear to others. Validation matters because it confirms whether their performed identity is accepted.",
                },
                {
                    "name": "Bourdieu",
                    "concepts": ["status", "symbolic capital"],
                    "text": "Bourdieu would interpret likes, followers, and visibility as forms of symbolic capital. Validation matters because it can raise a person's status and sense of distinction.",
                },
                {
                    "name": "Foucault",
                    "concepts": ["surveillance", "self-monitoring"],
                    "text": "Foucault would argue that digital platforms create spaces where users are constantly observed and judged. Young people may seek validation because they learn to monitor themselves according to platform norms.",
                },
            ],
        }

    return {
        "question": question,
        "direct_answer": "Social questions can be understood through concepts like society, power, identity, and institutions. Different sociological theories explain the same issue from different angles.",
        "quick_summary": "Sociology helps explain how individual experiences are shaped by broader social structures.",
        "theory_comparison": "Durkheim focuses on social cohesion and institutions, while Foucault focuses on power and discipline. Goffman focuses on self-presentation, and Bourdieu focuses on status and distinction.",
        "key_concepts": ["society", "institutions", "power", "identity"],
        "nodes": [
            {
                "id": "society",
                "label": "society",
                "group": "core",
                "kind": "concept",
                "description": "A system of relationships and institutions.",
                "theories": ["Durkheim"],
                "related": ["institutions", "power", "identity"],
            },
            {
                "id": "institutions",
                "label": "institutions",
                "group": "economic",
                "kind": "concept",
                "description": "Structures like school, family, and media that shape life.",
                "theories": ["Durkheim"],
                "related": ["society"],
            },
            {
                "id": "power",
                "label": "power",
                "group": "power",
                "kind": "concept",
                "description": "The ability to shape behavior and norms.",
                "theories": ["Foucault"],
                "related": ["institutions"],
            },
            {
                "id": "identity",
                "label": "identity",
                "group": "culture",
                "kind": "concept",
                "description": "How individuals see themselves within society.",
                "theories": ["Goffman"],
                "related": ["status"],
            },
            {
                "id": "durkheim",
                "label": "Durkheim",
                "group": "meta",
                "kind": "theorist",
                "description": "Durkheim studied social cohesion and institutions.",
                "theories": [],
                "related": ["society"],
            },
        ],
        "links": [
            {"source": "society", "target": "institutions"},
            {"source": "society", "target": "power"},
            {"source": "society", "target": "identity"},
            {"source": "society", "target": "durkheim"},
        ],
        "theory_cards": [
            {
                "name": "Durkheim",
                "concepts": ["society"],
                "text": "Society shapes individuals through shared norms and institutions.",
            }
        ],
    }


@api_view(["POST"])
def analyze_question(request):
    question = request.data.get("question", "").strip()

    if not question:
        return JsonResponse({"error": "Question required"}, status=400)

    try:
        data = generate_ai_analysis(question)
        return JsonResponse(data)
    except Exception as exc:
        print("AI ERROR:", exc)
        return JsonResponse(build_mock_analysis(question))