$(document).on("ready",inicio);

function inicio ()
{
	var map;
	verify();
	agregarMarca();
	$('#quitarMarca').on('click',quitar);
}	

function verify(){
	var ckie = $.cookie('adminSis');
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	if(ckie == undefined){
		location.href = "../index.html";
	}
	else{
		$.getJSON(url,{namePerf:ckie}).done(function(data){
			if(data.num != 0){
				$.each(data,function(i,item){
					$('#fotoPerfil').append("<img src='../"+item.ftPerfil+"'>");
				});
			}
			else{
				alert(data.mensaje);
				location.href = "index.html";
			}
		});
	}
}

function agregarMarca(){

	map = new GMaps({
    	div: '#map',
    	lat:10.174862,
		lng:-67.962385,
		zoom:8
	});

	GMaps.on('click', map.map, function(e) {
    	var index = map.markers.length;
   		var lats = e.latLng.lat();
    	var lngs = e.latLng.lng();

    	var template = $('#edit_marker_template').text();

    	var content = template.replace(/{{index}}/g, index).replace(/{{lats}}/g, lats).replace(/{{lngs}}/g, lngs);
   		
   		/*$.getJSON(url,{nom:'prueba',dir:'morro 1',lat:lats,lng:lngs}).done(function(data){
   			alert(data.mensaje);
   		});*/

	 	var nom = $('#nomb').val();
		var dir = $('#dir').val();
	    var lt = $('#latid').val(lats);
		var ln = $('#longs').val(lngs);
	    map.addMarker({
	      lat: lats,
	      lng: lngs,
	      title: nom,
	      infoWindow: {
	        content : dir
	      }
	    });
		$('#guardarMarca').on('click',function(){

			if(index < 1){
				alert(index)
			}
			else{
				alert("no")
			}
		})
		//if(index >1 )
 	 });
}

function quitar(){
	map.removeMarkers();
}