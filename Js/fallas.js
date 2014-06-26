$(document).on("ready",inicio);

function inicio ()
{
	var map;
	mostrarMapa();
	ocultar();

	$('.consultarIcono').on("click",function(){actionBotones('menuConsultarFallas','menuFallas');}); 
	$('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultarFallas','menuFallas');});

	$('.ingresarIcono').on("click",function(){actionBotones('menuIngresarFallas','menuFallas');}); 
	$('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresarFallas','menuFallas');}); 

	$('.modificarIcono').on("click",function(){actionBotones('menuEliminarFallas','menuFallas');}); 
	$('.linkAbajoModificar').on("click",function(){actionBotones('menuEliminarFallas','menuFallas');}); 

	$('.equipoConsultarMas').on("click",function(){actionBotones('contenidoExtraConsultarEnlace','nada');}); 

	$('.linkAtrasConsultar').on("click",function(){actionBotones('menuFallas','menuConsultarFallas');}); 
	$('.linkAtrasConsultar').on("click",function(){actionBotones('nada','contenidoExtraConsultarEnlace');}); 

	$('.linkAtrasIngresar').on("click",function(){actionBotones('menuFallas','menuIngresarFallas');});  

	$('.linkEditarEquipos').on("click",function(){actionBotones('contenidoExtraEliminarFalla','nada');});  

	$('.linkAtrasEliminar').on("click",function(){actionBotones('menuFallas','menuEliminarFallas');});  
	$('.linkAtrasEliminar').on("click",function(){actionBotones('nada','contenidoExtraEliminarFalla');});
	cargarIdPerfil();

	$('#guardarFalla1').on('click',ingresarFalla);

	
}	
/* ------------------------ Variables Globales --------------------------- */
	var nomPerf = $.cookie('adminSis');
	var idPerf;
	
/* ----------------------------------------------------------------------- */
function ocultar()
{
	$('.menuConsultarFallas').hide();	
	$('.menuIngresarFallas').hide();
	$('.menuEliminarFallas').hide();
	$('.contenidoExtraConsultarEnlace').hide();
	$('.contenidoExtraEliminarFalla').hide();
}

function resetear()
{
	$('input[type=text]').val("");
}

function actionBotones(mostrar,ocultar)
{
	resetear();
	$('.'+mostrar).show("slide");
	$('.'+ocultar).hide("slow");	
}


function mostrarMapa(){
	//crea el mapa 
	map = new GMaps({
    	div: '#map2',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
	map = new GMaps({
    	div: '#map3',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
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

  fecha = (diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

  return fecha;
}

function cargarIdPerfil (){
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	$.getJSON(url,{namePerf:nomPerf}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){
				idPerf = item.idPer;
				$('#oculto1').val(idPerf);
			});
				
		}
		else{
			alert(data.mensaje);
		}
	})
}

function ingresarFalla(){
	var ids = $('#oculto1').val();
	var desc = $('#').val();
	var fecha = fecha();
	var hora = hora();
	var url = "http://127.0.0.1/Cantv/jsonCantv/ingresarFalla.php?jsoncallback=?";
	$.getJSON(url,{idEnla:idEn,usr:ids,status:1,descr:desc,fc:fecha,hr:hora}).done(function(data){
		alert(data.mensaje);
	})
}