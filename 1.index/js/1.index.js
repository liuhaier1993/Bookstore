// 监控页面主体
new Vue({
    el:"#app",
    data:{ 
        isCheck:true, 
        // 默认图片是不显示的
        is_qthover:false,
        // 本周强推
        recommend:[],
        // 云起销售榜
        rankList:[],
        // 最新上架
        newArrival:[],
        // 大家都在看
        clickList:[],
        // 古言悬疑
        guyanxuanyi:[],
        // 现言青春
        xianyanqingchun:[],
        // 幻情科幻
        huanqingkehuan:[]
    },
    created(){
        console.log("页面加载完成");
        axios({
        method:"get",
        url:"http://176.209.103.9:8000/index/",  
        })
        .then(result=>{
            console.log(result);
            if(result.data.code==200){
                this.recommend=result.data.data.recommend;
                this.rankList=result.data.data.rankList;
                this.newArrival=result.data.data.newArrival;
                this.clickList=result.data.data.clickList;
                this.guyanxuanyi=result.data.data.guyanxuanyi;
                this.xianyanqingchun=result.data.data.xianyanqingchun;
                this.huanqingkehuan=result.data.data.huanqingkehuan;
            }         
        })
    },  
    methods:{
        // 切换本周强推与包月
        change01(){
            this.isCheck=!this.isCheck;
        },
        // 本周强推
        qthover(e){
            e.target.lastElementChild.style.display="block";
        },
        qtmove(e){
            e.target.lastElementChild.style.display="none"; 
        },
    }
})











