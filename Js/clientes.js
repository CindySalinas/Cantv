$(document).on("ready",inicio);

function inicio ()
{
	menuPrin();
	$('#ingresarClientes').on('click',ingresarCliente);

	$('#dibujoConsultar').on('click',consultarClientes);

	$('#dibujoConsultar2').on('click',consultarClientes2);
	$('#modificarClientes').on('click',modificar);
	$('#eliminarClientes').on('click',eliminar);
	$("#formIngresarClientesNew").hide();
}

function menuPrin(){
	$('#consultarClienteNewDesign , #consultarCliente2').on('click',function(){
		hideAndShow('consClientes','ingClientes, #mdClientes,#contenedorMenuClientes');
	});
	$('#modificarClienteNewDesign , #modificarCliente2').on('click',function(){
		hideAndShow('mdClientes','consClientes,#ingClientes,#contenedorMenuClientes');
	});
	$('#ingresarClienteNewDesign , #ingresarCliente2').on('click',function(){
		hideAndShow('ingClientes','mdClientes, #consClientes,#contenedorMenuClientes');
	});
	$('.atras').on('click',function(){
		hideAndShow('contenedorMenuClientes','consClientes, #ingClientes, #mdClientes');
		resets();
	});

	$(".otroAtrasModificarCliente").on("click",ocult);

	$('#consultarClienteNewDesign , #consultarCliente2').on('click',llenarClientes);
	$('#modificarClienteNewDesign , #modificarCliente2').on('click',llenarClientes2);
}

function ocult()
{
	$("#formIngresarClientesNew").hide();
}
function hideAndShow (mostrar,ocultar) {
	$('#'+ocultar).hide("slow");
	$('#'+mostrar).show("slide");
}

function resets(){
	$('input:text').val("");
	$('.contact-form-email-message').val("");
}

function ingresarCliente(){
	var nom = $('#nomClient').val();
	var desc = $('#descClient').val();
	var url = "http://127.0.0.1/Cantv/jsonCantv/agregarClientes.php?jsoncallback=?";

	if(nom!= "" && desc!= ""){
		
		$.getJSON(url,{nomC:nom,desC:desc}).done(function(data){
			alert(data.mensaje);
			resets();
		})
	}
	else{
		alert("Ingrese Un nombre y una Descripcion")
	}
	
}

function consultarClientes(){
	var tabla = $('#tablaConsultarDatos');
	var busc = $('#textoBusqueda1').val();
	$('.newTr').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarClientes.php?jsoncallback=?";
	$.getJSON(url,{buscar :busc}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});
				tabla.append('<tr class="newTr"><td id='+item.idCtl+'>'+item.nomCtl+'</td><td>'+item.dirCtl+'</td></tr>')
			});
		}
		else{
			
		}
	})
}
function llenarClientes(){
	var tabla = $('#tablaConsultarDatos');

	$('.newTr').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarClientes.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});
				tabla.append('<tr class="newTr"><td id='+item.idCtl+'>'+item.nomCtl+'</td><td>'+item.dirCtl+'</td></tr>')
			});
		}
		else{
			alert(data.mensaje);
		}
	})
}
function consultarClientes2(){
	
	$('#formIngresarClientesNew').hide("slide");
	var tabla = $('#tablaConsultarDatos2');
	var busc = $('#textoBusqueda2').val();
	$('.newTr').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarClientes.php?jsoncallback=?";
	var contar=0;
	$.getJSON(url,{buscar :busc}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tabla.css({'display':'inline-table','margin':'10px auto'});
					tabla.append('<tr class="newTr"><td>'+item.nomCtl+'</td> <td> '+item.dirCtl+'</td> <td><a href="#" id='+item.idCtl+'><span class="spanEditarCliente"></span></a></td></tr>');
					$('.newTr').on('click','a',function(data){
						llenarMod($(this).attr('id'));
					});
				}
				else
				{
					tabla.css({'display':'inline-table','margin':'10px auto'});
					tabla.append('<tr class="newTr"><td>'+item.nomCtl+'</td> <td> '+item.dirCtl+'</td> <td><a href="#" id='+item.idCtl+'><span class="spanEditarCliente2"></span></a></td></tr>');
					$('.newTr').on('click','a',function(data){
						llenarMod($(this).attr('id'));
					});
				}
			});
		}
		else{
		}
	})
}
function llenarClientes2(){
	var tabla = $('#tablaConsultarDatos2');
	var busc = $('#textoBusqueda2').val();
	$('.newTr').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/cargarClientes.php?jsoncallback=?";
	var contar=0;
	$.getJSON(url).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){
				contar++;
				if(contar%2==0)
				{
					tabla.css({'display':'inline-table','margin':'10px auto'});
					tabla.append('<tr class="newTr"><td>'+item.nomCtl+'</td> <td> '+item.dirCtl+'</td> <td><a href="#" id='+item.idCtl+'><span class="spanEditarCliente"></span></a></td></tr>');
					$('.newTr').on('click','a',function(data){
						llenarMod($(this).attr('id'));
					});
				}
				else
				{
					tabla.css({'display':'inline-table','margin':'10px auto'});
					tabla.append('<tr class="newTr"><td>'+item.nomCtl+'</td> <td> '+item.dirCtl+'</td> <td><a href="#" id='+item.idCtl+'><span class="spanEditarCliente2"></span></a></td></tr>');
					$('.newTr').on('click','a',function(data){
						llenarMod($(this).attr('id'));
					});
				}
				
			});
		}
		else{
			alert(data.mensaje);
		}
	})
}

var idParaModificarOBorrar;

function llenarMod(id){
	$('#formIngresarClientesNew').show("slide");
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarClientesId.php?jsoncallback=?";
	$.getJSON(url,{id:id}).done(function(data){
		if(data!=0){
			$.each(data,function(i,item){
				idParaModificarOBorrar=id;
				$('#nomCl2').val(item.nomCtl);
				$('#dirCl2').val(item.dirCtl);
			})
		}
		else{
			alert(data.mensaje);
		}
	});
}	

function modificar(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/modificarCliente.php?jsoncallback=?";

	var id = idParaModificarOBorrar;
	var nom = $('#nomCl2').val();
	var dir = $('#dirCl2').val();
	var form = $('#formIngresarClientesNew');

	$.getJSON(url,{nom:nom,dir:dir,id:id}).done(function(data)
	{
		llenarClientes2();
		form.hide();
		resets();
	});
}
function eliminar(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarCliente.php?jsoncallback=?";
	var id = idParaModificarOBorrar;
	var tabla = $('#tablaConsultarDatos2');
	var form = $('#formIngresarClientesNew');
	$.getJSON(url,{id:id}).done(function(data)
	{
		llenarClientes2();
		form.hide();
		resets();
	});
}
