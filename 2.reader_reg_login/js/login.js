
 /*new Vue({
    el:"#app_login",
    data:{
        log_name:'',
        log_upwd:'',
        change01:{password:false},
        uname_tip:'',
        upwd_tip:'',
        // 是否触发ajax请求
        login_ajax:false,
    },
    methods:{      
    // 用户名框失去焦点
    uname_blur(){
        if(!this.log_name){
            this.uname_tip="用户名不能为空";
            this.login_ajax=false;
        }else{
            this.uname_tip="";
            this.login_ajax=true;
        }
    },
     // 密码框获取焦点,猫头鹰遮住眼睛
    upwd_focus(){
        this.change01.password=true;
    },
    // 密码框失去焦点,猫头鹰
    upwd_blur(){
        this.change01.password=false;
        if(!this.log_upwd){
            this.upwd_tip="密码不能为空";
            this.login_ajax=false;
        }else{
            this.upwd_tip="";
            this.login_ajax=true;
        }
    }, 
    // 登录 
    login(){
        console.log("登录");
        // 如果用户没输入直接点击登录
        if(!this.log_name){
            this.uname_tip="用户名不能为空";
            this.login_ajax=false;
        };
        if(!this.log_upwd){
            this.upwd_tip="密码不能为空";
            this.login_ajax=false;
        }
        var formData = {
            readername:this.log_name,
            password:this.log_upwd,
        };
        if(this.login_ajax){
            $.ajax({
                method:"post",
                url:"http://176.209.103.9:8000/v1/tokens",
                contentType:"application/json",
                dataType:"json",
                data:JSON.stringify(formData),
            })   
            .then((result)=>{
                console.log(result); 
                if(result.code==105){
                    this.upwd_tip="用户名或密码错误";
                }
                if(result.code==200){
                alert("登录成功");
                //返回自己的首页之前存储token与用户名
                window.localStorage.setItem("reader_token",result.data.token);
                window.localStorage.setItem("readername",result.readername);
                window.location.href="http://127.0.0.1:5500/book/1.index/index.html";
                    }  
                }) 
            }  
        },  
    }
})*/


new Vue({
    el:"#app_login",
    data:{
        log_name:'',
        log_upwd:'',
        change01:{password:false},
        uname_tip:'',
        upwd_tip:'',
        // 是否触发ajax请求
        login_ajax:false,
    },
    methods:{      
        // 用户名框失去焦点
        uname_blur(){
            if(!this.log_name){
                this.uname_tip="用户名不能为空";
                this.login_ajax=false;
            }else{
                this.uname_tip="";
                this.login_ajax=true;
            }
        },
        // 密码框获取焦点,猫头鹰遮住眼睛
        upwd_focus(){
            this.change01.password=true;
        },
        // 密码框失去焦点,猫头鹰
        upwd_blur(){
            this.change01.password=false;
            if(!this.log_upwd){
                this.upwd_tip="密码不能为空";
                this.login_ajax=false;
            }else{
                this.upwd_tip="";
                this.login_ajax=true;
            }
        }, 
      
    // 登录 
    login(){
        console.log("登录");
        // 如果用户没输入直接点击登录
        if(!this.log_name){
            this.uname_tip="用户名不能为空";
            this.login_ajax=false;
        };
        if(!this.log_upwd){
            this.upwd_tip="密码不能为空";
            this.login_ajax=false;
        }
        var formData = {
            readername:this.log_name,
            password:this.log_upwd,
        };
        if(this.login_ajax){
            axios({
                method:"post",
                url:"http://176.209.103.9:8000/v1/tokens",
                contentType:"application/json",
                dataType:"json",
                // data:JSON.stringify(formData),
                data:formData,
            })   
            .then((result)=>{
                console.log(result); 
                if(result.data.code==106 || result.data.code==105){
                    this.upwd_tip="用户名或密码错误";
                }
                if(result.data.code==200){
                alert("登录成功");
                //返回自己的首页之前存储token与用户名
                window.localStorage.setItem("reader_token",result.data.data.token);
                window.localStorage.setItem("readername",result.data.readername);
                window.location.href="http://127.0.0.1:5500/book/1.index/index.html";
                    }  
                }) 
            }  
        },  
    }
})














    
