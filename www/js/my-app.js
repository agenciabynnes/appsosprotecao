// Initialize your app
var myApp = new Framework7({
    // Default title for modals
    modalTitle: 'SOS PROTEÇÃO',
    tapHold: true,
    tapHoldPreventClicks: true,
     // Enable Material theme
    material: true,
    swipeBackPage: false,
    fastClick: true,
    notificationCloseOnClick: true,
    notificationHold: 10000,
    preloadPreviousPage: true,


    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
}); 

var maskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
options = {onKeyPress: function(val, e, field, options) {
        field.mask(maskBehavior.apply({}, arguments), options);
    }
};

$(document).ready(function(){

  $('.cel').mask(maskBehavior, options);
  $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
  $('.cpf').mask('000.000.000-00', {reverse: true});
  $('.money').mask('000.000.000.000.000,00', {reverse: true});
});

function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}

function mplaca(v){
    v=v.replace(/([a-zA-Z]{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    //v=v.replace(/(\d{4})(\d)/,"$1-$2")
    return v
}
//window.screen.lockOrientation('portrait');
//intel.xdk.device.setRotateOrientation("portrait");

///////////////////////// iniciar dom /////////////////////////
var $$ = Dom7;

var $server = 'https://sosprotecao.com/assinatura/';
var imagemPerf;
var tabindex = 1;
var bannerview = 0;
var atualizamaptime;
var alertadechegadahometime;
var pageassinatura = false;


logado();

//desabilita pdf se for ios
if (myApp.device.ios) {
    $$(".arqPdf").hide();
}

// simula touch quando acesso for web
if (!myApp.device.os) {
    //console.log("simula touch");
    TouchEmulator();
    window.addEventListener("touchstart", clickon, true);
    window.addEventListener("touchmove", clickoff, true);
    window.addEventListener("touchend", clickon, true);
    window.addEventListener("touchcancel", clickon, true);
    // desativa clique
    function clickoff(){
      if (!myApp.device.os) {
        $("li.swipeout a").attr("disabled","disabled");
      }
    }
    // ativa clique
    function clickon(){
      if (!myApp.device.os) {
        $("li.swipeout a").removeAttr("disabled");
      }
    }
}

/*var device = Framework7.prototype.device;
if (device.android) {
//alert('this is android');

//StatusBar.backgroundColorByHexString("#303E8C");
//StatusBar.overlaysWebView(true);
} else if (device.ios){
//alert('this is ios');    
}*/

///////// device plataform //////////
/*if (device.ios) {
    var $plataform="ios";
} else if (device.android) {
    var $plataform="android";
}*/

/*if ($("html").hasClass("android")) {
    StatusBar.backgroundColorByHexString("#303E8C");
}*/

//navigator.splashscreen.hide();
//intel.xdk.device.hideSplashScreen();

document.addEventListener("backbutton", voltar, false);


function voltar(){
    
    if ($('.modal.modal-in').length > 0 || $('.actions-modal.modal-in').length > 0 || $('.popup.modal-in').length > 0) { 
        myApp.closeModal('.popup.modal-in');
        myApp.closeModal('.modal.modal-in');
        myApp.closeModal('.actions-modal.modal-in');
    } else {
        mainView.router.back();
    }
    $('#exibecamerasdeseguranca-cont').attr('src','');
}

document.addEventListener("offline", onOffline, false);

function onOffline() {
    /*myApp.addNotification({
        title: "Conexão falhou!",
        //subtitle: e.payload.subtitle,
        message: 'Você precisa de conexão com a internet para acessar o Aptohome',
        media: '<img src='+e.payload.media+'>',
    });*/
    myApp.alert('Você precisa de conexão com a internet');
}
function onOnline() {
    //myApp.popup(".popup-off");
}

document.addEventListener("online", onOnline, false);


///////////////////////// textarea height automatico /////////////////////////
/*$("textarea").bind("input", function(e) {
    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")) &&
          $(this).height() < 300
         ) {
        $(this).height($(this).height()+1);
    };
});*/


///////////////////////// inserir tabindex /////////////////////////
/*$('form,input,select').each(function() {
  if (this.type != "hidden") {
    var $input = $(this);
    $input.attr("tabindex", tabindex);
    tabindex++;
 }
});*/


///////////////////////// tab enter ///////////////////////////////
function tabenter(event,campo){
    var tecla = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    //alert("entrei"+tecla+" - "+campo);
    if (tecla==13) {
        console.log("focus = "+tecla+" - "+event+" - "+campo);
        event.preventDefault();
        campo.focus();
        return false;
    }
}

///////////////////////// auto focus ///////////////////////////////
  /*if (myApp.device.android) {
    var getPos = function (obj) {
      var left, top;
      left = top = 0;
      if (obj.offsetParent) {
          do {
              left += obj.offsetLeft;
              top  += obj.offsetTop;
          } while (obj = obj.offsetParent);
      }
      return {
          x : left,
          y : top
      };
    };

        window.addEventListener('native.keyboardshow', function (e){
        window.keyboardHeight = e.keyboardHeight;
        var y = getPos(document.activeElement).y;
        $$($$(document.activeElement).parents('.page-content')).scrollTop(y-e.keyboardHeight/2);
    });
  }*/

///////////////////////// menu 2 niveis /////////////////////////
$$('.minhaconta').on('click', function (e) {
    console.log("subservico");
    $(".minhaconta .sublist").toggleClass("hide");
});

///////////////////////// abrir panel left /////////////////////////
$$('.open-left-panel').on('click', function (e) {
    // 'left' position to open Left panel
    myApp.openPanel('left');
});

///////////////////////// abrir panel right /////////////////////////
$$('.open-right-panel').on('click', function (e) {
    // 'right' position to open Right panel
    myApp.openPanel('right');
});

// fechar panel
$$('.panel-close').on('click', function (e) {
    myApp.closePanel();
});

///////////////////////// Add view /////////////////////////
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true //enable inline pages
});


/*$$(window).on('popstate', function (e) {
    myApp.closeModal('.popup.modal-in');
    myApp.closeModal('.actions-modal.modal-in');
    mainView.router.back();
});*/
/*$$(window).on('click', '.close-popup', function () {
    window.history.back();
});*/

///////////////////////// abrir ligacao /////////////////////////
function openURL(alvo){
    //alert(alvo);
    window.open(alvo);
    //window.open(alvo, '_system', 'location=yes');
}

///////////////////////// abrir browser /////////////////////////
function openURLBrowser(alvo){
    //alert(alvo);
    //window.open(alvo);
    window.open(alvo, '_system', 'location=yes');
}


///////////////////// retirar caracteres em branco ////////////////////////////////
    function trimespaco(alvo) {

        while(alvo.indexOf(" ") != -1){
            alvo = alvo.replace(" ", "");
        }

        return alvo;
    }
////////////////////////// rotacao do aparelho /////////////////////////

function onportrait(){
    window.screen.lockOrientation('portrait');
    return;
}

function onlandscape(){
    window.screen.lockOrientation('landscape');
    return;
}


///////////////////////// help //////////////////////////

    //$$('.help').click(function () {
    function help(){
        //function () { mainView.router.load({pageName: 'popup-help'});
      var mySwiper = myApp.swiper('.swiper-container', {
        pagination:'.swiper-pagination',
        direction: 'horizontal',
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        setWrapperSize: true
      });
        //var mainView = myApp.addView('.view-main');
        //mainView.router.load({pageName: 'popup-help'});
        myApp.popup(".popup-help");
        mySwiper.update(true);
    }
    //});


///////////////////////////////////// search ajuda videos //////////////////////////////////////
    var mySearchbarCronograma = myApp.searchbar('.submenuvideos', {

        searchList: '.list-block-search-videos',
        searchIn: '.ks-facebook-date,.facebook-price',
        removeDiacritics: true,
        //customSearch: true,

        onEnable: function(s){
            //console.log('enable');
            //videos();
            //$('.inputsearchportariahome').attr("disabled", true);
        },

        onSearch: function(s){
            //console.log(s.value);
        },

        onDisable: function(s){
            console.log("clear");
            //$('#searchportariahome-cont').html("");
        }
    });

///////////////////////// ajuda videos ////////////////////////////////
// Pull to refresh content
var ptrContent = $$('.videos');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        videos();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

function videos(){
    myApp.showIndicator();
    var datacont = "";
    var datavideo = [];
    var datayoutube;
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
        part : 'id,snippet', 
        maxResults : 20,
        //id: 'UCpk58NDdaKdX0QiiA2e79tg',
        type: 'video',
        order: 'date',
        channelId: 'UCQm1BaOMtXS-RqN0o5ePfuA',
        //playlistId : pid,
        key: 'AIzaSyCAlcNRDtBwAwN82J96GW7QGvyHBXCDT70'},
        function(data) {
            
            $.each( data.items, function( i, item ) {
                
                datavideo='https://www.youtube.com/embed/'+item.id.videoId+'?rel=0&amp;showinfo=0';
                datayoutube='https://www.youtube.com/watch?v='+item.id.videoId;
                myPhotoBrowserVideo = myApp.photoBrowser({
                    theme: 'dark',
                    ofText: 'de',
                    backLinkText: '',
                    spaceBetween: 0,
                    navbar: true,
                    toolbar: false,
                    photos : datavideo,
                    type: 'popup'
                });
                videoZoom = 'onclick=exibevideos("'+datavideo+'")'; 

                datacont += '<li>'+
                                '<div class="card-cont ks-facebook-card">'+
                                    '<a href="#exibevideos" '+videoZoom+' class="item-link">'+
                                        '<div class="card-content">'+
                                            '<i class="fa zoomVideo fa-youtube-play fa-3x"></i>'+
                                            '<img src="http://i.ytimg.com/vi/'+item.id.videoId+'/mqdefault.jpg" width="100%">'+
                                        '</div>'+
                                    '</a>'+
                                    '<div class="card-header">'+
                                        '<div class="ks-facebook-avatar"><img src="https://yt3.ggpht.com/-jxyjMXngpPE/AAAAAAAAAAI/AAAAAAAAAAA/9BdjsAA14uw/s50-c-k-no-mo-rj-c0xffffff/photo.jpg" width="34"></div>'+
                                            '<div class="ks-facebook-name">Aptohome</div>'+
                                            '<div class="ks-facebook-date">'+item.snippet.title+'</div>'+
                                            //'<div class="ks-facebook-date">'+moment(item.snippet.publishedAt).locale('pt-br').format('llll')+'</div>'+
                                            //'<div class="color-indigo" onClick="shareVideoCont(\''+datayoutube+'\');"><i class="icon shareVideoCont fa fa-share-alt fa-lg"></i></div>'+
                                        '</div>'+
                                        '<div class="card-content-inner">'+
                                            //'<p class="facebook-title">'+item.snippet.title+'</p>'+
                                            '<p class="facebook-price">'+item.snippet.description+'</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</li>';
            });
            //console.log(datavideo);
            myApp.hideIndicator();
            $('#videos-cont').html(datacont);
        }
    );
}

//////////////////////////////// exibe videos //////////////////////
function exibevideos(data){

    //$('#exibecamerasdeseguranca-cont').html(data);
    //intel.xdk.device.setRotateOrientation("landscape");
    //onlandscape();
    $("#exibevideos-cont").attr('src',data);
    
}

function closevideo(){
    $("#exibevideos-cont").attr('src','');
}


///////////////////////// login ///////////////////////////

$$('#entrar').on('click', function(){
    $$email = $$('#email').val();
    $$senha = $$('#password').val();
    
    if ($$senha!="" && $$email!="") {
        myApp.showIndicator();
        $.ajax({
            url: $server+"Gerar_json.php?email="+$$email+"&senha="+$$senha+"&op=login&action=email",
            dataType: "json",
            success: function(data){
                myApp.hideIndicator();
                if (data) {
                    console.log(data);
                    localStorage.setItem("idvendedor", data.idvendedor);
                    localStorage.setItem("codvendedor", data.codvendedor);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("nome", data.nome);
                    profile();
                    //myApp.hideIndicator();
                    myApp.closeModal(".login-screen");

                    // carrega dashboard
                    $.ajax({
                        url: $server+"Gerar_json.php?idvendedor="+data.idvendedor+"&op=venda&action=listImei",
                        dataType: "json",
                        success: function(data){
                            myApp.hideIndicator();
                            if (data) {
                                //console.log(data);
                                var contvendas = "00";
                                var aux = "";
                                if (data.total[0].qtdimei<10) {
                                    contvendas = "0"+data.total[0].qtdimei;
                                }else{
                                    contvendas = data.total[0].qtdimei;
                                }
                                //imprime no dashboard
                                $(".contvendas").html(contvendas);
                                //$(".saldocomissao").html("R$ "+formatMoneyReal(data.total[0].totalcomissao));


                                for (var i = 0; i < data.list.length; i++) {

                                    if (i<5) {
                                        aux+='<div class="card margin-card">'+
                                                  '<div class="card-content">'+
                                                    '<div class="card-content-inner">'+
                                                      '<div class="row padding-card-row">'+
                                                        '<div class="col-100">'+
                                                          '<h4 class="no-margin titsolicitacoes">IMEI: '+data.list[i].imei+'</h4>'+
                                                          '<h6 class="no-margin font-lighter nomesolicitacoes">'+convertDateTimeBrasil(data.list[i].registration_date)+'</h6>'+
                                                        '</div>'+
                                                      '</div>'+
                                                    '</div>'+
                                                  '</div>'+
                                                '</div>';
                                    }
                                }

                                $(".listsolicitacoes").html(aux);
                                myApp.hideIndicator();
                            }
                        }
                        ,error:function(data){
                            console.log(data);
                            myApp.hideIndicator();
                        }
                    });

                    // carrega ultimos comunicados
                    $.ajax({
                        url: $server+"Gerar_json.php?idvendedor="+data.idvendedor+"&op=comunicado&action=listComunicado",
                        dataType: "json",
                        success: function(data){
                            myApp.hideIndicator();
                            if (data) {
                                var datacomunicado="";
                                var urlimg="";
                                //console.log(data);
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].url!="") {
                                        urlimg = data[i].url.replace("http://","https://");
                                    }else{
                                        urlimg = "images/sem_foto_icone.jpg";
                                    }
                                    if (i<5) {
                                        datacomunicado += '<li date-date="'+data[i].registration_date+'">'+
                                                                  '<a href="#comunicadocont" onclick="comuncomunicadocont('+data[i].idcomunicado+')" class="item-link item-content">'+
                                                                    '<div class="item-media">'+
                                                                      '<img src="'+urlimg+'" >'+
                                                                    '</div>'+
                                                                    '<div class="item-inner">'+
                                                                      '<div class="item-title-row">'+
                                                                        '<div class="item-title">'+data[i].titulo+'</div>'+
                                                                        '<div class="item-after"><i class="fa fa-lg"></i></div>'+
                                                                      '</div>'+
                                                                      '<div class="item-subtitle">'+convertDateTimeBrasil(data[i].registration_date)+'</div>'+
                                                                      '<div class="item-text">'+data[i].descricao+'</div>'+
                                                                    '</div>'+
                                                                  '</a>'+
                                                                '</li>';
                                    }
                                }

                                $(".listmensagens").html(datacomunicado);
                                myApp.hideIndicator();
                            }
                        }
                        ,error:function(data){
                            console.log(data);
                            myApp.hideIndicator();
                        }
                    });

                } else {
                    myApp.hideIndicator();
                    myApp.alert('E-mail e/ou senha inválidos!');
                }

            }
            ,error:function(data){
                //console.log(data);
                myApp.hideIndicator();
                myApp.alert('E-mail e/ou senha inválidos!');
            }
        });
    }else{
        myApp.alert("Opps! Favor preencher todos os campos.");
    }

});

///////////////////////// esqueceu a senha ///////////////////////////

$$('#esqueceu').on('click', function(){
    $$email = $$('#esqueceu-email').val();
    if ($$email!="") {
        myApp.showIndicator();
        $.ajax({
             type: "GET",
             url: $server+"Gerar_json.php?email="+$$email+"&op=login&action=esqueceu",
             async: false,
             beforeSend: function(x) {
              if(x && x.overrideMimeType) {
               x.overrideMimeType("application/j-son;charset=UTF-8");
              }
              myApp.showIndicator();
        },
            dataType: "json",
            success: function(data){
                if (data) {
                    console.log(data);
                    myApp.hideIndicator();
                    myApp.alert('Enviamos um e-mail com as instruções de recuperação de senha');
                } else {
                    myApp.hideIndicator();
                    myApp.alert('E-mail não cadastrado!');
                }

            }
            ,error:function(data){
                console.log(data);
                myApp.hideIndicator();
            }
        });
    }else{
        myApp.alert("Opps! Favor preencher todos os campos.");
    }
});

/////////////////////////// atualizar token ///////////////////////////

function atualizartoken(data){
    setTimeout(function () {
        $.ajax($server+'Gerar_json.php?', {
            type: "post",
            data: "action=editToken&token="+localStorage.getItem("token")+"&plataform="+device.platform+"&idvendedor="+localStorage.getItem("idvendedor"),
        })
        .fail(function(data) {
        console.log(data);
        })     
        .done(function(data) {
            console.log("Token gravado: "+localStorage.getItem("token"));
        });
    }, 5000);
}

///////////////////////////// sair ////////////////////////////

function sair() {
    myApp.confirm('Deseja realmente sair?', function () {
        
        if (!navigator.onLine) {
            localStorage.clear();
            window.location = "index.html";
        }
        if (localStorage.getItem("email")) {
            console.log("sair");
            localStorage.setItem("idvendedor", "");
            localStorage.setItem("token", "");
            localStorage.setItem("email", "");
            localStorage.setItem("nome", "");
            atualizartokenSair();
        }
        //localStorage.clear();
        //window.location = "index.html";
    });
}

/////////////////////////// atualizar token sair ///////////////////////////

function atualizartokenSair(data){

        $.ajax($server+'Gerar_json.php?', {
            type: "post",
            data: "action=editToken&token=&idvendedor="+localStorage.getItem("idvendedor"),
        })
        .fail(function(data) {
            localStorage.clear();
            window.location = "index.html";
        })     
        .done(function(data) {
            console.log("Token sair gravado: "+localStorage.getItem("token"));
            localStorage.clear();
            window.location = "index.html";
        });
}

/////////////////////////// atualizar token sindico sair ///////////////////////////

function atualizartokenSindicoSair(data){
        $.ajax($server+'functionAppSindico.php?', {
            type: "post",
            data: "action=tokenSair&token=&guid="+localStorage.getItem("sindicoGuid"),
        })
        .fail(function() {
            localStorage.clear();
            window.location = "index.html";
        })     
        .done(function(data) {
            console.log("Token sair gravado: "+localStorage.getItem("token"));
            localStorage.clear();
            window.location = "index.html";
        });
}

/////////////////////////// atualizar token administradora sair ///////////////////////////

function atualizartokenAdministradoraSair(data){
        $.ajax($server+'functionAppAdministradora.php?', {
            type: "post",
            data: "action=tokenSair&token=&guid="+localStorage.getItem("administradoraGuid"),
        })
        .fail(function() {
            localStorage.clear();
            window.location = "index.html";
        })     
        .done(function(data) {
            console.log("Token sair gravado: "+localStorage.getItem("token"));
            localStorage.clear();
            window.location = "index.html";
        });
}

/////////////////////////// atualizar token portaria sair ///////////////////////////

function atualizartokenPortariaSair(data){
        $.ajax($server+'functionAppPortaria.php?', {
            type: "post",
            data: "action=tokenSair&token=&guid="+localStorage.getItem("guid"),
        })
        .fail(function() {
            localStorage.clear();
            window.location = "index.html";
        })     
        .done(function(data) {
            console.log("Token sair gravado: "+data);
            localStorage.clear();
            window.location = "index.html";
        });
}


myApp.onPageReinit('index', function (page) {
    logado();
});


///////////////////////////// logado ////////////////////////////

function logado() {
    
    if (localStorage.getItem("email")) {

        $$email = localStorage.getItem("email");
        $.ajax({
            url: $server+"Gerar_json.php?email="+$$email+"&op=vendedor&action=listVendedorEmail",
            dataType: "json",
            success: function(data){
                console.log(data);
                if (data[0].active==1) {
                    profile();        
                    myApp.closeModal(".login-screen");
                    //popupBanner();
                    console.log("vendedor");
                    // carrega dashboard
                    $.ajax({
                        url: $server+"Gerar_json.php?idvendedor="+data[0].idvendedor+"&op=venda&action=listImei",
                        dataType: "json",
                        success: function(data){
                            myApp.hideIndicator();
                            if (data) {
                                //console.log(data);
                                var contvendas = "00";
                                var aux = "";
                                if (data.total[0].qtdimei<10) {
                                    contvendas = "0"+data.total[0].qtdimei;
                                }else{
                                    contvendas = data.total[0].qtdimei;
                                }
                                //imprime no dashboard
                                $(".contvendas").html(contvendas);
                                //$(".saldocomissao").html("R$ "+formatMoneyReal(data.total[0].totalcomissao));


                                for (var i = 0; i < data.list.length; i++) {

                                    if (i<5) {
                                        aux+='<div class="card margin-card">'+
                                                  '<div class="card-content">'+
                                                    '<div class="card-content-inner">'+
                                                      '<div class="row padding-card-row">'+
                                                        '<div class="col-100">'+
                                                          '<h4 class="no-margin titsolicitacoes">IMEI: '+data.list[i].imei+'</h4>'+
                                                          '<h6 class="no-margin font-lighter nomesolicitacoes">'+convertDateTimeBrasil(data.list[i].registration_date)+'</h6>'+
                                                        '</div>'+
                                                      '</div>'+
                                                    '</div>'+
                                                  '</div>'+
                                                '</div>';
                                    }
                                }

                                $(".listsolicitacoes").html(aux);
                                myApp.hideIndicator();
                            }
                        }
                        ,error:function(data){
                            console.log(data);
                            myApp.hideIndicator();
                        }
                    });

                    // carrega ultimos comunicados
                    $.ajax({
                        url: $server+"Gerar_json.php?idvendedor="+data[0].idvendedor+"&op=comunicado&action=listComunicado",
                        dataType: "json",
                        success: function(data){
                            myApp.hideIndicator();
                            if (data) {
                                var datacomunicado="";
                                var urlimg="";
                                //console.log(data);
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].url!="") {
                                        urlimg = data[i].url.replace("http://","https://");
                                    }else{
                                        urlimg = "images/sem_foto_icone.jpg";
                                    }
                                    if (i<5) {
                                        datacomunicado += '<li date-date="'+data[i].registration_date+'">'+
                                                                  '<a href="#comunicadocont" onclick="comuncomunicadocont('+data[i].idcomunicado+')" class="item-link item-content">'+
                                                                    '<div class="item-media">'+
                                                                      '<img src="'+urlimg+'" >'+
                                                                    '</div>'+
                                                                    '<div class="item-inner">'+
                                                                      '<div class="item-title-row">'+
                                                                        '<div class="item-title">'+data[i].titulo+'</div>'+
                                                                        '<div class="item-after"><i class="fa fa-lg"></i></div>'+
                                                                      '</div>'+
                                                                      '<div class="item-subtitle">'+convertDateTimeBrasil(data[i].registration_date)+'</div>'+
                                                                      '<div class="item-text">'+data[i].descricao+'</div>'+
                                                                    '</div>'+
                                                                  '</a>'+
                                                                '</li>';
                                    }
                                }

                                $(".listmensagens").html(datacomunicado);
                                myApp.hideIndicator();
                            }
                        }
                        ,error:function(data){
                            console.log(data);
                            myApp.hideIndicator();
                        }
                    });
                }else{
                    //sair do app
                    localStorage.setItem("nome", "");
                    localStorage.setItem("email", "");
                    console.log("active = 0");
                    //atualizartokenSair();
                }

            }
            ,error:function(data){
                //console.log(data);
                myApp.hideIndicator();
                myApp.alert('E-mail e/ou senha inválidos!');
            }
        });

    } else {
        myApp.loginScreen();
    }

    // chama desativar modulos //
    //modulos();
}

//////////////////////// desativar modulos ////////////////////////
function modulos(){
        
    if (localStorage.getItem("condominioId")) {
        myApp.showIndicator();

        // limpa todas classes do menu antes de verificar os modulos//

        if (localStorage.getItem("sindicoIdsindico") && !localStorage.getItem("moradorIdmorador")) {
            $$(".menualerta").addClass("invisivel");
            $$(".menucadastros").addClass("invisivel");
            $$("#butinserirrespenquetes").hide();
            //alert("sindico");
        }

        //se sindico for morador do condominio selecionado
        if (localStorage.getItem("sindicoIdsindico")) {
            if (localStorage.getItem("moradorIdCondominio")!=localStorage.getItem("condominioId")) {
                $$('.menualerta').addClass('invisivel');
                $$('.menucadastros').addClass('invisivel');
            }
        }

        if (localStorage.getItem("administradoraIdadministradora")) {
            // seleciona itens menu administradora
            $$('.menualerta').addClass('invisivel');
            $$('.menucadastros').addClass('invisivel');
            $$('.menucamera').addClass('invisivel');
            $$('.menuanuncios').addClass('invisivel');
            $$('.menubanner').addClass('invisivel');
            $$("#butinserirrespenquetes").hide();
            //alert("admin");
        }

        if (localStorage.getItem("portariaIdportaria")) {
            // seleciona itens menu portaria
            $$('.menucomunicado').addClass('invisivel');
            $$('.menualerta').addClass('invisivel');
            $$('.menucadastros').addClass('invisivel');
            $$('.menuocorrencia').addClass('invisivel');
            $$('.menutransparencia').addClass('invisivel');
            $$('.menuanuncios').addClass('invisivel');
            $$('.menuobanner').addClass('invisivel');
            $$('.menucronograma').addClass('invisivel');
            $$('.menuboletos').addClass('invisivel');
            $$('.menuenquetes').addClass('invisivel');

            //alert("portaria");
        }


        $.ajax({
            url: $server+"functionAppModulos.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                //console.log(data);
                if (data!=null) {
                    var qtd = data.moduloapp.length;

                    for (var i = 0; i < qtd; i++) {

                        switch( data.moduloapp[i].idmodulo ){
                            case '1':
                                $$(".menucomunicado").addClass("invisivel");
                            break;
                            case '2':
                                $$(".menualerta").addClass("invisivel");
                            break;
                            case '3':
                                $$(".menuespaco").addClass("invisivel");
                            break;
                            case '4':
                                $$(".menuocorrencia").addClass("invisivel");
                            break;
                            case '5':
                                $$(".menucadastros").addClass("invisivel");
                            break;
                            case '6':
                                $$(".menucadastrosmorador").addClass("invisivel");
                            break;
                            case '7':
                                $$(".menecadastrosvisitante").addClass("invisivel");
                            break;
                            case '8':
                                $$(".menucadastrosveiculo").addClass("invisivel");
                            break;
                            case '9':
                                $$(".menutransparencia").addClass("invisivel");
                            break;
                            case '10':
                                $$(".menuanuncios").addClass("invisivel");
                            break;
                            case '11':
                                $$(".menubanner").addClass("invisivel");
                            break;
                            case '12':
                                $$(".menucamera").addClass("invisivel");
                            break;
                            case '13':
                                $$(".menuservico").addClass("invisivel");
                            break;
                            case '14':
                                $$(".menucronograma").addClass("invisivel");
                            break;
                            case '15':
                                localStorage.setItem("popupView",true);
                            break;
                            case '16':
                                $$(".menuenquetes").addClass("invisivel");
                            break;
                            case '17':
                                $$(".menuinterfone").addClass("invisivel");
                            break;
                            case '18':
                                $$(".menupagamentos").addClass("invisivel");
                            break;
                            case '19':
                                $$(".menuboletos").addClass("invisivel");
                            break;
                        }
                    }
                    // se nao for desabilitado (case 15) mostra o popup
                    if (localStorage.getItem("moradorIdmorador") && localStorage.getItem("popupView")==null) {
                        localStorage.setItem("popupView",true);
                        popupBanner();
                    }
                myApp.hideIndicator();
                }else{
                    myApp.alert('Erro de conexão com o servidor! O App será fechado.');
                    navigator.app.exitApp();
                }
            }
             ,error:function(data){
                console.log(data);
                myApp.hideIndicator();
             }
        });
    }
}

//////////////////////////// profile /////////////////////////////

function profile(){
//console.log("profile");
    // profile
    //var profile_image = "<img src="+localStorage.getItem("profileImage")+">";
    //$('.profile_foto').html(profile_image);
    $('.profile_nome').html(localStorage.getItem("nome"));

    $('.profile_detalhes').html(localStorage.getItem("email"));
    
    atualizartoken(localStorage.getItem("token"));
        //popupBanner();
        //mainView.router.loadPage("bannercont");
        //myApp.alert('Morador editado om sucesso!', function () { mainView.router.load({pageName: 'bannercont'});popupBanner();});
}

//////////////////////////// profile sindico /////////////////////////////
function profileSindico(){

    if (localStorage.getItem("sindicoIdsindico") && !localStorage.getItem("moradorIdmorador")) {
        // seleciona itens menu sindico
        $$('.menualerta').addClass('invisivel');
        $$('.menucadastros').addClass('invisivel');
    }

    //se sindico for morador do condominio selecionado
    if (localStorage.getItem("sindicoIdsindico")) {
        if (localStorage.getItem("moradorIdCondominio")!=localStorage.getItem("condominioId")) {
            $$('.menualerta').addClass('invisivel');
            $$('.menucadastros').addClass('invisivel');
        }
    }

    // profile
    var profile_image = "<img src="+localStorage.getItem("profileImage")+">";
    $('.profile_foto').html(profile_image);
    $('.profile_nome').html(localStorage.getItem("sindicoNome"));

    if(localStorage.getItem("blocoNum")){
        var bloco_num = localStorage.getItem("blocoNum");
    }
    var profile_detalhes = "Condomínio: " + localStorage.getItem("sindicoCondominioNome");

    $('.nameHome').html("Cond. " +localStorage.getItem("sindicoCondominioNome"));

    if (localStorage.getItem("sindicoArrayCondominioId")!=null) {
        $('.iconRight').html('<a href="#" class="filterCond link icon-only" onclick="listCond();"><i class="icon fa fa-filter"></i></a>');
    }
    $('.profile_detalhes').html(profile_detalhes);

    atualizartokenSindico(localStorage.getItem("token"));
        //mainView.router.loadPage("bannercont");
        //myApp.alert('Morador editado om sucesso!', function () { mainView.router.load({pageName: 'bannercont'});popupBanner();});
}

///////////////// lista os condomínio dos síndicos ou administradoras /////////////
function listCond(){
    //var clickedLinkListCond = $('.filterCond');
    mainView.router.loadContent(localStorage.getItem("sindicoListCond"));
    //myApp.popover(localStorage.getItem("sindicoListCond"), clickedLinkListCond);

}
///////////////// update para usar o condomíino selecionado ///////////////////////
function updateCond(id,push){
    myApp.showIndicator();
    $.ajax({
        url: $server+"functionAppSindico.php?idcondominio="+id+"&action=listCondominioSindico",
        dataType : "json",
        success: function(data) {
            myApp.hideIndicator();
            $$.each(data.condominio, function (chave,dados)
            {
                localStorage.setItem("condominioId", dados.idcondominio);
                localStorage.setItem("sindicoCondominioId", dados.idcondominio);
                localStorage.setItem("sindicoCondominioNome", dados.condominio_nome);
                localStorage.setItem("sindicoCondominioStreet", dados.condominio_street);
                localStorage.setItem("sindicoCondominioNumber", dados.condominio_number);
                localStorage.setItem("sindicoCondominioDistrict", dados.condominio_district);
                localStorage.setItem("sindicoCondominioCityname", dados.condominio_cityname);
                localStorage.setItem("sindicoCondominioUf", dados.condominio_uf);

                profileSindico();
                modulos();
                myApp.closeModal();
                //console.log("push = "+push);
                if (push!=true) {
                    window.location = "index.html";
                }
            });
        },error: function(data) {
            myApp.hideIndicator();
            //console.log(data);
            myApp.alert('Erro! Tente novamente.');
        }
    });

}

//////////////////////////// profile administradora /////////////////////////////
function profileAdministradora(){

    // seleciona itens menu administradora
    $$('.menualerta').addClass('invisivel');
    $$('.menucadastros').addClass('invisivel');
    $$('.menucamera').addClass('invisivel');
    $$('.menuanuncios').addClass('invisivel');
    $$('.menubanner').addClass('invisivel')

    // profile
    var profile_image = "<img src="+localStorage.getItem("profileImage")+">";
    $('.profile_foto').html(profile_image);
    $('.profile_nome').html(localStorage.getItem("administradoraNome"));

    if(localStorage.getItem("blocoNum")){
        var bloco_num = localStorage.getItem("blocoNum");
    }
    var profile_detalhes = "Condomínio: " + localStorage.getItem("administradoraCondominioNome");

    $('.nameHome').html("Cond. " +localStorage.getItem("administradoraCondominioNome"));

    if (localStorage.getItem("administradoraArrayCondominioId")!=null) {
        console.log("profile");
        $('.iconRight').html('<a href="#" class="filterCond link icon-only" onclick="listCondAdministradora();"><i class="icon fa fa-filter"></i></a>');
    }
    $('.profile_detalhes').html(profile_detalhes);

    atualizartokenAdministradora(localStorage.getItem("token"));
        //mainView.router.loadPage("bannercont");
        //myApp.alert('Morador editado om sucesso!', function () { mainView.router.load({pageName: 'bannercont'});popupBanner();});
}

function listCondAdministradora(){
    mainView.router.loadContent(localStorage.getItem("administradoraListCond"));
    //var clickedLinkListCond = $('.filterCond');
    //myApp.popover(localStorage.getItem("administradoraListCond"), clickedLinkListCond);

}

function updateCondAdministradora(id,push){
    myApp.showIndicator();
    $.ajax({
        url: $server+"functionAppAdministradora.php?idcondominio="+id+"&action=listCondominioAdministradora",
        dataType : "json",
        success: function(data) {
            myApp.hideIndicator();
            $$.each(data.condominio, function (chave,dados)
            {
                localStorage.setItem("condominioId", dados.idcondominio);
                localStorage.setItem("administradoraCondominioId", dados.idcondominio);
                localStorage.setItem("administradoraCondominioNome", dados.condominio_nome);
                localStorage.setItem("administradoraCondominioStreet", dados.condominio_street);
                localStorage.setItem("administradoraCondominioNumber", dados.condominio_number);
                localStorage.setItem("administradoraCondominioDistrict", dados.condominio_district);
                localStorage.setItem("administradoraCondominioCityname", dados.condominio_cityname);
                localStorage.setItem("administradoraCondominioUf", dados.condominio_uf);

                profileAdministradora();
                modulos();
                myApp.closeModal();
                if (push!=true) {
                    window.location = "index.html";
                }
            });
        },error: function(data) {
            myApp.hideIndicator();
            //console.log(data);
            myApp.alert('Erro! Tente novamente.');
        }
    });

}

////////////////////////////  profile portaria ///////////////////
function profilePortaria(){

    // seleciona itens menu portaria
    
    $$('.menucomunicado').addClass('invisivel');
    $$('.menualerta').addClass('invisivel');
    $$('.menucadastros').addClass('invisivel');
    $$('.menuocorrencia').addClass('invisivel');
    $$('.menutransparencia').addClass('invisivel');
    $$('.menuanuncios').addClass('invisivel');
    $$('.menuobanner').addClass('invisivel');
    $$('.menucronograma').addClass('invisivel');
    // seleciona dashboard portaria
    $$('.pageindex').addClass('invisivel');
    $$('.pageportaria').removeClass('invisivel');
    comunportariahome();
    alertadechegadahome();
    searchhomeportaria();
    visitantealerthome();

    //servico();

    // profile
    var profile_image = "<img src="+localStorage.getItem("profileImage")+">";
    $('.profile_foto').html(profile_image);
    $('.profile_nome').html(localStorage.getItem("portariaNome"));

    if(localStorage.getItem("blocoNum")){
        var bloco_num = localStorage.getItem("blocoNum");
    }
    var profile_detalhes = "Condomínio: " + localStorage.getItem("condominioNome");

    $('.profile_detalhes').html(profile_detalhes);
    
    atualizartokenPortaria(localStorage.getItem("token"));
        //popupBanner();
        //mainView.router.loadPage("bannercont");
        //myApp.alert('Morador editado om sucesso!', function () { mainView.router.load({pageName: 'bannercont'});popupBanner();});
}


/////////////////////////// search home portaria //////////////////////////////

function searchhomeportaria(){


    var mySearchbar = myApp.searchbar('.searchbar', {

        searchList: '.list-block-search',
        searchIn: '.item-title,.item-text',
        removeDiacritics: true,
        //customSearch: true,

        onEnable: function(s){
            //console.log('enable');
            //searchhomeportaria();
            //$('.inputsearchportariahome').attr("disabled", true);
        },

        onSearch: function(s){
            //console.log(s.value);
        },

        onDisable: function(s){
            console.log("clear");
            //mySearchbar.clear();
            //mySearchbar.disable();
            //$('#searchportariahome-cont').html("");
        }
    });

    console.log("searchhomeportaria");
    // limpa campo de pesquisa
    //mySearchbar.clear();
    mySearchbar.disable();
        $.ajax({
            url: $server+"functionAppSearch.php?idcondominio="+localStorage.getItem("condominioId")+"&action=listall",
            dataType : "json",
            success: function(data) {

                //$('#searchportariahome-cont').html("");

                if (data!=null) {
                    //myApp.hideIndicator();
                    var datasearch = "";
                    var countdatasearch = "";
                    var qtdvisitanteaberto = "";
                    var qtdvisitante = "";
                    var qtdveiculo = "";
                    var qtdmorador = "";

                    /*if (data.search.visitante.visitanteAberto) {
                        qtdvisitanteaberto = data.search.visitante.visitanteAberto.length;
                        var delvisitante ="";
                        var cor="";

                        var name ="";
                        var email ="";
                        var rg = "";
                        var cpf = "";
                        var exibecont = "";
                        var textnomebloco = "";
                        var textbloco = "";
                        var urlVisitante = "";

                        datasearch += '<li class="item-divider"> Visitantes no Condomíni</li>';

                        for (var i = 0; i < qtdvisitanteaberto; i++) {

                            name = data.search.visitante.visitanteAberto[i].name ? data.search.visitante.visitanteAberto[i].name : "";
                            email = data.search.visitante.visitanteAberto[i].email ? data.search.visitante.visitanteAberto[i].email : "";
                            cpf = data.search.visitante.visitanteAberto[i].cpf ? 'CPF: ' + data.search.visitante.visitanteAberto[i].cpf+'<br>' : "";
                            rg = data.search.visitante.visitanteAberto[i].rg ? 'RG: ' + data.search.visitante.visitanteAberto[i].rg+'<br>' : "";

                            cpfexib = cpf ? cpf : "";
                            rgexib = rg ? rg : "";
                            cor="#4caf50";

                            // Verifica se o condomínio é sem bloco
                            if(data.search.visitante.visitanteAberto[i].num_bloco!="Sem bloco"){
                                var num_bloco = "/" + data.search.visitante.visitanteAberto[i].num_bloco;
                            }
                            // Verifica se é visitante para o condomínio
                            if (data.search.visitante.visitanteAberto[i].num_domicilio!="") {
                                textnomebloco = name+' ('+data.search.visitante.visitanteAberto[i].num_domicilio+num_bloco+')';
                            }else{
                                textnomebloco = name+' (Condomínio)';
                            }
                            if (data.search.visitante.visitanteAberto[i].num_domicilio) {
                                textbloco = 'Apto: '+data.search.visitante.visitanteAberto[i].num_domicilio+num_bloco;
                            }else{
                                textbloco = "Condomínio";
                            }

                            urlVisitante = data.search.visitante.visitanteAberto[i].urlVisitante.replace("http://","https://");
                            datasearch += '<li class="swipeout item-content">'+
                                                      '<a href="#visitantecont" onclick="visitantecont('+data.search.visitante.visitanteAberto[i].idvisitante+')" class="swipeout-content item-link item-content">'+
                                                        '<div class="item-media" style="border:solid 4px '+cor+'">'+
                                                          '<img src="'+urlVisitante+'" >'+
                                                        '</div>'+
                                                        '<div class="item-inner">'+
                                                          '<div class="item-title-row">'+
                                                            '<div class="item-title">'+textnomebloco+'</div>'+
                                                          '</div>'+
                                                          '<div class="item-text">'+rgexib+'</div>'+
                                                          '<div class="item-text">'+cpfexib+'</div>'+
                                                          '<div class="item-text">'+textbloco+'</div>'+
                                                        '</div>'+
                                                      '</a>'+
                                                      '<div class="swipeout-actions-right">'+
                                                        '<a href="#inserirvisitante" onclick = "editarvisitante('+data.search.visitante.visitanteAberto[i].idvisitante+')"" class="action2 bg-orange">Editar</a>'+
                                                      '</div>'+
                                                    '</li>';
                        }
                    }*/

                    if (data.search.visitante.visitante) {

                        myArray = data.search.visitante.visitante;

                        function dentro(myArray) {
                          if (myArray.visitanteaberto===1){
                            return myArray;
                          }
                        }
                        var arrayVisitantedentro = myArray.filter(dentro);

                        function fora(myArray) {
                          if (myArray.visitanteaberto===0){
                            return myArray;
                          }
                        }
                        var arrayVisitantefora = myArray.filter(fora);

                        //console.log("Fora do condominio = "+arrayVisitantefora[0].name);
                        //console.log("No condominio = "+arrayVisitantedentro[0].name);

                        if (arrayVisitantedentro.length>0){
                            qtdvisitante = arrayVisitantedentro.length;
                            var delvisitante ="";
                            var cor="";

                            var name ="";
                            var email ="";
                            var rg = "";
                            var cpf = "";
                            var exibecont = "";
                            var textnomebloco = "";
                            var textbloco = "";
                            var urlVisitante = "";

                            datasearch += '<li class="item-divider"> Visitantes no Condomínio</li>';

                            for (var i = 0; i < qtdvisitante; i++) {

                                name = arrayVisitantedentro[i].name ? arrayVisitantedentro[i].name : "";
                                email = arrayVisitantedentro[i].email ? arrayVisitantedentro[i].email : "";
                                rg = arrayVisitantedentro[i].rg ? 'RG: ' + arrayVisitantedentro[i].rg+'<br>' : "";
                                cpf = arrayVisitantedentro[i].cpf ? 'CPF: ' + arrayVisitantedentro[i].cpf+'<br>' : "";
                                dataini = arrayVisitantedentro[i].horaini ? arrayVisitantedentro[i].horaini : "";
                                horater = arrayVisitantedentro[i].horater ? arrayVisitantedentro[i].horater : "";
                                datainiexib = dataini ? 'Início: '+convertMysqldate(dataini) : "";
                                dataterexib = horater ? '<br> Término: '+convertMysqldate(horater) : "";
                                datavisit = datainiexib+dataterexib;

                                cpfexib = cpf ? cpf : "";
                                rgexib = rg ? rg : "";

                                if (arrayVisitantedentro[i].tipo=="1") {
                                    cor="#4caf50";
                                    exibecont = cpf;
                                } else if (arrayVisitantedentro[i].tipo=="2") {
                                    cor="#4caf50";
                                    exibecont = cpfexib+datavisit;
                                }else{
                                    cor="#4caf50";
                                    exibecont = cpf;
                                }

                                // Verifica se o condomínio é sem bloco
                                if(arrayVisitantedentro[i].num_bloco!="Sem bloco"){
                                    var num_bloco = "/" + arrayVisitantedentro[i].num_bloco;
                                }
                                // Verifica se é visitante para o condomínio
                                if (arrayVisitantedentro[i].num_domicilio!="") {
                                    textnomebloco = name+' ('+arrayVisitantedentro[i].num_domicilio+num_bloco+')';
                                }else{
                                    textnomebloco = name+' (Condomínio)';
                                }
                                if (arrayVisitantedentro[i].num_domicilio) {
                                    textbloco = 'Apto: '+arrayVisitantedentro[i].num_domicilio+num_bloco;
                                }else{
                                    textbloco = "Condomínio";
                                }

                                urlVisitante = arrayVisitantedentro[i].urlVisitante.replace("http://","https://");
                                datasearch += '<li class="swipeout item-content">'+
                                                          '<a href="#visitantecont" onclick="visitantecont('+arrayVisitantedentro[i].idvisitante+')" class="swipeout-content item-link item-content">'+
                                                            '<div class="item-media" style="border:solid 4px '+cor+'">'+
                                                              '<img src="'+urlVisitante+'" >'+
                                                            '</div>'+
                                                            '<div class="item-inner">'+
                                                              '<div class="item-title-row">'+
                                                                '<div class="item-title">'+textnomebloco+'</div>'+
                                                              '</div>'+
                                                              '<div class="item-text">'+rgexib+'</div>'+
                                                              '<div class="item-text">'+exibecont+'</div>'+
                                                              '<div class="item-text">'+textbloco+'</div>'+
                                                            '</div>'+
                                                          '</a>'+
                                                          '<div class="swipeout-actions-right">'+
                                                            '<a href="#inserirvisitante" onclick = "editarvisitante('+arrayVisitantedentro[i].idvisitante+')"" class="action2 bg-orange">Editar</a>'+
                                                          '</div>'+
                                                        '</li>';
                            }
                        }

                        if (arrayVisitantefora.length>0){
                            qtdvisitante = arrayVisitantefora.length;
                            var delvisitante ="";
                            var cor="";

                            var name ="";
                            var email ="";
                            var rg = "";
                            var cpf = "";
                            var exibecont = "";
                            var textnomebloco = "";
                            var textbloco = "";
                            var urlVisitante = "";

                            datasearch += '<li class="item-divider"> Visitantes Cadastrados</li>';

                            for (var i = 0; i < qtdvisitante; i++) {

                                name = arrayVisitantefora[i].name ? arrayVisitantefora[i].name : "";
                                email = arrayVisitantefora[i].email ? arrayVisitantefora[i].email : "";
                                rg = arrayVisitantefora[i].rg ? 'RG: ' + arrayVisitantefora[i].rg+'<br>' : "";
                                cpf = arrayVisitantefora[i].cpf ? 'CPF: ' + arrayVisitantefora[i].cpf+'<br>' : "";
                                dataini = arrayVisitantefora[i].horaini ? arrayVisitantefora[i].horaini : "";
                                horater = arrayVisitantefora[i].horater ? arrayVisitantefora[i].horater : "";
                                datainiexib = dataini ? 'Início: '+convertMysqldate(dataini) : "";
                                dataterexib = horater ? '<br> Término: '+convertMysqldate(horater) : "";
                                datavisit = datainiexib+dataterexib;

                                cpfexib = cpf ? cpf : "";
                                rgexib = rg ? rg : "";

                                if (arrayVisitantefora[i].tipo=="1") {
                                    cor="#3f51b5";
                                    exibecont = cpf;
                                } else if (arrayVisitantefora[i].tipo=="2") {
                                    cor="#f44336";
                                    exibecont = cpfexib+datavisit;
                                }

                                // Verifica se o condomínio é sem bloco
                                if(arrayVisitantefora[i].num_bloco!="Sem bloco"){
                                    var num_bloco = " Bloco: " + arrayVisitantefora[i].num_bloco;
                                }
                                // Verifica se é visitante para o condomínio
                                if (arrayVisitantefora[i].num_domicilio!="") {
                                    textnomebloco = name+' ('+arrayVisitantefora[i].num_domicilio+num_bloco+')';
                                }else{
                                    textnomebloco = name+' (Condomínio)';
                                }
                                if (arrayVisitantefora[i].num_domicilio) {
                                    textbloco = 'Apto: '+arrayVisitantefora[i].num_domicilio+num_bloco;
                                }else{
                                    textbloco = "Condomínio";
                                }

                                urlVisitante = arrayVisitantefora[i].urlVisitante.replace("http://","https://");
                                datasearch += '<li class="swipeout item-content">'+
                                                          '<a href="#visitantecont" onclick="visitantecont('+arrayVisitantefora[i].idvisitante+')" class="swipeout-content item-link item-content">'+
                                                            '<div class="item-media" style="border:solid 4px '+cor+'">'+
                                                              '<img src="'+urlVisitante+'" >'+
                                                            '</div>'+
                                                            '<div class="item-inner">'+
                                                              '<div class="item-title-row">'+
                                                                '<div class="item-title">'+textnomebloco+'</div>'+
                                                              '</div>'+
                                                              '<div class="item-text">'+rgexib+'</div>'+
                                                              '<div class="item-text">'+exibecont+'</div>'+
                                                              '<div class="item-text">'+textbloco+'</div>'+
                                                            '</div>'+
                                                          '</a>'+
                                                          '<div class="swipeout-actions-right">'+
                                                            '<a href="#inserirvisitante" onclick = "editarvisitante('+arrayVisitantefora[i].idvisitante+')"" class="action2 bg-orange">Editar</a>'+
                                                          '</div>'+
                                                        '</li>';
                            }
                        }
                    }

                    if (data.search.veiculo) {
                        var dataveiculo = "";
                        qtdveiculo = data.search.veiculo.veiculo.length;
                        var tipo ="";
                        var delveiculo ="";
                        var urlVeiculo = "";

                        datasearch += '<li class="item-divider"> Veículos</li>';

                        for (var i = 0; i < qtdveiculo; i++) {

                            if (data.search.veiculo.veiculo[i].tipo=="1") {
                                tipo = "Carro";
                            } else {
                                tipo = "Moto";
                            }

                            if(data.search.veiculo.veiculo[i].num_bloco!="Sem bloco"){
                                var num_bloco = "/" + data.search.veiculo.veiculo[i].num_bloco;
                            }

                            urlVeiculo = data.search.veiculo.veiculo[i].urlVeiculo.replace("http://","https://");
                            datasearch += '<li class="item-content">'+
                                                      '<a href="#veiculocont" onclick="veiculocont('+data.search.veiculo.veiculo[i].idveiculo+')" class="item-link item-content">'+
                                                        '<div class="item-media" style="border:solid 4px '+data.search.veiculo.veiculo[i].cor+'">'+
                                                          '<img src="'+urlVeiculo+'" >'+
                                                        '</div>'+
                                                        '<div class="item-inner">'+
                                                          '<div class="item-title-row">'+
                                                            '<div class="item-title item-title-veiculo">'+data.search.veiculo.veiculo[i].placa+' ('+data.search.veiculo.veiculo[i].num_domicilio+num_bloco+')</div>'+
                                                          '</div>'+
                                                          '<div class="item-text">'+tipo+'</div>'+
                                                          '<div class="item-text">'+data.search.veiculo.veiculo[i].marca+' - '+data.search.veiculo.veiculo[i].modelo+'</div>'+
                                                          '<div class="item-text">Apto:'+data.search.veiculo.veiculo[i].num_domicilio+num_bloco+'</div>'+
                                                        '</div>'+
                                                      '</a>'+
                                                    '</li>';
                        }
                    }

                    if (data.search.morador) {
                        var datamorador = "";
                        qtdmorador = data.search.morador.morador.length;
                        var delmorador = "";
                        var urlMorador = "";

                        datasearch += '<li class="item-divider"> Moradores</li>';

                        for (var i = 0; i < qtdmorador; i++) {

                            if(data.search.morador.morador[i].num_bloco!="Sem bloco"){
                                var num_bloco = "/" + data.search.morador.morador[i].num_bloco;
                            }
                            
                            urlMorador = data.search.morador.morador[i].urlMorador.replace("http://","https://");
                            datasearch += '<li class="item-content">'+
                                                      '<a href="#moradorcont" onclick="moradorcont('+data.search.morador.morador[i].idmorador+')" class="item-link item-content">'+
                                                        '<div class="item-media">'+
                                                          '<img src="'+urlMorador+'" >'+
                                                        '</div>'+
                                                        '<div class="item-inner">'+
                                                          '<div class="item-title-row">'+
                                                            '<div class="item-title">'+data.search.morador.morador[i].name+' ('+data.search.morador.morador[i].num_domicilio+num_bloco+')</div>'+
                                                          '</div>'+
                                                          '<div class="item-text">'+data.search.morador.morador[i].email+'</div>'+
                                                          '<div class="item-text">Apto:'+data.search.morador.morador[i].num_domicilio+num_bloco+'</div>'+
                                                        '</div>'+
                                                      '</a>'+
                                                    '</li>';
                        }
                    }
                    //atualizar listagem só qando houver diferença
                    var totalqtd = qtdvisitanteaberto + qtdvisitante + qtdveiculo + qtdmorador;
                    var qtdsearchportariahome = $('#searchportariahome-cont li').length - 4;
                    //if (totalqtd!=qtdsearchportariahome) {
                        //console.log("datasearch = "+qtdvisitanteaberto+" + "+qtdvisitante+" + "+qtdveiculo+" + "+qtdmorador+" = "+totalqtd);
                        //console.log("searchportariahome = "+ qtdsearchportariahome);
                        $('#searchportariahome-cont').html(datasearch);
                    //}

                }else{
                    //myApp.hideIndicator();
                    //$('#visitante-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
                //setTimeout(searchhomeportaria, 60000);
            },error: function(data) {
                //myApp.hideIndicator();
                //$('#visitante-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

////////////////////////////  editar visitante ///////////////////
function editarvisitante(idvisitante,action){
    myApp.showIndicator();
    //var datatransparencia;
    //$('#cronograma-cont').html("");
        $('#forminserirvisitante').each (function(){
          this.reset();
        });
        $("#preview-visitante").attr('src',"");
        $("#txtguidvisitante").val("");

        if (localStorage.getItem("portariaIdportaria")) {
            $$('.inserirvisitantepermanente').hide();
            $$('.inserirvisitantetemporario').hide();
            $$('.inserirvisitantehora').removeClass("visivel");

            $('.blocolistcomunicadoli').addClass('visivel');
            $('.domiciliolistcomunicadoli').addClass('visivel');
            listBloco("visitantes");
        }

        $.ajax({
            url: $server+"functionAppVisitante.php?idvisitante="+idvisitante+"&status=all&action=listall",
            dataType : "json",
            success: function(data) {

                if (data!=null) {
                    myApp.hideIndicator();
                    var datavisitante = "";
                    var qtd = data.visitante.length;
                    var delvisitante ="";
                    var cor="";

                    var name ="";
                    var email ="";
                    var rg = "";
                    var cpf = "";
                    var phone = "";
                    var dataini = "";
                    var horater = "";
                    var urlVisitante ="";

                    name = data.visitante[0].name ? data.visitante[0].name : "";
                    email = data.visitante[0].email ? data.visitante[0].email : "";
                    rg = data.visitante[0].rg ? data.visitante[0].rg : "";
                    cpf = data.visitante[0].cpf ? data.visitante[0].cpf : "";
                    phone = data.visitante[0].phone ? data.visitante[0].phone : "";
                    horaini = data.visitante[0].horaini ? data.visitante[0].horaini : "";
                    horater = data.visitante[0].horater ? data.visitante[0].horater : "";
                    horaini = horaini.replace(" ","T");
                    horater = horater.replace(" ","T");
                    urlVisitante = data.visitante[0].urlVisitante ? data.visitante[0].urlVisitante : "";


                    //datavisit = 'Início: '+convertMysqldate(dataini)+'<br> Término: '+convertMysqldate(horater);
                    $("#txtnomevisitante").val(name);
                    $("#txtrgvisitante").val(rg);
                    $("#txtcpfvisitante").val(cpf);
                    $("#txtphonevisitante").val(phone);
                    $("#txtemailvisitante").val(email);
                    $("#txtguidvisitante").val(data.visitante[0].guid);
                    
                    if (urlVisitante!="images/sem_avatar_icone.jpg") {
                        $("#preview-visitante").attr("src",urlVisitante);
                    }

                    /*if (data.visitante[0].tipo=="2") {
                        $('input:radio[name="txttipovisitante"][value="2"]').prop('checked', true);
                        //$("#txttipovisitante val=2").attr("checked","checked");
                        $$('.inserirvisitantehora').addClass("visivel");
                        if (action!="expirados") {
                            $("#txthorainiciotempvisitante").val(horaini);
                            $("#txthoraterminotempvisitante").val(horater);
                        }
                    }*/

                    setTimeout(function(){
                    console.log("idbloco = "+data.visitante[0].idbloco);
                    $("#blocolistportariavisitantes option[value='']").removeAttr("selected");
                    $("#blocolistportariavisitantes option[value="+data.visitante[0].idbloco+"]").attr("selected",true);
                    $("#blocolistportariavisitantes").hide();
                    $("#blocolistportariavisitantes").show();
                    $('#blocolistportariavisitantes').val(data.visitante[0].idbloco).prop('selected', true);
                    listDomicilio(data.visitante[0].idbloco,"visitantes");
                    }, 1000);

                    setTimeout(function(){
                    console.log("iddomicilio = "+data.visitante[0].iddomicilio);
                    $$("#domiciliolistportariavisitantes option[value='']").removeAttr("selected");
                    $("#domiciliolistportariavisitantes option[value="+data.visitante[0].iddomicilio+"]").attr("selected",true);
                    //$('#domiciliolistportariavisitantes option[value="' + data.visitante[0].iddomicilio + '"]').attr({ selected : "selected" });
                    $$("#domiciliolistportariavisitantes").hide();
                    $$("#domiciliolistportariavisitantes").show();
                    $$('#domiciliolistportariavisitantes').val(data.visitante[0].iddomicilio).prop('selected', true);
                    }, 2000);

                    /*setTimeout(function(){
                    console.log("iddomicilio 1 = "+data.visitante[0].iddomicilio);
                    $('#domiciliolistportariavisitantes').val("'"+data.visitante[0].iddomicilio+"'").prop('selected', true);
                    }, 8000);*/

                }else{
                    myApp.hideIndicator();
                    $('#visitante-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#visitante-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

////////////////////////////  list profile editar ///////////////////
$$('.edit_profile').on('click', function(){
    console.log("editar profile");
    /*$$email = $$('#email').val();
    $$password = $$('#password').val();
    $$token = $$('#token').val();
    $$tipoUsuario = "1";*/

    // perfil do usuário
    if (!localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
        //morador
        $$tipoUsuario = "1";
        $(".labelcnpj").hide();
        $$guid = localStorage.getItem("guid");
    }
    if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
        //sindico e morador
        $$tipoUsuario = "2";
        $(".labelcnpj").hide();
        $$guid = localStorage.getItem("guid");
    }
    if (localStorage.getItem("sindicoIdsindico") && !localStorage.getItem("moradorIdmorador")) {
        //sindico
        $$tipoUsuario = "3";
        $(".labelcnpj").hide();
        $$guid = localStorage.getItem("sindicoGuid");
    }
    if (localStorage.getItem("administradoraIdadministradora")) {
        //administrador
        $$tipoUsuario = "4";
        $(".labeldatanascimento").hide();
        $(".labelsexo").hide();
        $(".labelcpf").hide();
        $$guid = localStorage.getItem("administradoraGuid");
    }
    if (localStorage.getItem("portariaIdportaria")) {
        //porteiro
        $$tipoUsuario = "5";
        $(".labelcnpj").hide();
        $$guid = localStorage.getItem("guid");
    }

    $$url = $server+"functionAppProfile.php?guid="+$$guid+"&tipodeusuario="+$$tipoUsuario+"&action=list";

        $.ajax({
             type: "GET",
             url: $$url,
             async: false,
             beforeSend: function(x) {
              if(x && x.overrideMimeType) {
               x.overrideMimeType("application/j-son;charset=UTF-8");
              }
              myApp.showIndicator();
         },
         dataType: "json",
         success: function(data){
            
            $$.each(data.profile, function (chave,dados)
            {


                $('#profilenome').val(dados.name);

                if ($$tipoUsuario!="4") {
                    if (dados.birth_date!=null) {
                        $('#profilebirthdate').val(dataamericana(dados.birth_date));
                    }
                    $('#profilegender option[value="' + dados.gender + '"]').attr({ selected : "selected" });
                    $('#profilecpf').val($('#profilecpf').masked(dados.cpf));

                }else{
                    $('#profilecnpj').val($('#profilecpf').masked(dados.cpf));
                }

                $('#profilephonenumber').val(dados.phone_number);
                $('#profilecellphone').val(dados.cell_phone);
                $("#preview-profile").attr('src',localStorage.getItem("profileImage"));
            });
            myApp.hideIndicator();
        }
         ,error:function(data){
            myApp.hideIndicator();
            myApp.alert('Erro! Favor tentar novamente.');
         }
        });

});





/////////////////////////// imei caixa //////////////////////////////

function caixa(){
    setTimeout(function () {
        myApp.accordionOpen(".item-caixa");
    }, 300);
}

function cameraProfile() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessProfile, onFailProfile, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileProfile(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessProfile, onFailProfile, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });

}


//////////////////////// camera morador options ////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirvendas', function (page) {
    var actionOptionCameraProfile = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraProfile();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileProfile();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];

    // verifica se é App
    if (window.device) {
        // esconte input pwa
        $("#fileProfile").hide();

        $$('.optionCameraProfile').on('click', function (e) {
            // We need to pass additional target parameter (this) for popover
            myApp.actions(actionOptionCameraProfile);
            //alert("but edit Profile");
        });
    }else{

        // esconte botão input Android
        $(".optionCameraProfile").hide();

        function profileFileSelect(evt) {
            var files = evt.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

              // Only process image files.
              if (!f.type.match('image.*')) {
                continue;
              }

              var reader = new FileReader();

              // Closure to capture the file information.
              reader.onload = (function(theFile) {
                return function(e) {
                  // Render thumbnail.
                  //console.log(e);
                  var image = document.getElementById('upload-demo');
                  image.src = e.target.result;
                  onSuccessProfile(e.target.result);
                };
              })(f);

              // Read in the image file as a data URL.
              reader.readAsDataURL(f);
            }
        }

        document.getElementById('fileProfile').addEventListener('change', profileFileSelect, false);
    }

});


function onSuccessProfile(imageData) {

//console.log(imageData);
    /*$('.containeruse').html("");
    $('.containeruse').html('<a href="#" id="use" class="button button-big button-fill button-raised color-orange">DIGITALIZAR</a>');
    $(".img-preview").html("");
    $(".img-preview").html('<img src="" id="upload-demo">');*/
    $(".resulttext").html("");
    $(".resulttext").removeAttr("style");

    // verifica se é App
    if (window.device) {
        var image = "data:image/jpeg;base64," + imageData;
    }else{
        var image = imageData;
    }
    
    //console.log(image);
    
    $('#upload-demo').attr('src', image);
    //$(".profile_foto img").attr("src",image);
    $('#use').removeClass("disabled");

    var resize = new Croppie(document.getElementById('upload-demo'), {
        viewport: { width: 200, height: 70 },
        boundary: { width: 300, height: 200 },
        showZoomer: true,
        enableResize: true,
        enableOrientation: true
    });

    //$('#use').addClass("show");
    $('#use').on('click', function() {
        console.log("upload");

        resize.result('base64').then(function(imageData) {
            myApp.showIndicator();
            //console.log(imageData);
            //var data = [{ image: dataImg }, { name: 'myimgage.jpg' }];
            dataImgCod = imageData.replace('data:image/png;base64,', '');
            var objeto = {
                          "requests": [
                            {
                              "image": {
                                "content": dataImgCod
                              },
                              "features": [
                                {
                                  "type": "TEXT_DETECTION"
                                }
                              ]
                            }
                          ]
                        };

            var apikey = "AIzaSyA4Lj_6YUERcnN1Vtl3CAP8d_DltJXud4M";
            $$url = "https://vision.googleapis.com/v1/images:annotate?key="+apikey;
            $.ajax({
                type: "post",
                url: $$url,
                data: JSON.stringify(objeto),
                processData: false,
                contentType: false,
                cache: false,
             success: function(data){
                myApp.hideIndicator();
                var imeitrue = false;
                var numimei = "";
                var dataImei = 0;

                if (data.responses[0].textAnnotations) {
                    dataImei = data.responses[0].textAnnotations;
                }

                for (var i = 0; i < dataImei.length; i++) {
                    numimei = dataImei[i].description;
                    numimei = numimei.replace("IMEI:","");
                    numimei = numimei.replace("MEI:","");
                    numimei = numimei.replace("EI:","");
                    numimei = numimei.replace("I:","");
                    numimei = numimei.replace("IMEI","");
                    numimei = numimei.replace("1:","");
                    numimei = numimei.replace("2:","");
                    numimei = numimei.replace(" ","");
                    numimei = numimei.trim();
                    //console.log(numimei);
                    //console.log("numero = "+numimei+" = "+isNaN(numimei));
                    //console.log("qtd = "+numimei.length);

                    if ((!isNaN(numimei)) && (numimei.length == 15)) {
                        $(".resulttext").attr("style","padding: 20px 0 10px;");
                        $(".resulttext").html("IMEI = "+numimei);
                        $('#uploadimei').addClass("show");
                        imeitrue = true;
                        $('#uploadimei').removeClass("disabled");
                    }
                    //verifica se não é app nem versao android
                    if (!window.device && !myApp.device.android) {
                        mainView.router.back();
                        atualizarviewpage();                    
                    }
                }
                if (!imeitrue) {
                    $(".resulttext").html("");
                    $('#uploadimei').removeClass("show");
                    myApp.alert('IMEI não reconhecido. Favor tentar novamente!', function () {
                        //verifica se não é app nem versao android
                        if (!window.device && !myApp.device.android) {
                            mainView.router.back();
                            atualizarviewpage();                 
                        }
                    });
                }

            }
             ,error:function(data){
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
             }
            });
        })
    })
}

function atualizarviewpage(){
    myApp.showIndicator();
    console.log("atualizarviewpage");
    setTimeout(function () {
        myApp.hideIndicator();
        console.log("atualizarviewpage settimeout");
        mainView.router.load({pageName: 'inserirvendas'});
    }, 2000);
}

function onFailProfile(message) {
    console.log("erro = "+message);
}

$('#uploadimei').on('click', function() {

        myApp.showIndicator();
        var imagemPerf = $("#upload-demo").attr("src");
        var imei = $(".resulttext").html();
        imei = imei.replace("IMEI = ","");
        imagemPerf = imagemPerf.replace(" ","+");
        //console.log(imagemPerf);
        $$url = $server+"Gerar_json.php";
        //$$url = $server+"Gerar_json_upload.php";

        /*$.ajax($server+'Gerar_json.php?', {
            type: "post",
            data: "imagem="+imagemPerf+"&imei="+imei+"&idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=imageImei",
        })
        .fail(function(data) {
            myApp.hideIndicator();
            console.log(data);
            myApp.alert('Erro! Tente novamente.');
        })     
        .done(function(data) {
            myApp.hideIndicator();
            localStorage.setItem("idimei", data);
            myApp.alert('IMEI enviado com sucesso!');
            $('#use').addClass("disabled");
            $('#uploadimei').addClass("disabled");
            $('.optionCameraProfile').addClass("disabled");            
            $('#uploadimei').html("ENVIADO");
            $('.item-telefone').removeClass("disabled");
            myApp.accordionOpen(".item-telefone");
        });*/

            var objetoInput = { upload: {
                              "imagem": imagemPerf,
                              "imei": imei,
                              "op": "vendas",
                              "action": "imageImei",
                              "idvendedor": localStorage.getItem("idvendedor"),
                        }};

/* var posting = $.post($$url,JSON.stringify(objetoInput));

 posting.done(function( data ) {
            localStorage.setItem("idimei", data);
            myApp.alert('IMEI enviado com sucesso!');
            $('#use').addClass("disabled");
            $('#uploadimei').addClass("disabled");
            $('.optionCameraProfile').addClass("disabled");            
            $('#uploadimei').html("ENVIADO");
            $('.item-telefone').removeClass("disabled");
            myApp.accordionOpen(".item-telefone");
 });
 posting.fail(function( jqXhr, textStatus, errorThrown ){
    myApp.hideIndicator();
        console.log( errorThrown );
});*/
        /*$.ajax({
            type: "post",
            url: $$url,
            data: "imagem="+imagemPerf+"&imei="+imei+"&idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=imageImei",
            dataType: "jsonp",
            async: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type':'application/json'
            },
         success: function(data){
            myApp.hideIndicator();
            localStorage.setItem("idimei", data);
            myApp.alert('IMEI enviado com sucesso!');
            $('#use').addClass("disabled");
            $('#uploadimei').addClass("disabled");
            $('.optionCameraProfile').addClass("disabled");            
            $('#uploadimei').html("ENVIADO");
            $('.item-telefone').removeClass("disabled");
            myApp.accordionOpen(".item-telefone");

        }
         ,error:function(data){
            myApp.hideIndicator();
            console.log(data);
            myApp.alert('Erro! Tente novamente.');
         }
        });*/

/*$.ajax({
            type: "post",
            url: $$url,
            data: JSON.stringify(objetoInput),
            dataType: "json",
            async: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type':'application/json'
            },
         success: function(data){
            myApp.hideIndicator();
            localStorage.setItem("idimei", data);
            myApp.alert('IMEI enviado com sucesso!');
            $('#use').addClass("disabled");
            $('#uploadimei').addClass("disabled");
            $('.optionCameraProfile').addClass("disabled");            
            $('#uploadimei').html("ENVIADO");
            $('.item-telefone').removeClass("disabled");
            myApp.accordionOpen(".item-telefone");

        }
         ,error:function(data){
            myApp.hideIndicator();
            console.log(data);
            myApp.alert('Erro! Tente novamente.');
         }
        });*/

        $.ajax($$url+"?", {
            type: "POST",
                processData: false,
                contentType: false,
                cache: false,
            //data: JSON.stringify(objetoInput),
            data: "imei="+imei+"&imagem="+imagemPerf+"&idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=imageImei",
        })
        .fail(function(data) {
            myApp.hideIndicator();
            console.log(data);
            myApp.alert('Erro! Tente novamente.');
        })     
        .done(function(data) {
            myApp.hideIndicator();
            localStorage.setItem("idimei", data);
            myApp.alert('IMEI enviado com sucesso!');
            $('#use').addClass("disabled");
            $('#uploadimei').addClass("disabled");
            $('#uploadimei').html("ENVIADO");
            $('.item-telefone').removeClass("disabled");
            //$('.container-filetelefone').append('<input type="file" id="fileTelefone" class="inputpwa">');
            myApp.accordionOpen(".item-telefone");
        });

            /*$.ajax({
                type: "post",
                url: $$url,
                data: { upload: JSON.stringify(objetoInput) },
                //data: "imagem="+imagemPerf+"&imei="+imei+"&idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=imageImei",
                //dataType: "text",
                dataType: "json",
                //contentType: "application/json",
                async: false,
                beforeSend: function(x) {
                    if(x && x.overrideMimeType) {
                    x.overrideMimeType("application/j-son;charset=UTF-8");
                    }
                },
             success: function(data){
                myApp.hideIndicator();
                localStorage.setItem("idimei", data);
                myApp.alert('IMEI enviado com sucesso!');
                $('#use').addClass("disabled");
                $('#uploadimei').addClass("disabled");
                $('.optionCameraProfile').addClass("disabled");            
                $('#uploadimei').html("ENVIADO");
                $('.item-telefone').removeClass("disabled");
                myApp.accordionOpen(".item-telefone");

            }
             ,error:function(data){
                myApp.hideIndicator();
                console.log(data);
                myApp.alert('Erro! Tente novamente.');
             }
            });*/

});

    $('.accordion-item').on('click', '.item-link', function(e) {
        e.preventDefault();
        $('.resulttext').toggle();
    });
///////////////////////////// imei telefone ///////////////////////////

function cameraTelefone() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessTelefone, onFailTelefone, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileTelefone(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessTelefone, onFailTelefone, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessTelefone(imageData) {
    /*var image = document.getElementById('preview-telefone');
    image.src = "data:image/jpeg;base64," + imageData;*/
    $('#butinserirtelefone').removeClass("disabled");

    // verifica se é App
    if (window.device) {
        var image = "data:image/jpeg;base64," + imageData;
    }else{
        var image = imageData;
    }
    $('#preview-telefone').attr('src', image);

    //document.getElementById('upload-ocorrencia').value = imageData;
}
function onFailTelefone(message) {
console.log("erro = "+message);
}

///////////////////////////// camera telefone options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirvendas', function (page) {
    var actionOptionCameraTelefone = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraTelefone();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileTelefone();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];


    // verifica se é App
    if (window.device) {
        // esconte input pwa
        $("#fileTelefone").hide();

        $$('.optionCameraTelefone').on('click', function (e) {
            // We need to pass additional target parameter (this) for popover
            myApp.actions(actionOptionCameraTelefone);
            //alert("but inserir ocorrencias");
        });
    }else{
        // esconte botão input Android
        $(".optionCameraTelefone").hide();
        
        function telefoneFileSelect(evt) {
            var files = evt.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

              // Only process image files.
              if (!f.type.match('image.*')) {
                continue;
              }

              var reader = new FileReader();

              // Closure to capture the file information.
              reader.onload = (function(theFile) {
                return function(e) {
                  // Render thumbnail.
                  console.log(e);
                  //var image = document.getElementById('preview-telefone');
                  //image.src = e.target.result;
                  onSuccessTelefone(e.target.result);
                };
              })(f);

              // Read in the image file as a data URL.
              reader.readAsDataURL(f);
            }
        }

        document.getElementById('fileTelefone').addEventListener('change', telefoneFileSelect, false);
    }

    
});

///////////////////////////// acao inserir telefone ///////////////////////////

$('#butinserirtelefone').on('click', function(){
    //alert("enviar");
    if ($("#preview-telefone").attr("src")){
        enviartelefone();
    }else{
        myApp.alert("Opps! Favor tirar uma foto do IMEI do telefone.");
    }
});

///////////////////////////// inserir telefone ///////////////////////////
function enviartelefone()
{
        myApp.showIndicator();
        var imagemPerf = $("#preview-telefone").attr("src");
        $$url = $server+"Gerar_json.php?";
        $.ajax({
            type: "post",
            url: $$url,
            data: "imagem="+imagemPerf+"&idimei="+localStorage.getItem("idimei")+"&idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=imageTelefone",
            processData: false,
            contentType: false,
            cache: false,
         success: function(data){
            myApp.hideIndicator();
            myApp.alert('Foto do celular com IMEI enviada com sucesso!');
            $('#butinserirtelefone').addClass("disabled");
            $('.optionCameraTelefone').addClass("disabled");
            $('#butinserirtelefone').html("ENVIADO");
            $('.item-nota').removeClass("disabled");
            myApp.accordionOpen(".item-nota");
        }
         ,error:function(data){
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
         }
        });
}


///////////////////////////// nota fiscal ///////////////////////////

function cameraNota() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessNota, onFailNota, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileNota(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessNota, onFailNota, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessNota(imageData) {
    /*var image = document.getElementById('preview-nota');
    image.src = "data:image/jpeg;base64," + imageData;*/
    $('#butinserirnota').removeClass("disabled");

    // verifica se é App
    if (window.device) {
        var image = "data:image/jpeg;base64," + imageData;
    }else{
        var image = imageData;
    }
    $('#preview-nota').attr('src', image);

    //document.getElementById('upload-ocorrencia').value = imageData;
}
function onFailNota(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera nota options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirvendas', function (page) {
    var actionOptionCameraNota = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraNota();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileNota();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];


    // verifica se é App
    if (window.device) {
        // esconte input pwa
        $("#fileNota").hide();

        $$('.optionCameraNota').on('click', function (e) {
            // We need to pass additional target parameter (this) for popover
            myApp.actions(actionOptionCameraNota);
            //alert("but inserir ocorrencias");
        });
    }else{
        // esconte botão input App
        $(".optionCameraNota").hide();
        
        function notaFileSelect(evt) {
            var files = evt.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

              // Only process image files.
              if (!f.type.match('image.*')) {
                continue;
              }

              var reader = new FileReader();

              // Closure to capture the file information.
              reader.onload = (function(theFile) {
                return function(e) {
                  // Render thumbnail.
                  console.log(e);
                  //var image = document.getElementById('preview-nota');
                  //image.src = e.target.result;
                  onSuccessNota(e.target.result);
                };
              })(f);

              // Read in the image file as a data URL.
              reader.readAsDataURL(f);
            }
        }

        document.getElementById('fileNota').addEventListener('change', notaFileSelect, false);
    }
    
});

///////////////////////////// acao inserir nota ///////////////////////////

$('#butinserirnota').on('click', function(){
    //alert("enviar");
    if ($("#preview-nota").attr("src")){
        enviarnota();
    }else{
        myApp.alert("Opps! Favor tirar uma foto.");
    }
});

///////////////////////////// inserir nota ///////////////////////////
function enviarnota()
{
        myApp.showIndicator();
        var imagemPerf = $("#preview-nota").attr("src");
        $$url = $server+"Gerar_json.php?";
        $.ajax({
            type: "post",
            url: $$url,
            data: "imagem="+imagemPerf+"&idimei="+localStorage.getItem("idimei")+"&idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=imageNota",
            processData: false,
            contentType: false,
            cache: false,
         success: function(data){
            myApp.hideIndicator();
            myApp.alert('Foto da nota fiscal enviada com sucesso!');
            $('#butinserirnota').addClass("disabled");
            $('.optionCameraNota').addClass("disabled");
            $('#butinserirnota').html("ENVIADO");
            $('.item-termo').removeClass("disabled");
            myApp.accordionOpen(".item-termo");

        }
         ,error:function(data){
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
         }
        });
}


///////////////////////////// acao enviar termo ///////////////////////////

$(document).ready(function(){

    // carrega termo de uso
    $.ajax({
        url: $server+"Gerar_json.php?idtermo=1&op=termo&action=listTermo",
        dataType: "json",
        success: function(data){
            myApp.hideIndicator();
            if (data) {
                var datatermo="";

                datatermo = data[0].descricao;
                //console.log(datatermo);
                $(".cont-termouso").html(nl2br(datatermo));
                myApp.hideIndicator();
            }
        }
        ,error:function(data){
            console.log(data);
            myApp.hideIndicator();
        }
    });

});

$(".keypress").keypress(function() {
  if ($("#number-cel").val().length>=13 && $("#nome-cel").val()!="") {
   $('#termouso').removeClass("disabled"); 
   $('#butinserirtermo').removeClass("disabled"); 
  }
});

$('#termouso').on('click', function(){
    myApp.popup(".popup-termo");
});


$('#butinserirtermo').on('click', function(){
    //alert("enviar");
    if ($("#number-cel").val()!=""){
        enviartermo();
    }else{
        myApp.alert("Opps! Favor preencha todos os campos.");
    }
});

///////////////////////////// enviar termo ///////////////////////////
function enviartermo()
{
        myApp.showIndicator();
        var cel = $("#number-cel").val();
        var nome = $("#nome-cel").val();
        $$url = $server+"Gerar_json.php?";
        $.ajax({
            type: "post",
            url: $$url,
            data: "cel="+cel+"&nome="+nome+"&idimei="+localStorage.getItem("idimei")+"&op=venda&action=termoUso",
            dataType: "json",
         success: function(data){
            console.log(data);
            myApp.hideIndicator();
            myApp.alert('Termo de uso enviado com sucesso!');
            $('#termouso').addClass("disabled");
            $('#butinserirtermo').html("ENVIADO");
            $('.item-assinatura').removeClass("disabled");
            myApp.accordionOpen(".item-assinatura");

        }
         ,error:function(data){
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
         }
        });
}


///////////////////////////////////// assinatura /////////////////////////////
function assinatura() {

    var orientation = window.orientation;
    console.log("orientation = "+orientation);
    if (orientation === 90) {



        console.log("assinatura()");
        var wrapper = document.getElementById("signature-pad");
        var clearButton = wrapper.querySelector("[data-action=clear]");
        var changeColorButton = wrapper.querySelector("[data-action=change-color]");
        var undoButton = wrapper.querySelector("[data-action=undo]");
        var savePNGButton = wrapper.querySelector("[data-action=save-png]");
        var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
        var saveSVGButton = wrapper.querySelector("[data-action=save-svg]");
        var canvas = wrapper.querySelector("canvas");
        var signaturePad = new SignaturePad(canvas, {
          // It's Necessary to use an opaque color when saving image as JPEG;
          // this option can be omitted if only saving as PNG or SVG
          backgroundColor: 'rgb(255, 255, 255)'
        });

        // Adjust canvas coordinate space taking into account pixel ratio,
        // to make it look crisp on mobile devices.
        // This also causes canvas to be cleared.
        function resizeCanvas() {
          // When zoomed out to less than 100%, for some very strange reason,
          // some browsers report devicePixelRatio as less than 1
          // and only part of the canvas is cleared then.
          var ratio =  Math.max(window.devicePixelRatio || 1, 1);

          // This part causes the canvas to be cleared
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext("2d").scale(ratio, ratio);

          // This library does not listen for canvas changes, so after the canvas is automatically
          // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
          // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
          // that the state of this library is consistent with visual state of the canvas, you
          // have to clear it manually.
          signaturePad.clear();
        }

        // On mobile devices it might make more sense to listen to orientation change,
        // rather than window resize events.
        window.onresize = resizeCanvas;
        resizeCanvas();

        /*function download(dataURL, filename) {
          if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
            window.open(dataURL);
          } else {
            var blob = dataURLToBlob(dataURL);
            var url = window.URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
          }
        }*/

        // One could simply use Canvas#toBlob method instead, but it's just to show
        // that it can be done using result of SignaturePad#toDataURL.
        function dataURLToBlob(dataURL) {
          // Code taken from https://github.com/ebidel/filer.js
          var parts = dataURL.split(';base64,');
          var contentType = parts[0].split(":")[1];
          var raw = window.atob(parts[1]);
          var rawLength = raw.length;
          var uInt8Array = new Uint8Array(rawLength);

          for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }

          return new Blob([uInt8Array], { type: contentType });
        }

        clearButton.addEventListener("click", function (event) {
          signaturePad.clear();
        });

        /*undoButton.addEventListener("click", function (event) {
          var data = signaturePad.toData();

          if (data) {
            data.pop(); // remove the last dot or line
            signaturePad.fromData(data);
          }
        });

        changeColorButton.addEventListener("click", function (event) {
          var r = Math.round(Math.random() * 255);
          var g = Math.round(Math.random() * 255);
          var b = Math.round(Math.random() * 255);
          var color = "rgb(" + r + "," + g + "," + b +")";

          signaturePad.penColor = color;
        });

        savePNGButton.addEventListener("click", function (event) {
          if (signaturePad.isEmpty()) {
            alert("Please provide a signature first.");
          } else {
            var dataURL = signaturePad.toDataURL();
            download(dataURL, "signature.png");
          }
        });*/

        saveJPGButton.addEventListener("click", function (event) {
            console.log("saveJPGButton");
          if (signaturePad.isEmpty()) {
            myApp.alert('Assinatura em branco. Favor tentar novamente!');

          } else {
            var dataURL = signaturePad.toDataURL("image/jpeg");
            /*download(dataURL, "signature.jpg");*/
            enviarassinatura(dataURL);
          }
        });

        /*saveSVGButton.addEventListener("click", function (event) {
          if (signaturePad.isEmpty()) {
            alert("Please provide a signature first.");
          } else {
            var dataURL = signaturePad.toDataURL('image/svg+xml');
            download(dataURL, "signature.svg");
          }
        });*/


    } else{
        console.log("Mmmh... você deve girar seu dispositivo para paisagem");
        $(".rotationpage").show();
        pageassinatura = true;
    }
}
window.addEventListener("orientationchange", function() {
    if (window.orientation==90 && pageassinatura==true) {
        $(".rotationpage").hide();
        assinatura();
    }else if(pageassinatura==true){
        $(".rotationpage").show();
    }
});
///////////////////////////// inserir assinatura ///////////////////////////
function enviarassinatura(dataURL)
{
        myApp.showIndicator();
        var imagemPerf = dataURL;
        $$url = $server+"Gerar_json.php?";
        $.ajax({
            type: "post",
            url: $$url,
            data: "imagem="+imagemPerf+"&idimei="+localStorage.getItem("idimei")+"&idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=imageAssinatura",
            dataType: "json",
         success: function(data){
            myApp.hideIndicator();
            localStorage.setItem("idimei", "");
            myApp.alert('Processo concluído com sucesso!', function () { 
                console.log("reload index");
                myApp.closeModal();
                myApp.mainView.router.loadPage("index.html");
                logado();
            });

        }
         ,error:function(data){
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
         }
        });
}



/////////////////////////// acao editar Profile ////////////////////////

$('#buteditprofile').on('click', function(){
    //alert("enviar");
    if (($$('#profilenome').val()!="") &&  ($$('#profilecpf').val()!="" || $$('#profilecnpj').val()!="") && ($$('#profilephonenumber').val()!="")){

            enviarprofile();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }
});


/////////////////////////// eidtar Profile ///////////////////////////
function enviarprofile()
{
        
        imagemPerf = $('#preview-profile').attr("src");

        // perfil do usuário
        if (!localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
            //morador
            $$tipoUsuario = "1";
            $$guid = localStorage.getItem("guid");
        }
        if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
            //sindico e morador
            $$tipoUsuario = "2";
            $$guid = localStorage.getItem("guid");
        }
        if (localStorage.getItem("sindicoIdsindico") && !localStorage.getItem("moradorIdmorador")) {
            //sindico
            $$tipoUsuario = "3";
            $$guid = localStorage.getItem("sindicoGuid");
        }
        if (localStorage.getItem("administradoraIdadministradora")) {
            //administrador
            $$tipoUsuario = "4";
            $$guid = localStorage.getItem("administradoraGuid");
        }
        if (localStorage.getItem("portariaIdportaria")) {
            //porteiro
            $$tipoUsuario = "5";
            $$guid = localStorage.getItem("guid");
        }

        $$imageguid = localStorage.getItem("profileImageGuid");

        // perfil do usuário

        if ($$tipoUsuario!="4") {
            $$profilebirthdate = $$('#profilebirthdate').val();
            $$profilenome = $$('#profilenome').val();
            $$profilecpf = $$('#profilecpf').val();
            $$profilecnpj = "";
            $$profilephonenumber = $$('#profilephonenumber').val();
            $$profilecellphone = $$('#profilecellphone').val();
            $$profilegender = $$('#profilegender').val();
            $$profilepassword = $$('#profilepassword').val();

        }else{
            $$profilebirthdate = "";
            $$profilegender = "";
            $$profilenome = $$('#profilenome').val();
            $$profilecpf = "";
            $$profilecnpj = $$('#profilecnpj').val();
            $$profilephonenumber = $$('#profilephonenumber').val();
            $$profilecellphone = $$('#profilecellphone').val();
            $$profilepassword = $$('#profilepassword').val();
        }

        $('#forminserirprofile').each (function(){
          this.reset();
        });
        $("#preview-profile").attr('src',"");
 
        indexofImage = imagemPerf.indexOf("aptohome");

if (indexofImage!="-1") {
}
         myApp.showIndicator();
        $$url = $server+"functionAppProfile.php?";
        $.ajax({
             type: "post",
             url: $$url,
             data: "txtName="+$$profilenome+"&tipoUsuario="+$$tipoUsuario+"&guid="+$$guid+"&guid_image="+$$imageguid+"&imagem="+imagemPerf+"&txtCpf="+$$profilecpf+"&txtCnpj="+$$profilecnpj+"&txtBirth_date="+$$profilebirthdate+"&txtPhone_number="+$$profilephonenumber+"&txtCell_phone="+$$profilecellphone+"&rdbGender="+$$profilegender+"&txtPassword="+$$profilepassword+"&action=edit",
            dataType: "json",
         success: function(data){
            myApp.hideIndicator();
            $$.each(data.profile, function (chave,dados)
            {
                // perfil do usuário
                localStorage.setItem("moradorNome", "");
                localStorage.setItem("moradorNome", dados.name);
                localStorage.setItem("profileImage", "");
                localStorage.setItem("profileImage", dados.profile_image);
                localStorage.setItem("profileImageGuid", "");
                localStorage.setItem("profileImageGuid", dados.profile_image_guid);

                if ($$tipoUsuario=="1") {
                    profile();
                }else if ($$tipoUsuario=="2") {
                    profile();
                }else if ($$tipoUsuario=="3") {
                    profileSindico();
                }else if ($$tipoUsuario=="4") {
                    profileAdministradora();
                }else if ($$tipoUsuario=="5") {
                    profilePortaria();
                }
                
                myApp.hideIndicator();
                myApp.alert('Usuário editado om sucesso!', function () { mainView.router.load({pageName: 'index'});});
            });
        }
         ,error:function(data){
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
         }
        });

}



///////////////////////////////////// Popup Banner ///////////////////////////

/*$('.back-banner').on('click', function(){
    mainView.router.load({pageName: 'banner'});
});*/

function popupBanner(){
//console.log("popupBanner");
        $.ajax({
            url: $server+"functionAppBanner.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var databanner = "";
                    var qtd = data.banner.length;
                    var idRand = Math.floor(Math.random() * qtd);
                    var idBanner = data.banner[idRand].idBanner;
                    bannercont(idBanner);
                }             
            },error: function(data) {
                myApp.hideIndicator();
                //console.log(data);
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

////////////////////////////////  cameras de seguranca ///////////////////////////
function camerasdeseguranca(){

    myApp.showIndicator();

        $.ajax({
            data : "get",
            url: $server+"functionAppCamera.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            success: function(data) {
                if (data!="") {
                    myApp.hideIndicator();
                    $('#camerasdeseguranca-cont').html(data);
                }else{
                    myApp.hideIndicator();
                    $('#camerasdeseguranca-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            }
             ,error:function(data){
                myApp.hideIndicator();
                $('#camerasdeseguranca-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
             }
        });
    //alert("Entrei");


}


//////////////////////////////// exibe cameras de seguranca //////////////////////
function exibecamerasdeseguranca(data){

    //$('#exibecamerasdeseguranca-cont').html(data);
    //intel.xdk.device.setRotateOrientation("landscape");
    //onlandscape();
    $("#exibecamerasdeseguranca-cont").attr('src',data);
    
}


//////////////////////////////// boleto ////////////////////////////////
function boleto(){
    myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppBoleto.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                //console.log(data);
                if (data!=null) {
                    var qtd = data.boleto.length;

                    for (var i = 0; i < qtd; i++) {

                        $(".iframe-boleto").attr("src",data.boleto[i].url);
                        //$(".iframe-boleto").attr("src","https://actaapp.com21.com.br");

                        $('.iframe-boleto').on("load", function() {
                            myApp.hideIndicator();
                        });
                    }
                }
            }
             ,error:function(data){
                console.log(data);
                myApp.hideIndicator();
             }
        });
}



// Pull to refresh content
var ptrContent = $$('.pagamentos');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        pagamentos();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});


///////////////////////////////////// pagamentos ///////////////////////////
function pagamentos(){

    myApp.showIndicator();


        $.ajax({
            url: $server+"functionAppPagamento.php?idcondominio="+localStorage.getItem("condominioId")+"&idmorador="+localStorage.getItem("moradorIdmorador")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datapagamentos = "";
                    var qtd = data.pagamentos.length;
                    var cor = "";
                    for (var i = 0; i < qtd; i++) {

                    if (data.pagamentos[i].active=="1") {
                        cor="#ffc107";
                    } else if (data.pagamentos[i].active=="2") {
                        cor="#4caf50";
                    }

                    datapagamentos += '<li data-index="'+i+'">'+
                                              '<a href="#pagamentoscont" onclick="pagamentoscont('+data.pagamentos[i].idPagamentos+')" class="item-link item-content">'+
                                                '<div class="item-media" style="border:solid 4px '+cor+'">'+
                                                  '<img src="'+data.pagamentos[i].urlProfile+'" >'+
                                                '</div>'+
                                                '<div class="item-inner">'+
                                                  '<div class="item-title-row">'+
                                                    '<div class="item-title">'+data.pagamentos[i].tituloPagamentos+'</div>'+
                                                    '<div class="item-after align-icon-pagamentos">'+data.pagamentos[i].valorPagamentos+'</div>'+
                                                  '</div>'+
                                                  '<div class="item-subtitle">'+data.pagamentos[i].dataPagamentos+'</div>'+
                                                  '<div class="item-text">'+data.pagamentos[i].descricaoPagamentos+'</div>'+
                                                '</div>'+
                                              '</a>'+                                         
                                            '</li>';
                    $('#pagamentos-cont').html(datapagamentos);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#pagamentos-cont').html("<li class='semregistro'>Você não tem nunhuma negociação de débito em aberto. Pra solicitar uma negociação entre em contato com o Síndico ou Administradora.</li>");
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                $('#pagamentos-cont').html("<li class='semregistro'>Você não tem nunhuma negociação de débito em aberto. Pra solicitar uma negociação entre em contato com o Síndico ou Administradora.</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

///////////////////////////////////// pagamentos conteudo ///////////////////////////
function pagamentoscont(idpagamentos){

    myApp.showIndicator();

        $("#idpagamentos").val(idpagamentos);

        new Card({
            form: document.querySelector('#formCard'),
            container: '.card-wrapper',

            formSelectors: {
                numberInput: 'input#number-card', // optional — default input[name="number"]
                expiryInput: 'input#expiry-card', // optional — default input[name="expiry"]
                cvcInput: 'input#cvc-card', // optional — default input[name="cvc"]
                nameInput: 'input#name-card' // optional - defaults input[name="name"]
            },
            width: 250,
            formatting: true,
            
        });

        $.ajax({
            url: $server+"functionAppPagamento.php?idcondominio="+localStorage.getItem("condominioId")+"&idpagamentos="+idpagamentos+"&idmorador="+localStorage.getItem("moradorIdmorador")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datapagamentos = "";
                    var qtd = data.pagamentos.length;
                    var cor = "";
                    for (var i = 0; i < qtd; i++) {

                        if (data.pagamentos[i].active=="1") {
                            cor="#ffc107";
                        } else if (data.pagamentos[i].active=="2") {
                            cor="#4caf50";
                        }

                        $('#pagamentoscont-cont').html(datapagamentos);
                        $("#txtvalorpagamentos").val(data.pagamentos[i].valorPagamentosFloat);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#pagamentoscont-cont').html("<li class='semregistro'>Você não tem nunhuma negociação de débito. Pra solicitar uma negociação entre em contato com o Síndico.</li>");
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                $('#pagamentoscont-cont').html("<li class='semregistro'>Você não tem nunhuma negociação de débito. Pra solicitar uma negociação entre em contato com o Síndico.</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

myApp.onPageInit('pagamentoscont', function (page) {
        // request a session in Pagseguro 

        $.post(
            $server+"functionAppPagamento.php?action=getSessionId",
            function(response) {
                PagSeguroDirectPayment.setSessionId(response);
                console.log(response);
            }
        );

        $(document).on('keyup', '#formCard input', function(e) {

            $.fn.generateCardAccessToken();
            
        });

        $.fn.generateCardAccessToken = function() { 
            var numberCard = $("#number-card").val();
            numberCard = numberCard.replace( /\s/g, '' );
            var binCard = numberCard.substring(0,6);
            console.log("numberCard = "+binCard);
            var paramBrand = {
                cardBin: binCard,
                success: function(response) {
                    //bandeira encontrada
                    $("#brand-card").val(response.brand.name);
                    console.log(response);
                },
                error: function(response) {
                    //tratamento do erro
                    console.log(response);
                },
                complete: function(response) {
                    //tratamento comum para todas chamadas
                    console.log(response);
                }
            }

            // encontrar bandeira do cartao
            PagSeguroDirectPayment.getBrand(paramBrand);

            // variaveis para criação do card token
            // retira espacos em branco
            if ($('#expiry-card').val()!="") {
                var expiryCard = $('#expiry-card').val();
                var expiryCardSpace = expiryCard.replace( /\s/g, '' );

                // separa mes e ano
                var expiryCardSplit = expiryCardSpace.split('/');
                var expirationMonth = expiryCardSplit[0];
                var expirationYear;
                var expirationYear = expiryCardSplit[1];
                //console.log(expirationYear);
                //console.log(expirationYear.length);
                //verifica se o ano tem 4 digitos senão adiciona 20 na frente
                if (expirationYear.length!=0) {
                    console.log(expirationYear.length);
                    var qtdExpirationYear = expirationYear.length;
                }
                if (qtdExpirationYear==2) {
                    expirationYear = "20"+expirationYear;
                }
            }
            // retira espacos em branco
            var numberCard = $("#number-card").val();
            numberCard = numberCard.replace( /\s/g, '' );
            
            var paramToken= {
                cardNumber: numberCard,
                cvv: $('#cvc-card').val(),
                expirationMonth: expirationMonth,
                expirationYear: expirationYear,
                brand: $('#brand-card').val(),

                success: function(response) {
                    $("#cardToken").val(response.card.token);
                    console.log(response);
                },
                error: function(response) {
                    console.log(response);                        
                },
                complete: function(response) {
                    console.log(response);
                }
            }

            // chamada para criação do card token
            PagSeguroDirectPayment.createCardToken(paramToken);

            var brancCard = $("#brand-card").val();
            var paramInstallments = {
                amount: $("#txtvalorpagamentos").val(),
                brand: $("#brand-card").val(),
                maxInstallmentNoInterest: 1,
                
                success: function(response) {
                    //opções de parcelamento disponível
                    //console.log(response.installments[brancCard]);
                    console.log(response);
                    var qtd = response.installments[brancCard].length;
                    var dataInstallments = "";
                    var semAcrescimo = "";

                    $(".qtdInstallments").html(qtd);
                    //console.log ("qtd = "+qtd);
                    for (var i = 0; i < qtd; i++) {
                        //console.log("qtd loop = "+i);
                        if (i==0){
                            semAcrescimo = " Sem acréscimo";
                        }
                        var formatMoneyFloatinstallmentAmount = formatMoneyReal(response.installments[brancCard][i].installmentAmount);
                        formatMoneyFloatinstallmentAmount = formatMoneyFloat(formatMoneyFloatinstallmentAmount);
                        
                        var formatMoneyFloattotalAmount = formatMoneyReal(response.installments[brancCard][i].totalAmount);
                        formatMoneyFloattotalAmount = formatMoneyFloat(formatMoneyFloattotalAmount);

                        dataInstallments += '<option value="'+response.installments[brancCard][i].quantity+'|'+formatMoneyFloatinstallmentAmount+'|'+formatMoneyFloattotalAmount+'|'+response.installments[brancCard][i].interestFree+'">'+response.installments[brancCard][i].quantity+' x R$ '+formatMoneyReal(response.installments[brancCard][i].installmentAmount)+' = R$ '+formatMoneyReal(response.installments[brancCard][i].totalAmount)+semAcrescimo+'</option>';
                        semAcrescimo = "";
                    }
                    $(".installmentsli").show();
                    $('#installments').html(dataInstallments);
                },
                error: function(response) {
                    //tratamento do erro
                    console.log(response);
                },
                complete: function(response) {
                    //tratamento comum para todas chamadas
                    console.log(response);
                }
            }

            // opções de parcelamentos
            PagSeguroDirectPayment.getInstallments(paramInstallments);
        }

});

/////////////////////////// acao inserir pagamentos ////////////////////////////

$('#butinserirpagamentos').on('click', function(){
    //alert($$('#txttitanuncio').val()+" - "+$$('#txtanuncio').val()+" - "+$$('#txtvaloranuncio').val());
    if (($$('#number-card').val()!="") && ($$('#name-card').val()!="") && ($$('#expiry-card').val()!="") && ($$('#cvc-card').val()!="")) {

            enviarpagamentos();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }
});

///////////////////////////// inserir pagamentos ///////////////////////////
function enviarpagamentos()
{
        $$idpagamentos = $("#idpagamentos").val();
        $$idmorador = localStorage.getItem("moradorIdmorador");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$iddomicilio = localStorage.getItem("moradorIddomicilio");
        $$nameCard = $$('#name-card').val();
        $$cardToken = $$('#cardToken').val();
        $$senderHash = PagSeguroDirectPayment.getSenderHash();
        
        //pega qtd de pagamentos e valor da parcela
        $$quantityInstallment = $$("#installments").val();
        $$quantityInstallment = $$quantityInstallment.split('|');
        $$quantityInstallment = $$quantityInstallment[0];

        $$valueInstallment = $$("#installments").val();
        $$valueInstallment = $$valueInstallment.split('|');
        $$valueInstallment = $$valueInstallment[1];

        $$txtValorPagamentos = $$("#installments").val();
        $$txtValorPagamentos = $$txtValorPagamentos.split('|');
        $$txtValorPagamentos = $$txtValorPagamentos[2];


        myApp.showPreloader("Aguarde enquanto aprovamos seu pagamento!");
        // Salvando imagem no servidor
        $.ajax($server+'functionAppPagamento.php?', {
            type: "post",
            data: "idpagamentos="+$$idpagamentos+"&idmorador="+$$idmorador+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&nameCard="+$$nameCard+"&txtValorPagamentos="+$$txtValorPagamentos+"&cardToken="+$$cardToken+"&senderHash="+$$senderHash+"&quantityInstallment="+$$quantityInstallment+"&valueInstallment="+$$valueInstallment+"&action=pagcartao",
        })
          .fail(function() {
            myApp.hidePreloader();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            $('#formCard').each (function(){
              this.reset();
            });
            if (data!="ok") {
                myApp.hidePreloader();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hidePreloader();
                myApp.alert('Pagamento realizado com sucesso!', function () { mainView.router.load({pageName: 'pagamentos'}); pagamentos();});
            }
          });
}


// Pull to refresh content
var ptrContent = $$('.muraldeanuncios');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        muraldeanuncios();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

/////////////////////////////////////  mural de anuncios ///////////////////////
function muraldeanuncios(){

    myApp.showIndicator();
    //$('#muraldeanuncios-cont').html("");

        // retirar botão inserir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.inserirmuraldeanuncios').removeClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico") || localStorage.getItem("portariaIdportaria")) {
            $('.inserirmuraldeanuncios').addClass('invisivel');
        }
        if (localStorage.getItem("moradorIdmorador") && localStorage.getItem("sindicoIdsindico")) {
            $('.inserirmuraldeanuncios').removeClass('invisivel');
        }
        
        //se sindico for morador do condominio selecionado
        if (localStorage.getItem("sindicoIdsindico")) {
            if (localStorage.getItem("moradorIdCondominio")!=localStorage.getItem("condominioId")) {
                $('.inserirmuraldeanuncios').addClass('invisivel');
            }
        }

        $.ajax({
            url: $server+"functionAppAnuncios.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                //console.log(data);
                if (data!=null) {
                    var qtd = data.anuncio.length;
                    var imgAnuncio = "";
                    var dataAnuncio = "";
                    var delanuncio = "";
                    var swipeout = "";
                    var invisivel = "invisivel";

                    for (var i = 0; i < qtd; i++) {

                        if (localStorage.getItem("moradorIdmorador") == data.anuncio[i].idmorador) {
                            
                            swipeout = "swipeout";
                            invisivel= "";
                            console.log("idmorador = "+localStorage.getItem("moradorIdmorador"));
                            console.log("idmoradoranuncio = "+data.anuncio[i].idmorador);

                        }


                        if (data.anuncio[i].urlAnuncio!="images/sem_foto_cont.jpg") {
                            imgAnuncio = '<div class="card-content"><img src="'+data.anuncio[i].urlAnuncio+'" width="100%"></div>';
                        }
                        delanuncio = "onclick = delanuncio('"+data.anuncio[i].guid+"',"+i+");"
                        dataAnuncio += '<li class="'+swipeout+' swipeout-anuncio" data-index="'+i+'">'+
                                            '<a href="#muraldeanuncioscont" onclick="muraldeanuncioscont('+data.anuncio[i].idAnuncio+');" class="swipeout-content item-link">'+
                                                '<div class="card-cont ks-facebook-card">'+
                                                    '<div class="card-header">'+
                                                        '<div class="ks-facebook-avatar"><img src="'+data.anuncio[i].urlAvatar+'" width="34"></div>'+
                                                            '<div class="ks-facebook-name">'+data.anuncio[i].nameMorador+'</div>'+
                                                            '<div class="ks-facebook-date">'+data.anuncio[i].numBlocoApto+'</div>'+
                                                        '</div>'+
                                                        imgAnuncio+
                                                        '<div class="card-content-inner">'+
                                                            '<div class="facebook-date">'+data.anuncio[i].dataAnuncio+'</div>'+
                                                            '<p class="facebook-title">'+data.anuncio[i].titleAnuncio+'</p>'+
                                                            '<p class="color-green facebook-price">'+data.anuncio[i].priceAnuncio+'</p>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</a>'+
                                            '<div class="'+invisivel+' swipeout-actions-right">'+
                                                '<a href="#" '+delanuncio+' class="action1 bg-red">Delete</a>'+
                                            '</div>'+
                                        '</li>';
                        //$('#muraldeanuncios-cont').append('<li><a href="#muraldeanuncioscont" onclick="muraldeanuncioscont('+data.anuncio[i].idAnuncio+');" class="item-link"><div class="card-cont ks-facebook-card"><div class="card-header"><div class="ks-facebook-avatar"><img src="'+data.anuncio[i].urlAvatar+'" width="34"></div><div class="ks-facebook-name">'+data.anuncio[i].nameMorador+'</div><div class="ks-facebook-date">'+data.anuncio[i].numBlocoApto+'</div></div>'+imgAnuncio+'<div class="card-content-inner"><div class="facebook-date">'+data.anuncio[i].dataAnuncio+'</div><p class="facebook-title">'+data.anuncio[i].titleAnuncio+'</p><p class="color-green facebook-price">'+data.anuncio[i].priceAnuncio+'</p></div></div></div></a></li>');
                        imgAnuncio = "";
                        swipeout = "";
                        invisivel = "invisivel";
                    }

                    $('#muraldeanuncios-cont').html(dataAnuncio);

                myApp.hideIndicator();
                }else{
                    myApp.hideIndicator();
                    $('#muraldeanuncios-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            }
             ,error:function(data){
                myApp.hideIndicator();
                $('#muraldeanuncios-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
             }
        });
}
/////////////////////////////////////  deletar anuncio ///////////////////////////
function delanuncio(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppAnuncios.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-anuncio').eq($("li.swipeout-anuncio[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-anuncio').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}
/////////////////////////////////////  mural de anuncios conteudo /////////////////////////
function muraldeanuncioscont(id){

    myApp.showIndicator();
    $('#muraldeanuncioscont-cont').html("");
    var datamural = "";
        $.ajax({
            url: $server+"functionAppAnuncios.php?idanuncio="+id+"&action=list",
            dataType : "json",
            success: function(data) {

                    var qtd = data.anuncio.length;
                    var imgAnuncio = "";
                    var imgZoom;
                    for (var i = 0; i < qtd; i++) {

                        myPhotoBrowserAnuncio = myApp.photoBrowser({
                            theme: 'dark',
                            ofText: 'de',
                            backLinkText: '',
                            spaceBetween: 0,
                            navbar: true,
                            toolbar: false,
                            photos : [data.anuncio[i].urlAnuncio],
                            type: 'popup'
                        });
                        imgZoom = "onclick=myPhotoBrowserAnuncio.open();";

                        if (data.anuncio[i].urlAnuncio!="images/sem_foto_cont.jpg") {
                            imgAnuncio = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i><img src="'+data.anuncio[i].urlAnuncio+'" '+imgZoom+' width="100%"></div>';
                        }

                        datamural += '<li>'+
                                        '<div class="card-cont ks-facebook-card">'+imgAnuncio+
                                            '<div class="card-header">'+
                                                '<div class="ks-facebook-avatar">'+
                                                    '<img src="'+data.anuncio[i].urlAvatar+'" width="34">'+
                                                '</div>'+
                                                '<div class="ks-facebook-name">'+data.anuncio[i].nameMorador+'</div>'+
                                                '<div class="ks-facebook-date">'+data.anuncio[i].numBlocoApto+'</div>'+
                                            '</div>'+
                                            '<div class="card-content-inner">'+
                                                '<div class="facebook-date">'+data.anuncio[i].dataAnuncio+'</div>'+
                                                '<p class="facebook-title">'+data.anuncio[i].titleAnuncio+'</p>'+
                                                '<p class="item-text">'+data.anuncio[i].descricaoAnuncio+'</p>'+
                                                '<div class="facebook-date">Fone: '+data.anuncio[i].phoneAnuncio+'</div>'+
                                                '<p class="color-green facebook-price">'+data.anuncio[i].priceAnuncio+'</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                            imgAnuncio = "";
                        $('#muraldeanuncioscont-cont').html(datamural);
                        if (data.anuncio[i].whatsappAnuncio=="1") {
                            //$('.whatsapp').addClass("visivel");
                        };
                        $('.whatsapp').attr('onclick',"cordova.plugins.Whatsapp.send('"+data.anuncio[i].phoneAnuncio+"');");
                        $('.tel-anuncio').attr('onclick','openURL("tel:'+trimespaco(data.anuncio[i].phoneAnuncio)+'")');
                    };

                myApp.hideIndicator();
            }
             ,error:function(data){
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
             }
        });
}

///////////////////////////// camera anuncios ///////////////////////////

function cameraAnuncios() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessAnuncios, onFailAnuncios, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileAnuncios(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessAnuncios, onFailAnuncios, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessAnuncios(imageData) {
    var image = document.getElementById('preview-anuncios');
    image.src = "data:image/jpeg;base64," + imageData;

}
function onFailAnuncios(message) {
//alert('Failed because: ' + message);
}

//////////////////////// camera anuncios options /////////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageReinit('inserirmuraldeanuncios', function (page) {
    listCatAnuncio();
});
myApp.onPageInit('inserirmuraldeanuncios', function (page) {
    listCatAnuncio();
    var actionOptionCameraAnuncios = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraAnuncios();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileAnuncios();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraanuncios').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraAnuncios);

    });
    
});
///////////////////////////// listar categorias anuncio //////////////////////////////////
function listCatAnuncio(){
    myApp.showIndicator();

    $.ajax({
        url: $server+"functionAppAnuncios.php?action=listCat",
        dataType : "json",
        success: function(data) {
            console.log("entrei-success");
            $('#txtcatanuncio').html("");
            if (data!=null) {
                myApp.hideIndicator();
                var qtd = data.catanuncio.length;
                var catlist = "";

                catlist += '<option value="">Selecione</option>';
                
                for (var i = 0; i < qtd; i++) {
                    catlist += '<option value="'+data.catanuncio[i].idCatAnuncio+'">'+data.catanuncio[i].nomeCatAnuncio+'</option>';
                }

            }
            $('#txtcatanuncio').html(catlist);
            myApp.hideIndicator();
        },error: function(data) {
            myApp.hideIndicator();
            myApp.alert('Erro ao carregar dados, tente novamente!');
            $('#txtcatanuncio').html("");

        }
    });
}
/////////////////////////// acao inserir anuncios ////////////////////////////

$('#butinseriranuncios').on('click', function(){
    //alert($$('#txttitanuncio').val()+" - "+$$('#txtanuncio').val()+" - "+$$('#txtvaloranuncio').val());
    if (($$('#txttitanuncio').val()!="") && ($$('#txtanuncio').val()!="") && ($$('#txtphonenumber').val()!="") && ($$('#txtvaloranuncio').val()!="")) {

            enviaranuncios();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }
});

///////////////////////////// inserir anuncios ///////////////////////////
function enviaranuncios()
{
 
        imagem = $('#preview-anuncios').attr("src");
        $$idmorador = localStorage.getItem("moradorIdmorador");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$iddomicilio = localStorage.getItem("moradorIddomicilio");
        $$txtcatanuncio = $$('#txtcatanuncio').val();
        $$txttitanuncio = $$('#txttitanuncio').val();
        $$txtDescricao = $$('#txtanuncio').val();
        $$txtPhoneNumber = $$('#txtphonenumberanuncio').val();
        $$txtWhatsapp = $$('#txtwhatsappanuncio').val();
        $$txtvalor = $$('#txtvaloranuncio').val();

        $('#forminserirmuraldeanuncios').each (function(){
          this.reset();
        });
        $("#preview-anuncios").attr('src',"");

        myApp.showIndicator();
        // Salvando imagem no servidor
        $.ajax($server+'functionAppAnuncios.php?', {
            type: "post",
            data: "idmorador="+$$idmorador+"&imagem="+imagem+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&txtcatanuncio="+$$txtcatanuncio+"&txtTitulo="+$$txttitanuncio+"&txtDescricao="+$$txtDescricao+"&txtvalor="+$$txtvalor+"&txtPhoneNumber="+$$txtPhoneNumber+"&txtWhatsapp="+$$txtWhatsapp+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Anúncio inserido com sucesso!', function () { mainView.router.load({pageName: 'muraldeanuncios'}); muraldeanuncios();});
            }
          });
}


/////////////////////////// acao inserir alerta portaria ////////////////////////////

$('#butinseriralertaportaria').on('click', function(){
    //alert($$('#txttitanuncio').val()+" - "+$$('#txtanuncio').val()+" - "+$$('#txtvaloranuncio').val());
    if (($$('#txttitalertaportaria').val()!="") && ($$('#txtalertaportaria').val()!="")) {

            enviaralertaportaria();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }
});

///////////////////////////// inserir alerta portaria ///////////////////////////
function enviaralertaportaria()
{

        $$idportaria = localStorage.getItem("portariaIdportaria");
        $$idcondominio = localStorage.getItem("condominioId");

        $$txttitalertaportaria = $$('#txttitalertaportaria').val();
        $$txtalertaportaria = $$('#txtalertaportaria').val();

        $('#forminseriralertaportaria').each (function(){
          this.reset();
        });

        myApp.showIndicator();
        // Salvando imagem no servidor
        $.ajax($server+'functionAppAlertaPortaria.php?', {
            type: "post",
            data: "idportaria="+$$idportaria+"&idcondominio="+$$idcondominio+"&txtTitulo="+$$txttitalertaportaria+"&txtDescricao="+$$txtalertaportaria+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Alerta inserido com sucesso!', function () { window.location = "index.html";});
            }
          });
}

// Pull to refresh content
var ptrContent = $$('.livroocorrencias');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        livroocorrencias();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

/////////////////////////////////////  livro de ocorrencias ///////////////////////////
function livroocorrencias(){

    // retirar botão inserir
    if (localStorage.getItem("moradorIdmorador")) {
        $('.inserirocorrencias').removeClass('invisivel');
    }
    if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico") || localStorage.getItem("portariaIdportaria")) {
        $('.inserirocorrencias').addClass('invisivel');
    }
    if (localStorage.getItem("moradorIdmorador") && localStorage.getItem("sindicoIdsindico")) {
        $('.inserirocorrencias').removeClass('invisivel');
    }
    //se sindico for morador do condominio selecionado
    if (localStorage.getItem("sindicoIdsindico")) {
        if (localStorage.getItem("moradorIdCondominio")!=localStorage.getItem("condominioId")) {
            $('.inserirocorrencias').addClass('invisivel');
        }
    }

    myApp.showIndicator();
    //$('#ocorrencias-cont').html("");
    var idmorador = "";
    var idcondominio ="";

    /*if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
        idmorador = "";
        idcondominio = localStorage.getItem("condominioId");
    } else if (localStorage.getItem("administradoraIdadministradora") && localStorage.getItem("moradorIdmorador")) {
        idmorador = "";
        idcondominio = localStorage.getItem("condominioId");
    }*/

    if (localStorage.getItem("moradorIdmorador")) {
        idmorador = localStorage.getItem("moradorIdmorador");
    }
    if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
        idmorador = "";
    } else if (localStorage.getItem("administradoraIdadministradora") && localStorage.getItem("moradorIdmorador")) {
        idmorador = "";
    } else if (localStorage.getItem("administradoraIdadministradora")){
        idmorador = "";
    }

    idcondominio = localStorage.getItem("condominioId");

    $.ajax({
        url: $server+"functionAppOcorrencia.php?idmorador="+idmorador+"&idcondominio="+idcondominio+"&action=list",
        dataType : "json",
        success: function(data) {
            if (data!=null) {
                var dataocorrencia = "";
                var qtd = data.ocorrencia.length;
                var delocorrencia = "";
                var swipeout = "";
                var invisivel = "invisivel";

                for (var i = 0; i < qtd; i++) {

                    if (localStorage.getItem("moradorIdmorador")==data.ocorrencia[i].idmorador) {
                        
                        swipeout = "swipeout";
                        invisivel= "";

                    }

                    delocorrencia = "onclick = delocorrencia('"+data.ocorrencia[i].guid+"',"+i+");"
                    dataocorrencia += '<li class="'+swipeout+' swipeout-ocorrencia" data-index="'+i+'">'+
                                              '<a href="#livroocorrenciascont" onclick="livroocorrenciascont('+data.ocorrencia[i].idOcorrencia+')" class="swipeout-content item-link item-content">'+
                                                '<div class="item-media">'+
                                                  '<img src="'+data.ocorrencia[i].urlOcorrencia+'" >'+
                                                '</div>'+
                                                '<div class="item-inner">'+
                                                  '<div class="item-title-row">'+
                                                    '<div class="item-title">'+data.ocorrencia[i].nameMorador+'</div>'+
                                                  '</div>'+
                                                  '<div class="item-subtitle">'+data.ocorrencia[i].numMorador+' - '+data.ocorrencia[i].dataOcorrencia+'</div>'+
                                                  '<div class="item-text">'+data.ocorrencia[i].descricaoOcorrencia+'</div>'+
                                                '</div>'+
                                              '</a>'+
                                                  '<div class="'+invisivel+' swipeout-actions-right">'+
                                                    '<a href="#" '+delocorrencia+' class="action1 bg-red">Delete</a>'+
                                                  '</div>'+
                                            '</li>';
                    $('#ocorrencias-cont').html(dataocorrencia);
                
                    swipeout = "";
                    invisivel = "invisivel";

                }
                myApp.hideIndicator();
            }else{
                myApp.hideIndicator();
                $('#ocorrencias-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }

        },error:function(data){
            myApp.hideIndicator();
            $('#ocorrencias-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            //myApp.alert('Erro! Tente novamente.');
         }
    });
}
/////////////////////////////////////  deletar ocorrencias ///////////////////////////
function delocorrencia(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppOcorrencia.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                console.log($("li.swipeout-ocorrencia[data-index="+eq+"]").index());
                myApp.swipeoutDelete($$('li.swipeout-ocorrencia').eq($("li.swipeout-ocorrencia[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-ocorrencia').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

/////////////////////////////////////  livro de ocorrencias conteudo ///////////////////////////
function livroocorrenciascont(id,push){

    myApp.showIndicator();
    $('#livroocorrenciascont-cont').html("");

        $.ajax({
            url: $server+"functionAppOcorrencia.php?idocorrencia="+id+"&action=list",
            dataType : "json",
            success: function(data) {
                var qtd = data.ocorrencia.length;
                var imgZoom;
                var imgOcorrencia="";
                var pdfView;
                var dataocorrencia="";
                for (var i = 0; i < qtd; i++) {

                    //atualizar condominio logado
                    if (push==true && localStorage.getItem("sindicoIdsindico")) {
                        updateCond(data.ocorrencia[i].idCondominio,true);
                    }
                    if (push==true && localStorage.getItem("administradoraIdadministradora")) {
                        updateCondAdministradora(data.ocorrencia[i].idCondominio,true);
                    }

                    myPhotoBrowserOcorrencia = myApp.photoBrowser({
                        theme: 'dark',
                        ofText: 'de',
                        backLinkText: '',
                        spaceBetween: 0,
                        navbar: true,
                        toolbar: false,
                        photos : [data.ocorrencia[i].urlOcorrencia],
                        type: 'popup'
                    });

                    if (data.ocorrencia[i].urlOcorrencia.indexOf(".pdf")!=-1 || data.ocorrencia[i].urlOcorrencia.indexOf(".PDF")!=-1) {
                        pdfView = "onclick=openURLBrowser('"+data.ocorrencia[i].urlOcorrencia+"');";

                            imgOcorrencia = '<div class="card-content-cont bg-red" '+pdfView+'><i class="fa fa-file-pdf-o fa-3x"></i>'+
                                                        //'<img src="images/icon_pdf.png" '+pdfView+' width="100%">'+
                                                        '<div class="view-pdf">Clique para visualizar</div>'+
                                                    '</div>';
                    }else{
                        imgZoom = "onclick=myPhotoBrowserOcorrencia.open();";

                        if (data.ocorrencia[i].urlOcorrencia!="images/sem_foto_icone.jpg") {
                            imgOcorrencia = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                        '<img src="'+data.ocorrencia[i].urlOcorrencia+'" '+imgZoom+' width="100%">'+
                                                    '</div>';
                        }
                    }

                    dataocorrencia += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+ imgOcorrencia +
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="'+data.ocorrencia[i].urlMorador+'" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.ocorrencia[i].nameMorador+'</div>'+
                                                    '<div class="ks-facebook-date">'+data.ocorrencia[i].numMorador+' - '+data.ocorrencia[i].dataOcorrencia+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-title">'+data.ocorrencia[i].descricaoOcorrencia+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                        imgTransparencia = "";
                    $('#ocorrenciascont-cont').html(dataocorrencia);
                    
                    /*if (data.ocorrencia[i].urlOcorrencia!="images/sem_foto_icone.jpg") {
                        var imgOcorrencia = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i><img src="'+data.ocorrencia[i].urlOcorrencia+'" '+imgZoom+' width="100%"></div>';
                    }

                    $('#ocorrenciascont-cont').html('<li><div class="card-cont ks-facebook-card">'+imgOcorrencia+'<div class="card-header"><div class="ks-facebook-avatar"><img src="'+data.ocorrencia[i].urlMorador+'" width="34"></div><div class="ks-facebook-name">'+data.ocorrencia[i].nameMorador+'</div><div class="ks-facebook-date">'+data.ocorrencia[i].numMorador+'</div></div><div class="card-content-inner"><div class="facebook-date">'+data.ocorrencia[i].dataOcorrencia+'</div><p class="facebook-title">'+data.ocorrencia[i].descricaoOcorrencia+'</p></div></div></div></li>');
                    */
                    //$('#ocorrenciascont-cont').html('<li><div class="item-media"><img src="'+data.ocorrencia[i].urlOcorrencia+'"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+data.ocorrencia[i].nameMorador+'</div></div><div class="item-subtitle">'+data.ocorrencia[i].numMorador+' - '+data.ocorrencia[i].dataOcorrencia+'</div><div class="item-text">'+data.ocorrencia[i].descricaoOcorrencia+'</div></div></li>');
                    //imgAnuncio = "";
                }
                myApp.hideIndicator();
            }
        });


        /////////// lista as respostas //////////

        $.ajax({
            url: $server+"functionAppResposta.php?iddestino=2&idpostdestino="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            
                var dataresposta = '<li class="item-divider border-top-tit">Respostas</li>';
                var qtd = data.resposta.length;
                var imgResposta = "";
                var imgZoom;
                var imgTitle = "Aptohome";
                var dataresp = "";

                for (var i = 0; i < qtd; i++) {

                    if (data.resposta[i].urlResposta!="images/sem_foto_icone.jpg") {

                    myPhotoBrowserRespostacont = myApp.photoBrowser({
                        theme: 'dark',
                        ofText: 'de',
                        backLinkText: '',
                        spaceBetween: 0,
                        navbar: true,
                        toolbar: false,
                        photos : [data.resposta[i].urlResposta],
                        type: 'popup'
                    });

                        imgZoom = "onclick=myPhotoBrowserRespostacont.open();";
                        imgResposta = '<div class="card-content-cont">'+
                                                    '<i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                    '<img src="'+data.resposta[i].urlResposta+'" '+imgZoom+' width="100%">'+
                                                '</div>';
                    }

                    dataresposta += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+ imgResposta +
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="'+data.resposta[i].urlProfile+'" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.resposta[i].name+'</div>'+
                                                    '<div class="ks-facebook-date">'+data.resposta[i].dataResposta+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-date">'+data.resposta[i].descricaoResposta+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                    imgResposta = "";
                }

                $('#ocorrenciasrespcont-cont').append(dataresposta);

            },error: function(data) {
                //myApp.hideIndicator();
                //myApp.alert('Erro! Tente novamente.');
            }
        });

        ////////// limpa form respostas //////////
        $('.resp-cont').html("");
        $('#ocorrenciasrespcont-cont').html("");
        dataresp = '<div class="list-block">'+
                      '<ul>'+
                        '<li class="item-divider border-top-tit">Envie sua resposta</li>'+
                        '<li class="align-top">'+
                          '<div class="item-content">'+
                            '<div class="item-inner">'+
                              '<div class="item-title label">Descrição</div>'+
                                '<div class="item-input">'+
                                  '<input type="hidden" id="iddestinoresp" value="2">'+
                                  '<input type="hidden" id="idpostdestinoresp" value="'+id+'">'+
                                    '<textarea id="txtdescricaoresp" class="resizable" style="height:76px" placeholder="Informe uma descrição"></textarea>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                        '</li>'+
                        '<li>'+
                          '<div class="item-content">'+
                            '<div class="item-inner">'+
                              '<div class="item-title label">Imagem</div>'+
                              '<div class="item-input">'+
                                '<div id="imagem-resp" class="optionCameraResp custom-file-input" onClick="optionCameraResp()"></div>'+
                                  '<div class="img-preview">'+
                                    '<img src="" id="preview-resp"  width="100" height="80">'+
                                  '</div>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</li>'+
                      '</ul>'+
                    '</div>'+
                    '<div class="content-block"><a href="#" id="butinserirresp" onclick="butinserirresp()" class="button button-big button-fill button-raised color-indigo button-full">ENVIAR</a></div>';
            
            $('.resp-ocorrencias-cont').html(dataresp);


}

function inserirocorrencias(){
        $.ajax({
            url: $server+"functionAppOcorrencia.php?idcondominio="+localStorage.getItem("condominioId")+"&action=listTipoLocal",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var qtdTipo = data.tipolocal.tipo.length;
                    var listTipo = "";

                    listTipo += '<option value="" selected="selected">Selecione o Tipo</option>';
                        
                    for (var i = 0; i < qtdTipo; i++) {

                        listTipo += '<option value="'+data.tipolocal.tipo[i].idTipoOcorrencia+'">'+data.tipolocal.tipo[i].nomeTipoOcorrencia+'</option>';
                    }

                    var qtdLocal = data.tipolocal.local.length;
                    var listLocal = "";

                    listLocal += '<option value="" selected="selected">Selecione o Local</option>';
                        
                    for (var i = 0; i < qtdLocal; i++) {

                        listLocal += '<option value="'+data.tipolocal.local[i].idLocalOcorrencia+'">'+data.tipolocal.local[i].nomeLocalOcorrencia+'</option>';
                    }

                }

                $('#idlocalocorrencia').html(listLocal);
                $('#idtipoocorrencia').html(listTipo);
                myApp.hideIndicator(); 
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!', function () { mainView.router.load({pageName: 'livroocorrencias'}); livroocorrencias();});
            }
        });
}

///////////////////////////// camera ocorrencia ///////////////////////////

function cameraOcorrencia() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessOcorrencias, onFailOcorrencias, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileOcorrencia(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessOcorrencias, onFailOcorrencias, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessOcorrencias(imageData) {
    var image = document.getElementById('preview-ocorrencias');
    image.src = "data:image/jpeg;base64," + imageData;
    //document.getElementById('upload-ocorrencia').value = imageData;
}
function onFailOcorrencias(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera ocorrencia options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirocorrencias', function (page) {
    var actionOptionCameraOcorrencia = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraOcorrencia();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileOcorrencia();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraOcorrencias').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraOcorrencia);
        //alert("but inserir ocorrencias");
    });
    
});

///////////////////////////// acao inserir ocorrencias ///////////////////////////

$('#butinserirocorrencias').on('click', function(){
    //alert("enviar");
    if (($$('#idtipoocorrencia').val()!="") &&  ($$('#idlocalocorrencia').val()!="") && ($$('#txtocorrencia').val()!="")){

            enviarocorrencias();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }
});

$$('#pdfFileOcorrencias').on('change', function (e) {
    myApp.showIndicator();
    var files = e.target.files; // FileList object
    console.log("nome = "+files[0].name);
    if (files[0].name.indexOf(".pdf")!=-1 || files[0].name.indexOf(".PDF")!=-1) {
        var image = document.getElementById('preview-pdf-ocorrencias');
        image.src = "images/icon_pdf.png";

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              console.log(e);
              var pdf = document.getElementById('pdfFileOcorrenciasHidden');
              $("#pdfFileOcorrenciasHidden").val(e.target.result);
              //console.log("eu");
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
          myApp.hideIndicator();
        }
    }else{
        myApp.alert('Formato inválido! Escolha um arquivo no formato PDF.');
    }

});

///////////////////////////// inserir ocorrencias ///////////////////////////
function enviarocorrencias()
{
        $$pdfFileOcorrencias = $$('#pdfFileOcorrenciasHidden').val();
 
        imagem = $('#preview-ocorrencias').attr("src");
        $$idmorador = localStorage.getItem("moradorIdmorador");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$iddomicilio = localStorage.getItem("moradorIddomicilio");
        $$idtipoocorrencia = $$('#idtipoocorrencia').val();
        $$idlocalocorrencia = $$('#idlocalocorrencia').val();
        $$txtDescricao = $$('#txtocorrencia').val();

        $("#preview-ocorrencias").attr('src',"");
        $("#preview-pdf-ocorrencias").attr('src',"");

        myApp.showIndicator();

        if (!$$pdfFileOcorrencias) {
            // Salvando imagem no servidor
            $.ajax($server+'functionAppOcorrencia.php?', {
                type: "post",
                data: "idmorador="+$$idmorador+"&imagem="+imagem+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&idtipoocorrencia="+$$idtipoocorrencia+"&idlocalocorrencia="+$$idlocalocorrencia+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if (data!="ok") {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();
                    $('#forminserirocorrencias').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");
                    myApp.alert('Ocorrência inserida com sucesso!', function () { mainView.router.load({pageName: 'livroocorrencias'}); livroocorrencias();});
                }
              });

        }else{

            // Salvando pdf no servidor
            $.ajax($server+'functionAppOcorrencia.php?', {
                type: "post",
                data: "pdf="+$$pdfFileOcorrencias+"&idmorador="+$$idmorador+"&imagem="+imagem+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&idtipoocorrencia="+$$idtipoocorrencia+"&idlocalocorrencia="+$$idlocalocorrencia+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if (data!="ok") {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserirocorrencias').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    myApp.alert('Ocorrência inserida com sucesso!', function () { mainView.router.load({pageName: 'livroocorrencias'}); livroocorrencias();});
                }
              });
        }
}


function transparenciadecontastipo(){
console.log("transparenciadecontastipo");
    myApp.showIndicator();

    $.ajax({
        url: $server+"functionAppTransparencia.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
        dataType : "json",
        success: function(data) {

            var qtd = data.transparencia.length;

            for (var i = 0; i < qtd; i++) {
                switch(data.transparencia[i].idTipo) {
                    case "1":
                    //console.log("docsfinanceiros");
                        $$(".docsfinanceiros").removeClass("invisivel");
                        break;
                    case "2":
                    //console.log("docsprojetos");
                        $$(".docsprojetos").removeClass("invisivel");
                        break;
                    case "3":
                    //console.log("docsinformativos");
                        $$(".docsinformativos").removeClass("invisivel");
                        break;
                    case "4":
                    //console.log("docseditais");
                        $$(".docseditais").removeClass("invisivel");
                        break;
                    case "5":
                    //console.log("docsatas");
                        $$(".docsatas").removeClass("invisivel");
                        break;
                    case "6":
                    //console.log("docsregulamentos");
                        $$(".docsregulamentos").removeClass("invisivel");
                        break;
                    case "7":
                    //console.log("docsdiversos");
                        $$(".docsdiversos").removeClass("invisivel");
                        break;
                    default:
                    //console.log("default");
                        $$(".docsdiversos").removeClass("invisivel");
                }
            }
            if ($(".docstipo ul li:visible").length==1) {
                //console.log("100%");
                $(".docstipo ul li:visible").attr("style","width:100%");
            }
        myApp.hideIndicator();

        },error: function(data) {
                myApp.hideIndicator();
                $('.docstipo').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
        }
    });

}
// Pull to refresh content
var ptrContent = $$('.transparenciadecontas');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        transparenciadecontas();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// transparencia de contas ///////////////////////////
function transparenciadecontas(idTipo){

    myApp.showIndicator();

    $('.badgetransparencia').html();
    badgetransparencia=0;
    //var datatransparencia;
    //$('#transparenciadecontas-cont').html("");

        // retirar botão inserir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.inserirtransparenciadecontas').addClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
            $('.inserirtransparenciadecontas').removeClass('invisivel');
        }

        $.ajax({
            url: $server+"functionAppTransparencia.php?idcondominio="+localStorage.getItem("condominioId")+"&idtipo="+idTipo+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datatransparencia = "";
                    var qtd = data.transparencia.length;
                    var deltransparencia = "";
                    var invisivel ="invisivel";
                    var swipeout ="";

                    for (var i = 0; i < qtd; i++) {

                        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
                            swipeout = "swipeout ";
                            invisivel="";
                        }

                    deltransparencia = "onclick = deltransparencia('"+data.transparencia[i].guid+"',"+i+");"
                    datatransparencia += '<li class="'+swipeout+' swipeout-transparencia" data-index="'+i+'">'+
                                              '<a href="#transparenciadecontascont" onclick="transparenciadecontascont('+data.transparencia[i].idTransparencia+')" class="swipeout-content item-link item-content">'+
                                                '<div class="item-media">'+
                                                  '<img src="'+data.transparencia[i].urlProfile+'" >'+
                                                '</div>'+
                                                '<div class="item-inner">'+
                                                  '<div class="item-title-row">'+
                                                    '<div class="item-title">'+data.transparencia[i].tituloTransparencia+'</div>'+
                                                  '</div>'+
                                                  '<div class="item-subtitle">'+data.transparencia[i].dataTransparencia+'</div>'+
                                                  '<div class="item-text">'+data.transparencia[i].descricaoTransparencia+'</div>'+
                                                '</div>'+
                                              '</a>'+
                                              '<div class="'+invisivel+' swipeout-actions-right">'+
                                                '<a href="#" '+deltransparencia+' class="action1 bg-red">Delete</a>'+
                                              '</div>'+                                            
                                            '</li>';
                    $('#transparenciadecontas-cont').html(datatransparencia);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#transparenciadecontas-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                $('#transparenciadecontas-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

/////////////////////////////////////  deletar transparencia ///////////////////////////
function deltransparencia(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppTransparencia.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-transparencia').eq($("li.swipeout-transparencia[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-transparencia').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// transparencia de contas conteudo ///////////////////////////
function transparenciadecontascont(id){

    myApp.showIndicator();
    //var datatransparencia;
    $('#transparenciadecontascont-cont').html("");

        $.ajax({
            url: $server+"functionAppTransparencia.php?idtransparencia="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var datatransparencia = "";
                var qtd = data.transparencia.length;
                var imgTransparencia = "";
                var imgZoom;
                for (var i = 0; i < qtd; i++) {

                    myPhotoBrowserTransparencia = myApp.photoBrowser({
                        theme: 'dark',
                        ofText: 'de',
                        backLinkText: '',
                        spaceBetween: 0,
                        navbar: true,
                        toolbar: false,
                        photos : [data.transparencia[i].urlTransparencia],
                        type: 'popup'
                    });

                    if (data.transparencia[i].urlTransparencia.indexOf(".pdf")!=-1 || data.transparencia[i].urlTransparencia.indexOf(".PDF")!=-1) {
                        pdfView = "onclick=openURLBrowser('"+data.transparencia[i].urlTransparencia+"');";

                            imgTransparencia = '<div class="card-content-cont bg-red" '+pdfView+'><i class="fa fa-file-pdf-o fa-3x"></i>'+
                                                        //'<img src="images/icon_pdf.png" '+pdfView+' width="100%">'+
                                                        '<div class="view-pdf">Clique para visualizar</div>'+
                                                    '</div>';
                    }else{
                        imgZoom = "onclick=myPhotoBrowserTransparencia.open();";

                        if (data.transparencia[i].urlTransparencia!="images/sem_foto_icone.jpg") {
                            imgTransparencia = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                        '<img src="'+data.transparencia[i].urlTransparencia+'" '+imgZoom+' width="100%">'+
                                                    '</div>';
                        }
                    }

                    datatransparencia += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+ imgTransparencia +
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="'+data.transparencia[i].urlProfile+'" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.transparencia[i].name+'</div>'+
                                                    '<div class="ks-facebook-date">'+data.transparencia[i].dataTransparencia+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-title">'+data.transparencia[i].descricaoTransparencia+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                        imgTransparencia = "";
                    $('#transparenciadecontascont-cont').html(datatransparencia);
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

///////////////////////////// camera transparencia ///////////////////////////

function cameraTransparencia() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessTransparencia, onFailTransparencia, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileTransparencia(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessTransparencia, onFailTransparencia, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessTransparencia(imageData) {
    var image = document.getElementById('preview-transparencia');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailTransparencia(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera transparencia options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirtransparenciadecontas', function (page) {
    var actionOptionCameraTransparencia = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraTransparencia();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileTransparencia();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraTransparencia').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraTransparencia);
    });
    
});

///////////////////////////// acao inserir transparencia ///////////////////////////
$('#butinserirtransparencia').on('click', function(){
    //alert("enviar");

    if (($$('#txttit').val()!="") &&  ($$('#txtdescricao').val()!="")) {

            enviartransparencia();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});
$$('#pdfFileTransparencia').on('change', function (e) {
    myApp.showIndicator();
    var files = e.target.files; // FileList object
    console.log("nome = "+files[0].name);
    if (files[0].name.indexOf(".pdf")!=-1 || files[0].name.indexOf(".PDF")!=-1) {
        var image = document.getElementById('preview-pdf-transparencia');
        image.src = "images/icon_pdf.png";

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              console.log(e);
              var pdf = document.getElementById('pdfFileTransparenciaHidden');
              $("#pdfFileTransparenciaHidden").val(e.target.result);
              myApp.hideIndicator();
              //console.log("eu");
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
          
        }
    }else{
        myApp.alert('Formato inválido! Escolha um arquivo no formato PDF.');
        myApp.hideIndicator();
    }

});
///////////////////////////// inserir transparencia ///////////////////////////
function enviartransparencia()
{
        $$pdfFileTransparencia = $$('#pdfFileTransparenciaHidden').val();
        
        var imagem = $('#preview-transparencia').attr("src");

        $$idcondominio = localStorage.getItem("condominioId");
        $$idsindico = localStorage.getItem("sindicoIdsindico");
        if (localStorage.getItem("administradoraIdadministradora")) {
            $$idadministradora = localStorage.getItem("administradoraIdadministradora");
        }else{
            $$idadministradora = null;
        }
        $$txtTitulo = $$('#txttit').val();
        $$txtDescricao = $$('#txtdescricao').val();
        //$$pdfFileTransparencia = $$('#pdfFileTransparencia').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();
        
        $('#preview-transparencia').attr("src","");
        $("#preview-pdf-transparencia").attr('src',"");

        myApp.showIndicator();

        if (!$$pdfFileTransparencia) {

            // Salvando imagem no servidor
            $.ajax($server+'functionAppTransparencia.php?', {
                type: "post",
                data: "imagem="+imagem+"&idsindico="+$$idsindico+"&idcondominio="+$$idcondominio+"&idadministradora="+$$idadministradora+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserirtransparenciadecontas').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    myApp.alert('Transparência inserida com sucesso!', function () { mainView.router.load({pageName: 'transparenciadecontas'}); transparenciadecontas();});
                }
              });
        }else{

            // Salvando pdf no servidor
            $.ajax($server+'functionAppTransparencia.php?', {
                type: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: "pdf="+$$pdfFileTransparencia+"&idsindico="+$$idsindico+"&idcondominio="+$$idcondominio+"&idadministradora="+$$idadministradora+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserirtransparenciadecontas').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    myApp.alert('Transparência inserida com sucesso!', function () { mainView.router.load({pageName: 'transparenciadecontas'}); transparenciadecontas();});
                }
              });

        }
}


// Pull to refresh content
var ptrContent = $$('.enquetes');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        enquetes();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// enquetes ///////////////////////////
function enquetes(){

    myApp.showIndicator();
    //var datatransparencia;
    //$('#servico-cont').html("");

        // retirar botão inserir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.inserirenquetes').addClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
            $('.inserirenquetes').removeClass('invisivel');
        }

        $.ajax({
            url: $server+"functionAppEnquete.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var dataenquetes = "";
                    var qtd = data.enquetes.length;
                    var delenquetes = "";
                    var datafim = "";
                    var invisivel ="invisivel ";
                    var swipeout ="";

                    for (var i = 0; i < qtd; i++) {

                    if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
                        swipeout = "swipeout ";
                        invisivel="";
                    }
                    console.log(data.enquetes[i].dataFim);
                    if (data.enquetes[i].dataFim!="00/00/0000 ") {
                        datafim = '<div class="item-text"> Prazo final: '+data.enquetes[i].dataFim+'</div>';
                    }else{
                        datafim = "";
                    }
                        
                        delenquetes = "onclick = delenquetes('"+data.enquetes[i].guid+"',"+i+");"
                        dataenquetes += '<li class="'+swipeout+' swipeout-enquetes" data-index="'+i+'">'+
                                                  '<a href="#enquetescont" onclick="enquetescont('+data.enquetes[i].idEnquete+')" class="swipeout-content item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="images/enquete_icone.png" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row">'+
                                                        '<div class="item-title">'+data.enquetes[i].perguntaEnquete+'</div>'+
                                                      '</div>'+
                                                      datafim+
                                                    '</div>'+
                                                  '</a>'+
                                                    '<div class="'+invisivel+'swipeout-actions-right">'+
                                                    '<a href="#" '+delenquetes+' class="action1 bg-red">Encerrar</a>'+
                                                  '</div>'+
                                                '</li>';
                        $('#enquetes-cont').html(dataenquetes);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#enquetes-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#enquetes-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

/////////////////////////////////////  deletar enquetes ///////////////////////////
function delenquetes(guid,eq){

    myApp.confirm('Deseja encerrar essa enquete?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppEnquete.php?guid="+guid+"&action=encerrar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-enquetes').eq($("li.swipeout-enquetes[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-servico').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// enquete conteudo ///////////////////////////
function enquetescont(id){

    myApp.showIndicator();
    //var dataservico;
    $('#enquetecont-cont').html("");

        $.ajax({
            url: $server+"functionAppEnquete.php?idenquete="+id+"&idmorador="+localStorage.getItem("moradorIdmorador")+"&action=listcont",
            dataType : "json",
            success: function(data) {
                myApp.hideIndicator();

                $("#butverresultadoenquetes").attr("onclick","enquetesresultado(\'"+id+"\')");
            

                if (data.enquetes.javotou==1) {
                    $("#butinserirrespenquetes").attr("disabled","disabled");
                    $("#butinserirrespenquetes").html("VOCÊ JÁ PARTICIPOU!");
                }else{
                    $("#butinserirrespenquetes").removeAttr("disabled","disabled");
                    $("#butinserirrespenquetes").html("ENVIAR RESPOSTA");
                }
                var dataenquetes = "";
                var datafim = "";
                var qtd = data.enquetes.enqueteop.length;
                    if (data.enquetes.dataEnqueteFim!="00/00/0000 ") {
                        datafim = '<div class="ks-facebook-date"> Prazo final: '+data.enquetes.dataEnqueteFim+'</div>';
                    }else{
                        datafim = "";
                    }

                    dataenquetes += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<input type="hidden" id="idenquete" value="'+data.enquetes.idEnquete+'">'+
                                                        '<img src="images/enquete_icone.png" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.enquetes.perguntaEnquete+'</div>'+
                                                    datafim+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';

                    for (var i = 0; i < qtd; i++) {
                        
                        dataenquetes += '<li>'+
                                            '<label class="label-radio label-radio-visitante-per item-content">'+
                                              '<input type="radio" name="respenquete" id="respenquete" value="'+data.enquetes.enqueteop[i].idEnqueteOp+'">'+
                                              '<div class="item-media item-media-visitante">'+
                                                '<i class="icon icon-form-radio"></i>'+
                                              '</div>'+
                                              '<div class="item-inner">'+
                                                '<div class="item-title item-title-visitante">'+data.enquetes.enqueteop[i].nomeEnqueteOpcoes+'</div>'+
                                              '</div>'+
                                            '</label>'+
                                        '</li>';
                    }
                    $('#enquetescont-cont').html(dataenquetes);
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

///////////////////////////// acao inserir enquete ///////////////////////////
$('#butinserirrespenquetes').on('click', function(){
    //alert("enviar");

    if ($('#respenquete:checked').val()) {

            enviarrespostaenquetes();

    }else{
        myApp.alert('Selecione uma opção');    
    }

});

///////////////////////////// enviar resposta enquete ///////////////////////////
function enviarrespostaenquetes()
{
 
 //alert("entrei");
        $$idmorador = localStorage.getItem("moradorIdmorador");
        $$idenquete = $$('#idenquete').val();
        $$idenqueteopcoes = $('#respenquete:checked').val();


        $('#forminserirenquetes').each (function(){
          this.reset();
        });

        myApp.showIndicator();
        
        $.ajax($server+'functionAppEnquete.php?', {
            type: "post",
            data: "idmorador="+$$idmorador+"&idenquete="+$$idenquete+"&idenqueteopcoes="+$$idenqueteopcoes+"&action=addVoto",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data=="ok") {
                myApp.hideIndicator();
                myApp.alert('Resposta inserida com sucesso!', function () { mainView.router.load({pageName: 'enquetesresultado'}); enquetesresultado($$idenquete);});
            }else if(data=="not"){
                myApp.hideIndicator();
                myApp.alert('Ops! Você já participou.', function () { mainView.router.back();});
            }else{
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
          });
}

///////////////////////////////////// enquete resultado ///////////////////////////
function enquetesresultado(id){

    myApp.showIndicator();
    //var dataservico;
    $('#enquetesresultado-cont').html("");
    //$('#idenquete').val("");
        $.ajax({
            url: $server+"functionAppEnquete.php?idenquete="+id+"&action=listresult",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();

                var dataenquetes = "";
                var datafim = "";
                var qtd = data.enquetes.enqueteop.length;
                var auxTotal;
                var totalvotos;
                var colorOp = "";
                    
                    if (data.enquetes.dataEnqueteFim!="00/00/0000 ") {
                        datafim = '<div class="ks-facebook-date"> Prazo final: '+data.enquetes.dataEnqueteFim+'</div>';
                    }else{
                        datafim = "";
                    }

                    dataenquetes += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="images/enquete_icone.png" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.enquetes.perguntaEnquete+'</div>'+
                                                    datafim+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';

                    for (var i = 0; i < qtd; i++) {
                        if (data.enquetes.totalVotos!=0) {
                            auxTotal = (data.enquetes.enqueteop[i].countVotos / data.enquetes.totalVotos) * 100;
                            totalvotos = data.enquetes.totalVotos;
                        }else{
                            auxTotal = 0;
                            totalvotos = 0;
                        }
                        //console.log("auxTotal = "+auxTotal);
                        if (auxTotal==0) {
                            stylepercent = "display: none;"
                        }else{
                            stylepercent = "width: calc("+auxTotal.toFixed(0)+"% - 40px);"
                        }
                        if (i == 0) {
                            colorOp = "bg-deeporange";
                        }
                        if (i == 1) {
                            colorOp = "bg-lightgreen";
                        }
                        if (i == 2) {
                            colorOp = "bg-amber";
                        }
                        if (i == 3) {
                            colorOp = "bg-purple";
                        }
                        if (i == 4) {
                            colorOp = "bg-brown";
                        }
                        dataenquetes += '<li>'+
                                            '<label class="label-radio label-radio-enquete item-content bg-blue">'+
                                              '<div class="item-media item-media-enquete">'+auxTotal.toFixed(0)+'%</div>'+
                                              '<div class="item-inner bg-enquetes-votos">'+
                                                '<div class="item-title item-title-visitante">'+data.enquetes.enqueteop[i].nomeEnqueteOpcoes+'</div>'+
                                              '</div>'+
                                              '<div class="item-inner enquetes-votos-percente '+colorOp+'" style="'+stylepercent+'"></div>'+
                                            '</label>'+
                                        '</li>';
                    }
                        dataenquetes += '<li>'+
                                            '<label class="label-radio label-radio-enquete item-content">'+
                                              '<div class="item-inner">'+
                                                '<div class="item-title item-title-visitante total-votos">Total de votos = '+totalvotos+'</div>'+
                                              '</div>'+
                                            '</label>'+
                                        '</li>';
                    $('#enquetesresultado-cont').html(dataenquetes);
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.', function () { mainView.router.back();});
            }
        });
    //alert("Entrei");
}

///////////////////////////// acao inserir enquete ///////////////////////////
$('#butinserirenquetes').on('click', function(){
    //alert("enviar");

    if (($$('#txtdatainicioenquetes').val()!="") && ($$('#txttitenquetes').val()!="") && ($$('#txtresp1').val()!="")) {

            enviarenquetes();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

///////////////////////////// inserir enquete ///////////////////////////
function enviarenquetes()
{
 
 //alert("entrei");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idsindico = localStorage.getItem("sindicoIdsindico");
        $$datainicio = $$('#txtdatainicioenquetes').val();
        $$datafim = $$('#txtdatafimenquetes').val();
        $$txtTitulo = $$('#txttitenquetes').val();
        $$txtresp1 = $$('#txtresp1').val();
        $$txtresp2 = $$('#txtresp2').val();
        $$txtresp3 = $$('#txtresp3').val();
        $$txtresp4 = $$('#txtresp4').val();
        $$txtresp5 = $$('#txtresp5').val();

        $('#forminserirenquetes').each (function(){
          this.reset();
        });

        myApp.showIndicator();
        
        $.ajax($server+'functionAppEnquete.php?', {
            type: "post",
            data: "idsindico="+$$idsindico+"&idcondominio="+$$idcondominio+"&datainicio="+$$datainicio+"&datafim="+$$datafim+"&txtTitulo="+$$txtTitulo+"&txtresp1="+$$txtresp1+"&txtresp2="+$$txtresp2+"&txtresp3="+$$txtresp3+"&txtresp4="+$$txtresp4+"&txtresp5="+$$txtresp5+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Enquete inserida com sucesso!', function () { mainView.router.load({pageName: 'enquetes'}); enquetes();});
            }
          });
}


// Pull to refresh content
var ptrContent = $$('.servico');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        servico();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// servicos terceirizados ///////////////////////////
function servico(){

    myApp.showIndicator();
    //var datatransparencia;
    //$('#servico-cont').html("");

        // retirar botão inserir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.inserirservico').addClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
            $('.inserirservico').removeClass('invisivel');
        }

        $.ajax({
            url: $server+"functionAppServico.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var dataservico = "";
                    var qtd = data.servico.length;
                    var delservico = "";
                    var invisivel ="invisivel ";
                    var swipeout ="";

                    for (var i = 0; i < qtd; i++) {

                    if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
                        swipeout = "swipeout ";
                        invisivel="";
                    }

                        delservico = "onclick = delservico('"+data.servico[i].guid+"',"+i+");"
                        dataservico += '<li class="'+swipeout+' swipeout-servico" data-index="'+i+'">'+
                                                  '<a href="#servicocont" onclick="servicocont('+data.servico[i].idServico+')" class="swipeout-content item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="'+data.servico[i].urlServico+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row">'+
                                                        '<div class="item-title">'+data.servico[i].tituloServico+'</div>'+
                                                      '</div>'+
                                                      '<div class="item-text">'+data.servico[i].descricaoServico+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                    '<div class="'+invisivel+'swipeout-actions-right">'+
                                                    '<a href="#" '+delservico+' class="action1 bg-red">Delete</a>'+
                                                  '</div>'+
                                                '</li>';
                        $('#servico-cont').html(dataservico);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#servico-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#servico-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

/////////////////////////////////////  deletar servico ///////////////////////////
function delservico(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppServico.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-servico').eq($("li.swipeout-servico[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-servico').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// servico conteudo ///////////////////////////
function servicocont(id){

    myApp.showIndicator();
    //var dataservico;
    $('#servicocont-cont').html("");

        $.ajax({
            url: $server+"functionAppServico.php?idservico="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var dataservico = "";
                var qtd = data.servico.length;
                var imgServico = "";
                var imgZoom;
                for (var i = 0; i < qtd; i++) {

                       myPhotoBrowserServicos = myApp.photoBrowser({
                            theme: 'dark',
                            ofText: 'de',
                            backLinkText: '',
                            spaceBetween: 0,
                            navbar: true,
                            toolbar: false,
                            photos : [data.servico[i].urlServico],
                            type: 'popup'
                        });
                        imgZoom = "onclick=myPhotoBrowserServicos.open();";

                if (data.servico[i].urlServico!="images/sem_foto_icone.jpg") {
                    imgServico = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                '<img src="'+data.servico[i].urlServico+'" '+imgZoom+' width="100%">'+
                                            '</div>';
                }
                var $$condominioNome = "";
                if (localStorage.getItem("condominioNome") && localStorage.getItem("sindicoCondominioNome")) {
                    $$condominioNome = localStorage.getItem("sindicoCondominioNome");
                }else if (localStorage.getItem("condominioNome") && localStorage.getItem("administradoraCondominioNome")) {
                    $$condominioNome = localStorage.getItem("administradoraCondominioNome");
                }else if (localStorage.getItem("condominioNome")) {
                    $$condominioNome = localStorage.getItem("condominioNome");
                }else if (localStorage.getItem("sindicoCondominioNome")) {
                    $$condominioNome = localStorage.getItem("sindicoCondominioNome");
                }else if (localStorage.getItem("administradoraCondominioNome")) {
                    $$condominioNome = localStorage.getItem("administradoraCondominioNome");
                }
                dataservico += '<li>'+
                                        '<div class="card-cont ks-facebook-card">'+ imgServico +
                                            '<div class="card-header">'+
                                                '<div class="ks-facebook-avatar">'+
                                                    '<img src="'+data.servico[i].urlSindico+'" width="34">'+
                                                '</div>'+
                                                '<div class="ks-facebook-name">'+data.servico[i].nameSindico+'</div>'+
                                                '<div class="ks-facebook-date">Condomínio: '+$$condominioNome+'</div>'+
                                            '</div>'+
                                            '<div class="card-content-inner">'+
                                                '<p class="facebook-title">'+data.servico[i].tituloServico+'</p>'+
                                                '<p class="item-text">'+data.servico[i].descricaoServico+'</p>'+
                                                '<div class="facebook-date">Fone: '+data.servico[i].phoneServico+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                    imgServico = "";
                $('#servicocont-cont').html(dataservico);
                $('.tel-anuncio').attr('onclick','openURL("tel:'+trimespaco(data.servico[i].phoneServico)+'")');
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

///////////////////////////// camera servico ///////////////////////////

function cameraServico() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessServico, onFailServico, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileServico(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessServico, onFailServico, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessServico(imageData) {
    var image = document.getElementById('preview-servico');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailServico(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera servico options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirservico', function (page) {
    var actionOptionCameraServico = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraServico();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileServico();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraServico').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraServico);
    });
    
});

///////////////////////////// acao inserir servico ///////////////////////////
$('#butinserirservico').on('click', function(){
    //alert("enviar");

    if (($$('#txttitservico').val()!="") && ($$('#txtdescricaoservico').val()!="") && ($$('#txtphoneservico').val()!="")) {

            enviarservico();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

///////////////////////////// inserir servico ///////////////////////////
function enviarservico()
{
 
 //alert("entrei");
        imagem = $('#preview-servico').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$idsindico = localStorage.getItem("sindicoIdsindico");
        $$txtTitulo = $$('#txttitservico').val();
        $$txtDescricao = $$('#txtdescricaoservico').val();
        $$txtPhone = $$('#txtphoneservico').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();

        $('#forminserirservico').each (function(){
          this.reset();
        });
        $("#preview-servico").attr('src',"");

        myApp.showIndicator();
        // Salvando imagem no servidor
        $.ajax($server+'functionAppServico.php?', {
            type: "post",
            data: "imagem="+imagem+"&idsindico="+$$idsindico+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&txtTitulo="+$$txtTitulo+"&txtPhone="+$$txtPhone+"&txtDescricao="+$$txtDescricao+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Serviço inserido com sucesso!', function () { mainView.router.load({pageName: 'servico'}); servico();});
            }
          });
}


// Pull to refresh content
var ptrContent = $$('.cronograma');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        cronograma();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// search cronograma //////////////////////////////////////
    var mySearchbarCronograma = myApp.searchbar('.submenucronograma', {

        searchList: '.list-block-search-cronograma',
        searchIn: '.item-title,.item-text',
        removeDiacritics: true,
        //customSearch: true,

        onEnable: function(s){
            //console.log('enable');
            //$('.inputsearchportariahome').attr("disabled", true);
        },

        onSearch: function(s){
            //console.log(s.value);
        },

        onDisable: function(s){
            console.log("clear");
            //$('#searchportariahome-cont').html("");
        }
    });

///////////////////////////////////// cronograma de funcionarios ///////////////////////////
function cronograma(){

    myApp.showIndicator();
    //var datatransparencia;
    //$('#cronograma-cont').html("");

        // retirar botão inserir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.inserircronograma').addClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
            $('.inserircronograma').removeClass('invisivel');
        }

        $.ajax({
            url: $server+"functionAppCronograma.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datacronograma = "";
                    var qtd = data.cronograma.length;
                    var delcronograma = "";
                    var invisivel ="invisivel ";
                    var swipeout ="";
                    
                    for (var i = 0; i < qtd; i++) {

                    if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
                        swipeout = "swipeout ";
                        invisivel="";
                    }
                        delcronograma = "onclick = delcronograma('"+data.cronograma[i].guid+"',"+i+");"
                        datacronograma += '<li class="'+swipeout+' swipeout-cronograma" data-index="'+i+'">'+
                                                  '<a href="#cronogramacont" onclick="cronogramacont('+data.cronograma[i].idCronograma+')" class="swipeout-content item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="'+data.cronograma[i].urlCronograma+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row">'+
                                                        '<div class="item-title">'+data.cronograma[i].tituloCronograma+'</div>'+
                                                      '</div>'+
                                                      '<div class="item-text">'+data.cronograma[i].descricaoCronograma+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                  '<div class="'+invisivel+'swipeout-actions-right">'+
                                                    '<a href="#" '+delcronograma+' class="action1 bg-red">Delete</a>'+
                                                  '</div>'+
                                                '</li>';
                        $('#cronograma-cont').html(datacronograma);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#cronograma-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#cronograma-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

/////////////////////////////////////  deletar cronograma ///////////////////////////
function delcronograma(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppCronograma.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-cronograma').eq($("li.swipeout-cronograma[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-cronograma').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// cronograma conteudo ///////////////////////////
function cronogramacont(id){

    myApp.showIndicator();
    var $$condominioNome = "";
    if (localStorage.getItem("condominioNome") && localStorage.getItem("sindicoCondominioNome")) {
        $$condominioNome = localStorage.getItem("sindicoCondominioNome");
    }else if (localStorage.getItem("condominioNome") && localStorage.getItem("administradoraCondominioNome")) {
        $$condominioNome = localStorage.getItem("administradoraCondominioNome");
    }else if (localStorage.getItem("condominioNome")) {
        $$condominioNome = localStorage.getItem("condominioNome");
    }else if (localStorage.getItem("sindicoCondominioNome")) {
        $$condominioNome = localStorage.getItem("sindicoCondominioNome");
    }else if (localStorage.getItem("administradoraCondominioNome")) {
        $$condominioNome = localStorage.getItem("administradoraCondominioNome");
    }

    $('#cronogramacont-cont').html("");

        $.ajax({
            url: $server+"functionAppCronograma.php?idcronograma="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var datacronograma = "";
                var qtd = data.cronograma.length;
                var imgCronograma = "";
                var imgZoom;
                for (var i = 0; i < qtd; i++) {

                       myPhotoBrowserCronograma = myApp.photoBrowser({
                            theme: 'dark',
                            ofText: 'de',
                            backLinkText: '',
                            spaceBetween: 0,
                            navbar: true,
                            toolbar: false,
                            photos : [data.cronograma[i].urlCronograma],
                            type: 'popup'
                        });
                        imgZoom = "onclick=myPhotoBrowserCronograma.open();";

                if (data.cronograma[i].urlCronograma!="images/sem_foto_icone.jpg") {
                    imgCronograma= '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                '<img src="'+data.cronograma[i].urlCronograma+'" '+imgZoom+' width="100%">'+
                                            '</div>';
                }

                datacronograma += '<li>'+
                                        '<div class="card-cont ks-facebook-card">'+ imgCronograma +
                                            '<div class="card-header">'+
                                                '<div class="ks-facebook-avatar">'+
                                                    '<img src="'+data.cronograma[i].urlSindico+'" width="34">'+
                                                '</div>'+
                                                '<div class="ks-facebook-name">'+data.cronograma[i].nameSindico+'</div>'+
                                                '<div class="ks-facebook-date">Condomínio: '+$$condominioNome+'</div>'+
                                            '</div>'+
                                            '<div class="card-content-inner">'+
                                                '<p class="facebook-title">'+data.cronograma[i].tituloCronograma+'</p>'+
                                                '<p class="item-text">'+data.cronograma[i].descricaoCronograma+'</p>'+
                                                '<div class="facebook-date">Fone: '+data.cronograma[i].phoneCronograma+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                    imgCronograma = "";
                $('#cronogramacont-cont').html(datacronograma);
                $('.tel-cronograma').attr('onclick','openURL("tel:'+trimespaco(data.cronograma[i].phoneCronograma)+'")');
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

///////////////////////////// camera Cronograma ///////////////////////////

function cameraCronograma() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessCronograma, onFailServico, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileCronograma(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessCronograma, onFailCronograma, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessCronograma(imageData) {
    var image = document.getElementById('preview-cronograma');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailCronograma(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera Cronograma options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserircronograma', function (page) {
    var actionOptionCameraCronograma = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraCronograma();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileCronograma();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraCronograma').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraCronograma);
    });
    
});

///////////////////////////// acao inserir Cronograma ///////////////////////////
$('#butinserircronograma').on('click', function(){
    //alert("enviar");

    if (($$('#txttitcronograma').val()!="") && ($$('#txtdescricaocronograma').val()!="") && ($$('#txtphonecronograma').val()!="")) {

            enviarcronograma();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

///////////////////////////// inserir Cronograma ///////////////////////////
function enviarcronograma()
{
 
 //alert("entrei");
        imagem = $('#preview-cronograma').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$idsindico = localStorage.getItem("sindicoIdsindico");
        $$txtTitulo = $$('#txttitcronograma').val();
        $$txtDescricao = $$('#txtdescricaocronograma').val();
        $$txtPhone = $$('#txtphonecronograma').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();

        $('#forminserircronograma').each (function(){
          this.reset();
        });
        $("#preview-cronograma").attr('src',"");

        myApp.showIndicator();
        // Salvando imagem no servidor
        $.ajax($server+'functionAppCronograma.php?', {
            type: "post",
            data: "imagem="+imagem+"&idsindico="+$$idsindico+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&txtTitulo="+$$txtTitulo+"&txtPhone="+$$txtPhone+"&txtDescricao="+$$txtDescricao+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Equipe inserida com sucesso!', function () { mainView.router.load({pageName: 'cronograma'}); cronograma();});
            }
          });
}


// Pull to refresh content
var ptrContent = $$('.morador');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        morador();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// morador ///////////////////////////
function morador(){

    myApp.showIndicator();
    //var datatransparencia;
    //$('#cronograma-cont').html("");

    // retirar botão inserir
    if (localStorage.getItem("moradorIdmorador")) {
        $('.inseriraddmorador').removeClass('invisivel');
    } else if (localStorage.getItem("moradorIdmorador") && localStorage.getItem("sindicoIdsindico")) {
        $('.inseriraddmorador').removeClass('invisivel');
    } else if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico") || localStorage.getItem("portariaIdportaria")) {
        $('.inseriraddmorador').addClass('invisivel');
    }

    if (localStorage.getItem("sindicoIdsindico")) {
        if (localStorage.getItem("moradorIdCondominio")!=localStorage.getItem("condominioId")) {
            $('.inseriraddmorador').addClass('invisivel');
        }
    }

        $.ajax({
            url: $server+"functionAppMorador.php?idcondominio="+localStorage.getItem("condominioId")+"&iddomicilio="+localStorage.getItem("moradorIddomicilio")+"&idbloco="+localStorage.getItem("moradorIdbloco")+"&action=listall",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datamorador = "";
                    var qtd = data.morador.length;
                    var delmorador = "";
                    var swipeout = "";
                    var invisivel = "invisivel";
                    var ultregi = qtd-1;

                    for (var i = 0; i < qtd; i++) {

                        if (localStorage.getItem("moradorIdmorador")==data.morador[ultregi].idmorador && localStorage.getItem("moradorIdmorador")!=data.morador[i].idmorador) {
                            
                            swipeout = "swipeout";
                            invisivel= "";

                        }

                        delmorador = "onclick = delmorador('"+data.morador[i].guid+"',"+i+");";
                        
                        datamorador += '<li class="'+swipeout+' swipeout-morador" data-index="'+i+'">'+
                                                  '<a href="#moradorcont" onclick="moradorcont('+data.morador[i].idmorador+')" class="swipeout-content item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="'+data.morador[i].urlMorador+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row">'+
                                                        '<div class="item-title">'+data.morador[i].name+'</div>'+
                                                      '</div>'+
                                                      '<div class="item-text">'+data.morador[i].email+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                  '<div class="'+invisivel+' swipeout-actions-right">'+
                                                    '<a href="#" '+delmorador+' class="action1 bg-red">Delete</a>'+
                                                  '</div>'+
                                                '</li>';
                        $('#morador-cont').html(datamorador);
                        swipeout = "";
                        invisivel = "invisivel";
                    }
                }else{
                    myApp.hideIndicator();
                    $('#morador-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#morador-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}
////////////////////// deletar morador /////////////////////////
function delmorador(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppMorador.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-morador').eq($("li.swipeout-morador[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-morador').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// morador conteudo ///////////////////////////
function moradorcont(id){

    myApp.showIndicator();
    //var dataservico;
    $('#moradorcont-cont').html("");

        $.ajax({
            url: $server+"functionAppMorador.php?idmorador="+id+"&action=listall",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var datamorador = "";
                var qtd = data.morador.length;
                var imgMorador = "";
                var imgZoom;
                for (var i = 0; i < qtd; i++) {

                       myPhotoBrowserMorador = myApp.photoBrowser({
                            theme: 'dark',
                            ofText: 'de',
                            backLinkText: '',
                            spaceBetween: 0,
                            navbar: true,
                            toolbar: false,
                            photos : [data.morador[i].urlMorador],
                            type: 'popup'
                        });
                        imgZoom = "onclick=myPhotoBrowserMorador.open();";


                if (data.morador[i].urlMorador!="images/sem_avatar_icone.jpg") {
                    imgMorador= '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-3x fa-search-plus"></i>'+
                                                '<img src="'+data.morador[i].urlMorador+'" '+imgZoom+' width="100%">'+
                                            '</div>';
                }

                datamorador += '<li>'+
                                        '<div class="card-cont ks-facebook-card">'+ imgMorador +
                                            '<div class="card-header">'+
                                                '<div class="ks-facebook-name">'+data.morador[i].name+'</div>'+
                                                '<div class="ks-facebook-date">'+data.morador[i].email+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                    imgMorador = "";
                $('#moradorcont-cont').html(datamorador);

                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

///////////////////////////// camera Morador ///////////////////////////

function cameraAddMorador() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessAddMorador, onFailAddMorador, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileAddMorador(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessAddMorador, onFailAddMorador, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessAddMorador(imageData) {
    var image = document.getElementById('preview-addmorador');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailAddMorador(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera Morador options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inseriraddmorador', function (page) {
    var actionOptionCamerAaddMorador = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraAddMorador();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileAddMorador();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraAddMorador').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCamerAaddMorador);
    });
    
});

///////////////////////////// acao inserir Morador ///////////////////////////
$('#butinseriraddmorador').on('click', function(){
    //alert("enviar");

    if (($$('#txtnomeaddmorador').val()!="") && ($$('#txtemailaddmorador').val()!="")) {

            enviaraddmorador();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});


///////////////////////////// inserir morador ///////////////////////////
function enviaraddmorador()
{
 
 //alert("entrei");
        imagem = $('#preview-addmorador').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$iddomicilio = localStorage.getItem("moradorIddomicilio");
        $$txtNomeAddMorador = $$('#txtnomeaddmorador').val();
        $$txtEmailAddMorador = $$('#txtemailaddmorador').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();

        $('#forminseriraddmorador').each (function(){
          this.reset();
        });
        $("#preview-addmorador").attr('src',"");

        myApp.showIndicator();
        // Salvando imagem no servidor
        $.ajax($server+'functionAppMorador.php?', {
            type: "post",
            data: "imagem="+imagem+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&txtNomeAddMorador="+$$txtNomeAddMorador+"&txtEmailAddMorador="+$$txtEmailAddMorador+"&action=addMorador",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data=="ok") {
               myApp.hideIndicator();
                myApp.alert('Morador inserido com sucesso!', function () { mainView.router.load({pageName: 'morador'}); morador();});
            } else if (data=="erro"){
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert(data);
            }

          });
}

///////////////////////////// inserir morador teste///////////////////////////
$$('#cadastro-teste').on('click', function(){
 
        myApp.showIndicator();

        if ($$('#txtcodcondominio').val()=="") {
            $$idcondominio = "1";
            $$idbloco = "2";
            $$iddomicilio = "3093";
            $$txtNomeAddMorador = $$('#txtnomeaddmoradorteste').val();
            $$txtEmailAddMorador = $$('#txtemailaddmoradorteste').val();
            $$cellPhoneaddMorador = $$('#cellphoneaddmoradorteste').val();

            $('#formaddmoradorteste').each (function(){
              this.reset();
            });

            // Salvando imagem no servidor
            $.ajax($server+'functionAppMorador.php?', {
                type: "post",
                data: "idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&txtNomeAddMorador="+$$txtNomeAddMorador+"&txtEmailAddMorador="+$$txtEmailAddMorador+"&cellPhoneaddMorador="+$$cellPhoneaddMorador+"&action=addMorador",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if (data=="ok") {
                   myApp.hideIndicator();
                    myApp.alert('Morador cadastrado com sucesso!<br><br>Você receberá um email de confirmação para criar sua senha (Caso não receba, verificar na pasta SPAM).', function () { myApp.closeModal('.popup.modal-in');});
                } else if (data=="erro"){
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();
                    myApp.alert(data);
                }

              });

        }else{

            // verifica se cod do condomínio existe
            $.ajax({
                url: $server+"functionAppCondominio.php?codCond="+$$('#txtcodcondominio').val()+"&action=codcond",
                dataType : "json",
                success: function(data) {
                    console.log("cod cond = "+data);
                    if (data!="erro") {

                        $$idcondominio = data;
                        $$txtNomeAddMorador = $$('#txtnomeaddmoradorteste').val();
                        $$txtEmailAddMorador = $$('#txtemailaddmoradorteste').val();
                        $$cellPhoneaddMorador = $$('#cellphoneaddmoradorteste').val();

                        $('#formaddmoradorteste').each (function(){
                          this.reset();
                        });


                        // Salvando morador
                        $.ajax($server+'functionAppMorador.php?', {
                            type: "post",
                            data: "idcondominio="+$$idcondominio+"&txtNomeAddMorador="+$$txtNomeAddMorador+"&txtEmailAddMorador="+$$txtEmailAddMorador+"&cellPhoneaddMorador="+$$cellPhoneaddMorador+"&action=addMorador",
                        })
                          .fail(function() {
                            myApp.hideIndicator();
                            myApp.alert('Erro! Tente novamente.');
                          })     
                          .done(function(data) {
                            if (data=="ok") {
                               myApp.hideIndicator();
                                myApp.alert('Morador cadastrado com sucesso!<br><br>Você receberá um email de confirmação para criar sua senha (Caso não receba, verificar na pasta SPAM).', function () { myApp.closeModal('.popup.modal-in');});
                            } else if (data=="erro"){
                                myApp.hideIndicator();
                                myApp.alert('Erro! Tente novamente.');
                            } else {
                                myApp.hideIndicator();
                                myApp.alert(data);
                            }

                          });
                    }else{
                        myApp.hideIndicator();
                        myApp.alert('Condomínio não encontrado! Informe outro código ou deixe esse campo em branco para se cadastrar no condomínio MODELO.');
                    }
                },error: function(data) {
                        myApp.hideIndicator();
                        myApp.alert('Condomínio não encontrado! Informe outro código ou deixe esse campo em branco para se cadastrar no condomínio MODELO.');
                }
            });
        }

});

// Pull to refresh content
var ptrContent = $$('.alertavisitanteshome');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        visitantealerthome();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// alerta visitante portaria home///////////////////////////
function visitantealerthome(){
$$datavisitante = "";
$$dataalertaportaria = "";
$('#alertavisitanteshome-cont').html("");
        //alertas visitantes expirados
        $.ajax({
            url: $server+"functionAppVisitante.php?idcondominio="+localStorage.getItem("condominioId")+"&active=0&tipo=2&action=listvisitantealert",
            dataType : "json",
            success: function(data) {
                console.log("functionAppVisitante");
                if (data!=null) {
                    myApp.hideIndicator();
                    
                    var qtd = data.visitante.length;
                    var delvisitante ="";
                    var cor="";

                    var name ="";
                    var email ="";
                    var exibecont = "";

                    for (var i = 0; i < qtd; i++) {

                        name = data.visitante[i].name ? data.visitante[i].name : "";
                        email = data.visitante[i].email ? data.visitante[i].email : "";
                        dataini = data.visitante[i].horaini ? data.visitante[i].horaini : "";
                        horater = data.visitante[i].horater ? data.visitante[i].horater : "";
                        datavisit = 'ACESSO BLOQUEADO <br> Término: '+convertDateBrasil(horater);

                        if (data.visitante[i].tipo=="1") {
                            cor="#3f51b5";
                            exibecont = datavisit;
                        } else{
                            cor="#f44336";
                            exibecont = datavisit;
                        }

                        //delvisitante = "onclick = delvisitante('"+data.visitante[i].guid+"',"+i+");"
                        $$datavisitante += '<li date-date="'+convertDateBrasil(data.visitante[i].horater)+'" class="swipeout swipeout-visitante" data-index="'+i+'">'+
                                                  '<a href="#visitantecont" onclick="visitantecont('+data.visitante[i].idvisitante+',\'listvisitantealertstatus\',0)" class="swipeout-content item-link item-content">'+
                                                    '<div class="item-media" style="border:solid 4px '+cor+'">'+
                                                      '<img src="'+data.visitante[i].urlVisitante+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row">'+
                                                        '<div class="item-title">'+name+'</div>'+
                                                      '</div>'+
                                                      '<div class="item-text">'+exibecont+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                  /*'<div class="swipeout-actions-right">'+
                                                    '<a href="#" '+delvisitante+' class="action1 bg-red">Delete</a>'+
                                                  '</div>'+*/
                                                '</li>';
                    }
                    $('#alertavisitanteshome-cont').html($$datavisitante);
                    //console.log("$$datavisitante = "+$$datavisitante);
                }
                alertaportaria();
            },error: function(data) {
            }
        });

        function alertaportaria(){

            // alertas portaria
            $.ajax({
                url: $server+"functionAppAlertaPortaria.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
                dataType : "json",
                success: function(data) {
                    console.log("functionAppAlertaPortaria");
                    if (data!=null) {
                        myApp.hideIndicator();
                        
                        var qtd = data.alertaportaria.length;

                        for (var i = 0; i < qtd; i++) {

                            $$dataalertaportaria += '<li date-date="'+convertDateBrasil(data.alertaportaria[i].dataAlertaPortaria)+'" class="swipeout swipeout-visitante" data-index="'+i+'">'+
                                                      '<a href="#alertaportariahomecont" onclick="alertaportariacont('+data.alertaportaria[i].idAlertaPortaria+')" class="swipeout-content item-link item-content">'+
                                                        '<div class="item-media">'+
                                                          '<img src="'+data.alertaportaria[i].urlAvatar+'" >'+
                                                        '</div>'+
                                                        '<div class="item-inner">'+
                                                          '<div class="item-title-row">'+
                                                            '<div class="item-title">'+data.alertaportaria[i].namePortaria+'</div>'+
                                                          '</div>'+
                                                          '<div class="item-subtitle">'+convertDateBrasil(data.alertaportaria[i].dataAlertaPortaria)+'</div>'+
                                                          '<div class="item-text">'+data.alertaportaria[i].titleAlertaPortaria+'</div>'+
                                                        '</div>'+
                                                      '</a>'+
                                                    '</li>';
                        }
                    }
                        //$$datavisitante += $$dataalertaportaria;
                        $('#alertavisitanteshome-cont').append($$dataalertaportaria);
                        //console.log("$$datavisitante alertaportaria = "+$$datavisitante);
                        
                        ////// reordenar lista por data decrescente ///////
                        reorderAlert();

                },error: function(data) {
                }
            });
            
            //setTimeout(visitantealerthome, 300000);
            //console.log("datavisitante="+$$datavisitante);
        }

            ////// reordenar lista por data decrescente ///////
            reorderAlert();
}

        function reorderAlert(){

            console.log("reorderAlert");
            var mylistAlert = $('#alertavisitanteshome-cont');
            ////// Nenhum registro cadastrado //////
            if (mylistAlert=="") {
                console.log("aqui"+$$('#alertavisitanteshome-cont').html());
                $('#alertavisitanteshome-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
            var listitemsAlert = mylistAlert.children('li').get();
            listitemsAlert.sort(function(a, b) {
                var date1 = $(a).attr('date-date');
                //var dateMsec1 = date1.getTime();

                var date2 = $(b).attr('date-date');
                //var dateMsec2 = date2.getTime();
                //console.log("date1= "+date1+" date2= "+date2);

                var compA = date1;
                var compB = date2;
                //console.log("compA= "+compA+" compB= "+compB);
                return (compB < compA) ? -1 : (compB > compA) ? 1 : 0;
            })
            $.each(listitemsAlert, function(idx, itm) {
                mylistAlert.append(itm);
            });
        }


/////////////// alerta portaria home conteúdo //////////////
function alertaportariacont(id){
    myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppAlertaPortaria.php?idalertaportaria="+id+"&idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var dataalertaportariacont = "";
                var qtd = data.alertaportaria.length;

                for (var i = 0; i < qtd; i++) {

                    dataalertaportariacont += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="'+data.alertaportaria[i].urlAvatar+'" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.alertaportaria[i].namePortaria+'</div>'+
                                                    '<div class="ks-facebook-date">'+convertDateTimeBrasil(data.alertaportaria[i].dataAlertaPortaria)+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-title">'+data.alertaportaria[i].titleAlertaPortaria+'</p>'+
                                                    '<p class="facebook-date">'+data.alertaportaria[i].descricaoAlertaPortaria+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                $('#alertaportariahome-cont').html(dataalertaportariacont);

                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
}

// Pull to refresh content
var ptrContent = $$('.visitante');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        visitante();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// visitante ///////////////////////////
function visitante(){

    myApp.showIndicator();
    //var datatransparencia;
    //$('#cronograma-cont').html("");

        $.ajax({
            url: $server+"functionAppVisitante.php?idcondominio="+localStorage.getItem("condominioId")+"&iddomicilio="+localStorage.getItem("moradorIddomicilio")+"&idbloco="+localStorage.getItem("moradorIdbloco")+"&action=listall",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datavisitante = "";
                    var qtd = data.visitante.length;
                    var delvisitante ="";
                    var cor="";

                    var name ="";
                    var email ="";
                    var cpf = "";
                    var exibecont = "";

                    for (var i = 0; i < qtd; i++) {

                        name = data.visitante[i].name ? data.visitante[i].name : "";
                        cpf = data.visitante[i].cpf ? 'CPF: ' + data.visitante[i].cpf+'<br>' : "";
                        email = data.visitante[i].email ? data.visitante[i].email : "";
                        dataini = data.visitante[i].horaini ? data.visitante[i].horaini : "";
                        horater = data.visitante[i].horater ? data.visitante[i].horater : "";
                        //datavisit = 'Início: '+convertMysqldate(dataini)+'<br> Término: '+convertMysqldate(horater);

                        datainiexib = dataini ? 'Início: '+convertMysqldate(dataini) : "";
                        dataterexib = horater ? '<br> Término: '+convertMysqldate(horater) : "";
                        datavisit = datainiexib+dataterexib;

                        cpfexib = cpf ? cpf : "";

                        if (data.visitante[i].tipo=="1") {
                            cor="#3f51b5";
                            exibecont = cpf;
                        } else{
                            cor="#f44336";
                            exibecont = cpfexib+datavisit;
                        }

                        delvisitante = "onclick = delvisitante('"+data.visitante[i].guid+"',"+i+");"
                        datavisitante += '<li class="swipeout swipeout-visitante" data-index="'+i+'">'+
                                                  '<a href="#visitantecont" onclick="visitantecont('+data.visitante[i].idvisitante+')" class="swipeout-content item-link item-content">'+
                                                    '<div class="item-media" style="border:solid 4px '+cor+'">'+
                                                      '<img src="'+data.visitante[i].urlVisitante+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row">'+
                                                        '<div class="item-title">'+name+'</div>'+
                                                      '</div>'+
                                                      '<div class="item-text">'+exibecont+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                  '<div class="swipeout-actions-right">'+
                                                    '<a href="#" '+delvisitante+' class="action1 bg-red">Delete</a>'+
                                                  '</div>'+
                                                '</li>';
                        $('#visitante-cont').html(datavisitante);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#visitante-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#visitante-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}


///////////////////////////////////// deletar visitante ///////////////////////////
function delvisitante(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppVisitante.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-visitante').eq($("li.swipeout-visitante[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-visitante').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// visitante conteudo ///////////////////////////
function visitantecont(id,action,active){

    myApp.showIndicator();
    //alert(action);
    if (action=="" || action==undefined) {
        action = "listall";
    }
    $('#visitantecont-cont').html("");

    $('#txthorainiciotempvisitanteacesso').val("");
    $('#txthoraterminotempvisitanteacesso').val("");
    $('#guidvisitanteacesso').val("");
    $('#guidvisitante').val("");
    $('#idvisitante').val("");
    
    $("#textinserirvisitanteacessoentrada").hide();
    $("#butinserirvisitanteacessoentrada").show();

    var iddomicilio = localStorage.getItem("moradorIddomicilio") ? localStorage.getItem("moradorIddomicilio") : "";
        $.ajax({
            url: $server+"functionAppVisitante.php?idvisitante="+id+"&iddomicilio="+iddomicilio+"&active="+active+"&status=1&action="+action,
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var datavisitante = "";
                var qtd = data.visitante.length;
                var imgVisitante = "";
                var imgZoom;
                var infoVisitante = "";
                var cor = "";
                var editarvisitantebut = "";
                var exibeHoraini = "";
                var exibeHorater = "";

                var num_domicilio = "";
                var name = "";
                var cpf = "";
                var rg = "";
                var phone ="";
                var email ="";
                for (var i = 0; i < qtd; i++) {


                num_domicilio = data.visitante[i].num_domicilio ? data.visitante[i].num_domicilio : "<i class='icon fa fa-home fa-2x'></i>";
                num_bloco = data.visitante[i].num_bloco ? "/"+data.visitante[i].num_bloco : "";
                name = data.visitante[i].name ? data.visitante[i].name : "";
                cpf = data.visitante[i].cpf ? 'CPF: '+data.visitante[i].cpf : "";
                rg = data.visitante[i].rg ? 'RG: '+data.visitante[i].rg : "";
                phone = data.visitante[i].phone ? 'Fone: '+data.visitante[i].phone : "";
                email = data.visitante[i].email ? 'Email: '+data.visitante[i].email : "";

                myPhotoBrowserVisitante = myApp.photoBrowser({
                    theme: 'dark',
                    ofText: 'de',
                    backLinkText: '',
                    spaceBetween: 0,
                    navbar: true,
                    toolbar: false,
                    photos : [data.visitante[i].urlVisitante],
                    type: 'popup'
                });
                imgZoom = "onclick=myPhotoBrowserVisitante.open();";

                if (data.visitante[i].tipo=="1") {
                    infoVisitante = '<div class="card-content-inner">'+
                                        '<p class="facebook-title">Visitante permanente</p>'+
                                        '<p class="facebook-date">'+phone+'<br>'+email+'</p>'+
                                    '</div>';
                    cor="#3f51b5";
                }
                if (data.visitante[i].tipo=="2") {
                    if (data.visitante[i].horaini) {
                        exibeHoraini = "Inicio: "+convertMysqldate(data.visitante[i].horaini);
                    }
                    if (data.visitante[i].horater) {
                        exibeHorater = "<br>Término: "+convertMysqldate(data.visitante[i].horater);
                    }
                    infoVisitante = '<div class="card-content-inner">'+
                                        '<p class="facebook-title">Visitante temporário</p>'+
                                        '<p class="facebook-date">'+exibeHoraini+exibeHorater+'</p>'+
                                    '</div>';
                    cor="#f44336";
                }
                
                if (localStorage.getItem("portariaIdportaria")) {
                    $(".forminserirvisitanteacesso").show();
                    $('#idvisitante').val(data.visitante[i].idvisitante);
                    $('#guidvisitante').val(data.visitante[i].guid);
                }

                if (data.visitante[i].urlVisitante!="images/sem_avatar_icone.jpg") {
                    imgVisitante= '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-3x fa-search-plus"></i>'+
                                                '<img src="'+data.visitante[i].urlVisitante+'" '+imgZoom+' width="100%">'+
                                            '</div>';
                }
                
                if (localStorage.getItem("portariaIdportaria")) {
                    editarvisitantebut = '<div class="ks-facebook-edit"><a href="#inserirvisitante" onClick="editarvisitante('+data.visitante[i].idvisitante+')"><i class="fa fa-lg fa-edit"></i></a></div>';
                }

                datavisitante = '<li>'+
                                        '<div class="card-cont ks-facebook-card">'+ imgVisitante +
                                            '<div class="card-header">'+
                                                '<div class="ks-facebook-number" style="background:'+cor+'">'+num_domicilio+num_bloco+'</div>'+
                                                '<div class="ks-facebook-name">'+name+'</div>'+
                                                '<div class="ks-facebook-date">'+cpf+'</div>'+
                                                '<div class="ks-facebook-date">'+rg+'</div>'+
                                                editarvisitantebut+
                                            '</div>'+
                                            infoVisitante+
                                        '</div>'+
                                    '</li>';

                    imgVisitante = "";
                    editarvisitantebut = "";
                    infoVisitante = "";
                $('#visitantecont-cont').html(datavisitante);

                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });

        // consultar se existe acesso em aberto e preencher campo
        $.ajax({
            url: $server+"functionAppVisitanteAcesso.php?idvisitante="+id+"&idcondominio="+localStorage.getItem("condominioId")+"&action=listAcesso",
            dataType : "json",
            success: function(data) {
                //console.log("data = "+data)
                if (data!=null) {
                    var qtd = data.visitante.length;
                    var infoVisitante = "";
                    var exibeHoraini = "";
                    var exibeHorater = "";

                    //console.log("acesso = "+data);
                    for (var i = 0; i < qtd; i++) {

                        horaini = data.visitante[0].horaini ? data.visitante[0].horaini : "";
                        horater = data.visitante[0].horater ? data.visitante[0].horater : "";
                        //horaini = horaini.replace(" ","T");
                        //horater = horater.replace(" ","T");
                        
                        $("#butinserirvisitanteacessoentrada").hide();
                        $("#textinserirvisitanteacessoentrada").show();
                        $("#textinserirvisitanteacessoentrada").html("Entrada: "+convertMysqldate(horaini));
                        //$("#textinserirvisitanteacessoentrada").show();
                        //$('#txthorainiciotempvisitanteacesso').val(horaini);
                        //$('#txthoraterminotempvisitanteacesso').val(horater);
                        
                        $('#guidvisitanteacesso').val(data.visitante[0].guid);

                    }
                }
            
            },error: function(data) {
            }
        });


}
// form inserir visitantes portaria home
$('.inserirvisitantehome').on('click', function(){

    $('#forminserirvisitante').each (function(){
      this.reset();
    });
    $("#preview-visitante").attr('src',"");
    $("#txtguidvisitante").val("");
    $$('.inserirvisitantehora').removeClass("visivel");

    if (localStorage.getItem("portariaIdportaria")) {
        //esconde tipo de visitantes
        $$('.inserirvisitantepermanente').hide();
        $$('.inserirvisitantetemporario').hide();

        $('.blocolistcomunicadoli').addClass('visivel');
        $('.domiciliolistcomunicadoli').addClass('visivel');
        listBloco("visitantes");
    }
});

// Visitante para o condominio
$('.label-checkbox-visitantecondominio').on('click', function(){
    console.log("txtvisitantecondominio");
    setTimeout(function () {
        if (localStorage.getItem("portariaIdportaria") && $('#txtvisitantecondominio:checked').val()=="1") {
            console.log("esconde bloco visitante");
            
            $$('.blocolistcomunicadoli').removeClass("visivel");
            if ($$('.domiciliolistportariavisitantes').val()!="undefined") {
                $$('.domiciliolistcomunicadoli').removeClass("visivel");
            }
        }else{
            console.log("não e portaria ou não clicou em visitante para o condominio");
            //esconde bloco visitantes
            $$('.blocolistcomunicadoli').removeClass("visivel");
            $$('.blocolistcomunicadoli').addClass("visivel");
            if ($$('.domiciliolistportariavisitantes').val()) {
                console.log("domicilio undefined");
                $$('.domiciliolistcomunicadoli').removeClass("visivel");
                $$('.domiciliolistcomunicadoli').addClass("visivel");
            }
        }
    }, 100);
});

///////////////////////////// camera visitante ///////////////////////////

function cameraVisitante() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessVisitante, onFailVisitante, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    targetHeight: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileVisitante(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessVisitante, onFailVisitante, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    targetHeight: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessVisitante(imageData) {
    var image = document.getElementById('preview-visitante');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailVisitante(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera Visitante options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirvisitante', function (page) {

    var actionOptionCameraVisitante = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraVisitante();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileVisitante();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraVisitante').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraVisitante);
    });
    if (!localStorage.getItem("portariaIdportaria")){
        $$(".visitantecondominioli").addClass("invisivel");
    }
    
});

$$('.label-radio-visitante-temp').on('click', function (e) {

        $$('.inserirvisitantehora').addClass("visivel");
});
$$('.label-radio-visitante-per').on('click', function (e) {

        $$('.inserirvisitantehora').removeClass("visivel");
});

///////////////////////////// acao inserir Visitante ///////////////////////////
$('#butinserirvisitante').on('click', function(){

    if (localStorage.getItem("portariaIdportaria")) {
        if (!$('#txtvisitantecondominio:checked').val()){
            if ($$('#blocolistportariavisitantes').val()=="" || $$('#domiciliolistportariavisitantes').val()=="") {
                myApp.alert('Selecione o Bloco e Apartamento.');
            }else{

                if ($$('#txtnomevisitante').val()!="") {
                    enviarvisitante();
                }else{
                    myApp.alert('Preencha todos os campos.');    
                }
            }
        }else{
            if ($$('#txtnomevisitante').val()!="") {
                enviarvisitante();
            }else{
                myApp.alert('Preencha todos os campos.');    
            }
        }
    }else{  

        var datainicio = new Date($$('#txthorainiciotempvisitante').val());
        var datatermino = new Date($$('#txthoraterminotempvisitante').val());

        if ($$('#txtnomevisitante').val()!="") {
            if (datatermino<datainicio) {
                myApp.alert('Data término deve ser maior que data início'); 
            } else if (($$('#txthorainiciotempvisitante').val()!="") && ($$('#txthorainiciotempvisitante').val()==$$('#txthoraterminotempvisitante').val())) {
                 myApp.alert('Data início e término devem ser diferentes'); 
            } else{
                enviarvisitante();
            }
        }else{
            myApp.alert('Preencha todos os campos.');    
        }
    }

});

///////////////////////////// autocomplete nome visitante ///////////////////////////////

    myApp.onPageInit('inserirvisitante', function (page) {
        // Fruits data demo array
        // var nomesVisitantes = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple').split(' ');
        var nomesVisitantes = "";
        var idsVisitantes = "";

            $.ajax({
                url: $server+"functionAppVisitante.php?idcondominio="+localStorage.getItem("condominioId")+"&status=0&action=listall",
                dataType : "json",
                success: function(data) {
                    if (data!=null) {
                        myApp.hideIndicator();
                        var datavisitante = "";
                        var qtd = data.visitante.length;
                        var delvisitante ="";
                        var cor="";

                        var name ="";
                        var email ="";
                        var exibecont = "";
                        for (var i = 0; i < qtd; i++) {

                            name = data.visitante[i].name ? data.visitante[i].name : "";
                            nomesVisitantes += name+",";
                            idsVisitantes += data.visitante[i].idvisitante+",";
                        }
                    }
                    localStorage.setItem("nomesVisitantes", nomesVisitantes);
                    localStorage.setItem("idsVisitantes", idsVisitantes);
                    //console.log("nomesVisitantes = "+nomesVisitantes);
                    //console.log("idsVisitantes = "+idsVisitantes);
                    autocompletevisitante();
                },error: function(data) {

                }
            });
    });

    myApp.onPageReinit('inserirvisitante', function (page) {
        // Fruits data demo array
        // var nomesVisitantes = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple').split(' ');
        var nomesVisitantes = "";
        var idsVisitantes = "";

            $.ajax({
                url: $server+"functionAppVisitante.php?idcondominio="+localStorage.getItem("condominioId")+"&status=0&action=listall",
                dataType : "json",
                success: function(data) {
                    if (data!=null) {
                        myApp.hideIndicator();
                        var datavisitante = "";
                        var qtd = data.visitante.length;
                        var delvisitante ="";
                        var cor="";

                        var name ="";
                        var email ="";
                        var exibecont = "";
                        for (var i = 0; i < qtd; i++) {

                            name = data.visitante[i].name ? data.visitante[i].name : "";
                            nomesVisitantes += name+",";
                            idsVisitantes += data.visitante[i].idvisitante+",";
                        }
                    }
                    localStorage.setItem("nomesVisitantes", nomesVisitantes);
                    localStorage.setItem("idsVisitantes", idsVisitantes);
                    //console.log("nomesVisitantes = "+nomesVisitantes);
                    //console.log("idsVisitantes = "+idsVisitantes);
                    autocompletevisitante();
                },error: function(data) {

                }
            });
    });    

    
function autocompletevisitante(){
        if (localStorage.getItem("portariaIdportaria")) {
            var nomesVisitantesArray = localStorage.getItem("nomesVisitantes").split(',');
            var idsVisitantesArray = localStorage.getItem("idsVisitantes").split(',');
            //console.log("nomesVisitantesArray 1 = " + nomesVisitantesArray);

            var autocompleteDropdownExpand = myApp.autocomplete({
                input: '#txtnomevisitante',
                openIn: 'dropdown',
                updateInputValueOnSelect: true,
                expandInput: true, // expand input
                source: function (autocomplete, query, render) {
                    var results = [];
                    if (query.length === 0) {
                        render(results);
                        return;
                    }
                    // Find matched items
                    for (var i = 0; i < nomesVisitantesArray.length; i++) {
                        if (nomesVisitantesArray[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(nomesVisitantesArray[i]);
                    }
                    // Render items by passing array with result items
                    render(results);
                },
                onChange: function (autocomplete, value) {
                    $$('#txtnomevisitante').find('input').val(value);
                    editarvisitante(idsVisitantesArray[nomesVisitantesArray.indexOf(value)],"expirados");
                    console.log("value = "+nomesVisitantesArray.indexOf(value));
                    //console.log("id = "+idsVisitantesArray[nomesVisitantesArray.indexOf(value)]);
                    //console.log("autocomplete = "+autocomplete[0]);
                }
            });
        }
}


///////////////////////////// inserir visitante ///////////////////////////
function enviarvisitante()
{
 
 //alert("entrei");
        imagem = $('#preview-visitante').attr("src");

        if (!localStorage.getItem("portariaIdportaria")) {
                $$idcondominio = localStorage.getItem("condominioId");
                $$idbloco = localStorage.getItem("moradorIdbloco");
                $$iddomicilio = localStorage.getItem("moradorIddomicilio");
                $$portaria = false;
        }else{
            if ($('#txtvisitantecondominio:checked').val()!="1"){
                $$idcondominio = localStorage.getItem("condominioId");
                $$idbloco = $$('#blocolistportariavisitantes').val();
                $$iddomicilio =$$('#domiciliolistportariavisitantes').val();
                $$portaria = true;
            }else{
                $$idcondominio = localStorage.getItem("condominioId");
                $$idbloco = "";
                $$iddomicilio = "";
                $$portaria = true;
            }
        }
        $$txtNomeVisitante = $$('#txtnomevisitante').val();
        $$txtEmailVisitante = $$('#txtemailvisitante').val();
        $$txtRgVisitante = $$('#txtrgvisitante').val();
        $$txtCpfVisitante = $$('#txtcpfvisitante').val();
        $$txtPhoneVisitante = $$('#txtphonevisitante').val();
        if (localStorage.getItem("portariaIdportaria")) {
            $$txtTipoVisitante = 3;
        }else{
            $$txtTipoVisitante = $$('#txttipovisitante:checked').val();
        }
        $$txtHoraInicio = $$('#txthorainiciotempvisitante').val();
        $$txtHoraTermino = $$('#txthoraterminotempvisitante').val();
        $$guid = $$('#txtguidvisitante').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();

        $('#forminserirvisitante').each (function(){
          this.reset();
        });
        $("#preview-visitante").attr('src',"");

        myApp.showIndicator();
        // Salvando visitante servidor
        $.ajax($server+'functionAppVisitante.php?', {
            type: "post",
            data: "portaria="+$$portaria+"&imagem="+imagem+"&idcondominio="+$$idcondominio+"&guid="+$$guid+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&txtNomeVisitante="+$$txtNomeVisitante+"&txtEmailVisitante="+$$txtEmailVisitante+"&txtCpfVisitante="+$$txtCpfVisitante+"&txtRgVisitante="+$$txtRgVisitante+"&txtPhoneVisitante="+$$txtPhoneVisitante+"&txtTipoVisitante="+$$txtTipoVisitante+"&txtHoraInicio="+$$txtHoraInicio+"&txtHoraTermino="+$$txtHoraTermino+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data=="" || data =="erro") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
                console.log(data);
            } else {
                myApp.hideIndicator();
                if (localStorage.getItem("portariaIdportaria")) {
                    myApp.alert('Visitante inserido com sucesso!', function () { mainView.router.load({pageName: 'index'});});
                }else{
                    myApp.alert('Visitante inserido com sucesso!', function () { mainView.router.load({pageName: 'visitante'}); visitante();});
                }
            }
          });


    $('#forminserirvisitante').each (function(){
      this.reset();
    });

    $$('.inserirvisitantehora').removeClass("visivel");

}


// form inserir visitantes acesso entrada
$('#butinserirvisitanteacessoentrada').on('click', function(){

    enviarvisitanteacesso("entrada");

});

// form inserir visitantes acesso saída
$('#butinserirvisitanteacessosaida').on('click', function(){

    enviarvisitanteacesso("saida");

});

///////////////////////////// inserir visitante acesso ///////////////////////////
function enviarvisitanteacesso(acesso)
{

        $$idcondominio = localStorage.getItem("condominioId");
        $$idvisitante = $$('#idvisitante').val();
        $$guidvisitante = $$('#guidvisitante').val();
        $$guid = $$('#guidvisitanteacesso').val();


        $('#forminserirvisitanteacesso').each (function(){
          this.reset();
        });


        myApp.showIndicator();
        // Salvando no servidor
        $.ajax($server+'functionAppVisitanteAcesso.php?', {
            type: "post",
            data: "acesso="+acesso+"&idcondominio="+$$idcondominio+"&idvisitante="+$$idvisitante+"&guidvisitante="+$$guidvisitante+"&guid="+$$guid+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
                console.log(data);
            } else {
                myApp.hideIndicator();
                if (acesso=="entrada") {
                    myApp.alert('Entrada inserida com sucesso!', function () { mainView.router.load({pageName: 'index'});});
                }else if (acesso=="saida") {
                    myApp.alert('Saída inserida com sucesso!', function () { mainView.router.load({pageName: 'index'});});
                }
            }
          });

}




// Pull to refresh content
var ptrContent = $$('.veiculo');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        veiculo();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// veiculo ///////////////////////////
function veiculo(){

    myApp.showIndicator();
    //var datatransparencia;
    //$('#cronograma-cont').html("");

        $.ajax({
            url: $server+"functionAppVeiculo.php?idcondominio="+localStorage.getItem("condominioId")+"&iddomicilio="+localStorage.getItem("moradorIddomicilio")+"&idbloco="+localStorage.getItem("moradorIdbloco")+"&action=listall",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var dataveiculo = "";
                    var qtd = data.veiculo.length;
                    var tipo ="";
                    var delveiculo ="";
                    for (var i = 0; i < qtd; i++) {

                        if (data.veiculo[i].tipo=="1") {
                            tipo = "Carro";
                        } else {
                            tipo = "Moto";
                        }

                        delveiculo = "onclick = delveiculo('"+data.veiculo[i].guid+"',"+i+");"
                        dataveiculo += '<li class="swipeout swipeout-veiculo" data-index="'+i+'">'+
                                                  '<a href="#veiculocont" onclick="veiculocont('+data.veiculo[i].idveiculo+')" class="swipeout-content item-link item-content">'+
                                                    '<div class="item-media" style="border:solid 4px '+data.veiculo[i].cor+'">'+
                                                      '<img src="'+data.veiculo[i].urlVeiculo+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row">'+
                                                        '<div class="item-title item-title-veiculo">'+data.veiculo[i].placa+'</div>'+
                                                      '</div>'+
                                                      '<div class="item-text">'+tipo+'</div>'+
                                                      '<div class="item-text">'+data.veiculo[i].marca+' - '+data.veiculo[i].modelo+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                  '<div class="swipeout-actions-right">'+
                                                    '<a href="#" '+delveiculo+' class="action1 bg-red">Delete</a>'+
                                                  '</div>'+
                                                '</li>';
                        $('#veiculo-cont').html(dataveiculo);
                    }
                }else{
                    myApp.hideIndicator();
                    $('#veiculo-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#veiculo-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

///////////////////////////////////// deletar veiculo ///////////////////////////
function delveiculo(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppVeiculo.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-veiculo').eq($("li.swipeout-veiculo[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-veiculo').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// veiculo conteudo ///////////////////////////
function veiculocont(id){

    myApp.showIndicator();

    $('#veiculocont-cont').html("");
    var iddomicilio = localStorage.getItem("moradorIddomicilio") ? localStorage.getItem("moradorIddomicilio") : "";
        $.ajax({
            url: $server+"functionAppVeiculo.php?idveiculo="+id+"&iddomicilio="+iddomicilio+"&action=listall",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var dataveiculo = "";
                var qtd = data.veiculo.length;
                var imgVeiculo = "";
                var tipo;
                var imgZoom;
                var num_bloco = "";
                var borda = "";
                var color = "";
                for (var i = 0; i < qtd; i++) {

                       myPhotoBrowserVeiculo = myApp.photoBrowser({
                            theme: 'dark',
                            ofText: 'de',
                            backLinkText: '',
                            spaceBetween: 0,
                            navbar: true,
                            toolbar: false,
                            photos : [data.veiculo[i].urlVeiculo],
                            type: 'popup'
                        });
                        imgZoom = "onclick=myPhotoBrowserVeiculo.open();";

                num_bloco = data.veiculo[i].num_bloco ? "/"+data.veiculo[i].num_bloco : "";

                if (data.veiculo[i].tipo=="1") {
                    tipo = "Carro";
                } else {
                    tipo = "Moto";
                }

                if (data.veiculo[i].cor=="rgb(255, 255, 255)" || data.veiculo[i].cor=="rgb(243, 243, 243)" || data.veiculo[i].cor=="rgb(238, 238, 238)"){
                    borda = "border: solid 1px gray;";
                    color = "color: black";
                }

                if (data.veiculo[i].urlVeiculo!="images/sem_foto_icone.jpg") {
                    imgVeiculo= '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-3x fa-search-plus"></i>'+
                                                '<img src="'+data.veiculo[i].urlVeiculo+'" '+imgZoom+' width="100%">'+
                                            '</div>';
                }

                dataveiculo += '<li>'+
                                        '<div class="card-cont ks-facebook-card">'+ imgVeiculo +
                                            '<div class="card-header">'+
                                                '<div class="ks-facebook-number" style="background:'+data.veiculo[i].cor+';'+borda+color+'">'+data.veiculo[i].num_domicilio+num_bloco+'</div>'+
                                                '<div class="ks-facebook-name item-title-veiculo">'+data.veiculo[i].placa+'</div>'+
                                                '<div class="ks-facebook-date">'+tipo+'</div>'+
                                            '</div>'+
                                            '<div class="card-content-inner">'+
                                                '<div class="facebook-title">'+data.veiculo[i].marca+'</div>'+
                                                '<div class="facebook-date">'+data.veiculo[i].modelo+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';

                    imgVeiculo = "";
                $('#veiculocont-cont').html(dataveiculo);

                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

///////////////////////////// camera Veiculo ///////////////////////////

function cameraVeiculo() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessVeiculo, onFailVeiculo, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    targetHeight: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileVeiculo(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessVeiculo, onFailVeiculo, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    targetHeight: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessVeiculo(imageData) {
    var image = document.getElementById('preview-veiculo');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailVeiculo(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera Veiculo options ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageReinit('inserirveiculo', function (page) {

    $('.modelolistli').removeClass("visivel");
    $('.marcalistli').removeClass("visivel");
    $('#txttipoveiculo option[value=""]').attr('selected','selected');
});

myApp.onPageInit('inserirveiculo', function (page) {

    $('.modelolistli').removeClass("visivel");
    $('.marcalistli').removeClass("visivel");
    $('#txttipoveiculo option[value=""]').attr('selected','selected');

    var actionOptionCameraVeiculo = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraVeiculo();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileVeiculo();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraVeiculo').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraVeiculo);
    });
    
});


///////////////////////////// listar marcas //////////////////////////////////
function listMarcas(){
    $('.modelolistli').removeClass("visivel");
    myApp.showIndicator();
    var tipo = "";

    if ($$("#txttipoveiculo").val()=="1") {
        tipo = "carros";
    }else if ($$("#txttipoveiculo").val()=="2"){
        tipo = "motos";
    }

    $.ajax({
        url: "http://fipeapi.appspot.com/api/1/"+tipo+"/marcas.json",
        dataType : "json",
        success: function(data) {
            console.log("entrei-success");
            $('#txtmarcaveiculo').html("");
            if (data!=null) {
                myApp.hideIndicator();
                var qtd = data.length;
                var marcaslist = "";

                marcaslist += '<option value="" data-marca-id="">Selecione uma marca</option>';
                for (var i = 0; i < qtd; i++) {
                    marcaslist += '<option value="'+data[i].fipe_name+'" data-marca-id="'+data[i].id+'">'+data[i].fipe_name+'</option>';
                }

            }
            $('.marcalistli').addClass("visivel");
            $('#txtmarcaveiculo').html(marcaslist);
            myApp.hideIndicator();
        },error: function(data) {
            myApp.hideIndicator();
            myApp.alert('Erro ao carregar dados, tente novamente!');
            $('#txtmarcaveiculo').html("");

        }
    });
}
////////////////////////////// listar modelos ///////////////////////////
function listModelos(){
    var tipo = "";

    if ($$("#txttipoveiculo").val()=="1") {
        tipo = "carros";
    }else if ($$("#txttipoveiculo").val()=="2"){
        tipo = "motos";
    }
    var idmarca = $('#txtmarcaveiculo option:selected').attr('data-marca-id');
    //console.log("idmarca = "+idmarca);
    if (idmarca!="") {
        myApp.showIndicator();
        $.ajax({
            url: "http://fipeapi.appspot.com/api/1/"+tipo+"/veiculos/"+idmarca+".json",
            dataType : "json",
            success: function(data) {
                console.log("entrei-success");
                $('#txtmodeloveiculo').html("");
                if (data!=null) {
                    myApp.hideIndicator();
                    var qtd = data.length;
                    var modeloslist = "";

                    for (var i = 0; i < qtd; i++) {
                        modeloslist += '<option value="'+data[i].fipe_name+'">'+data[i].fipe_name+'</option>';
                    }

                }
                $('.modelolistli').addClass("visivel");
                $('#txtmodeloveiculo').html(modeloslist);
                myApp.hideIndicator();
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!');
                $('#txtmodeloveiculo').html("");

            }
        });
    }else{
        modeloslist = '<option value="">Selecione uma marca</option>';
        $('.modelolistli').addClass("visivel");
        $('#txtmodeloveiculo').html(modeloslist);        
    }
}

///////////////////////////// acao inserir Veiculo ///////////////////////////
$('#butinserirveiculo').on('click', function(){
    //alert("enviar");

    if (($$('#txttipoveiculo').val()!="") && ($$('#txtmarcaveiculo').val()!="") && ($$('#txtmodeloveiculo').val()!="") && ($$('#txtcorveiculo').val()!="") && ($$('#txtplacaveiculo').val()!="")) {

            enviarveiculo();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

///////////////////////////// inserir veiculo ///////////////////////////
function enviarveiculo()
{
 
 //alert("entrei");
        imagem = $('#preview-veiculo').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$iddomicilio = localStorage.getItem("moradorIddomicilio");
        $$txtTipoVeiculo = $$('#txttipoveiculo').val();
        $$txtMarcaVeiculo = $$('#txtmarcaveiculo').val();
        $$txtModeloVeiculo = $$('#txtmodeloveiculo').val();
        $$txtCorVeiculo = $$('#txtcorveiculo').val();
        $$txtPlacaVeiculo = $$('#txtplacaveiculo').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();

        $('#forminserirveiculo').each (function(){
          this.reset();
        });
        $("#preview-veiculo").attr('src',"");

        myApp.showIndicator();
        // Salvando imagem no servidor
        $.ajax($server+'functionAppVeiculo.php?', {
            type: "post",
            data: "imagem="+imagem+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&txtTipoVeiculo="+$$txtTipoVeiculo+"&txtMarcaVeiculo="+$$txtMarcaVeiculo+"&txtModeloVeiculo="+$$txtModeloVeiculo+"&txtCorVeiculo="+$$txtCorVeiculo+"&txtPlacaVeiculo="+$$txtPlacaVeiculo+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Veículo inserido com sucesso!', function () { mainView.router.load({pageName: 'veiculo'}); veiculo();});
            }
          });
}



///////////////////////////// acao inserir comunicado condominio ///////////////////////////
$('#inserircomuncondominio').on('click', function(){
    //alert("enviar");
    listBloco("condominio");
});

////////////////// listar blocos form comunicados /////////////////
    function listBloco(alvo){
        $('.domiciliolistcomunicadoli').removeClass("visivel");
        $('.moradorlistcomunicadoli').removeClass("visivel");

        myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppMorador.php?idcondominio="+localStorage.getItem("condominioId")+"&action=listBlocos",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var semBloco = "";
                    var idBloco ="";
                    var qtd = data.blocos.length;
                    var blocolistcomunicado = "";
                    var selected = "";
                    var adminSind = "";

                    if (localStorage.getItem("administradoraEmail") || localStorage.getItem("sindicoEmail") || (localStorage.getItem("portariaIdportaria"))) {
                        if (alvo=="visitantes") {
                            adminSind = '<option value="" selected="selected">Selecione um Bloco</option>';
                        }else{
                            adminSind = '<option value="" selected="selected">Todos</option>';
                        }
                    } else if ((localStorage.getItem("sindicoIdsindico")) && (localStorage.getItem("moradorIdmorador")) && (alvo=="condominio")) {
                        adminSind = '<option value="" selected="selected">Todos</option>';
                    } else{
                        adminSind = '';
                    }

                        blocolistcomunicado += adminSind;
                        
                    for (var i = 0; i < qtd; i++) {

                        semBloco = data.blocos[i].numBloco;
                        idBloco = data.blocos[i].idBloco;

                        if ((!localStorage.getItem("administradoraEmail")) && (!localStorage.getItem("sindicoEmail"))) {
                            if (idBloco==localStorage.getItem("moradorIdbloco")){
                                var selected = 'selected="selected"';
                                listDomicilio(localStorage.getItem("moradorIdbloco"),alvo);
                                console.log(idBloco);
                                console.log(localStorage.getItem("moradorIdbloco"));
                            }
                        }

                        //se sindico for morador do condominio selecionado
                        if (localStorage.getItem("sindicoIdsindico")) {
                            if (localStorage.getItem("moradorIdCondominio")==localStorage.getItem("condominioId")) {
                                if (idBloco==localStorage.getItem("moradorIdbloco")){
                                    var selected = 'selected="selected"';
                                    listDomicilio(localStorage.getItem("moradorIdbloco"),alvo);
                                    console.log(idBloco);
                                    console.log(localStorage.getItem("moradorIdbloco"));
                                }
                            }
                        }

                        blocolistcomunicado += '<option '+selected+' value="'+data.blocos[i].idBloco+'">'+data.blocos[i].numBloco+'</option>';
                        selected = "";
                    }

                    if (semBloco=="Sem Bloco") {
                        blocolistcomunicado = "";
                        listDomicilio(idBloco,alvo);
                        $('.blocolistcomunicadoli').addClass("invisivel");
                        $('.blocolistcomunicadoli').removeClass("visivel");
                    }
                }
                if (blocolistcomunicado!="") {
                    $('.blocolistcomunicadoli').addClass("visivel");
                }
                $('.blocolistcomunicado').html(blocolistcomunicado);
                myApp.hideIndicator(); 
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!', function () { mainView.router.load({pageName: 'comuncondominio'}); comuncondominio();});
            }
        });
    }

////////////////// listar domicílios form comunicados /////////////////
    function listDomicilio(idBloco,alvo){
        var visitanteCondominio="";

        console.log("listDomicilio");
        $('.moradorlistcomunicadoli').removeClass("visivel");
        if (idBloco==null || idBloco==0) {
            console.log("idBloco==null");
            // se idBloco==0 visitante é do condomínio
            if (idBloco==0) {
                $$('.blocolistcomunicadoli').removeClass("visivel");
                $$('.domiciliolistcomunicadoli').removeClass("visivel");
                $('#txtvisitantecondominio').attr("checked","checked");
                visitanteCondominio = 1;
            }
            if (localStorage.getItem("administradoraIdadministradora") || (localStorage.getItem("sindicoIdsindico") && !localStorage.getItem("moradorIdmorador"))) {
                console.log("admin ou só sindi");
                idBloco=$$("#blocolist").val();
            } else if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador") && alvo=="condominio") {
                console.log("sindi e morador alvo = condominio");
                idBloco=$$("#blocolist").val();
            } else if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador") && alvo=="morador") {
                console.log("sindi e morador alvo = morador");
                idBloco=$$("#blocolistmorador").val();
            } else if (localStorage.getItem("portariaIdportaria") && alvo=="visitantes") {
                console.log("porteiro alvo = visitantes");
                idBloco=$$("#blocolistportariavisitantes").val();
                console.log("idBloco = "+idBloco);
            } else if (localStorage.getItem("portariaIdportaria")) {
                console.log("porteiro");
                idBloco=$$("#blocolistportaria").val();
                console.log("idBloco = "+idBloco);
            } else if (localStorage.getItem("moradorIdmorador")) {
                console.log("morador");
                idBloco=$$("#blocolistmorador").val();
            }
        }
        myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppMorador.php?idbloco="+idBloco+"&idcondominio="+localStorage.getItem("condominioId")+"&action=listDomicilios",
            dataType : "json",
            success: function(data) {
                console.log("entrei-success");
                $('.domiciliolistcomunicado').html("");
                if (data!=null) {
                    myApp.hideIndicator();
                    var qtd = data.domicilios.length;
                    var domiciliolistcomunicado = "";
                    var adminSind = "";
                    var idDomicilio = "";

                    if ((localStorage.getItem("administradoraEmail")) || (localStorage.getItem("sindicoEmail") || (localStorage.getItem("portariaIdportaria") && alvo!="visitantes"))) {
                        adminSind = '<option value="">Todos</option>';
                        console.log(adminSind);
                    } else{
                        adminSind = '<option value="">Selecione um Apto</option>';
                    }

                    //se sindico for morador do condominio selecionado
                    if (localStorage.getItem("sindicoIdsindico")) {
                        if (localStorage.getItem("moradorIdCondominio")==localStorage.getItem("condominioId")) {
                            adminSind = '<option value="">Selecione um Apto</option>';
                        }
                    }

                    var selected = "";
                    domiciliolistcomunicado += adminSind;

                    for (var i = 0; i < qtd; i++) {

                        idDomicilio = data.domicilios[i].idDomicilio

                        /*if ((!localStorage.getItem("administradoraEmail")) && (!localStorage.getItem("sindicoEmail"))) {
                            if (idDomicilio==localStorage.getItem("moradorIddomicilio")){
                                selected = 'selected="selected"';
                                listMoradores(idDomicilio,alvo);
                            }
                        }*/

                        domiciliolistcomunicado += '<option '+selected+' value="'+data.domicilios[i].idDomicilio+'">'+data.domicilios[i].numDomicilio+'</option>';
                    }
                //listMoradores(null,alvo);

                }
                $('.domiciliolistcomunicadoli').addClass("visivel");
                $('.domiciliolistcomunicado').html(domiciliolistcomunicado);
                
                // se visitanteCondominio=1 visitante é do condomínio. Esconde Select Apto
                if (visitanteCondominio==1) {
                    $$('.domiciliolistcomunicadoli').removeClass("visivel");
                }
                myApp.hideIndicator();
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!');
                $('.domiciliolistcomunicado').html("");

            }
        });
        idBloco = null;
    }                          


////////////////// listar moradores form comunicados /////////////////
    function listMoradores(idDomicilio,alvo){
        if (idDomicilio==null) {
            if ((localStorage.getItem("administradoraIdadministradora")) || (localStorage.getItem("sindicoIdsindico") && !localStorage.getItem("moradorIdmorador"))) {
                idDomicilio=$$("#domiciliolist").val();
            } else if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador") && alvo=="condominio") {
                idDomicilio=$$("#domiciliolist").val();
                console.log("idDomicilio = "+$$("#domiciliolist").val());

            } else if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador") && alvo=="morador") {
                idDomicilio=$$("#domiciliolistmorador").val();
                console.log("idDomicilio = "+$$("#domiciliolistmorador").val());

            } else if (localStorage.getItem("portariaIdportaria")) {
                idDomicilio=$$("#domiciliolistportaria").val();
            } else if (localStorage.getItem("moradorIdmorador")) {
                if ($$("#domiciliolistmorador").val()!="") {
                    idDomicilio=$$("#domiciliolistmorador").val();
                    console.log(idDomicilio);
                }else{
                    return false;
                }
            }

            //se sindico for morador do condominio selecionado
            if (localStorage.getItem("sindicoIdsindico")) {
                if (localStorage.getItem("moradorIdCondominio")==localStorage.getItem("condominioId")) {
                    if ($$("#domiciliolistmorador").val()!="") {
                        idDomicilio=$$("#domiciliolistmorador").val();
                        console.log(idDomicilio);
                    }else{
                        //return false;
                    }
                }
            }

        }

        myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppMorador.php?iddomicilio="+idDomicilio+"&idcondominio="+localStorage.getItem("condominioId")+"&action=listMoradores",
            dataType : "json",
            success: function(data) {
                console.log("entrei-success");
                $('.moradorlistcomunicado').html("");
                if (data!=null) {
                    myApp.hideIndicator();
                    var qtd = data.moradores.length;
                    var moradorlistcomunicado = "";
                    var adminSind = "";

                    if ((localStorage.getItem("administradoraEmail")) || (localStorage.getItem("sindicoEmail") || (localStorage.getItem("portariaIdportaria")))) {
                        adminSind = '<option value="">Todos</option>';
                        console.log(adminSind);
                    }

                    moradorlistcomunicado += adminSind;

                    for (var i = 0; i < qtd; i++) {

                                    moradorlistcomunicado += '<option value="'+data.moradores[i].idMorador+'">'+data.moradores[i].name+'</option>';
                    
                    }
                                moradorlistcomunicado += '</select>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>';
                }
                $('.moradorlistcomunicadoli').addClass("visivel");
                $('.moradorlistcomunicado').html(moradorlistcomunicado);
                myApp.hideIndicator();
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!');
                $('.domiciliolistcomunicado').html("");
                $('.moradorlistcomunicado').html("");

            }
        });
        idDomicilio = null;
    }  



// Pull to refresh content
var ptrContent = $$('.vendas');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        vendas();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// vendas ///////////////////////////

function vendas(alvo){
    //console.log("alvo = "+alvo);
    myApp.showIndicator();

    // carrega vendas
    $.ajax({
        url: $server+"Gerar_json.php?idvendedor="+localStorage.getItem("idvendedor")+"&op=venda&action=listImei",
        dataType: "json",
        success: function(data){
            myApp.hideIndicator();
            if (data) {
                var aux ="";
                for (var i = 0; i < data.list.length; i++) {

                        aux+='<div class="card margin-card">'+
                                  '<div class="card-content">'+
                                    '<div class="card-content-inner">'+
                                      '<div class="row padding-card-row">'+
                                        '<div class="col-100">'+
                                          '<h4 class="no-margin titsolicitacoes">IMEI: '+data.list[i].imei+'</h4>'+
                                          '<h6 class="no-margin font-lighter nomesolicitacoes">'+convertDateTimeBrasil(data.list[i].registration_date)+'</h6>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>';
                }

                $("#vendas-cont").html(aux);
                myApp.hideIndicator();
            }
        }
        ,error:function(data){
            console.log(data);
            myApp.hideIndicator();
        }
    });
}


// Pull to refresh content
var ptrContent = $$('.comuncondominio');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        comuncondominio();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// Comunicado mensagem ///////////////////////////

function comuncondominio(alvo){
    //console.log("alvo = "+alvo);
    myApp.showIndicator();

                    // carrega ultimos comunicados
                    $.ajax({
                        url: $server+"Gerar_json.php?idvendedor="+localStorage.getItem("idvendedor")+"&op=comunicado&action=listComunicado",
                        dataType: "json",
                        success: function(data){
                            myApp.hideIndicator();
                            if (data) {
                                var datacomunicado="";
                                var urlimg="";
                                //console.log(data);
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].url!="") {
                                        urlimg = data[i].url.replace("http://","https://");
                                    }else{
                                        urlimg = "images/sem_foto_icone.jpg";
                                    }
                                        datacomunicado += '<li date-date="'+data[i].registration_date+'">'+
                                                                  '<a href="#comunicadocont" onclick="comuncomunicadocont('+data[i].idcomunicado+')" class="item-link item-content">'+
                                                                    '<div class="item-media">'+
                                                                      '<img src="'+urlimg+'" >'+
                                                                    '</div>'+
                                                                    '<div class="item-inner">'+
                                                                      '<div class="item-title-row">'+
                                                                        '<div class="item-title">'+data[i].titulo+'</div>'+
                                                                        '<div class="item-after"><i class="fa fa-lg"></i></div>'+
                                                                      '</div>'+
                                                                      '<div class="item-subtitle">'+convertDateTimeBrasil(data[i].registration_date)+'</div>'+
                                                                      '<div class="item-text">'+data[i].descricao+'</div>'+
                                                                    '</div>'+
                                                                  '</a>'+
                                                                '</li>';
                                }

                                $("#comuncondominio-cont").html(datacomunicado);
                                myApp.hideIndicator();
                            }
                        }
                        ,error:function(data){
                            console.log(data);
                            myApp.hideIndicator();
                        }
                    });
    //alert("Entrei");
}

///////////////////////////////////// comuncomunicado conteudo ///////////////////////////
function comuncomunicadocont(id){

    myApp.showIndicator();
    $('#comunicadocont-cont').html("");
    $('#comunicadorespcont-cont').html("");

        $.ajax({
            url: $server+"Gerar_json.php?idcomunicado="+id+"&op=comunicado&action=listComunicadoCont",
            dataType : "json",
            success: function(data) {
            console.log(data);
            myApp.hideIndicator();
                var datacomunicado = "";
                var qtd = data.length;
                var imgComunicado = "";
                var imgZoom;
                var pdfView;
                for (var i = 0; i < qtd; i++) {

                    if (data[i].url!="") {
                        urlimg = data[i].url.replace("http://","https://");
                        myPhotoBrowserComunicadocont = myApp.photoBrowser({
                            theme: 'dark',
                            ofText: 'de',
                            backLinkText: '',
                            spaceBetween: 0,
                            navbar: true,
                            toolbar: false,
                            photos : [urlimg],
                            type: 'popup'
                        });
                        imgZoom = "onclick=myPhotoBrowserComunicadocont.open();";
                        imgComunicado = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                        '<img src="'+urlimg+'" '+imgZoom+' width="100%">'+
                                                    '</div>';
                    }

                    datacomunicado += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+ imgComunicado +
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-name">'+data[i].nome+'</div>'+
                                                    '<div class="ks-facebook-date">'+convertDateTimeBrasil(data[i].registration_date)+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-title">'+data[i].titulo+'</p>'+
                                                    '<p class="facebook-date">'+data[i].descricao+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                        imgComunicado = "";
                    $('#comunicadocont-cont').html(datacomunicado);
 
                }

            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });

}

///////////////////////////// camera comunicado condominio ///////////////////////////

function cameraComuncondominio() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessComuncondominio, onFailComuncondominio, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileComuncondominio(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessComuncondominio, onFailComuncondominio, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessComuncondominio(imageData) {
    var image = document.getElementById('preview-comuncondominio');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailComuncondominio(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera comunicado condominio ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserircomuncondominio', function (page) {
    var actionOptionCameraComuncondominio = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraComuncondominio();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileComuncondominio();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraComuncondominio').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraComuncondominio);
    });
    
});

///////////////////////////// acao inserir comunicado condominio ///////////////////////////
$('#butinserircomuncondominio').on('click', function(){
    //alert("enviar");

    if (($$('#txttitcomuncondominio').val()!="") &&  ($$('#txtdescricaocomuncondominio').val()!="")) {

            enviarcomuncondominio();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

$$('#pdfFileComuncondominio').on('change', function (e) {
    myApp.showIndicator();
    var files = e.target.files; // FileList object
    console.log("nome = "+files[0].name);
    if (files[0].name.indexOf(".pdf")!=-1 || files[0].name.indexOf(".PDF")!=-1) {
        var image = document.getElementById('preview-pdf-comuncondominio');
        image.src = "images/icon_pdf.png";

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              console.log(e);
              var pdf = document.getElementById('pdfFileComuncondominioHidden');
              $("#pdfFileComuncondominioHidden").val(e.target.result);
              myApp.hideIndicator();
              //console.log("eu");
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
          
        }
    }else{
        myApp.alert('Formato inválido! Escolha um arquivo no formato PDF.');
    }

});

///////////////////////////// inserir comunicado condominio ///////////////////////////
function enviarcomuncondominio()
{
 
        $$pdfFileComuncondominio = $$('#pdfFileComuncondominioHidden').val();

        imagem = $('#preview-comuncondominio').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idbloco = $$('#blocolist').val();
        $$iddomicilio = $$('#domiciliolist').val();
        $$iddestino = $$('#moradorlist').val();
        
        $$txtTitulo = $$('#txttitcomuncondominio').val();
        $$txtDescricao = $$('#txtdescricaocomuncondominio').val();


        if (localStorage.getItem("sindicoIdsindico")) {
            $$idsindico = localStorage.getItem("sindicoIdsindico");
        } else{
            $$idsindico = "";
        }
        /*}else{
            $$idsindico = localStorage.getItem("moradorIdsindico");
        }*/
        if (localStorage.getItem("administradoraIdadministradora")) {
            $$idadministradora = localStorage.getItem("administradoraIdadministradora");
        } else {
            $$idadministradora = "";
        } 


        /*else{
            if ($$iddestino!="") {
                $$idadministradora = "";
            }else{
                $$idadministradora = localStorage.getItem("moradorIdadministradora");
            }
        }*/


        $("#preview-comuncondominio").attr('src',"");
        $("#preview-pdf-comuncondominio").attr('src',"");
        myApp.showIndicator();

        if (!$$pdfFileComuncondominio) {
            // Salvando imagem no servidor
            $.ajax($server+'functionAppComunCondominio.php?', {
                type: "post",
                data: "imagem="+imagem+"&idsindico="+$$idsindico+"&idadministradora="+$$idadministradora+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&iddestino="+$$iddestino+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserircomuncondominio').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    myApp.alert('Comunicado inserido com sucesso!', function () { mainView.router.load({pageName: 'comuncondominio'}); comuncondominio();});
                }
              });
        }else{
            // Salvando pdf no servidor
            $.ajax($server+'functionAppComunCondominio.php?', {
                type: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: "pdf="+$$pdfFileComuncondominio+"&idsindico="+$$idsindico+"&idadministradora="+$$idadministradora+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&iddestino="+$$iddestino+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserircomuncondominio').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    myApp.alert('Comunicado inserido com sucesso!', function () { mainView.router.load({pageName: 'comuncondominio'}); comuncondominio();});
                }
              });
        }

}


// Pull to refresh content
var ptrContent = $$('.comunportaria');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        comunportaria();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});


////////////////// listar porteiros/////////////////
    function listPortaria(){

        myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppComunPortaria.php?idcondominio="+localStorage.getItem("condominioId")+"&action=listPortaria",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var idPortaria ="";
                    var qtd = data.portaria.length;
                    var listportaria = "";
                    var selected = "";
                    var adminSind = "";

                        adminSind = '<option value="" selected="selected">Todos</option>';

                        listportaria += adminSind;
                        
                    for (var i = 0; i < qtd; i++) {

                        semBloco = data.portaria[i].numBloco;
                        idBloco = data.portaria[i].idPortaria;

                        listportaria += '<option value="'+data.portaria[i].idPortaria+'">'+data.portaria[i].name+'</option>';
                        selected = "";
                    }
                }

                $('.portarialistportaria').html(listportaria);
                myApp.hideIndicator(); 
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!', function () { mainView.router.load({pageName: 'comunportaria'}); comunportaria();});
            }
        });
    }

// Pull to refresh content
var ptrContent = $$('.comunportariahome');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        comunportariahome();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

function teste (){
    alert("setInterval 10 seg");
}

///////////////////////////////////// Comunicado comunportaria home ///////////////////////////

function comunportariahome(alvo){

//alertadechegadahome();

    //var datatransparencia;
    $('.badgecomunicado').html();
    badgecomunicado=0;

    $('.tab-link').removeClass('active');
    $('.tab-2').addClass('active');

    if (localStorage.getItem("portariaIdportaria")) {
        var idportaria = localStorage.getItem("portariaIdportaria");
    } else{
        var idportaria = "";
    }
    if (localStorage.getItem("moradorIdmorador")) {
        var idmorador = localStorage.getItem("moradorIdmorador");
    } else{
        var idmorador = "";
    }
    if (localStorage.getItem("sindicoIdsindico")) {
        var idsindico = localStorage.getItem("sindicoIdsindico");
    } else{
        var idsindico = "";
    }
    if (localStorage.getItem("administradoraIdadministradora")) {
        var idadministradora = localStorage.getItem("administradoraIdadministradora");
    } else{
        var idadministradora = "";
    }
    if (localStorage.getItem("moradorIddomicilio")) {
        var iddomicilio = localStorage.getItem("moradorIddomicilio");
    } else{
        var iddomicilio = "";
    }
    if (localStorage.getItem("moradorIdbloco")) {
        var idbloco = localStorage.getItem("moradorIdbloco");
    } else{
        var idbloco = "";
    }
    if (localStorage.getItem("moradorIdmorador")) {
        var iddestino = localStorage.getItem("moradorIdmorador");
    } else{
        var iddestino = "";
    }

        $.ajax({
            url: $server+"functionAppComunPortaria.php?idcondominio="+localStorage.getItem("condominioId")+"&idadministradora="+idadministradora+"&iddestino="+iddestino+"&idmorador="+idmorador+"&idbloco="+idbloco+"&iddomicilio="+iddomicilio+"&idsindico="+idsindico+"&idportaria="+idportaria+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {

                    var datacomunicado = "";
                    var qtd = data.comunicado.length;
                    var urlComunPortaria = "";

                    for (var i = 0; i < qtd; i++) {

                        if ((data.comunicado[i].name==localStorage.getItem("portariaNome")) || (data.comunicado[i].name==localStorage.getItem("moradorNome"))) {
                            send = 'right';
                            colorsend = ' color-green';
                        } else {
                            send = 'left';
                            colorsend = ' color-red';
                        }
                        urlComunPortaria = data.comunicado[i].urlProfile.replace("http://","https://");
                        datacomunicado += '<li date-date="'+data.comunicado[i].dataComunicado+'">'+
                                                  '<a href="#comunicadocont" onclick="comunportariacont('+data.comunicado[i].idComunicado+')" class="item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="'+urlComunPortaria+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row no-arrow">'+
                                                        '<div class="item-title">'+data.comunicado[i].name+'</div>'+
                                                        '<div class="item-after"><i class="fa fa-lg fa-arrow-circle-'+send+colorsend+'"></i></div>'+
                                                      '</div>'+
                                                      '<div class="item-subtitle">'+data.comunicado[i].dataComunicado+'</div>'+
                                                      '<div class="item-text">'+data.comunicado[i].tituloComunicado+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                '</li>';
                    }
                    //atualizar listagem só quando houver diferença
                    var qtddatacomunicado = $('#comunportariahome-cont li').length;
                    if (qtd!=qtddatacomunicado) {
                        //console.log("qtddatacomunicado = "+qtddatacomunicado);
                        //console.log("qtd = "+ qtd);
                        $('#comunportariahome-cont').html(datacomunicado);
                        
                        ////// reordenar lista por data decrescente ///////
                        var mylist = $('#comunportariahome-cont');
                        var listitems = mylist.children('li').get();
                        listitems.sort(function(a, b) {
                            var date1 = new Date(convertToDateCount($(a).attr('date-date')));
                            var dateMsec1 = date1.getTime();

                            var date2 = new Date(convertToDateCount($(b).attr('date-date')));
                            var dateMsec2 = date2.getTime();

                            var compA = dateMsec1;
                            var compB = dateMsec2;

                            return (compB < compA) ? -1 : (compB > compA) ? 1 : 0;
                        })
                        $.each(listitems, function(idx, itm) { mylist.append(itm); });  
                    }

                    //setTimeout(comunportariahome, 5000);
                }else{

                    $('#comunportariahome-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                    //setTimeout(comunportariahome, 5000);
                }            
            },error: function(data) {

                $('#comunportariahome-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                    //setTimeout(comunportariahome, 5000);
            }
        });
    //alert("Entrei");
    return false;
}

///////////////////////////////////// Comunicado comunportaria ///////////////////////////

function comunportaria(alvo){

    myApp.showIndicator();
    //var datatransparencia;
    $('.badgecomunicado').html();
    badgecomunicado=0;

    $('.tab-1').removeClass('active');
    $('.tab-2').addClass('active');
    $('.tab-3').removeClass('active');

    $('.comunportaria').removeClass('invisivel');
    $('.comunmorador').addClass('invisivel');
    $('.comuncondominio').addClass('invisivel');
    $('.inserircomunportaria').removeClass('invisivel');
    $('.inserircomuncondominio').addClass('invisivel');
    $('.inserircomunmorador').addClass('invisivel');

    if (localStorage.getItem("portariaIdportaria")) {
        var idportaria = localStorage.getItem("portariaIdportaria");
    } else{
        var idportaria = "";
    }
    if (localStorage.getItem("moradorIdmorador")) {
        var idmorador = localStorage.getItem("moradorIdmorador");
    } else{
        var idmorador = "";
    }
    if (localStorage.getItem("sindicoIdsindico")) {
        var idsindico = localStorage.getItem("sindicoIdsindico");
    } else{
        var idsindico = "";
    }
    if (localStorage.getItem("administradoraIdadministradora")) {
        var idadministradora = localStorage.getItem("administradoraIdadministradora");
    } else{
        var idadministradora = "";
    }
    if (localStorage.getItem("moradorIddomicilio")) {
        var iddomicilio = localStorage.getItem("moradorIddomicilio");
    } else{
        var iddomicilio = "";
    }
    if (localStorage.getItem("moradorIdbloco")) {
        var idbloco = localStorage.getItem("moradorIdbloco");
    } else{
        var idbloco = "";
    }
    if (localStorage.getItem("moradorIdmorador")) {
        var iddestino = localStorage.getItem("moradorIdmorador");
    } else{
        var iddestino = "";
    }

        $.ajax({
            url: $server+"functionAppComunPortaria.php?idcondominio="+localStorage.getItem("condominioId")+"&idadministradora="+idadministradora+"&iddestino="+iddestino+"&idmorador="+idmorador+"&idbloco="+idbloco+"&iddomicilio="+iddomicilio+"&idsindico="+idsindico+"&idportaria="+idportaria+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datacomunicado = "";
                    var qtd = data.comunicado.length;
                    for (var i = 0; i < qtd; i++) {

                        if ((data.comunicado[i].name==localStorage.getItem("portariaNome")) || (data.comunicado[i].name==localStorage.getItem("moradorNome"))) {
                            send = 'right';
                            colorsend = ' color-green';
                        } else {
                            send = 'left';
                            colorsend = ' color-red';
                        }

                        datacomunicado += '<li date-date="'+data.comunicado[i].dataComunicado+'">'+
                                                  '<a href="#comunicadocont" onclick="comunportariacont('+data.comunicado[i].idComunicado+')" class="item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="'+data.comunicado[i].urlProfile+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title-row no-arrow">'+
                                                        '<div class="item-title">'+data.comunicado[i].name+'</div>'+
                                                        '<div class="item-after"><i class="fa fa-lg fa-arrow-circle-'+send+colorsend+'"></i></div>'+
                                                      '</div>'+
                                                      '<div class="item-subtitle">'+data.comunicado[i].dataComunicado+'</div>'+
                                                      '<div class="item-text">'+data.comunicado[i].tituloComunicado+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                '</li>';
                        $('#comunportaria-cont').html(datacomunicado);
                    }

                    ////// reordenar lista por data decrescente ///////
                    var mylist = $('#comunportaria-cont');
                    var listitems = mylist.children('li').get();
                    listitems.sort(function(a, b) {
                        var date1 = new Date(convertToDateCount($(a).attr('date-date')));
                        var dateMsec1 = date1.getTime();

                        var date2 = new Date(convertToDateCount($(b).attr('date-date')));
                        var dateMsec2 = date2.getTime();

                        var compA = dateMsec1;
                        var compB = dateMsec2;

                        return (compB < compA) ? -1 : (compB > compA) ? 1 : 0;
                    })
                    $.each(listitems, function(idx, itm) { mylist.append(itm); });  

                }else{
                    myApp.hideIndicator();
                    $('#comunportaria-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }            
            },error: function(data) {
                myApp.hideIndicator();
                $('#comunportaria-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

///////////////////////////////////// comunportariacont conteudo ///////////////////////////
function comunportariacont(id){
       
    myApp.showIndicator();
    //var datatransparencia;
    $('#comunicadocont-cont').html("");
    $('#comunicadorespcont-cont').html("");

        $.ajax({
            url: $server+"functionAppComunPortaria.php?idcomunportaria="+id+"&action=listcont",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var datacomunicado = "";
                var qtd = data.comunicado.length;
                var pdfView;
                var imgComunicado = "";
                var imgZoom;
                var imgTitle = "Aptohome";

                for (var i = 0; i < qtd; i++) {

                    idpostdestino = data.comunicado[i].idComunicado;

                    if (data.comunicado[i].urlComunicado!="images/sem_foto_icone.jpg") {

                    myPhotoBrowserComunicadocont = myApp.photoBrowser({
                        theme: 'dark',
                        ofText: 'de',
                        backLinkText: '',
                        spaceBetween: 0,
                        navbar: true,
                        toolbar: false,
                        photos : [data.comunicado[i].urlComunicado],
                        type: 'popup'
                    });

                        if (data.comunicado[i].urlComunicado.indexOf(".pdf")!=-1 || data.comunicado[i].urlComunicado.indexOf(".PDF")!=-1) {
                            pdfView = "onclick=openURLBrowser('"+data.comunicado[i].urlComunicado+"');";

                                imgComunicado = '<div class="card-content-cont bg-red" '+pdfView+'><i class="fa fa-file-pdf-o fa-3x"></i>'+
                                                            //'<img src="images/icon_pdf.png" '+pdfView+' width="100%">'+
                                                            '<div class="view-pdf">Clique para visualizar</div>'+
                                                        '</div>';
                        }else{

                            imgZoom = "onclick=myPhotoBrowserComunicadocont.open();";

                            if (data.comunicado[i].urlComunicado!="images/sem_foto_icone.jpg") {
                                imgComunicado = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                            '<img src="'+data.comunicado[i].urlComunicado+'" '+imgZoom+' width="100%">'+
                                                        '</div>';
                            }
                        }
                    }

                    datacomunicado += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+ imgComunicado +
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="'+data.comunicado[i].urlProfile+'" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.comunicado[i].name+'</div>'+
                                                    '<div class="ks-facebook-date">'+data.comunicado[i].dataComunicado+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-title">'+data.comunicado[i].tituloComunicado+'</p>'+
                                                    '<p class="facebook-date">'+data.comunicado[i].descricaoComunicado+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                        imgComunicado = "";
                    $('#comunicadocont-cont').html(datacomunicado);
                }

            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });

        /////////// lista as respostas //////////
        $.ajax({
            url: $server+"functionAppResposta.php?iddestino=13&idpostdestino="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            
                var dataresposta = '<li class="item-divider border-top-tit">Respostas</li>';
                var qtd = data.resposta.length;
                var imgResposta = "";
                var imgZoom;
                var imgTitle = "Aptohome";
                var dataresp;

                for (var i = 0; i < qtd; i++) {

                    if (data.resposta[i].urlResposta!="images/sem_foto_icone.jpg") {

                    myPhotoBrowserRespostacont = myApp.photoBrowser({
                        theme: 'dark',
                        ofText: 'de',
                        backLinkText: '',
                        spaceBetween: 0,
                        navbar: true,
                        toolbar: false,
                        photos : [data.resposta[i].urlResposta],
                        type: 'popup'
                    });

                        imgZoom = "onclick=myPhotoBrowserRespostacont.open();";
                        imgResposta = '<div class="card-content-cont">'+
                                                    '<i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                    '<img src="'+data.resposta[i].urlResposta+'" '+imgZoom+' width="100%">'+
                                                '</div>';
                    }

                    dataresposta += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+ imgResposta +
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="'+data.resposta[i].urlProfile+'" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.resposta[i].name+'</div>'+
                                                    '<div class="ks-facebook-date">'+data.resposta[i].dataResposta+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-date">'+data.resposta[i].descricaoResposta+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                    imgResposta = "";
                }
                
                $('#comunicadorespcont-cont').append(dataresposta);

            },error: function(data) {
                /*myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');*/
            }
        });


        dataresp = '<div class="list-block">'+
                      '<ul>'+
                        '<li class="item-divider border-top-tit">Envie sua resposta</li>'+
                        '<li class="align-top">'+
                          '<div class="item-content">'+
                            '<div class="item-inner">'+
                              '<div class="item-title label">Descrição</div>'+
                                '<div class="item-input">'+
                                  '<input type="hidden" id="iddestinoresp" value="13">'+
                                  '<input type="hidden" id="idpostdestinoresp" value="'+id+'">'+
                                    '<textarea id="txtdescricaoresp" class="resizable" style="height:76px" placeholder="Informe uma descrição"></textarea>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                        '</li>'+
                        '<li>'+
                          '<div class="item-content">'+
                            '<div class="item-inner">'+
                              '<div class="item-title label">Imagem</div>'+
                              '<div class="item-input">'+
                                '<div id="imagem-resp" class="optionCameraResp custom-file-input" onClick="optionCameraResp()"></div>'+
                                  '<div class="img-preview">'+
                                    '<img src="" id="preview-resp"  width="100" height="80">'+
                                  '</div>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</li>'+
                      '</ul>'+
                    '</div>'+
                    '<div class="content-block"><a href="#" id="butinserirresp" onclick="butinserirresp()" class="button button-big button-fill button-raised color-indigo button-full">ENVIAR</a></div>';
            
            $('.resp-cont').html(dataresp);

}



///////////////////////////// camera resp ///////////////////////////

function cameraResp() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessResp, onFailResp, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileResp(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessResp, onFailResp, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessResp(imageData) {
    var image = document.getElementById('preview-resp');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailResp(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera resp ///////////////////////////

    var actionOptionCameraResp = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraResp();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileResp();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    function optionCameraResp(e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraResp);
    }


///////////////////////////// acao inserir resposta ///////////////////////////
function butinserirresp(){
    //alert("enviar");

    if ($$('#txtdescricaoresp').val()!="") {

            enviarresp();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

}

///////////////////////////// inserir resp ///////////////////////////
function enviarresp()
{
 
        imagem = $('#preview-resp').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");

        if (localStorage.getItem("moradorIdmorador")) {
            $$idmorador = localStorage.getItem("moradorIdmorador");
        } else{
            $$idmorador = "";
        }

        if (localStorage.getItem("portariaIdportaria")) {
            $$idportaria = localStorage.getItem("portariaIdportaria");
        } else{
            $$idportaria = $$('#portarialistportaria').val();
        }

        if (localStorage.getItem("sindicoIdsindico")) {
            $$idsindico = localStorage.getItem("sindicoIdsindico");
        } else{
            $$idsindico = "";
        }

        if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
            $$idsindico = "";
        }
        // síndico morador e resposta comunicado condominio
        if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador") && ($$('#iddestinoresp').val()=="12")) {
            $$idsindico = localStorage.getItem("sindicoIdsindico");
            $$idmorador = "";
        }
        // síndico morador e resposta ocorrencia
        if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador") && ($$('#iddestinoresp').val()=="2")) {
            $$idsindico = localStorage.getItem("sindicoIdsindico");
            $$idmorador = "";
        }

        if (localStorage.getItem("administradoraIdadministradora")) {
            $$idadministradora = localStorage.getItem("administradoraIdadministradora");
        } else{
            $$idadministradora = "";
        }
        
        $$iddestinoresp = $$('#iddestinoresp').val();
        $$idpostdestinoresp = $$('#idpostdestinoresp').val();
        
        $$txtTitulo = $$('#txttitresp').val();
        $$txtDescricao = $$('#txtdescricaoresp').val();

        $("#preview-resp").attr('src',"");

        myApp.showIndicator();

        $.ajax($server+'functionAppResposta.php?', {
            type: "post",
            data: "imagem="+imagem+"&idmorador="+$$idmorador+"&idsindico="+$$idsindico+"&idportaria="+$$idportaria+"&idadministradora="+$$idadministradora+"&idcondominio="+$$idcondominio+"&idpostdestino="+$$idpostdestinoresp+"&iddestino="+$$iddestinoresp+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if ((data!="ok") && (data!=" ok")) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Resposta inserida com sucesso!', function () { mainView.router.back();});
            }
          });
}




///////////////////////////// camera comunicado portaria ///////////////////////////

function cameraComunportaria() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessComunportaria, onFailComunportaria, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileComunportaria(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessComunportaria, onFailComunportaria, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessComunportaria(imageData) {
    var image = document.getElementById('preview-comunportaria');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailComunportaria(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera comunicado portaria ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserircomunportaria', function (page) {
    var actionOptionCameraComunportaria = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraComunportaria();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileComunportaria();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraComunportaria').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraComunportaria);
    });
    
});

///////////////////////////// acao inserir comunicado portaria ///////////////////////////
$('.inserircomunportaria').on('click', function(){
    console.log("inserircomunportaria");
    
    if (localStorage.getItem("portariaIdportaria")) {
        console.log("porteiro");
        $('.blocolistcomunicadoli').addClass('visivel');
        $('.domiciliolistcomunicadoli').addClass('visivel');
        $('.moradorlistcomunicadoli').addClass('visivel');
        listBloco("portaria");
    } else {
        listPortaria();
        console.log("não porteiro");
        $('.blocolistcomunicadoli').removeClass('visivel');
        $('.blocolistcomunicadoli').addClass('invisivel');

        $('.domiciliolistcomunicadoli').removeClass('visivel');
        $('.domiciliolistcomunicadoli').addClass('invisivel');

        $('.moradorlistcomunicadoli').removeClass('visivel');
        $('.moradorlistcomunicadoli').addClass('invisivel');
        $('.listportaria').removeClass('invisivel');

    }

});

///////////////////////////// acao inserir comunicado portaria ///////////////////////////
$('#butinserircomunportaria').on('click', function(){
    //alert("enviar");

    if (($$('#txttitcomunportaria').val()!="") &&  ($$('#txtdescricaocomunportaria').val()!="")) {

            enviarcomunportaria();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

$$('#pdfFileComunportaria').on('change', function (e) {
    myApp.showIndicator();
    var files = e.target.files; // FileList object
    console.log("nome = "+files[0].name);
    if (files[0].name.indexOf(".pdf")!=-1 || files[0].name.indexOf(".PDF")!=-1) {
        var image = document.getElementById('preview-pdf-comunportaria');
        image.src = "images/icon_pdf.png";

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              console.log(e);
              var pdf = document.getElementById('pdfFileComunportariaHidden');
              $("#pdfFileComunportariaHidden").val(e.target.result);
              //console.log("eu");
              myApp.hideIndicator();
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }
    }else{
        myApp.alert('Formato inválido! Escolha um arquivo no formato PDF.');
    }

});

///////////////////////////// inserir comunicado portaria ///////////////////////////
function enviarcomunportaria()
{
 
        $$pdfFileComunportaria = $$('#pdfFileComunportariaHidden').val();

        imagem = $('#preview-comunportaria').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");

        if (localStorage.getItem("moradorIdmorador")) {
            $$idmorador = localStorage.getItem("moradorIdmorador");
        } else{
            $$idmorador = "";
        }

        if (localStorage.getItem("portariaIdportaria")) {
            $$idportaria = localStorage.getItem("portariaIdportaria");
        } else{
            $$idportaria = $$('#portarialistportaria').val();
        }

        if (localStorage.getItem("sindicoIdsindico")) {
            $$idsindico = localStorage.getItem("sindicoIdsindico");
        } else{
            $$idsindico = "";
        }

        if (localStorage.getItem("sindicoIdsindico") && localStorage.getItem("moradorIdmorador")) {
            $$idsindico = "";
        }

        if (localStorage.getItem("administradoraIdadministradora")) {
            $$idadministradora = localStorage.getItem("administradoraIdadministradora");
        } else{
            $$idadministradora = "";
        }

        if (localStorage.getItem("moradorIdbloco")) {
            $$idbloco = localStorage.getItem("moradorIdbloco");
        } else{
            $$idbloco = $$('#blocolistportaria').val();
        }

        if (localStorage.getItem("moradorIddomicilio")) {
            $$iddomicilio = localStorage.getItem("moradorIddomicilio");
        } else{
            $$iddomicilio = $$('#domiciliolistportaria').val();
        }
        
        $$iddestino = $$('#moradorlistportaria').val();
        
        $$txtTitulo = $$('#txttitcomunportaria').val();
        $$txtDescricao = $$('#txtdescricaocomunportaria').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();

        $("#preview-comunportaria").attr('src',"");
        $("#preview-pdf-comunportaria").attr('src',"");

        myApp.showIndicator();
        if (!$$pdfFileComunportaria) {
            // Salvando imagem no servidor
            $.ajax($server+'functionAppComunPortaria.php?', {
                type: "post",
                data: "imagem="+imagem+"&idmorador="+$$idmorador+"&idsindico="+$$idsindico+"&idportaria="+$$idportaria+"&idadministradora="+$$idadministradora+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&iddestino="+$$iddestino+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserircomunportaria').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    if (localStorage.getItem("portariaIdportaria")) {
                        myApp.alert('Comunicado inserido com sucesso!', function () { window.location = "index.html";});
                    }else{
                        myApp.alert('Comunicado inserido com sucesso!', function () { mainView.router.load({pageName: 'comuncondominio'}); comunportaria();});
                    }
                }
              });
        }else{
            // Salvando pdf no servidor
            $.ajax($server+'functionAppComunPortaria.php?', {
                type: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: "pdf="+$$pdfFileComunportaria+"&idmorador="+$$idmorador+"&idsindico="+$$idsindico+"&idportaria="+$$idportaria+"&idadministradora="+$$idadministradora+"&idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&iddestino="+$$iddestino+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserircomunportaria').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    if (localStorage.getItem("portariaIdportaria")) {
                        myApp.alert('Comunicado inserido com sucesso!', function () { window.location = "index.html";});
                    }else{
                        myApp.alert('Comunicado inserido com sucesso!', function () { mainView.router.load({pageName: 'comuncondominio'}); comunportaria();});
                    }
                }
              });
        }
}


// Pull to refresh content
var ptrContent = $$('.comunmorador');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        comunmorador();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// Comunicado morador ///////////////////////////

function comunmorador(alvo){

    $('.tab-1').removeClass('active');
    $('.tab-2').removeClass('active');
    $('.tab-3').addClass('active');

    $('.comunportaria').addClass('invisivel');
    $('.comuncondominio').addClass('invisivel');
    $('.comunmorador').removeClass('invisivel');
    $('.inserircomuncondominio').addClass('invisivel');
    $('.inserircomunportaria').addClass('invisivel');
    $('.inserircomunmorador').removeClass('invisivel');

    if (localStorage.getItem("condominioId")) {
        var idcondominio = localStorage.getItem("condominioId");
    } else{
        var idcondominio = "";
    }
    if (localStorage.getItem("moradorIdmorador")) {
        var idmorador = localStorage.getItem("moradorIdmorador");
    } else{
        var idmorador = "";
    }
    if (localStorage.getItem("moradorIddomicilio")) {
        var iddomicilio = localStorage.getItem("moradorIddomicilio");
    } else{
        var iddomicilio = "";
    }
    if (localStorage.getItem("moradorIdbloco")) {
        var idbloco = localStorage.getItem("moradorIdbloco");
    } else{
        var idbloco = "";
    }
    if (localStorage.getItem("moradorIdmorador")) {
        var iddestino = localStorage.getItem("moradorIdmorador");
    } else{
        var iddestino = "";
    }

    myApp.showIndicator();
    //var datatransparencia;
    $('.badgecomunicado').html();
    badgecomunicado=0;

        $.ajax({
            url: $server+"functionAppComunMorador.php?idcondominio="+idcondominio+"&iddomicilio="+iddomicilio+"&iddestino="+iddestino+"&idbloco="+idbloco+"&idmorador="+idmorador+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datacomunicado = "";
                    var qtd = data.comunicado.length;
                    var send = "";
                    var colorsend = "";

                    for (var i = 0; i < qtd; i++) {

                        if (data.comunicado[i].name==localStorage.getItem("moradorNome")) {
                            send = 'right';
                            colorsend = ' color-green';
                        } else {
                            send = 'left';
                            colorsend = ' color-red';
                        }

                        datacomunicado += '<li date-date="'+data.comunicado[i].dataComunicado+'">'+
                                                  '<a href="#comunicadocont" onclick="comunmoradorcont('+data.comunicado[i].idComunicado+','+alvo+')" class="item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="'+data.comunicado[i].urlProfile+'" >'+
                                                    '</div>'+
                                                    '<div class="item-inner">'+
                                                        '<div class="item-title-row no-arrow">'+
                                                            '<div class="item-title">'+data.comunicado[i].name+'</div>'+
                                                            '<div class="item-after"><i class="fa fa-lg fa-arrow-circle-'+send+colorsend+'"></i></div>'+
                                                        '</div>'+
                                                      '<div class="item-subtitle">'+data.comunicado[i].dataComunicado+'</div>'+
                                                      '<div class="item-text">'+data.comunicado[i].tituloComunicado+'</div>'+
                                                    '</div>'+
                                                  '</a>'+
                                                '</li>';
                        $('#comunmorador-cont').html(datacomunicado);
                    }

                    ////// reordenar lista por data decrescente ///////
                    var mylist = $('#comunmorador-cont');
                    var listitems = mylist.children('li').get();
                    listitems.sort(function(a, b) {
                        var date1 = new Date(convertToDateCount($(a).attr('date-date')));
                        var dateMsec1 = date1.getTime();

                        var date2 = new Date(convertToDateCount($(b).attr('date-date')));
                        var dateMsec2 = date2.getTime();

                        var compA = dateMsec1;
                        var compB = dateMsec2;

                        return (compB < compA) ? -1 : (compB > compA) ? 1 : 0;
                    })
                    $.each(listitems, function(idx, itm) { mylist.append(itm); });  


                }else{
                    myApp.hideIndicator();
                    $('#comunmorador-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }            
            },error: function(data) {
                myApp.hideIndicator();
                $('#comunmorador-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

///////////////////////////////////// comunmoradorcont conteudo ///////////////////////////
function comunmoradorcont(id){

    myApp.showIndicator();

    $('#comunmoradorcontcont-cont').html("");
    $('#comunicadorespcont-cont').html("");

        $.ajax({
            url: $server+"functionAppComunMorador.php?idcomunmorador="+id+"&action=listcont",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var datacomunicado = "";
                var qtd = data.comunicado.length;
                var imgZoom;
                var imgComunicado = "";
                var imgTitle = "Aptohome";
                for (var i = 0; i < qtd; i++) {

                if (data.comunicado[i].urlComunicado!="images/sem_foto_icone.jpg") {

                myPhotoBrowserComunicadocont = myApp.photoBrowser({
                    theme: 'dark',
                    ofText: 'de',
                    backLinkText: '',
                    spaceBetween: 0,
                    navbar: true,
                    toolbar: false,
                    photos : [data.comunicado[i].urlComunicado],
                    type: 'popup'
                });

                    if (data.comunicado[i].urlComunicado.indexOf(".pdf")!=-1 || data.comunicado[i].urlComunicado.indexOf(".PDF")!=-1) {
                        pdfView = "onclick=openURLBrowser('"+data.comunicado[i].urlComunicado+"');";

                            imgComunicado = '<div class="card-content-cont bg-red" '+pdfView+'><i class="fa fa-file-pdf-o fa-3x"></i>'+
                                                        //'<img src="images/icon_pdf.png" '+pdfView+' width="100%">'+
                                                        '<div class="view-pdf">Clique para visualizar</div>'+
                                                    '</div>';
                    }else{
                        imgZoom = "onclick=myPhotoBrowserComunicadocont.open();";

                        if (data.comunicado[i].urlComunicado!="images/sem_foto_icone.jpg") {
                            imgComunicado = '<div class="card-content-cont"><i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                        '<img src="'+data.comunicado[i].urlComunicado+'" '+imgZoom+' width="100%">'+
                                                    '</div>';
                        }
                    }

                }

                datacomunicado += '<li>'+
                                        '<div class="card-cont ks-facebook-card">'+ imgComunicado +
                                            '<div class="card-header">'+
                                                '<div class="ks-facebook-avatar">'+
                                                    '<img src="'+data.comunicado[i].urlProfile+'" width="34">'+
                                                '</div>'+
                                                '<div class="ks-facebook-name">'+data.comunicado[i].name+'</div>'+
                                                '<div class="ks-facebook-date">'+data.comunicado[i].dataComunicado+'</div>'+
                                            '</div>'+
                                            '<div class="card-content-inner">'+
                                                '<p class="facebook-title">'+data.comunicado[i].tituloComunicado+'</p>'+
                                                '<p class="facebook-date">'+data.comunicado[i].descricaoComunicado+'</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>';
                    imgComunicado = "";
                $('#comunicadocont-cont').html(datacomunicado);
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });

        /////////// lista as respostas //////////
        $.ajax({
            url: $server+"functionAppResposta.php?iddestino=14&idpostdestino="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            
                var dataresposta = '<li class="item-divider border-top-tit">Respostas</li>';
                var qtd = data.resposta.length;
                var imgResposta = "";
                var imgZoom;
                var imgTitle = "Aptohome";
                var dataresp;

                for (var i = 0; i < qtd; i++) {

                    if (data.resposta[i].urlResposta!="images/sem_foto_icone.jpg") {

                    myPhotoBrowserRespostacont = myApp.photoBrowser({
                        theme: 'dark',
                        ofText: 'de',
                        backLinkText: '',
                        spaceBetween: 0,
                        navbar: true,
                        toolbar: false,
                        photos : [data.resposta[i].urlResposta],
                        type: 'popup'
                    });

                        imgZoom = "onclick=myPhotoBrowserRespostacont.open();";
                        imgResposta = '<div class="card-content-cont">'+
                                                    '<i '+imgZoom+' class="fa fa-search-plus fa-3x"></i>'+
                                                    '<img src="'+data.resposta[i].urlResposta+'" '+imgZoom+' width="100%">'+
                                                '</div>';
                    }

                    dataresposta += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+ imgResposta +
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar">'+
                                                        '<img src="'+data.resposta[i].urlProfile+'" width="34">'+
                                                    '</div>'+
                                                    '<div class="ks-facebook-name">'+data.resposta[i].name+'</div>'+
                                                    '<div class="ks-facebook-date">'+data.resposta[i].dataResposta+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-date">'+data.resposta[i].descricaoResposta+'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';
                    imgResposta = "";
                }
                
                $('#comunicadorespcont-cont').append(dataresposta);

            },error: function(data) {
                /*myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');*/
            }
        });


        dataresp = '<div class="list-block">'+
                      '<ul>'+
                        '<li class="item-divider border-top-tit">Envie sua resposta</li>'+
                        '<li class="align-top">'+
                          '<div class="item-content">'+
                            '<div class="item-inner">'+
                              '<div class="item-title label">Descrição</div>'+
                                '<div class="item-input">'+
                                  '<input type="hidden" id="iddestinoresp" value="14">'+
                                  '<input type="hidden" id="idpostdestinoresp" value="'+id+'">'+
                                    '<textarea id="txtdescricaoresp" class="resizable" style="height:76px" placeholder="Informe uma descrição"></textarea>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                        '</li>'+
                        '<li>'+
                          '<div class="item-content">'+
                            '<div class="item-inner">'+
                              '<div class="item-title label">Imagem</div>'+
                              '<div class="item-input">'+
                                '<div id="imagem-resp" class="optionCameraResp custom-file-input" onClick="optionCameraResp()"></div>'+
                                  '<div class="img-preview">'+
                                    '<img src="" id="preview-resp"  width="100" height="80">'+
                                  '</div>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</li>'+
                      '</ul>'+
                    '</div>'+
                    '<div class="content-block"><a href="#" id="butinserirresp" onclick="butinserirresp()" class="button button-big button-fill button-raised color-indigo button-full">ENVIAR</a></div>';
            
            $('.resp-cont').html(dataresp);

}

///////////////////////////// camera comunicado morador ///////////////////////////

function cameraComunmorador() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessComunmorador, onFailComunmorador, {
    quality: 80,
    allowEdit : true,
    targetWidth: 1500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileComunmorador(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessComunmorador, onFailComunmorador, {
    quality: 50,
    allowEdit: true,
    targetWidth: 1000,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessComunmorador(imageData) {
    var image = document.getElementById('preview-comunmorador');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFailComunmorador(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera comunicado morador ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserircomunmorador', function (page) {
    var actionOptionCameraComunmorador = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraComunmorador();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileComunmorador();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraComunmorador').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraComunmorador);
    });
    
});

///////////////////////////// acao inserir comunicado morador ///////////////////////////
$('#inserircomunmorador').on('click', function(){
    //alert("enviar");
    listBloco("morador");

});

///////////////////////////// acao inserir comunicado morador ///////////////////////////
$('#butinserircomunmorador').on('click', function(){
    //alert("enviar");

    if (($$('#txttitcomunmorador').val()!="") &&  ($$('#txtdescricaocomunmorador').val()!="")) {

            enviarcomunmorador();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

$$('#pdfFileComunmorador').on('change', function (e) {
    myApp.showIndicator();
    var files = e.target.files; // FileList object
    console.log("nome = "+files[0].name);
    if (files[0].name.indexOf(".pdf")!=-1 || files[0].name.indexOf(".PDF")!=-1) {
        var image = document.getElementById('preview-pdf-comunmorador');
        image.src = "images/icon_pdf.png";

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              console.log(e);
              var pdf = document.getElementById('pdfFileComunmoradorHidden');
              $("#pdfFileComunmoradorHidden").val(e.target.result);
              //console.log("eu");
              myApp.hideIndicator();
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }
    }else{
        myApp.alert('Formato inválido! Escolha um arquivo no formato PDF.');
    }

});

///////////////////////////// inserir comunicado morador ///////////////////////////
function enviarcomunmorador()
{
 
        $$pdfFileComunmorador = $$('#pdfFileComunmoradorHidden').val();

        imagem = $('#preview-comunmorador').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");
        $$idmorador = localStorage.getItem("moradorIdmorador");
        
        $$idbloco = localStorage.getItem("moradorIdbloco");
        $$iddomicilio = localStorage.getItem("moradorIddomicilio");
        $$iddestino = $$('#moradorlistmorador').val();
        $$txtTitulo = $$('#txttitcomunmorador').val();
        $$txtDescricao = $$('#txtdescricaocomunmorador').val();

        $("#preview-comunmorador").attr('src',"");
        $("#preview-pdf-comunmorador").attr('src',"");

        myApp.showIndicator();

        if (!$$pdfFileComunmorador) {
            // Salvando imagem no servidor
            $.ajax($server+'functionAppComunMorador.php?', {
                type: "post",
                data: "imagem="+imagem+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&idmorador="+$$idmorador+"&iddestino="+$$iddestino+"&idcondominio="+$$idcondominio+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserircomunmorador').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    myApp.alert('Comunicado inserido com sucesso!', function () { mainView.router.load({pageName: 'comuncondominio'}); comunmorador();});
                }
              });
        }else{
            // Salvando pdf no servidor
            $.ajax($server+'functionAppComunMorador.php?', {
                type: "post",
                processData: false,
                contentType: false,
                cache: false,
                data: "pdf="+$$pdfFileComunmorador+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&idmorador="+$$idmorador+"&iddestino="+$$iddestino+"&idcondominio="+$$idcondominio+"&txtTitulo="+$$txtTitulo+"&txtDescricao="+$$txtDescricao+"&action=add",
            })
              .fail(function() {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
              })     
              .done(function(data) {
                if ((data!="ok") && (data!=" ok")) {
                    myApp.hideIndicator();
                    myApp.alert('Erro! Tente novamente.');
                } else {
                    myApp.hideIndicator();

                    $('#forminserircomunmorador').each (function(){
                      this.reset();
                    });
                    $('input[type=hidden]').val("");

                    myApp.alert('Comunicado inserido com sucesso!', function () { mainView.router.load({pageName: 'comuncondominio'}); comunmorador();});
                }
              });
        }
}





///////////////////////////////////// search interfone //////////////////////////////////////
    var mySearchbarInterfone = myApp.searchbar('.submenuinterfone', {

        searchList: '.list-block-search-interfone',
        searchIn: '.item-title,.item-text',
        removeDiacritics: true,
        //customSearch: true,

        onEnable: function(s){
            //console.log('enable');
            //$('.inputsearchportariahome').attr("disabled", true);
        },

        onSearch: function(s){
            //console.log(s.value);
        },

        onDisable: function(s){
            console.log("clear");
            //$('#searchportariahome-cont').html("");
        }
    });

///////////////////////////////////// interfone ///////////////////////////
function interfone(){

    myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppMorador.php?idcondominio="+localStorage.getItem("condominioId")+"&action=listallprofile",
            dataType : "json",
            async: true,
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var datainterfone = "";
                    var qtd = data.morador.length;
                    var actionmorador = "";
                    var namecond = "";
                    var urlMorador = "";
                    for (var i = 0; i < qtd; i++) {

                          if(data.morador[i].num_bloco!="Sem bloco"){
                                var num_bloco = "/" + data.morador[i].num_bloco;
                            }
                            
                            urlMorador = data.morador[i].urlMorador.replace("http://","https://");
                            namecond = data.morador[i].name.trim().replace(/ /g, '%20');
                            actionmorador = "onclick = interfonecont('"+data.morador[i].idmorador+"','"+urlMorador+"','"+namecond+"','"+data.morador[i].num_domicilio+num_bloco+"')";

                            datainterfone += '<li class="item-content">'+
                                                      '<a href="#interfonecont" '+actionmorador+' class="item-link item-content swipeout-content">'+
                                                        '<div class="item-media">'+
                                                          '<img src="'+urlMorador+'" >'+
                                                        '</div>'+
                                                        '<div class="item-inner">'+
                                                          '<div class="item-title-row no-arrow">'+
                                                            '<div class="item-title">'+data.morador[i].name+'</div>'+
                                                            '<div class="item-after"><i class="fa fa-lg fa-2x fa-phone color-green"></i></div>'+
                                                          '</div>'+
                                                          '<div class="item-text">Apto: '+data.morador[i].num_domicilio+num_bloco+'</div>'+
                                                        '</div>'+
                                                      '</a>'+
                                                    '</li>';
                    }
                    $('#interfone-cont').html(datainterfone);
                }else{
                    myApp.hideIndicator();
                    $('#interfone-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#interfone-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

function interfonecont(idmorador,urlMorador,nome,apto){


        // seleciona som da notificação
        var sound;
        sound = "http://www.aptohome.com.br/sounds/ton.mp3";

        var media = new Media(sound, mediaSuccess, mediaError, mediaStatus);

        function mediaSuccess() {
            console.log('Chamando usuário');

            function stopaudio(){
                console.log("stopaudio");
                media.stop();
            }
        }
        function mediaError(e) {
            console.log('Media Error');
            console.log(JSON.stringify(e));
        }
        // play som notificação
        if(device.platform.toLowerCase() === "android"){
            media.play();
        }else{
            media.play({ numberOfLoops: 20 });
        }

        function mediaStatus(status) {
            if(status === Media.MEDIA_STOPPED) {
                media.seekTo(0);
                media.play();
            }
            console.log('status', JSON.stringify(arguments));
        }


        var datainterfonecall = "";

        //removendo espacos em branco
        var namecond = nome.replace(/%20/g, ' ');

        $('#interfonecont-cont').html("");

        $(".interfonecontbg").attr("style","background: url("+urlMorador+");background-size: cover;-webkit-filter: blur(60px);filter: blur(60px);-moz-filter: blur(60px);-o-filter: blur(60px);-ms-filter: blur(60px);opacity: 0.7;filter: alpha(opacity=70);width: 100%;height: 100%;position: absolute;top: 0;left: 0;");
        
        datainterfonecall += '<div class="item-media-call">'+
                              '<img src="'+urlMorador+'" >'+
                            '</div>'+
                            '<div class="item-text-call">Realizando chamanda...</div>'+
                            '<div class="item-title-call">'+namecond+'</div>'+
                            '<div class="item-text-call">Apto: '+apto+'</div>'+
                            '<div class="call-action-but">'+
                                '<span class="fa-stack fa-lg" id="endcall">'+
                                  '<i class="fa fa-circle fa-stack-2x bg-red-call"></i>'+
                                  '<i class="fa fa-phone fa-stack-1x fa-inverse"></i>'+
                                '</span>'+
                                '<span class="fa-stack fa-lg" id="changecan">'+
                                  '<i class="fa fa-circle fa-stack-2x bg-blue-call"></i>'+
                                  '<i class="fa fa-retweet fa-stack-1x fa-inverse"></i>'+
                                '</span>'+
                                '<span class="fa-stack fa-lg" id="mutecam">'+
                                  '<i class="fa fa-video-camera fa-stack-1x bg-white-call"></i>'+
                                  '<i class="fa fa-ban fa-stack-2x text-danger bg-red-call"></i>'+
                                '</span>'+
                            '</div>';
        $('#interfonecont-cont').html(datainterfonecall);

        // ......................................................
        // ..................RTCMultiConnection Code.............
        // ......................................................
        var connection = new RTCMultiConnection({
            //localVideoEl: 'localVideo',
            //remoteVideosEl: '',
            //autoRequestMedia: true,
            //detectSpeakingEvents: true,
            adjustPeerVolume: false,
            peerVolumeWhenSpeaking: 1,
            autoAdjustMic: false,
            media: {
              audio: {
                optional: [
                  //{sourceId: audio_source},  // do it like this to take the default audio src
                  {googAutoGainControl: false}, 
                  {googAutoGainControl2: false}, 
                  {googEchoCancellation: false},
                  {googEchoCancellation2: false},
                  {googNoiseSuppression: false},
                  {googNoiseSuppression2: false},
                  {googHighpassFilter: false},
                  {googTypingNoiseDetection: false},
                  {googAudioMirroring: false}
                ]
             },
             video: {
                optional: [
                  //{sourceId: video_source}   // do it like this else video does not show at all
                ]
              }
            }
        });
        // Using SSE (Server Sent Events) for signaling
        connection.setCustomSocketHandler(SSEConnection);
        connection.session = {
            audio: true,
            video: true
        };
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.videosContainer = document.getElementById('interfonecontvideo');
        var auxvideoqtdsend = 0;
        var auxintcall = "";

        connection.onstream = function(event) {

            console.log("onstream = "+event.streamid);
            console.log("getAllParticipants = "+connection.getAllParticipants().length);
            //conectado
            if (connection.getAllParticipants().length==1) {
                //if (auxvideoqtdsend>0) {
                // para audio chamada
                //stopaudio();

                //$(idvideocont).attr("style","width:100px;height:150px;min-width:100px;min-height:150px;position:absolute;top:90px;left:70px;z-index:9999999");
                console.log("auxvideoqtdsend = "+auxvideoqtdsend);
                // apos conectar a chamada esconde os dados: foto, nome e apto
                $(".item-media-call").hide();
                $(".item-text-call").hide();
                $(".item-title-call").hide();

                $("#interfonecontvideo video:nth-child(1)").attr("style","width:100px;height:150px;min-width:100px;min-height:150px;position:absolute;top:90px;left:70px;z-index:9999999");
            }

            var idvideocont = "#"+event.streamid;

            event.mediaElement.id = event.streamid;
            connection.videosContainer.appendChild(event.mediaElement);

            /*if (event.type === 'remote') {
                console.log("socket.close");
                connection.socket.close(); // release SSE connection
            }*/

            $(idvideocont).removeAttr("controls");
            console.log("auxvideoqtdsend = "+auxvideoqtdsend);
            
            //console.log("numberOfUsers ="+connection.getAllParticipants().length);
            setTimeout(function () {
                //console.log("numberOfUsers setTimeout ="+connection.getAllParticipants().length);
                var numberOfUsers = connection.getAllParticipants().length;
                if (numberOfUsers==0 && auxintcall=="") {
                    
                    myApp.alert('Usuário não atende!', function () { 
                        $("#interfonecontvideo video").remove();
                        $("#interfonecont div:nth-child(2)").remove();
                        $("#interfonecont div:nth-child(3)").remove();
                        connection.disconnect(event.streamid);
                        connection.closeEntireSession(event.streamid);
                        connection.close(event.streamid);
                        connection.closeSocket(event.streamid);
                        connection.deletePeer(event.streamid);

                        // disconnect with all users
                        connection.getAllParticipants().forEach(function(pid) {
                            connection.disconnectWith(pid);
                        });

                        // stop all local cameras
                        connection.attachStreams.forEach(function(localStream) {
                            localStream.stop();
                        });

                        // close socket.io connection
                        connection.closeSocket();

                        mainView.router.back({reload: true});
                        mySearchbarInterfone.disable();
                        interfone();
                        //window.location = "index.html";
                        //mainView.router.load({pageName: 'interfone'});
                        //interfone();
                    });
                        //window.location = "index.html";
                }
            }, 40000);

            // desligar a transmissao da camera
            var mute = 0;
            document.getElementById('mutecam').onclick = function() {
                //console.log("entrei");

                    if (mute == 0) {
                        mute = 1;
                        connection.streamEvents[event.streamid].stream.mute('video');
                    } else {
                        mute = 0;
                        connection.streamEvents[event.streamid].stream.unmute('video');
                    }
            }


            // if local or remote stream is muted
            connection.onmute = function(e) {
                console.log("onmute");
                e.mediaElement.setAttribute('poster', 'http://www.qygjxz.com/data/out/32/4365897-black-picture.jpg');
            };

            // if local or remote stream is unmuted
            connection.onunmute = function(e) {
                e.mediaElement.removeAttribute('poster');
                console.log("onunmute");
            };

            // deligar chamada
            document.getElementById('endcall').onclick = function() {
                connection.onstreamended(event);
            }

            var camatual = 0;
            // muda carera de front para back
            document.getElementById('changecan').onclick = function() {

                if (camatual == 0 && localStorage.getItem("deviceidactive1")) {
                    camatual = 1;
                }else{
                    camatual = 0;
                }

                // altera cor do botão
                $("#changecan .fa-circle").toggleClass("bg-blue-call");
                
                //pega lista de cameras
                navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

                var videoElement = $(idvideocont);

                //console.log("idvideocont = "+idvideocont);
                
                function gotStream(stream) {
                    //console.log("stream = "+stream);
                    var videoTracks = stream.getVideoTracks();
                    //console.log('Got stream with constraints:', constraints);
                    console.log('Using video device: ' + videoTracks[0].label);
                    window.stream = stream; // make stream available to console
                    var idvideocontatual = "#"+localStorage.getItem("deviceidactive"+camatual);
                    $(idvideocontatual) = stream;
                    // Refresh button list in case labels have become available
                    //return navigator.mediaDevices.enumerateDevices();
                }

                function gotDevices(deviceInfos) {
                    var e = 0;
                    for (var i = 0; i !== deviceInfos.length; ++i) {
                        //console.log("device id "+i+" = "+deviceInfos[i].deviceId);
                        //var deviceInfo = deviceInfos[i];
                        if (deviceInfos[i].kind === 'videoinput') {
                          console.log("videoinput = "+deviceInfos[i].label+" - deviceId = "+deviceInfos[i].deviceId);
                          //deviceidactive = deviceInfos[i].deviceId;
                          localStorage.setItem("deviceidactive"+e, deviceInfos[i].deviceId);
                          e++;
                        }
                    }
                    start();
                }

                function start(){
                    if (window.stream) {
                        window.stream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                    }
                    
                    console.log("alterar para = "+localStorage.getItem("deviceidactive"+camatual));
                    //var audioSource = audioInputSelect.value;
                    var videoSource = localStorage.getItem("deviceidactive"+camatual);
                    var constraints = {
                        //audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
                        video: {deviceId: videoSource ? {exact: videoSource} : undefined}
                        //video: {deviceId: videoSource}
                    };
                    /*navigator.mediaDevices.getUserMedia({ video: constraints }, function(stream) {
                        document.videoElement.src = URL.createObjectURL(stream);
                    });*/
                    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
                }

                function handleError(error) {
                    console.log('navigator.getUserMedia error: ', error);
                }
            }
            auxvideoqtdsend ++;
        };

        connection.onstreamended = function(event) {
            console.log("onstreamended = "+event);
            $("#interfonecontvideo video").remove();
            $("#interfonecont div:nth-child(2)").remove();
            $("#interfonecont div:nth-child(3)").remove();
            connection.disconnect(event.streamid);
            connection.closeEntireSession(event.streamid);
            connection.close(event.streamid);
            connection.closeSocket(event.streamid);
            connection.deletePeer(event.streamid);


                        // disconnect with all users
                        connection.getAllParticipants().forEach(function(pid) {
                            connection.disconnectWith(pid);
                        });

                        // stop all local cameras
                        connection.attachStreams.forEach(function(localStream) {
                            localStream.stop();
                        });

                        // close socket.io connection
                        connection.closeSocket();


            mainView.router.back({reload: true});
            mySearchbarInterfone.disable();

            auxintcall = 1;
            
            //window.location = "index.html";
            //mainView.router.load({pageName: 'interfone'});
            interfone();
        };

        // abre sala
        connection.open(idmorador, function() {
            console.log("Abriu sala = "+connection.sessionid);
        });

        $.ajax({
            url: $server+"functionAppMorador.php?idmorador="+idmorador+"&namefrom="+localStorage.getItem("moradorNome")+"&bloconumfrom="+localStorage.getItem("blocoNum")+"&domicilionumfrom="+localStorage.getItem("domicilioNum")+"&urlfrom="+localStorage.getItem("profileImage")+"&action=callMorador",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    console.log(data);
                }else{
                    myApp.hideIndicator();
                    $('#interfone-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
            },error: function(data) {
                myApp.hideIndicator();
                $('#interfone-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        });
    //alert("Entrei");
}

function chamadamorador(idmorador,apto,namefrom,urlprofile){

        var datainterfonecall = "";

        $('#interfonecont-cont').html("");

        $(".interfonecontbg").attr("style","background: url("+urlprofile+");background-size: cover;-webkit-filter: blur(60px);filter: blur(60px);-moz-filter: blur(60px);-o-filter: blur(60px);-ms-filter: blur(60px);opacity: 0.7;filter: alpha(opacity=70);width: 100%;height: 100%;position: absolute;top: 0;left: 0;");
        
        datainterfonecall += '<div class="item-media-call">'+
                              '<img src="'+urlprofile+'" >'+
                            '</div>'+
                            '<div class="item-text-call">Recebendo chamanda...</div>'+
                            '<div class="item-title-call">'+namefrom+'</div>'+
                            '<div class="item-text-call">'+apto+'</div>'+
                            '<div class="call-action-accept-but">'+
                                '<span class="fa-stack fa-lg" id="recevecall">'+
                                  '<i class="fa fa-circle fa-stack-2x bg-green-call"></i>'+
                                  '<i class="fa fa-phone fa-stack-1x fa-inverse"></i>'+
                                '</span>'+
                            '</div>'+
                            '<div class="call-action-receve-but">'+
                                '<span class="fa-stack fa-lg" id="endcall">'+
                                  '<i class="fa fa-circle fa-stack-2x bg-red-call"></i>'+
                                  '<i class="fa fa-phone fa-stack-1x fa-inverse"></i>'+
                                '</span>'+
                                '<span class="fa-stack fa-lg" id="changecan">'+
                                  '<i class="fa fa-circle fa-stack-2x bg-blue-call"></i>'+
                                  '<i class="fa fa-retweet fa-stack-1x fa-inverse"></i>'+
                                '</span>'+
                                '<span class="fa-stack fa-lg" id="mutecam">'+
                                  '<i class="fa fa-video-camera fa-stack-1x bg-white-call"></i>'+
                                  '<i class="fa fa-ban fa-stack-2x text-danger bg-red-call"></i>'+
                                '</span>'+
                            '</div>';
        $('#interfonecont-cont').html(datainterfonecall);


        // deligar chamada antes de aceitar
        /*if (!$("#endcall").hasClass("connectionactive")) {
            console.log("desligar chamada antes de conectar");
            document.getElementById('endcall').onclick = function() {
                    mainView.router.back({reload: true});
            }
        }*/

    document.getElementById('recevecall').onclick = function() {
        // esconde botao aceitar chamada
        $(".call-action-accept-but").hide();

        //add class em endcall -> connectionactive para afirmar que connectio esta ativo
        $("#endcall").hasClass("connectionactive")

        // ......................................................
        // ..................RTCMultiConnection Code.............
        // ......................................................

        //var connection = new RTCMultiConnection();
        var connection = new RTCMultiConnection({
            //localVideoEl: 'localVideo',
            //remoteVideosEl: '',
            //autoRequestMedia: true,
            //detectSpeakingEvents: true,
            adjustPeerVolume: false,
            peerVolumeWhenSpeaking: 1,
            autoAdjustMic: false,
            media: {
              audio: {
                optional: [
                  //{sourceId: audio_source},  // do it like this to take the default audio src
                  {googAutoGainControl: false}, 
                  {googAutoGainControl2: false}, 
                  {googEchoCancellation: false},
                  {googEchoCancellation2: false},
                  {googNoiseSuppression: false},
                  {googNoiseSuppression2: false},
                  {googHighpassFilter: false},
                  {googTypingNoiseDetection: false},
                  {googAudioMirroring: false}
                ]
             },
             video: {
                optional: [
                  //{sourceId: video_source}   // do it like this else video does not show at all
                ]
              }
            }
        });

        // Using SSE (Server Sent Events) for signaling
        connection.setCustomSocketHandler(SSEConnection);
        connection.session = {
            audio: true,
            video: true
        };
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.videosContainer = document.getElementById('interfonecontvideo');
        var auxvideoqtd = 0;

        connection.onstream = function(event) {
            console.log("onstream = "+event.streamid);
            var idvideocont = "#"+event.streamid;

            event.mediaElement.id = event.streamid;
            connection.videosContainer.appendChild(event.mediaElement);
            if (event.type === 'remote') {
                connection.socket.close(); // release SSE connection
            }
            
            if (auxvideoqtd!=0) {
                console.log("auxvideoqtd = "+auxvideoqtd);
                $("#interfonecontvideo video:nth-child(1)").attr("style","width:100px;height:150px;min-width:100px;min-height:150px;position:absolute;top:90px;left:70px;z-index:9999999");
                // apos conectar a chamada esconde os dados: foto, nome e apto
                $(".item-media-call").hide();
                $(".item-text-call").hide();
                $(".item-title-call").hide();
            }
            $(idvideocont).removeAttr("controls");
            auxvideoqtd ++;

            // desligar a transmissao da camera
            var mute = 0;
            document.getElementById('mutecam').onclick = function() {
                //console.log("entrei");

                    if (mute == 0) {
                        mute = 1;
                        connection.streamEvents[event.streamid].stream.mute('video');
                    } else {
                        mute = 0;
                        connection.streamEvents[event.streamid].stream.unmute('video');
                    }
            }

            // if local or remote stream is muted
            connection.onmute = function(e) {
                console.log("onmute");
                e.mediaElement.setAttribute('poster', 'http://www.qygjxz.com/data/out/32/4365897-black-picture.jpg');
            };

            // if local or remote stream is unmuted
            connection.onunmute = function(e) {
                e.mediaElement.removeAttribute('poster');
                console.log("onunmute");
            };

            // deligar chamada
                document.getElementById('endcall').onclick = function() {
                    connection.onstreamended(event);
                }

            var camatual = 0;
            // muda carera de front para back
            document.getElementById('changecan').onclick = function() {

                if (camatual == 0 && localStorage.getItem("deviceidactive1")) {
                    camatual = 1;
                }else{
                    camatual = 0;
                }

                // altera cor do botão
                $("#changecan .fa-circle").toggleClass("bg-blue-call");
                
                //pega lista de cameras
                navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

                var videoElement = $(idvideocont);

                //console.log("idvideocont = "+idvideocont);
                
                function gotStream(stream) {
                    var videoTracks = stream.getVideoTracks();
                    //console.log('Got stream with constraints:', constraints);
                    console.log('Using video device: ' + videoTracks[0].label);
                    window.stream = stream; // make stream available to console
                    var idvideocontatual = "#"+localStorage.getItem("deviceidactive"+camatual);
                    $(idvideocontatual) = stream;
                    // Refresh button list in case labels have become available
                    return navigator.mediaDevices.enumerateDevices();
                }

                function gotDevices(deviceInfos) {
                    var e = 0;
                    for (var i = 0; i !== deviceInfos.length; ++i) {
                        //console.log("device id "+i+" = "+deviceInfos[i].deviceId);
                        //var deviceInfo = deviceInfos[i];
                        if (deviceInfos[i].kind === 'videoinput') {
                          console.log("videoinput = "+deviceInfos[i].label+" - deviceId = "+deviceInfos[i].deviceId);
                          //deviceidactive = deviceInfos[i].deviceId;
                          localStorage.setItem("deviceidactive"+e, deviceInfos[i].deviceId);
                          e++;
                        }
                    }
                    start();
                }

                function start(){
                    if (window.stream) {
                        window.stream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                    }
                    
                    console.log("alterar para = "+localStorage.getItem("deviceidactive"+camatual));
                    //var audioSource = audioInputSelect.value;
                    var videoSource = localStorage.getItem("deviceidactive"+camatual);
                    var constraints = {
                        //audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
                        video: {deviceId: videoSource ? {exact: videoSource} : undefined}
                        //video: {deviceId: videoSource}
                    };
                    /*navigator.mediaDevices.getUserMedia({ video: constraints }, function(stream) {
                        document.videoElement.src = URL.createObjectURL(stream);
                    });*/
                    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
                }

                function handleError(error) {
                    console.log('navigator.getUserMedia error: ', error);
                }
            }
        };
        connection.onstreamended = function(event) {
            console.log("onstreamended = "+event.streamid);

            $("#interfonecontvideo video").remove();
            $("#interfonecont div:nth-child(2)").remove();
            $("#interfonecont div:nth-child(3)").remove();
            connection.disconnect(event.streamid);
            connection.closeEntireSession(event.streamid);
            connection.close(event.streamid);
            connection.closeSocket(event.streamid);


            // disconnect with all users
            connection.getAllParticipants().forEach(function(pid) {
                connection.disconnectWith(pid);
            });

            // stop all local cameras
            connection.attachStreams.forEach(function(localStream) {
                localStream.stop();
            });

            // close socket.io connection
            connection.closeSocket();

            connection.deletePeer(event.streamid);
            mainView.router.back({reload: true});
            mySearchbarInterfone.disable();

            //auxintcall = 1;
            //window.location = "index.html";
            //mainView.router.load({pageName: 'interfone'});
            interfone();
        };

        // entra na sala
        connection.join(idmorador, function() {
            console.log("Entrei na sala = "+connection.sessionid);
        });
    }
}

// aceitar chamada pelo botão push
function chamadamoradorpush(idmorador,apto,namefrom,urlprofile){

        var datainterfonecall = "";

        $('#interfonecont-cont').html("");

        $(".interfonecontbg").attr("style","background: url("+urlprofile+");background-size: cover;-webkit-filter: blur(60px);filter: blur(60px);-moz-filter: blur(60px);-o-filter: blur(60px);-ms-filter: blur(60px);opacity: 0.7;filter: alpha(opacity=70);width: 100%;height: 100%;position: absolute;top: 0;left: 0;");
        
        datainterfonecall += '<div class="item-media-call">'+
                              '<img src="'+urlprofile+'" >'+
                            '</div>'+
                            '<div class="item-text-call">Recebendo chamanda...</div>'+
                            '<div class="item-title-call">'+namefrom+'</div>'+
                            '<div class="item-text-call">'+apto+'</div>'+
                            '<div class="call-action-receve-but">'+
                                '<span class="fa-stack fa-lg" id="endcall">'+
                                  '<i class="fa fa-circle fa-stack-2x bg-red-call"></i>'+
                                  '<i class="fa fa-phone fa-stack-1x fa-inverse"></i>'+
                                '</span>'+
                                '<span class="fa-stack fa-lg" id="changecan">'+
                                  '<i class="fa fa-circle fa-stack-2x bg-blue-call"></i>'+
                                  '<i class="fa fa-retweet fa-stack-1x fa-inverse"></i>'+
                                '</span>'+
                                '<span class="fa-stack fa-lg" id="mutecam">'+
                                  '<i class="fa fa-video-camera fa-stack-1x bg-white-call"></i>'+
                                  '<i class="fa fa-ban fa-stack-2x text-danger bg-red-call"></i>'+
                                '</span>'+
                            '</div>';
        $('#interfonecont-cont').html(datainterfonecall);


        // deligar chamada antes de aceitar
        if (!$("#endcall").hasClass("connectionactive")) {
            document.getElementById('endcall').onclick = function() {
                    mainView.router.back({reload: true});
            }
        }

        //add class em endcall -> connectionactive para afirmar que connectio esta ativo
        $("#endcall").hasClass("connectionactive")

        // ......................................................
        // ..................RTCMultiConnection Code.............
        // ......................................................

        //var connection = new RTCMultiConnection();
        var connection = new RTCMultiConnection({
            //localVideoEl: 'localVideo',
            //remoteVideosEl: '',
            //autoRequestMedia: true,
            //detectSpeakingEvents: true,
            adjustPeerVolume: false,
            peerVolumeWhenSpeaking: 1,
            autoAdjustMic: false,
            media: {
              audio: {
                optional: [
                  //{sourceId: audio_source},  // do it like this to take the default audio src
                  {googAutoGainControl: false}, 
                  {googAutoGainControl2: false}, 
                  {googEchoCancellation: false},
                  {googEchoCancellation2: false},
                  {googNoiseSuppression: false},
                  {googNoiseSuppression2: false},
                  {googHighpassFilter: false},
                  {googTypingNoiseDetection: false},
                  {googAudioMirroring: false}
                ]
             },
             video: {
                optional: [
                  //{sourceId: video_source}   // do it like this else video does not show at all
                ]
              }
            }
        });

        // Using SSE (Server Sent Events) for signaling
        connection.setCustomSocketHandler(SSEConnection);
        connection.session = {
            audio: true,
            video: true
        };
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.videosContainer = document.getElementById('interfonecontvideo');
        var auxvideoqtd = 0;

        connection.onstream = function(event) {
            console.log("onstream = "+event.streamid);
            var idvideocont = "#"+event.streamid;

            event.mediaElement.id = event.streamid;
            connection.videosContainer.appendChild(event.mediaElement);
            if (event.type === 'remote') {
                connection.socket.close(); // release SSE connection
            }
            
            if (auxvideoqtd!=0) {
                console.log("auxvideoqtd = "+auxvideoqtd);
                $("#interfonecontvideo video:nth-child(1)").attr("style","width:100px;height:150px;min-width:100px;min-height:150px;position:absolute;top:90px;left:70px;z-index:9999999");
                // apos conectar a chamada esconde os dados: foto, nome e apto
                $(".item-media-call").hide();
                $(".item-text-call").hide();
                $(".item-title-call").hide();
            }
            $(idvideocont).removeAttr("controls");
            auxvideoqtd ++;

            // desligar a transmissao da camera
            var mute = 0;
            document.getElementById('mutecam').onclick = function() {
                //console.log("entrei");

                    if (mute == 0) {
                        mute = 1;
                        connection.streamEvents[event.streamid].stream.mute('video');
                    } else {
                        mute = 0;
                        connection.streamEvents[event.streamid].stream.unmute('video');
                    }
            }

            // if local or remote stream is muted
            connection.onmute = function(e) {
                //console.log("onmute");
                e.mediaElement.setAttribute('poster', 'http://www.qygjxz.com/data/out/32/4365897-black-picture.jpg');
            };

            // if local or remote stream is unmuted
            connection.onunmute = function(e) {
                e.mediaElement.removeAttribute('poster');
                //console.log("onunmute");
            };

            // deligar chamada
            if ($("#endcall").hasClass("connectionactive")) {
                document.getElementById('endcall').onclick = function() {
                    connection.onstreamended(event);
                }
            }

            var camatual = 0;
            // muda carera de front para back
            document.getElementById('changecan').onclick = function() {

                if (camatual == 0 && localStorage.getItem("deviceidactive1")) {
                    camatual = 1;
                }else{
                    camatual = 0;
                }

                // altera cor do botão
                $("#changecan .fa-circle").toggleClass("bg-blue-call");
                
                //pega lista de cameras
                navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

                var videoElement = $(idvideocont);

                //console.log("idvideocont = "+idvideocont);
                
                function gotStream(stream) {
                    //console.log("stream = "+stream);
                    window.stream = stream; // make stream available to console
                    connection.videosContainer = stream;
                    // Refresh button list in case labels have become available
                    return navigator.mediaDevices.enumerateDevices();
                }

                function gotDevices(deviceInfos) {
                    var e = 0;
                    for (var i = 0; i !== deviceInfos.length; ++i) {
                        console.log("device id "+i+" = "+deviceInfos[i].deviceId);
                        //var deviceInfo = deviceInfos[i];
                        if (deviceInfos[i].kind === 'videoinput') {
                          console.log("videoinput = "+deviceInfos[i].label+" - deviceId = "+deviceInfos[i].deviceId);
                          //deviceidactive = deviceInfos[i].deviceId;
                          localStorage.setItem("deviceidactive"+e, deviceInfos[i].deviceId);
                          e++;
                        }
                    }
                    start();
                }

                function start(){
                    if (window.stream) {
                        window.stream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                    }
                    
                    console.log("alterar para = "+localStorage.getItem("deviceidactive"+camatual));
                    //var audioSource = audioInputSelect.value;
                    var videoSource = localStorage.getItem("deviceidactive"+camatual);
                    var constraints = {
                        //audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
                        video: {deviceId: videoSource ? {exact: videoSource} : undefined}
                    };
                    /*navigator.mediaDevices.getUserMedia({ video: constraints }, function(stream) {
                        document.videoElement.src = URL.createObjectURL(stream);
                    });*/
                    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
                }

                function handleError(error) {
                    console.log('navigator.getUserMedia error: ', error);
                }
            }
        };
        connection.onstreamended = function(event) {
            console.log("event = "+event.streamid);
            $("#interfonecont div:nth-child(2)").remove();
            $("#interfonecont div:nth-child(3)").remove();
            connection.disconnect(event.streamid);
            connection.closeEntireSession(event.streamid);
            connection.close(event.streamid);
            connection.closeSocket(event.streamid);
            connection.deletePeer(event.streamid);
            //mainView.router.back({reload: true});
            //mySearchbarInterfone.disable();

            //auxintcall = 1;
            //interfone();
            window.location = "index.html";
            //mainView.router.load({pageName: 'interfone'});
            //interfone();
        };

        // entra na sala
        connection.join(idmorador, function() {
            console.log("Entrei na sala = "+connection.sessionid);
        });

}


// Pull to refresh content
var ptrContent = $$('.alertadechegadahome');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        alertadechegadahome();
        //alert("refresh alerta");
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// alerta de chegada home ///////////////////////////

function alertadechegadahome(alvo){
console.log("alertadechegadahome");

    origin = [];
    destination = [];
    guidAlerta = [];
    $.ajax({
        url: $server+"functionAppAlerta.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
        dataType : "json",
        success: function(data) {
            if ((data!=null) && (data!="")) {

                var dataalerta = "";
                var qtd = data.alerta.length;
                var iconpanico = "";
                var panico = "";
                var tipo = "";
                var marcamodelo = "";
                var alertaveiculo = "";
                var ids = [];

                for (var i = 0; i < qtd; i++) {

                    if (data.alerta[i].panico=="1"){
                        iconpanico = '<div class="item-after"><i class="fa fa-lg fa-exclamation-circle color-red"></i></div>';
                        panico = "panico";
                    }

                    if (data.alerta[i].tipoVeiculo) {
                        if (data.alerta[i].tipoVeiculo=="1") {
                            tipo = "Carro";
                        } else {
                            tipo = "Moto";
                        }
                    } else {
                        tipo = "";
                    }
                    if (data.alerta[i].urlVeiculo!="http://www.aptohome.com.br/img/sem_foto_icone.jpg") {
                        alertaveiculo = '<div class="alertaveiculohome">'+
                                            '<div class="item-media" style="border:solid 4px '+data.alerta[i].corVeiculo+'">'+
                                                '<img src="'+data.alerta[i].urlVeiculo+'" >'+
                                            '</div>'+
                                        '</div>';
                    }
                    if (data.alerta[i].marcaVeiculo) {
                        marcamodelo = '<div class="item-text '+panico+'">'+data.alerta[i].marcaVeiculo+' - '+data.alerta[i].modeloVeiculo+'</div>';
                    } else {
                        marcamodelo = "";
                    }
                    var totalalertahomecont = localStorage.getItem("totalalertahomecont-"+i) ? localStorage.getItem("totalalertahomecont-"+i) : "Aguardando GPS...";
                    dataalerta += '<li class="'+panico+'">'+
                                              '<a href="#alertadechegadacont" onclick="alertadechegadacont('+data.alerta[i].idalerta+')" class="item-link item-content">'+
                                                '<div class="item-media">'+
                                                  '<img src="'+data.alerta[i].urlProfile+'" >'+
                                                '</div>'+
                                                alertaveiculo+
                                                '<div class="item-inner padding-left-15">'+
                                                  '<div class="item-title-row">'+
                                                    '<div class="item-title">'+data.alerta[i].nameMorador+'</div>'+
                                                    iconpanico+
                                                  '</div>'+
                                                  '<div class="item-subtitle">'+data.alerta[i].dataAlerta+'</div>'+
                                                  '<div class="item-text '+panico+'">'+data.alerta[i].numBlocoApto+'</div>'+
                                                  '<div class="item-title-row no-arrow">'+
                                                    '<div class="item-title item-title-veiculo">'+data.alerta[i].placaVeiculo+'</div>'+
                                                  '</div>'+
                                                  '<div class="item-text '+panico+'">'+tipo+'</div>'+
                                                  marcamodelo+
                                                '</div>'+
                                              '</a>'+
                                            '</li>'+
                                            '<li>'+
                                                '<div id="totalalertahome-cont-'+i+'" class="totaldistanciahome bg-blue">'+ totalalertahomecont +'</div>'+
                                            '</li>';
                    $('#alertadechegadahome-cont').html(dataalerta);
                    iconpanico = "";
                    panico = "";
                    alertaveiculo = "";

                    ids.push(data.alerta[i].idalerta);
                    guidAlerta.push(data.alerta[i].guid);

                }
                //setTimeout(alertadechegadahome, 30000);
                atualizatempoalerta(ids,guidAlerta);
                guidAlerta=[];

            }else{
                $('#alertadechegadahome-cont').html("<li class='semregistro'>*Nenhum registro cadastrado</li>");
                clearTimeout(alertadechegadahome);
            }            
        },error: function(data) {
            $('#alertadechegadahome-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            clearTimeout(alertadechegadahome);
        }
    });


    function atualizatempoalerta(ids,guidAlerta){
            var qtdtracking = "";
            $.ajax({
                url: $server+"functionAppTracking.php?idalerta="+ids+"&action=list",
                dataType : "json",
                success: function(data) {
                    if (data!=null) {
                        var qtdtracking = data.tracking.length;
                        console.log("qtdtracking = "+qtdtracking);

                        for (var i = 0; i < qtdtracking; i++) {
                            if (data.tracking[i].idAlerta!=localStorage.getItem("idtraking")) {
                                console.log("idtraking"+i+"= "+data.tracking[i].idAlerta)
                                origin.push(data.tracking[i].latitude+','+data.tracking[i].longitude);
                                destination.push(localStorage.getItem("condominioStreet")+', '+localStorage.getItem("condominioNumber")+', '+localStorage.getItem("condominioDistrict")+', '+localStorage.getItem("condominioCityname")+', '+localStorage.getItem("condominioUf"));
                                localStorage.setItem("idtraking", data.tracking[i].idAlerta);
                                console.log("quant origin = "+origin.length);
                            }
                        }
                        
                        console.log("origin = "+origin);
                        console.log("destination = "+destination);
                        console.log("origin.length = "+origin.length);

                        if (origin!=localStorage.getItem("arraytracking")) {
                            atualizatempoalertageo(origin,destination,guidAlerta);
                            localStorage.setItem("arraytracking", origin);
                        }else{
                            alertadechegadahometime = setTimeout(alertadechegadahome, 3000);
                            localStorage.removeItem("idtraking")
                        }
                    }
                    
                },error: function(data) {
                }
            });
    }
    function atualizatempoalertageo(origin,destination,guidAlerta){
        
        var qtd = origin.length;
        console.log("atualizatempoalertageo qtd = "+qtd);
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyDuyZZJSUxIPv3lVWWQhcl8drGzxFUunCk&origins="+origin.join('|')+"&destinations="+destination.join('|')+"&language=pt-BR",
            dataType : "json",
            success: function(data) {

                if (data!=null) {
                    for (var i = 0; i < qtd; i++) {
                            console.log(data.rows[0].elements[0].duration.value);
                            console.log(data);

                            var time = data.rows[i].elements[i].duration.value;
                            var total = data.rows[i].elements[i].distance.value / 1000;
                            var totalformat = total.toString().replace(".", ",");
                            
                            console.log("array guidAlerta = "+guidAlerta);
                            
                            // se chegar no destino cancela o alerta
                            if (total<0.1) {
                                console.log("cancela alerta");
                               $.ajax({
                                    url: $server+"functionAppAlerta.php?guid="+guidAlerta[i]+"&action=deltracking",
                                    dataType : "json",
                                    success: function(data) {
                                       console.log("alerta chegou ao fim");
                                    },error: function(data) {

                                    }
                                });

                            }

                            var totalalertahomecont = "#totalalertahome-cont-"+i;
                            console.log(totalalertahomecont+': Distância = ' + totalformat + ' km | Tempo = ' + formatTime(time) + 'min');
                            
                            localStorage.setItem("totalalertahomecont-"+i, 'Distância = ' + totalformat + ' km | Tempo = ' + formatTime(time) + 'min');
                            var totalalertahomecontinfo = localStorage.getItem("totalalertahomecont-"+i) ? localStorage.getItem("totalalertahomecont-"+i) : "Carregando...";
                            //document.getElementById(totalalertahomecont).innerHTML = 'Distância = ' + totalformat + ' km | Tempo = ' + formatTime(time) + 'min';
                            $(totalalertahomecont).html(totalalertahomecontinfo);
                    }
                    alertadechegadahometime = setTimeout(alertadechegadahome, 3000);
                }
                origin=[];
                destination=[];
            },error: function(data) {
            }
        });
    }
}


///////////////////////////////////// alerta de chegada conteudo ///////////////////////////
function alertadechegadacont(id){

    clearTimeout(alertadechegadahometime);
    localStorage.setItem("idalertadechegadacont", id);

    myApp.showIndicator();

    $('#alertadechegadacont-cont').html("");

        $.ajax({
            url: $server+"functionAppAlerta.php?idalerta="+id+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {

                    var dataalerta = "";
                    var qtd = data.alerta.length;
                    var iconpanico = "";
                    var panico = "";
                    var tipo = "";
                    var marcamodelo = "";
                    var alertaveiculo = "";
                    for (var i = 0; i < qtd; i++) {

                        if (data.alerta[i].panico=="1"){
                            iconpanico = '<div class="item-after"><i class="fa fa-lg fa-exclamation-circle color-red"></i></div>';
                            panico = "panico";
                        }

                        if (data.alerta[i].tipoVeiculo) {
                            if (data.alerta[i].tipoVeiculo=="1") {
                                tipo = "Carro";
                            } else {
                                tipo = "Moto";
                            }
                        } else {
                            tipo = "";
                        }
                        if (data.alerta[i].urlVeiculo!="http://www.aptohome.com.br/img/sem_foto_icone.jpg") {
                            alertaveiculo = '<div class="alertaveiculohome">'+
                                                '<div class="item-media" style="border:solid 4px '+data.alerta[i].corVeiculo+'">'+
                                                    '<img src="'+data.alerta[i].urlVeiculo+'" >'+
                                                '</div>'+
                                            '</div>';
                        }
                        if (data.alerta[i].marcaVeiculo) {
                            marcamodelo = '<div class="item-text '+panico+'">'+data.alerta[i].marcaVeiculo+' - '+data.alerta[i].modeloVeiculo+'</div>';
                        } else {
                            marcamodelo = "";
                        }

                        dataalerta += '<li class="'+panico+'">'+
                                                  '<a href="" class="item-link item-content">'+
                                                    '<div class="item-media">'+
                                                      '<img src="'+data.alerta[i].urlProfile+'" >'+
                                                    '</div>'+
                                                    alertaveiculo+
                                                    '<div class="item-inner padding-left-15">'+
                                                      '<div class="item-title-row no-arrow">'+
                                                        '<div class="item-title">'+data.alerta[i].nameMorador+'</div>'+
                                                        iconpanico+
                                                      '</div>'+
                                                      '<div class="item-subtitle">'+data.alerta[i].dataAlerta+'</div>'+
                                                      '<div class="item-text '+panico+'">'+data.alerta[i].numBlocoApto+'</div>'+
                                                      '<div class="item-title-row no-arrow">'+
                                                        '<div class="item-title item-title-veiculo">'+data.alerta[i].placaVeiculo+'</div>'+
                                                      '</div>'+
                                                      '<div class="item-text '+panico+'">'+tipo+'</div>'+
                                                      marcamodelo+
                                                    '</div>'+
                                                  '</a>'+
                                                '</li>';
                        $('#alertadechegadacont-cont').html(dataalerta);
                        iconpanico = "";
                        panico = "";
                        alertaveiculo = "";
                        localStorage.setItem("guidalertadechegadacont", data.alerta[i].guid);
                        initializeMap(data.alerta[i].idalerta);
                    }
                    //setTimeout(alertadechegadahome, 30000);
                }else{

                    $('#alertadechegadacont-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }
                myApp.hideIndicator();         
            },error: function(data) {

                $('#alertadechegadacont-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                myApp.hideIndicator();
            }
        });


        //initLocationProcedure();
        // Resultado para quando conseguir capturar a posição GPS...
            var map,
                currentPositionMarker,
                directionsService,
                mapCenter,
                origin,
                directionsDisplay;
                //mapCenter = new google.maps.LatLng(40.700683, -73.925972);

            /*navigator.geolocation.getCurrentPosition(mapCenterInt);
                function mapCenterInt(){
                    mapCenter = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
                }*/

            function initializeMap()
            {
                console.log("initializeMap ");
                //document.getElementById('map-canvas-cont').html = "";
                directionsService = new google.maps.DirectionsService;
                //directionsDisplay = new google.maps.DirectionsRenderer;
                map = "";
                map = new google.maps.Map(document.getElementById('map-canvas-cont'), {
                   //zoom: 17,
                   center: {lat: -8.1266026, lng: -34.9085331},
                   disableDefaultUI: true,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
                directionsDisplay = new google.maps.DirectionsRenderer({map: map});
                //directionsDisplay.setMap(map);
                //calculateAndDisplayRoute(directionsService, directionsDisplay);
                
                /*directionsDisplay.addListener('directions_changed', function() {
                    computeTotalDistance(directionsDisplay.getDirections());
                });*/
                atualizamap();
            }


            function formatTime(secs){
               var times = new Array(3600, 60, 1);
               var time = '';
               var tmp;
               for(var i = 0; i < times.length; i++){
                  tmp = Math.floor(secs / times[i]);
                  if(tmp < 1){
                     tmp = '00';
                  }
                  else if(tmp < 10){
                     tmp = '0' + tmp;
                  }
                  time += tmp;
                  if(i < 2){
                     time += ':';
                  }
                  secs = secs % times[i];
               }
               return time;
            }

            function computeTotalDistance(result) {
                var total = 0;
                var time = 0;
                var myroute = result.routes[0];
                for (var i = 0; i < myroute.legs.length; i++) {
                    total += myroute.legs[i].distance.value;
                    time += myroute.legs[i].duration.value;
                }
                total = total / 1000;
                var totalformat = total.toString().replace(".", ",");
                //time = time / 60;
                document.getElementById('totalalerta-cont').innerHTML = 'Distância = ' + totalformat + ' km | Tempo = ' + formatTime(time) + 'min';
            }

            function calculateAndDisplayRoute(directionsService, directionsDisplay, origin) {
            console.log(origin);
                //var onSuccess = function(position) {

                        directionsService.route({
                            origin: origin,
                            destination: localStorage.getItem("condominioStreet")+', '+localStorage.getItem("condominioNumber")+', '+localStorage.getItem("condominioDistrict")+', '+localStorage.getItem("condominioCityname")+', '+localStorage.getItem("condominioUf"),
                            travelMode: google.maps.TravelMode.DRIVING
                            }, function(response, status) {
                            if (status === google.maps.DirectionsStatus.OK) {
                              directionsDisplay.setDirections(response);
                            } else {
                              //window.alert('Directions request failed due to ' + status);
                            }
                        });
                //}

                //navigator.geolocation.getCurrentPosition(onSuccess);
            }

            function locError(error) {
                // the current position could not be located
                console.log("locError = The current position could not be found!");
            }

            function setCurrentPosition(pos) {
                console.log("setCurrentPosition ");

                var image = 'http://iconizer.net/files/Brightmix/orig/monotone_location_pin_marker.png';
                currentPositionMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    )

                    //map: map,
                });

            }

            function displayAndWatch(position) {
                console.log("displayAndWatch ");
                // set current position
                setCurrentPosition(position);
                // watch position
                watchCurrentPosition();
            }

            function watchCurrentPosition() {
                console.log("watchCurrentPosition ");
                positionTimer = navigator.geolocation.watchPosition(
                    function (position) {
                        setMarkerPosition(
                            currentPositionMarker,
                            position
                        );
                        //calculateAndDisplayRoute(directionsService, directionsDisplay);
                        //mapCenterInt();
                    });
            }

            function setMarkerPosition(marker, position) {
                console.log("setMarkerPosition ");
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
                //map.panTo(marker.getPosition());
            }

            function initLocationProcedure() {
                console.log("initLocationProcedure ");
                initializeMap();
                atualizamap();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
                } else {
                    //alert("Your browser does not support the Geolocation API");
                }
            }

            function atualizamap(){

                console.log("atualizamap");
                    $.ajax({
                        url: $server+"functionAppTracking.php?idalerta="+localStorage.getItem("idalertadechegadacont")+"&action=list",
                        dataType : "json",
                        success: function(data) {
                            if (data!=null) {
                                origin = data.tracking[0].latitude+','+data.tracking[0].longitude;

                                calculateAndDisplayRoute(directionsService, directionsDisplay,origin);
                                directionsDisplay.addListener('directions_changed', function() {
                                    computeTotalDistance(directionsDisplay.getDirections());
                                });
                                if (localStorage.getItem("idalertadechegadacont")) {
                                    atualizamaptime = setTimeout(atualizamap, 3000);
                                }
                            }     
                        },error: function(data) {
                        }
                    });
            }

}

myApp.onPageReinit('alertadechegadacont', function (page) {
    alertadechegadacont(localStorage.getItem("idalertadechegadacont"));
});

    $$('.buttonconcluiralerta').on('click', function(){
        myApp.confirm('Deseja realmente concluir o Aviso de Chegada?', function () {

                $.ajax({
                    url: $server+"functionAppAlerta.php?guid="+localStorage.getItem('guidalertadechegadacont')+"&action=deltracking",
                    data : "get",
                    success: function(data) {
                        console.log("del tracking");
                        localStorage.removeItem('tracking');
                        localStorage.removeItem('deltraking');
                        localStorage.removeItem('guidtracking');
                        localStorage.removeItem('guidalerta');
                        localStorage.removeItem('idalerta');
                        localStorage.removeItem('idveiculoalerta');
                        localStorage.removeItem('trackingactive');
                    },error: function(data) {
                        /*myApp.hideIndicator();
                        myApp.alert('Erro! Tente novamente.');*/
                    }
                });
            mainView.router.load({pageName: 'index'});
        });
    });

// Pull to refresh content
var ptrContent = $$('.banner');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {

        banner();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
});

///////////////////////////////////// search banner //////////////////////////////////////
    var mySearchbarCronograma = myApp.searchbar('.submenubanner', {

        searchList: '.list-block-search-banner',
        searchIn: '.item-title,.item-text',
        removeDiacritics: true,
        //customSearch: true,

        onEnable: function(s){
            //console.log('enable');
            //$('.inputsearchportariahome').attr("disabled", true);
        },

        onSearch: function(s){
            //console.log(s.value);
        },

        onDisable: function(s){
            console.log("clear");
            //$('#searchportariahome-cont').html("");
        }
    });

///////////////////////////////////// Listar Banner ///////////////////////////


function banner(){

    myApp.showIndicator();

    //$('#comunicado-cont').html("");

        // retirar botão inserir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.inserirbanner').addClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
            $('.inserirbanner').removeClass('invisivel');
        }

        $.ajax({
            url: $server+"functionAppBanner.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var databanner = "";
                    var qtd = data.banner.length;
                    for (var i = 0; i < qtd; i++) {

                        databanner += '<li class="img-banner" onclick="bannercont('+data.banner[i].idBanner+')" data-guid="'+data.banner[i].guid+'" data-index="'+i+'" id="img-banner">'+
                                            '<a href="#bannercont"  class="item-link"><img src="'+data.banner[i].urlBanner+'" ><div class="color-white bg-blue item-title">'+data.banner[i].tituloBanner+'</div></a>'+
                                        '</li>';                  
                    }
                    $('#banner-cont').html(databanner);
                }else{
                    myApp.hideIndicator();
                    $('#banner-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                }               
            },error: function(data) {
                myApp.hideIndicator();
                $('#banner-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}


function delbanner(guid) {
    myApp.confirm('Deseja deletar esse Banner?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppBanner.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.alert('Banner excluido com sucesso!', function () { mainView.router.load({pageName: 'banner'}); banner(); myApp.closeModal('.popup.modal-in');});
                //myApp.swipeoutDelete($$('li.img-banner').eq($$("li.img-banner[data-index="+$$(this).attr("data-index").val()+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-cronograma').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });
}

///////////////////////////////////// banner conteudo ///////////////////////////
function bannercont(id){
//console.log(id);
    myApp.showIndicator();

    $('.banner-full').html("");


        // retirar botão excluir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.del-banner').addClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
            //$('.del-banner').removeClass('invisivel');
        }

        $.ajax({
            url: $server+"functionAppBanner.php?idbanner="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var databanner = "";
                var qtd = data.banner.length;
                var imgBanner = "";
                var linkurl = "";
                for (var i = 0; i < qtd; i++) {
                    $(".del-banner").attr("onclick","delbanner('"+data.banner[i].guid+"')");
                    
                    if (data.banner[i].urlBanner!="images/sem_foto_icone.jpg") {
                        imgBanner = '<img src="'+data.banner[i].urlBanner+'">';
                    }
                    if (data.banner[i].url!="") {
                        linkurl = "onclick=openURLBrowser('"+data.banner[i].url+"');";
                    }
                    databanner = '<a href="#" '+linkurl+'>'+imgBanner+'</a>';
                    imgBanner = "";
                    
                    $('.banner-full').html(databanner);
                    myApp.popup(".popup-bannercont");
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });

        /*var lastTapTime="0";
        $$(document).on("click", ".banner-full", function(e){
            //try detect double tap
            var timeDiff = (new Date()).getTime() - lastTapTime;
            if(timeDiff < 300){ 
                //wow! double tap! 
                //myApp.addNotification({ hold: 800, title: '', message: 'dOUBLE TAP HERE!' });
            } 
                lastTapTime = (new Date()).getTime();
        });*/


}

///////////////////////////// camera banner ///////////////////////////
var typeImage="";
if (myApp.device.android=="Android") {
    typeImage = "Camera.DestinationType.FILE_URI";
}else{
    typeImage = "Camera.DestinationType.NATIVE_URI";
}

function cameraBanner() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccessBanner, onFailBanner, {
    quality: 80,
    targetWidth: 1500,
    targetHeight: 2500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true
    });
}

 
function cameraFileBanner(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccessBanner, onFailBanner, {
    quality: 80,
    targetWidth: 1500,
    targetHeight: 2500,
    correctOrientation: true,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onSuccessBanner(imageData) {
        var image = document.getElementById('preview-banner');
        image.src = "data:image/jpeg;base64," + imageData;
    /*var options = { quality: 100 };
    window.plugins.crop(function success (path) {
        var image = document.getElementById('preview-banner');
        image.src = "data:image/jpeg;base64," + path;
    }, function fail (error) {
        console.log("crop = "+error)

    }, imageData, options)*/
}
function onFailBanner(message) {
//alert('Failed because: ' + message);
}

///////////////////////////// camera banner ///////////////////////////

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('inserirbanner', function (page) {
    var actionOptionCameraBanner = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Selecione uma opção',
                label: true
            },
            // First button
            {
                text: 'Câmera',
                onClick: function () {
                    cameraBanner();
                }
            },
            // Second button
            {
                text: 'Galeria',
                onClick: function () {
                    cameraFileBanner();
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                color: 'red'
            }
        ]
    ];
    $$('.optionCameraBanner').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(actionOptionCameraBanner);
    });
    
});

///////////////////////////// acao inserir banner ///////////////////////////
$('#butinserirbanner').on('click', function(){
    //alert("enviar");
    //if ($$('#txttitbanner').val()!="") {
    if (($$('#txttitbanner').val()!="") &&  ($$('#preview-banner').attr('src')!="")) {

            enviarbanner();

    }else{
        myApp.alert('Preencha todos os campos.');    
    }

});

///////////////////////////// inserir banner ///////////////////////////
function enviarbanner()
{
 
 //alert("entrei");
        imagem = $('#preview-banner').attr("src");
        $$idcondominio = localStorage.getItem("condominioId");
        $$txtTitulo = $$('#txttitbanner').val();
        $$txtUrl= $$('#txturlbanner').val();
        $$txtlink= $$('#txtlinkbanner').val();
        //$$fileUpload = dataURL;
        //$$fileUpload = "fterte";
        //myApp.showPreloader();

        $('#forminserirbanner').each (function(){
          this.reset();
        });
        $("#preview-banner").attr('src',"");

        myApp.showIndicator();
        // Salvando imagem no servidor
        $.ajax($server+'functionAppBanner.php?', {
            type: "post",
            data: "imagem="+imagem+"&idcondominio="+$$idcondominio+"&txtTitulo="+$$txtTitulo+"&txtUrl="+$$txtUrl+"&txtlink="+$$txtlink+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if ((data!="ok") && (data!=" ok")) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            } else {
                myApp.hideIndicator();
                myApp.alert('Banner inserido com sucesso!', function () { mainView.router.load({pageName: 'banner'}); banner();});
            }
          });
}



///////////////////////////// agendamento espaço /////////////////////////////
var localSelected = "";
var localDescSelected = "";
function agendamentodeespaco() {
        //console.log("entrei");
        var mesSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-month");
        mesSelected = mesSelected+++1;
        var diaSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-day");
        
        if (diaSelected<10) {
            diaSelected = "0"+diaSelected;
        }
        var anoSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-year");
        var dataSelected = anoSelected+"-"+mesSelected+"-"+diaSelected;
        
        var dataSelectedBr = diaSelected+"/"+mesSelected+"/"+anoSelected;

        $("#dataagendamento").val(dataSelectedBr);


        $.ajax({
            url: $server+"functionAppTaxa.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    var datataxa = "";
                    var qtd = data.taxa.length;
                    var popoverTaxa = '<div class="popover">'+
                                      '<div class="popover-inner">'+
                                        '<div class="list-block">'+
                                          '<ul>';

                    localSelected = data.taxa[0].idTaxa;
                    localDescSelected = data.taxa[0].nomeTaxa;


                    for (var i = 0; i < qtd; i++) {

                        popoverTaxa += '<li><a href="#" onClick="espaco(\''+dataSelected+'\',\''+data.taxa[i].idTaxa+'\'), $(\'.selecionarespaco\').html(\''+data.taxa[i].nomeTaxa+'\'),localSelected='+data.taxa[i].idTaxa+',localDescSelected=\''+data.taxa[i].nomeTaxa+'\',myApp.closeModal();" class="item-link list-button">'+data.taxa[i].nomeTaxa+'</li>';

                    }
                        popoverTaxa +='</ul>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>';

                    localStorage.setItem("arrEspaco", popoverTaxa);
                    console.log("arrEspaco = "+popoverTaxa);
                    $('.selecionarespaco').html(localDescSelected);
                    
                    espaco(dataSelected,localSelected);

                }              
            },error: function(data) {
                //myApp.hideIndicator();
                //$('#banner-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    $$('.actionOptionAgendamento').on('click', function (e) {
        var clickedLinkTaxa = $(".selecionarespaco");
        /*var groups = [actionOptionAgendamentoGrup1, actionOptionAgendamentoGrup2, actionOptionAgendamentoGrup3];
        myApp.actions(groups);*/
        myApp.popover(localStorage.getItem("arrEspaco"), clickedLinkTaxa);
    });
    
}


function espaco(dia,idlocalespaco){
console.log("dia = "+dia+" local = "+idlocalespaco);
    myApp.showIndicator();


        $.ajax({
            url: $server+"functionAppTaxa.php?idcondominio="+localStorage.getItem("condominioId")+"&action=list",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    var datataxa = "";
                    var qtd = data.taxa.length;
                    var popoverTaxa = '<div class="popover">'+
                                      '<div class="popover-inner">'+
                                        '<div class="list-block">'+
                                          '<ul>';

                    for (var i = 0; i < qtd; i++) {

                        popoverTaxa += '<li><a href="#" onClick="espaco(\''+dia+'\',\''+data.taxa[i].idTaxa+'\'), $(\'.selecionarespaco\').html(\''+data.taxa[i].nomeTaxa+'\'),localSelected='+data.taxa[i].idTaxa+',localDescSelected=\''+data.taxa[i].nomeTaxa+'\',myApp.closeModal();" class="item-link list-button">'+data.taxa[i].nomeTaxa+'</li>';

                    }
                        popoverTaxa +='</ul>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>';

                    localStorage.setItem("arrEspaco", popoverTaxa);
                    console.log("arrEspaco = "+popoverTaxa);
                    //$('.selecionarespaco').html(localDescSelected);

                }              
            },error: function(data) {
                //myApp.hideIndicator();
                //$('#banner-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
    $$('.actionOptionAgendamento').on('click', function (e) {
        var clickedLinkTaxa = $(".selecionarespaco");
        /*var groups = [actionOptionAgendamentoGrup1, actionOptionAgendamentoGrup2, actionOptionAgendamentoGrup3];
        myApp.actions(groups);*/
        myApp.popover(localStorage.getItem("arrEspaco"), clickedLinkTaxa);
    });


    $('#espaco-cont').html("");
    $$('#calendar-inline-container div span').removeClass("marcado");
        $.ajax({
            url: $server+"functionAppEspaco.php?idcondominio="+localStorage.getItem("condominioId")+"&idlocalespaco="+idlocalespaco+"&action=list",
            dataType : "json",
            success: function(data) {
                myApp.hideIndicator();
                if (data) {
                    var dataespaco = "";
                    var qtd = data.espaco.length;
                    for (var i = 0; i < qtd; i++) {

                        var splithoraini = data.espaco[i].horaIni;
                        splithoraini = splithoraini.split(" ");

                        var splithorater = data.espaco[i].horaTer;
                        splithorater = splithorater.split(" ");

                        var horater = splithorater[1];
                        var horaini = splithoraini[1];
                        var dataini = splithoraini[0];

                        //console.log(horaini+" - "+dataini);

                        dataini = dataini.split("-");
                        dataini[1] = dataini[1]-1;
                        if (dataini[2]<10) {
                            dataini[2] = dataini[2].substring(1); 
                        }

                        dataini = dataini[0]+"-"+dataini[1]+"-"+dataini[2];

                        horaini = horaini.substring(0,5);
                        horater = horater.substring(0,5);


                        $$('#calendar-inline-container div[data-date="'+dataini+'"] span').addClass("marcado");
                        
                    }
                }
            
            },error: function(data) {
                myApp.hideIndicator();
                //myApp.alert('Erro! Tente novamente.');
            }
        });

        // retirar botão inserir
        if (localStorage.getItem("moradorIdmorador")) {
            $('.inseriragendamentodeespaco').removeClass('invisivel');
        }
        if (localStorage.getItem("administradoraIdadministradora") || localStorage.getItem("sindicoIdsindico")) {
            $('.inseriragendamentodeespaco').addClass('invisivel');
        }
        if (localStorage.getItem("moradorIdmorador") && localStorage.getItem("sindicoIdsindico")) {
            $('.inseriragendamentodeespaco').removeClass('invisivel');
        }

        //se sindico for morador do condominio selecionado
        /*if (localStorage.getItem("sindicoIdsindico")) {
            if (localStorage.getItem("moradorIdCondominio")!=localStorage.getItem("condominioId")) {
                $('.inseriragendamentodeespaco').addClass('invisivel');
            }
        }*/
        if (localStorage.getItem("sindicoCondominioId") || localStorage.getItem("administradoraCondominioId")) {
            $('.inseriragendamentodeespaco').removeClass('invisivel');
        }



        $.ajax({
            url: $server+"functionAppEspaco.php?idcondominio="+localStorage.getItem("condominioId")+"&dia="+dia+"&idlocalespaco="+idlocalespaco+"&action=list",
            dataType : "json",
            success: function(data) {

            myApp.hideIndicator();
                var dataespaco = "";
                var delespaco = "";
                var confespaco = "";
                var invisivel = "";
                var swipeout = "";

                var qtd = data.espaco.length;
                for (var i = 0; i < qtd; i++) {

                    if (data.espaco[i].vazio=="vazio") {
                        $('#espaco-cont').html('<li><div class="item-content">Nenhuma reserva para data selecionada</div></li>');
                    } else{

                        var splithoraini = data.espaco[i].horaIni;
                        splithoraini = splithoraini.split(" ");

                        var splithorater = data.espaco[i].horaTer;
                        splithorater = splithorater.split(" ");

                        var horater = splithorater[1];
                        var horaini = splithoraini[1];
                        var dataini = splithoraini[0];

                        //console.log(horaini+" - "+dataini);

                        dataini = dataini.split("-");
                        dataini[1] = dataini[1]-1;
                        if (dataini[2]<10) {
                            dataini[2] = dataini[2].substring(1); 
                        }

                        dataini = dataini[0]+"-"+dataini[1]+"-"+dataini[2];

                        horaini = horaini.substring(0,5);
                        horater = horater.substring(0,5);

                        if (data.espaco[i].active=="1") {
                            cor="#4caf50";
                            invisivel="invisivel ";
                        } else {
                            cor="#ffc107";
                            invisivel="invisivel ";
                            if (localStorage.getItem("sindicoIdsindico") || localStorage.getItem("administradoraIdadministradora") || (data.espaco[i].idMorador==localStorage.getItem("moradorIdmorador"))) {
                                swipeout = "swipeout ";
                                invisivel="";
                            }
                            
                        }

                        if (localStorage.getItem("sindicoIdsindico") || localStorage.getItem("administradoraIdadministradora") || (data.espaco[i].idMorador==localStorage.getItem("moradorIdmorador"))) {
                            //confespaco = "<a href='#' onclick = confespaco('"+data.espaco[i].guid+"',"+i+") class='action1 bg-green'>Confirmar</a>";
                            delespaco = "onclick = delespaco('"+data.espaco[i].guid+"',"+i+");";
                        }
                        if (localStorage.getItem("sindicoIdsindico") || localStorage.getItem("administradoraIdadministradora")) {
                            confespaco = "<a href='#' onclick = confespaco('"+data.espaco[i].guid+"',"+i+") class='action1 bg-green'>Confirmar</a>";
                            //delespaco = "onclick = delespaco('"+data.espaco[i].guid+"',"+i+");";
                        }
                        
                        dataespaco += '<li class="'+swipeout+'swipeout-espaco" date-date="'+horaini+'" data-index="'+i+'">'+
                                            '<a href="#espacocont" onclick="espacocont('+data.espaco[i].idEspaco+')" class="swipeout-content item-content item-link">'+
                                                '<div class="item-media" style="border:solid 4px '+cor+'">'+
                                                  '<img src="'+data.espaco[i].urlMorador+'" >'+
                                                '</div>'+
                                                '<div class="item-inner">'+
                                                    '<div class="item-title-row">'+
                                                        '<div class="item-title">'+horaini+" às "+horater+'</div>'+
                                                    '</div>'+
                                                        '<div class="item-subtitle">'+data.espaco[i].nameMorador+'</div>'+
                                                        '<div class="item-text">'+data.espaco[i].nameCondominio+' - '+data.espaco[i].numMorador+'</div>'+
                                                '</div>'+
                                            '</a>'+
                                              '<div class="'+invisivel+'swipeout-actions-right">'+
                                                confespaco+
                                                '<a href="#" '+delespaco+' class="action2 bg-red">Delete</a>'+
                                              '</div>'+
                                        '</li>';
                        $('#espaco-cont').html(dataespaco);
                    }
                    swipeout="";
                    invisivel="";
                }
                reorderEspaco();
            
            },error: function(data) {
                myApp.hideIndicator();
                //myApp.alert('Erro! Tente novamente.');
            }
        });
        //console.log(dia+","+idlocalespaco);
}
////////////////////////////// reordenar listagem de agendamento //////////////////////////////
function reorderEspaco(){
    
    var mylistEspaco = $('#espaco-cont');
    var listitemsEspaco = mylistEspaco.children('li').get();
    listitemsEspaco.sort(function(a, b) {
        //console.log("reorderAlert");
        //var date1 = new Date(convertToDateOrder());
        var dateMsec1 = $(a).attr('date-date');

        //var date2 = new Date(convertToDateOrder());
        var dateMsec2 = $(b).attr('date-date');
        //console.log("date1= "+date1+" date2= "+date2);

        var compA = dateMsec1;
        var compB = dateMsec2;
        //console.log("compA= "+compA+" compB= "+compB);
        return (compB > compA) ? -1 : (compB < compA) ? 1 : 0;
    })
    $.each(listitemsEspaco, function(idx, itm) {
        console.log(itm);
        mylistEspaco.append(itm);
    });
}

///////////////////////////// confirmar espaco ///////////////////////////
function confespaco(guid,eq){

    myApp.confirm('Deseja confirmar esse agendamento?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppEspaco.php?guid="+guid+"&action=ativar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.alert('Agendamento confirmado com sucesso!', function () { mainView.router.load({pageName: 'agendamentodeespaco'});agendamentodeespaco();});
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////// deletar espaco ///////////////////////////
function delespaco(guid,eq){

    myApp.confirm('Deseja deletar esse item?', function () {

        myApp.showIndicator();

        $.ajax({
            url: $server+"functionAppEspaco.php?guid="+guid+"&action=deletar",
            data : "get",
            success: function(data) {
            if (data!="ok") {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente ='+data);
            } else {
                myApp.hideIndicator();
                myApp.swipeoutDelete($$('li.swipeout-espaco').eq($("li.swipeout-espaco[data-index="+eq+"]").index()));
                //myApp.swipeoutDelete($$('li.swipeout-espaco').eq(eq));
            }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    });

}

///////////////////////////////////// espaco conteudo ///////////////////////////
function espacocont(id,push){

    myApp.showIndicator();

    $('#espacocont-cont').html("");

        $.ajax({
            url: $server+"functionAppEspaco.php?idespaco="+id+"&action=list",
            dataType : "json",
            success: function(data) {
            myApp.hideIndicator();
                var dataespaco = "";
                var qtd = data.espaco.length;

                for (var i = 0; i < qtd; i++) {

                    //atualizar condominio logado
                    if (push==true && localStorage.getItem("sindicoIdsindico")) {
                        updateCond(data.espaco[i].idCondominio,true);
                    }
                    if (push==true && localStorage.getItem("administradoraIdadministradora")) {
                        updateCondAdministradora(data.espaco[i].idCondominio,true);
                    }

                    var splithoraini = data.espaco[i].horaIni;
                    splithoraini = splithoraini.split(" ");

                    var splithorater = data.espaco[i].horaTer;
                    splithorater = splithorater.split(" ");

                    var horater = splithorater[1];
                    var horaini = splithoraini[1];
                    var dataini = splithoraini[0];

                    //console.log(horaini+" - "+dataini);

                    dataini = dataini.split("-");
                    dataini[1] = dataini[1];
                    if (dataini[2]<10) {
                        dataini[2] = dataini[2].substring(1); 
                    }

                    // hack subtrai 1 do mês (que vem da console), futuramente zerar hack aqui e na console
                    var meshack = dataini[1]-1;
                    dataini = dataini[0]+"-"+meshack+"-"+dataini[2];

                    horaini = horaini.substring(0,5);
                    horater = horater.substring(0,5);

                    var descricaoEspaco = "";
                    if (data.espaco[i].descricao) {
                        descricaoEspaco = data.espaco[i].descricao;
                    }
                        if (data.espaco[i].active=="1") {
                            cor="#4caf50";
                        } else{
                            cor="#ffc107";
                        }
                    dataespaco += '<li>'+
                                            '<div class="card-cont ks-facebook-card">'+
                                                '<div class="card-header">'+
                                                    '<div class="ks-facebook-avatar" style="border:solid 4px '+cor+'"><img src="'+data.espaco[i].urlMorador+'" width="34"></div>'+
                                                    
                                                    '<div class="ks-facebook-name">'+convertDateBrasil(dataini)+'</div>'+
                                                    '<div class="ks-facebook-date">'+data.espaco[i].nameMorador+'</div>'+
                                                '</div>'+
                                                '<div class="card-content-inner">'+
                                                    '<p class="facebook-title">'+data.espaco[i].nameCondominio+' - '+data.espaco[i].numMorador+
                                                    '<br>'+data.espaco[i].nomeLocal+
                                                    '<br>'+horaini+" às "+horater+
                                                    '<br>'+
                                                    '<br>'+descricaoEspaco+
                                                    '</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>';

                    $('#espacocont-cont').html(dataespaco);

                }
            
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro! Tente novamente.');
            }
        });
    //alert("Entrei");
}

$('.inseriragendamentodeespaco').on('click', function(){
    console.log("inseriragendamentodeespaco");
    if (localStorage.getItem("portariaIdportaria") || localStorage.getItem("sindicoCondominioId") || localStorage.getItem("administradoraCondominioId")) {
        $('.blocolistagendamentoli').show();
        $('.domiciliolistagendamentoli').hide();
        $('.moradorlistagendamentoli').hide();
        listBlocoAgendamento();
        console.log("listBlocoAgendamento");
        //$('.domiciliolistcomunicadoli').show();
        //$('.moradorlistcomunicadoli').show();
    }else{
        valorestaxasagendamento();
        $('.blocolistagendamentoli').hide();
        $('.domiciliolistagendamentoli').hide();
        $('.moradorlistagendamentoli').hide();
    }
    
});
    ////////////////// listar blocos form agendamento /////////////////
    function listBlocoAgendamento(){
        $('.domiciliolistagendamentoli').hide();
        $('.moradorlistagendamentoli').hide();

        valorestaxasagendamento();
        myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppMorador.php?idcondominio="+localStorage.getItem("condominioId")+"&action=listBlocos",
            dataType : "json",
            success: function(data) {
                if (data!=null) {
                    myApp.hideIndicator();
                    var semBloco = "";
                    var idBloco ="";
                    var qtd = data.blocos.length;
                    var blocolistcomunicado = "";
                    var selected = "";
                    var adminSind = "";

                        adminSind = '<option value="" selected="selected">Selecione um Bloco</option>';

                        blocolistcomunicado += adminSind;
                        
                    for (var i = 0; i < qtd; i++) {

                        semBloco = data.blocos[i].numBloco;
                        idBloco = data.blocos[i].idBloco;

                        blocolistcomunicado += '<option '+selected+' value="'+data.blocos[i].idBloco+'">'+data.blocos[i].numBloco+'</option>';
                        selected = "";
                    }

                    if (semBloco=="Sem Bloco") {
                        blocolistcomunicado = "";
                        listDomicilioAgendamento();
                        $('.blocolistagendamentoli').hide();
                    }
                }
                if (blocolistcomunicado!="") {
                    $('.blocolistagendamentoli').show();
                }
                $('.blocolistagendamento').html(blocolistcomunicado);
                myApp.hideIndicator(); 
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!', function () { mainView.router.load({pageName: 'comuncondominio'}); comuncondominio();});
            }
        });
    }

////////////////// listar domicílios form agendamento /////////////////
    function listDomicilioAgendamento(){
        var idBloco = $$("#blocolistagendamento").val();
        console.log("listDomicilioAgendamento");

        myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppMorador.php?idbloco="+idBloco+"&idcondominio="+localStorage.getItem("condominioId")+"&action=listDomicilios",
            dataType : "json",
            success: function(data) {
                console.log("entrei-success");
                $('.domiciliolistagendamento').html("");
                if (data!=null) {
                    myApp.hideIndicator();
                    var qtd = data.domicilios.length;
                    var domiciliolistcomunicado = "";
                    var adminSind = "";
                    var idDomicilio = "";

                    adminSind = '<option value="">Selecione um Apto</option>';

                    var selected = "";
                    domiciliolistcomunicado += adminSind;

                    for (var i = 0; i < qtd; i++) {

                        idDomicilio = data.domicilios[i].idDomicilio

                        domiciliolistcomunicado += '<option '+selected+' value="'+data.domicilios[i].idDomicilio+'">'+data.domicilios[i].numDomicilio+'</option>';
                    }
                //listMoradores(null,alvo);

                }
                $('.domiciliolistagendamentoli').show();
                $('.domiciliolistagendamento').html(domiciliolistcomunicado);
                myApp.hideIndicator();
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!');
                $('.domiciliolistagendamento').html("");

            }
        });
        idBloco = null;
    }                          


////////////////// listar moradores form agendamento /////////////////
    function listMoradoresAgendamento(){
        $('.moradorlistagendamentoli').show();
        var idDomicilio = $$("#domiciliolistagendamento").val();

        myApp.showIndicator();
        $.ajax({
            url: $server+"functionAppMorador.php?iddomicilio="+idDomicilio+"&idcondominio="+localStorage.getItem("condominioId")+"&action=listMoradores",
            dataType : "json",
            success: function(data) {
                console.log("entrei-success");
                $('.moradorlistagendamento').html("");
                if (data!=null) {
                    myApp.hideIndicator();
                    var qtd = data.moradores.length;
                    var moradorlistcomunicado = "";
                    var adminSind = "";

                    moradorlistcomunicado += adminSind;

                    for (var i = 0; i < qtd; i++) {

                                    moradorlistcomunicado += '<option value="'+data.moradores[i].idMorador+'">'+data.moradores[i].name+'</option>';
                    
                    }
                                moradorlistcomunicado += '</select>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>';
                }
                $('.moradorlistagendamentoli').show();
                $('.moradorlistagendamento').html(moradorlistcomunicado);
                myApp.hideIndicator();
            },error: function(data) {
                myApp.hideIndicator();
                myApp.alert('Erro ao carregar dados, tente novamente!');
                $('.domiciliolistagendamento').html("");
                $('.moradorlistagendamento').html("");

            }
        });
        idDomicilio = null;
    }  

///////////////// inserir agendamento de espaço - taxas ///////////////////
function valorestaxasagendamento(){

        $.ajax({
            url: $server+"functionAppTaxa.php?idtaxa="+localSelected+"&action=list",
            dataType : "json",
            success: function(data) {

                if (data!=null) {
                    if (data.taxa[0].valorTaxa=="" || data.taxa[0].valorTaxa=="0.00" || data.taxa[0].valorTaxa==null) {
                        $('#valorTaxa').html("Espaço gratuito");
                    }else{
                        $('#valorTaxa').html(data.taxa[0].valorTaxa);
                    }
                    if (data.taxa[0].descricaoTaxa!=null) {
                        var descricaoTaxa = data.taxa[0].descricaoTaxa.replace(/\n/g,"<br>");
                        $('#descricaoTaxa').html(descricaoTaxa);
                    }else{
                        $('.descricaoTaxa').hide();
                    }
                }              
            },error: function(data) {
                //myApp.hideIndicator();
                //$('#banner-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
                //myApp.alert('Erro! Tente novamente.');
            }
        });
}


///////////////////////////// acao inserir espaco ///////////////////////////
$$('#butinseriragendamento').on('click', function(){

    $$okportsind = true;
    if (localStorage.getItem("portariaIdportaria") || localStorage.getItem("sindicoCondominioId") || localStorage.getItem("administradoraCondominioId")) {
        if ($$("#domiciliolistagendamento").val()!="" && $$("#moradorlistagendamento").val()!=""){
            $$okportsind = true;
        }else{
            myApp.alert('Selecione um Bloco, Apto e Morador.'); 
            $$okportsind = false;
        }
    }
    if (($$('#horainicoagendamento').val()!="00:00") &&  ($$('#horaterminoagendamento').val()!="00:00")) {
        if ($$('#horaterminoagendamento').val()<$$('#horainicoagendamento').val()) {
            myApp.alert('Hora término deve ser maior que hora início.');
            $$ok = false;
        } else if ($$('#horaterminoagendamento').val()==$$('#horainicoagendamento').val()) {
            myApp.alert('Hora início e término devem ser diferentes.'); 
            $$ok = false;
        }else{
            $$ok = true;
        }
    }else{
        myApp.alert('Selecione a Hora de início e término.'); 
        $$ok = false;
    }

    if ($$ok==true && $$okportsind==true) {
        enviarespaco();
    }

});

///////////////////////////// inserir espaco ///////////////////////////
function enviarespaco()
{
        $$idcondominio = localStorage.getItem("condominioId");
    
        if (localStorage.getItem("portariaIdportaria") || localStorage.getItem("sindicoCondominioId") || localStorage.getItem("administradoraCondominioId")) {
            $$iddomicilio = $$("#domiciliolistagendamento").val();
            $$idmorador = $$("#moradorlistagendamento").val();
        }else{
            $$iddomicilio = localStorage.getItem("moradorIddomicilio");
            $$idmorador = localStorage.getItem("moradorIdmorador");
        }
        $$idlocalespaco = localSelected;
        $$horaini = dataSelected+" "+$$('#horainicoagendamento').val()+":00";
        $$horater = dataSelected+" "+$$('#horaterminoagendamento').val()+":00";
        $$txtDescricao = $$('#txtdescricaoagendamento').val();

        myApp.showIndicator();

        $.ajax($server+'functionAppEspaco.php?', {
            type: "post",
            data: "iddomicilio="+$$iddomicilio+"&idmorador="+$$idmorador+"&idcondominio="+$$idcondominio+"&idlocalespaco="+$$idlocalespaco+"&horaini="+$$horaini+"&horater="+$$horater+"&txtDescricao="+$$txtDescricao+"&action=add",
        })
          .fail(function() {
            myApp.hideIndicator();
            myApp.alert('Erro! Tente novamente.');
          })     
          .done(function(data) {
            if ((data=="ok") || (data==" ok")) {
                myApp.hideIndicator();
                myApp.alert('Agendamento inserido com sucesso!', function () { mainView.router.load({pageName: 'agendamentodeespaco'});agendamentodeespaco();});

                $('#forminseriragendamentodeespaco').each (function(){
                  this.reset();
                });

            } else {
                myApp.hideIndicator();

                $('#forminseriragendamentodeespaco').each (function(){
                  this.reset();
                });

                myApp.alert(data, function () { mainView.router.load({pageName: 'agendamentodeespaco'});agendamentodeespaco();});           
            }
          });
}


    var today = new Date();
    var minDate = new Date().setDate(today.getDate() - 1);
    var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
    var dayNamesShort = ['Dom', 'Seg', 'Ter', 'Quar', 'Quin', 'Sex', 'Sáb']

    var calendarInline = myApp.calendar({
        container: '#calendar-inline-container',
        input: '#calendar-agendamentodeespaco',
        value: [new Date()],
        dayNamesShort: dayNamesShort,
        dateFormat: 'dd-mm-yyyy',
        minDate: minDate,
        toolbarTemplate: 
            '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
            
        },
        onChange: function (picker, values, displayValues) {
            mesSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-month");
            mesSelected = mesSelected+++1;
            diaSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-day");
            
            if (diaSelected<10) {
                diaSelected = "0"+diaSelected;
            }
            anoSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-year");
            dataSelected = anoSelected+"-"+mesSelected+"-"+diaSelected;
            
            var dataSelectedBr = diaSelected+"/"+mesSelected+"/"+anoSelected;

            //$('.selecionarespaco').html(localDescSelected);
            $("#dataagendamento").val(dataSelectedBr);

            //espaco(dataSelected,localSelected);

        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +' - ' + p.currentYear);
            
            mesSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-month");
            mesSelected = mesSelected+++1;
            diaSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-day");
            
            if (diaSelected<10) {
                diaSelected = "0"+diaSelected;
            }
            //diaSelected ="01";
            anoSelected = $('#calendar-inline-container .picker-calendar-day-selected').attr("data-year");
            dataSelected = anoSelected+"-"+mesSelected+"-"+diaSelected;
            
            var dataSelectedBr = diaSelected+"/"+mesSelected+"/"+anoSelected;

            //$('.selecionarespaco').html(localDescSelected);
            $("#dataagendamento").val(dataSelectedBr);
            espaco(dataSelected,localSelected);
        }
    });


/*
 Limpa os arquivos selecionados
 */
function limpar()
{
    var input = $("#imagem");
    input.replaceWith(input.val('').clone(true));
}

/////////////////////////// google analytics ///////////////////////////

            function TrackButtonClicked() {
                window.ga.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);
            }

            function PageButtonClicked(page) {
                window.ga.trackView(page);
            }

            function goingAway() {
                window.ga.setOptOut(true);
            }

            function nativePluginResultHandler (result) {
                //alert('nativePluginResultHandler - '+result);
                console.log('nativePluginResultHandler: '+result);
            }
        
            function nativePluginErrorHandler (error) {
                //alert('nativePluginErrorHandler - '+error);
                console.log('nativePluginErrorHandler: '+error);
            }

/////////////////////////// push ///////////////////////////

        document.addEventListener('app.Ready', onDeviceReady, true);
        function onDeviceReady() {

            //window.ga.startTrackerWithId("UA-77306865-2", 10);


            function TrackButtonClicked() {
                window.ga.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);
            }

            function PageButtonClicked(page) {
                window.ga.trackView(page);
            }

            function goingAway() {
                window.ga.setOptOut(true);
            }

            function nativePluginResultHandler (result) {
                //alert('nativePluginResultHandler - '+result);
                console.log('nativePluginResultHandler: '+result);
            }
        
            function nativePluginErrorHandler (error) {
                //alert('nativePluginErrorHandler - '+error);
                console.log('nativePluginErrorHandler: '+error);
            }

            cordova.getAppVersion.getVersionNumber(function (version) {
                $$(".version").html("Versão: "+version);
            });

            var push = PushNotification.init({
                android: {
                    senderID: "752219688397",
                    icon: 'icon-notification'
                },
                ios: {
                    senderID: "752219688397",
                    gcmSandbox: "false", // false para producao true para desenvolvimento
                    alert: "true",
                    sound: "true",
                    badge: "false"
                },
                windows: {}
            });
            push.on('registration', function(data) {
                console.log('APARELHO REGISTRADO:' + data.registrationId);
                localStorage.setItem("token", data.registrationId);
                // data.registrationId
                //$('#push').html(data.registrationId);
            });
            
            push.on('notification', function(data) {

                //$('#push').html(data);
                if (data.additionalData.foreground) {

                    switch( data.additionalData.info ){

                        case 'comunportaria':
                            comunportariahome();
                        break;

                        case 'alertadechegada':
                            alertadechegadahome();
                        break;

                        case 'alertaportaria':
                            visitantealerthome();
                        break;

                        case 'searchhomeportaria':
                            searchhomeportaria();
                        break;
                    }

                    
                    if (data.title==data.additionalData.summaryText) {
                        data.additionalData.summaryText="";
                    }


                    // seleciona som da notificação
                    var sound;
                    if(device.platform.toLowerCase() === "android"){
                        //sound = "/android_asset/www/sounds/notification-android.mp3";
                        sound = "http://www.aptohome.com.br/sounds/notification-android.mp3";
                        console.log("sound android: " + sound);
                    }else{
                        /*var path = window.location.pathname;
                        var sizefilename = path.length - (path.lastIndexOf("/")+1);
                        path = path.substr( path, path.length - sizefilename );*/
                        sound = "http://www.aptohome.com.br/sounds/notification-ios.mp3";
                        console.log("sound ios: " + sound);
                    }
                    var media = new Media(sound, mediaSuccess, mediaError);

                    function mediaSuccess() {
                        console.log('Media Success');
                    }
                    function mediaError(e) {
                        console.log('Media Error');
                        console.log(JSON.stringify(e));
                    }
                    // play som notificação
                    media.play();

                    myApp.addNotification({
                        title: data.title,
                        subtitle: data.additionalData.summaryText,
                        message: data.message,
                        closeIcon: false,
                        media: '<img src='+data.additionalData.picture+'>',
                        onClick: function () { 
                            switch( data.additionalData.info ){
                                case 'comuncomunicado':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comuncomunicadocont(data.additionalData.id,true);
                                break;

                                case 'comunmorador':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comunmoradorcont(data.additionalData.id);
                                break;

                                case 'comunportaria':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comunportariacont(data.additionalData.id);
                                break;

                                case 'transparenciadecontas':
                                mainView.router.load({pageName: 'transparenciadecontascont'});
                                transparenciadecontascont(data.additionalData.id);
                                break;

                                case 'livroocorrencias':
                                mainView.router.load({pageName: 'livroocorrenciascont'});
                                livroocorrenciascont(data.additionalData.id,true);
                                break;

                                case 'agendamentodeespaco':
                                mainView.router.load({pageName: 'espacocont'});
                                espacocont(data.additionalData.id,true);
                                break;

                                case 'alertadechegada':
                                if (data.additionalData.id) {
                                    mainView.router.load({pageName: 'alertadechegadacont'});
                                    alertadechegadacont(data.additionalData.id,true);
                                }
                                break;

                                case 'alertaportaria':
                                mainView.router.load({pageName: 'alertaportariahomecont'});
                                alertaportariacont(data.additionalData.id,true);
                                break;

                                case 'enquete':
                                mainView.router.load({pageName: 'enquetescont'});
                                enquetescont(data.additionalData.id,true);
                                break;
                            }
                        }
                    });

                    console.log('CAPTURADO PUSH COM APP ABERTO!');
                } else if (data.additionalData.coldstart){
                            switch( data.additionalData.info ){
                                case 'comuncomunicado':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comuncomunicadocont(data.additionalData.id);
                                break;

                                case 'comunmorador':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comunmoradorcont(data.additionalData.id);
                                break;

                                case 'comunportaria':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comunportariacont(data.additionalData.id);
                                break;

                                case 'transparenciadecontas':
                                mainView.router.load({pageName: 'transparenciadecontascont'});
                                transparenciadecontascont(data.additionalData.id);
                                break;

                                case 'livroocorrencias':
                                mainView.router.load({pageName: 'livroocorrenciascont'});
                                livroocorrenciascont(data.additionalData.id,true);
                                break;

                                case 'agendamentodeespaco':
                                mainView.router.load({pageName: 'espacocont'});
                                espacocont(data.additionalData.id,true);
                                break;

                                case 'alertadechegada':
                                mainView.router.load({pageName: 'alertadechegadacont'});
                                alertadechegadacont(data.additionalData.id,true);
                                break;

                                case 'alertaportaria':
                                mainView.router.load({pageName: 'alertaportariahomecont'});
                                alertaportariacont(data.additionalData.id,true);
                                break;

                                case 'enquete':
                                mainView.router.load({pageName: 'enquetescont'});
                                enquetescont(data.additionalData.id,true);
                                break;
                            }

                        console.log('CAPTURADO PUSH COM APP EM COLDSTART!');
                } else{
                            switch( data.additionalData.info ){
                                case 'comuncomunicado':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comuncomunicadocont(data.additionalData.id);
                                break;

                                case 'comunmorador':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comunmoradorcont(data.additionalData.id);
                                break;

                                case 'comunportaria':
                                mainView.router.load({pageName: 'comunicadocont'});
                                comunportariacont(data.additionalData.id);
                                break;

                                case 'transparenciadecontas':
                                mainView.router.load({pageName: 'transparenciadecontascont'});
                                transparenciadecontascont(data.additionalData.id);
                                break;

                                case 'livroocorrencias':
                                mainView.router.load({pageName: 'livroocorrenciascont'});
                                livroocorrenciascont(data.additionalData.id,true);
                                break;

                                case 'agendamentodeespaco':
                                mainView.router.load({pageName: 'espacocont'});
                                espacocont(data.additionalData.id,true);
                                break;

                                case 'alertadechegada':
                                mainView.router.load({pageName: 'alertadechegadacont'});
                                alertadechegadacont(data.additionalData.id,true);
                                break;

                                case 'alertaportaria':
                                mainView.router.load({pageName: 'alertaportariahomecont'});
                                alertaportariacont(data.additionalData.id,true);
                                break;

                                case 'enquete':
                                mainView.router.load({pageName: 'enquetescont'});
                                enquetescont(data.additionalData.id,true);
                                break;
                                
                            }
                        console.log('CAPTURADO PUSH COM APP EM BACKGROUND!');  
                }
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData

                push.setApplicationIconBadgeNumber(function() {
                    console.log('success badge');
                }, function() {
                    console.log('error badge');
                }, 0);
                /*
                push.getApplicationIconBadgeNumber(function(n) {
                    console.log('success badge', n);
                }, function() {
                    console.log('error badge');
                });*/

                console.log(data);
                console.log('TITULO: ' + data.title);
                console.log('SUBTITULO: ' + data.additionalData.summaryText);
                console.log('MEDIA: ' + data.additionalData.picture);
                console.log('SOUND: ' + data.soundname);
                console.log('MENSAGEM: ' + data.message);
                console.log('BADGE: ' + data.count);
                console.log('ID: ' + data.id);
                console.log('INFO: ' + data.additionalData.info);
            });

            push.on('error', function(e) {
                console.log(e.message);
                //$('#push').html(e.message);
            });
        }


//////////// alerta de chegada com tracking ///////////////////
 
var tracking;
var panico;
var trackingactive;
var deltraking;
var guidtracking;
var aux = 0;
var bgGeo = window.backgroundGeolocation;
var positionTimer;
var auxAlertaCancelado = 0;
//myApp.onPageInit('alertadechegada', function (page) {
function alertadechegada() {

$('.buttonshare').hide();
////// lista de veiculos ////////
    $.ajax({
        url: $server+"functionAppVeiculo.php?idcondominio="+localStorage.getItem("condominioId")+"&iddomicilio="+localStorage.getItem("moradorIddomicilio")+"&idbloco="+localStorage.getItem("moradorIdbloco")+"&action=listall",
        dataType : "json",
        success: function(data) {

            if (data!=null) {
                var qtd = data.veiculo.length;
                var dataveiculoalerta="";

                dataveiculoalerta += '<select id="idveiculoalerta">'+
                                    '<option value="" selected="selected">Não estou em meu veículo</option>';
                
                for (var i = 0; i < qtd; i++) {
                    dataveiculoalerta += '<option value="'+data.veiculo[i].idveiculo+'" >'+data.veiculo[i].marca+' - '+data.veiculo[i].modelo+' | '+data.veiculo[i].placa+'</option>';

                }

                dataveiculoalerta += '</select>';

                localStorage.setItem("listveiculoalerta", dataveiculoalerta);
            }else{
                //$('#veiculo-cont').html("<li class='semregistro'>Nenhum registro cadastrado</li>");
            }
        },error: function(data) {

        }
    });



    if (localStorage.getItem("tracking")) {

        $('.buttonalertadechegada').html("CANCELAR AVISO");
    } 

    if (localStorage.getItem('panico')) {

        $('.buttonpanico').html("CANCELAR PÂNICO");
        $('.buttonalertadechegada').addClass("invisivel");

    }

    $$('.buttonalertadechegada').on('click', function(){

        if (!localStorage.getItem('tracking')) {

                    myApp.modal({
                      text:'Qual veículo você está usando?',
                      afterText: '<div class="list-block">'+
                                    '<div class="item-input item-input-field not-empty-state">'+
                                        localStorage.getItem('listveiculoalerta')+
                                    '</div>'+
                                '</div>',
                      buttons: [
                      {
                        text: 'Cancelar',
                        onClick: function() {
                        }
                      },
                      {
                        text: 'Ok',
                        onClick: function() {
                            
                            localStorage.setItem("tracking", true);
                            localStorage.setItem("idveiculoalerta", $$("#idveiculoalerta").val());
                            $('.buttonalertadechegada').html("CANCELAR AVISO"); 
                            // Android customization
                            //cordova.plugins.backgroundMode.setDefaults({ title: 'Aviso de chegada ativado', ticker: 'Ticker', text:'Clique para voltar ao Aptohome'});
                            // Enable background mode
                            //cordova.plugins.backgroundMode.enable();
                            
                            /*
                              var bgGeo = window.backgroundGeoLocation;
                              var callbackFn = function(location) {
                                  console.log('BackgroundGeoLocation ativo');

                                    //bgGeo.finish();

                              };
                              var failureFn = function(error) {
                                  console.log('BackgroundGeoLocation error');
                                  console.log(error);
                              };

                            if (device.platform=="iOS") {
                                    // BackgroundGeoLocation is highly configurable.
                                    bgGeo.configure(callbackFn, failureFn, {
                                        // Geolocation config
                                        desiredAccuracy: 0,
                                        stationaryRadius: 1,
                                        distanceFilter: 1,
                                        activityType: 'AutomotiveNavigation',
                                        // Application config
                                        ///debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true
                                    });
                            } else if (device.platform=="Android") {
                                    bgGeo.configure(callbackFn, failureFn, {
                                        desiredAccuracy: 0,
                                        notificationIconColor: '#1F4D91',
                                        notificationTitle: 'Aviso de chegada',
                                        notificationText: 'ATIVADO',
                                        notificationIcon: 'res/drawable-hdpi-v4/icon.png',
                                        //debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true, // <-- enable this to clear background location settings when the app terminates
                                        locationService: bgGeo.service.ANDROID_DISTANCE_FILTER,
                                        interval: 60000, // <!-- poll for position every minute
                                        fastestInterval: 120000
                                    });
                            }
                            bgGeo.isLocationEnabled(bgAtivo, bgGeo.start());
                            var bgAtivo = function(location) {
                              console.log('BackgroundGeoLocation já ativo');
                            };
                            */
                        }
                      }
                    ]
                    });

        } else {
            myApp.confirm('Deseja realmente cancelar o Aviso de Chegada?', function () {

                    $.ajax({
                        url: $server+"functionAppAlerta.php?guid="+localStorage.getItem('guidtracking')+"&action=deltracking",
                        data : "get",
                        success: function(data) {
                            console.log("del tracking");
                            localStorage.removeItem('tracking');
                            localStorage.removeItem('deltraking');
                            localStorage.removeItem('guidtracking');
                            localStorage.removeItem('guidalerta');
                            localStorage.removeItem('idalerta');
                            localStorage.removeItem('idveiculoalerta');
                            localStorage.removeItem('trackingactive');
                        },error: function(data) {
                            /*myApp.hideIndicator();
                            myApp.alert('Erro! Tente novamente.');*/
                        }
                    });

                $('.buttonalertadechegada').html("ENVIAR AVISO");
                $('.buttonpanico').html("PÂNICO");
                $('.buttonshare').hide();
                //cordova.plugins.backgroundMode.disable();
                              /*
                              var bgGeo = window.backgroundGeoLocation;
                              var callbackFn = function(location) {
                                  console.log('BackgroundGeoLocation cancelado');

                                    bgGeo.finish();

                              };
                              var failureFn = function(error) {
                                  console.log('BackgroundGeoLocation error');
                                  console.log(error);
                              };

                            if (device.platform=="iOS") {
                                    // BackgroundGeoLocation is highly configurable.
                                    bgGeo.configure(callbackFn, failureFn, {
                                        // Geolocation config
                                        desiredAccuracy: 0,
                                        stationaryRadius: 1,
                                        distanceFilter: 1,
                                        activityType: 'AutomotiveNavigation',
                                        // Application config
                                        ///debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true
                                    });
                            } else if (device.platform=="Android") {
                                    bgGeo.configure(callbackFn, failureFn, {
                                        desiredAccuracy: 0,
                                        notificationIconColor: '#1F4D91',
                                        notificationTitle: 'Aviso de chegada',
                                        notificationText: 'ATIVADO',
                                        notificationIcon: 'res/drawable-hdpi-v4/icon.png',
                                        //debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true, // <-- enable this to clear background location settings when the app terminates
                                        locationService: bgGeo.service.ANDROID_DISTANCE_FILTER,
                                        interval: 60000, // <!-- poll for position every minute
                                        fastestInterval: 120000
                                    });
                            }
                            bgGeo.stop();
                            */
            });
        }
    });


    $('.buttonpanico').on('click', function(){

        if (!localStorage.getItem('panico')) {
                
                if (!localStorage.getItem('tracking')) {


                    myApp.modal({
                      text:'Qual veículo você está usando?',
                      afterText: '<div class="list-block">'+
                                    '<div class="item-input item-input-field not-empty-state">'+
                                        localStorage.getItem('listveiculoalerta')+
                                    '</div>'+
                                '</div>',
                      buttons: [
                      {
                        text: 'Cancelar',
                        onClick: function() {
                        }
                      },
                      {
                        text: 'Ok',
                        onClick: function() {
                            
                            localStorage.setItem("tracking", true);
                            localStorage.setItem("idveiculoalerta", $$("#idveiculoalerta").val());  
                            
                            localStorage.setItem("panico", "1");
                            $('.buttonpanico').html("CANCELAR PÂNICO");
                            $('.buttonalertadechegada').addClass("invisivel");
                            // Android customization
                            //cordova.plugins.backgroundMode.setDefaults({ title: 'Aviso de chegada ativado', ticker: 'Ticker', text:'Clique para voltar ao Aptohome'});
                            // Enable background mode
                            //cordova.plugins.backgroundMode.enable();
                            /*
                              var bgGeo = window.backgroundGeoLocation;
                              var callbackFn = function(location) {
                                  console.log('BackgroundGeoLocation panico ativo');


                                    //bgGeo.finish();

                              };
                              var failureFn = function(error) {
                                  console.log('BackgroundGeoLocation error');
                                  console.log(error);
                              };

                            if (device.platform=="iOS") {
                                    // BackgroundGeoLocation is highly configurable.
                                    bgGeo.configure(callbackFn, failureFn, {
                                        // Geolocation config
                                        desiredAccuracy: 0,
                                        stationaryRadius: 1,
                                        distanceFilter: 1,
                                        activityType: 'AutomotiveNavigation',
                                        // Application config
                                        ///debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true
                                    });
                            } else if (device.platform=="Android") {
                                    bgGeo.configure(callbackFn, failureFn, {
                                        desiredAccuracy: 0,
                                        notificationIconColor: '#1F4D91',
                                        notificationTitle: 'Aviso de chegada',
                                        notificationText: 'ATIVADO',
                                        notificationIcon: 'res/drawable-hdpi-v4/icon.png',
                                        //debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true, // <-- enable this to clear background location settings when the app terminates
                                        locationService: bgGeo.service.ANDROID_DISTANCE_FILTER,
                                        interval: 60000, // <!-- poll for position every minute
                                        fastestInterval: 120000
                                    });
                            }
                            bgGeo.isLocationEnabled(bgAtivo, bgGeo.start());
                            var bgAtivo = function(location) {
                              console.log('BackgroundGeoLocation já ativo');
                            };
                            */
                        }
                      }
                    ]
                    });
                } else {
                    myApp.confirm('Deseja ativar o modo pânico?', function () {
                        localStorage.setItem("panico", "1");
                        $('.buttonpanico').html("CANCELAR PÂNICO");
                        $('.buttonalertadechegada').addClass("invisivel");
                    });
                }
        } else{
            myApp.confirm('Deseja realmente cancelar o modo pânico?', function () {

                    $.ajax({
                        url: $server+"functionAppAlerta.php?guid="+localStorage.getItem('guidtracking')+"&action=deltracking",
                        data : "get",
                        success: function(data) {
                            console.log("del tracking");
                            localStorage.removeItem('tracking');
                            localStorage.removeItem('deltraking');
                            localStorage.removeItem('guidtracking');
                            localStorage.removeItem('guidalerta');
                            localStorage.removeItem('idalerta');
                            localStorage.removeItem('idveiculoalerta');
                            localStorage.removeItem('trackingactive');
                            localStorage.removeItem('panico');
                        },error: function(data) {
                            /*myApp.hideIndicator();
                            myApp.alert('Erro! Tente novamente.');*/
                        }
                    });


                $('.buttonpanico').html("PÂNICO");
                $('.buttonalertadechegada').html("ENVIAR AVISO");  
                $('.buttonalertadechegada').removeClass("invisivel");
                $('.buttonshare').hide();
                //cordova.plugins.backgroundMode.disable();

                            /*
                              var bgGeo = window.backgroundGeoLocation;
                              var callbackFn = function(location) {
                                  console.log('BackgroundGeoLocation panico cancelado');

                                    bgGeo.finish();

                              };
                              var failureFn = function(error) {
                                  console.log('BackgroundGeoLocation error');
                                  console.log(error);
                              };

                            if (device.platform=="iOS") {
                                    // BackgroundGeoLocation is highly configurable.
                                    bgGeo.configure(callbackFn, failureFn, {
                                        // Geolocation config
                                        desiredAccuracy: 0,
                                        stationaryRadius: 1,
                                        distanceFilter: 1,
                                        activityType: 'AutomotiveNavigation',
                                        // Application config
                                        ///debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true
                                    });
                            } else if (device.platform=="Android") {
                                    bgGeo.configure(callbackFn, failureFn, {
                                        desiredAccuracy: 0,
                                        notificationIconColor: '#1F4D91',
                                        notificationTitle: 'Aviso de chegada',
                                        notificationText: 'ATIVADO',
                                        notificationIcon: 'res/drawable-hdpi-v4/icon.png',
                                        //debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true, // <-- enable this to clear background location settings when the app terminates
                                        locationService: bgGeo.service.ANDROID_DISTANCE_FILTER,
                                        interval: 60000, // <!-- poll for position every minute
                                        fastestInterval: 120000
                                    });
                            }
                            bgGeo.stop();
                            */
            });
        }
    });


        initLocationProcedure();
        // Resultado para quando conseguir capturar a posição GPS...
            var map,
                currentPositionMarker,
                directionsService,
                mapCenter,
                directionsDisplay,
                mapCenter = new google.maps.LatLng(-14.384672, -51.929947);

            var auxHide = 0;
            /*navigator.geolocation.getCurrentPosition(mapCenterInt);
                function mapCenterInt(){
                    mapCenter = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
                }*/

            function initializeMap()
            {
                console.log("initializeMap ");
                //document.getElementById('map-canvas').html = "";
                $("#map-canvas").html("");
                directionsService = new google.maps.DirectionsService;
                directionsDisplay = new google.maps.DirectionsRenderer;
                mapCenter = new google.maps.LatLng(-14.384672, -51.929947);
                map = "";
                map = new google.maps.Map(document.getElementById('map-canvas'), {
                   zoom: 4,
                   center: mapCenter,
                   disableDefaultUI: true,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });

                directionsDisplay.setMap(map);
                calculateAndDisplayRoute(directionsService, directionsDisplay);
                
                directionsDisplay.addListener('directions_changed', function() {
                    computeTotalDistance(directionsDisplay.getDirections());
                });
            }


            function formatTime(secs){
               var times = new Array(3600, 60, 1);
               var time = '';
               var tmp;
               for(var i = 0; i < times.length; i++){
                  tmp = Math.floor(secs / times[i]);
                  if(tmp < 1){
                     tmp = '00';
                  }
                  else if(tmp < 10){
                     tmp = '0' + tmp;
                  }
                  time += tmp;
                  if(i < 2){
                     time += ':';
                  }
                  secs = secs % times[i];
               }
               return time;
            }

            function computeTotalDistance(result) {
                var total = 0;
                var time = 0;
                var myroute = result.routes[0];
                for (var i = 0; i < myroute.legs.length; i++) {
                    total += myroute.legs[i].distance.value;
                    time += myroute.legs[i].duration.value;
                }
                total = total / 1000;
                var totalformat = total.toString().replace(".", ",");
                //time = time / 60;
                document.getElementById('total').innerHTML = 'Distância = ' + totalformat + ' km | Tempo = ' + formatTime(time) + 'min';
            }
            var auxPanico = 0;
            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            
                var onSuccess = function(position) {

                    console.log("calculateAndDisplayRoute onSuccess");
                    /////////// verificar se existe alerta //////////
                    if (localStorage.getItem('tracking')) {
                        console.log("tracking true");
                        $.ajax({
                            url: $server+"functionAppAlerta.php?idmorador="+localStorage.getItem("moradorIdmorador")+"&action=list",
                            async: false,
                            dataType : "json",
                            success: function(data) {
                                if (data.alerta.length>0) {
                                    
                                    localStorage.setItem("trackingactive", true);
                                    localStorage.setItem("idalerta", data.alerta[0].idalerta);
                                    localStorage.setItem("guidalerta", data.alerta[0].guid);
                                    localStorage.setItem("guidtracking", data.alerta[0].guid);
                                    console.log("verificar se existe alerta"+ "idalerta= " + data.alerta[0].idalerta);
                                }else{
                                    console.log("não existe alerta - deltraking");
                                    localStorage.removeItem('tracking');
                                    localStorage.removeItem('deltraking');
                                    localStorage.removeItem('guidtracking');
                                    localStorage.removeItem('guidalerta');
                                    localStorage.removeItem('idveiculoalerta');
                                    localStorage.removeItem('idalerta');
                                    localStorage.removeItem('trackingactive');

                                    $('.buttonalertadechegada').html("ENVIAR AVISO");
                                    $('.buttonpanico').html("PÂNICO");
                                }
                            },error: function(data) {
                                    console.log("error! não existe alerta - deltraking");
                                    if (localStorage.getItem("trackingactive")) {
                                        localStorage.removeItem('tracking');
                                        localStorage.removeItem('deltraking');
                                        localStorage.removeItem('guidtracking');
                                        localStorage.removeItem('guidalerta');
                                        localStorage.removeItem('idalerta');
                                        localStorage.removeItem('idveiculoalerta');
                                        localStorage.removeItem('trackingactive');

                                        $('.buttonalertadechegada').html("ENVIAR AVISO");
                                        $('.buttonpanico').html("PÂNICO");
                                        auxAlertaCancelado = 1;
                                    }
                            }
                        });

                        if (!localStorage.getItem('trackingactive')) {
                            console.log("trackingactive false");

                            // verifica se alerta foi cancelado
                            if (auxAlertaCancelado==0) {
                                /////// inserir alerta ///////
                                $$idcondominio = localStorage.getItem("condominioId");
                                $$idbloco = localStorage.getItem("moradorIdbloco");
                                $$idveiculo = localStorage.getItem("idveiculoalerta");
                                $$iddomicilio = localStorage.getItem("moradorIddomicilio");
                                $$idmorador = localStorage.getItem("moradorIdmorador");

                                // Salvando dados no servidor
                                $.ajax($server+'functionAppAlerta.php?', {
                                    type: "post",
                                    dataType: "json",
                                    data: "idcondominio="+$$idcondominio+"&idbloco="+$$idbloco+"&iddomicilio="+$$iddomicilio+"&idmorador="+$$idmorador+"&idveiculo="+$$idveiculo+"&panico="+localStorage.getItem("panico")+"&action=add",
                                     async: false,
                                     beforeSend: function(x) {
                                      if(x && x.overrideMimeType) {
                                       x.overrideMimeType("application/j-son;charset=UTF-8");
                                      }
                                    },
                                    success: function(data){
                                    console.log("inserir alerta");
                                    console.log("idalerta= " + data.alerta[0].idalerta);
                                    console.log('coordenadas trackingactive false= '+position.coords.latitude+','+position.coords.longitude);
                                    
                                    localStorage.setItem("idalerta", data.alerta[0].idalerta);
                                    localStorage.setItem("guidalerta", data.alerta[0].guid);
                                    localStorage.setItem("guidtracking", data.alerta[0].guid);
                                    localStorage.setItem("trackingactive", true);



                                        /////// inserir coordenadas ///////
                                        $.ajax($server+'functionAppTracking.php?', {
                                            type: "post",
                                            data: "idalerta="+localStorage.getItem("idalerta")+"&lat="+position.coords.latitude+"&long="+position.coords.longitude+"&action=add",
                                        })
                                          .fail(function() {

                                          })   
                                          .done(function(data) {
                                            console.log("inserir coordenadas");
                                            console.log('coordenadas= '+position.coords.latitude+','+position.coords.longitude);
                                          });

      
                                          /*var bgGeo = window.backgroundGeoLocation;
                                          var callbackFn = function(location) {
                                              console.log('BackgroundGeoLocation trackingactive false  ' + location.latitude + ',' + location.longitude);


                                                                    /////// inserir coordenadas ///////
                                                                    $.ajax($server+'functionAppTracking.php?', {
                                                                        type: "post",
                                                                        data: "idalerta="+localStorage.getItem("idalerta")+"&lat="+location.latitude+"&long="+location.longitude+"&action=add",
                                                                    })
                                                                      .fail(function() {

                                                                      })   
                                                                      .done(function(data) {
                                                                        console.log("inserir coordenadas");
                                                                        $('.buttonshare').show();
                                                                        console.log('coordenadas= '+location.latitude+','+location.longitude);
                                                                      });
                                                //bgGeo.finish();

                                          };
                                          var failureFn = function(error) {
                                              console.log('BackgroundGeoLocation error');
                                              console.log(error);
                                          };*/

                                        /*if (device.platform=="iOS") {
                                                // BackgroundGeoLocation is highly configurable.
                                                bgGeo.configure(callbackFn, failureFn, {
                                                    // Geolocation config
                                                    desiredAccuracy: 0,
                                                    stationaryRadius: 1,
                                                    distanceFilter: 1,
                                                    activityType: 'AutomotiveNavigation',
                                                    // Application config
                                                    ///debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                                    stopOnTerminate: true
                                                });
                                        } else if (device.platform=="Android") {
                                                bgGeo.configure(callbackFn, failureFn, {
                                                    desiredAccuracy: 0,
                                                    notificationIconColor: '#1F4D91',
                                                    notificationTitle: 'Aviso de chegada',
                                                    notificationText: 'ATIVADO',
                                                    notificationIcon: 'res/drawable-hdpi-v4/icon.png',
                                                    //debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                                    stopOnTerminate: true, // <-- enable this to clear background location settings when the app terminates
                                                    locationService: bgGeo.service.ANDROID_DISTANCE_FILTER,
                                                    interval: 60000, // <!-- poll for position every minute
                                                    fastestInterval: 120000
                                                });
                                        }
                                        bgGeo.isLocationEnabled(bgAtivo, bgGeo.start());
                                        var bgAtivo = function(location) {
                                          console.log('BackgroundGeoLocation já ativo');
                                        };*/
                                    }
                                    ,error:function(data){
                                    }  
                                });
                            }

                        } else {
                            console.log("trackingactive true");
                            console.log('coordenadas trackingactive true= '+position.coords.latitude+','+position.coords.longitude);
                            console.log("inserir coordenadas de alerta já ativo");

                                    /////// inserir coordenadas ///////
                                    $.ajax($server+'functionAppTracking.php?', {
                                        type: "post",
                                        data: "idalerta="+localStorage.getItem("idalerta")+"&lat="+position.coords.latitude+"&long="+position.coords.longitude+"&action=add",
                                    })
                                      .fail(function(data) {
                                        alert(data);
                                      })   
                                      .done(function(data) {
                                        console.log("inserir coordenadas");
                                        console.log('coordenadas= '+position.coords.latitude+','+position.coords.longitude);
                                      });

          
                              /*var bgGeo = window.backgroundGeoLocation;
                              var callbackFn = function(location) {
                                  console.log('BackgroundGeoLocation trackingactive true  ' + location.latitude + ',' + location.longitude);


                                    /////// inserir coordenadas ///////
                                    $.ajax($server+'functionAppTracking.php?', {
                                        type: "post",
                                        data: "idalerta="+localStorage.getItem("idalerta")+"&lat="+location.latitude+"&long="+location.longitude+"&action=add",
                                    })
                                      .fail(function() {

                                      })   
                                      .done(function(data) {
                                        console.log("inserir coordenadas");
                                        console.log('coordenadas= '+location.latitude+','+location.longitude);
                                        $('.buttonshare').show();
                                      });
                                    //bgGeo.finish();

                              };
                              var failureFn = function(error) {
                                  console.log('BackgroundGeoLocation error');
                                  console.log(error);
                              };


                            if (device.platform=="iOS") {
                                    // BackgroundGeoLocation is highly configurable.
                                    bgGeo.configure(callbackFn, failureFn, {
                                        // Geolocation config
                                        desiredAccuracy: 0,
                                        stationaryRadius: 1,
                                        distanceFilter: 1,
                                        activityType: 'AutomotiveNavigation',
                                        // Application config
                                        ///debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true
                                    });
                            } else if (device.platform=="Android") {
                                    bgGeo.configure(callbackFn, failureFn, {
                                        desiredAccuracy: 0,
                                        notificationIconColor: '#1F4D91',
                                        notificationTitle: 'Aviso de chegada',
                                        notificationText: 'ATIVADO',
                                        notificationIcon: 'res/drawable-hdpi-v4/icon.png',
                                        //debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                                        stopOnTerminate: true, // <-- enable this to clear background location settings when the app terminates
                                        locationService: bgGeo.service.ANDROID_DISTANCE_FILTER,
                                        interval: 60000, // <!-- poll for position every minute
                                        fastestInterval: 120000
                                    });
                            }

                            bgGeo.isLocationEnabled(bgAtivo, bgGeo.start());
                            var bgAtivo = function(location) {
                              console.log('BackgroundGeoLocation já ativo');
                            };*/


                            if (localStorage.getItem("panico") && auxPanico==0) {
                                console.log("panico = "+auxPanico);
                                $.ajax($server+'functionAppAlerta.php?', {
                                    type: "post",
                                    data: "guid="+localStorage.getItem("guidtracking")+"&panico="+localStorage.getItem("panico")+"&action=add",
                                })
                                  .fail(function() {

                                  })     
                                  .done(function(data) {
                                  });
                                auxPanico++;
                            }

                        }
                    }

                        directionsService.route({
                            origin: position.coords.latitude+','+position.coords.longitude,
                            destination: localStorage.getItem("condominioStreet")+', '+localStorage.getItem("condominioNumber")+', '+localStorage.getItem("condominioDistrict")+', '+localStorage.getItem("condominioCityname")+', '+localStorage.getItem("condominioUf"),
                            /*origin: document.getElementById('start').value,
                            destination: document.getElementById('end').value,*/
                            travelMode: google.maps.TravelMode.DRIVING
                            }, function(response, status) {
                            if (status === google.maps.DirectionsStatus.OK) {
                              directionsDisplay.setDirections(response);
                            } else {
                              //window.alert('Directions request failed due to ' + status);
                            }
                        });
                }

                navigator.geolocation.getCurrentPosition(onSuccess,onError, { enableHighAccuracy: true });

                function onError(error) {
                    // the current position could not be located
                    console.log(error.message+" onError = The current position could not be found!");
                }
            }

            function locError(error) {
                // the current position could not be located
                myApp.hidePreloader();
                myApp.alert('Você precisa autorizar o acesso a sua localização', function () {
                    initLocationProcedure();
                });
                console.log(error.message+" locError = The current position could not be found!");
            }

            function setCurrentPosition(pos) {
                console.log("setCurrentPosition ");

                var image = 'http://iconizer.net/files/Brightmix/orig/monotone_location_pin_marker.png';
                currentPositionMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    )

                    //map: map,
                });

            }

            function displayAndWatch(position) {
                console.log("displayAndWatch ");
                // set current position
                setCurrentPosition(position);
                // watch position
                watchCurrentPosition();
            }

            function watchCurrentPosition() {
                console.log("watchCurrentPosition ");
                console.log("auxHide = "+auxHide);
                if (auxHide==0) {
                    myApp.hidePreloader();
                }
                positionTimer = navigator.geolocation.watchPosition(
                    function (position) {
                        setMarkerPosition(
                            currentPositionMarker,
                            position
                        );
                        calculateAndDisplayRoute(directionsService, directionsDisplay);
                        //mapCenterInt();
                    }, locError, { enableHighAccuracy: true });
                auxHide++;
            }

            function setMarkerPosition(marker, position) {
                console.log("setMarkerPosition ");
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
                //map.panTo(marker.getPosition());
            }

            function initLocationProcedure() {
                console.log("initLocationProcedure ");
                myApp.showPreloader("Buscando localização.");
                initializeMap();
                if (navigator.geolocation) {
                    console.log("Your browser support the Geolocation API");
                    navigator.geolocation.getCurrentPosition(displayAndWatch, locError, { enableHighAccuracy: true });
                } else {
                    console.log("Your browser does not support the Geolocation API");
                }
            }
}
//});

myApp.onPageReinit('index', function (page) {
    console.log("página anterior = "+myApp.mainView.history[myApp.mainView.history.length - 2]);
    if ((myApp.mainView.history[myApp.mainView.history.length - 2]) == "#alertadechegada" || (myApp.mainView.history[myApp.mainView.history.length - 2] == "#alertadechegadacont")) {
        console.log("onPageReinit clearWatch");
        clearTimeout(atualizamaptime);
        navigator.geolocation.clearWatch(positionTimer);
    }
});


/////////// compartilhar ALERTA ///////
function shareAlerta(){
    window.plugins.socialsharing.share(null, null, null, $server+'avisodechegada.php?guid='+localStorage.getItem("guidalerta"));
}


function dataamericana(data){
    split = data.split('/');
    novadata = split[2] + "-" +split[1]+"-"+split[0];
    //data_americana = new Date(novadata);
    //alert(novadata);
    return (novadata);
}
function convertMysqldate(dateStr) {    
// Assuming input:2014-01-30 16:21:09
            var t = dateStr.split(/[- :]/);
            //var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var monthNames = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
            var year = t[0];
            var month = monthNames[parseInt(t[1]-1)];
            var day = t[2];
            var hourTmp = t[3];
            var minute = t[4];
            var seconds = t[5];
            if (parseInt(hourTmp) > 12) {
                var hour = parseInt(parseInt(hourTmp) - 12) + ':' + minute + ':' + seconds + ' PM';
            } else if (parseInt(hourTmp) === 12) {
                hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' PM';
            } else {
               hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' AM';
            }
            //return (hour + '<br>' + day + ' ' + month + ' ' + year);
            return (day + '/' + month + '/' + year +' - '+ hour);
}
function convertDateBrasil(dateStr) {    
// Assuming input:2014-01-30 16:21:09
            var t = dateStr.split(/[- :]/);
            //var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var monthNames = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
            var year = t[0];
            var month = monthNames[parseInt(t[1]-1)];
            var day = t[2];
            var hourTmp = t[3];
            var minute = t[4];
            var seconds = t[5];
            /*if (parseInt(hourTmp) > 12) {
                var hour = parseInt(parseInt(hourTmp) - 12) + ':' + minute + ':' + seconds + ' PM';
            } else if (parseInt(hourTmp) === 12) {
                hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' PM';
            } else {
               hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' AM';
            }*/
            hour = parseInt(hourTmp) + ':' + minute + ':' + seconds;
            //return (hour + '<br>' + day + ' ' + month + ' ' + year);
            return (day + '/' + month + '/' + year);
}
function convertDateTimeBrasil(dateStr) {    
// Assuming input:2014-01-30 16:21:09
            var t = dateStr.split(/[- :]/);
            //var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var monthNames = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
            var year = t[0];
            var month = monthNames[parseInt(t[1]-1)];
            var day = t[2];
            var hourTmp = t[3];
            var minute = t[4];
            var seconds = t[5];
            /*if (parseInt(hourTmp) > 12) {
                var hour = parseInt(parseInt(hourTmp) - 12) + ':' + minute + ':' + seconds + ' PM';
            } else if (parseInt(hourTmp) === 12) {
                hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' PM';
            } else {
               hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' AM';
            }*/
            hour = parseInt(hourTmp) + ':' + minute + ':' + seconds;
            //return (hour + '<br>' + day + ' ' + month + ' ' + year);
            return (day + '/' + month + '/' + year +' - '+ hour);
}
function convertToAmericanDate(dateStr) {    
// Assuming input:30-01-2016 - 16:21:09
            var t = dateStr.split(/[/ :]/);
            //var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var monthNames = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
            var year = t[0];
            var month = monthNames[parseInt(t[1]-1)];
            var day = t[2];
            var hourTmp = t[3];
            var minute = t[4];
            var seconds = t[5];
            if (parseInt(hourTmp) > 12) {
                var hour = parseInt(parseInt(hourTmp) - 12) + ':' + minute + ':' + seconds + ' PM';
            } else if (parseInt(hourTmp) === 12) {
                hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' PM';
            } else {
               hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' AM';
            }
            //return (hour + '<br>' + day + ' ' + month + ' ' + year);
            //return (year + '/' + month + '/' + day +' - '+ hour);
            return (day + '/' + month + '/' + year +' - '+ hour);
}
function convertToDateOrder(dateStr) {    
// Assuming input:30/02/2016 16:21:09
            var t = dateStr.split(/[/ :]/);
            //var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var monthNames = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
            var day = t[0];
            var month = monthNames[parseInt(t[1]-1)];
            var year = t[2];
            var hourTmp = t[3];
            var minute = t[4];
            var seconds = t[5];

            //return (hour + '<br>' + day + ' ' + month + ' ' + year);
            //return (year + '/' + month + '/' + day +' - '+ hour);
            return (year + '-' + month + '-' + day +' '+ hour);
}

function convertToDateCount(dateStr) {    
// Assuming input:30/02/2016 16:21:09
            var t = dateStr.split(/[/ :]/);
            //var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var monthNames = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
            var day = t[0];
            var month = monthNames[parseInt(t[1]-1)];
            var year = t[2];
            var hourTmp = t[3];
            var minute = t[4];
            var seconds = t[5];
            if (parseInt(hourTmp) > 12) {
                var hour = parseInt(parseInt(hourTmp) - 12) + ':' + minute + ':' + seconds + ' PM';
            } else if (parseInt(hourTmp) === 12) {
                hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' PM';
            } else {
               hour = parseInt(hourTmp) + ':' + minute + ':' + seconds + ' AM';
            }
            //return (hour + '<br>' + day + ' ' + month + ' ' + year);
            //return (year + '/' + month + '/' + day +' - '+ hour);
            return (month + '/' + day + '/' + year +' '+ hour);
}

function formatTime(secs){
   var times = new Array(3600, 60, 1);
   var time = '';
   var tmp;
   for(var i = 0; i < times.length; i++){
      tmp = Math.floor(secs / times[i]);
      if(tmp < 1){
         tmp = '00';
      }
      else if(tmp < 10){
         tmp = '0' + tmp;
      }
      time += tmp;
      if(i < 2){
         time += ':';
      }
      secs = secs % times[i];
   }
   return time;
}
function formatMoneyFloat (numero) {
    var tmp = numero + '';
    tmp = tmp.replace(".", "");
    tmp = tmp.replace(",", ".");

    return tmp;
}
/*function formatMoneyReal (numero) {

    var tmp = numero + '';
    var neg = false;

    if (tmp - (Math.round(numero)) == 0) {
        tmp = tmp + '00';        
    }

    var numeroSplit = tmp.split(".");
    var numeroSplitLength = numeroSplit[1];
    var qtdNumeroSplit = numeroSplitLength.length;
    if (qtdNumeroSplit==1){
        tmp+"0";
    }

    if (tmp.indexOf(".")) {
        tmp = tmp.replace(".", "");
    }

    if (tmp.indexOf("-") == 0) {
        neg = true;
        tmp = tmp.replace("-", "");
    }

    if (tmp.length == 1) tmp = "0" + tmp

    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");

    if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    if (tmp.length > 9)
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");

    if (tmp.length = 12)
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4");

    if (tmp.length > 12)
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3.$4,$5");

    if (tmp.indexOf(".") == 0) tmp = tmp.replace(".", "");
    if (tmp.indexOf(",") == 0) tmp = tmp.replace(",", "0,");

    return (neg ? '-' + tmp : tmp);
}*/

function formatMoneyReal(valor){
  var inteiro = null, decimal = null, c = null, j = null;
  var aux = new Array();
  valor = ""+valor;
  c = valor.indexOf(".",0);
  //encontrou o ponto na string
  if(c > 0){
     //separa as partes em inteiro e decimal
     inteiro = valor.substring(0,c);
     decimal = valor.substring(c+1,valor.length);
    
    if(decimal.length === 1) {
        decimal += "0";
    }
  }else{
     inteiro = valor;
  }
   
  //pega a parte inteiro de 3 em 3 partes
  for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
     aux[c]=inteiro.substring(j-3,j);
  }
   
  //percorre a string acrescentando os pontos
  inteiro = "";
  for(c = aux.length-1; c >= 0; c--){
     inteiro += aux[c]+'.';
  }
  //retirando o ultimo ponto e finalizando a parte inteiro
   
  inteiro = inteiro.substring(0,inteiro.length-1);
   
  decimal = parseInt(decimal);
  if(isNaN(decimal)){
     decimal = "00";
  }else{
     decimal = ""+decimal;
     if(decimal.length === 1){
        decimal = "0"+decimal;
     }
  }
  valor = inteiro+","+decimal;
  return valor;
}

$(".selcor").spectrum({
    className: "full-spectrum",
    showPaletteOnly: true,
    allowEmpty: true,
    /*togglePaletteOnly: true,
    togglePaletteMoreText: "Mais",
    togglePaletteLessText: "Menos",*/
    chooseText: "Selecionar",
    cancelText: "Cancelar",
    localStorageKey: "spectrum.homepage",
    move: function (color) {
        
    },
    show: function () {
    
    },
    beforeShow: function () {
    
    },
    hide: function () {
    
    },
    change: function() {
        
    },
    palette :  [
    ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
    ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
    ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
    ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
    ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
    ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
    ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
    ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ]
});
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />'   : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag   + '$2');
}