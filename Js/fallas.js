$(document).on("ready",inicio);

function inicio ()
{
	var map;
	ocultar();
	cargarIdPerfil();

	$('.consultarIconoFallasNewDesign').on("click",function(){actionBotones('menuConsultarFallas','menuFallas');}); 
	$('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultarFallas','menuFallas');});

	$('.consultarIconoFallasNewDesign').on("click",consultarFallas); 
	$('.linkAbajoConsultar').on("click",consultarFallas);

	$('.ingresarIconoFallasNewDesign').on("click",function(){actionBotones('menuIngresarFallas','menuFallas');
		$('#guardarFalla1').show();
		verificaEnlaceIngresar=null;
	}); 
	$('.linkAbajoIngresar').on("click",function(){
		actionBotones('menuIngresarFallas','menuFallas');
		$('#guardarFalla1').show();
		verificaEnlaceIngresar=null;
	}); 

	$('.modificarIconoFallasNewDesign').on("click",function(){
		actionBotones('menuEliminarFallas','menuFallas');
		consultarModificarFallas();
	}); 
	$('.linkAbajoModificar').on("click",function(){
		actionBotones('menuEliminarFallas','menuFallas');
		consultarModificarFallas();
	}); 

	

	$('.linkAtrasConsultar').on("click",function(){actionBotones('menuFallas','menuConsultarFallas');}); 
	$('.linkAtrasConsultar').on("click",function(){actionBotones('nada','contenidoExtraConsultarEnlace');}); 

	$('.linkAtrasIngresar').on("click",function(){actionBotones('menuFallas','menuIngresarFallas');});

	$('.linkAtrasObservacion').on("click",function(){actionBotones('menuEliminarFallas','menuIngresarObservaciones');});  


	$('.linkAtrasEliminar').on("click",function(){actionBotones('menuFallas','menuEliminarFallas');});  
	$('.linkAtrasEliminar').on("click",function(){actionBotones('nada','contenidoExtraEliminarFalla');});

	$('#dibujoConsultar').on('click',consultarFallas2);
	$('#dibujoConsultar2').on('click',consultarFallas3);

	$('#guardarFalla1').on('click',ingresarFalla);

	$('#nuevaObservacion').on('click',mostrarObservaciones);

	$('#idEn').on('change',verificarEnlace);

	$('#consultaFallas1 ').on('click','.fallasConsultarMas',function(){
		var ids = $(this).attr('id');
		var id2 = $(this).attr('value');
		consultarFallasIndi(ids, id2);
	});
	$('#tablamodificar2 ').on('click','.fallasModificarMas',function(){
		var ids = $(this).attr('id');
		var id2 = $(this).attr('value');
		consultarFallasIndi2(ids, id2);
	});
	$('#modificarEquipo2').on('click',cambiarStatus);
	$('#eliminarEquipo1').on('click',eliminarFalla);
	$('#agregarTransitoModificar').on('click',agregarObservacion);

}	
/* ------------------------ Variables Globales --------------------------- */
	var nomPerf = $.cookie('adminSis');
	var idPerf;
	
/* ----------------------------------------------------------------------- */
function ocultar()
{
	$('.menuConsultarFallas').hide();	
	$('.divFallaResueltaModificar').hide();	
	$('.divBotonesModificar').hide();	
	$('.menuIngresarFallas').hide();
	$('.menuEliminarFallas').hide();
	$('.contenidoExtraEliminarFalla').hide();
	$(".contenidoMapaCentralConsultar").hide();
	$(".contenidoObservacionesAgregar").hide();
	$(".contenidoFallaResueltaConsultar").hide("");
	
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
var idPerfil;
function cargarIdPerfil (){
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	$.getJSON(url,{namePerf:nomPerf}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){
				idPerf = item.idPer;
				idPerfil=idPerf;
			});
				
		}
		else{
			alert(data.mensaje);
		}
	})
}
var verificaEnlaceIngresar;
function verificarEnlace(){
	var idEn = $('#idEn').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarEnlaceNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url,{numero:idEn}).done(function(data){
		if(data.mensaje != null){
			verificaEnlaceIngresar=data.mensaje;
			$('#guardarFalla1').show("slide");
		}
		else
		{
			//actionBotones('adsad','guardarFalla1');
			$('#guardarFalla1').hide('slow');
			alert("No existe enlace, Por Favor ingrese el enlace.");
			verificaEnlaceIngresar=null;

		}
	});
}

