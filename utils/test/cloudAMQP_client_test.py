import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../'))

from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = "amqp://mllvzygt:eFB_fRvEbO4U0OembzWKdST3-h8JXAhF@otter.rmq.cloudamqp.com/mllvzygt"
TEST_QUEUE_NAME = 'test'

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)
    # send and receive a message

    sentMsg = {'test':'demo'}
    client.sendMessage(sentMsg)
    client.sleep(10)
    receivedMsg = client.getMessage()
    assert sentMsg == receivedMsg
    print 'test_basic passed!'

if __name__ == "__main__":
    test_basic()