module.exports = function (router) {
    router.get('/news/update', require('./news')('update'));
    router.get('/news/sale', require('./news')('sale'));
    router.get('/news/events', require('./news')('events'));
    router.get('/news/community', require('./news')('community'));
    router.get('/news/maintenance', require('./news')('maintenance'));
};
