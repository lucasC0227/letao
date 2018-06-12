
var letao
$(function(){
   
    //new 一个letao对象，调用这个letao对象里面的方法
    
     letao=new LeTao();
      letao.slider(); 
      //获取url传递参数的方法
      var   id = GetUrlByParamName("id");  
       letao.getDetailData(id);
       letao.getSwiper(id);
       letao.chooseSize();
       letao.addCart();
 
      
     
    
 
    
    
    
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
         //ajax获取页面详细信息
          getDetailData:function(id){
              $.ajax({
                  url:'/product/queryProductDetail',
                  data:{
                     id:id
                  },
                  success:function(backData){
                      //由于返回的size是一个字符串40-50，所以要把这个字符串变成数组去使用
                      var start=backData.size.split('-')[0]-0;
                      var end=backData.size.split('-')[1]
                      var arr=[];
                      for(var i=start;i<=end;i++){
                          arr.push(i)
                      }
                      backData.size=arr;    
                      console.log(backData);           
                       var html=   template('getDetailData',backData);
                       $('section.detail').html(html);
                       //mui数量输入框的调用
                       mui('.mui-numbox').numbox();
                       
                        $('.mui-numbox-btn-plus').on('click',function(){
                          var num=mui('.mui-numbox').numbox().getValue()
                          var numMax=$('.mui-numbox').attr('data-numbox-max');
                          if(num==4){
                         mui.toast('亲,已经没有库存了',{ duration:'short', type:'div' })
                          }
          
                        })
                     
                    
                       
                     
                     
                       
                        
                      
                       
                      
                      
                  }
              }) 
            
          },
          //ajax获取轮播图数据
          getSwiper:function(id){
              $.ajax({
                  url:'/product/queryProductDetail',
                  data:{
                    id:id
                 },
                  success:function(backData){
                     
                      var html=template('getSwiperTmp',backData)
                      $('#lunbotu').html(html);
                      letao.slider();

                  }
              })
          },
          //选中尺码
          chooseSize:function(){
                $('.detail').on('click','.size span',function(){
                 
                $(this).addClass('active').siblings().removeClass('active')
                })
          },
        
          //加入购物车的提示消息
          addCart:function(){
              $('.addCart').on('click',function(){
                  //判断是否选择尺码和数量
               
               var num=mui('.mui-numbox').numbox().getValue()
               if(!num){
                mui.toast('请选择数量',{ duration:'short', type:'div' })
               }
               if( $('.size span').hasClass('active')){
                  
            }else{
                mui.toast('请选择尺码',{ duration:'short', type:'div' })
            }
           
              })
          }

    
    }

  //获取url传递参数的值  其中url传递的是id
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

//   window.onload=function(){  
//     //使用GetUrlByParamName()方法获取url中参数名为questionnaireName的参数内容  
//             var  id = GetUrlByParamName("id");  
//             alert(id);  
//         }  



    
    