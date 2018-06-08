$(function(){

//new 一个letao对象，调用这个letao对象里面的方法

var  letao=new LeTao();
  letao.slider(); 
  letao. scroll();

})

//用面向对象的方法来使用



//创建一个构造函数
var LeTao=function(){

}
//在构造函数的原型中添加方法
LeTao.prototype={
     //轮播图的方法
     slider:function(){
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
      });

     },
     //滑块下拉的方法
     scroll:function(){
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
     }

}

