$(document).ready(function(){

  $(".main").hover(function(){
    $(this).find(".sub").stop().slideDown();
  },function(){
    $(this).find(".sub").stop().slideUp();
  });

  let imgon_w= $(".slideon ul li").width();  
	let imgon_n= $(".slideon ul li").length; 
  let soldidxon=0;  
	let sindexon=0;  

  $(".slideon ul li:last").prependTo(".slideon ul");
  //목록 마지막 이미지를 목록 안의 가장 앞으로 배치
  $(".slideon ul").css({ left:-imgon_w}); 
	//첫번째 이미지가 보여야 하므로 앞으로 온 맨뒤 이미지를 왼쪽으로 한칸 밀어두기


  //index번째 비주얼이미지 이동하는 함수생성
  function slideonImg(sindexon,m){   //m은 prev와 next를 판단 

    if(m==0){ //prev눌렀을때
    //이전 이미지가 슬라이드된후 마지막 이미지를 목록안의 제일 앞으로 배치

    $(".slideon ul").stop(true,true).animate({
      left:"+="+imgon_w+"px"},600,"easeOutCubic",function(){  
      $(".slideon ul li:last").prependTo(".slideon ul");				
      $(".slideon ul").css({ left:-imgon_w });
    });
    $(".slideon_btn ul li").eq(soldidxon).removeClass("activeon");  //기존버튼 비활성화
    $(".slideon_btn ul li").eq(sindexon).addClass("activeon");  //선택버튼 활성화


    }else{ //next눌렀을때
    //다음 이미지가 슬라이드된후 제일앞의 이미지를 목록안의 제일 마지막으로 배치

    $(".slideon ul").stop(true,true).animate({
      left:"-="+imgon_w+"px"},600,"easeOutCubic",function(){  
      $(".slideon ul li:first").appendTo(".slideon ul");				
      $(".slideon ul").css({ left:-imgon_w });
    });
    $(".slideon_btn ul li").eq(soldidxon).removeClass("activeon");  //기존버튼 비활성화
    $(".slideon_btn ul li").eq(sindexon).addClass("activeon");  //선택버튼 활성화

    }
    soldidxon=sindexon;

  };


  //슬라이드 자동함수 생성
  function slideonAuto(){
  
    sindexon++;
    if(sindexon==imgon_n){ 
      sindexon=0;
    }
    slideonImg(sindexon,1);
  
  };

  timeron=setInterval(slideonAuto,4000);

  //좌우버튼.....
  $(".nexon").click(function(){

    clearInterval(timeron);
    sindexon++;
    if(sindexon==imgon_n){ 
      sindexon=0;
    }
    slideonImg(sindexon,1);
    timeron=setInterval(slideonAuto,4000);

  });

  $(".preon").click(function(){

    clearInterval(timeron);
    sindexon--;
    if(sindexon<0){ 
      sindexon=imgon_n-1; 
    }
    slideonImg(sindexon,0);
    timeron=setInterval(slideonAuto,4000);

  });


  
  //하단버튼.....
  $(".slideon_btn ul li").click(function(){

    clearInterval(timeron);
    sindexon = $(this).index();

    //재배치
    for(let i=1; i <= imgon_n; i++){
			$(".slideon ul li.i"+i).appendTo(".slideon ul");
		}
		$(".slideon ul li:last").prependTo(".slideon ul");	
		$(".slideon ul li:last").prependTo(".slideon ul");	

    /*위의 for문을 풀어서 쓰면....(1,2,3,4)
    $(".slide ul li.i1").appendTo(".slide ul");
    $(".slide ul li.i2").appendTo(".slide ul");
    $(".slide ul li.i3").appendTo(".slide ul");
    $(".slide ul li.i4").appendTo(".slide ul");

    ->for문 다음 2문장을 실행하면....맨 마지막것을 맨앞으로 보내라->맨끝에 있는 2개을 앞으로 보냄(3,4,1,2)
    $(".slide ul li.i3").appendTo(".slide ul");
		$(".slide ul li.i4").appendTo(".slide ul");
		$(".slide ul li.i1").appendTo(".slide ul");
		$(".slide ul li.i2").appendTo(".slide ul");	  
    */

    for (let i=1; i<=sindexon+1;i++) {
			slideonImg(sindexon,1);
		}

    timeron=setInterval(slideonAuto,4000); 

  });

  $(".title").click(function(){

    $(this).siblings(".title").removeClass("active");
    // siblings()괄호 안에있는 것은 생략도 가능
    $(this).toggleClass("active");
    $(this).siblings(".desc").stop().slideUp();
    $(this).next().stop().slideToggle();

    // 하위개념을 찾을때 find
    // 형제요소에서 찾을때 next prev

    let dataImage = $(this).attr("data-image");
    $(".image img").attr("src",dataImage).hide().fadeIn();
    // attr(한개)쓰면 불러오는것, attr(두개)쓰면 바꾸는것
    
  });

  let $img = $(".changeimg ul li");
  let oldImg=0;  
  let newImg=0; 
  let count=$img.length;


  //이미지&텍스트 전환효과 함수
  function changeImg(newImg){ 

    if(oldImg != newImg){
      $img.eq(oldImg).removeClass("imgVisible");
			$img.eq(newImg).addClass("imgVisible"); 
    };
    oldImg = newImg;

  };

  function autoImg(){

    newImg++;
    if(newImg>count-1){ 
      newImg=0;
		}
		changeImg(newImg);

  };

  timer1=setInterval(autoImg,5000); 


  // $(window).scroll(function(){
  //   $("#txt1").text($(this).scrollTop());
  // });

  $(window).scroll(function(){
      
    let scrollpos =$(this).scrollTop();

      if(scrollpos>=1222 && scrollpos<2355){
        $(".every").css({"animation":"every 1s linear","animation-fill-mode":"both"});
        $(".every:nth-child(1)").css({"animation-delay": "0.1s"});
        $(".every:nth-child(2)").css({"animation-delay": "0.2s"});
        $(".every:nth-child(3)").css({"animation-delay": "0.3s"});
        $(".every:nth-child(4)").css({"animation-delay": "0.4s"});
      }
      
  });

  function bannerAuto(){

    $(".insta ul").stop(true,true).animate({marginLeft:"-=380px"},500,function(){			
			$(".insta ul li:first-child").appendTo(".insta ul");
			$(this).css({marginLeft:"0px"}); 
		});	

  };

  bauto=setInterval(bannerAuto,4000);

  $(".insta").hover(function(){ 
		clearInterval(bauto);  
	}, function(){
		bauto=setInterval(bannerAuto,4000);
	});
  
  $(".chat>a>img").click(function(){
    $("#popup").addClass("active");
  });

  $("#popup .button img").click(function(){
    $("#popup").removeClass("active");
  });
  
  $(window).scroll(function(){
    
    let scrollpos =$(this).scrollTop();

    if(scrollpos > 3000){
      $(".quick_icon").css({opacity:"1"});
      $(".quick_icon").fadeIn();
    }else{
      $(".quick_icon").fadeOut();
    }

  });

	let bnum=0;

  // 다음보기
  $(".content1_btn .con_right").click(function(){

    if(bnum<3){
      // 전체개수의 반개수만큼 정도-> 맨 앞에 있는 이미지를 기준으로 하기 때문에 보이는 폭을 고려해서 전체 개수의 반정도 설정함
      $(".con_every ul").stop(true,true).animate({marginLeft:"-=550px"},500);
      bnum++;
    }
    
  
  });
  
  // 이전보기

  $(".content1_btn .con_left").click(function(){

    if(bnum>0){
      // 전체개수의 반개수만큼 정도-> 맨 앞에 있는 이미지를 기준으로 하기 때문에 보이는 폭을 고려해서 전체 개수의 반정도 설정함
      $(".con_every ul").stop(true,true).animate({marginLeft:"+=550px"},500);
      bnum--;
    }
  
  });

  $("dl dt").click(function(){
    
    $(this).siblings("dd").hide("slow");
    $(this).next().show("slow");
    $(this).siblings("dt").removeClass("selected");
    $(this).addClass("selected");

    let dataImage = $(this).attr("data-background");
    $(".image img").attr("src",dataImage).hide().fadeIn();

  });

    // 각 목록을 클릭 했을 때......
    $(".menu").click(function(){
      $(this).next().show();
    $("html").css({"overflowY":"hidden"});
  
      return false;
    });
    // close버튼과 검정배경영역을 클릭할 때......
    $(".close, .pop").click(function(){
      $(".pop").hide();
      $("html").css({"overflowY":"scroll"});
    });
    
    
    $(".tab li").click(function(){

      for(i=0;i<3;i++){
        $(".tab li").eq(i).find("img").css({filter:' brightness(100%)'});
      };
      
      let inum = $(this).index();
      $(this).find("img").css({filter:' brightness(80%)'});
  
      $(".i1").removeClass("active"); // css에서 적용된 1번째 현재위치활성화 해지
  
      let result= $(this).attr("data-alt");
      $(".tabContents div").removeClass("active");
      $(`#${result}`).addClass("active");
    });

});
