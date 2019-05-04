const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

exports.handler = (req, res) => {
  let promises = [];

  ytdl.getInfo(req.query.url)
    .then(info => {
      formats = info.formats
        .filter(item => item.container === 'mp4' && item.quality)
        .map(item => {

          const promise = new Promise(resolve => {
            fetch(item.url, { method: 'HEAD' })
              .then(data => {
                resolve({
                  size: (data.headers.get("content-length") / 1024 / 1024).toFixed(1) + 'MB',
                  resolution: item.resolution,
                  url: item.url,
                })
                resolve()
              })
              .catch(e => res.send(e))
          })
          promises.push(promise);
        })

      Promise.all(promises).then(values => res.send(values))
    })
    .catch(error => {
      res.send({ error: error.message });
    })
}