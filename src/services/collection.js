
module.exports = {
    // obj传入vm   baseUrl传入'./api'
    init: function(obj, baseUrl){

        let axios = obj.axios;
        return {

            /**
             * 获得收藏列表
             * @param  ()空
             * @return promise
             */
            getCollectList: () =>  {
                return axios.get(`${baseUrl}/collectionList`);
            },

            
        }
    }
}