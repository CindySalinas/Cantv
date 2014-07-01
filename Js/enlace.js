$(document).on("ready",inicio);
var map,map2;
function inicio ()
{
	
	mostrarMapa();
	ocultar();
	eventos();	
	ingresarEnlaceTextBox();
	$("#centralEnlaceIngresar").on("change", cambioCentral);
	$("#salaEnlaceIngresar").on("change", cambioSala);
	$("#equipoEnlaceIngresar").on("change", cambioEquipo);
	$("#agregarTransitoIngresarEnlace").on("click", agregarTransito);
	$("#agregarPosicionIngresarEnlace").on("click", agregarPosicion);
	$("#ingresarNuevoEnlace").on("click", agregarEnlace);
}	
function ocultar()
{
	$('.menuConsultar').hide();	
	$('.menuModificar').hide();
	$('.menuIngresar').hide();
	$('.menuModificar2').hide();
	$('.menuModificarPosiciones').hide();
	$('.menuModificarTransitos').hide();
	$('.consultarContenidoExtra').hide();
	$('.contenidoExtraModificar1').hide();
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
	$('.nuevasSalas').remove();
	$('.nuevosEquipos').remove();
	$('.nuevosTransitos').remove();
	$('.nuevasPosiciones').remove();
	$("#centralEnlaceIngresar option[value='sinSelCentral']").attr("selected", "selected");

}

