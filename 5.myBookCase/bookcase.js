
new Vue({
    el:"#mybook_app",
    data:{ 
        // 收藏数量
        bookNum:"",
        // 收藏书的信息
        bookCase:[], 
        // 个人信息
        user_info:{},
        head_src:"",
    },
    methods:{
        trenter(e){
            e.target.classList.add("top");
        },
        trleave(e){
            e.target.classList.remove("top");
        },
        is_check(e){
            console.log("切换选中");
            e.target.classList.toggle("ui-checkbox-checked");
        },
        check_all(){
            console.log("全选");
            // 选中单选按钮
            var checkboxui=document.querySelectorAll(".ui-checkbox:not(.checkbox_all)");
            console.log(checkboxui);
            // 全选按钮
            var checkboxall=document.getElementsByClassName("ui-checkbox checkbox_all")[0];
            console.log(checkboxall);
            checkboxall.classList.toggle("ui-checkbox-checked");
            for(var elem of checkboxui){
                elem.classList.toggle("ui-checkbox-checked");
            }
        },
        delSelf(book_id){
            console.log(book_id);
            alert("您确定要删除吗?");
            var token = window.localStorage.getItem('reader_token');
            // var username = window.localStorage.getItem('readername');
            axios({
                method:"delete",
                url:"http://176.209.103.9:8000/v1/bookrack/",
                contentType:"application/json",
                // dataType
                dataType:"json",
                data:{book_id:book_id},
                headers:{
                    "Authorization":token
                }
            }) 
            .then(result=>{
                console.log(result);
                if(result.data.code==200){
                    window.location.reload();
                }  
            }) 
        }

    },
    // 页面初始化
    beforeCreate(){
        console.log("页面初始化");
        var token = window.localStorage.getItem('reader_token');
        var username = window.localStorage.getItem('readername');
        if(!token || !username){
            // 如果没有登录就跳转到登录页面
           window.location.href="http://127.0.0.1:5500/book_2/2.reader_reg_login/2.login.html";       
        }
    },
    created(){
        var token = window.localStorage.getItem('reader_token');
        // var username = window.localStorage.getItem('readername');
        axios({
            method:"get",
            url:"http://176.209.103.9:8000/v1/bookrack/",
            headers:{
                "Authorization":token
            }
        }) 
        .then(result=>{
            console.log(result);
                this.bookCase=result.data.data.book.reverse();
                this.bookNum=result.data.data.book.length;
                this.user_info=result.data.data.user;
                this.head_src= "http://176.209.103.9:8000/media/"+(result.data.data.user.avatar);
        })      
    }
})




