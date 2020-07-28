import { uniqueId } from 'lodash';

const domparser = new DOMParser();
const idPrefix = 'id_';

const parseRssToFeed = (rssData) => {
  const xmlDocument = domparser.parseFromString(rssData, 'text/xml');
  const feedId = uniqueId(idPrefix);
  return {
    feed: {
      id: feedId,
      title: xmlDocument.getElementsByTagName('title')[0].textContent,
    },
    articles: [...xmlDocument.getElementsByTagName('item')].map((item) => ({
      feedId,
      id: uniqueId(idPrefix),
      title: item.getElementsByTagName('title')[0].textContent,
      link: item.getElementsByTagName('link')[0].textContent,
    })),
  };
};

export { parseRssToFeed };