function mostrarMapa(){
	//crea el mapa 
	map = new GMaps({
    	div: '#map2',
    	lat:10.174862,
		lng:-67.962385,
		zoom:5
	});
	map2 = new GMaps({
    	div: '#map3',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function ingresarEnlaceTextBox()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarClientes.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#clienteEnlaceIngresar").append("<option value='"+item.idCliente+"'>"+item.nombreCliente+"</option>");
		});
	});

	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCentrales.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#centralEnlaceIngresar").append("<option value='"+item.idCentral+"'>"+item.nombreCentral+"</option>");
		});
	});
}
function cambioCentral()
{
	$("#ubicacionEnlaceIngresar").val("");	
	$('.nuevasSalas').remove();
	$('.nuevosEquipos').remove();
	var central = $('#centralEnlaceIngresar option:selected').val();

	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarSalarIdCentral.php?jsoncallback=?";

	$.getJSON(url,{idCent: central
	}).done(function(data){
		$.each(data, function(i,item)
		{				
			$("#salaEnlaceIngresar").append("<option class='nuevasSalas' value='"+item.idSala+"'>"+item.nombreSala+"</option>");
		});
	});
}
function cambioSala()
{
	$("#ubicacionEnlaceIngresar").val("");	
	$('.nuevosEquipos').remove();
	var sala = $('#salaEnlaceIngresar option:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarEquipoIdSala.php?jsoncallback=?";

	$.getJSON(url,{idSal: sala
	}).done(function(data){
		$.each(data, function(i,item)
		{				
			$("#equipoEnlaceIngresar").append("<option class='nuevosEquipos' value='"+item.idEquipo+"'>"+item.nombreEquipo+"</option>");	
		});
	});
}
function cambioEquipo()
{
	$("#ubicacionEnlaceIngresar").val("");	
	var equipo = $('#equipoEnlaceIngresar option:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarUbicacionEquipoIdEquipo.php?jsoncallback=?";
		
	$.getJSON(url,{idEqui: equipo
	}).done(function(data){
		$.each(data, function(i,item)
		{				
			$("#ubicacionEnlaceIngresar").val(item.ubicacion);	
		});
	});
}
function agregarTransito()
{
	var transito=$("#inputTransitoIngresarEnlace").val();
	if(transito!="" && transito!=" " && transito!="  ")
	{
		$(".transitosListaAgregar").append("<li class='nuevosTransitos'>"+transito+"</li>");
		$("#inputTransitoIngresarEnlace").val("");
	}
	else
		alert("Escriba un Transito");
}
function agregarPosicion()
{
	var posicion=$("#inputPosicionIngresarEnlace").val();
	if(posicion!="" && posicion!=" " && posicion!="  ")
	{
		$(".posicionesListaAgregar").append("<li class='nuevasPosiciones'>"+posicion+"</li>");
		$("#inputPosicionIngresarEnlace").val("");
	}
	else
		alert("Escriba una Posición");
}

function agregarEnlace()
{
	var cantidadPosiciones = $(".posicionesListaAgregar li").size();
	var cantidadTransitos = $(".transitosListaAgregar li").size();

	var numEnlace = $("#numEnlaceIngresar").val();
	var rutEnlace = $("#rutaEnlaceIngresar").val();
	var equipEnlace = $("#equipoEnlaceIngresar option:selected").val();
	var clientEnlace = $("#clienteEnlaceIngresar option:selected").val();
	var centEnlace = $("#centralEnlaceIngresar option:selected").val();
	var salEnlace = $("#salaEnlaceIngresar option:selected").val();


	if(centEnlace!= "sinSelCentral" && salEnlace!="sinSelSala" && equipEnlace!="selEquip" && clientEnlace!="sinSelCliente" && numEnlace!="" && numEnlace!=" " && numEnlace!="  " && numEnlace!="   " && rutEnlace!="" && rutEnlace!=" " && rutEnlace!="  " && rutEnlace!="   ")
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/agregarEnlace.php?jsoncallback=?";
		$.getJSON(url,{numeroEnlace:numEnlace,rutaEnlace:rutEnlace,equipoEnlace:equipEnlace,clienteEnlace:clientEnlace}).done(
			function(data){				
				alert(data.mensaje);		
				var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarEnlaceNumeroEnlace.php?jsoncallback=?";
				$.getJSON(url2,{numero:numEnlace}).done(function(data){
						var idEnl=data.mensaje;
						$('.posicionesListaAgregar li').each(function(indice, elemento) 
						{
					  		var elem=$(elemento).text();
					  		var url3 = "http://127.0.0.1/Cantv/jsonCantv/agregarPosiciones.php?jsoncallback=?";
							$.getJSON(url3,{idEnlace:idEnl,element:elem}).done(
								function(data){								
								});
						});
						$('.transitosListaAgregar li').each(function(indice2, elemento2) 
						{
					  		var elem2=$(elemento2).text();
					  		var url4 = "http://127.0.0.1/Cantv/jsonCantv/agregarTransito.php?jsoncallback=?";
							$.getJSON(url4,{idEnlace:idEnl,element:elem2}).done(
								function(data){				
								});
						});
				});	
				resetear();
				$('.nuevasSalas').remove();
				$('.nuevosEquipos').remove();
				$('.nuevosTransitos').remove();
				$('.nuevasPosiciones').remove();
				$("#centralEnlaceIngresar option[value='sinSelCentral']").attr("selected", "selected");		
			});
	}
	else
		alert("Ingrese Todos Los Datos Correctamente");	
}
function llenarDatosConsultar()
{
	$('.colConEnlace').remove();
	var tabla = $('#tbodyConsultar');
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEnlaces.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
		$.each(data,function(i,item){
			tabla.append('<tr class="colConEnlace"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="c'+item.numeroEnlace+'" class="equipoConsultarMas"></a></td></tr>');
			$('.equipoConsultarMas').on("click",function(){actionBotones('consultarContenidoExtra','nada');}); 
			$('#c'+item.numeroEnlace).on("click",function(){marcaConsultarMapa(item.numeroEnlace,item.idEquipo);}); 
		});
	});
}
function llenarDatosModificar()
{
	$('.colConEnlace2').remove();
	var tabla = $('#tbodyModificar');
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEnlaces.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
		$.each(data,function(i,item){
			tabla.append('<tr class="colConEnlace2"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="m'+item.numeroEnlace+'" class="equipoConsultarMas"></a></td></tr>');
			$('.equipoConsultarMas').on("click",function(){actionBotones('contenidoExtraModificar1','nada');}); 
			$('#m'+item.numeroEnlace).on("click",function(){marcaConsultarMapa2(item.numeroEnlace,item.idEquipo);}); 
		});
	});
}

