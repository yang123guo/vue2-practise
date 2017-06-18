
module.exports = {
    // obj传入vm   baseUrl传入'./api'
    init: function(obj, baseUrl){

        let axios = obj.axios;
        return {

            /**
             * 获得新闻列表
             * @param  ()空
             * @return promise
             */
            getHomeList: () =>  {
                return axios.get(`${baseUrl}/newsList`);
            },

            /**
             * 获得订阅列表
             * @param  ()空
             * @return promise
             */
            getSubscribeList: () =>  {
                return axios.get(`${baseUrl}/subscribe`);
            },
            
        }
    },
    
    init2 : function(a,b){
        console.log(a,b)
    }
}