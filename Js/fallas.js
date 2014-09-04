$(document).on("ready",inicio);

function inicio ()
{
	var map;
	mostrarMapa();
	ocultar();
	cargarIdPerfil();

	$('.consultarIconoFallasNewDesign').on("click",function(){actionBotones('menuConsultarFallas','menuFallas');}); 
	$('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultarFallas','menuFallas');});

	$('.consultarIconoFallasNewDesign').on("click",consultarFallas); 
	$('.linkAbajoConsultar').on("click",consultarFallas);

	$('.ingresarIconoFallasNewDesign').on("click",function(){actionBotones('menuIngresarFallas','menuFallas');}); 
	$('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresarFallas','menuFallas');}); 

	$('.modificarIconoFallasNewDesign').on("click",function(){actionBotones('menuEliminarFallas','menuFallas');}); 
	$('.linkAbajoModificar').on("click",function(){actionBotones('menuEliminarFallas','menuFallas');}); 

	

	$('.linkAtrasConsultar').on("click",function(){actionBotones('menuFallas','menuConsultarFallas');}); 
	$('.linkAtrasConsultar').on("click",function(){actionBotones('nada','contenidoExtraConsultarEnlace');}); 

	$('.linkAtrasIngresar').on("click",function(){actionBotones('menuFallas','menuIngresarFallas');});  


	$('.linkAtrasEliminar').on("click",function(){actionBotones('menuFallas','menuEliminarFallas');});  
	$('.linkAtrasEliminar').on("click",function(){actionBotones('nada','contenidoExtraEliminarFalla');});

	$('#dibujoConsultar').on('click',consultarFallas2);
	$('.textoBusqueda1').on('change',consultarFallas3);

	$('#guardarFalla1').on('click',ingresarFalla);

	$('#idEn').on('change',verificarEnlace);

	$('#consultaFallas1 ').on('click','.equipoConsultarMas',function(){
		var ids = $(this).attr('id');
		var id2 = $(this).attr('value');
		consultarFallasIndi(ids, id2);
		$('.contenidoExtraConsultarEnlace').show("slide");
	});

	$('#tablamodificar2').on('click','.linkEditarEquipos',function(){
		var ids = $(this).attr('id');
		var id2 = $(this).attr('value');
		$('#idHide').attr('value',id2);
		consultarFallasIndi(ids,id2);
		$('.contenidoExtraEliminarFalla').show("slide");
		
	});

	$('#btnCambiar').on('click',cambiarStatus);
	$('#btnEliminar').on('click',eliminarFalla);

}	
/* ------------------------ Variables Globales --------------------------- */
	var nomPerf = $.cookie('adminSis');
	var idPerf;
	
/* ----------------------------------------------------------------------- */
function ocultar()
{
	/*$('.menuConsultarFallas').hide();	*/
	$('.menuIngresarFallas').hide();
	$('.menuEliminarFallas').hide();
	/*$('.contenidoExtraConsultarEnlace').hide();*/
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
	map2 = new GMaps({
    	div: '#map2',
    	lat:10.174862,
		lng:-67.962385,
		zoom:10
	});
	map3 = new GMaps({
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

 // fecha = (diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
 	fecha = (f.getDate()+ "/"+ f.getMonth()+ "/" + f.getFullYear());
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
function verificarEnlace(){
	var idEn = $('#idEn').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarEnlaceNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url,{numero:idEn}).done(function(data){
		if(data.mensaje != null){
			//alert(data.mensaje);
			$('#enIsz').val(data.mensaje);
			$('#guardarFalla1').show("slide");
			//actionBotones('guardarFalla1','adsad');
		}
		else
		{
			//actionBotones('adsad','guardarFalla1');
			$('#guardarFalla1').hide('slow');
			alert("No existe enlace, Por Favor ingrese el enlace.");

		}
	});
}

function ingresarFalla(){
	var ids = $('#oculto1').val();
	var desc = $('#descFalla').val();
	var idEn = $('#enIsz').val();
	var fec = fecha();
	var hor = hora();
	var url = "http://127.0.0.1/Cantv/jsonCantv/ingresarFalla.php?jsoncallback=?";
	if(desc!= "" && $('#idEn').val()!= ""){
		$.getJSON(url,{idEnla:idEn,usr:ids,status:1,descr:desc,fc:fec,hr:hor}).done(function(data){
			alert(data.mensaje);
			resetear();
		})
	}
	else{
		alert("No se pueden Guardar Campos vacios");
	}
}

function consultarFallas(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFalla.php?jsoncallback=?";
	var tab = $('#consultaFallas1');
	$('.newTR').remove();
	$('.newRow').remove();
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="equipoConsultarMas" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				
			});
		}
		else{
			
		}
	});
}
function llenarDatosModificarFallas(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFalla.php?jsoncallback=?";
	
	var tab2 = $('#tablamodificar2');
	$('.newTR').remove();
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nomApell+'</td><td>'+item.stat+'</td><td><a class="equipoConsultarMas" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');

				// Tabla de modificar Fallas 
				tab2.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nomApell+'</td><td>'+item.stat+'</td><td><a class="linkEditarEquipos" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				
			});
		}
		else{
			
		}
	});
}

