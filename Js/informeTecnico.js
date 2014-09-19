$(document).on("ready",inicio);

function inicio ()
{
	$("#dibujoConsultar").on("click",buscarEnlacesFallas);
	$("#linkImprimirInforme").on("click",imprimir);
	$(".noSeUsuario").hide();
	$(".divMarginWidth").hide();
	$("#divImprimirInforme").hide();


	$('#tablaConsultarDatos ').on('click','.fallasConsultarMas',function(){
		var ids = $(this).attr('id');
		verFalla(ids);
	});
}	
function imprimir () 
{

	try {
	   //intento algo que puede producir un error
	   window.print();
	}catch(mierror){
	   alert("No se puede imprimir desde el dispositivo actual");
	}
	
}
function buscarEnlacesFallas()
{
	var enlaceInput=$("#textoBusqueda1").val();
	
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFallaEnlace.php?jsoncallback=?";
	$(".divMarginWidth").hide();
	$("#divImprimirInforme").hide();
	$(".variosTr").remove();
	// marca el mapa
	$.getJSON(url,{buscar:enlaceInput}).done(function(data){
		if(data.num != 0){
			var contar=0;
			$.each(data,function(i,item)
			{
				contar++;
				$(".noSeUsuario").hide();
				$("#tablaConsultarDatos").show();
				$("#tablaConsultarDatos").append("<tr class='variosTr'><td>"+contar+"</td><td>"+item.descri+"</td><td>"+item.fecha+"</td><td>"+item.hora+"</td><td><a id='"+item.idFall+"' class='fallasConsultarMas'></a></td></tr>")
			});
		}
		else{
			$(".noSeUsuario").show();
			$(".divMarginWidth").hide();
			$("#divImprimirInforme").hide();
			$("#tablaConsultarDatos").hide();
		}
	});
}

function verFalla(ids)
{

	var url = "http://127.0.0.1/Cantv/jsonCantv/fallasInforme.php?jsoncallback=?";
	// marca el mapa
	$.getJSON(url,{falla:ids}).done(function(data)
	{
		if(data.num != 0){
			var contar=0;
			$.each(data,function(i,item)
			{
				$("#numEnlace").text(item.numeroEnlace);
				$("#descFalla").text(item.descripcionFalla);
				$("#fechaFalla").text(item.fechaFalla);
				$("#horaFalla").text(item.horaFalla);
				$("#rutaFalla").text(item.ruta);
				$("#clienteFalla").text(item.nombreCliente);
				$("#desClienteFalla").text(item.descripcionCliente);
				$("#tipoEquipoFalla").text(item.tipoEquipo);
				$("#marcaEquipoFalla").text(item.marcaEquipo);
				$("#funEquipoFalla").text(item.funcionEquipo);
				$("#ubicEquipoFalla").text(item.ubicacionEquipo);
				$("#condiEquipoFalla").text(item.condicionEquipo);
				$("#salaEquipoFalla").text(item.nombreSala);
				$("#descriSalaEquipoFalla").text(item.descripcionSala);
				$("#pisoSalaEquipoFalla").text(item.pisoSala);
				$("#centralEquipoFalla").text(item.nombreCentral);
				$("#direccionCentralEquipoFalla").text(item.direccionCentral);
				$("#latitudCentralEquipoFalla").text(item.latitudCentral);
				$("#longitudCentralEquipoFalla").text(item.longitudCentral);
				$("#estadoFalla").text(item.estatusFallas);
				$(".divMarginWidth").show();
				$("#divImprimirInforme").show();
				$(".spanTransito").remove();
				var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarTransitosConNumeroEnlace.php?jsoncallback=?";
				// marca el mapa
				$.getJSON(url2,{numero:item.numeroEnlace}).done(function(data)
				{
					if(data.num != 0){
						$.each(data,function(i,item)
						{
							$("#divTransitos").show();
							$("#divTransitos").append("<br class='spanTransito'><span class='separarTexto spanTransito'>- "+item.transito+"</span>");
						});
					}
					else{
						$("#divTransitos").hide();
					}
				});
				$(".spanPosiciones").remove();
				var url3 = "http://127.0.0.1/Cantv/jsonCantv/consultarPosicionesConNumeroEnlace.php?jsoncallback=?";
				// marca el mapa
				$.getJSON(url3,{numero:item.numeroEnlace}).done(function(data)
				{
					if(data.num != 0){
						$.each(data,function(i,item)
						{
							$("#divPosiciones").show();
							$("#divPosiciones").append("<br class='spanPosiciones'><span class='separarTexto spanTransito'>- "+item.posicion+"</span>");
						});
					}
					else{
						$("#divPosiciones").hide();
					}
				});
			});
		}
		else{
		}
	});
	

}