$(document).on("ready",inicio);
var tipoNuevoSelectIngresar=0, marcaNuevoSelectIngresar=0;
function inicio ()
{
	var map2,map3;
	noDisplay();
	menuPrin();
	llenarSelects();
	llenarSelectCentral();
	$('#dibujoConsultar').on('click',consultarEquipos);
	$('#dibujoConsultar2').on('click',consultarEquipos2);
	
	$('#centrales').on('change',cargarSala);
	
	$('#centralParaModificar').on('change',cargarSala2);

	$('#aceptarEquipo').on('click',ingresarEquipo);
	$('#modificarEquipo2').on('click',modificar);
	$('#salaCentrarModificar').on('change',cambioSala);

	$('#tablaConsultarDatos2').on('click','a',function(data){
		modificarLlenar($(this).attr('name'));
		ubicacionMapaConsultarEquipo2($(this).attr('value'));			
		});

	$('#tablaConsultarDatos1').on('click','.newTr a',function(data){
		ubicacionMapaConsultarEquipo($(this).attr('value'));
	});
	$('#eliminarEquipo1').on('click',eliminar);
}	

function menuPrin(){
	$('#consultarEquiposNewDesign, #consultarEquipos2').on('click',function(){
		hideAndShow('consEquipo','modEquipos ,#ingEquipo,#contenedorMenuClientes');
	});
	$('#consultarEquiposNewDesign, #consultarEquipos2').on('click',llenarTablaEquipos1);

    $('#modificarEquiposNewDesign , #modificarEquipos2').on('click',function(){
    	hideAndShow('modEquipos','consEquipo ,#ingEquip,#contenedorMenuClientes');
    });
    $('#modificarEquiposNewDesign , #modificarEquipos2').on('click',llenarTablaEquipos2);
	
	$('#ingresarEquiposNewDesign, #ingresarEquipos2').on('click',function(){
		hideAndShow('ingEquipo','modEquipos,#consEquipo,#contenedorMenuClientes');
	});
	$('#ingresarEquiposNewDesign, #ingresarEquipos2').on('click',limSelectIngresar);

	$('.atras').on('click',function(){
		hideAndShow('contenedorMenuClientes','modEquipos,#consEquipo,#ingEquipo');
		hideAndShow('contenedorMenuClientes','tablaConsultarDatos,#tablaConsultarEquipos,#tablaConsultarEquipos2');
		resets();
	});

	$('#linkParaNuevoTipoIngresar').on('click', eventoLinkNuevoTipoIngresar);
	$('#linkParaSelectTipoIngresar').on('click', eventoLinkSelectTipoIngresar);

	$('#linkParaSelectMarcaIngresar').on('click', eventoLinkNuevaMarcaIngresar);
	$('#linkParaNuevoMarcaIngresar').on('click', eventoLinkSelectMarcaIngresar);

}

function noDisplay(){
	$('#consEquipo ,#modEquipos,#modEquipos2,#ingEquipo').hide();
	// tabla de ingreso
	$('#tipoNM,#marcaNM,#salaCen,#salaCen2,#contMapa2').hide();
}
function limSelectIngresar()
{
	$('#tiposEquipo option[value=0]').attr('selected','selected');
	$('#marcaEquipo option[value=0]').attr('selected','selected');
	$('#idCondi option[value=0]').attr('selected','selected');
	$('.condiIngEqui option[value=0]').attr('selected','selected');
	$('#centrales option[value=0]').attr('selected','selected');
	$('#salaCentral option[value=0]').attr('selected','selected');
	$('#ocultoNuevoMarcaIngresar').hide();
	$('#ocultaNuevoTipoIngresar').hide();
	$('#divAlertNoSalas').hide();
	$('#ocultaSelecTipoIngresar').show();
	$('#ocultaSelectMarcaIngresar').show();
	$(".newOp").remove();
	$("#salaCentral option[value=0]").text("Seleccione Primero La Central");
	tipoNuevoSelectIngresar=0, marcaNuevoSelectIngresar=0;
}
function eventoLinkNuevoTipoIngresar()
{
	$('#ocultaSelecTipoIngresar').hide();
	$('#ocultaNuevoTipoIngresar').show("slide");
	$('#tiposEquipo option[value=0]').attr('selected','selected');
	tipoNuevoSelectIngresar=1;
	$("#tipoN").val("");
}

