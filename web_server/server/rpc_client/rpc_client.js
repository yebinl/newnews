const jayson = require('jayson');

const client = jayson.client.http({
    port: 4040,
    hostname: 'localhost'
});

//test rpc methods
function add(a, b, callback) {
    client.request('add', [a, b], function(err, error, response) {
        if (err) throw err;
        callback(response);
    });
};

function getNewsSummariesForUser(user_id, page_num, callback) {
    client.request('getNewsSummariesForUser', [user_id, page_num], function(err, error, response) {
        if (err) throw err;
        callback(response);
    });
};

module.exports = {
    add : add,
    getNewsSummariesForUser : getNewsSummariesForUser
};
