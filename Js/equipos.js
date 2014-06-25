$(document).on("ready",inicio);

function inicio ()
{
	var map2,map3;
	mostrarMapa();
	noDisplay();
	menuPrin();
	llenarSelects();
	nuevoEquipoMarca();
	llenarSelectCentral();
	llenarTablaEquipos1();
	llenarTablaEquipos2();
	$('#dibujoConsultar').on('click',consultarEquipos);
	$('#textoBusqueda1').on('change',consultarEquipos);
	$('#buscarEquipo2').on('change',consultarEquipos2);
	$('#centrales').on('change',cargarSala);
	$('.centrales').on('change',cargarSala2);
	$('#aceptarEquipo').on('click',ingresarEquipo);
	$('#modificarEquipo2').on('click',modficar);
	$('#tablaConsultarDatos2').on('click','a',function(data){
		modificarLlenar($(this).attr('name'));
		llenarTablaDatosCentral($(this).attr('value'));			
		});
	$('#tablaConsultarDatos1').on('click','.newTr a',function(data){
		llenarTablaDatosCentral($(this).attr('value'));
	});
	$('#eliminarEquipo1').on('click',eliminar);
}	

function menuPrin(){
	$('#consultarEquipos , #consultarEquipos2').on('click',function(){
		hideAndShow('consEquipo','modEquipos ,#ingEquipo,#contenedorMenuClientes');
	});
    $('#modificarEquipos , #modificarEquipos2').on('click',function(){
    	hideAndShow('modEquipos','consEquipo ,#ingEquip,#contenedorMenuClientes');
    });
	$('#ingresarEquipos, #ingresarEquipos2').on('click',function(){
		hideAndShow('ingEquipo','modEquipos,#consEquipo,#contenedorMenuClientes');
	});
	$('.atras').on('click',function(){
		hideAndShow('contenedorMenuClientes','modEquipos,#consEquipo,#ingEquipo');
		hideAndShow('contenedorMenuClientes','tablaConsultarDatos,#tablaConsultarEquipos,#tablaConsultarEquipos2');
		map2.removeMarkers();
		map3.removeMarkers();
		resets();
	});
	$('.atras2').on('click',function(){
		hideAndShow('modEquipos','modEquipos2');
		resets();
	});
	$('#modificarEquipo1').on('click',function(){
		hideAndShow('modEquipos2','modEquipos');
	});
}

function noDisplay(){
	$('#consEquipo ,#modEquipos,#modEquipos2,#ingEquipo').hide();
	// tabla de ingreso
	$('#tipoNM,#marcaNM,#salaCen,#salaCen2').hide();
}

function mostrarMapa(){
	//crea el mapa 
	map2 = new GMaps({
    	div: '#map2',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
	map3 = new GMaps({
    	div: '#map3',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}


function hideAndShow (mostrar,ocultar) {
	$('#'+ocultar).hide("slow");
	$('#'+mostrar).show("slide");
}

function resets(){
	$('input:text').val("");
}


function consultarEquipos(){
	var busc = $('#textoBusqueda1').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarEquipos.php?jsoncallback=?";
	var tabla = $('#tablaConsultarDatos1 ');
	var tabla2 = $('#tablaConsultarDatos2 ');
	$('.newTr').remove();
	$('.newTr2').remove();
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});
				tabla2.css({'display':'inline-table','margin':'10px auto'});
				tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'s</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquipos" value='+item.idSala+'></a></td></tr>');

				tabla2.append('<tr class="newTr2"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'s</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquipos" value='+item.idSala+'></a></td></tr>');
			/*	$('.newTr').on('click','a',function(data){
					//$('#contMapa2').css({'display':'inline-table','margin':'10px auto'});
					llenarTablaDatosCentral($(this).attr('value'));
				});*/
			});
		}
		else{
			alert(data.mensaje);
		}
	});
}

function consultarEquipos2(){
	var busc = $('#buscarEquipo2').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarEquipos.php?jsoncallback=?";
	var tabla = $('#tablaConsultarDatos2 ');
	$('.newTr').remove();
	$('.newTr2').remove();
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});
				tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'s</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquipos" value='+item.idSala+'></a></td></tr>');
			});
		}
		else{
			alert(data.mensaje);
		}
	});
}
// primera tabla  con los datos de los equipos
function llenarTablaEquipos1(){
	var tabla = $('#tablaConsultarDatos1 ');
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEquipos.php?jsoncallback=?";
	tabla.css({'display':'inline-table','margin':'10px auto'});
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				

				tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquipos" value='+item.idSala+'></a></td></tr>');
				


			});
		}
		else{
			alert(data.mensaje);
		}
	});
}
function llenarTablaEquipos2(){
	var tabla = $('#tablaConsultarDatos2 ');
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEquipos.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
		if(data.num != 0){

			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});

				tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquipos" value='+item.idSala+' name='+item.idEquipo+'></a></td></tr>');
				
			});
		}
		else{
			alert(data.mensaje);
		}
	});
}
// mostrar el mapa y la ubicacion de la consulta de equipos
function crearMarca(id){
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	map2.removeMarkers();
	map3.removeMarkers();
	// marca el mapa
	$.getJSON(url,{idCentral:id}).done(function(data){
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
			alert(data.mensajee);
		}
	});
}

