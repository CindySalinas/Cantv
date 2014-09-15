$(document).on("ready",inicio);

function inicio ()
{
	$("#botonImprimir").on("click",imprimiendo);
}	
function imprimiendo()
{
	window.print();
}