function eventoLinkSelectTipoIngresar()
{
	$('#ocultaNuevoTipoIngresar').hide();
	$('#ocultaSelecTipoIngresar').show("slide");
	tipoNuevoSelectIngresar=0;
	$("#tipoN").val("");
}
function eventoLinkNuevaMarcaIngresar()
{
	$('#ocultoSelectMarcaIngresar').hide();
	$('#ocultoNuevoMarcaIngresar').show("slide");
	$('#marcaEquipo option[value=0]').attr('selected','selected');
	marcaNuevoSelectIngresar=1;
	$("#marcaN").val("");
}
function eventoLinkSelectMarcaIngresar()
{
	$('#ocultoNuevoMarcaIngresar').hide();
	$('#ocultoSelectMarcaIngresar').show("slide");
	marcaNuevoSelectIngresar=0;
	$("#marcaN").val("");
}

function mostrarMapa1(){
	//crea el mapa 
	map2 = new GMaps({
    	div: '#map2consultar',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa2(){
	//crea el mapa 
	
	map3 = new GMaps({
    	div: '#map3consultar',
    	lat:10.174862,
		lng:-67.962385,
		zoom:9
	});
}


function hideAndShow (mostrar,ocultar) {
	$('#'+ocultar).hide("slow");
	$('#'+mostrar).show("slide");
	resets();
}

function resets(){
	$('input:text').val("");
	$('#tiposEquipo option[value=0]').attr('selected','selected');
	$('#marcaEquipo option[value=0]').attr('selected','selected');
	$('#idCondi option[value=0]').attr('selected','selected');
	$('.condiIngEqui option[value=0]').attr('selected','selected');
	$('#centrales option[value=0]').attr('selected','selected');
	$('#salaCentral option[value=0]').attr('selected','selected');
}


function consultarEquipos(){
	var busc = $('#textoBusqueda1').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarEquipos.php?jsoncallback=?";
	var tabla = $('#tablaConsultarDatos1');
	$('.newTr').remove();
	var contar=0;
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a class="paraIconos linkEquiposNewDesign" id="linkEquiposNewDesignId1" value='+item.idSala+'></a></td></tr>');
				}
				else
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a class="paraIconos linkEquiposNewDesign" id="linkEquiposNewDesignId2" value='+item.idSala+'></a></td></tr>');
				}
			});
		}
		else{
		}
	});
}

function consultarEquipos2(){
	var busc = $('#buscarEquipo2').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarEquipos.php?jsoncallback=?";
	var tabla = $('#tablaConsultarDatos2 ');
	$('.newTr').remove();
	$('.newTr2').remove();
	$("#contMapa3").hide("slide");
	var contar=0;
	$.getJSON(url,{buscar:busc}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});
				contar++;
				if(contar%2==0)
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquiposNewDesignId3" class="paraIconos linkEquiposNewDesign3" value='+item.idSala+' name='+item.idEquipo+'></a></td></tr>');	
				}
				else
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquiposNewDesignId4" class="paraIconos linkEquiposNewDesign4" value='+item.idSala+' name='+item.idEquipo+'></a></td></tr>');	
				}	
			});
		}
		else{
			
		}
	});
}
// primera tabla  con los datos de los equipos
function llenarTablaEquipos1(){
	var tabla = $('#tablaConsultarDatos1');
	$('#contMapa2').hide();
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEquipos.php?jsoncallback=?";
	tabla.css({'display':'inline-table','margin':'10px auto'});
	$('.newTr').remove();
	var contar=0;
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a class="paraIconos linkEquiposNewDesign" id="linkEquiposNewDesignId1" value='+item.idSala+'></a></td></tr>');
				}
				else
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a class="paraIconos linkEquiposNewDesign" id="linkEquiposNewDesignId2" value='+item.idSala+'></a></td></tr>');
				}
				
			});
		}
		else{
			/*alert(data.mensaje);*/
		}
	});
}
function llenarTablaEquipos2(){
	var tabla = $('#tablaConsultarDatos2');
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEquipos.php?jsoncallback=?";
	$('#contMapa3').hide("slide");
	$('.newTr').remove();
	var contar=0;
	$.getJSON(url).done(function(data){
		if(data.num != 0){

			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});
				contar++;
				if(contar%2==0)
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquiposNewDesignId3" class="paraIconos linkEquiposNewDesign3" value='+item.idSala+' name='+item.idEquipo+'></a></td></tr>');	
				}
				else
				{
					tabla.append('<tr class="newTr"><td>'+item.tipoEquipo+'</td><td>'+item.marca+'</td><td>'+item.func+'</td><td>'+item.ubic+'</td><td>'+item.condi+'</td><td><a id="linkEquiposNewDesignId4" class="paraIconos linkEquiposNewDesign4" value='+item.idSala+' name='+item.idEquipo+'></a></td></tr>');	
				}							
			});
		}
		else{
			
		}
	});
}
// mostrar el mapa y la ubicacion de la consulta de equipos

