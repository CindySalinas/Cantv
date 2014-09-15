$(document).on("ready",listo);

function listo() 
{
    $("#content2 div").hide(); // Initially hide all content
    $("#pestaTab li:first").attr("id","current"); // Activate first tab
    $("#content2 div:first").fadeIn(); // Show first tab content
    
    $('#pestaTab a').click(function(e) {
        e.preventDefault();        
        $("#content2 div").hide(); //Hide all content
        $("#pestaTab li").attr("id",""); //Reset id's
        $(this).parent().attr("id","current"); // Activate this
        $('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
        $("#conActual").val("");
		$("#conNueva").val("");
		$("#conConfirmar").val("");
        
    });
    llenarCentrales();
    $("#modificarPerfil").on("click",modificar);
    $("#cambiaCon").on("click",cambiarLaContra);
    $("#telefonoEditar").on("keypress",ValidaSoloNumeros);

}
function ValidaSoloNumeros() {
 if ((event.keyCode < 48) || (event.keyCode > 57)) 
  event.returnValue = false;
}
function modificar()
{
	var file = $('#archivos')[0].files[0];
 	if(file!=undefined)
 	{
 		var fileName = file.name;

	 	fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

	 	if(fileExtension == "jpg" || fileExtension == "png" || fileExtension == "gif" || fileExtension == "PNG" || fileExtension == "JPG" || fileExtension == "jpeg")
	 	{
	 		var urls = "http://127.0.0.1/Cantv/Img/fotoPerfil/cargarArchivos.php";
			var archivos = document.getElementById("archivos");
		 	var archivo = archivos.files; 

		 	var data = new FormData();
			  for(i=0; i<archivo.length; i++){
			   	 data.append('archivo'+i,archivo[i]);
			  }
		  
			 $.ajax({
			    url:urls, 
			    type:'POST', 
			    contentType:false, 
			    data:data, 
			    processData:false, 
			    cache:false,
			    beforeSend: function(){
				},
				success: function(data){
					guardarRuta(data);
				}
			});
	 	}
	 	else{
	 		alert("Elija una imagen correcta para su perfil");
	 	}
 	} 	
 	else
 	{
 		guardarModificar();
 	}
}
function guardarRuta(ruta){
	var cedu = $.cookie("adminSis");
	var usuario = $("#userEditar").val();
	var email = $("#emailEditar").val();
	var fechaNac = $("#fechaNacEditar").val();
	var telefono = $("#telefonoEditar").val();
	var central = $("#centralEditar").val();
	var verdad=validar(fechaNac);
	if(verdad==true)
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/modificarPerfil.php?jsoncallback=?";
		$.getJSON(url,{idUser:cedu,user:usuario,correo:email,fecha:fechaNac,tel:telefono,cen:central,rut:ruta
		}).done(function(data){
			alert("Sus datos se han modificado correctamente");
			verify2();
		});
	}
	else
	{
		alert("Ingrese Una Fecha De Nacimiento Valida Con El Formato DD/MM/YYYY");
	}	
}
function guardarModificar(){
	var cedu = $.cookie("adminSis");
	var usuario = $("#userEditar").val();
	var email = $("#emailEditar").val();
	var fechaNac = $("#fechaNacEditar").val();
	var telefono = $("#telefonoEditar").val();
	var central = $("#centralEditar").val();
	var verdad=validar(fechaNac);
	if(cedu == undefined){
		location.href = "../index.html";
	}
	else
	{
		if(verdad==true)
		{
			var url = "http://127.0.0.1/Cantv/jsonCantv/modificarPerfil2.php?jsoncallback=?";
			$.getJSON(url,{idUser:cedu,user:usuario,correo:email,fecha:fechaNac,tel:telefono,cen:central
			}).done(function(data){
				alert("Sus datos se han modificado correctamente");
				verify2();
			});
		}
		else
		{
			alert("Ingrese Una Fecha De Nacimiento Valida Con El Formato DD/MM/YYYY");
		}
	}		
}
function validar(fecha)
{
	var ar = fecha.split("/");
	var tam = fecha.split("/").length;
	if(tam==3)
	{
		try 
		{
   			if(!isNumber(ar[0])){
			return false;
			}
			if(!isNumber(ar[1])){
			return false;
			}
			if(!isNumber(ar[2])){
			return false;
			}
			if(0>ar[0]>31){
			return false;
			}
			if(0>ar[1]>12){
			return false;
			}
			if(2005>ar[2]>2010){				
			return false;
			}
			if(ar[2].length<4)
			{
				return false;
			}
			if(ar[0].length>2 || ar[1].length>2)
			{
				return false;
			}
			if(ar[0]>31 || ar[1]>12 || ar[1]<1 || ar[0]<1)
			{
				return false;
			}
			return true;
		}
		catch(mierror)
		{
		   return false;
		}		
	}	
	else
	{
		return false;
	}
} 
function isNumber(str)
{
	if(str.length==0)
	return false;
	numdecs = 0;
	for (i = 0; i < str.length; i++){
	mychar = str.charAt(i);
	if ((mychar >= "0" && mychar <= "9") || mychar == "." ){
	if (mychar == ".")
	numdecs++;
	}else return false;
	}
	return true;
}
function llenarCentrales()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCentrales.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#centralEditar").append("<option value='"+item.idCentral+"'>"+item.nombreCentral+"</option>");
		});
	});
	var ckie = $.cookie('adminSis');
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	if(ckie == undefined){
		location.href = "../index.html";
	}
	else{
		$.getJSON(url,{namePerf:ckie}).done(function(data){
			if(data.num != 0){
				$.each(data,function(i,item){

					$("#centralEditar option[value='"+item.idCentral+"']").attr("selected", "selected");
				});
			}
			else{
				alert(data.mensaje);
				location.href = "index.html";
			}
		});
	}
}

