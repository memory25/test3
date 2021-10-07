(function(){
  var canvas = $('#canvas');

  if (!canvas[0].getContext) {
      $("#error").show();
      return false;
  }

  var width = canvas.width();
  var height = canvas.height();
  
  canvas.attr("width", width);
  canvas.attr("height", height);

  var opts = {
      seed: {
          x: width / 2 - 20,
          color: "rgb(190, 26, 37)",
          scale: 2
      },
      branch: [
          [535, 680, 570, 250, 500, 200, 30, 100, [
              [540, 500, 455, 417, 340, 400, 13, 100, [
                  [450, 435, 434, 430, 394, 395, 2, 40]
              ]],
              [550, 445, 600, 356, 680, 345, 12, 100, [
                  [578, 400, 648, 409, 661, 426, 3, 80]
              ]],
              [539, 281, 537, 248, 534, 217, 3, 40],
              [546, 397, 413, 247, 328, 244, 9, 80, [
                  [427, 286, 383, 253, 371, 205, 2, 40],
                  [498, 345, 435, 315, 395, 330, 4, 60]
              ]],
              [546, 357, 608, 252, 678, 221, 6, 100, [
                  [590, 293, 646, 277, 648, 271, 2, 80]
              ]]
          ]] 
      ],
      bloom: {
          num: 700,
          width: 1080,
          height: 650,
      },
      footer: {
          width: 1200,
          height: 5,
          speed: 10,
      }
  }

  var tree = new Tree(canvas[0], width, height, opts);
  var seed = tree.seed;
  var foot = tree.footer;
  var hold = 1;

  canvas.click(function(e) {
      var offset = canvas.offset(), x, y;
      x = e.pageX - offset.left;
      y = e.pageY - offset.top;
      if (seed.hover(x, y)) {
          hold = 0; 
          canvas.unbind("click");
          canvas.unbind("mousemove");
          canvas.removeClass('hand');
          
          /*const audio = document.querySelector('audio');
          audio.volume = 0.4;
          audio.play();*/
      }
  }).mousemove(function(e){
      var offset = canvas.offset(), x, y;
      x = e.pageX - offset.left;
      y = e.pageY - offset.top;
      canvas.toggleClass('hand', seed.hover(x, y));
  });

  var seedAnimate = eval(Jscex.compile("async", function () {
      seed.draw();
      while (hold) {
          $await(Jscex.Async.sleep(10));
      }
      while (seed.canScale()) {
          seed.scale(0.95);
          $await(Jscex.Async.sleep(10));
      }
      while (seed.canMove()) {
          seed.move(0, 2);
          foot.draw();
          $await(Jscex.Async.sleep(10));
      }
  }));

  var growAnimate = eval(Jscex.compile("async", function () {
      do {
        tree.grow();
          $await(Jscex.Async.sleep(10));
      } while (tree.canGrow());
  }));

  var flowAnimate = eval(Jscex.compile("async", function () {
      do {
        tree.flower(2);
          $await(Jscex.Async.sleep(10));
      } while (tree.canFlower());
  }));

  var moveAnimate = eval(Jscex.compile("async", function () {
      tree.snapshot("p1", 240, 0, 610, 680);
      while (tree.move("p1", 500, 0)) {
          foot.draw();
          $await(Jscex.Async.sleep(10));
      }
      foot.draw();
      tree.snapshot("p2", 500, 0, 610, 680);

      canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
      canvas.css("background", "#ffe");
      $await(Jscex.Async.sleep(300));
      canvas.css("background", "none");
  }));

  var jumpAnimate = eval(Jscex.compile("async", function () {
      var ctx = tree.ctx;
      while (true) {
          tree.ctx.clearRect(0, 0, width, height);
          tree.jump();
          foot.draw();
          $await(Jscex.Async.sleep(25));
      }
  }));

  var textAnimate = eval(Jscex.compile("async", function () {
  var together = new Date('2020/8/5');

  $("#code").show().typewriter();
      $("#clock-box").fadeIn(500);
      while (true) {
          timeElapse(together);
          $await(Jscex.Async.sleep(1000));
      }
  }));

  var runAsync = eval(Jscex.compile("async", function () {
      $await(seedAnimate());
      $await(growAnimate());
      $await(flowAnimate());
      $await(moveAnimate());

      textAnimate().start();

      $await(jumpAnimate());
  }));

  runAsync().start();
})();


