/**
 * Created by Old-biao on 2017/4/30.
 */
//服务
angular.module("service",[])
    .factory("one",function () {
    return {
        name:"zhangsan"
    }
}).factory("two",function () {
    return function () {
        alert("two")
    }
})