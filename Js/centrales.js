$(document).on("ready",inicio);

function inicio ()
{
	ocultar();
	eventos();	
}	

function ocultar()
{
	$('.menuConsultarCentrales').hide();	
	$('.menuIngresarCentrales').hide();
	$('.menuModificarCentrales').hide();
	$('.mapCentralOculto').hide();
	$('.menuModificarModificarCentrales').hide();
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
    	div: '#mapCentral',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa2(){
	//crea el mapa 	
		map2 = new GMaps({
    	div: '#mapCentral2',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa3(){
	//crea el mapa 
	$('.mapCentralOculto').show("slide");
		map3 = new GMaps({
    	div: '#mapCentral3',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa4(){
	
	actionBotones('menuModificarModificarCentrales','menuModificarCentrales');  
	//crea el mapa 
	$('.mapCentralOculto').show("slide");
		map4 = new GMaps({
    	div: '#mapCentral4',
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
	$('.consultarIconoCentralesNewDesign').on("click",function(){actionBotones('menuConsultarCentrales','menuCentrales');}); 
	$('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultarCentrales','menuCentrales');}); 

	$('.ingresarIconoCentralesNewDesign').on("click",function(){actionBotones('menuIngresarCentrales','menuCentrales');}); 
	$('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresarCentrales','menuCentrales');}); 

	$('.consultarIconoCentralesNewDesign').on("click",mostrarMapa2); 
	$('.linkAbajoConsultar').on("click",mostrarMapa2); 

	$('.ingresarIconoCentralesNewDesign').on("click",mostrarMapa1); 
	$('.linkAbajoIngresar').on("click",mostrarMapa1); 

	$('#buscarCentral').on("click",mostrarMapa3); 

	$('.modificarIconoCentralesNewDesign').on("click",function(){actionBotones('menuModificarCentrales','menuCentrales');}); 
	$('.linkAbajoModificar').on("click",function(){actionBotones('menuModificarCentrales','menuCentrales');}); 

	$('.linkAtrasConsultar').on("click",function(){actionBotones('menuCentrales','menuConsultarCentrales');}); 
	$('.linkAtrasIngresar').on("click",function(){actionBotones('menuCentrales','menuIngresarCentrales');}); 
	$('.linkAtrasModificar').on("click",function(){actionBotones('menuCentrales','menuModificarCentrales');});  
	$('.linkAtrasModificar').on("click",ocultaMapa);  

	$('.linkAtrasModificarModificar').on("click",function(){actionBotones('menuModificarCentrales','menuModificarModificarCentrales');});  

	$('#modificaCentral1').on("click",mostrarMapa4);



}