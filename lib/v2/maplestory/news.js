const got = require('@/utils/got');
const { parseRelativeDate } = require('@/utils/parse-date');
const cheerio = require('cheerio');

module.exports = (tag) => async (ctx) => {
    const web_url = `https://maplestory.nexon.net/news/${tag}#news-filter`;
    const response = await got({
        method: 'get',
        url: web_url,
    });
    const $ = cheerio.load(response.data);

    const title = `MapleStory News [${tag.toUpperCase()}]`;
    const link = web_url;
    const description = `NEWS - ${tag.toUpperCase()}`;

    const item = $(`.news-wrapper .news-item.news-item--${tag}`)
        .map(function () {
            const title = $(this).find('.text h3 a').text();
            const link = 'https://maplestory.nexon.net' + $(this).find('.text h3 a').attr('href');
            const description = $(this).find('.text p').first().text();
            const pubDate = $(this).find('.text .timestamp').text();
            const publishDate = parseRelativeDate(pubDate);
            const single = {
                title,
                link,
                description,
                pubDate: publishDate,
            };
            return single;
        })
        .get();
    ctx.state.data = {
        title,
        link,
        description,
        item,
    };
};
