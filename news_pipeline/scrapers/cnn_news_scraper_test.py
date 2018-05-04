import cnn_news_scraper as scraper

CNN_NEWS_URL = "https://www.cnn.com/2018/05/03/politics/tony-cardenas-denies-allegations/index.html"

def test_basic():
    news = scraper.extract_news(CNN_NEWS_URL)
    print news

if __name__ == "__main__":
    test_basic()
