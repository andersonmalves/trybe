from tech_news.database import find_news, search_news
import datetime


# Requisito 6
def search_by_title(title):
    all_news = find_news()
    result = []

    for news in all_news:
        if title.lower() in news['title'].lower():
            result.append((news['title'], news['url']))
    return result


# Requisito 7
def search_by_date(date):
    try:
        datetime.datetime.strptime(date, '%Y-%m-%d')
    except ValueError:
        raise ValueError("Data inválida")

    all_news = search_news({
        'timestamp': {
            "$regex": f"{date}",
            "$options": "i"
        }
    })
    result = []

    for news in all_news:
        result.append((news['title'], news['url']))
    return result


# Requisito 8
def search_by_source(source):
    """Seu código deve vir aqui"""


# Requisito 9
def search_by_category(category):
    """Seu código deve vir aqui"""

# search_by_title("Musk")
# search_by_date("2021-07-04")
#  "2021-07-04T20:00:01",