function ingresarFalla(){
	var ids = idPerfil;
	var desc = $('#descFalla').val();
	var idEn = verificaEnlaceIngresar;
	var fec = fecha();
	var hor = hora();
	if(verificaEnlaceIngresar!=null)
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/ingresarFalla.php?jsoncallback=?";
		if(desc!= "" && $('#idEn').val()!= "" && desc!= " " && $('#idEn').val()!= " " && desc!= "  " && $('#idEn').val()!= "  "){
			$.getJSON(url,{idEnla:idEn,usr:ids,status:1,descr:desc,fc:fec,hr:hor}).done(function(data){
				alert(data.mensaje);
				resetear();
				verificaEnlaceIngresar=null;
			});
		}
		else{
			alert("No se pueden Guardar Campos vacios");
		}
	}	
}

function consultarFallas(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFalla.php?jsoncallback=?";
	$(".contenidoObservacionesModificar").hide();
	$(".contenidoMapaCentralConsultar").hide();
	$(".contenidoFallaResueltaConsultar").hide("slide");
	var tab = $('#consultaFallas1');
	var contar=0;
	$('.newTR').remove();
	$('.newRow').remove();
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasConsultarMas consultarMasDesign" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}
				else
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasConsultarMas consultarMasDesign2" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}				
				
			});
		}
		else{
			
		}
	});
}
function consultarModificarFallas()
{
	$('.divFallaResueltaModificar').hide();	
	$('.divBotonesModificar').hide();
	$('.menuIngresarObservaciones').hide();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFalla.php?jsoncallback=?";
	
	var tab = $('#tablamodificar2');
	var contar=0;
	$('.newTR').remove();
	$('.newRow').remove();
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasModificarMas modificarMasFallaDesign" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}
				else
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasModificarMas modificarMasFallaDesign2" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}				
				
			});
		}
		else{
			
		}
	});
}
function consultarFallas2(){
	var busc = $('#textoBusqueda1').val();
	$(".contenidoObservacionesModificar").hide("slide");
	$(".contenidoFallaResueltaConsultar").hide("slide");
	$(".contenidoMapaCentralConsultar").hide("slide");
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFallaBuscar.php?jsoncallback=?";
	var tab = $('#consultaFallas1');
	var contar=0;
	$('.newRow').remove();
	$('.newTR').remove();
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasConsultarMas consultarMasDesign" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}
				else
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasConsultarMas consultarMasDesign2" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}				
			
			});
		}
		else{
			
		}
	});
}
function consultarFallas3(){
	$('.divFallaResueltaModificar').hide();	
	$('.divBotonesModificar').hide();
	var busc = $('#textoBusqueda2').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFallaBuscar.php?jsoncallback=?";
	var tab = $('#tablamodificar2');
	var contar=0;
	$('.newRow').remove();
	$('.newTR').remove();
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasModificarMas modificarMasFallaDesign" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}
				else
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasModificarMas modificarMasFallaDesign2" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}				
				
			});
		}
		else{
			
		}
	});
}
var fallaSeleccionada;
function consultarFallasIndi(id, id2)
{
	fallaSeleccionada=id2;

	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarObservacionesFallas.php?jsoncallback=?";

	var tablaObservaciones = $('#consultaFallas3');
	var tab2 = $('#tablaConsultarEquipos');
	var tab3 = $('#consultarEliminar');
	var tab4 = $('.tablaConsultarEquipos');
	var nums = $('#numEnla');
	/*map2.removeMarkers();*/
	$('.newRow2').remove();
	$('.newRow3').remove();
	$('.newRow4').remove();
	$('.newRow5').remove();

	$(".contenidoMapaCentralConsultar").show("slide");
	$.getJSON(url,{idFal:id2}).done(function(data)
	{
		if(data.num!=0)
		{
			$(".contenidoObservacionesModificar").show("slide");
			$.each(data,function(i,item)
			{
				tablaObservaciones.append('<tr class="newRow2"><td>'+item.obser+'</td><td>'+item.nom+" "+item.ape+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td></tr>');	
				$("#numEnla").text(item.enlace);
			});
		}
		else
		{
			$(".contenidoObservacionesModificar").hide("slide");
		}
	});
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultaEstadoFalla2.php?jsoncallback=?";
	$.getJSON(url2,{idFal:id2}).done(function(data)
	{
		$.each(data,function(i,item)
		{
			$("#spanConsultarCentralNombre").text(item.nomCentral);
			$("#spanConsultarDirCentral").text(item.dirCentral);
			$("#spanConsultarSalaNombre").text(item.nomSala);
			$("#spanConsultarSalaDes").text(item.desSala);
			$("#spanConsultarPisoSala").text(item.pisoSala);
			$("#spanConsultarEquipo").text(item.tipoEquipo);
			$("#spanConsultarMarcaEquipo").text(item.marca);
			$("#spanConsultarUbiEquipo").text(item.ubiEquipo);
			$("#spanConsultarFunEquipo").text(item.funPrincipal);
			map2 = new GMaps({
		    	div: '#map2',
		    	lat:item.latitud,
				lng:item.longitud,
				zoom:9
			});
			map2.addMarker({
				lat: item.latitud,
				lng: item.longitud,
				title: item.nomCentral,
				infoWindow: {
					content : item.dirCentral
			    }
			});
		});
	});
	var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultaFallaSolucion.php?jsoncallback=?";
	$.getJSON(url3,{idFal:id2}).done(function(data)
	{
		if(data.num!=0)
		{
			$.each(data,function(i,item)
			{
				$(".contenidoFallaResueltaConsultar").show("slide");
				$("#spanConsultarFallaResueltaPor").text(item.nombre+" "+item.apellido);
				$("#spanConsultarFechaSolucion").text(item.fecha);
				$("#spanConsultarHoraSolucion").text(item.hora);
			});
		}
		else
		{
			$(".contenidoFallaResueltaConsultar").hide("slide");
		}
		
	});

}
var fallaEstatus;
function consultarFallasIndi2(id, id2)
{
	fallaSeleccionada=id2;

	var tab2 = $('#tablaConsultarEquipos');
	var tab3 = $('#consultarEliminar');
	var tab4 = $('.tablaConsultarEquipos');
	var nums = $('#numEnla');
	/*map2.removeMarkers();*/
	$('.newRow2').remove();
	$('.newRow3').remove();
	$('.newRow4').remove();
	$('.newRow5').remove();

	var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultaFallaSolucion.php?jsoncallback=?";
	$.getJSON(url3,{idFal:id2}).done(function(data)
	{
		if(data.num!=0)
		{
			$.each(data,function(i,item)
			{
				fallaEstatus=2;
				$(".divFallaResueltaModificar").show("slide");
				$(".divBotonesModificar").show("slide");
				$("#spanModificarFallaResueltaPor").text(item.nombre+" "+item.apellido);
				$("#spanModificarFechaSolucion").text(item.fecha);
				$("#spanModificarHoraSolucion").text(item.hora);
			});
		}
		else
		{
			fallaEstatus=1;
			$(".divBotonesModificar").show("slide");
			$(".divFallaResueltaModificar").hide("slide");
		}
		
	});

}
function mostrarObservaciones()
{
	$("#textareaObservacion").val("");
	actionBotones("menuIngresarObservaciones","menuEliminarFallas");
	$(".contenidoObservacionesAgregar").show();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarObservacionesFallas.php?jsoncallback=?";
	var tablaObservaciones=$("#consultaFallas4");
	$(".newRow2").remove();
	$.getJSON(url,{idFal:fallaSeleccionada}).done(function(data)
	{
		if(data.num!=0)
		{
			$.each(data,function(i,item)
			{
				tablaObservaciones.append('<tr class="newRow2"><td>'+item.obser+'</td><td>'+item.nom+" "+item.ape+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td></tr>');	
				
			});
		}
		else
		{
			/*$(".consultaFallas4").hide("slide");*/
		}
	});
}

// mostrar el mapa y la ubicacion de la consulta de equipos
function crearMarca(id){
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	map2.removeMarkers();
	map3.removeMarkers();
	// marca el mapa
	$.getJSON(url,{idCentral:id}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){

				map2.addMarker({
				  lat: item.latCtrl,
				  lng: item.longCtrl,
				  title: item.nomCtrl,
				  infoWindow: {
				    content : item.dirCtrl
			   		 }
				});

				map3.addMarker({
				  lat: item.latCtrl,
				  lng: item.longCtrl,
				  title: item.nomCtrl,
				  infoWindow: {
				    content : item.dirCtrl
			   		 }
				});

			});
		}
		else{
			alert(data.mensajee);
		}
	});
}

