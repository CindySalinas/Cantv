$(document).on("ready",inicio);

function inicio ()
{
	ocultar();
	eventos();
	$("#generoUsuarioSelect").append("<option value='1'>Masculino</option><option value='2'>Femenino</option>");
	$("#generoUsuarioSelectModificar").append("<option value='1'>Masculino</option><option value='2'>Femenino</option>");
}	

function ocultar()
{
	$("#formIngresarClientesNew").hide();
	$(".datosConsultarUsuario").hide();
	$(".noSeUsuario").hide();
	$(".datosModificarUsuario").hide();		
	$(".noSeUsuario2").hide();
}
function hideAndShow (mostrar,ocultar) 
{
	resets();
	$('#'+ocultar).hide("slow");
	$('#'+mostrar).show("slide");
}

function resets()
{
	$('input:text').val("");
}

function cargarCentrales()
{
	$(".optionCentrales").remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCentrales.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#ingresarUsuarioSelect").append("<option class='optionCentrales' value='"+item.idCentral+"'>"+item.nombreCentral+"</option>");
			$("#centralModificarUsuario").append("<option class='optionCentrales' value='"+item.idCentral+"'>"+item.nombreCentral+"</option>");
		});
	});

	$(".optionCentrales").remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarRol.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#rolUsuarioSelect").append("<option class='optionCentrales' value='"+item.idRol+"'>"+item.rol+"</option>");
			$("#rolModificarUsuario").append("<option class='optionCentrales' value='"+item.idRol+"'>"+item.rol+"</option>");
		});
	});	
}

