$(document).on("ready",inicio);
var idCentralModificar;
function inicio ()
{
	eventos();	
	mostrarMapa2();
	$('#tablaConsultarCentrales').on('click','.trNew a',function(data){
		ubicacionMapaConsultar($(this).attr('value'));
	});
	$('#tablaModificarCentrales').on('click','.trNew a',function(data){
		ubicacionMapaConsultar2($(this).attr('value'));
	});
}	

function resetear()
{
	$('input[type=text]').val("");
	$(".modificaPosiciones2 li").removeClass("colorOscuro");
	$(".modificaTransitos2 li").removeClass("colorOscuro");
}

function mostrarMapa1(){
	//crea el mapa 
		map = new GMaps({
    	div: '#mapCentral',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mapMarca(){
	$('#latid').text("Latitud de la Central");
	$('#longs').text("Longitud de la Central");
	$('#longs').val("0");

	GMaps.on('click', map.map, function(e) {
	    index = map.markers.length;
	   	lats = e.latLng.lat();
	    lngs = e.latLng.lng();
	    $('#latid').text(lats);
		$('#longs').text(lngs);
		$('#longs').val("1");
	    template = $('#edit_marker_template').text();
	    content = template.replace(/{{index}}/g, index).replace(/{{lats}}/g, lats).replace(/{{lngs}}/g, lngs);

		if(index == 0){
			map.addMarker({
				lat: lats,
				lng: lngs
			    });
		    }
		else{
		    map.removeMarkers();
		    console.log(lats,lngs);
		    map.addMarker({
				lat: lats,
				lng: lngs
			    });
		}
	});
}
function mapMarca2(){

	GMaps.on('click', map.map, function(e) {
	    index = map.markers.length;
	   	lats = e.latLng.lat();
	    lngs = e.latLng.lng();
	    $('#latidModificar').text(lats);
		$('#longsModificar').text(lngs);
	    template = $('#edit_marker_template').text();
	    content = template.replace(/{{index}}/g, index).replace(/{{lats}}/g, lats).replace(/{{lngs}}/g, lngs);

		if(index == 0){
			map.addMarker({
				lat: lats,
				lng: lngs
			    });
		    }
		else{
		    map.removeMarkers();
		    console.log(lats,lngs);
		    map.addMarker({
				lat: lats,
				lng: lngs
			    });
		}
	});
}
function ubicacionMapaConsultar(valor)
{
	map2.removeMarkers();
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:valor}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				map2.addMarker({
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
			/*alert(data.mensajee);*/
		}
	});
}
function ubicacionMapaConsultar2(valor)
{
	mostrarMapa3();
	map3.removeMarkers();
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:valor}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				idCentralModificar=item.idCtrl;
				map3.addMarker({
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
			/*alert(data.mensajee);*/
		}
	});
}
function mostrarMapa2(){
	//crea el mapa 	
		map2 = new GMaps({
    	div: '#mapCentral2',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
	var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	// guarda un array con las latitudes y longitudes
	var markers_data = [];
	var tabla=$("#tablaConsultarCentrales");
	$(".trNew").remove();
	$.getJSON(url).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){	
				tabla.append("<tr class='trNew'><td>"+item.nomCtrl+"</td><td>"+item.dirCtrl+"</td><td><a value="+item.idCtrl+"><span class='linkMapaCentralesConsultar'></span></a></td></tr>")
				markers_data.push({
		            lat : item.latCtrl,
		            lng : item.longCtrl,
		            title : item.nomCtrl,
		            infoWindow: {
				    content : item.nomCtrl
			   		 }
		        });
			});
		// añade los marcadores
		map2.addMarkers(markers_data);
		}
		else{
			
		}
	});
}
function mostrarMapa3(){
	//crea el mapa 
	$('.mapCentralOculto').show("slide");
		map3 = new GMaps({
    	div: '#mapCentral3',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa4(){
	
	actionBotones('menuModificarModificarCentrales','menuModificarCentrales');  
	//crea el mapa 
	$('.mapCentralOculto').show("slide");
		map = new GMaps({
    	div: '#mapCentral4',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
	mapMarca2();
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:idCentralModificar}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				idCentralModificar=item.idCtrl;
				$("#modificarCentralCentrales").val(item.nomCtrl);
				$("#modificarDireccionCentrales").val(item.dirCtrl);
				$("#latidModificar").text(item.latCtrl);
				$("#longsModificar").text(item.longCtrl);
				map.addMarker({
				  lat: item.latCtrl,
				  lng: item.longCtrl,
				  title: item.nomCtrl,
				  infoWindow: {
				    content : item.nomCtrl
			   		 }
				});
			});
		}
		else{
			/*alert(data.mensajee);*/
		}
	});
}
function llenarDatosParaModificar()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	// guarda un array con las latitudes y longitudes
	var tabla=$("#tablaModificarCentrales");
	var contar=0;
	$(".trNew").remove();
	$.getJSON(url).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){	
				contar++;
				if(contar%2==0)
				{
					tabla.append("<tr class='trNew'><td>"+item.nomCtrl+"</td><td>"+item.dirCtrl+"</td><td><a value="+item.idCtrl+"><span class='linkMapaCentralesModificar'></span></a></td></tr>");
				}
				else
				{
					tabla.append("<tr class='trNew'><td>"+item.nomCtrl+"</td><td>"+item.dirCtrl+"</td><td><a value="+item.idCtrl+"><span class='linkMapaCentralesModificar2'></span></a></td></tr>");
				}
				
			});
		}
		else{
			
		}
	});
}
function buscarCentralesModificar() 
{
	$(".mapCentralOculto").hide("slide");

	var texto = $("#textoBusqueda1").val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarCentrales.php?jsoncallback=?";
	var contar=0;
	var tabla=$("#tablaModificarCentrales");
	$(".trNew").remove();
	$.getJSON(url,{nom:texto}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){	
				contar++;
				if(contar%2==0)
				{
					tabla.append("<tr class='trNew'><td>"+item.nomCtrl+"</td><td>"+item.dirCtrl+"</td><td><a value="+item.idCtrl+"><span class='linkMapaCentralesModificar'></span></a></td></tr>");
				}
				else
				{
					tabla.append("<tr class='trNew'><td>"+item.nomCtrl+"</td><td>"+item.dirCtrl+"</td><td><a value="+item.idCtrl+"><span class='linkMapaCentralesModificar2'></span></a></td></tr>");
				}
				
			});
		}
		else{
			
		}
	});

}
function buscarCentralesConsultar() 
{
	var texto = $("#textoBusqueda2").val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarCentrales.php?jsoncallback=?";
	var tabla=$("#tablaConsultarCentrales");
	$(".trNew").remove();
	$.getJSON(url,{nom:texto}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){	
				tabla.append("<tr class='trNew'><td>"+item.nomCtrl+"</td><td>"+item.dirCtrl+"</td><td><a value="+item.idCtrl+"><span class='linkMapaCentralesConsultar'></span></a></td></tr>");
				
			});
		}
		else{
			
		}
	});

}
function modificarLasCentrales() 
{
	var centralNombre=$("#modificarCentralCentrales").val();
	var centralDir=$("#modificarDireccionCentrales").val();
	var latitudCentral=$("#latidModificar").text();
	var longitudCentral=$("#longsModificar").text();

	if(centralNombre!="" && centralNombre!=" " && centralNombre!="  " && centralNombre!="   ")
	{
		if(centralDir!="" && centralDir!=" " && centralDir!="  " && centralDir!="   ")
		{
			var url = "http://127.0.0.1/Cantv/jsonCantv/modificarCentral.php?jsoncallback=?";

			$.getJSON(url,{nom:centralNombre,dir:centralDir,lat:latitudCentral,lon:longitudCentral,id:idCentralModificar}).done(function(data)
			{
				alert("Central Modificada");				
			});
		}
		else
		{
			alert("Ingrese una dirección válida para la central");
		}
	}
	else
	{
		alert("Ingrese un nombre válido para la central");
	}

}
function eliminarLasCentrales() 
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarCentral.php?jsoncallback=?";

			$.getJSON(url,{id:idCentralModificar}).done(function(data)
			{
				alert("Central Eliminada");
				llenarDatosParaModificar();
				$(".mapCentralOculto").hide("slide");			
			});
}
function ocultaMapa()
{
	$('.mapCentralOculto').hide();
}
function ingresarCentral()
{
	var comprobarClickMapa = $("#longs").val();
	var longitudd = $("#longs").text();
	var latitudd = $("#latid").text();
	var central = $("#ingresarCentralCentrales").val();
	var direccion = $("#ingresarDireccionCentrales").val();
	if(comprobarClickMapa!=0)
	{
		if(central!="" && central!=" " && central!="  " && central!="   ")
		{
			if(direccion!="" && direccion!=" " && direccion!="  " && direccion!="   ")
			{
				var url = "http://127.0.0.1/Cantv/jsonCantv/guardarCentral.php?jsoncallback=?";

				$.getJSON(url,{nom:central,dir:direccion,lat:latitudd,lng:longitudd}).done(function(data){
					alert("Central Agregada");
					resetear();
					$("#longs").text("Longitud de la Central");
					$("#longs").val("0");
					$("#latid").text("Latitud de la Central");
					map.removeMarkers();
				});
			}
			else
			{
				alert("Ingrese una direccion válida");
			}
			}
		else
		{
			alert("Ingrese un nombre para la central válido");
		}
	}
	else
	{
		alert("Seleccione la ubicación de la central en el mapa");
	}
}
function aparecerModificado()
{
	ubicacionMapaConsultar2(idCentralModificar);
	llenarDatosParaModificar();
}
function eventos()
{
	$('.consultarIconoCentralesNewDesign').on("click",function(){actionBotones('menuConsultarCentrales','menuCentrales');}); 
	$('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultarCentrales','menuCentrales');}); 

	$('.ingresarIconoCentralesNewDesign').on("click",function(){actionBotones('menuIngresarCentrales','menuCentrales');}); 
	$('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresarCentrales','menuCentrales');}); 

	$('.consultarIconoCentralesNewDesign').on("click",mostrarMapa2); 
	$('.linkAbajoConsultar').on("click",mostrarMapa2); 

	$('.ingresarIconoCentralesNewDesign').on("click",mostrarMapa1); 
	$('.linkAbajoIngresar').on("click",mostrarMapa1); 

	$('.ingresarIconoCentralesNewDesign').on("click",mapMarca); 
	$('.linkAbajoIngresar').on("click",mapMarca); 

	$('.modificarIconoCentralesNewDesign').on("click",function(){actionBotones('menuModificarCentrales','menuCentrales');}); 
	$('.linkAbajoModificar').on("click",function(){actionBotones('menuModificarCentrales','menuCentrales');}); 

	$('.modificarIconoCentralesNewDesign').on("click",llenarDatosParaModificar); 
	$('.linkAbajoModificar').on("click",llenarDatosParaModificar); 

	$('.linkAtrasConsultar').on("click",function(){actionBotones('menuCentrales','menuConsultarCentrales');}); 
	$('.linkAtrasIngresar').on("click",function(){actionBotones('menuCentrales','menuIngresarCentrales');}); 
	$('.linkAtrasModificar').on("click",function(){actionBotones('menuCentrales','menuModificarCentrales');});  
	$('.linkAtrasModificar').on("click",ocultaMapa);  

	$('.linkAtrasModificarModificar').on("click",function(){actionBotones('menuModificarCentrales','menuModificarModificarCentrales');});  

	$('.linkAtrasModificarModificar').on("click",aparecerModificado);

	$('#modificaCentral1').on("click",mostrarMapa4);

	$("#ingresarCentralAceptar").on("click",ingresarCentral);

	$("#dibujoConsultar").on("click",buscarCentralesModificar);

	$("#dibujoConsultar2").on("click",buscarCentralesConsultar);

	$("#modificarCentralAceptar").on("click",modificarLasCentrales);

	$("#eliminaCentral1").on("click",eliminarLasCentrales);
}