$(document).on("ready",inicio);

function inicio(){
	cargarPerfil();
}

function cargarPerfil(){
	tabsPerfil();
	var ckie= $.cookie('tecSis');
	if(ckie != undefined){
		datosPerfil(ckie);
	}
	else{
		location.href = "../index.html";
	}
}

function datosPerfil(name){
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	$.getJSON(url,{namePerf:name}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$('#fotoPerfil').append("<a href='perfil.html'><img src='../"+item.ftPerfil+"'></a>");
				$('#perfilGrande').append("<img src='../"+item.ftPerfil+"'><a href='#' title="+'Cambiar Foto'+">Foto de Perfil</a>");
				$('#nomUsr').append(item.nom);
				$('#appUsr').append(item.apll)
				$('#mailUsr').append(item.mails)
				$('#fechUsr').append(item.fechaNac)
				$('#cargoUsr').append(item.rol)
				$('#celUsr').append(item.telf)
			//	$('#edoUsr').append(item.)
			//	$('#muniUsr').append(item.)
			});
		}
		else{
			$('.titulo').append("<div id='error'>"+data.mensaje+"</div>");
		}
	});
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
