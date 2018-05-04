import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../'))
import news_api_client as client

def test_basic():
    news = client.getNewsFromSource()
    print news
    assert len(news) > 0
    news = client.getNewsFromSource(sources=['bbc-news'])
    assert len(news) > 0
    print 'test passed'

if __name__ == "__main__":
    test_basic()