function cambiarStatus()
{
	var ids = fallaSeleccionada;
	var estatusSolucion;
	if(fallaEstatus==2)
	{
		/*Eliminar La Persona que soluciono la falla*/
		estatusSolucion=1;
		var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarFallaSolucion.php?jsoncallback=?";
		$.getJSON(url,{id:ids}).done(function(data)
		{			
		});
	}
	if(fallaEstatus==1)
	{
		estatusSolucion=2;
		/*Agregar a La Persona que solucionó la falla*/
		var url2 = "http://127.0.0.1/Cantv/jsonCantv/agregarFallaSolucion.php?jsoncallback=?";		
		var hor = hora();
		var fec = fecha();
		var perfi = idPerfil;
		var ids = fallaSeleccionada;
		$.getJSON(url2,{idFalla:ids,hora:hor,fecha:fec,perfil:perfi}).done(function(data)
		{			
		});
	}
	var url3 = "http://127.0.0.1/Cantv/jsonCantv/cambiarStatus.php?jsoncallback=?";

	$.getJSON(url3,{idFalla:ids,estatus:estatusSolucion}).done(function(data)
	{
		consultarModificarFallas();
	});
}

function eliminarFalla(){
	var ids = fallaSeleccionada;

	var url1 = "http://127.0.0.1/Cantv/jsonCantv/eliminarFallaSolucion.php?jsoncallback=?";
	$.getJSON(url1,{id:ids}).done(function(data)
	{			
	});

	var url2 = "http://127.0.0.1/Cantv/jsonCantv/eliminarObservacionesFallas.php?jsoncallback=?";
	$.getJSON(url2,{id:ids}).done(function(data)
	{
		
	});
	
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarFalla.php?jsoncallback=?";
	$.getJSON(url,{id:ids}).done(function(data)
	{
		consultarModificarFallas();
	});
}
function agregarObservacion()
{
	var observacion = $("#textareaObservacion").val();
	var fech = fecha();
	var hor = hora();
	if(observacion!="" && observacion!=" " && observacion!="  " && observacion!="   ")
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/ingresarObservacion.php?jsoncallback=?";

		$.getJSON(url,{idFalla:fallaSeleccionada,fecha:fech,hora:hor,obser:observacion,idP:idPerfil}).done(function(data)
		{
			mostrarObservaciones();
		});		
	}
	else
	{
		alert("Escriba una Observación");
	}
}