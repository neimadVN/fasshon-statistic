var express = require('express');
var router = express.Router();

const UTILS = require('../helpers/UTILS');
const statistic = require('../helpers/statistic');

//======================================================================
/*
  shopId=ckxzNzjzsU
  shopIds=[ckxzNzjzsU, ckxzNzjzsU, ckxzNzjzsU, ...]
  fromDate=2019-05-18
  toDate=2019-06-16
*/
router.get('/checkin', function(req, res, next) {
  statistic.checkin({...req.query}).then((results) => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

/*
  shopId=ckxzNzjzsU
  shopIds=[ckxzNzjzsU, ckxzNzjzsU, ckxzNzjzsU, ...]
  fromDate=2019-05-18
  toDate=2019-06-16
*/
router.post('/checkin', function(req, res, next) {
  statistic.checkin({...req.body}).then((results) => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});
//=================================================================
//=================================================================
/*
  shopIds=[ckxzNzjzsU, ckxzNzjzsU, ckxzNzjzsU, ...]
  fromDate=2019-05-18
  toDate=2019-06-16
*/
router.get('/checkinCompare', function(req, res, next) {
  statistic.checkinCompare({...req.query}).then((results) => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

/*
  shopIds=[ckxzNzjzsU, ckxzNzjzsU, ckxzNzjzsU, ...]
  fromDate=2019-05-18
  toDate=2019-06-16
*/
router.post('/checkinCompare', function(req, res, next) {
  statistic.checkinCompare({...req.body}).then((results) => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});
//=================================================================
//=================================================================
/*
  shopId=
  fromDate=2019-05-18
  toDate=2019-06-16
*/
router.get('/statisReviewRateByTime', function(req, res, next) {
  statistic.reviewRatingByTime({...req.query}).then((results) => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

/*
  shopIds=[ckxzNzjzsU, ckxzNzjzsU, ckxzNzjzsU, ...]
  fromDate=2019-05-18
  toDate=2019-06-16
*/
router.post('/statisReviewRateByTime', function(req, res, next) {
  statistic.reviewRatingByTime({...req.body}).then((results) => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});
//=================================================================

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
