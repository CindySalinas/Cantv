$(document).on("ready",inicio);

function inicio ()
{
	 cargarPerfil();
	 mostrarMapa();
	 llenarSelect();
	 var map;
	 marcarMapa();
	 $('#guardarMarca').on('click',guardarSala);
}	

function cargarPerfil(){
	var ckie= $.cookie('adminSis');
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

function mostrarMapa(){
	//crea el mapa 
	map = new GMaps({
    	div: '#map',
    	lat:10.174862,
		lng:-67.962385,
		zoom:8
	});
}

//se llena el select con las centrales
function llenarSelect(){
	 var sel = $('#slCentral');
	 var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	 $.getJSON(url).done(function(data){
	 	$.each(data,function(i,item){
	 		sel.append("<option value="+item.idCtrl+">"+item.nomCtrl+"</option>");
	 	});
	 })
}

//Añade la Marca
function marcarMapa(){
	var id;
	$('#slCentral').on("change",function(){
		id = $('#slCentral').val();
		map.removeMarkers();
		crearMarca(id);
	})
}

// Carga los datos para añadir la marca
function crearMarca(id){
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	$.getJSON(url,{idCentral:id}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				map.addMarker({
				  lat: item.latCtrl,
				  lng: item.longCtrl,
				  title: item.nomCtrl,
				  infoWindow: {
				    content : item.dirCtrl
			   		 }
				});
			});
		}
		else{
			alert(data.mensajee);
		}
	})
}

function guardarSala(){
	var nom = $('#nomb').val();
	var desc = $('#textA').val();
	var piso = $('#piso').val();
	var cnt= $('#slCentral').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/guardarSala.php?jsoncallback=?";

	$.getJSON(url,{nom:nom,desc:desc,piso:piso,cnt:cnt}).done(function(data){
		alert(data.mensaje);
	})
	resets();
}

function resets(){
	$('input:Text').val("");
	$('textarea').val("");
}
function validar(){
	if($('#nomb').val("") || $('#textA').val("") || $('#piso').val("")){
		alert('No pueden haber campos vacios');
	}
	else
	{
		guardarSala();

	}
}