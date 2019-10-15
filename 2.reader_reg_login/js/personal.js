new Vue({
    el:"#app",
    data:{
        nickname:"",
        sign:"",
        gender:"",
        email:"",
        // 默认图片
        src:"./images/头像.png",
        // 默认图片2
        src01:"./images/头像.png",
        // 原始照片
        orignal_src:"",
        showBox:true,   
    }, 
    // 页面初始化
    beforeCreate(){
        console.log("页面初始化");
        var token = window.localStorage.getItem('reader_token');
        var username = window.localStorage.getItem('readername');
        if(!token || !username){
           window.location.href="http://127.0.0.1:5500/book_2/2.reader_reg_login/2.login.html";       
        }
    },
    // 页面刷新就get请求
    created(){
        console.log("测试ajax请求");
        var token = window.localStorage.getItem('reader_token');
        var username = window.localStorage.getItem('readername');
        axios({
            // 请求方式
            method:"get",
            // url
            url:"http://176.209.103.9:8000/v1/readers/" + username,  
            headers:{
                "Authorization":token
            }         
        })
        .then(result=>{
            console.log(result);
            if(result.data.code==200){
                this.nickname=result.data.data.nickname;
                this.sign=result.data.data.sign;
                this.gender=result.data.data.gender;
                this.email=result.data.data.email;
                if(result.data.data.avatar){
                    // 但是属性不同,属性拿不到会报错
                    this.src="http://176.209.103.9:8000/media/"+(result.data.data.avatar);
                    // 保存原始图片
                    this.orignal_src="http://176.209.103.9:8000/media/"+(result.data.data.avatar);
                    } 
                }
            })
    },
    methods:{
        // 切换基本信息与上传头像
        changeBox(){
            console.log("切换");
            this.showBox=! this.showBox;
        }, 
        // 保存基本信息
        changeInfo(){
            console.log("修改个人信息")
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            var post_data = {'nickname':this.nickname,'sign':this.sign,'gender':this.gender,'email':this.email};
           axios({
                // 请求方式
                method:"put",
                url:"http://176.209.103.9:8000/v1/readers/" + username,
                contentType:"application/json",
                dataType:"json", 
                data:post_data,               
                headers:{
                    "Authorization":token
                }        
            })
            .then(result=>{
                if (200 == result.data.code){
                    alert("修改成功");
                    window.location.reload();
                }else{
                    alert("服务器繁忙,请稍后再试!");                 
                }
            })
        },
        // 预览图片
        changepic(e){
            // 获得目标元素
            console.log(e.target);
            this.src=getObjectURL(e.target.files[0]);
        },
        // 取消预览的图片
        cancel(){
            // 如果用户之前有上传图片,就用之前上传的
            if(this.orignal_src){
                this.src=this.orignal_src;
            // 如果没有就用默认的
            }else{
                this.src=this.src01;
            }     
        } ,
        // 上传图片
        upload(){
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            var url = 'http://176.209.103.9:8000/v1/readers/' + username + '/avatar';
            formdata = new FormData();
            // var avatar_file=$('#avatar')[0].files[0];
            var avatar_file=document.getElementById("avatar").files[0];
            console.log(avatar_file);
            formdata.append("avatar",avatar_file);
            axios({
                method:"post",
                url: url,
                processData: false,
                contentType: false,
                // enctype属性规定在发送到服务器之前应该如何对表单数据进行编码
                enctype:"multipart/form-data",   
                data: formdata,
                headers:{
                    "Authorization":token
                    }             
                })
                .then(result=>{
                    if (result.data.code == 200) {
                        alert('修改头像成功！');
                        // 修改成功,跳转到个人设置首页
                        this.showBox=! this.showBox;
                        window.location.onload();
                    } else {
                        alert('失败！')
                        }
                    })
                }, 
            }
    })


//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
        console.log(url);
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
        console.log(url);
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
        console.log(url);
    }
    return url ;
}
