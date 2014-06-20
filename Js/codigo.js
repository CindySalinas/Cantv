$(document).on("ready",inicio);

function inicio ()
{
	tabsPerfil();
	$('.btn_login').on("click",moverCarro);
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


function moverCarro(){
	/*var btn = $('#btn_login');*/
	//var urls = "http://127.0.0.1/Venezuela90/JsonVenezuela90/iniciarSesion.php?jsoncallback=?";
	var urls = "http://facebook.com"
	$('.carro').addClass("moverCarro");
	 $.ajax({
	    url:urls, 
	    type:'POST', 
	    beforeSend: function(){
	    	$('.carro').css({'text-align':'left'});
			$('.carro').addClass("moverCarro");
		},
		success: function(){
			$('.login_form').submit();
		},
		error: function(){
			$('.carro').removeClass("moverCarro");
			alert("Error de Login");
		}
	});	
}