function marcaConsultarMapa(num,equi)
{
	$('.conNuevasPosiciones').remove();
	map.removeMarkers();
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadasConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url,{numero:equi}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$("#spanConsultarCentral").text(item.nomCtrl);
				$("#spanConsultarSala").text(item.nomb);
				$("#spanConsultarPiso").text(item.pisos);
				map.addMarker({
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
			alert("No Existe Ubicación");
		}
	});
	
	var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultarTransitosConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url3,{numero:num}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".consultaTransitos").append("<li class='conNuevasPosiciones'>"+item.transito+"</li>");
			});
		}
	});

	var url4 = "http://127.0.0.1/Cantv/jsonCantv/consultarPosicionesConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url4,{numero:num}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".consultandoPosiciones").append("<li class='conNuevasPosiciones'>"+item.posicion+"</li>");
			});
		}
	});
}
function marcaConsultarMapa2(num,equi)
{
	$('.conNuevasPosiciones2').remove();
	map2.removeMarkers();
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadasConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url,{numero:equi}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$("#spanConsultarCentral").text(item.nomCtrl);
				$("#spanConsultarSala").text(item.nomb);
				$("#spanConsultarPiso").text(item.pisos);
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
			alert("No Existe Ubicación");
		}
	});
	
	var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultarTransitosConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url3,{numero:num}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".modificaTransitos").append("<li class='conNuevasPosiciones2'>"+item.transito+"</li>");
			});
		}
	});

	var url4 = "http://127.0.0.1/Cantv/jsonCantv/consultarPosicionesConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url4,{numero:num}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".modificaPosiciones").append("<li class='conNuevasPosiciones2'>"+item.posicion+"</li>");
			});
		}
	});
}

function eventos()
{
	$('.consultarIcono').on("click",function(){actionBotones('menuConsultar','menuEnlaces');}); 
	 $('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultar','menuEnlaces');}); 
	 $('.consultarIcono').on("click", llenarDatosConsultar); 
	 $('.linkAbajoConsultar').on("click",llenarDatosConsultar); 

	 $('.ingresarIcono').on("click",function(){actionBotones('menuIngresar','menuEnlaces');}); 
	 $('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresar','menuEnlaces');}); 

	 $('.modificarIcono').on("click",function(){actionBotones('menuModificar','menuEnlaces');}); 
	 $('.linkAbajoModificar').on("click",function(){actionBotones('menuModificar','menuEnlaces');}); 
	 $('.modificarIcono').on("click",llenarDatosModificar); 
	 $('.linkAbajoModificar').on("click",llenarDatosModificar); 

	 $('.linkAtrasConsultar').on("click",function(){actionBotones('menuEnlaces','menuConsultar');}); 
	 $('.linkAtrasConsultar').on("click",function(){actionBotones('nada','consultarContenidoExtra');}); 

	 $('.equipoConsultarMas').on("click",function(){actionBotones('consultarContenidoExtra','nada');}); 

	 $('.atrasIngresarCliente').on("click",function(){actionBotones('menuEnlaces','menuIngresar');}); 

	 $('.atrasModificar2Enlace').on("click",function(){actionBotones('menuModificar','menuModificar2');}); 

	 $('.atrasTransitoEnlace').on("click",function(){actionBotones('menuModificar','menuModificarTransitos');}); 

	 $('.atrasPosicionEnlace').on("click",function(){actionBotones('menuModificar','menuModificarPosiciones');}); 

	 $('.atrasModificar1Enlace').on("click",function(){actionBotones('menuEnlaces','menuModificar');}); 
	 $('.atrasModificar1Enlace').on("click",function(){actionBotones('nada','contenidoExtraModificar1');}); 

	 $('.linkEditarEquipos').on("click",function(){actionBotones('contenidoExtraModificar1','nada');}); 

	 $('#modificaEnlace').on("click",function(){actionBotones('menuModificar2','menuModificar');}); 

	 $('#modificaPosicion').on("click",function(){actionBotones('menuModificarPosiciones','menuModificar');}); 

	 $('#modificaTransito').on("click",function(){actionBotones('menuModificarTransitos','menuModificar');}); 
}