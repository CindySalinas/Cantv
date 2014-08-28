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

function mostrarMapa1(){
	//crea el mapa 
		map1 = new GMaps({
    	div: '#mapCentral1',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa2(){
	//crea el mapa 	
		map2 = new GMaps({
    	div: '#mapCentral',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa3(){
	//crea el mapa 
		map3 = new GMaps({
    	div: '#mapCentral5',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
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

function eventos()
{
	$('.consultarIcono').on("click",function(){actionBotones('menuConsultarSalas','menuSalas');}); 
	$('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultarSalas','menuSalas');}); 

	$('.consultarIcono').on("click",mostrarMapa1); 
	$('.linkAbajoConsultar').on("click",mostrarMapa1); 

	$('.ingresarIcono').on("click",function(){actionBotones('menuIngresarSalas','menuSalas');}); 
	$('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresarSalas','menuSalas');}); 

	$('.ingresarIcono').on("click",mostrarMapa2); 
	$('.linkAbajoIngresar').on("click",mostrarMapa2);

	$('.modificarIcono').on("click",function(){actionBotones('menuModificarSalas','menuSalas');}); 
	$('.linkAbajoModificar').on("click",function(){actionBotones('menuModificarSalas','menuSalas');}); 

	$('.modificarIcono').on("click",function(){actionBotones('menuModificarModificarSalas','menuSalas');}); 
	$('.linkAbajoModificar').on("click",function(){actionBotones('menuModificarModificarSalas','menuSalas');}); 

	$('.modificarIcono').on("click",mostrarMapa3); 
	$('.linkAbajoModificar').on("click",mostrarMapa3); 

	$('.linkAtrasConsultar').on("click",function(){actionBotones('menuSalas','menuConsultarSalas');}); 
	$('.linkAtrasIngresar').on("click",function(){actionBotones('menuSalas','menuIngresarSalas');}); 
	$('.linkAtrasModificar').on("click",function(){actionBotones('menuSalas','menuModificarSalas');});  
	/*$('.linkAtrasModificar').on("click",ocultaMapa); */ 

	$('.linkAtrasModificarModificar').on("click",function(){actionBotones('menuModificarSalas','menuModificarModificarSalas');});  

	/*$('#modificaCentral1').on("click",mostrarMapa4);*/



}