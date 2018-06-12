//new 一个对象
var letao
$(function(){
  //取得url传递过来的参数
  var  search = GetUrlByParamName("search");  
     letao=new leTao()
     letao.pullDownRefresh();
     letao.searchProduct();
     letao.ajaxGetData(search);
     letao.priceSort();
     letao.numSort();
     letao.buyNow();

})

//创建一个构造函数
var leTao=function(){

}
//构造函数的原型里添加方法
leTao.prototype={
    //下拉刷新，上啦加载的方法
    pullDownRefresh:function(){
        mui.init({
            pullRefresh : {
              container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
              //  height:50,//可选,默认50.触发下拉刷新拖动距离,
             //   auto: false,//可选,默认false.首次加载自动下拉刷新一次
             //   contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            //    contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
             //   contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                   
                   setTimeout(function(){
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                   },1500)
                 //     1. 结束下拉刷新的函数
                  
      

                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              },
              up : {
                contentnomore:'在下实在不能给更多了',
                auto: false,
                heigth:1,
                callback :function(){
                 
                    setTimeout(function(){
                      mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                    },1500)
                      // 调用结束上拉加载更多并且传入了true既结束上拉加载更多并且提示没有更多数据
                  
      

                }

              }
   
      
            }
          });
    },
    //点击搜索按钮，根据页面的关键字搜索
     searchProduct:function(){
       //在mui的下拉刷新，上拉加载的查建中，不能绑定点击事件，只能用tap；
       $('.search-btn ').on('tap',function(){
            var  text=   $('.input-search').val();

          //ajax获取渲染的数据
           letao.ajaxGetData(text);
        

       })
     },
     //ajax渲染数据,获取商品列表的公共函数
     ajaxGetData:function(proName,price,num){
      $.ajax({
        url:'/product/queryProduct',
        data:{
          proName:proName,
          price:price,//价格
          num:num,    //销量
           page:1,
           pageSize:6
        },
        success:function(backData){
          console.log(backData);
          var html= template('ajaxGetData',backData);
          $('#man').html(html);

        }
    })

     },
     //点击价格，按价格排序 同样是在上下拉框架中，要用tap
       priceSort:function(){
         var sortKey;
           $('.btn-price').on('tap',function(){
             //点击后，需要根据价格排序里存的sort-key机型升序或者降序
             sortKey=$(this).attr('sortKey');
             //如果取值是1，进行升序，否则如果是2降序；
             if(sortKey==1){
              letao.ajaxGetData('',1,'');
              sortKey=$(this).attr('sortKey','2')
             }else if(sortKey==2){
              letao.ajaxGetData('',2,'');
              sortKey=$(this).attr('sortKey','1')
             }

           })
       },
       //点击销量，按数量排序 同样是在上下拉框架中，要用tap
       numSort:function(){
          var sortKey2;
          $('.btn-num').on('tap',function(){
            sortKey2=$(this).attr('sortKey2');
            if(sortKey2==1){
              letao.ajaxGetData('','',1);
              sortKey2=$(this).attr('sortKey2',2)
            }
            else if(sortKey2==2){
              letao.ajaxGetData('','',2);
              sortKey2=$(this).attr('sortKey2',1)
            }
          })
       },
       //点击立刻购买跳转到详细页面，并且将url的id传过去
       buyNow :function(){
         $('#man').on('tap','.buyNow',function(){
          var id = $(this).attr('data-id');
          console.log(id);
          window.location.href='../../m/productDetail.html?id='+id;
         })
       }
     
}

  //获取url床底参数的值  其中url传递的是search
  function GetUrlByParamName(name)  
  {  
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
      var URL =  decodeURI(window.location.search);  
      var r = URL.substr(1).match(reg);  
      if(r!=null){  
          //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码  
          return  decodeURI(r[2]);  
      };  
      return null;  
  };  

  









