const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');
momentDurationFormatSetup(moment);

exports.API_KEY = 'AIzaSyA8oHYJ-Cn_OLX82_F3zk9T4x2u2Lq7Twc';
exports.API_URL = 'https://www.googleapis.com/youtube/v3/';

exports.mapVideoFromApi = video => ({
  id: video.id,
  title: video.snippet.title,
  duration: moment.duration(video.contentDetails.duration).format('h:mm:ss'),
  views: video.statistics.viewCount,
  thumbnail: video.snippet.thumbnails.high.url,
  date: video.snippet.publishedAt,
  channelId: video.snippet.channelId,
  channelTitle: video.snippet.channelTitle
})

