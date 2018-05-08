/**
 *
 * Created by hezhiyun on 2018/4/14.
 */
window.onload = function () {
    touchLeft();
};
function touchLeft() {
    //！！！！！！！！！！！由于下面的tap()中传入的是ul，所以这里的绑定的事件不能选择ul的父元素，不然会先执行tap()中的touchstart,再执行ul父元素的touchstart(冒泡的现象)，而且由于点击没有产生move,所无论target.index*liHight是多少，都会被0迭代。
    var mainLeft = document.querySelector(".main_left");
    var ul = document.querySelector(".main_left ul");
    var startY = 0;
    var moveY = 0;
    var distance = 0;
    var headerHeight = document.querySelector(".list_header").offsetHeight;
    var topHeight = mainLeft.offsetHeight - headerHeight;
    var ulHeight = ul.offsetHeight;
    //可以拉动的距离
    var delayDistance = 100;
    var maxDistance = 0;
    var minDistance = topHeight - ulHeight;

    function move(distance) {
        ul.style.transform = "translateY("+distance+"px)";
    }
    //不能选择mainLeft来绑定（不然会冒泡）
    ul.addEventListener('touchstart',function (e) {
        startY = e.touches[0].screenY;
        console.log("touchstart");
    });
    ul.addEventListener('touchmove',function (e) {
        ul.style.transition = "";
        //每次移动的距离
        moveY = e.touches[0].screenY-startY;
        console.log("moveY:"+e.touches[0].screenY);
        //不能超出移动的范围
        if ((moveY+distance)>maxDistance+delayDistance){
            moveY = 0;
            distance = maxDistance+delayDistance;
        }else if ((moveY+distance)<(minDistance-delayDistance)){
            moveY = 0;
            distance = minDistance-delayDistance;
        }
/*        console.log("moveY+distance:"+(moveY+distance));
        console.log("minDistance:"+minDistance);*/
        move(moveY+distance);
    });
    ul.addEventListener('touchend',function (e) {
        //ul目前的距离
        distance += moveY;
        if (distance>maxDistance){
            distance = maxDistance;
        }else if (distance<minDistance){
            distance=minDistance;
        }
        ul.style.transition = "all .5s";
        console.log("touchend");
        move(distance);
    })

    //第二大部分逻辑
    /*1、点击，字体变红，右边框消失
     *2、点击li，对应的li移动到第一位
     * 3、最后面的几个li不能超出最小范围
     * */

     var ul = document.querySelector(".main_left ul");
     var liArr = document.querySelectorAll(".main_left ul li");
     var liHight = liArr[0].offsetHeight;
     var target;
     for (var i=0; i<liArr.length;i++){
        liArr[i].index = i;
     }
     tap(ul, function (e) {
        //1、点击，字体变红，右边框消失
         target = e.target.parentNode;
         for (var i = 0 ;i<liArr.length;i++){
            liArr[i].className = "";
         }
         target.className = "current";

         //2、点击li，对应的li移动到第一位
         //判断移动的距离是否超出范围
         var tapDistance = target.index*liHight*-1;
         if (tapDistance<minDistance){
             tapDistance=minDistance;
         }
         move(tapDistance);
     })


}