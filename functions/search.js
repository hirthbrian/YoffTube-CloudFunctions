const fetch = require('node-fetch');

const {
  API_KEY,
  API_URL,
  mapVideoFromApi
} = require('./utils');

const getSearchUrl = (query, pageToken = null) => {
  const nextPageToken = pageToken ? `&pageToken=${pageToken}` : ``
  return `${API_URL}search?part=id&q=${query}&type=video&maxResults=20&key=${API_KEY}` + nextPageToken
}

const getVideosUrl = videoIds => `${API_URL}videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${API_KEY}`

exports.handler = (req, res) => {
  const query = req.query.query;
  const pageToken = req.query.pageToken;
  let videos = {};
  let nextPageToken = '';

  fetch(getSearchUrl(query, pageToken))
    .then(r => r.json())
    .then(data => {
      const videoIds = data.items.map(item => item.id.videoId)
      nextPageToken = data.nextPageToken
      fetch(getVideosUrl(videoIds))
        .then(r => r.json())
        .then(data => {
          data.items.map(item => videos[item.id] = mapVideoFromApi(item))
          res.send({
            nextPageToken,
            items: videos
          });
        })
    })
    .catch(error => {
      res.send(error)
    })


}