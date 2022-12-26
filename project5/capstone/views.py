# Create your views here.
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import User, Article
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


@login_required
def bookmark(request):
    # get the user articles
    user_articles = request.user.user_newsfeeds.all()
    user_articles = user_articles.order_by("-timestamps").all()
    print(user_articles)
    context = {"articles": user_articles}
    return render(request, "capstone/bookmark.html", context)


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
    adv_selection =  bool(advance_content[4])
    print(advance_content, adv_selection)
    # this check if user chose advance option 
    if adv_selection:
        # getting articles object
        news_topic = advance_content[0]
        news_country = advance_content[1]
        news_category = advance_content[2]
        news_language = advance_content[3]
        news_type = advance_content[4]
        news_source = advance_content[5] 
        news_date_start = advance_content[6]
        news_date_end = advance_content[7]
        news_domain = advance_content[8]
        news_order = advance_content[9]
      

        print(all(advance_content))
        print(news_date_start, news_date_end)
        print(advance_content, len(advance_content), 'check')
        print(news_type, "test title")


        # use user selection to get news type 
        if news_type == "Headlines":
            print("Headlines")
            headlines = api.get_top_headlines( q=news_topic, category=news_category,country=news_country)
            # /v2/everything
            return JsonResponse(headlines, status=201)

        if news_type == "Everything":
            print("Everything")
            news_source = news_source if news_source else None
            all_articles = api.get_everything(q=news_topic,sources=news_source, domains=news_domain, from_param=news_date_start, to=news_date_end, language=news_language, sort_by=news_order)
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

def user_view(request, nonce):
    if request.method == "GET":
        if nonce == "user":
            if request.user.pk:
                return JsonResponse({"username": request.user.username})
            return JsonResponse({"username": 404})
    return JsonResponse({'err': "Not allowed"})


def save_articles(request):
    if request.method == "PUT":
        if request.user:
            data = json.loads(request.body)
            content = data.get("article", "")
            user_id = request.user
            # init a new article
            print(content)
            article = Article(user=user_id, description=content.get('des'), title=content.get('title'), author=content.get('author'), image=content.get('img'), imgurl=content.get('url'), source=content.get('source'), timestamps=content.get('date'))
            print(article)
            article.save()
        return JsonResponse({"status": "ok"})
    else:
         return JsonResponse({"status": "A PUT request is needed"})



def update_articles(request):
    pass

