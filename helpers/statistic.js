const _ = require('lodash');

const statis = {};

statis.checkin = (option = {}) => {
  let matcherPipe = false;
  let shop = option.shopId || option.shopIds;

  if (_.isString(shop)) {
    matcherPipe = {
      "$match": { _p_shop: UTILS.createQueryPointerTo('Shop', shop) }
    };

  } else if (_.isArray(shop)) {
    shop = shop.map(elem => {
      return UTILS.createQueryPointerTo('Shop', elem);
    });
    matcherPipe = {
      "$match": { _p_shop:  {$in: shop}}
    };
  }

  let datePipe = false;
  if (option.fromDate && option.toDate) {
    const fromDate = new Date (option.fromDate);
    const toDate = new Date (option.toDate);
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate,
            "$gte": fromDate
          }
        }
    }
  } else if (option.fromDate) {
    const fromDate = new Date (option.fromDate);
    const toDate = new Date();
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate,
            "$gte": fromDate
          }
        }
    }
  } else if (option.toDate) {
    const toDate = new Date();
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate
          }
        }
    }
  }

  let queryPipeLines = [
    {
      "$group": {
        "_id": {
          "$dateToString": {
            "format": "%Y-%m-%d",
            "date": "$_created_at"
          }
        },
        "sum": { "$sum": 1 }
      }
    },
    {
      "$project": {
        "date": "$_id",
        "sum": 1,
        "_id": 0
      }
    },
    { '$sort': { 'date': 1 } }
  ];

  if (matcherPipe) {
    queryPipeLines.unshift(matcherPipe);
  }
  if (datePipe) {
    queryPipeLines.unshift(datePipe);
  }

  return new Promise((resolve, reject) => {
    db.collection('CheckIn').aggregate(queryPipeLines).toArray((err, results) => {
      if (err)
        reject(err);
      else
        resolve(results);
    });
  });
};

statis.checkinCompare = (option = {}) => {
  let matcherPipe = false;
  let shop = option.shopId || option.shopIds;

  if (_.isString(shop)) {
    matcherPipe = {
      "$match": { _p_shop: UTILS.createQueryPointerTo('Shop', shop) }
    };

  } else if (_.isArray(shop)) {
    shop = shop.map(elem => {
      return UTILS.createQueryPointerTo('Shop', elem);
    });
    matcherPipe = {
      "$match": { _p_shop:  {$in: shop}}
    };
  }

  let datePipe = false;
  if (option.fromDate && option.toDate) {
    const fromDate = new Date (option.fromDate);
    const toDate = new Date (option.toDate);
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate,
            "$gte": fromDate
          }
        }
    }
  } else if (option.fromDate) {
    const fromDate = new Date (option.fromDate);
    const toDate = new Date();
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate,
            "$gte": fromDate
          }
        }
    }
  } else if (option.toDate) {
    const toDate = new Date();
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate
          }
        }
    }
  }

  let queryPipeLines = [
    {
      "$group": {
        "_id": "$_p_shop",
        "sum": { "$sum": 1 }
      }
    },
    {
      "$project": {
        "shop": "$_id",
        "sum": 1,
        "_id": 0
      }
    },
    { '$sort': { 'shop': 1 } }
  ];

  if (matcherPipe) {
    queryPipeLines.unshift(matcherPipe);
  }
  if (datePipe) {
    queryPipeLines.unshift(datePipe);
  }

  return new Promise((resolve, reject) => {
    db.collection('CheckIn').aggregate(queryPipeLines).toArray((err, results) => {
      if (err) {
        reject(err);
      }
      
      results = results.map(elem => {
        elem.shop = elem.shop.split('$')[1];
        return elem;
      });

      resolve(results);
    });
  });
};

statis.reviewRatingByTime = (option = {}) => {
  let matcherPipe = false;
  let shop = option.shopId;

  if (!shop) {
    return Promise.reject('shopId is required');
  }

  matcherPipe = {
    "$match": { _p_shop: UTILS.createQueryPointerTo('Shop', shop) }
  };

  let datePipe = false;
  if (option.fromDate && option.toDate) {
    const fromDate = new Date (option.fromDate);
    const toDate = new Date (option.toDate);
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate,
            "$gte": fromDate
          }
        }
    }
  } else if (option.fromDate) {
    const fromDate = new Date (option.fromDate);
    const toDate = new Date();
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate,
            "$gte": fromDate
          }
        }
    }
  } else if (option.toDate) {
    const toDate = new Date();
    datePipe = {
      "$match":
        {
          "_created_at": {
            "$lte": toDate
          }
        }
    }
  }

  let queryPipeLines = [
    {
      "$group": {
        "_id": "$_p_shop",
        "sum": { "$sum": 1 },
        "averageRate" : { "$avg" : "$rate" }
      }
    },
    {
      "$project": {
        "shop": "$_id",
        "sum": 1,
        "averageRate": 1,
        "_id": 0
      }
    },
    { '$sort': { 'date': 1 } }
  ];

  if (matcherPipe) {
    queryPipeLines.unshift(matcherPipe);
  }
  if (datePipe) {
    queryPipeLines.unshift(datePipe);
  }

  return new Promise((resolve, reject) => {
    db.collection('Review').aggregate(queryPipeLines).toArray((err, results) => {
      if (err) {
        reject(err);
      }
      
      results = results.map(elem => {
        elem.shop = elem.shop.split('$')[1];
        return elem;
      });

      resolve(results.length ? results[0] : {});
    });
  });
};

module.exports = statis;