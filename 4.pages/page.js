new Vue({
    el:"#page_app",
    data:{
        chapterName:"",
        pages:[],
        book_class:"",
        b_name:"",
        c_name:"",
        last:"",
        next:"",
    },
    created(){
        console.log("页面初始化");
        var id=location.search.split("=")[1];
        $.ajax({
            method:"get",
            url:"http://176.209.103.9:8000/chapter/1/"+id,
            success:(res)=>{
                console.log(res);
                this.chapterName=res.data.chapter_info.c_name;
                this.pages=res.data.chapter_info.content;
                this.book_class=res.data.book_info.classification;
                this.b_name=res.data.chapter_info.b_name;
                this.c_name=res.data.chapter_info.c_name;
                this.last=res.data.chapter_info.last_chapter;
                this.next=res.data.chapter_info.next_chapter;
            }
        })
    }
})