function llenarTablaDatosCentral(id){
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarSalas.php?jsoncallback=?";
 	var tabla = $('#tablaConsultarEquipos');
 	var tabla2 = $('#tablaConsultarEquipos2');
 	$('.newTr2').remove();
 	//llena la tabla
	$.getJSON(url,{idSala:id}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				crearMarca(item.idCentral)
				tabla.css({'display':'inline-table','margin':'10px auto'});
				tabla2.css({'display':'inline-table','margin':'10px auto'});
				tabla.append('<tr class="newTr2"><td class="leftTabla">Central:</td><td class="rightTabla">'+item.nomC+'</td><td class="leftTabla">Sala:</td><td class="rightTabla">'+item.nomb+'</td><td >Piso:</td><td >'+item.piso+'</td></tr>');

				tabla2.append('<tr class="newTr2"><td class="leftTabla">Central:</td><td class="rightTabla">'+item.nomC+'</td><td class="leftTabla">Sala:</td><td class="rightTabla">'+item.nomb+'</td><td >Piso:</td><td >'+item.piso+'</td></tr>');
				
			});
		}
		else{
			alert(data.mensaje);
		}
	});
}
// carga las marcar
function llenarSelects(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/mostrarEquipos.php?jsoncallback=?";
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/mostrarMarcas.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
		if(data.num!=0){
			$.each(data,function(i,item){
				$('#tiposEquipo').append('<option value="'+item.idTipo+'">'+item.tipoE+'</option>');
				$('.tiposEquipo').append('<option value="'+item.idTipo+'">'+item.tipoE+'</option>');
			})
		}
		else{
			alert(data.mensaje)
		}
	});
	$.getJSON(url2).done(function(data){
		if(data.num!=0){
			$.each(data,function(i,item){
				$('#marcaEquipo').append('<option value="'+item.idMarca+'">'+item.marca+'</option>');
				$('.marcaEquipo').append('<option value="'+item.idMarca+'">'+item.marca+'</option>');
			})
		}
		else{
			alert(data.mensaje)
		}
	})
}
// cuando se ingresa una nueva marca
function nuevoEquipoMarca(){
	var marca = $('#marcaEquipo option:selected').val();
	$('#linkNuevoTipoEquipo').on('click',function(){
		hideAndShow('tipoNM','listaE');
		$('#linkSeleccionarTipoEquipo').on('click',function(){
			alert()
			insertarEquipo($('#marcaEquipo option:selected').val());
			hideAndShow('listaE','tipoNM');
		})
	});

	$('#linkNuevaMarca').on('click',function(){
		hideAndShow('marcaNM','listaM');
		$('#linkSeleccionarMarca').on('click',function(){
			insertarMarca();
			hideAndShow('listaM','marcaNM');
		})
	});

}


//se llena el select con las centrales
function llenarSelectCentral(){
	 var sel = $('#centrales');
	 var sel2 = $('.centrales');
	 var url = "http://127.0.0.1/Cantv/jsonCantv/marcadorCentrales.php?jsoncallback=?";
	 $.getJSON(url).done(function(data){
	 	$.each(data,function(i,item){
	 		sel.append("<option value="+item.idCtrl+">"+item.nomCtrl+"</option>");
	 		sel2.append("<option value="+item.idCtrl+">"+item.nomCtrl+"</option>");
	 	});
	 })
}

