var express = require('express')
var router = express.Router();
var path = require('path');

function exceptionWrapper(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

router.get('/survey', (req, res) => {
  res.sendFile(path.resolve('app/public', 'survey.html'));
});
router.get('*', (req, res) => {
  res.sendFile(path.resolve('app/public', 'home.html'));
});

module.exports = router;
