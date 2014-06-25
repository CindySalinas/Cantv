$(document).on("ready",inicio);

function inicio ()
{
	menuPrin();
	$('#ingresarClientes').on('click',ingresarCliente);
	$('#dibujoConsultar').on('click',consultarClientes);
	$('#textoBusqueda1').on('change',consultarClientes);
	$('#textoBusqueda2').on('change',consultarClientes2);
	$('#modificarClientes').on('click',modificar);
	$('#eliminarClientes').on('click',eliminar);
}


function menuPrin(){
	$('#consultarCliente , #consultarCliente2').on('click',function(){
		hideAndShow('consClientes','ingClientes, #mdClientes,#contenedorMenuClientes');
	})
	$('#modificarCliente , #modificarCliente2').on('click',function(){
		hideAndShow('mdClientes','consClientes,#ingClientes,#contenedorMenuClientes');
	})
	$('#ingresarCliente , #ingresarCliente2').on('click',function(){
		hideAndShow('ingClientes','mdClientes, #consClientes,#contenedorMenuClientes');
	})
	$('.atras').on('click',function(){
		hideAndShow('contenedorMenuClientes','consClientes, #ingClientes, #mdClientes');
		resets();
	})
}

function hideAndShow (mostrar,ocultar) {
	$('#'+ocultar).hide("slow");
	$('#'+mostrar).show("slide");
}

function resets(){
	$('input:text').val("");
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
			alert(data.mensaje);
		}
	})
}
function consultarClientes2(){
	var tabla = $('#tablaConsultarDatos2');
	var busc = $('#textoBusqueda2').val();
	$('.newTr').remove();
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarClientes.php?jsoncallback=?";
	$.getJSON(url,{buscar :busc}).done(function(data){
		if(data.num !=0){
			$.each(data,function(i,item){
				tabla.css({'display':'inline-table','margin':'10px auto'});
				tabla.append('<tr class="newTr"><td> <a href="#" id='+item.idCtl+'>'+item.nomCtl+' </a> </td> <td> <a id='+item.idCtl+'>'+item.dirCtl+'</a></td></tr>')
				$('.newTr').on('click','a',function(data){
					llenarMod($(this).attr('id'));
				});
			});
		}
		else{
			alert(data.mensaje);
		}
	})
}

function llenarMod(id){
	$('#formIngresarClientes2').css({'display':'inline-table','margin':'10px auto'});
	var url = "http://127.0.0.1/Cantv/jsonCantv/buscarClientesId.php?jsoncallback=?";
	$.getJSON(url,{id:id}).done(function(data){
		if(data!=0){
			$.each(data,function(i,item){
				$('#idHide').val(id);
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
	var id = $('#idHide').val();
	var nom = $('#nomCl2').val();
	var dir = $('#dirCl2').val();
	var tabla = $('#tablaConsultarDatos2');
	var form = $('#formIngresarClientes2');
	$.getJSON(url,{nom:nom,dir:dir,id:id}).done(function(data){
		alert(data.mensaje);
		tabla.hide();
		form.hide();
		resets();
	})
}
function eliminar(){
	var url = "http://127.0.0.1/Cantv/jsonCantv/eliminarCliente.php?jsoncallback=?";
	var id = $('#idHide').val();
	var tabla = $('#tablaConsultarDatos2');
	var form = $('#formIngresarClientes2');
	$.getJSON(url,{id:id}).done(function(data){
		alert(data.mensaje);
		tabla.hide();
		form.hide();
		resets();
	});
}
