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
    console.log(screenWidth);
    //获取轮播图ul并添加过渡效果
    var loopUl = document.querySelector(".jd_banner");
    var liArr = loopUl.querySelectorAll("li");
    //index小圆点
    var jdSquare = document.querySelectorAll(".jd_square li");
    var index = 1;
    var timer = setInterval(function () {
        index++;
        //开启过渡
        loopUl.style.transition = "all .3s";
        //移动ul盒子
        loopUl.style.transform = "translateX("+index*screenWidth*(-1)+"px)";
    },1000);

    loopUl.addEventListener("webkitTransitionEnd",function () {
        if (index>jdSquare.length){
            index = 1;
            //关闭过渡
            loopUl.style.transition = "";
            //瞬间切换回用户看到的第一张图片
            loopUl.style.transform = "translateX("+index*screenWidth*(-1)+"px)";
        }else if(index<1){
            index = jdSquare.length;
            loopUl.style.transition = "";
            //瞬间切换回用户看到的第一张图片
            loopUl.style.transform = "translateX("+index*screenWidth*(-1)+"px)";
        }

        for (var i=0; i<jdSquare.length; i++){
            jdSquare[i].className = "";
        }
        jdSquare[index-1].className = "current";
    });


        var startX = 0;
        var moveX = 0;
        var distance = 0;

        loopUl.addEventListener('touchstart',function (e) {
            //手指放到轮播图上时，清除定时器
            clearInterval(timer);
            // 关闭过渡效果
            //loopUl.less.transition = '';
            startX = e.touches[0].screenX;
        });

        loopUl.addEventListener('touchmove',function (e) {
            moveX = e.touches[0].screenX-startX;
            //不用括号包住的话，会直接拼接在一起，不会运算
            loopUl.style.transform = "translateX("+(moveX+index*screenWidth*(-1))+"px)";
        });

        loopUl.addEventListener('touchend',function (e) {
            if (moveX>screenWidth/4){
                index--;
            }else if (-moveX>screenWidth/4){
                index++;
            }
            loopUl.style.transition = "all .3s";
            loopUl.style.transform = "translateX("+index*screenWidth*(-1)+"px)";

            timer = setInterval(function () {
                // 累加
                index++;

                // 将 过渡开启 管你三七二十一 只要进来 就开启过渡 保证 过渡效果一直存在
                loopUl.style.transition = 'all .3s';

                // 修改 ul的位置
                loopUl.style.transform = "translateX("+index*screenWidth*(-1)+"px)";
            },1000)
        });
}