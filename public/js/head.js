// 监控页头
new Vue({
    el:"#login_app",
    data:{
        // 切换是否登录
        isLogin:false,
        // 切换头像下面的菜单
        isHover:false,
        // 头像
        src:"",
        readername:"",
    },
    // 让页头去请求是否登录拿头像
    created(){
        console.log("测试ajax请求");
        var token = window.localStorage.getItem('reader_token');
        var username = window.localStorage.getItem('readername'); 
        axios({
            method:"get",
            url: "http://176.209.103.9:8000/v1/readers/"+username,
            headers:{
                "Authorization": token
            }
        })
        .then((result)=>{
            console.log(result);
            if(result.data.readername){
                console.log("已经登录");
                this.isLogin=true;
                this.readername=result.data.readername;        
                if(result.data.data.avatar){
                    console.log("有头像");
                    this.src="http://176.209.103.9:8000/media/"+(result.data.data.avatar);
                }
            }
        })  
    },
    methods:{
        // 切换头像下面的菜单
        mousein(){
            this.isHover=true;
        },
        mouseout(){
            this.isHover=false;
        },
        // 退出
        logout(){
            console.log("退出");
            window.localStorage.removeItem('reader_token');
            window.localStorage.removeItem('readername');
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            if (!token && !username){
                alert("退出成功");
                // 跳转到首页
                window.location.href="http://127.0.0.1:5500/book_2/1.index/index.html";
            }
        }
    }
})