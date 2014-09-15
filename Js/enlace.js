$(document).on("ready",inicio);
var map,map2,idposi,idtransi, idNumEnlace,idEnlaceSel;
function inicio ()
{
	ocultar();
	eventos();	
	ingresarEnlaceTextBox();
	$("#centralEnlaceIngresar").on("change", cambioCentral);
	$("#salaEnlaceIngresar").on("change", cambioSala);
	$("#equipoEnlaceIngresar").on("change", cambioEquipo);

	$("#modificarCentralEnlace").on("change", cambioCentralModificar);
	$("#salaModificarEnlace").on("change", cambioSalaModificar);
	$("#equiposEnlaceModificar").on("change", cambioEquipoModificar);

	$("#agregarTransitoIngresarEnlace").on("click", agregarTransito);
	$("#agregarPosicionIngresarEnlace").on("click", agregarPosicion);
	$("#ingresarNuevoEnlace").on("click", agregarEnlace);

	$("#modificarEnlace3").on("click", modificarEnlaceFinal);
	$("#eliminarEnlace3").on("click", eliminarEnlaceFinal);

	$("#dibujoConsultar").on("click", buscarEnlacesConsultar);
	$("#dibujoConsultar2").on("click", buscarEnlacesModificar);

	cargarCentrales();
}	
function ocultar()
{
	$('.menuConsultar').hide();	
	$('.menuModificar').hide();
	$('.menuIngresar').hide();
	$('.menuModificar2').hide();
	$('.menuModificarPosiciones').hide();
	$('.menuModificarTransitos').hide();
	$('.consultarContenidoExtra').hide();
	$('.contenidoExtraModificar1').hide();
}

function resetear()
{
	$('input[type=text]').val("");
	idposi=null;
	idtransi=null;
	$(".modificaPosiciones2 li").removeClass("colorOscuro");
	$(".modificaTransitos2 li").removeClass("colorOscuro");
}

function actionBotones(mostrar,ocultar)
{
	resetear();
	$('.'+mostrar).show("slide");
	$('.'+ocultar).hide("slow");	
	$('.nuevasSalas').remove();
	$('.nuevosEquipos').remove();
	$('.nuevosTransitos').remove();
	$('.nuevasPosiciones').remove();
	$("#centralEnlaceIngresar option[value='sinSelCentral']").attr("selected", "selected");
	$("#clienteEnlaceIngresar option[value='sinSelCliente']").attr("selected", "selected");
}

