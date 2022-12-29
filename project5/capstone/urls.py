from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("user/<str:nonce>", views.user_view, name="user"),
    path("mark", views.add_articles, name="article"),
    path('profile', views.user_profile, name='profile'),
    path('isliked', views.isliked, name='likes'),
    path("bookmarks", views.bookmark, name="bookmark"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('news/search', views.search_news, name='search'),
    path("news/search/<str:endpoint>", views.paginate_news, name="paginate"),

]
