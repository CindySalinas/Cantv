
$(document).on("ready",inicio);

function inicio ()
{
	$(".contenidoObservacionesModificar").hide();
	$(".contenidoMapaCentralConsultar").hide();
	$(".contenidoFallaResueltaConsultar").hide();
	consultarFallas();
}


function consultarFallas(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/fallasSinResolver.php?jsoncallback=?";
	$(".contenidoObservacionesModificar").hide();
	$(".contenidoMapaCentralConsultar").hide();
	$(".contenidoFallaResueltaConsultar").hide("slide");
	var tab = $('#consultaFallas1');
	var contar=0;
	$('.newTR').remove();
	$('.newRow').remove();
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasConsultarMas consultarMasDesign" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}
				else
				{
					tab.append('<tr class="newTR"><td>'+item.numEnla+'</td><td>'+item.descri+'</td><td>'+item.fecha+'</td><td>'+item.hora+'</td><td>'+item.nombre+" "+item.apellido+'</td><td>'+item.stat+'</td><td><a class="fallasConsultarMas consultarMasDesign2" id='+item.idEnla+' value='+item.idFall+'></a></td></tr>');
				}				
				
			});
		}
		else{
			
		}
	});
}