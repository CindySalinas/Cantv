$(document).on("ready",listo);

function listo() 
{
	$("#content3 div").hide(); // Initially hide all content
    $("#ulMensajes li:first").attr("id","current2"); // Activate first tab
    $("#content3 div:first").fadeIn(); // Show first tab content
    
    $('#ulMensajes li').click(function(e) {
        e.preventDefault();        
        $("#content3 div").hide(); //Hide all content
        $("#ulMensajes li").attr("id","");/* //Reset id's*/
        $(this).attr("id","current2"); // Activate this
        $('#' + $(this).attr('title')).fadeIn(); // Show content for current tab        
    });
    verMisMensajes();
    $(".misMensajes").on("click",verMisMensajes);
    $(".mensajesEnviados").on("click",verMisMensajesEnviados);
}
var emailUsuario;
function verMisMensajes()
{
	var id = $.cookie("adminSis");
	$(".trMensajes").remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
		$.getJSON(url,{namePerf:id
		}).done(function(data)
		{
			if(data.num != 0){
				$.each(data,function(i,item){
					var email=item.mails;
					var url = "http://127.0.0.1/Cantv/jsonCantv/consultarMisMensajes.php?jsoncallback=?";
					$.getJSON(url,{mail:email
					}).done(function(data)
					{
						if(data.num != 0){
							var contar=0;
							$.each(data,function(i,item)
							{
								contar++;
								emailUsuario=item.receptor;
								$("#noTieneMesajes").hide();
								if(contar==1)
								{
									var tabla=$("#tablaMisMensajes");
								tabla.append('<tr class="trMensajes"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla"><label>Asunto: </label>'+item.asunto+'</section><a id="'+item.idMensaje+'" class="floatRight2">Eliminar</a><a id="'+item.idMensaje+'" class="floatRight2 espacioRight">Responder</a></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a id="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
								}
								else
								{
									var tabla=$("#tablaMisMensajes");
								tabla.append('<tr class="trMensajes rayaArriba"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla"><label>Asunto: </label>'+item.asunto+'</section><a id="'+item.idMensaje+'" class="floatRight2">Eliminar</a><a id="'+item.idMensaje+'" class="floatRight2 espacioRight">Responder</a></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a id="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
								}														
							});
						}
						else
						{
							$("#noTieneMesajes").show();
						}
					});					
				});
			}
			else{
				alert(data.mensaje);
				location.href = "index.html";
			}
		});
}
function verMisMensajesEnviados()
{
	var id = $.cookie("adminSis");
	$(".trMensajes").remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
		$.getJSON(url,{namePerf:id
		}).done(function(data)
		{
			if(data.num != 0){
				$.each(data,function(i,item){
					var email=item.mails;
					var url = "http://127.0.0.1/Cantv/jsonCantv/consultarMisMensajesEnviados.php?jsoncallback=?";
					$.getJSON(url,{mail:email
					}).done(function(data)
					{
						if(data.num != 0){
							var contar=0;
							$.each(data,function(i,item)
							{
								contar++;
								$("#noTieneMesajesEnviado").hide();
								if(contar==1)
								{
									var tabla=$("#tablaMisMensajesEnviados");
								tabla.append('<tr class="trMensajes"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla2"><label>Asunto: </label>'+item.asunto+'</section></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a id="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
								}
								else
								{
									var tabla=$("#noTieneMesajesEnviado");
								tabla.append('<tr class="trMensajes rayaArriba"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla2"><label>Asunto: </label>'+item.asunto+'</section><a id="'+item.idMensaje+'" class="floatRight2">Eliminar</a><a id="'+item.idMensaje+'" class="floatRight2 espacioRight">Responder</a></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a id="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
								}														
							});
						}
						else
						{
							$("#noTieneMesajes").show();
						}
					});					
				});
			}
			else{
				alert(data.mensaje);
				location.href = "index.html";
			}
		});
}