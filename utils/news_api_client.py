import requests

from json import loads

NEWS_API_ENDPOINT = 'https://newsapi.org/v2/'
NEWS_API_KEY = '999ce62547be412f9e5895c15cefda10'
ARTICLES_API = 'top-headlines'
COUNTRY = 'us'
CNN = 'cnn'
DEFAULT_SOURCES = [CNN]

def buildUrl(end_point=NEWS_API_ENDPOINT, api_name=ARTICLES_API):
    return end_point + api_name

def getNewsFromSource(sources=DEFAULT_SOURCES, country=COUNTRY):
    articles = []
    for source in sources:
        payload = {
            'apiKey': NEWS_API_KEY,
            'source': source,
            'country': country}
        response = requests.get(buildUrl(), params=payload)
        res_json = loads(response.content)

        if(res_json is not None and res_json['status'] == 'ok'):
            articles.extend(res_json['articles'])    
    return articles