function ingresarUsuarios()
{
	var nombreIngresar=$('#nombreIngresarUsuario').val();
	var apellidoIngresar=$('#apellidoIngresarUsuario').val();
	var cedulaIngresar=$('#cedulaIngresarUsuario').val();
	var emailIngresar=$('#emailIngresarUsuario').val();
	var fechaNacIngresar=$('#fechaIngresarUsuario').val();
	var telefonoIngresar=$('#telefonoIngresarUsuario').val();
	var cargoIngresar=$('#cargoIngresarUsuario').val();
	var centralIngresar=$('#ingresarUsuarioSelect').val();
	var rolIngresar=$('#rolUsuarioSelect').val();
	var generoIngresar=$('#generoUsuarioSelect').val();
	var imagen;
	if(generoIngresar=="1")
	{
		imagen="Archivo/perfilMasculino.png";
	}
	else
	{
		imagen="Archivo/perfilFemenino.png";
	}

	var verdad=validar(fechaNacIngresar);
	if(verdad==true)
	{
		if(nombreIngresar!=""&&nombreIngresar!=" "&&nombreIngresar!="  "&&nombreIngresar!="   ")
		{
			if(apellidoIngresar!=""&&apellidoIngresar!=" "&&apellidoIngresar!="  "&&apellidoIngresar!="   ")
			{
				if(cedulaIngresar!=""&&cedulaIngresar!=" "&&cedulaIngresar!="  "&&cedulaIngresar!="   ")
				{
					if(emailIngresar!=""&&emailIngresar!=" "&&emailIngresar!="  "&&emailIngresar!="   ")
					{
						if(telefonoIngresar!=""&&telefonoIngresar!=" "&&telefonoIngresar!="  "&&telefonoIngresar!="   ")
						{
							if(cargoIngresar!=""&&cargoIngresar!=" "&&cargoIngresar!="  "&&cargoIngresar!="   ")
							{
								var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCargo.php?jsoncallback=?";

								$.getJSON(url,{cargo:cargoIngresar}).done(function(data)
								{
									var elCargo=(data.mensaje);
									var url2 = "http://127.0.0.1/Cantv/jsonCantv/ingresarUsuario.php?jsoncallback=?";

									$.getJSON(url2,{tipoUsuario:rolIngresar,cargo:elCargo,central:centralIngresar,cedula:cedulaIngresar,email:emailIngresar,nombre:nombreIngresar,apellido:apellidoIngresar,fechaNacimiento:fechaNacIngresar,telefono:telefonoIngresar,genero:generoIngresar,foto:imagen}).done(function(data){
										alert("Usuario Agregado");
										resets();
										$("select option[value='1']").attr("selected", "selected");
									});
								});
							}
							else
							{
								alert("Ingrese Cargo Del Usuario");
							}
						}
						else
						{
							alert("Ingrese Telefono Del Usuario");
						}
					}
					else
					{
						alert("Ingrese Correo Del Usuario");
					}
				}
				else
				{
					alert("Ingrese Cedula Del Usuario");
				}
			}
			else
			{
				alert("Ingrese Apellido Del Usuario");
			}
		}
		else
		{
			alert("Ingrese Nombre Del Usuario");
		}
	}
	else
	{
		alert("Ingrese Fecha Con El Siguiente Formato DD/MM/YYYY");
	}
}
function consultarUsuarioCedula()
{
	var celudaConsultar=$("#consultaInputUsuario").val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarUsuario.php?jsoncallback=?";
	$.getJSON(url,{cedula:celudaConsultar
	}).done(function(data){
		if(data.num!=0)
		{
			$(".noSeUsuario").hide();
			$(".datosConsultarUsuario").show("slide");
			$.each(data, function(i,item)
			{	
				$("#spanConsultarNombreUsuario").text(item.nom);
				$("#spanConsultarApellidoUsuario").text(item.apll);
				$("#spanConsultarCedulaUsuario").text(item.cedula);
				$("#spanConsultarEmailUsuario").text(item.mails);
				$("#spanConsultarUserUsuario").text(item.nomUser);
				$("#spanConsultarFechaNacUsuario").text(item.fechaNac);
				$("#spanConsultarGeneroUsuario").text(item.genero);
				$("#spanConsultarTelefonoUsuario").text(item.telf);
				$("#spanConsultarCargoUsuario").text(item.cargo);
				$("#spanConsultarCentralUsuario").text(item.central);
				$("#spanConsultarRolUsuario").text(item.rol);
				$(".fotoUsuarioConsultar").attr("src","../Img/fotoPerfil/"+item.ftPerfil);
				var perfil=item.idPer;
				var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarFallasUsuario.php?jsoncallback=?";
				$.getJSON(url2,{id:perfil
				}).done(function(data){
					$("#spanConsultarFallasUsuario").text(data.num);
				});

			});			
		}
		else
		{
			$(".noSeUsuario").show("slide");
			$(".datosConsultarUsuario").hide("slide");
		}		
	});
}
var idUsuarioModificar;
function modificaUsuarioCedula()
{
	var celudaConsultar=$("#consultaInputUsuarioModifica").val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarUsuario.php?jsoncallback=?";
	$.getJSON(url,{cedula:celudaConsultar
	}).done(function(data){
		if(data.num!=0)
		{
			$(".noSeUsuario2").hide();
			$(".datosModificarUsuario").show("slide");
			$.each(data, function(i,item)
			{	
				$("#nombreModificarUsuario").val(item.nom);
				$("#apellidoModificarUsuario").val(item.apll);
				$("#cedulaModificarUsuario").val(item.cedula);
				$("#emailModificarUsuario").val(item.mails);
				$("#userModificarUsuario").val(item.nomUser);
				$("#fechaNacModificarUsuario").val(item.fechaNac);
				$("#telefonoModificarUsuario").val(item.telf);
				$("#cargoModificarUsuario").val(item.cargo);

				$("#generoUsuarioSelectModificar option[value='"+item.idGenero+"']").attr("selected","selected");

				$("#centralModificarUsuario option[value='"+item.idCentral+"']").attr("selected","selected");

				$("#rolModificarUsuario option[value='"+item.idRol+"']").attr("selected","selected");
				idUsuarioModificar=item.idPer;

			});			
		}
		else
		{
			$(".noSeUsuario2").show("slide");
			$(".datosModificarUsuario").hide("slide");
		}		
	});
}
function modificarElUsuario()
{
	var nombreModificar=$('#nombreModificarUsuario').val();
	var apellidoModificar=$('#apellidoModificarUsuario').val();
	var cedulaModificar=$('#cedulaModificarUsuario').val();
	var emailModificar=$('#emailModificarUsuario').val();
	var nombreUsuarioModificar=$('#userModificarUsuario').val();
	var fechaNacModificar=$('#fechaNacModificarUsuario').val();
	var telefonoModificar=$('#telefonoModificarUsuario').val();
	var generoModificar=$('#generoUsuarioSelectModificar').val();
	var cargoModificar=$('#cargoModificarUsuario').val();
	var centralModificar=$('#centralModificarUsuario').val();
	var rolModificar=$('#rolModificarUsuario').val();

	var verdad=validar(fechaNacModificar);
	if(verdad==true)
	{
		if(nombreModificar!=""&&nombreModificar!=" "&&nombreModificar!="  "&&nombreModificar!="   ")
		{
			if(apellidoModificar!=""&&apellidoModificar!=" "&&apellidoModificar!="  "&&apellidoModificar!="   ")
			{
				if(cedulaModificar!=""&&cedulaModificar!=" "&&cedulaModificar!="  "&&cedulaModificar!="   ")
				{
					if(emailModificar!=""&&emailModificar!=" "&&emailModificar!="  "&&emailModificar!="   ")
					{
						if(telefonoModificar!=""&&telefonoModificar!=" "&&telefonoModificar!="  "&&telefonoModificar!="   ")
						{
							if(cargoModificar!=""&&cargoModificar!=" "&&cargoModificar!="  "&&cargoModificar!="   ")
							{
								var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCargo.php?jsoncallback=?";

								$.getJSON(url,{cargo:cargoModificar}).done(function(data)
								{
									var elCargo=(data.mensaje);
									var url2 = "http://127.0.0.1/Cantv/jsonCantv/modificarUsuario.php?jsoncallback=?";

									$.getJSON(url2,{tipoUsuario:rolModificar,cargo:elCargo,central:centralModificar,cedula:cedulaModificar,email:emailModificar,nombre:nombreModificar,apellido:apellidoModificar,fechaNacimiento:fechaNacModificar,telefono:telefonoModificar,genero:generoModificar,id:idUsuarioModificar,nomUser:nombreUsuarioModificar}).done(function(data)
									{
											alert("Usuario Actualizado");
									});
								});
							}
							else
							{
								alert("Ingrese Cargo Del Usuario");
							}
						}
						else
						{
							alert("Ingrese Telefono Del Usuario");
						}
					}
					else
					{
						alert("Ingrese Correo Del Usuario");
					}
				}
				else
				{
					alert("Ingrese Cedula Del Usuario");
				}
			}
			else
			{
				alert("Ingrese Apellido Del Usuario");
			}
		}
		else
		{
			alert("Ingrese Nombre Del Usuario");
		}
	}
	else
	{
		alert("Ingrese Fecha Con El Siguiente Formato DD/MM/YYYY");
	}
	
}
function eliminarElUsuario()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarUsuario.php?jsoncallback=?";

	$.getJSON(url,{id:idUsuarioModificar}).done(function(data)
	{
		alert("Usuario Eliminado");
		$(".datosModificarUsuario").hide("slide");	
		resets();
	});
}
function restablecerPass()
{
	var url = "http://127.0.0.1/Cantv/jsonCantv/perfil.php?jsoncallback=?";

	$.getJSON(url,{namePerf:idUsuarioModificar}).done(function(data)
	{
		if(data!=0)
		{
			$.each(data, function(i,item)
			{	
				var cedulaParaRestablecer = item.cedula;
				var url = "http://127.0.0.1/Cantv/jsonCantv/restablecerPass.php?jsoncallback=?";

				$.getJSON(url,{cedula:cedulaParaRestablecer,id:idUsuarioModificar}).done(function(data)
				{
					alert("Contraseña Restablecida");
				});
			});
		}
		else
		{

		}
	});
}
function ValidaSoloNumeros() 
{
 if ((event.keyCode < 48) || (event.keyCode > 57)) 
  event.returnValue = false;
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

function eventos() 
{
	$('#ingresarUsuario , #ingresarCliente2').on('click',function()
	{
		hideAndShow('ingClientes','contenedorMenuClientes');
		cargarCentrales();
	});
	$('#consultarUsuario , #consultarCliente2').on('click',function()
	{
		hideAndShow('consClientes','contenedorMenuClientes');		
	});
	$('#modificarUsuario , #modificarCliente2').on('click',function()
	{
		hideAndShow('mdClientes','contenedorMenuClientes');
		cargarCentrales();
	});

	$('#atras1').on('click',function(){
		hideAndShow('contenedorMenuClientes','consClientes');
		$(".datosConsultarUsuario").hide("slow");		
		$(".noSeUsuario").hide();
	});
	$('#atras2').on('click',function(){
		hideAndShow('contenedorMenuClientes','ingClientes');
	});
	$('#atras3').on('click',function()
	{
		hideAndShow('contenedorMenuClientes','mdClientes');
		$(".datosModificarUsuario").hide("slow");		
		$(".noSeUsuario2").hide();
	});

	$("#telefonoIngresarUsuario").on("keypress",ValidaSoloNumeros);
	$("#telefonoModificarUsuario").on("keypress",ValidaSoloNumeros);

	$("#linkAceptarUsuario").on("click",ingresarUsuarios);
	$("#botonConsultaUsuario").on("click",consultarUsuarioCedula);
	$("#botonModificaUsuario").on("click",modificaUsuarioCedula);

	$("#linkGuardarCambios").on("click",modificarElUsuario);
	$("#linkEliminar").on("click",eliminarElUsuario);
	$("#linkEstablecer").on("click",restablecerPass);
}