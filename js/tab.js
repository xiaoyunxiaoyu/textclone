/**
 *
 * Created by hezhiyun on 2018/4/16.
 */
    function tap(ele,callback) {
        var startTime = 0;
        var intervalTime = 0;
        var maxTime = 250;
        var isMove = false;
        ele.addEventListener('touchstart',function (e) {
            startTime = Date.now();
            console.log("tapStart");
            isMove = false;
        });
        ele.addEventListener('touchmove',function (e) {
            isMove = true;
        });
        ele.addEventListener('touchend',function (e) {
            if (isMove){
                return;
            }
            intervalTime = Date.now()-startTime;
            if (intervalTime>maxTime){
                return;
            }
            console.log("tapEnd");
            callback(e);
        })
    }