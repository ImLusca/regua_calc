
ArrastaElemento(document.getElementById("move"));
ArrastaElemento(document.getElementById("marcador"));

//funções matemáticas --> simplificar para uma única função usando switch case se for viável
//transformar as variáveis n1,n2,res em globais 
document.getElementById("btn_calculaMultiplicacao").addEventListener('click', x =>{
  var n1 = document.getElementById('numero1').value;
  var n2 = document.getElementById('numero2').value;
  var res = document.getElementById('resultado');
  var rs_fin = 0;
  
  res.value = Math.round((n1 * n2) * 100) / 100;
  rs_fin = notacao_cientifics(res.value);
  n1 = notacao_cientifics(n1);
  n2 = notacao_cientifics(n2);
  define_pos(n1,(rs_fin >= n1))
  move_marcador(n1 ,rs_fin);


})

document.getElementById("btn_calculaDivisao").addEventListener('click', x =>{
  var n1 = document.getElementById('numero1').value;
  var n2 = document.getElementById('numero2').value;
  var res = document.getElementById('resultado');
  var rs_fin= 0;
  if(n2 == 0){
    return;
  }
  if(n1 == null || n2 == null){
    return;
  }
  res.value = Math.round((n1 / n2) * 100) / 100;
  rs_fin = notacao_cientifics(res.value);
  n1 = notacao_cientifics(n1);
  n2 = notacao_cientifics(n2);
  move_marcador(n1,rs_fin)
  define_pos(rs_fin, (n2 <= n1))
})

document.getElementById("btn_calculaPot").addEventListener('click', x =>{
  var n1 = document.getElementById('numero1').value;
  var n2 = document.getElementById('numero2').value;
  var res = document.getElementById('resultado');

  res.value = Math.round(Math.pow(n1,n2) * 100) / 100;
  define_pos(n2);
  move_marcador(n2);
  setTimeout(() =>{move_marcador_sup(res.value)},1750);
  
})

document.getElementById("btn_calculaLog").addEventListener('click', x =>{
  var n1 = document.getElementById('numero1');
  var n2 = document.getElementById('numero2');
  var res = document.getElementById('resultado');

  res.value = Math.round((Math.log(n2.value) / Math.log(n1.value)) * 100) / 100;
  define_pos(res.value);
  move_marcador_sup(n2.value);
  setTimeout(()=>{move_marcador(res.value)},1750)
})

document.getElementById("btn_calculaRaiz").addEventListener('click', x =>{
  var n1 = document.getElementById('numero1').value;
  var n2 = document.getElementById('numero2').value;
  var res = document.getElementById('resultado');
  res.value = Math.round((Math.pow(n2,(1/n1))) * 100) /100
  define_pos(n1);
  move_marcador(n1);
  setTimeout(()=>{move_marcador_sup(n2)},1750)  
})

//lidar com o tamanho dos números: range atual: 0 - infinito (noice)
//multiplicão ]-∞, +∞[ (noice)
//Divisão ]-∞, +∞[ (nuice)
//log,pot e raiz pendendentes
function notacao_cientifics(n){
  if(n == 0)
    return 0;


  while(!(1 <= n && n < 10)){
    if(n < 1)
      n *= 10;
    else if(n > 10)
      n /= 10;    
  }

  return n;
}


// funções de posicionamento da régua

function define_pos(n,esquerda = true){
  var total = 0, util = 0,reset =0, _n ;
  var referencia = document.getElementById('referencia');
  var movel = document.getElementById('move');
  total = referencia.clientWidth;
  reset = referencia.offsetLeft;
  reset = reset + (total * 0.10491071);
  util = total * 0.83482142

  if(esquerda == false){
    n = 10/n;
  }

  _n = (Math.log10(n) * util) ;

  if(esquerda == false){
    _n *= (-1);
  }

  $("#move").animate({    
      left: _n + 3
  }, 1000, function(){})
}

function move_marcador(n, n2=0){
  var total = 0, util = 0,reset =0, _n, _n2 ;
  var referencia = document.getElementById('referencia');
  var movel = document.getElementById('marcador');
  total = referencia.clientWidth;
  reset = referencia.offsetLeft;
  reset = reset + (total * 0.10491071);
  util = total * 0.83482142  
  _n = (Math.log10(n) * util);
  _n2 = (Math.log10(n2)*util);
  $("#marcador").animate({
    left: _n + reset - 3
  }, 1000, function(){
    if(n2 != 0){
      setTimeout(function(){
        $("#marcador").animate({
        left: _n2 + reset -3
        },800)
      },750);
    }
  });
  // movel.style.left = (_n + reset - 3) + "px";  
}

function move_marcador_sup(n){
  var total = 0, util = 0,reset =0, _n ;
  var referencia = document.getElementById('referencia');
  var movel = document.getElementById('marcador');
  total = referencia.clientWidth;
  reset = referencia.offsetLeft;
  reset = reset + (total * 0.10491071);
  util = total * 0.83482142;
  _n = Math.log(n) / Math.log(Math.SQRT2);
  _n = (Math.log10(_n) * util);
  $("#marcador").animate({
    left:  _n + reset - 3
  }, 1000, function(){})
  // movel.style.left = (_n + reset - 3) + "px";  
}

// funções para debug
function recebe_pos(){
var total = 0, util = 0,reset =0, _n ;
var referencia = document.getElementById('referencia');
  var movel = document.getElementById('move');
  total = referencia.clientWidth;
  reset = referencia.offsetLeft;
  reset = reset + (total * 0.10491071);
  util = total * 0.83482142

  _n = movel.style.left.replace("px","") -3
  _n = _n/util;
  _n = Math.pow(10,_n);
  return _n;
}

document.getElementById("numero1").addEventListener("keyup", x =>{
  if(x.keyCode === 13){
    define_pos(document.getElementById("numero1").value);
  }
})

// função de controle dos elementos com o mouse
function ArrastaElemento(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;  
  if (document.getElementById(elmnt.id)) {
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    document.onmouseup = finalizaArrastaElemento;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    document.getElementById("numero1").setAttribute('value',recebe_pos().toFixed(3));
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function finalizaArrastaElemento() {
    document.onmouseup = null;
    document.onmousemove = null;
  }


}