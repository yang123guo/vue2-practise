

var keyMap = arr => arr.map(v => {
  return {
    name: v,
    value: v
  }
});

// 把数组转换成对象，value为值，index为数字
var _arrMap = arr => arr.map((value, i) => {
  return {
    value,
    index: i + 1
  }
});

// 把对象转换成 数组
var _objKeyValue = obj => {
  let arr = [];
  for (let o in obj) {
    arr.push({
      name: obj[o],
      value: o
    });
  }
  return arr;
};


const CONSTANT = {  
  // 频道类型
  SUBSCRIBE_TYPE : {
    '1': '新闻中心',
    '2': '图片速递',
    '3': '行业动态',
    '4': '保密平台',
    '5': '貌易风采',
    '6': '通知公告',
    '7': '综合服务',
    '8': '人力专栏',
    '9': '内刊',
    '10': '文档库',
    '11': '影音库',
    '12': '党建园地'
  },

  DRAWER_TAB_DATA : ['频道', '我的'],

};

export default CONSTANT;