function mostrarMapa(){
	//crea el mapa 
	map = new GMaps({
    	div: '#map2',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function mostrarMapa2 () 
{
	map2 = new GMaps({
    	div: '#map3',
    	lat:10.174862,
		lng:-67.962385,
		zoom:7
	});
}
function ingresarEnlaceTextBox()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarClientes.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#clienteEnlaceIngresar").append("<option value='"+item.idCliente+"'>"+item.nombreCliente+"</option>");
		});
	});

	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCentrales.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#centralEnlaceIngresar").append("<option value='"+item.idCentral+"'>"+item.nombreCentral+"</option>");
		});
	});
}
function cambioCentral()
{
	$("#ubicacionEnlaceIngresar").text("");	
	$('.nuevasSalas').remove();
	$('.nuevosEquipos').remove();
	var central = $('#centralEnlaceIngresar option:selected').val();
	$("#divAlertNoEquiposIngresarEnlace").hide("slide");
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarSalarIdCentral.php?jsoncallback=?";

	$.getJSON(url,{idCent: central
	}).done(function(data){
		if(data.mensaje==0)
		{
			$("#divAlertNoSalasIngresarEnlace").show("slide");
		}
		else
		{
			$.each(data, function(i,item)
			{
				$("#divAlertNoSalasIngresarEnlace").hide("slide");
				$("#salaEnlaceIngresar").append("<option class='nuevasSalas' value='"+item.idSala+"'>"+item.nombreSala+"</option>");
			});
		}
		
	});
}
function cambioSala()
{
	$("#ubicacionEnlaceIngresar").text("");		
	$('.nuevosEquipos').remove();
	var sala = $('#salaEnlaceIngresar option:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarEquipoIdSala.php?jsoncallback=?";

	$.getJSON(url,{idSal: sala
	}).done(function(data){
		if(data.mensaje==0)
		{
			$("#divAlertNoEquiposIngresarEnlace").show("slide");
		}
		else
		{
			$.each(data, function(i,item)
			{				
				$("#divAlertNoEquiposIngresarEnlace").hide("slide");
				$("#equipoEnlaceIngresar").append("<option class='nuevosEquipos' value='"+item.idEquipo+"'>"+item.nombreEquipo+"</option>");	
			});
		}		
	});
}
function cambioEquipo()
{
	$("#ubicacionEnlaceIngresar").text();	
	var equipo = $('#equipoEnlaceIngresar option:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarUbicacionEquipoIdEquipo.php?jsoncallback=?";
		
	$.getJSON(url,{idEqui: equipo
	}).done(function(data){
		$.each(data, function(i,item)
		{				
			$("#ubicacionEnlaceIngresar").text(item.ubicacion);	
		});
	});
}
function agregarTransito()
{
	var transito=$("#inputTransitoIngresarEnlace").val();
	if(transito!="" && transito!=" " && transito!="  ")
	{
		$(".transitosListaAgregar").append("<li class='nuevosTransitos'>"+transito+"</li>");
		$("#inputTransitoIngresarEnlace").val("");
	}
	else
		alert("Escriba un Transito");
}
function agregarPosicion()
{
	var posicion=$("#inputPosicionIngresarEnlace").val();
	if(posicion!="" && posicion!=" " && posicion!="  ")
	{
		$(".posicionesListaAgregar").append("<li class='nuevasPosiciones'>"+posicion+"</li>");
		$("#inputPosicionIngresarEnlace").val("");
	}
	else
		alert("Escriba una Posición");
}

function agregarEnlace()
{
	
	var cantidadTransitos = $(".transitosListaAgregar li").size();

	var numEnlace = $("#numEnlaceIngresar").val();
	var rutEnlace = $("#rutaEnlaceIngresar").val();
	var equipEnlace = $("#equipoEnlaceIngresar option:selected").val();
	var clientEnlace = $("#clienteEnlaceIngresar option:selected").val();
	var centEnlace = $("#centralEnlaceIngresar option:selected").val();
	var salEnlace = $("#salaEnlaceIngresar option:selected").val();


	if(centEnlace!= "sinSelCentral" && salEnlace!="sinSelSala" && equipEnlace!="selEquip" && clientEnlace!="sinSelCliente" && numEnlace!="" && numEnlace!=" " && numEnlace!="  " && numEnlace!="   " && rutEnlace!="" && rutEnlace!=" " && rutEnlace!="  " && rutEnlace!="   ")
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/agregarEnlace.php?jsoncallback=?";
		$.getJSON(url,{numeroEnlace:numEnlace,rutaEnlace:rutEnlace,equipoEnlace:equipEnlace,clienteEnlace:clientEnlace}).done(
			function(data){				
				alert(data.mensaje);		
				var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarEnlaceNumeroEnlace.php?jsoncallback=?";
				$.getJSON(url2,{numero:numEnlace}).done(function(data){
						var idEnl=data.mensaje;						
						$('.posicionesListaAgregar li').each(function(indice, elemento) 
						{
					  		var elem=$(elemento).text();
					  		var url3 = "http://127.0.0.1/Cantv/jsonCantv/agregarPosiciones.php?jsoncallback=?";
							$.getJSON(url3,{idEnlace:idEnl,element:elem}).done(
								function(data){								
								});
						});
						$('.transitosListaAgregar li').each(function(indice2, elemento2) 
						{
					  		var elem2=$(elemento2).text();
					  		var url4 = "http://127.0.0.1/Cantv/jsonCantv/agregarTransito.php?jsoncallback=?";
							$.getJSON(url4,{idEnlace:idEnl,element:elem2}).done(
								function(data){				
								});
						});
					resetear();
					$('.nuevasSalas').remove();
					$('.nuevosEquipos').remove();
					$('.nuevosTransitos').remove();
					$('.nuevasPosiciones').remove();
					$('#ubicacionEnlaceIngresar').text("");
					$("#centralEnlaceIngresar option[value='sinSelCentral']").attr("selected", "selected");	
					$("#clienteEnlaceIngresar option[value='sinSelCliente']").attr("selected", "selected");	
				});						
			});
	}
	else
		alert("Ingrese Todos Los Datos Correctamente");	
}
function buscarEnlacesModificar()
{
	$(".contenidoExtraModificar1").hide("slide");
	$('.colConEnlace2').remove();
	var tabla = $('#tbodyModificar');
	var numer=$("#textoBusqueda2").val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarEnlaces.php?jsoncallback=?";
	var contar=0;
	$.getJSON(url,{buscarNum:numer}).done(function(data){
		$.each(data,function(i,item){
			contar++;
			if(contar%2==0)
			{
				tabla.append('<tr class="colConEnlace2"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="m'+item.numeroEnlace+'" class="equipoConsultarMasNewDesign3"></a></td></tr>');
				$('#m'+item.numeroEnlace).on("click",function(){marcaConsultarMapa2(item.numeroEnlace,item.idEquipo,item.idEnlace);}); 
			}
			else
			{
				tabla.append('<tr class="colConEnlace2"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="m'+item.numeroEnlace+'" class="equipoConsultarMasNewDesign4"></a></td></tr>');
				$('#m'+item.numeroEnlace).on("click",function(){marcaConsultarMapa2(item.numeroEnlace,item.idEquipo,item.idEnlace);}); 
			}
			
		});
	});
}
function llenarDatosModificar()
{
	$('.colConEnlace2').remove();
	var tabla = $('#tbodyModificar');
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEnlaces.php?jsoncallback=?";
	var contar=0;
	$.getJSON(url).done(function(data){
		$.each(data,function(i,item){
			if(data.num!=0)
			{
				contar++;
				if(contar%2==0)
				{
					tabla.append('<tr class="colConEnlace2"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="m'+item.numeroEnlace+'" class="equipoConsultarMasNewDesign3"></a></td></tr>');
					$('#m'+item.numeroEnlace).on("click",function(){marcaConsultarMapa2(item.numeroEnlace,item.idEquipo,item.idEnlace);}); 
				}
				else
				{
					tabla.append('<tr class="colConEnlace2"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="m'+item.numeroEnlace+'" class="equipoConsultarMasNewDesign4"></a></td></tr>');
					$('#m'+item.numeroEnlace).on("click",function(){marcaConsultarMapa2(item.numeroEnlace,item.idEquipo,item.idEnlace);}); 
				}
			}
			
		});
	});
}

function marcaConsultarMapa2(num,equi,iden)
{
	$(".contenidoExtraModificar1").show("slide");
	mostrarMapa2();
	$('.conNuevasPosiciones2').remove();
	idNumEnlace=num;
	idEnlaceSel=iden;
	map2.removeMarkers();
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadasConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url,{numero:equi}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$("#spanModifiCentral").text(item.nomCtrl);
				$("#spanModifiSala").text(item.nomb);
				$("#spanModifiPiso").text(item.pisos);
				$("#spanModifiDirCentral").text(item.dirCtrl);
				$("#spanModifiSalaDes").text(item.desc);
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
			alert("No Existe Ubicación");
		}
	});
	cargarPosicionesTransitos();
	
}
function cargarPosicionesTransitos()
{
	$('.conNuevasPosiciones2').remove();
	var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultarTransitosConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url3,{numero:idNumEnlace}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".modificaTransitos2").append("<li id='tt"+item.idtransito+"' class='conNuevasPosiciones2'>"+item.transito+"</li>");
				$("#tt"+item.idtransito).on("click",function(){selectModificaTransito(item.idtransito,item.transito);});
			});
		}
	});

	var url4 = "http://127.0.0.1/Cantv/jsonCantv/consultarPosicionesConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url4,{numero:idNumEnlace}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".modificaPosiciones2").append("<li id='pp"+item.idposicion+"' class='conNuevasPosiciones2'>"+item.posicion+"</li>");
				$('#pp'+item.idposicion).on("click",function(){selectModificaPosicion(item.idposicion,item.posicion);}); 
			});
		}
	});
	var url5 = "http://127.0.0.1/Cantv/jsonCantv/consultarTransitosConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url5,{numero:idNumEnlace}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".modificaTransitos").append("<li class='conNuevasPosiciones2'>"+item.transito+"</li>");
			});
		}
	});

	var url6 = "http://127.0.0.1/Cantv/jsonCantv/consultarPosicionesConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url6,{numero:idNumEnlace}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".modificaPosiciones").append("<li class='conNuevasPosiciones2'>"+item.posicion+"</li>");
			});
		}
	});
}
function selectModificaTransito(ids,transito)
{
	$(".modificaTransitos2 li").removeClass("colorOscuro");
	idtransi=ids;
	$("#tt"+ids).addClass("colorOscuro");
	$("#inputTransitoModificar").val(transito);
}
function selectModificaPosicion(ids,posicion)
{
	$(".modificaPosiciones2 li").removeClass("colorOscuro");
	idposi=ids;
	$("#pp"+ids).addClass("colorOscuro");
	$("#inputPosicionModificar").val(posicion);
}
function modificarPosicion()
{
	if(idposi!=null)
	{
		var posi=$("#inputPosicionModificar").val();
		if(posi!="" && posi!=" " && posi!="  " && posi!="   ")
		{
			var url = "http://127.0.0.1/Cantv/jsonCantv/modificarPosicionConId.php?jsoncallback=?";
			$.getJSON(url,{idpos:idposi,pos:posi}).done(
				function(data){		
					cargarPosicionesTransitos();
					$("#inputPosicionModificar").val("");
					idposi=null;
				}
			);		
		}
	}
	else
		alert("Seleccione Posición a Modificar");
}
function eliminarPosicion()
{
	if(idposi!=null)
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarPosicionConId.php?jsoncallback=?";
		$.getJSON(url,{idpos:idposi}).done(
			function(data){		
				cargarPosicionesTransitos();
				$("#inputPosicionModificar").val("");
				idtransi=null;
			}
		);	
	}
	else
		alert("Seleccione Posición a Eliminar");	
}
function modificarTransito()
{
	if(idtransi!=null)
	{
		var transi=$("#inputTransitoModificar").val();
		if(transi!="" && transi!=" " && transi!="  " && transi!="   ")
		{
			var url = "http://127.0.0.1/Cantv/jsonCantv/modificarTransitoConId.php?jsoncallback=?";
			$.getJSON(url,{idtran:idtransi,tran:transi}).done(
				function(data){		
					cargarPosicionesTransitos();
					$("#inputTransitoModificar").val("");
					idtransi=null;
				}
			);	
		}			
	}
	else
		alert("Seleccione Transito a Modificar");
}
function eliminarTransito()
{
	if(idtransi!=null)
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarTransitoConId.php?jsoncallback=?";
		$.getJSON(url,{idtran:idtransi}).done(
			function(data){		
				cargarPosicionesTransitos();
				$("#inputTransitoModificar").val("");
				idtransi=null;
			}
		);		
	}
	else
		alert("Seleccione Transito a Eliminar");	
}
function agregarNuevoTransito()
{
	var elem2=$("#inputTransitoAgregarModificar").val();
	if(elem2!="" && elem2!=" " && elem2!="  " && elem2!="   ")
	{
		var url4 = "http://127.0.0.1/Cantv/jsonCantv/agregarTransito.php?jsoncallback=?";
		$.getJSON(url4,{idEnlace:idEnlaceSel,element:elem2}).done(
		function(data){				
			cargarPosicionesTransitos();	
			$("#inputTransitoAgregarModificar").val("");
		});
	}	
}
function agregarNuevaPosicion()
{
	var elem=$("#inputPosicionAgregarModificar").val();
	if(elem!="" && elem!=" " && elem!="  " && elem!="   ")
	{
		var url3 = "http://127.0.0.1/Cantv/jsonCantv/agregarPosiciones.php?jsoncallback=?";
		$.getJSON(url3,{idEnlace:idEnlaceSel,element:elem}).done(
		function(data){			
			cargarPosicionesTransitos();	
			$("#inputPosicionAgregarModificar").val("");			
		});
	}	
}
function cargarCentrales()
{	
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCentrales.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#modificarCentralEnlace").append("<option value='"+item.idCentral+"'>"+item.nombreCentral+"</option>");
		});
	});
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarClientes.php?jsoncallback=?";
	$.getJSON(url2,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#clientesEnlaceModificar").append("<option value='"+item.idCliente+"'>"+item.nombreCliente+"</option>");
		});
	});
}
function modificandoEnlace()
{
	$("#divAlertNoSalasModificarEnlace").hide();
	$("#divAlertNoEquiposModificarEnlace").hide();
	$(".nuevasSalas").remove();
	$(".nuevosEquipos").remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEnlaceConId.php?jsoncallback=?";
	$.getJSON(url,{idEnlace:idEnlaceSel
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#inputNumEnlaceModificar").val(item.numEnlace);
			$("#inputRutaEnlaceModificar").val(item.ruta);
			$("#modificarCentralEnlace option[value='"+item.central+"']").attr("selected", "selected");
			$("#clientesEnlaceModificar option[value='"+item.cliente+"']").attr("selected", "selected");
			var idSalaSelect=item.sala;
			var idEquipoSelect=item.idEquipo;
			var url2 = "http://127.0.0.1/Cantv/jsonCantv/cargarSalas.php?jsoncallback=?";
			$.getJSON(url2,{idCentral:item.central
			}).done(function(data){
				$.each(data, function(i,item)
				{						
					$("#salaModificarEnlace").append("<option class='nuevasSalas' value='"+item.idSala+"'>"+item.nomb+"</option>");
				});
				$("#salaModificarEnlace option[value='"+idSalaSelect+"']").attr("selected", "selected");
			});
			
			var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultarEquipoIdSala.php?jsoncallback=?";
			$.getJSON(url3,{idSal:item.sala
			}).done(function(data){
				$.each(data, function(i,item)
				{						
					$("#equiposEnlaceModificar").append("<option class='nuevosEquipos' value='"+item.idEquipo+"'>"+item.nombreEquipo+"</option>");
					$("#inputUbicacionEnlaceModificar").text(item.ubicacion);
				});
				$("#equiposEnlaceModificar option[value='"+idEquipoSelect+"']").attr("selected", "selected");
			});
		});
	});
}
function cambioCentralModificar()
{
	$("#inputUbicacionEnlaceModificar").text("");	
	$('.nuevasSalas').remove();
	$('.nuevosEquipos').remove();
	var central = $('#modificarCentralEnlace option:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarSalarIdCentral.php?jsoncallback=?";

	$("#salaModificarEnlace").append("<option class='nuevasSalas' value='0'>Seleccione Una Sala</option>");
	$.getJSON(url,{idCent: central
	}).done(function(data){
		$("#divAlertNoEquiposModificarEnlace").hide("slide");
		if(data.mensaje==0)
		{
			$("#divAlertNoSalasModificarEnlace").show("slide");
		}
		else
		{
			$.each(data, function(i,item)
			{				
				$("#divAlertNoSalasModificarEnlace").hide("slide");
				$("#salaModificarEnlace").append("<option class='nuevasSalas' value='"+item.idSala+"'>"+item.nombreSala+"</option>");
			});
		}		
	});
}
function cambioSalaModificar()
{
	$("#inputUbicacionEnlaceModificar").text("");	
	$('.nuevosEquipos').remove();
	var sala = $('#salaModificarEnlace option:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarEquipoIdSala.php?jsoncallback=?";

	$("#equiposEnlaceModificar").append("<option class='nuevosEquipos' value='0'>Seleccione Un Equipo</option>");
	$.getJSON(url,{idSal: sala
	}).done(function(data){
		if(data.mensaje==0)
		{
			$("#divAlertNoEquiposModificarEnlace").show("slide");
		}
		else
		{
			$("#divAlertNoEquiposModificarEnlace").hide("slide");
			$.each(data, function(i,item)
			{				
				$("#equiposEnlaceModificar").append("<option class='nuevosEquipos' value='"+item.idEquipo+"'>"+item.nombreEquipo+"</option>");	
			});
		}		
	});
}
function cambioEquipoModificar()
{
	$("#inputUbicacionEnlaceModificar").text("");	
	var equipo = $('#equiposEnlaceModificar option:selected').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarUbicacionEquipoIdEquipo.php?jsoncallback=?";
		
	$.getJSON(url,{idEqui: equipo
	}).done(function(data){
		$.each(data, function(i,item)
		{				
			$("#inputUbicacionEnlaceModificar").text(item.ubicacion);	
		});
	});
}
function modificarEnlaceFinal()
{
	var sala = $('#salaModificarEnlace option:selected').val();
	var equipo = $('#equiposEnlaceModificar option:selected').val();
	var cliente = $('#clientesEnlaceModificar option:selected').val();
	var numeroEnla = $('#inputNumEnlaceModificar').val();
	var rut = $('#inputRutaEnlaceModificar').val();
	if(sala!="0" && equipo!="0")
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/modificarEnlace.php?jsoncallback=?";
		$.getJSON(url,{idEnlace: idEnlaceSel, IdEquipo: equipo, idCliente: cliente,numero: numeroEnla, ruta: rut}
			).done(function(data){
				alert("Enlace Actualizado");
				llenarDatosModificar();
				$('.contenidoExtraModificar1').hide();	
			});

	}
}
function eliminarEnlaceFinal()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarEnlace.php?jsoncallback=?";
	
	$.getJSON(url,{idEnlace: idEnlaceSel}
	).done(function(data){
		alert(data.mensaje);
		llenarDatosModificar();

		$('.menuModificar').show("slide");
		$('.menuModificar2').hide();
		$('.contenidoExtraModificar1').hide();	
	});
}
function eventoConIngresar () 
{
	$("#divAlertNoSalasIngresarEnlace").hide();
	$("#divAlertNoEquiposIngresarEnlace").hide();
	$("#ubicacionEnlaceIngresar").text("");
}
function eventos()
{
	$('.consultarIconoEnlacesNewDesign').on("click",function(){actionBotones('menuConsultar','menuEnlaces');}); 
	 $('.linkAbajoConsultar').on("click",function(){actionBotones('menuConsultar','menuEnlaces');}); 
	 $('.consultarIconoEnlacesNewDesign').on("click", llenarDatosConsultar); 
	 $('.linkAbajoConsultar').on("click",llenarDatosConsultar); 

	 $('.ingresarIconoEnlacesNewDesign').on("click",function(){actionBotones('menuIngresar','menuEnlaces');}); 
	 $('.linkAbajoIngresar').on("click",function(){actionBotones('menuIngresar','menuEnlaces');}); 
	  $('.ingresarIconoEnlacesNewDesign').on("click",eventoConIngresar); 
	 $('.linkAbajoIngresar').on("click",eventoConIngresar); 


	 $('.modificarIconoEnlacesNewDesign').on("click",function(){actionBotones('menuModificar','menuEnlaces');}); 
	 $('.linkAbajoModificar').on("click",function(){actionBotones('menuModificar','menuEnlaces');}); 
	 $('.modificarIconoEnlacesNewDesign').on("click",llenarDatosModificar); 
	 $('.linkAbajoModificar').on("click",llenarDatosModificar); 

	 $('.linkAtrasConsultar').on("click",function(){actionBotones('menuEnlaces','menuConsultar');}); 
	 $('.linkAtrasConsultar').on("click",function(){actionBotones('nada','consultarContenidoExtra');}); 

	 $('.equipoConsultarMas').on("click",function(){actionBotones('consultarContenidoExtra','nada');}); 

	 $('.atrasIngresarCliente').on("click",function(){actionBotones('menuEnlaces','menuIngresar');}); 

	 $('.atrasModificar2Enlace').on("click",function(){actionBotones('menuModificar','menuModificar2');}); 
	 $('.atrasModificar2Enlace').on("click",function(){actionBotones('menuModificar','menuModificar2');}); 
	 $('.atrasModificar2Enlace').on("click",function(){actionBotones('contenidoExtraModificar1','nada');}); 

	 $('.atrasTransitoEnlace').on("click",function(){actionBotones('menuModificar','menuModificarTransitos');}); 

	 $('.atrasPosicionEnlace').on("click",function(){actionBotones('menuModificar','menuModificarPosiciones');}); 

	 $('.atrasModificar1Enlace').on("click",function(){actionBotones('menuEnlaces','menuModificar');}); 
	 $('.atrasModificar1Enlace').on("click",function(){actionBotones('nada','contenidoExtraModificar1');}); 

	 $('.linkEditarEquipos').on("click",function(){actionBotones('contenidoExtraModificar1','nada');}); 

	 $('#modificaEnlace').on("click",function(){actionBotones('menuModificar2','menuModificar');}); 
	 $('#modificaEnlace').on("click",modificandoEnlace); 

	 $('#modificaPosicion').on("click",function(){actionBotones('menuModificarPosiciones','menuModificar');}); 

	 $('#modificaTransito').on("click",function(){actionBotones('menuModificarTransitos','menuModificar');}); 

	 $('#botonEliminarPosicion').on("click",eliminarPosicion); 
	 $('#botonModificarPosicion').on("click",modificarPosicion); 

	 $('#botonEliminarTransito').on("click",eliminarTransito); 
	 $('#botonModificarTransito').on("click",modificarTransito); 

	 $('#agregarTransitoModificar').on("click",agregarNuevoTransito); 
	 $('#agregarPosicionModificar').on("click",agregarNuevaPosicion); 
}