function ubicacionMapaConsultarEquipo(id){
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarSalas.php?jsoncallback=?";
 	//llena la tabla
	$.getJSON(url,{idSala:id}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				crearMarcaEquipoConsultar(item.idCentral);
				$("#otroConsultCen").text(item.nomC);			
				$("#otroConsultDir").text(item.dirCen);			
				$("#otroConsultSala").text(item.nomb);			
				$("#otroConsultSalaDes").text(item.desc);			
				$("#otroConsultPiso").text(item.piso);			
			});
		}
		else{			
		}
	});
}

function crearMarcaEquipoConsultar(id){
	$('#contMapa2').show("slide");
	mostrarMapa1();
	map2.removeMarkers();

	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
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
			});
		}
		else{
			/*alert(data.mensajee);*/
		}
	});
}

var idConElEquipo;
function modificarLlenar(id){
	//idEquipo
	$("#apareciendoModi").show();
	idConElEquipo=id;
	$("#divAlertNoSalasModificar").hide();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarEquipo.php?jsoncallback=?";
	$.getJSON(url,{idE:id}).done(function(data){
		$.each(data,function(i,item){
			$('#tipoEquipoParaModificar option[value='+item.idTipoE+']').attr('selected','selected');
			$('#marcaParaModificar option[value='+item.idMarca+']').attr('selected','selected');
			$('#idCondi option[value='+item.idCond+']').attr('selected','selected');

			var func = $('#func2').val(item.func);
			var ubi = $('#ubic2').val(item.ubic);
		});
	});
}	

function ubicacionMapaConsultarEquipo2(id){
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarSalas.php?jsoncallback=?";
 	//llena la tabla
	$.getJSON(url,{idSala:id}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				crearMarcaEquipoConsultar2(item.idCentral);
				$('#centralParaModificar option[value='+item.idCentral+']').attr('selected','selected');			

				$("#otroModiCen").text(item.nomC);			
				$("#otroModiDir").text(item.dirCen);			
				$("#otroModiSala").text(item.nomb);			
				$("#otroModiSalaDes").text(item.desc);			
				$("#otroModiPiso").text(item.piso);		

				var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarSalarIdCentral.php?jsoncallback=?";	
				var laSala=item.idSala;
				var laCentral=item.idCentral;
				$(".opSala").remove();
				$.getJSON(url2,{idCent:laCentral}).done(function(data){
					$.each(data,function(i,item){
						$('#salaCentrarModificar').append('<option class="opSala" value="'+item.idSala+'">'+item.nombreSala+'</option>');
					});
					$('#salaCentrarModificar option[value='+laSala+']').attr('selected','selected');
				});

			});
		}
		else{			
		}
	});
}

function crearMarcaEquipoConsultar2(id){
	$('#contMapa3').show("slide");
	mostrarMapa2();
	map3.removeMarkers();

	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:id}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
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

