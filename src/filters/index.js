import CONST from "../common/constant";

export  default {
    dayFormat : c =>  c.slice(0, 10),
    timeFormat : c => c.slice(-8,-3),
    jsonFormat :  val => {
        try { 
           return JSON.parse(val) 
        }catch (e) { 
           return '';
        } 
    },
    transformClass : i => CONST.SUBSCRIBE_TYPE[i]
}