function llenarDatosConsultar()
{
	$('.colConEnlace').remove();
	var tabla = $('#tbodyConsultar');
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarEnlaces.php?jsoncallback=?";
	var contar=0;
	$.getJSON(url).done(function(data){
		$.each(data,function(i,item){
			if (data.num!=0)
			{
				contar++;
				if(contar%2==0)
				{
					tabla.append('<tr class="colConEnlace"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="c'+item.numeroEnlace+'" class="paraIconos equipoConsultarMasNewDesign1"></a></td></tr>');
					$('#c'+item.numeroEnlace).on("click",function(){marcaConsultarMapa(item.numeroEnlace,item.idEquipo);}); 
				}
				else
				{
					tabla.append('<tr class="colConEnlace"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="c'+item.numeroEnlace+'" class="paraIconos equipoConsultarMasNewDesign2"></a></td></tr>');
					$('#c'+item.numeroEnlace).on("click",function(){marcaConsultarMapa(item.numeroEnlace,item.idEquipo);}); 
				}
			}					
		});
	});
}
function buscarEnlacesConsultar () 
{
	$(".consultarContenidoExtra").hide("slide");
	$('.colConEnlace').remove();
	var tabla = $('#tbodyConsultar');
	var numer=$("#textoBusqueda1").val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarEnlaces.php?jsoncallback=?";
	var contar=0;
	$.getJSON(url,{buscarNum:numer}).done(function(data){
		$.each(data,function(i,item){
			contar++;
			if(contar%2==0)
			{
				tabla.append('<tr class="colConEnlace"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="c'+item.numeroEnlace+'" class="paraIconos equipoConsultarMasNewDesign1"></a></td></tr>');
				$('#c'+item.numeroEnlace).on("click",function(){marcaConsultarMapa(item.numeroEnlace,item.idEquipo);}); 
			}
			else
			{
				tabla.append('<tr class="colConEnlace"><td>'+item.numeroEnlace+'</td><td>'+item.ruta+'</td><td>'+item.cliente+'</td><td>'+item.equipo+'</td><td><a id="c'+item.numeroEnlace+'" class="paraIconos equipoConsultarMasNewDesign2"></a></td></tr>');
				$('#c'+item.numeroEnlace).on("click",function(){marcaConsultarMapa(item.numeroEnlace,item.idEquipo);}); 
			}
			
		});
	});
}
function marcaConsultarMapa(num,equi)
{
	$(".consultarContenidoExtra").show("slide");
	mostrarMapa();
	$('.conNuevasPosiciones').remove();
	map.removeMarkers();
	var url = "http://127.0.0.1/Cantv/jsonCantv/coordenadasConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url,{numero:equi}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$("#spanConsultarCentral").text(item.nomCtrl);
				$("#spanConsultarSala").text(item.nomb);
				$("#spanConsultarPiso").text(item.pisos);
				$("#spanConsultDirCentral").text(item.dirCtrl);
				$("#spanConsultSalaDes").text(item.desc);
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
			alert("No Existe Ubicación");
		}
	});
	
	var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultarTransitosConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url3,{numero:num}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".consultaTransitos").append("<li class='conNuevasPosiciones'>"+item.transito+"</li>");
			});
		}
	});

	var url4 = "http://127.0.0.1/Cantv/jsonCantv/consultarPosicionesConNumeroEnlace.php?jsoncallback=?";
	$.getJSON(url4,{numero:num}).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				$(".consultandoPosiciones").append("<li class='conNuevasPosiciones'>"+item.posicion+"</li>");
			});
		}
	});
}