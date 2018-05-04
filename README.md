# New News
New news is a news system that can get the newest news from websites and recommend the news to the users based on their preference.
It using React, Node.js, MongoDB, Redis, RabbitMQ and TensorFlow.

If you like this project. Please give it a star. If you have any interesting idea about further development, just let me know!

# Before run
pip install -r requirements.txt
npm install

# How to run
`service redis_6379 start`
`service mongod start`
Go to /web_server/client folder
`npm run build`
`npm run-script build`
Go to /web_server/server folder
`nodemon ./bin/www &
cd ../../backend_server
python service.py &
cd ../news_recommendation_service
python recommendation_service.py &
python click_log_processor.py`
