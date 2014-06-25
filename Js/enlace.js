$(document).on("ready",inicio);

function inicio ()
{
	var map;
	mostrarMapa();
	ocultar();
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