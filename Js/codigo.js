$(document).on("ready",inicio);

function inicio ()
{
	tabsPerfil();
}


function tabsPerfil(){
	$('#tab1').on("click",function(){
		$('#tab1').hover();
		hideAndShow("tabs2","tabs1");
	})
	$('#tab2').on("click",function(){
		$('#tab2').hover();
		$('#calendario').css({"margin-top":0});
		hideAndShow("tabs1","tabs2");
	})
}

function hideAndShow (ocultar,mostrar) {
	$('#'+ocultar).hide("slow");
	$('#'+mostrar).show("slide");
}
