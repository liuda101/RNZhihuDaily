'use strict';

var WEEK = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

var util = {};

util.readableDate = function(dateNumber) {
  var today = new Date();

  var destDate = new Date();
  destDate.setFullYear(dateNumber.substring(0, 4));
  destDate.setMonth(dateNumber.substring(4,6));
  destDate.setMonth(destDate.getMonth() - 1);
  destDate.setDate(dateNumber.substring(6,8));

  var result = (destDate.getMonth() + 1) + '月' + destDate.getDate() + '日 ' + WEEK[destDate.getDay()];

  return result;
};


module.exports = util;