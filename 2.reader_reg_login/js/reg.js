new Vue({
    el:"#app_reg",
    data:{
        reg_name:'',
        reg_upwd01:'',
        reg_upwd02:'',
        change02:{password:false}, 
        // 用户名的提示
        uname_tip:'',
        // 密码提示
        upwd01_tip:'',
        // 密码是否一致
        upwd02_tip:'',
        // 用户名可用提示标志
        uname_correct:false,
        // 密码符合要求提示标志
        upwd_correct:false,
        // 密码符合要求
        upwd_check:false,
        // 是否发送ajax请求
        reg_ajax:false,
    },
    methods:{ 
        // 输入用户名的提示
        uname_focus(){
            console.log("开始输入用户名");
            this.uname_correct=false;
            this.uname_tip="6-32位的数字或者字母,不能含其他字符";      
        },
        // 用户名输入框失去焦点
        uname_blur(){
            // 首先判断是否符合规则
            var reg=/^[0-9a-zA-Z]{6,32}$/;
            // 1.1用户名不能为空
            if(!this.reg_name){
                this.uname_tip="用户名不能为空";
                this.reg_ajax=false;
            }else if(this.reg_name.length<6 || this.reg_name.length>32){
                this.uname_tip="用户名的长度是6-32位";
                this.reg_ajax=false;
            }else if(!reg.test(this.reg_name)){
                this.uname_tip="用户名只能是数字或者字母"; 
                this.reg_ajax=false;  
            }else{
                axios({
                    method:"post", 
                    url:"http://176.209.103.9:8000/v1/readers", 
                    contentType:"application/json",
                    dataType:"json",
                    data:{readername:this.reg_name},        
                })
                .then(result=>{
                    console.log(result);
                    if(result.data.code==206){
                    this.uname_tip="用户名已经存在,不可用";
                    }else{
                        this.uname_correct=true;
                        this.reg_ajax=true;
                    }
                })
            }         
        },
        // 输入密码的提示并控制猫头鹰手臂
        upwd01_focus(){
            this.change02.password=true; 
            this.upwd01_tip="6-32位字符(数字、字母、特殊字符)";              
        }, 
        // 密码框失去焦点 
        upwd01_blur(){
            this.change02.password=false;
            if(!this.reg_upwd01){
                this.upwd01_tip="密码不能为空";
                this.reg_ajax=false;
            }else if(this.reg_upwd01.length<6 || this.reg_upwd01.length>32){
                this.upwd01_tip="密码的长度是6-32位";
                this.reg_ajax=false;
            }else{
                this.upwd01_tip="";
                this.upwd_check=true;
            }          
        },
        upwd02_focus(){
            this.change02.password=true;
            this.upwd_correct=false;
            this.upwd02_tip="";
        },
        upwd02_blur(){
            this.change02.password=false;
            // 判断两次输入的密码是否一致
            if(this.reg_upwd01 !=this.reg_upwd02){
                this.upwd02_tip="您两次输入的密码不一致";
                this.reg_ajax=false;
            }else if (this.upwd_check){
                // 只有密码符合要求并且两次输入一致
                this.upwd_correct=true;
                this.reg_ajax=true;
            }
        }, 
        // 注册    
        register(){
            console.log("注册");
            console.log(this.reg_name);
            if(!this.reg_name){
                console.log(this.reg_name);
                this.uname_tip="用户名不能为空";
            }
            if(!this.reg_upwd01){
                this.upwd01_tip="密码不能为空";
            };
            if(!this.reg_upwd02){
                this.upwd02_tip="密码不能为空";
            };
            if(this.reg_upwd01 !=this.reg_upwd02){
                this.upwd02_tip="您两次输入的密码不一致";
            }
            if(this.reg_ajax){
                var formData = {
                    readername:this.reg_name,
                    password01:this.reg_upwd01,
                    password02:this.reg_upwd02,
                };
                // $.ajax({
                //     method:"post",
                //     url:"http://176.209.103.9:8000/v1/readers",
                //     contentType:"application/json",
                //     dataType:"json",
                //     data:JSON.stringify(formData),
                // }) 
                axios({
                    method:"post",
                    url:"http://176.209.103.9:8000/v1/readers",
                    contentType:"application/json",
                    dataType:"json",
                    data:formData
                })
                .then(result=>{
                console.log(result); 
                if(result.data.code==200){
                    console.log("注册成功");
                    // 返回自己的首页之前存储token与用户名
                    window.localStorage.setItem("reader_token",result.data.data.token);
                    window.localStorage.setItem("readername",result.data.readername);
                    // 跳转到主页
                    window.location.href="http://127.0.0.1:5500/book_2/1.index/index.html";
                    }  
                }) 

            }
             
        },    
    },  

})