// cargar en ingreso
function cargarSala(){
	var sel = $('#centrales').val();
    var sala= $('#salaCentral');
    var sala2= $('.salaCentral');
    $('.newOp').remove();
    hideAndShow('salaCen,#salaCen2','asd');

	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarSalas.php?jsoncallback=?";

	 $.getJSON(url,{idCentral: sel}).done(function(data){
	 	$.each(data,function(i,item){

	 		if(item.idSala !=undefined){
	 			sala.append("<option class='newOp' value="+item.idSala+">"+item.nomb+"</option>");
	 			sala2.append("<option class='newOp' value="+item.idSala+">"+item.nomb+"</option>");
	 			$('#aceptarEquipo,#modificarEquipo2 ,#eliminarEquipo1').show();

	 		}
	 		else{
	 			 hideAndShow('asd','salaCen,salaCen2 ,#aceptarEquipo,#modificarEquipo2 ,#eliminarEquipo1');
	 			alert("No hay salas para esta central, primero cree la sala");
	 		}

	 	});
	 })
}
// cargar en modi
function cargarSala2(){
	var sel = $('.centrales').val();
    var sala= $('.salaCentral');
    $('.newOp').remove();
    hideAndShow('salaCen,#salaCen2','asd');

	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarSalas.php?jsoncallback=?";

	 $.getJSON(url,{idCentral: sel}).done(function(data){
	 	$.each(data,function(i,item){

	 		if(item.idSala !=undefined){
	 			sala.append("<option class='newOp' value="+item.idSala+">"+item.nomb+"</option>");
	 			$('#modificarEquipo2 ,#eliminarEquipo1').show();

	 		}
	 		else{
	 			 hideAndShow('asd','salaCen2 ,#modificarEquipo2 ,#eliminarEquipo1');
	 			alert("No hay salas para esta central, primero cree la sala");
	 		}

	 	});
	 })
}

function ingresarEquipo(){
	var func = $('#func1').val();
	var ubi = $('#ubi1').val();
	var piso = $('#piso1').val();
	var sala = $('#salaCentral option:selected').val();
	var condi = $('#idCondi option:selected').val();
	var tipo, marca;
	var url = "http://127.0.0.1/Cantv/jsonCantv/agregarEquipo.php?jsoncallback=?";

	
	if($('#listaE').is(":visible") && $('#listaM').is(":visible")){
		tipo = $('#tipoN').val();
		marca = $('#marcaN').val();
	}
	else{
		tipo = $('#tiposEquipo option:selected').val();
		marca = $('#marcaEquipo option:selected').val();
	}

	$.getJSON(url,{idSala:sala,tipoE:tipo,condi:condi,fun:func,Ubi:ubi}).done(function(data){
		alert(data.mensaje);
		resets();
	});
}


// Agrega un nuevo Equipo
function insertarEquipo(idMarca){
	var tipo = $('#tipoN').val();
	
	var url = "http://127.0.0.1/Cantv/jsonCantv/ingresarEquipo.php?jsoncallback=?";
	$.getJSON(url,{tipoE:tipo,idMarca:idMarca}).done(function(data){
		alert(data.mensaje);
		$('#tiposEquipo option').remove();
		$('#marcaEquipo option').remove();
		llenarSelects()
		//hideAndShow('listaE','tipoNM');
	})
}
// Agrega la marca
function insertarMarca(){
	var marca = $('#marcaN').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/ingresarMarca.php?jsoncallback=?";
	$.getJSON(url,{marca:marca}).done(function(data){
		alert(data.mensaje);
		$('#tiposEquipo option').remove();
		$('#marcaEquipo option').remove();
		llenarSelects()
		//hideAndShow('listaE','tipoNM');
	})
}

function modificarLlenar(id){
	//idEquipo
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarEquipo.php?jsoncallback=?";
	$.getJSON(url,{idE:id}).done(function(data){
		$.each(data,function(i,item){
			var idEq = $('#idEquipo').val(item.idEquipo)
			var func = $('#func2').val(item.func);
			var ubi = $('#ubic2').val(item.ubic);
			//var piso = $('#fila2').val(item.);
			var sala = $('.salaCentral option:selected').val(item.idSala);
			var condi = $('.idCondi option:selected').val(item.idCond);
			var tipo = $('.tiposEquipo option:selected').val(item.idTipoE);
			var marca = $('.marcaEquipo opction:selected').val(item.idMarca);
		});
	})
}	

function modficar(){
	var idEq = $('#idEquipo').val()
	var func = $('#func2').val();
	var ubi = $('#ubic2').val();
	//var piso = $('#fila2').val(item.);
	var sala = $('.salaCentral option:selected').val();
	var condi = $('.idCondi option:selected').val();
	var tipo = $('.tiposEquipo option:selected').val();
	var marca = $('.marcaEquipo opction:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/modificarEquipo.php?jsoncallback=?";

	$('#tablaConsultarDatos2 .newTr').remove();
	$.getJSON(url,{idTp: tipo,idSal:sala,idCn:condi,funcP:func,ubic:ubi,idE:idEq}).done(function(data){
		alert(data.mensaje);
		llenarTablaEquipos2();
		hideAndShow('modEquipos','modEquipos2');
	})
}
function eliminar(){
	var idEq = $('#idEquipo').val();
	$('#tablaConsultarDatos2 .newTr').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/modificarEquipo.php?jsoncallback=?";
	$.getJSON(url,{id:idEq}).done(function(data){
		alert(data.mensaje);
		llenarTablaEquipos2();
		hideAndShow('modEquipos','modEquipos2');
	})
/*	idTp
idSal
idCn
funcP
ubic
idE*/
}