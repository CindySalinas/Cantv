$(document).on("ready",inicio);

function inicio ()
{
	 cargarPerfil();
	 doMap();
	 marcarMapa();
	 var map;
}	

/* Carga el perfil si no existe, devuelve al login*/
function cargarPerfil(){
	var ckie= $.cookie('tecSis');
	if(ckie != undefined){
		datosPerfil(ckie);
	}
	else{
		location.href = "../index.html";
	}
}

function doMap(){
	//crea el mapa 
	map = new GMaps({
    	div: '#map',
    	lat:10.174862,
		lng:-67.962385,
		zoom:8
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


function marcarMapa(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/guardarCentral.php?jsoncallback=?";

	GMaps.on('click', map.map, function(e) {
    	var index = map.markers.length;
   		var lats = e.latLng.lat();
    	var lngs = e.latLng.lng();

    	var template = $('#edit_marker_template').text();

    	var content = template.replace(/{{index}}/g, index).replace(/{{lats}}/g, lats).replace(/{{lngs}}/g, lngs);
   		
   		$.getJSON(url,{nom:'prueba',dir:'morro 1',lat:lats,lng:lngs}).done(function(data){
   			alert(data.mensaje);
   		});
   		/*doMap();
   		$.getJSON(url2)
	    map.addMarker({
	      lat: lat,
	      lng: lng,
	      title: 'Marker #' + index,
	      infoWindow: {
	        content : content
	      }
	    });
		console.log(lats,lngs);*/
 	 });
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