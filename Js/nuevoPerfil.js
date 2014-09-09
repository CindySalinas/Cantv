$(document).on("ready",listo);

function listo() 
{
    $("#content div").hide(); // Initially hide all content
    $("#pestaTab li:first").attr("id","current"); // Activate first tab
    $("#content div:first").fadeIn(); // Show first tab content
    
    $('#pestaTab a').click(function(e) {
        e.preventDefault();        
        $("#content div").hide(); //Hide all content
        $("#pestaTab li").attr("id",""); //Reset id's
        $(this).parent().attr("id","current"); // Activate this
        $('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
        $('#textoBusqueda1').val("");
    });

    llenarDatosActividades();
    $("#dibujoConsultar").on("click",ingresarActividad);
};

function llenarDatosActividades()
{
	var divDatosActividades = $('#trabajando');
	$('.newTr').remove();
	var ckie = $.cookie('adminSis');
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarActividades.php?jsoncallback=?";
	$.getJSON(url,{idPerfil:ckie}).done(function(data){
		if(data.num!=0){
			$.each(data,function(i,item){
				divDatosActividades.append('<hr class="newTr"><section class="otroSection newTr"><article class="displayInline3 fotoPerfilActividad"><img src="../Img/fotoPerfil/'+item.ftPerfil+'"></article><article class="displayInline3 wid70">'+item.acti+'<br><article class="menosFont"><label>Fecha: </label><span>'+item.fecha+'</span> <label>Hora: </label><span>'+item.hora+'</span></article></article></section>');
			});
		}
		else{
			
		}
	});
}

function ingresarActividad()
{
	var ckie = $.cookie('adminSis');
	var actividad = $('#textoBusqueda1').val();
	var fec=fecha();
	var hor=hora();
	if(actividad!=""&&actividad!=" "&&actividad!="  "&&actividad!="   ")
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
		if(ckie == undefined){
			location.href = "../index.html";
		}
		else{
			$.getJSON(url,{namePerf:ckie}).done(function(data){
				if(data.num != 0){
					$.each(data,function(i,item){
						var url2 = "http://127.0.0.1/Cantv/jsonCantv/ingresarActividad.php?jsoncallback=?";
						$.getJSON(url2,{idPerfil:item.idPer,acti:actividad,fecha:fec,hora:hor}).done(function(data)
						{
							llenarDatosActividades();
							$('#textoBusqueda1').val("");
						});
					});
				}
				else{
					alert(data.mensaje);
					location.href = "index.html";
				}
			});
		}
	}	
}

function hora(){

  var Digital=new Date();
  var hours=Digital.getHours();
  var minutes=Digital.getMinutes();
  var seconds=Digital.getSeconds();
  var dn="am";

  if (hours>12)
  {
    dn="pm";
    hours=hours-12;
  }

  if (hours==0)
    hours=12;

  if (minutes<=9)
    minutes="0"+minutes;

  if (seconds<=9)
    seconds="0"+seconds;

  var hora = hours+":"+minutes+":"
  +seconds+dn;

  return hora;
}
/*Funcion para obtener la fecha actual*/
function fecha()
{
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

  var diasSemana = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");

  var f=new Date();
  var fecha;

 // fecha = (diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
 	fecha = (f.getDate()+ "/"+ f.getMonth()+ "/" + f.getFullYear());
  return fecha;
}