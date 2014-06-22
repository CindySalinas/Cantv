$(document).on("ready",inicio);

function inicio ()
{
	 cargarPerfil();
	 doMap();
}	

/* Carga el perfil si no existe, devuelve al login*/
function cargarPerfil(){

	var ckie = $.cookie('adminSis');
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	if(ckie == undefined){
		location.href = "index.html";
	}
	else{
		$.getJSON(url,{namePerf:ckie}).done(function(data){
			if(data.num != 0){
				$.each(data,function(i,item){
					$('#fotoPerfil').append("<img src='"+item.ftPerfil+"'>");
				});
			}
			else{
				alert(data.mensaje);
				location.href = "index.html";
			}
		});
	}
}

function doMap(){
	//crea el mapa 
	var map = new GMaps({
    	div: '#map',
    	lat:10.174862,
		lng:-67.962385,
		zoom:9
	});
	var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	// guarda un array con las latitudes y longitudes
	var markers_data = [];
	$.getJSON(url).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){	
				markers_data.push({
		            lat : item.latCtrl,
		            lng : item.longCtrl,
		            title : item.nomCtrl
		        })
			});
		// añade los marcadores
		map.addMarkers(markers_data);
		}
		else{
			alert(data.mensaje);
		}
	})

}