// carga las marcar
function llenarSelects(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/mostrarEquipos.php?jsoncallback=?";
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/mostrarMarcas.php?jsoncallback=?";
	$('#ocultoNuevoMarcaIngresar').hide();
	$('#ocultaNuevoTipoIngresar').hide();
	$('#ocultaSelecTipoIngresar').show();
	$('#ocultoSelectMarcaIngresar').show();
	$(".tipEquiIngClass").remove();
	$.getJSON(url).done(function(data){
		if(data.num!=0){
			$.each(data,function(i,item){
				$('#tiposEquipo').append('<option class="tipEquiIngClass" value="'+item.idTipo+'">'+item.tipoE+'</option>');
				$('#tipoEquipoParaModificar').append('<option value="'+item.idTipo+'">'+item.tipoE+'</option>');
			})
		}
		else{
		}
	});
	$.getJSON(url2).done(function(data){
		if(data.num!=0){
			$.each(data,function(i,item){
				$('#marcaEquipo').append('<option class="tipEquiIngClass" value="'+item.idMarca+'">'+item.marca+'</option>');
				$('#marcaParaModificar').append('<option value="'+item.idMarca+'">'+item.marca+'</option>');
			})
		}
		else{
			alert(data.mensaje)
		}
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
	 });
}

// cargar en ingreso
function cargarSala(){
	var sel = $('#centrales').val();
    var sala= $('#salaCentral');
    /*var sala2= $('.salaCentral');*/
    $('.newOp').remove();
   /* hideAndShow('salaCen,#salaCen2','asd');*/
   
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarSalas.php?jsoncallback=?";

	 $.getJSON(url,{idCentral: sel}).done(function(data){
	 	$.each(data,function(i,item){
	 		
	 		if(item.idSala != undefined)
	 		{
	 			$("#salaCentral option[value=0]").text("Seleccione La Sala");
	 			sala.append("<option class='newOp' value="+item.idSala+">"+item.nomb+"</option>");
	 			$("#divAlertNoSalas").hide("slide");
	 		}
	 		else
	 		{
	 			$("#divAlertNoSalas").show("slide");
	 		}

	 	});
	 })
}
// cargar en modi
function cargarSala2(){
	var sel = $('#centralParaModificar').val();
    var sala= $('#salaCentrarModificar');
    $('.opSala').remove();

	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarSalas.php?jsoncallback=?";
	var contarUno=0, cuentaNum=0;
	$.getJSON(url,{idCentral: sel}).done(function(data){
	 	$.each(data,function(i,item){

	 		/*$('#otroModiSalaDes').text(item.desc);*/

	 		if(item.idSala != undefined){
	 			cuentaNum++;
	 			if(cuentaNum==1)
	 			{
	 				$('#otroModiSalaDes').text(item.desc);
	 				$('#otroModiPiso').text(item.piso);
	 				$("#apareciendoModi").show("slide");
	 			}
	 			$("#divAlertNoSalasModificar").hide("slide");
	 			sala.append("<option class='opSala' value="+item.idSala+">"+item.nomb+"</option>");	 			
	 		}
	 		else
	 		{
	 			$("#apareciendoModi").hide();
	 			contarUno++;
	 			if(contarUno<2)
	 			{
	 				sala.append("<option value='0' class='opSala'>No existen salas en la central seleccionada</option>");
	 			}
	 			$("#divAlertNoSalasModificar").show("slide");
	 		}

	 	});
	});
	map3.removeMarkers();

	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadas.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{idCentral:sel}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				
				$('#otroModiDir').text(item.dirCtrl);
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
function cambioSala()
{
	var sel = $('#salaCentrarModificar').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarSalas.php?jsoncallback=?";
	
	$.getJSON(url,{idSala: sel}).done(function(data){
	 	$.each(data,function(i,item){

	 		$('#otroModiSalaDes').text(item.desc);
	 		$('#otroModiPiso').text(item.piso);

	 	});
	});
}
var idTENEW;
function ingresarEquipo(){

	var tipo;
	var marca;
	var esSelectoNuevoTipo;
	var esSelectoNuevaMarca;
	var contarSiNo=0;
	var func = $('#func1').val();
	var ubi = $('#ubi1').val();
	var condi = $('.condiIngEqui option:selected').val();
	var sala = $('#salaCentral option:selected').val();
	
	if(tipoNuevoSelectIngresar==0)
	{
		tipo=$('#tiposEquipo option:selected').val();
		
		if(tipo==0)
		{
			contarSiNo++;
			alert("Seleccione Un Tipo De Equipo");
		}
		else
		{
			esSelectoNuevoTipo=0;
		}
	}
	else
	{
		tipo=$('#tipoN').val();
		if(tipo=="" || tipo==" " || tipo=="  ")
		{
			contarSiNo++;
			alert("Escriba un Nuevo Tipo de Equipo");
		}
		else
		{
			esSelectoNuevoTipo=1;
		}
	}
	if(contarSiNo==0)
	{
		if(marcaNuevoSelectIngresar==0)
		{
			marca=$('#marcaEquipo option:selected').val();

			if(marca==0)
			{
				contarSiNo++;
				alert("Seleccione Una Marca");
			}
			else
			{
				esSelectoNuevaMarca=0;
			}
		}
		else
		{
			marca=$('#marcaN').val();
			if(marca=="" || marca==" " || marca=="  ")
			{
				contarSiNo++;
				alert("Escriba Una Nueva Marca Para El Equipo");
			}
			else
			{
				esSelectoNuevaMarca=1;
			}
		}
	}
	
	if(contarSiNo==0)
	{
		if(func=="" || func==" " || func=="  ")
		{
			contarSiNo++;
			alert("Escriba La Función Del Equipo");
		}
		else if(ubi=="" || ubi==" " || ubi=="  ")
		{
			contarSiNo++;
			alert("Escriba La Ubicación Del Equipo");
		}
	}

	if(contarSiNo==0)
	{
		if(condi==0)
		{
			contarSiNo++;
			alert("Seleccione La Condición Del Equipo");
		}
		else if(sala==0)
		{
			contarSiNo++;
			alert("Debe Seleccionar Una Sala");
		}
	}

	var url = "http://127.0.0.1/Cantv/jsonCantv/agregarEquipo.php?jsoncallback=?";
	if(contarSiNo==0)
	{
		$.getJSON(url,{idSala:sala,tipoE:tipo, marcaE:marca,condicc:condi,fun:func,Ubicc:ubi,nuevoTipo:esSelectoNuevoTipo, nuevaMarca:esSelectoNuevaMarca}).done(
			function(data)
			{
				alert(data.mensaje);
				llenarSelects();
				resets();
			}
		);
	}
	

	/*var func = $('#func1').val();
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
	});*/
}

function modificar(){
	var salaSelect = $('#salaCentrarModificar').val();
	var tipoSelect = $('#tipoEquipoParaModificar').val();
	var marcaSelect = $('#marcaParaModificar').val();
	var condicionSelect = $('#idCondi').val();
	var funciones = $('#func2').val();
	var ubicacion = $('#ubic2').val();
	
	if(salaSelect!=0)
	{
		if(funciones != "" && funciones != " " && funciones != "  ")
		{
			if(ubicacion!="" && ubicacion!=" " && ubicacion!="  ")
			{
				var url = "http://127.0.0.1/Cantv/jsonCantv/modificarEquipo.php?jsoncallback=?";
				$.getJSON(url,{idTp: tipoSelect,idSal:salaSelect,idCn:condicionSelect,funcP:funciones,ubic:ubicacion,idE:idConElEquipo, mar:marcaSelect}).done(function(data){
					llenarTablaEquipos2();
				});
			}
			else
			{
				alert("Debe Ingresar La Ubicación Del Equipo");
			}
		}
		else
		{
			alert("Debe Ingresar La Función Del Equipo");
		}
	}
	else
	{
		alert("Debe Seleccionar Una Sala");
	}
}
function eliminar(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarEquipo.php?jsoncallback=?";
	$.getJSON(url,{id:idConElEquipo}).done(function(data){
		llenarTablaEquipos2();		
	});
}