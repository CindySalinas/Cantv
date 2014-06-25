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
}	

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