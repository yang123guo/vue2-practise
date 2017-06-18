import Home from '../views/home/home'

export default [
      {
        path: '',
        redirect: '/home'
      },
      // 首页
      {
        path : '/home',
        name : 'home',
        component : Home, 
      },      
      // 我的收藏
      {
        path : '/collection',
        name : 'collection',
        component : resolve => require(['../views/mine/collectList'], resolve)
      },
      // 我要上传
      {
        path : '/upload',
        name : 'upload',
        component : resolve => require(['../views/mine/upload'], resolve)
      },
      // 频道页面   
      {
        path : '/channel',
        name : 'channel',
        component : resolve => require(['../views/channel/channel'], resolve)
      },
      {
          path: '/channelDetail', //频道详情页
          name : 'channelDetail',
          component : resolve => require(['../views/channel/channelDetail'], resolve)
      }, 
      {
          path: '/uploadImg', //频道详情页
          name : 'uploadImg',
          component : resolve => require(['../views/mine/uploadImg'], resolve)
      },
      {
        path : '*',
        name : 'notFound',
        component : resolve => require(['../views/notFound'], resolve)
      }     
];

