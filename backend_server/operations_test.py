
import operations
import os
import sys

from sets import Set

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'utils'))

import mongodb_client
from cloudAMQP_client import CloudAMQPClient

LOG_CLICKS_TASK_QUEUE_URL = "amqp://ghcyvuiz:sinyH9jt4Z3DucppRxk01rRIr6yYl9LU@otter.rmq.cloudamqp.com/ghcyvuiz"
LOG_CLICKS_TASK_QUEUE_NAME = "tap-news-log-clicks-task-queue"
cloudAMQP_client = CloudAMQPClient(LOG_CLICKS_TASK_QUEUE_URL, LOG_CLICKS_TASK_QUEUE_NAME)

CLICK_LOGS_TABLE_NAME = "click_logs"

def test_getNewsSummariesForUser_basic():
    news = operations.getNewsSummariesForUser('test', 1)
    print news
    assert len(news) > 0
    print 'test_getNewsSummariesForUser_basic passed!'

def test_getNewsSummariesForUser_pagination():
    news_page_1 = operations.getNewsSummariesForUser('test', 1)
    news_page_2 = operations.getNewsSummariesForUser('test', 2)
    assert len(news_page_1) > 0
    assert len(news_page_2) > 0
    digests_page_1_set = Set([news['digest'] for news in news_page_1])
    digests_page_2_set = Set([news['digest'] for news in news_page_2])
    assert len(digests_page_1_set.intersection(digests_page_2_set)) == 0
    print 'test_getNewsSummariesForUser_pagination passed!'

def test_logNewsClickForUser_basic():
    db = mongodb_client.get_db()
    db[CLICK_LOGS_TABLE_NAME].delete_many({"userId": "test"})
    operations.logNewsClickForUser("test", "test_news")
    record = list(db[CLICK_LOGS_TABLE_NAME].find().sort([("timestap", -1)]).limit(1))[0]
    assert record is not None
    assert record["userId"] == "test"
    assert record["newsId"] == "test_news"
    assert record["timestamp"] is not None
    db[CLICK_LOGS_TABLE_NAME].delete_many({"userId":"test"})
    msg = cloudAMQP_client.getMessage()
    assert msg is not None
    assert msg["userId"] == "test"
    assert msg["newsId"] == "test_news"
    assert msg["timestamp"] is not None
    print 'Click log test passed!'

if __name__ == "__main__":
    test_getNewsSummariesForUser_basic()
    test_getNewsSummariesForUser_pagination()
    test_logNewsClickForUser_basic()

