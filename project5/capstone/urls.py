
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("bookmarks", views.bookmark, name="bookmark"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('news/search', views.search_news, name='search'),
    path("news/search/<str:endpoint>", views.paginate_news, name="paginate"),
]
