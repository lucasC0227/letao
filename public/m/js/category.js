//new 一个对象

$(function(){
    var letao=new leTao()
    letao.scroll();
    letao.getFirstCategory();
    letao.getSecondCategory();
    letao.clickLeftList();

})

//创建一个构造函数
var leTao=function(){

}
//构造函数的原型里添加方法
leTao.prototype={
//滑块下拉的功能
 scroll:function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
 },
 //调取一级分类菜单栏

 getFirstCategory:function(){
    $.ajax({
        url:'/category/queryTopCategory',
        success:function(backData){
          //   console.log(backData);
          var result=template('topCategory',backData);
          // console.log(result);
           $('.left ul').html(result);
        }
    })

 },

 getSecondCategory:function(){
   getRight(1);
  
  
   //封装函数 获取第二个分类的页面
  function getRight(id){
    $.ajax({
        url:'/category/querySecondCategory',
        type:'get',
        data:{
            id:1
        },
        success:function(backData){
          
            var result=template('secondCategory',backData);
            console.log(result);
            $('.right .mui-row').html(result)
        }
    }) 
  }

 },
   clickLeftList:function(){

//点击一级菜单的按钮，通过ajax获取数据
$('.left ul').on('click','li',function(){
       
    var id=$(this).attr('dataId');
    $(this).addClass('active').siblings().removeClass('active');
    

  
      $.ajax({
        url:'/category/querySecondCategory',
        type:'get',
        data:{
            id:id
        },
        success:function(backData){
          
            var result=template('secondCategory',backData);
            console.log(result);
            if(result){
            $('.right .mui-row').html(result)
            }
            else{
                $('.right .mui-row').html('<p>暂时没有更新商品数据，客官请等待</p>')
            }
        }
    })

})

   }

 

 
}





