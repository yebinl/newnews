var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  news = [{
            'url':'https://www.cnn.com/politics/live-news/trump-today-05-02-18/index.html',
            'title': 'White House lawyer Ty Cobb is leaving',
            'description': '“For several weeks Ty Cobb has been discussing his retirement and last week he let Chief of Staff Kelly know he would retire at the end of this month," White House press secretary Sarah Sanders said.',
            'source': 'cnn',
            'digest':'6dJkeBvQd',
            'urlToImage': 'https://dynaimage.cdn.cnn.com/cnn/livestory/w_900/607dea2f-b00a-43d8-a4eb-27711477c51e.jpg',
            'reason': 'Recommend'
          },{
            'url':'https://www.cnn.com/2018/05/02/us/southwest-flight-957-unplanned-landing/index.html',
            'title': 'Southwest Flight 957 makes unplanned landing with broken window',
            'description': 'Flight 957 was diverted to Cleveland after a report of an issue with a window aboard the aircraft, FAA spokeswoman Elizabeth Cory said. It landed safely at Cleveland Hopkins International Airport, she said.',
            'source': 'cnn',
            'digest':'3RjeEdfal',
            'urlToImage': 'https://pbs.twimg.com/media/DcM28MsXkAEHfLa.jpg',
            'reason': 'Hot',
            'time': 'Today'
          }];
  res.json(news);
});

module.exports = router;