function verify2(){
	var ckie = $.cookie('adminSis');
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	if(ckie == undefined){
		location.href = "../index.html";
	}
	else{
		$.getJSON(url,{namePerf:ckie}).done(function(data){
			if(data.num != 0){
				$.each(data,function(i,item){

					$('#fotoPerfil2 img').attr("src","../Img/fotoPerfil/"+item.ftPerfil);
					$('#fotoPerfil img').attr("src","../Img/fotoPerfil/"+item.ftPerfil);
					$('.captionFigurePerfil2').remove();

					$('#fotoPerfil2').append("<section class='captionFigurePerfil2'>"+item.nomUser+"</section>")
					
				});
			}
			else{
				alert(data.mensaje);
				location.href = "../index.html";
			}
		});
	}
}
function cambiarLaContra()
{
	var conActual=$("#conActual").val();
	var conNueva=$("#conNueva").val();
	var confirmar=$("#conConfirmar").val();
	if(conNueva.length<7)
	{
		alert("La contraseña debe tener minimo 7 caracteres");
	}
	else
	{
		if(conNueva==confirmar)
		{
			var ckie = $.cookie('adminSis');
			var url = "http://127.0.0.1/Cantv/jsonCantv/verificarContrasena.php?jsoncallback=?";
			$.getJSON(url,{idUser:ckie,pass:conActual}).done(function(data){
				if(data.num != 0){
					var url2 = "http://127.0.0.1/Cantv/jsonCantv/nuevaContrasena.php?jsoncallback=?";
					$.getJSON(url2,{User:ckie,password:confirmar}).done(function(data){
						alert("Contraseña Actualizada");
						$("#conActual").val("");
						$("#conNueva").val("");
						$("#conConfirmar").val("");
					});
				}
				else{
					alert("La Contraseña Actual Es Incorrecta");
				}
			});
		}
		else
		{
			alert("La contraseña ingresada no coincide")
		}
	}
}
