# Create your views here.
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import User
import json
from django.views.decorators.csrf import csrf_exempt,  ensure_csrf_cookie
from newsapi.newsapi_client import NewsApiClient
import environ
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse

env = environ.Env()
# reading .env file
environ.Env.read_env()
NEWS_API_KEY = env("NEWS_API_KEY")
api = NewsApiClient(api_key=NEWS_API_KEY)


def index(request):
    return render(request, "capstone/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "capstone/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "capstone/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "capstone/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "capstone/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "capstone/register.html")


# capstone
# @csrf_exempt
@ensure_csrf_cookie
def search_news(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    data = json.loads(request.body)
    content = data.get("search", "")
    print(content.get('query', ''))
    headlines = api.get_everything(q=content.get('query',''))
    print('response recieved, Lami')
    return JsonResponse(headlines, status=201)



def get_headlines():
    pass


def get_by_sources():
    pass
    # headlines = api.get_top_headlines()
    # # sources = api.get_sources()
    # print(api.get_everything(q='anime'))
    # # print(sources)
