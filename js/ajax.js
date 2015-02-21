$(function(){
  //traer un recurso web
  /*$.get('logos_footer.html',function(codigo){
    $('footer').append(codigo);
  });*/
  $('footer .logos').load('logos_footer.html #google');



  //traer un json
  $.get('usuario.json',function(info){
    var avatar = new Image();
    avatar.src = "imagenes/"+info.avatar;
    avatar.title = info.nombre +' '+info.apellido;
      $("#avatar").append(avatar);
  });


});
var base_url="https://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat,lon) {

  var query ='SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';
  query = encodeURIComponent(query);
  console.log(query);
  //se debe pasar un solo objeto de parametros la function
  $.ajax({
    url:base_url+"q="+query,
    dataType:'jsonp',
    jsonpCallback:'procesarGeoInfo',
    data:{
      format: 'json'
    }
  });
};
function obtenerClima(woeid) {
  var query ='SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" AND u="c"';
  query = encodeURIComponent(query);
  console.log(query);
  //se debe pasar un solo objeto de parametros la function
  $.ajax({
    url:base_url+"q="+query,
    dataType:'jsonp',
    jsonpCallback:'procesarClima',
    data:{
      format: 'json'
    }
  });
};
function procesarGeoInfo(datos) {
  var res = datos.query.results.Result;
  var barrio = res.neighborhood;
  var ciudad = res.city;
  var pais = res.country;
  var woeid = res.woeid;
  $('#geo').prepend('<p><strong>'+barrio+'</strong><br>'+ciudad+', '+pais+'</p>');

  obtenerClima(woeid);
};

function procesarClima(datos) {
  //console.log(datos);
  var clima = datos.query.results.channel;
  var temp = clima.item.condition.temp;
  var unit = clima.units.temperature;
  var code = clima.item.condition.code;
  var img = new Image();
  img.src = "http://l.yimg.com/a/i/us/we/52/"+code+".gif";

  $('#clima').append(img)
  .append(temp +', '+unit);

}
