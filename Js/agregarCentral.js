$(document).on("ready",inicio);

function inicio ()
{
	var map,index,lats,lngs,template,content,lt,ln;
	var nom = $('#nomb').val();
	var dir = $('#dir').val();

	verify();
	agregarMapa();mapMarca();
	$('#quitarMarca').on('click',quitar);
	$('#guardarMarca').on("click",guardar);
	
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

function agregarMapa(){
	
	map = new GMaps({
    	div: '#map',
    	lat:10.174862,
		lng:-67.962385,
		zoom:8
	});
}

function quitar(){
	map.removeMarkers();
	$('#latid').val("");
	$('#longs').val("");
	$('#nomb').val("");
	$('#dir').val("");
	hideAndShow('error','l');
	hideAndShow('success','l');
	$('#error').remove();
	$('#success').remove();
}

function hideAndShow (ocultar,mostrar) {
	$('#'+ocultar).hide("slow");
	$('#'+mostrar).show("slide");
}

/* Funcion que agrega la marca o la quita en el mapa*/
function mapMarca(){
	
	GMaps.on('click', map.map, function(e) {
		hideAndShow('success','1');
	    index = map.markers.length;
	   	lats = e.latLng.lat();
	    lngs = e.latLng.lng();
	    lt = $('#latid');
		ln = $('#longs');
	    template = $('#edit_marker_template').text();
	    content = template.replace(/{{index}}/g, index).replace(/{{lats}}/g, lats).replace(/{{lngs}}/g, lngs);

		if(index == 0){
			map.addMarker({
				lat: lats,
				lng: lngs,
			    });
		    lt.val(lats);
		    ln.val(lngs);
		    }
		else{
		    map.removeMarkers();
		    lt.val("");
		    ln.val("");
		    console.log(lats,lngs);
		    map.addMarker({
				lat: lats,
				lng: lngs,
			    });
		    lt.val(lats);
		    ln.val(lngs);
		}
	});
}

/*function datos(){
	$('#nomb').on("change",function(){
		$('#dir').on("change",function(){
			hideAndShow('error','dsf');
			mapMarca($('#nomb').val(),$('#dir').val())
		});
	});
}*/

function guardar(){
	var nom = $('#nomb').val();
	var dir = $('#dir').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/guardarCentral.php?jsoncallback=?";

	$.getJSON(url,{nom:nom,dir:dir,lat:lats,lng:lngs}).done(function(data){
		$('.titulo').append("<div id='success'>Central Agregada</div>");
		setTimeout(quitar, 2000);
	});
}


