/* 用户登录获取信息 */

module.exports = {
    // obj传入vm   baseUrl传入'./api'
    init: function(obj, baseUrl){

        let axios = obj.axios;
        return {

            /**
             * 通过code获取用户信息
             * @param  ()空
             * @return promise
             */
            getUserInfo: (code) =>  {
                return axios.get(`${baseUrl}/api/Wechat/Login?code=${code}`);
            },

            
        }
    }
}