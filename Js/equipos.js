$(document).on("ready",inicio);

function inicio ()
{
	var map;
	mostrarMapa();
}	


function mostrarMapa(){
	//crea el mapa 
	map = new GMaps({
    	div: '#map',
    	lat:10.174862,
		lng:-67.962385,
		zoom:8
	});
}