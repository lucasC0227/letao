//new 一个对象
var letao
$(function(){
     letao=new leTao()
    letao.setlocal();
    letao.historyData();
    letao.emptyHistory();
    letao.deleteHistory();
    letao.historyToProduct();


})

//创建一个构造函数
var leTao=function(){
}
//构造函数的原型里添加方法
leTao.prototype={
     //点击搜索按钮，将数据放到本地存储中
      setlocal:function(){

        $('.search-btn').on('click',function(){
       
            var text=$('.input-search').val();
            var id;
            //首先判断输入的内容是否为空，trim方法是将所有的空格去除
          
           
            
             var arr= window.localStorage.getItem('search');
             if(arr && JSON.parse(arr).length>0){
                 arr=JSON.parse(arr);
                 id= arr[arr.length-1].id+1;
             }
             else{
                 arr=[];
                 id=0;
             }
             arr.push({
                 "search":text,
                 "id":id
             })
             arr=JSON.stringify(arr);
             window.localStorage.setItem('search',arr);
           
            letao.historyData();  
            //跳转到商品列表的页面
            window.location.href='../../m/product.html?search='+text;
         })
       

      },  
       historyData:function(){
              //查询本地数据并渲染到页面上
        var result=JSON.parse(window.localStorage.getItem('search'))
        //   渲染数据
           var html=template('localStorage',result);
           $('.searchContent ul').html(html);  
       },
       //点击删除对应的记录
      deleteHistory:function(){
          $('.searchContent ul').on('click','span',function(){
              var id=$(this).attr('data-id');
             console.log(id);
            var arr= window.localStorage.getItem('search');
            if(arr){
                arr=JSON.parse(arr);
             
            }
            else{
                arr=[];
           
            }
            for (var i = 0; i < arr.length; i++) {
				// 7. 判断当前数组中有没有id和当前点击的删除按钮的id一致的值
				if(arr[i].id == id){
					// 8. 删除数组当前的arr[i]					
					arr.splice(i, 1);//第一个参数i代表要删除的数据的下标 1表示删除几个
				}
            }
            window.localStorage.setItem('search',JSON.stringify(arr));
            letao.historyData();

          })
      },


       //清空所有的搜索记录
       emptyHistory:function(){
           $('.empty-all').on('click',function(){
              
            window.localStorage.setItem('search','');
            letao.historyData();
  
           })
      
       },
       //点击历史搜索记录中的记录，跳转到产品列表
       historyToProduct:function(){
           $('.searchContent').on('click','a',function(){
             var   search=$(this).html()
             window.location.href='../../m/product.html?search='+search
           })
       }
 }

 











