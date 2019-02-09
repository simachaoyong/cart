jQuery(function($){
    var $totalcheck=$(".totalcheck");
    var $procheck=$(".procheck");
    //所有的商品合计汇总
    var $totalSl=$(".total_r span");
    var $totalZj=$(".total_r b");
    //一开始就应邀计算一下那个价格的
    for(var i=0;i<$("#prolist li").length;i++){
        $(".pro_zj i").eq(i).html(($(".pro_sl div p").eq(i).html()*$(".pro_jg i").eq(i).html()).toFixed(2));
    }
    //全选和反选
    $totalcheck.on("click",function(){
        $procheck.prop("checked",this.checked);
        if(this.checked){
            $procheck.closest("li").addClass("colorbg");
            //所有的价格和数量都得想加
            totalAll();
        }else{
            $procheck.closest("li").removeClass("colorbg");
            $totalSl.html(0);
            $totalZj.html(0);
        }
    });
    //当点击每一个按钮的时候
    $procheck.on("click",function(){
       if(this.checked){
           $(this).closest("li").addClass("colorbg");
       }else{
           $(this).closest("li").removeClass("colorbg");
       }
       isAll();
    })
    //当点击批量删除的时候
    $(".pldel").on("click",function(e){
        e.preventDefault();
        if($(this).siblings(".totalcheck")[0].checked){
            $("#prolist li").remove();
            $totalSl.html(0);
            $totalZj.html(0);
            $(".totalcheck").prop("checked",false);
        }
    })
    //当点击每一个删除按钮的时候
    $(".pro_del i").on("click",function(){
        $(this).closest("li").remove();
        isAll();
        // console.log($(this).closest("li").find("input")[0].checked);
        if($("#prolist li").length==0){
            $(".totalcheck").prop("checked",false);
        }
    });
    //点击左右的增加或者减少的按钮
    $(".pro_sl div span").on("click",function(e){
        e.preventDefault();
        var $proNum=Number($(this).siblings("p").html());
        if($(this).hasClass("pro_sl_j")){
            $proNum--;
            if($proNum<1){
                return;
            }
            $(this).siblings("p").html($proNum);
        }else if($(this).hasClass("pro_sl_s")){
            $proNum++;
            $(this).siblings("p").html($proNum);
        }
        $(this).closest("li").find(".pro_zj i").html(($proNum*$(this).closest("li").find(".pro_jg i").html()).toFixed(2));
        isAll();
    })
    //定义一个判断的的函数
    function isAll(){
        //已经点击的长度
        var $checkedLen=$("#prolist li :checked").length;
        var $checkAlllen=$("#prolist li").length;
        if($checkedLen==$checkAlllen){
            $totalcheck.prop("checked",true);
            totalAll();
        }else{
            $totalcheck.prop("checked",false);
            //这里需要判断下有多少选中的，将选中的价格和数量加起来
            choiceLi($checkedLen); 
        }
    }
    //封装一个价格和数量汇总的函数
    function totalAll(){
        var $proZj=$(".pro_zj i");
        var $proSl=$(".pro_sl p");
        var $totalNum=0;
        var $totalPrice=0;
        var $Len=$("#prolist li").length;
        for(var i=0;i<$Len;i++){
            $totalNum+=Number($proSl.eq(i).html());
            $totalPrice+=Number($proZj.eq(i).html());
        }
        $totalSl.html($totalNum);
        $totalZj.html($totalPrice.toFixed(2));
    }
    //封装一个选中的
    function choiceLi(len){
        var $totalNum=0;
        var $totalPrice=0;
        var $choiceP=$("#prolist li :checked").closest("li").find(".pro_sl div p");
        var $choiceI=$("#prolist li :checked").closest("li").find(".pro_zj i");
        //选中的是多少个
        for(var i=0;i<len;i++){
            $totalNum+=Number($choiceP.eq(i).html());
            $totalPrice+=Number($choiceI.eq(i).html());
        }
        $totalSl.html($totalNum);
        $totalZj.html($totalPrice.toFixed(2));
    }
})