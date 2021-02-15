
const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  axios = require('axios'),
  log4js = require("log4js"),
  cron = require('node-cron');

// log4js.configure({
//   appenders: [
//     { type: 'console' },
//     { type: 'file', filename: 'logs/hit.log', category: 'hit_log' }
//   ]
// });

log4js.configure({
  appenders: { hit_log: { type: "file", filename: "hit_log.log" } },
  categories: { default: { appenders: ["hit_log"], level: "error" } }
});
const logger = log4js.getLogger("hit_log");

const task = cron.schedule(' */30 * * * *', function () {
  console.log('starting hit')
  HitSite()
});


async function HitSite() {
  try {
    let hit_home = await axios.get('http://www.lechateauliving.com');
    let hit_brands = await axios.get('http://www.lechateauliving.com/brands/');
    let hit_project = await axios.get('http://www.lechateauliving.com/project/');
    if (hit_home) {
      logger.info("Hit home success");

      console.log('hit home successed');
    }
    if (hit_brands) {
      logger.info("Hit brands success");

      console.log('hit brand successed');
    }
    if (hit_project) {
      logger.info("Hit projects success");

      console.log('hit project successed');
    }
  } catch (error) {
    console.error(`error when hit ${error.config.url}`);
    logger.error(`error when hit ${error.config.url}`);

    // task.stop()
  }
}
task.start()

app.listen(process.env.PORT || 8085, function () {
  console.log('Server started on port 8085');
});