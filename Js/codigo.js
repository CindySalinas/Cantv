$(document).on("ready",inicio);

function inicio ()
{
	tabsPerfil();
	$('.btn_login').on("click",doLogin);
	escucharEnter();
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

function doLogin(){
	$('.carro').css({'text-align':'left'});
	$('.carro').attr('id','moverCarro');	
	setTimeout(login, 4000);	
}

function login(){
	var values = $('.login_form').serialize();
	var url = "http://127.0.0.1/Cantv/jsonCantv/access.php?jsoncallback=?";
	
	$.getJSON(url,values).done(function(datos) {
		if(datos.validacion > 0 && datos.T== 1){       
            /// Si La Validacion Es Correcta, Muestra La Página Principal de Administracion 
           location.href='pagina1.html';
        }
    	else
         {	
         	$('.carro').css({'text-align':'center'});
			$('.carro').removeAttr('id');
            $('.usuarios').css({"border":"2px solid rgb(242,20,20)"});
            $('#usr').val("").attr("placeholder","usuario incorrector");
            $('#pwd').val("").attr("placeholder","password incorrector");
         }
	});

}

function escucharEnter(){
    $(document).keypress(function(e) {
    if(e.which == 13) {
       // alert('You pressed enter!');
       doLogin();
    }
});
}