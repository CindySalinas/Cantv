$(document).on("ready",inicio);

function inicio ()
{
	verify();
}	

function verify(){
	var ckie = $.cookie('adminSis');
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";
	if(ckie == undefined){
		location.href = "../index.html";
	}
	else{
		$.getJSON(url,{namePerf:ckie}).done(function(data){
			if(data.num != 0){
				$.each(data,function(i,item){

					$("#userEditar").val(item.nomUser);
					$("#emailEditar").val(item.mails);
					$("#fechaNacEditar").val(item.fechaNac);
					$("#telefonoEditar").val(item.telf);

					$('#fotoPerfil').append("<img src='../Img/fotoPerfil/"+item.ftPerfil+"'>");
					$('#fotoPerfil2').append("<img src='../Img/fotoPerfil/"+item.ftPerfil+"'>");
					$('#fotoPerfil2').append("<section class='captionFigurePerfil2'>"+item.nomUser+"</section>")

					$('#nombreConsultaPerfil').text(item.nom);
					$('#apellodpConsultaPerfil').text(item.apll);
					$('#emailConsultaPerfil').text(item.mails);
					$('#fechaConsultaPerfil').text(item.fechaNac);
					$('#cedulaConsultaPerfil').text(item.cedula);
					
					var numeroLetras = item.fechaNac.length;
					var porcion;
					if(numeroLetras==8)
					{
						porcion = item.fechaNac.substring(4);
					}
					else if(numeroLetras==9)
					{
						porcion = item.fechaNac.substring(5);
					}
					else if(numeroLetras==10)
					{	
						porcion = item.fechaNac.substring(6);
					}
					var f=new Date();
					var fecha = (f.getFullYear());
					var edad=fecha-porcion;
					$('#edadConsultaPerfil').text(edad);
					$('#telConsultaPerfil').text(item.telf);
					$('#cargoConsultaPerfil').text(item.cargo);
					$('#centralConsultaPerfil').text(item.central);
				});
			}
			else{
				alert(data.mensaje);
				location.href = "../index.html";
			}
		});
	}
}