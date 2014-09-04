$(document).on("ready",inicio);

function inicio ()
{
	ocultar();
	eventos();	
}	

function ocultar()
{
	$('.menuConsultarSalas').hide();	
	$('.menuIngresarSalas').hide();
	$('.menuModificarSalas').hide();
	$('.menuModificarModificarSalas').hide();
	$('.ocultoSalasConsultar').hide();
}

function resetear()
{
	$('input[type=text]').val("");
	$(".modificaPosiciones2 li").removeClass("colorOscuro");
	$(".modificaTransitos2 li").removeClass("colorOscuro");
}

function actionBotones(mostrar,ocultar)
{
	resetear();
	$('.'+mostrar).show("slide");
	$('.'+ocultar).hide("slow");	
	$('.nuevasPosiciones').remove();
	$("#centralEnlaceIngresar option[value='sinSelCentral']").attr("selected", "selected");
}

function mostrarMapa1()
{
	$('.ocultoSalasConsultar').hide();
	var sel = $('#consultarSalasSalas');
	$('.filas').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
	 	$.each(data,function(i,item){
	 		sel.append("<option class='filas' value="+item.idCtrl+">"+item.nomCtrl+"</option>");
	 	});
	});
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarSalasConCentral.php?jsoncallback=?";
	$(".newTr").remove();
	var tabla = $("#tablaConsultaSalas");
	$.getJSON(url2).done(function(data){
		$.each(data,function(i,item){

			tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td></tr>');				
		});
	});
}
function verMapa1()
{
	$('.ocultoSalasConsultar').show("slide");
	
	var sel = $('#consultarSalasSalas').val();

	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:sel}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				map1 = new GMaps({
			    	div: '#mapCentral1',
			    	lat:item.latCtrl,
					lng:item.longCtrl,
					zoom:7
				});
				map1.addMarker({
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
			map1.removeMarkers();
		}
	});
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarSalaConCentralId.php?jsoncallback=?";
	$(".newTr").remove();
	var tabla = $("#tablaConsultaSalas");
	$.getJSON(url2,{id:sel}).done(function(data){
		$.each(data,function(i,item){

			tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td></tr>');				
		});
	});
}
function verMapa2()
{
	$('.ocultoSalasModificar').show("slide");
	
	var sel = $('#modificarSalasSalas').val();
	
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:sel}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				map3 = new GMaps({
			    	div: '#mapCentral5',
			    	lat:item.latCtrl,
					lng:item.longCtrl,
					zoom:7
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
			map3.removeMarkers();
		}
	});
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarSalaConCentralId.php?jsoncallback=?";
	$(".newTr").remove();
	var contar=0;
	var tabla = $("#tablaModificaSalas");
	$.getJSON(url2,{id:sel}).done(function(data){
		$.each(data,function(i,item){

			contar++;
			if(contar%2==0)
			{
				tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td><td><a class="linkParaModificarSalas" value="'+item.idSala+'"><a></td></tr>');	
			}	
			else
			{
				tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td><td><a class="linkParaModificarSalas2" value="'+item.idSala+'"><a></td></tr>');	
			}			
		});
	});
}
function cambiarMapaModificar()
{	
	var sel = $('#modificarCentralSalas').val();
	
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:sel}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				map4 = new GMaps({
			    	div: '#mapCentral6',
			    	lat:item.latCtrl,
					lng:item.longCtrl,
					zoom:7
				});
				map4.addMarker({
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
			map4.removeMarkers();
		}
	});
}
function buscarLaSala()
{
	var sel = $('#textoBusqueda1').val();
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/buscarSalasVarios.php?jsoncallback=?";
	$("#consultarSalasSalas option[value='0']").attr("selected", "selected");
	$(".ocultoSalasConsultar").hide("slide");			
	$(".newTr").remove();
	var tabla = $("#tablaConsultaSalas");
	$.getJSON(url2,{nom:sel}).done(function(data){
		$.each(data,function(i,item){			
			tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td></tr>');				
		});
	});

}
function buscarLaSala2()
{
	var sel = $('#textoBusqueda2').val();
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/buscarSalasVarios.php?jsoncallback=?";
	$("#modificarSalasSalas option[value='0']").attr("selected", "selected");
	$(".ocultoSalasModificar").hide("slide");			
	$(".newTr").remove();
	var contar=0;
	var tabla = $("#tablaModificaSalas");
	$.getJSON(url2,{nom:sel}).done(function(data){
		$.each(data,function(i,item){			
			contar++;
			if(contar%2==0)
			{
				tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td><td><a class="linkParaModificarSalas" value="'+item.idSala+'"><a></td></tr>');	
			}	
			else
			{
				tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td><td><a class="linkParaModificarSalas2" value="'+item.idSala+'"><a></td></tr>');	
			}			
		});
	});

}
function mostrarMapa2(){
	//crea el mapa 	
		map2 = new GMaps({
    	div: '#mapCentralll',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});

	var sel = $('#ingresarCentralSalas');
	$('.filas').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
	 	$.each(data,function(i,item){
	 		sel.append("<option class='filas' value="+item.idCtrl+">"+item.nomCtrl+"</option>");
	 	});
	});
}
function cargarMapa(){
	var sel = $('#ingresarCentralSalas').val();
	/*map2.removeMarkers();*/

	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:sel}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				map2 = new GMaps({
			    	div: '#mapCentralll',
			    	lat:item.latCtrl,
					lng:item.longCtrl,
					zoom:7
				});
				map2.addMarker({
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
		}
	});
		
}
function ingresarSala() 
{
	var central = $('#ingresarCentralSalas').val();
	var salaNom = $('#ingresarNomSalas').val();
	var salaDesc = $('#ingresarDesSalas').val();
	var salaPiso = $('#ingresarPisoSalas').val();
	if (central!=0)
	{
		if(salaNom!="" && salaNom!=" " && salaNom!="  " && salaNom!="   ")
		{
			if(salaDesc!="" && salaDesc!=" " && salaDesc!="  " && salaDesc!="   ")
			{
				if(salaPiso!="" && salaPiso!=" " && salaPiso!="  " && salaPiso!="   ")
				{
					var url = "http://127.0.0.1/Cantv/jsonCantv/guardarSala.php?jsoncallback=?";

					$.getJSON(url,{nom:salaNom,desc:salaDesc,piso:salaPiso,cnt:central}).done(function(data){
						alert("Se ingresó correctamente la sala");
						map2.removeMarkers();
						resetear();
						$("#ingresarCentralSalas option[value='0']").attr("selected", "selected");
						$('#ingresarDesSalas').val("");
					});
					
				}
				else
				{
					alert("Escriba el piso donde se encuentra la sala");
				}
			}
			else
			{
				alert("Escriba una descripción de la sala");
			}
		}
		else
		{
			alert("Escriba el nombre de la sala");
		}
	}
	else
	{
		alert("Seleccione Una Central");
	}
}
function mostrarMapa3(){
	//crea el mapa 

	$('.ocultoSalasModificar').hide();
	var sel = $('#modificarSalasSalas');
	$('.filas').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
	 	$.each(data,function(i,item){
	 		sel.append("<option class='filas' value="+item.idCtrl+">"+item.nomCtrl+"</option>");
	 	});
	});
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarSalasConCentral.php?jsoncallback=?";
	$(".newTr").remove();
	var contar=0;
	var tabla = $("#tablaModificaSalas");
	$.getJSON(url2).done(function(data){
		$.each(data,function(i,item){
			contar++;
			if(contar%2==0)
			{
				tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td><td><a class="linkParaModificarSalas" value="'+item.idSala+'"><a></td></tr>');	
			}	
			else
			{
				tabla.append('<tr class="newTr"><td>'+item.salaNombre+'</td><td>'+item.salaPiso+'</td><td>'+item.salaDesc+'</td><td>'+item.centralNombre+'</td><td><a class="linkParaModificarSalas2" value="'+item.idSala+'"><a></td></tr>');	
			}					
		});
	});
}
var idSalaModificar;
function ubicacionMapaModificarSala(id)
{
	var sel = $('#modificarCentralSalas');
	$('.filas').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
	 	$.each(data,function(i,item){
	 		sel.append("<option class='filas' value="+item.idCtrl+">"+item.nomCtrl+"</option>");
	 	});
	});
	actionBotones("menuModificarModificarSalas","menuModificarSalas");
	idSalaModificar=id;
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarSalaConIdSala.php?jsoncallback=?";
	$.getJSON(url2,{id:idSalaModificar}).done(function(data){
		$.each(data,function(i,item){		
			$("#modificarNomSalas").val(item.salaNombre);
			$("#modificarDesSalas").val(item.salaDesc);
			$("#modificarPisoSalas").val(item.salaPiso);
			
			$("#modificarCentralSalas option[value='"+item.idCentral+"']").attr("selected", "selected");
			map4 = new GMaps({
		    	div: '#mapCentral6',
		    	lat:item.centralLatitud,
				lng:item.centralLongitud,
				zoom:7
			});
			map4.addMarker({
				  lat: item.centralLatitud,
				  lng: item.centralLongitud,
				  title: item.centralNombre,
				  infoWindow: {
				    content : item.dentralDir
			   		 }
				});


		});
	});

}
function mostrarMapa4(){
	
	actionBotones('menuModificarModificarSalas','menuModificarSalas');  
	//crea el mapa 
	$('.mapCentralOculto').show("slide");
		map4 = new GMaps({
    	div: '#mapCentral6',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}

function ocultaMapa()
{
	$('.mapCentralOculto').hide();
}
function modificarSala()
{
	var nombre=$('#modificarNomSalas').val();
	var descripcion=$('#modificarDesSalas').val();
	var pisoSala=$('#modificarPisoSalas').val();
	var central=$('#modificarCentralSalas').val();
	if(nombre != "" && nombre != " " && nombre != "  ")
	{
		if(descripcion!="" && descripcion!=" " && descripcion!="  ")
		{
			if(pisoSala!="" && pisoSala!=" " && pisoSala!="  ")
			{
				var url = "http://127.0.0.1/Cantv/jsonCantv/modificarSala.php?jsoncallback=?";
				$.getJSON(url,{nom: nombre,desc:descripcion,piso:pisoSala,idCentral:central,idSala:idSalaModificar}).done(function(data){
					alert("Se Han Modificado Los Datos Correctamente");
				});
			}
			else
			{
				alert("Debe Ingresar Un Piso Para La Sala");
			}
		}
		else
		{
			alert("Debe Ingresar Una Descripción Para La Sala");
		}
	}
	else
	{
		alert("Ingrese Un Nombre Para La Sala");
	}
}
function eliminarSala()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarSala.php?jsoncallback=?";
	$.getJSON(url,{idSala:idSalaModificar}).done(function(data)
	{
		alert("Se Ha Elimado La Sala");
		mostrarMapa3();
		actionBotones("menuModificarSalas","menuModificarModificarSalas");

	});
}
function eventos()
{
	$('.consultarIconoSalasNewDesign').on("click",function(){actionBotones('menuConsultarSalas','menuSalas');}); 
	$('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultarSalas','menuSalas');}); 

	$('.consultarIconoSalasNewDesign').on("click",mostrarMapa1); 
	$('.linkAbajoConsultar').on("click",mostrarMapa1); 

	$('.ingresarIconoSalasNewDesign').on("click",function(){actionBotones('menuIngresarSalas','menuSalas');}); 
	$('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresarSalas','menuSalas');}); 

	$('.ingresarIconoSalasNewDesign').on("click",mostrarMapa2); 
	$('.linkAbajoIngresar').on("click",mostrarMapa2);

	$('.modificarIconoSalasNewDesign').on("click",function(){actionBotones('menuModificarSalas','menuSalas');}); 
	$('.linkAbajoModificar').on("click",function(){actionBotones('menuModificarSalas','menuSalas');}); 

	$('.modificarIconoSalasNewDesign').on("click",mostrarMapa3); 
	$('.linkAbajoModificar').on("click",mostrarMapa3); 	

	$('.linkAtrasConsultar').on("click",function(){actionBotones('menuSalas','menuConsultarSalas');}); 
	$('.linkAtrasIngresar').on("click",function(){actionBotones('menuSalas','menuIngresarSalas');}); 
	$('.linkAtrasModificar').on("click",function(){actionBotones('menuSalas','menuModificarSalas');});  
	/*$('.linkAtrasModificar').on("click",ocultaMapa); */ 

	$('.linkAtrasModificarModificar').on("click",function(){actionBotones('menuModificarSalas','menuModificarModificarSalas');});  

	$('#ingresarCentralSalas').on("change",cargarMapa); 

	$('#ingresarCentralAceptar').on("click",ingresarSala); 

	$('.linkAtrasModificarModificar').on("click",mostrarMapa3); 

	$('#dibujoConsultar').on("click",buscarLaSala);

	$('#dibujoConsultar2').on("click",buscarLaSala2); 

	$('#botonModificarTransito').on("click",modificarSala); 
	$('#botonEliminarTransito').on("click",eliminarSala); 

	$('#consultarSalasSalas').on("change",verMapa1); 

	$('#modificarSalasSalas').on("change",verMapa2); 
	
	$('#modificarCentralSalas').on("change",cambiarMapaModificar); 

	$('#tablaModificaSalas').on('click','.newTr a',function(data){
		ubicacionMapaModificarSala($(this).attr('value'));
	});

}