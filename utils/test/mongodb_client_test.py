import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../'))

import mongodb_client as client

def test_basic():
    db = client.get_db('test')
    db.demo.drop()
    assert db.demo.count() == 0
    db.demo.insert({'test':123})
    assert db.demo.count() == 1
    db.demo.drop()
    assert db.demo.count() ==0
    print 'test passed!'

if __name__ == '__main__':
    test_basic()