$(document).on("ready",inicio);

function inicio ()
{
	var map;
	mostrarMapa();
	ocultar();
	eventos();	
	ingresarEnlaceTextBox();
	$("#centralEnlaceIngresar").on("change", cambioCentral);
	$("#salaEnlaceIngresar").on("change", cambioSala);
	$("#equipoEnlaceIngresar").on("change", cambioEquipo);
	$("#agregarTransitoIngresarEnlace").on("click", agregarTransito);
	$("#agregarPosicionIngresarEnlace").on("click", agregarPosicion);
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
		zoom:7
	});
	map = new GMaps({
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

function eventos()
{
	$('.consultarIcono').on("click",function(){actionBotones('menuConsultar','menuEnlaces');}); 
	 $('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultar','menuEnlaces');}); 

	 $('.ingresarIcono').on("click",function(){actionBotones('menuIngresar','menuEnlaces');}); 
	 $('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresar','menuEnlaces');}); 

	 $('.modificarIcono').on("click",function(){actionBotones('menuModificar','menuEnlaces');}); 
	 $('.linkAbajoModificar').on("click",function(){actionBotones('menuModificar','menuEnlaces');}); 

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