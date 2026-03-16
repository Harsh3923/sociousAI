from django.urls import path
from .views import analyze_question

urlpatterns = [
    path("analyze/", analyze_question, name="analyze-question"),
]