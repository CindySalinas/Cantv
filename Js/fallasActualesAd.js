$(document).on("ready",inicio);

function inicio ()
{
	 cargarPerfil();
	 doMap();
	 var map;
	 $('#map').css({'height': '300px'});

}	

/* Carga el perfil si no existe, devuelve al login*/
function cargarPerfil(){
	var ckie= $.cookie('adminSis');
	if(ckie != undefined){
		datosPerfil(ckie);
	}
	else{
		location.href = "../index.html";
	}
}
function ubicacionMapaConsultar2(id)
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultaFallaId.php?jsoncallback=?";
	map.removeMarkers();
	var markers_data = [];
	$.getJSON(url,{idd:id}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item)
			{	
				map = new GMaps({
			    	div: '#map',
			    	lat:item.latitud,
					lng:item.longitud,
					zoom:10
				});
				markers_data.push({
		            lat : item.latitud,
		            lng : item.longitud,
		            title : item.nombreCentral,
		            infoWindow: {
				    content : item.descri
			   		 }
		        });
		        map.addMarkers(markers_data);
			});
		// añade los marcadores
		}
		else{
			/*alert(data.mensaje);*/
		}
	});

}
function doMap(){
	//crea el mapa 
	map = new GMaps({
    	div: '#map',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
	var elDiv=$("#mamamama");
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFalla.php?jsoncallback=?";
	// guarda un array con las latitudes y longitudes
	var markers_data = [];
	$.getJSON(url).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item)
			{	
				elDiv.append("<span class='separarTexto'>Enlace: "+item.numEnla+" Fecha: "+item.fecha+" Hora: "+item.hora+" <a value='"+item.idFall+"' class='linkVer'>Ver en el Mapa</a></span><hr>");
				markers_data.push({
		            lat : item.latitud,
		            lng : item.longitud,
		            title : item.nombreCentral,
		            infoWindow: {
				    content : item.descri
			   		 }
		        });
			});
			$( "a" ).click(function() 
			{
				ubicacionMapaConsultar2($(this).attr('value'));
			});
		// añade los marcadores
		    map.addMarkers(markers_data);
		}
		else{
			/*alert(data.mensaje);*/
		}
	});

}

function datosPerfil(name){
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	$.getJSON(url,{namePerf:name}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$('#fotoPerfil').append("<a href='perfil.html'><img src='../Img/fotoPerfil/"+item.ftPerfil+"'></a>");
				$('#perfilGrande').append("<img src='../Img/fotoPerfil/"+item.ftPerfil+"'><a href='#' title="+'Cambiar Foto'+">Foto de Perfil</a>");
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
			location.href = "../index.html";
		}
	});
}
