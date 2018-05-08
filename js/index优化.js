/**
 * Created by hezhiyun on 2018/4/13.
 */
window.onload = function () {
    //顶部滚动效果
    topScroll();
    //倒计时
    cutDownTime();
    //轮播图
    banner();
};
//顶部滚动效果
function topScroll() {
    var jdHeader = document.querySelector(".jd_header");
    var headerNav = document.querySelector(".header_nav");
    var tolHeight = headerNav.offsetTop + headerNav.offsetHeight;
    var num = 0;
    window.onscroll = function () {
        //兼容写法
        var bodyScrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        num = bodyScrollTop/tolHeight;
        //num = num.toFixed(1);//让小数保留后1位
        num>1?num = 1:num;
        /*
         *
         * 注意：js通过style不能获取外联的css样式！！！！！
         * 但是可以设置css样式，使用js修改样式，会变成行内式
         *
         * */
        jdHeader.style.backgroundColor = "rgba(201,21,35,"+num+")";
        console.log(jdHeader.style.backgroundColor);
    }
}

//倒计时
function cutDownTime() {
    var tolHour = 3;
    var tolSec = tolHour*60*60;
    var liArr = document.querySelectorAll(".main_content:nth-child(1) .content_top li");
    var time = setInterval(function () {
        var hour = Math.floor(tolSec/3600);
        var min = Math.floor(tolSec/60%60);
        var sec = tolSec%60;
        //分别取出个位，十位的数并且添加到对应的li标签中
        liArr[0].innerHTML = Math.floor(hour/10);
        liArr[1].innerHTML = hour%10;
        liArr[3].innerHTML = Math.floor(min/10);
        liArr[4].innerHTML = min%10;
        liArr[6].innerHTML = Math.floor(sec/10);
        liArr[7].innerHTML = sec%10;
        tolSec--;
        if (tolSec<0){
            clearInterval(time);
            console.log("结束啦，你买不到啦！");
        }
    },1000)
}

//轮播图
function banner() {
    //获取屏幕的宽
    var screenWidth = document.body.offsetWidth;
    //获取轮播图ul并添加过渡效果
    var loopUl = document.querySelector(".jd_banner");
    //index小圆点
    var jdSquare = document.querySelectorAll(".jd_square li");
    var index = 1;

    //优化代码，把常用到的抽取出来
    function startTransition(){
        loopUl.style.transition = "all .3s";
    }
    function endTransition() {
        loopUl.style.transition = "";
    }
    function setTransform(distance) {
        loopUl.style.transform = "translateX("+distance+"px)";
    }


    var timer = setInterval(function () {
        index++;
        //开启过渡
        startTransition();
        //移动ul盒子
        setTransform(index*screenWidth*(-1));
    },1000);

    loopUl.addEventListener("webkitTransitionEnd",function () {
        if (index>jdSquare.length){
            index = 1;
            //关闭过渡
            endTransition();
            //瞬间切换回用户看到的第一张图片
            setTransform(index*screenWidth*(-1));
        }else if(index<1){
            index = jdSquare.length;
            endTransition();
            //瞬间切换回用户看到的第一张图片
            setTransform(index*screenWidth*(-1));
        }

        for (var i=0; i<jdSquare.length; i++){
            jdSquare[i].className = "";
        }
        jdSquare[index-1].className = "current";
    });


    var startX = 0;
    var moveX = 0;

    loopUl.addEventListener('touchstart',function (e) {
        //手指放到轮播图上时，清除定时器
        clearInterval(timer);
        //获取ul在屏幕中的初始值
        startX = e.touches[0].screenX;
    });

    loopUl.addEventListener('touchmove',function (e) {
        //获取手指滑动ul的值（当前值-初始值）
        moveX = e.touches[0].screenX-startX;
        //不用括号包住的话，会直接拼接在一起，不会运算
        setTransform((moveX+index*screenWidth*(-1)));
    });

    loopUl.addEventListener('touchend',function (e) {
        //当手指滑动了屏幕的1/4以上，才会滚动Ul，否则无效（吸附现象）
        if (moveX>screenWidth/4){
            index--;
        }else if (-moveX>screenWidth/4){
            index++;
        }
        startTransition();
        setTransform(index*screenWidth*(-1));

        timer = setInterval(function () {
            // 累加
            index++;
            // 将 过渡开启 管你三七二十一 只要进来 就开启过渡 保证 过渡效果一直存在
            startTransition();
            // 修改 ul的位置
            setTransform(index*screenWidth*(-1));
        },1000)
    });
}

//封装的tap事件
function tap(ele,callback) {
    var startTime = 0;
    var intervalTime = 0;
    var maxTime = 250;
    var isMove = false;
    ele.addEventListener('touchstart',function (e) {
        startTime = Date.now();
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
        callback();
    })
}