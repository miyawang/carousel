let $buttons = $('#btnWrapper > button');
let $slides = $('#slides');
let $images = $slides.children('img');
let current = 0;
// console.log($images);
// makeFakeSlides($images); //这样就没有闭包了 
makeFakeSlides();   //1.做一些假图片
$slides.css({transform:'translateX(-500px'});
 //2.初始位置放到-500px
bindEvents();  //3.绑定事件
$(next).on('click',function(){
  goToSlide(current + 1);
})
$(prev).on('click',function(){
  goToSlide(current - 1);
})

let timer = setInterval(function(){
  goToSlide(current + 1);
},2000)

$('.container').on('mouseenter',function(){
  window.clearInterval(timer);
})
$('.container').on('mouseleave',function(){
  timer = setInterval(function(){
    goToSlide(current + 1);
  },2000)
})


function bindEvents() {
  $('#btnWrapper').on('click','button',function(e){
    //事件委托  当点击buttonWrapper里面的button时 才会触发    
    let $button = $(e.currentTarget);
    let index = $button.index();
    goToSlide(index);
    
  })
  // $buttons.eq(0).on('click',function(){
  //   console.log(current);
  //   //变换之前的索引
  //   if(current == 5){
  //     console.log('说明是从最后一张到第一张'); 
  //     $slides.css({transform:'translateX(-3500px'})
  //     .one('transitionend',function(){
  //       $slides.hide()
  //        .offset()   //返回一个对象 不加的话 浏览器会合并
  //        $slides.css({transform:'tranlateX(-500px)'})
  //        .show();      
  //     })   
  //   }else{
  //     $slides.css({transform:'translateX(-500px)'})
  //   }
  //   current = 0;
  // })
  
  // $buttons.eq(1).on('click',function(){
  //   $slides.css({transform:'translateX(-1000px'});
  //   current = 1;
  // })
  
  // $buttons.eq(2).on('click',function(){
  //   $slides.css({transform:'translateX(-1500px'});
  //   current = 2;
  // })
  // $buttons.eq(3).on('click',function(){
  //   $slides.css({transform:'translateX(-2000px'});
  //   current = 3;
  // })
  // $buttons.eq(4).on('click',function(){
  //   $slides.css({transform:'translateX(-2500px'});
  //   current = 4;
  // }) 
  // $buttons.eq(5).on('click',function(){
  //   if(current == 0){
  //     console.log('第一张到最后一张');    
  //   }
  //   $slides.css({transform:'translateX(0px'});
  //   current = 5;
  // }) 
}
function goToSlide(index){
  if(index > $buttons.length -1){
    index = 0;
  } else if (index < 0){
    index = $buttons.length - 1;
  }
  if(current === $buttons.length - 1 && index === 0){
    console.log(1);
    
    // 最后一张到第一张
    $slides.css({transform:`translateX(${-($buttons.length + 1) * 500}px)`})
    .one('transitionend',function(){
      $slides.hide()
       .offset()   //返回一个对象 不加的话 浏览器会合并
       $slides.css({transform:`translateX(${-(index + 1) * 500}px)`})
       .show();      
    })   
  } else if(current === 0 && index === $buttons.length - 1){
    console.log(2);
    
    // 第一张到最后一张
    $slides.css({transform:`translateX(0px)`})
    .one('transitionend',function(){
      $slides.hide()
       .offset()   //返回一个对象 不加的话 浏览器会合并
       $slides.css({transform:`translateX(${-(index + 1) * 500}px)`})
       .show();      
    })
  } else {
    console.log(3);      
    $slides.css({transform:`translateX(${- (index+1) * 500}px)`})
  }
  
  // console.log(index);
  current = index;
}

function makeFakeSlides(){
  let $firstCopy = $images.eq(0).clone(true); //子元素也clone
  // console.log($firstCopy[0].outerHTML);
  let $lastCopy = $images.eq($images.length - 1).clone(true);
  // console.log($lastCopy[0].outerHTML);
  $slides.append($firstCopy); //把第一张加在后面
  $slides.prepend($lastCopy); //把最后一张加在前面
}