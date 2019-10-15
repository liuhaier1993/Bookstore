$(function(){ 
    var arr=$(".shuff-flag img"); 
    var arr02=$(".shuff-point li");  
    var index=0;
    var banner=$("#banner");
    
    // 轮播的方向是右边
    function autoPlay(){         
        arr.eq(index).hide();    
        arr02.eq(index).removeClass("active");
        index++;
        if(index==arr.length){
            index=0
        }       
        // arr.eq(index).show();
        // 以淡入的方式显现
        arr.eq(index).fadeIn(900);
        arr02.eq(index).addClass("active");                         
    }

    // 向左切换 
    function autoPlayleft(){
        arr.eq(index).hide();
        arr02.eq(index).removeClass("active");
        index--;
        if(index==-1){
            index=arr.length-1;
        }    
        // arr.eq(index).show();
        arr.eq(index).fadeIn(900);
        arr02.eq(index).addClass("active");
    }

    // 实现每隔2秒轮播图片  
    // timer=setInterval(autoPlay,2000);
    timer=setInterval(autoPlay,2900);

    // 当鼠标悬停,停止轮播
    banner.mouseover(function(){
        clearInterval(timer);
    }) 
       
    banner.mouseout(function(){
        timer=setInterval(autoPlay,2900);
    }) 

    // 实现点击小原点显示对应的图片  
    arr02.click(function(){  
   /* 获取当前点击元素在集合的索引 */ 
    var i=$(this).index();
    /* 隐藏其他元素 */
    arr.hide();
    arr02.removeClass("active");
    //只显示当前索引对应的元素 
    arr.eq(i).show();
    arr02.eq(i).addClass("active");
    })
    
     

    // 实现点击左右两边的符号立即切换图片  
    $(".click-flag").click(function(){
        // 判断函数的调用者是否存在某个类
        if($(this).hasClass("btnNext")){
            setTimeout(autoPlay,0);
        }
        else if($(this).hasClass("btnPrev")){
            setTimeout(autoPlayleft,0);
        }      
    })
})     