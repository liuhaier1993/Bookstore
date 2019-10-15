new Vue({
    el:"#detail_app",
    data:{
        isCheck:true,
        // 图书详情
        details:{},
        // 推荐
        recommend:[],
        // 目录
        chapters:[],
        num:"",
        // 提交的评论
        content:"",
        // 获取的评论
        comment:[],
        comment_count:"",
    },
    created(){
        console.log(location.search);
        if(location.search!==""){
            var id=location.search.split("=")[1];
            console.log(id);  
            axios({
                url:"http://176.209.103.9:8000/v1/book/"+id,
                type:"get",  //请求类型
                dataType:"json"//返回值类型
            })
            .then(res=>{
                console.log(res);
                if(res.data.code==200){
                    this.details=res.data.data;
                    this.recommend=res.data.data.recommend;
                    this.chapters=res.data.data.chapters;
                    this.num=res.data.data.chapters.length;
                    this.comment=res.data.data.comment.reverse();
                    this.comment_count=res.data.data.comment_count;
                }              
            })
        }
    },
    methods:{
        change(){
            this.isCheck=!this.isCheck
        },
        addbookcase(){
            console.log("加入书架");
            // 先判断是否登录
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            var id=location.search.split("=")[1];
            if(token && username){
               axios({
                    // 请求方式
                    method:"post",
                    // url
                    url:"http://176.209.103.9:8000/v1/bookrack/",
                     // contentType 
                    contentType:"application/json",
                     // dataType
                    dataType:"json",
                    data:{book_id:id}, 
                    headers: {'Authorization': token},                
                })
                .then(result=>{
                    console.log(result);
                    if(result.data.code==200){
                        alert("添加成功!");
                    }else{
                        alert("添加失败,本书已添加!");
                    }
                })             
            }else{
                alert("尚未登录,点击确定跳转到登录页面");
                window.location.href="http://127.0.0.1:5500/book_2/2.reader_reg_login/2.login.html";
            }
        },
        submit(){
            console.log(this.content);
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            var id=location.search.split("=")[1];
            if(token && username){
                axios({
                    // 请求方式
                    method:"post",
                    // url
                    url:"http://176.209.103.9:8000/v1/comment/"+id,
                     // contentType 
                    contentType:"application/json",
                     // dataType
                    dataType:"json",
                    data:{content:this.content}, 
                    headers: {'Authorization': token},    
                })
                .then(result=>{
                    console.log(result);
                    if(result.data.code==200){
                        console.log("评论成功");
                        //刷新页面
                        window.location.reload();
                    }
                })           
            }else{
                alert("尚未登录,点击确定跳转到登录页面");
                window.location.href="http://127.0.0.1:5500/book_2/2.reader_reg_login/2.login.html";
            }
        }
    }
})