function consultarFallas2(){
	var busc = $('#textoBusqueda1').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFallaBuscar.php?jsoncallback=?";
	var tab = $('#consultaFallas1');
	$('.newRow').remove();
	$('.newTR').remove();
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="equipoConsultarMas" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
			
			});
		}
		else{
			
		}
	});
}
function consultarFallas3(){
	var busc = $('.textoBusqueda1').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFallaBuscar.php?jsoncallback=?";
	var tab = $('#tablamodificar2');
	$('.newRow').remove();
	$('.newTR').remove();
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.mensaje != 0){
			$.each(data,function(i,item){
				tab.append('<tr class="newRow"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nomApell+'</td><td>'+item.stat+'</td><td><a class="equipoConsultarMas" id='+item.idEnla+' value='+item.idStat+'></a></td></tr>');
				
			});
		}
		else{
			alert(data.mensaje);
		}
	});
}
var fallaSeleccionada;
function consultarFallasIndi(id, id2){
	fallaSeleccionada=id2;
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultaEstadoFalla.php?jsoncallback=?";
	var tab = $('#consultaFallas3');
	var tab2 = $('#tablaConsultarEquipos');
	var tab3 = $('#consultarEliminar');
	var tab4 = $('.tablaConsultarEquipos');
	var nums = $('#numEnla');
	var nums2 = $('.numEnla');
	map2.removeMarkers();
	$('.newRow2').remove();
	$('.newRow3').remove();
	$('.newRow4').remove();
	$('.newRow5').remove();
	$.getJSON(url,{idEnla:id, idFal:id2}).done(function(data){

		if(data.num !=0){
			$.each(data,function(i,item){
				$("#consultarEliminar").show();
				$("#consultaFallas3").show();
				nums.text(item.numEnla);
				nums2.text(item.numEnla);
				// Tabla 1
				tab.append('<tr class="newRow2"><td>'+item.obser+'</td><td>'+item.nomUsr+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td></tr>');	
				
				// Tabla de consultas de fallas
				tab2.append('<tr class="newRow3"><td class="leftTabla">Central:</td><td class="rightTabla">'+item.nombreCen+'</td><td class="leftTabla">Sala:</td><td class="rightTabla">'+item.salaNom+'</td><td >Piso:</td><td >'+item.pisoSala+'</td></tr>');
				//tabla de modificar fallas
				tab3.append('<tr class="newRow5"><td>'+item.obser+'</td><td>'+item.nomUsr+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td></tr>');
				
				// tabla de salas de falla consulta
				tab4.append('<tr class="newRow3"><td class="leftTabla">Central:</td><td class="rightTabla">'+item.nombreCen+'</td><td class="leftTabla">Sala:</td><td class="rightTabla">'+item.salaNom+'</td><td >Piso:</td><td >'+item.pisoSala+'</td></tr>');
				// Crear marca en el mapa
				crearMarca(item.idCent);
			});
		}
		else{
			$("#consultarEliminar").hide();
			$("#consultaFallas3").hide();
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

function cambiarStatus(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/cambiarStatus.php?jsoncallback=?";
	var hor = hora();
	var fec = fecha();
	var ids = $('#idHide').attr('value');
	$.getJSON(url,{idFalla:ids,hora:hor,fecha:fec}).done(function(data){
		alert(data.mensaje);
		location.reload(); 
	});
}

function eliminarFalla(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarFalla.php?jsoncallback=?";
	var ids = $('#idHide').attr('value');
	$.getJSON(url,{id:ids}).done(function(data){
		alert(data.mensaje);
		location.reload(); 
	});
}
