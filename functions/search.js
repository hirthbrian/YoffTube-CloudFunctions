const fetch = require('node-fetch');
const moment = require('moment');

const momentDurationFormatSetup = require('moment-duration-format');

momentDurationFormatSetup(moment);

const API_KEY = 'AIzaSyA8oHYJ-Cn_OLX82_F3zk9T4x2u2Lq7Twc';
const API_URL = 'https://www.googleapis.com/youtube/v3/';

mapVideoFromApi = video => ({
  id: video.id,
  title: video.snippet.title,
  duration: moment.duration(video.contentDetails.duration).format('h:mm:ss'),
  views: video.statistics.viewCount,
  thumbnail: video.snippet.thumbnails.high.url,
  date: video.snippet.publishedAt,
  channelId: video.snippet.channelId,
  channelTitle: video.snippet.channelTitle
})

getSearchUrl = (query, pageToken = null) => {
  const nextPageToken = pageToken ? `&pageToken=${pageToken}` : ``
  return `${API_URL}search?part=id&q=${query}&type=video&maxResults=20&key=${API_KEY}` + nextPageToken
}

getVideosUrl = videoIds => `${API_URL}videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${API_KEY}`

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