//滑块下拉的功能
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});



 $(function(){
//用ajax调取一级菜单栏的数据
  $.ajax({
      url:'/category/queryTopCategory',
      success:function(backData){
        //   console.log(backData);
        var result=template('topCategory',backData);
        // console.log(result);
         $('.left ul').html(result);
      }
  })

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
  

//点击一级菜单的按钮，通过ajax获取数据
   $('.left ul').on('click','li',function(){
       
        var id=$(this).attr('dataId');
     
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


 })