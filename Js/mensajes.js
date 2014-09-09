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
        $("input").val("");$("#mensaje1").val("");
    });
    verMisMensajes();
    $(".misMensajes").on("click",verMisMensajes);
    $(".mensajesEnviados").on("click",verMisMensajesEnviados);

    $('#tablaMisMensajes').on('click','.trMensajes .responderMisMen',function(data){
		responderLosMensajes($(this).attr('value'));
	});
	$('#tablaMisMensajes').on('click','.trMensajes .linkPeque',function(data){
		verMasMensaje($(this).attr('value'));
	});
	$('#tablaMisMensajes').on('click','.trMensajes .eliminarMisMen',function(data){
		eliminarMisMensajes($(this).attr('value'));
	});
	$('#tablaMisMensajesEnviados').on('click','.trMensajes .linkPeque',function(data){
		verMasMensaje($(this).attr('value'));
	});
	$("#linkEnviarMensaje").on("click",enviarMensaje);
}
var emailUsuario;
function enviarMensaje()
{
	var emailReceptor = $("#correo1").val();
	var asuntoReceptor = $("#asunto1").val();
	var mensajeReceptor = $("#mensaje1").val();
	var fec = fecha();
	var hor = hora();

	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarIdPerfil.php?jsoncallback=?";
	$.getJSON(url,{email:emailReceptor}).done(function(data)
	{
		if(data.num != 0)
		{
			if(asuntoReceptor!=""&&asuntoReceptor!=" "&&asuntoReceptor!="  "&&asuntoReceptor!="   ")
			{
				if(mensajeReceptor!=""&&mensajeReceptor!=" "&&mensajeReceptor!="  "&&mensajeReceptor!="   ")
				{	
					var url2 = "http://127.0.0.1/Cantv/jsonCantv/enviarMensaje.php?jsoncallback=?";
					$.getJSON(url2,{receptor:emailReceptor,emisor:emailUsuario,mensaje:mensajeReceptor,fecha:fec,hora:hor,asunto:asuntoReceptor}).done(function(data)
					{
						alert("Mensaje Enviado");
						$("#correo1").val("");
						$("#asunto1").val("");
						$("#mensaje1").val("");
					});	
				}
				else
				{
					alert("Ingrese Un Mensaje");
				}
			}
			else
			{
				alert("Ingrese Un Asunto");
			}			
		}
		else
		{
			alert("El correo que ingresó es incorrecto");
		}
	});

}
function eliminarMisMensajes(idMensaje)
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarMensajesIdMen.php?jsoncallback=?";
	$.getJSON(url,{mensaje:idMensaje}).done(function(data)
	{
		verMisMensajes();
	});
}
function verMasMensaje(idMensaje)
{
	$("#content3 div").hide();
	$('#tab5').fadeIn();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarMensajesIdMen.php?jsoncallback=?";
	$.getJSON(url,{mensaje:idMensaje}).done(function(data)
	{
		$.each(data,function(i,item)
		{
			$("#verMasSpanCorreo").text(item.emisor);
			$("#verMasSpanAsunto").text(item.asunto);
			$("#verMasSpanFecha").text(item.fecha);
			$("#verMasSpanHora").text(item.hora);
			$("#verMasSpanMensaje").text(item.men);
		});
	});
}
function responderLosMensajes(idMensaje)
{
	$("#content3 div").hide();
	$("#ulMensajes li").attr("id","");
	$(".nuevoMensaje").attr("id","current2");
	$('#tab2').fadeIn();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarMensajesIdMen.php?jsoncallback=?";
	$.getJSON(url,{mensaje:idMensaje}).done(function(data)
	{
		$.each(data,function(i,item){
			$("#correo1").val(item.emisor);
			$("#asunto1").val("RE: " +item.asunto);
			$("#mensaje1").val("");
		});
	});
}
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
								tabla.append('<tr class="trMensajes"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla"><label>Asunto: </label>'+item.asunto+'</section><a value="'+item.idMensaje+'" class="floatRight2 eliminarMisMen">Eliminar</a><a value="'+item.idMensaje+'" class="floatRight2 espacioRight responderMisMen">Responder</a></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a value="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
								}
								else
								{
									var tabla=$("#tablaMisMensajes");
									tabla.append('<tr class="trMensajes rayaArriba"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla"><label>Asunto: </label>'+item.asunto+'</section><a value="'+item.idMensaje+'" class="floatRight2 eliminarMisMen">Eliminar</a><a value="'+item.idMensaje+'" class="floatRight2 espacioRight responderMisMen">Responder</a></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a value="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
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
									tabla.append('<tr class="trMensajes"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla2"><label>Asunto: </label>'+item.asunto+'</section></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a value="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
								}
								else
								{
									var tabla=$("#tablaMisMensajesEnviados");
									tabla.append('<tr class="trMensajes rayaArriba"><td rowspan="2" class="fotoTabla"><img class="imgMisMen" src="../Img/fotoPerfil/'+item.foto+'"></td><td class="otroTabla"><section class="nomTabla2"><label>Asunto: </label>'+item.asunto+'</section></td></tr><tr class="trMensajes rayaArriba2"><td class="otroTablaOtro">'+item.mensaje+'<a value="'+item.idMensaje+'" class="linkPeque">Ver Mas</a></td></tr><hr>');	
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
function hora(){

  var Digital=new Date();
  var hours=Digital.getHours();
  var minutes=Digital.getMinutes();
  var seconds=Digital.getSeconds();
  var dn="am";

  if (hours>12)
  {
    dn="pm";
    hours=hours-12;
  }

  if (hours==0)
    hours=12;

  if (minutes<=9)
    minutes="0"+minutes;

  if (seconds<=9)
    seconds="0"+seconds;

  var hora = hours+":"+minutes+":"
  +seconds+dn;

  return hora;
}
/*Funcion para obtener la fecha actual*/
function fecha()
{
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

  var diasSemana = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");

  var f=new Date();
  var fecha;

 // fecha = (diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
 	fecha = (f.getDate()+ "/"+ f.getMonth()+ "/" + f.getFullYear());
  return fecha;
}