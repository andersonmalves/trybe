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
    all_news = find_news()
    result = []

    for news in all_news:
        if source.lower() in map(str.lower, news['sources']):
            result.append((news['title'], news['url']))
    return result


# Requisito 9
def search_by_category(category):
    all_news = find_news()
    result = []

    for news in all_news:
        if category.lower() in map(str.lower, news['categories']):
            result.append((news['title'], news['url']))
    return result
