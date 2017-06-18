
// const [homeService, baseUrl] = [require('./home'), '/api'];
var homeService = require('./home');
var collectionService = require('./collection');
var authService = require('./auth');
var baseUrl = 'http://wechatdev.prolliance.cn:33224/Service';
var baseUrl1= '/api';
var service = null;

export default {
    init: function(vm) {        
        service = {
            Home: homeService.init(vm, baseUrl1),
            Collect : collectionService.init(vm, baseUrl1),
            Auth : authService.init(vm, baseUrl)
        };
        return service;
    },
    getService: function(){
        return service;
    }
};