function showLove() {
	document.querySelector('#main').innerHTML = `<div>
		<canvas id="loveCanvas" width="1440" height="700"></canvas>
		<div class='loveText'>
			<p>我喜歡妳，妳也是跟著感覺走而已，妳也沒有想太多，just follow your heart。</p>
			<p>妳說覺得對我不是愛，但愛都是慢慢培養的呀~ 至少妳也喜歡我呀</p>
			<p></p>
			<p>妳對前幾任也都不是愛，但是妳會有很強烈想得到的感覺，對我沒有想要佔有的感覺。</p>
			<p></p>
			<p>之前很多個都是一樣的模式，而現在我給妳不同的感覺了，</p>
			<p>這次不一樣了，可以破除半年魔咒，可以好好長長久久</p>
			<p></p>
			<p>真正的愛應該不是佔有，而是互相體諒、包容、陪伴、成長、扶持吧!</p>
			<p></p>
			<p>我不會對妳說謊、任何事情我有想到都會主動跟妳提，不會避重就輕，</p>
			<p>我們不太會吵架，即使吵架了，我也絕對不會讓妳受到委屈，會跟妳好好溝通</p>
			<p></p>
			<p>祈望妳給彼此一次機會~</p>
			<p></p>
			<p>我們都很有主見，但是都很願意包容對方</p>
			<p>我們都缺少陪伴，渴望談一段永遠的戀愛</p>
			<p>我想好好照顧、陪伴妳</p>
		</div>
	</div>`;

	var c = document.querySelector('#loveCanvas');
	var a = c.getContext('2d');
	e=[];h=[];O=c.width=innerWidth;Q=c.height=innerHeight;v=32;M=Math;R=M.random;C=M.cos;Y=6.3;for(i=0;i<Y;i+=0.2)h.push([O/2+180*M.pow(M.sin(i),3),Q/2+10*-(15*C(i)-5*C(2*i)-2*C(3*i)-C(4*i))]);
	for(i=0;i<v;){x=R()*O;y=R()*Q;H=80*(i/v)+280;S=40*R()+60;B=60*R()+20;f=[];for(k=0;k<v;)f[k++]={x:x,y:y,X:0,Y:0,R:1-k/v+1,S:R()+1,q:~~(R()*v),D:2*(i%2)-1,F:0.2*R()+0.7,f:"hsla("+~~H+","+~~S+"%,"+~~B+"%,.1)"};e[i++]=f}
	function _(d){a.fillStyle=d.f;a.beginPath();a.arc(d.x,d.y,d.R,0,Y,1);a.closePath();a.fill()}
	setInterval(function(){a.fillStyle="rgba(0,0,0,.2)";a.fillRect(0,0,O,Q);for(i=v;i--;){f=e[i];u=f[0];q=h[u.q];D=u.x-q[0];E=u.y-q[1];G=M.sqrt(D*D+E*E);10>G&&(0.95<R()?u.q=~~(R()*v):(0.99<R()&&(u.D*=-1),u.q+=u.D,u.q%=v,0>u.q&&(u.q+=v)));u.X+=-D/G*u.S;u.Y+=-E/G*u.S;u.x+=u.X;u.y+=u.Y;_(u);u.X*=u.F;u.Y*=u.F;for(k=0;k<v-1;)T=f[k],N=f[++k],N.x-=0.7*(N.x-T.x),N.y-=0.7*(N.y-T.y),_(N)}},25);
}


let max = 0
let stop = false;
function scrollDown(){
	if(stop){
		return null
	}
	const textZone = document.querySelector('#text')
	const sayList = $('.say')

	if(max > 500 && sayList[sayList.length -1 ].className.match('end')){
		stop = true
	}

	textZone.scrollTop = textZone.scrollHeight;
	max = max >= textZone.scrollHeight ? max : textZone.scrollHeight
	document.querySelector('.fake').style.height = max
	setTimeout(scrollDown, 300)
}
scrollDown()

