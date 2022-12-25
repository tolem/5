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
from itertools import chain
from django.views.generic import ListView
from django.core.paginator import Paginator

env = environ.Env()
# reading .env file
environ.Env.read_env()
NEWS_API_KEY = env("NEWS_API_KEY")
# Init
api = NewsApiClient(api_key=NEWS_API_KEY)


def index(request):
    return render(request, "capstone/index.html")


def bookmark(request):
    return render(request, "capstone/bookmark.html")


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
@ensure_csrf_cookie
def search_news(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    data = json.loads(request.body)
    content = data.get("search", "")
    advance_content = [query for query in content.values()]
    adv_selection =  all(advance_content)
    # this check if user chose advance option 
    if adv_selection:
        news_topic = advance_content[0]
        news_country = advance_content[1]
        news_category = advance_content[2]
        news_language = advance_content[3]
        news_type = advance_content[4]
        news_source = advance_content[5]
        print(all(advance_content))
        print(advance_content, len(advance_content), 'check')

        # use user selection to get news type 
        if news_type == "Headlines":
            print("Headlines")
            headlines = api.get_top_headlines(sources=news_source, q=news_topic, category=news_category,country=news_country)
            return JsonResponse(headlines, status=201)

        if news_type == "Everything":
            print("Everything")
            all_articles = api.get_everything(q=news_topic,sources=news_source, language=news_language,  )
            return JsonResponse(all_articles, status=201)


    else:
        all_articles = api.get_everything(q=content.get('query',''))
        print('response recieved, Lami')
        return JsonResponse(all_articles, status=201)



def paginate_news(request, endpoint):
    if request.method != "PUT":
        return JsonResponse({"error": "POST request required."}, status=400)
    data = json.loads(request.body)
    content = data.get("articles")
    # print(content.get('query', ''))
    # headlines = api.get_everything(q=content.get('query',''))

    print(content, "test")
    if content is not None:
        if type(content) == str:
            headlines = api.get_everything(q=content)
            paginator = Paginator(headlines["articles"], 10)
        else:
            paginator = Paginator(content['articles'], 10)

        counter = int(request.GET.get("page") or 1)

    else:
        return JsonResponse({'error': 'server did not return an response'}, status=404)

    if endpoint == "posts":
        page = paginator.page(counter)
        set_posts = page.object_list
        print(type(set_posts))
        return JsonResponse(set_posts, safe=False)

    elif endpoint == "pages":
        print(paginator.num_pages)
        return JsonResponse({"pages": paginator.num_pages})

    else:
        return HttpResponse(status=404)




def get_headlines():
    pass


def get_by_sources():
    pass
    # headlines = api.get_top_headlines()
    # # sources = api.get_sources()
    # print(api.get_everything(q='anime'))
    # # print(sources)

def user_view(request):
    pass


def save_articles(request):
    pass


def update_articles(request):
    pass

