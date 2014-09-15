$(document).on("ready",inicio);

function inicio ()
{
	cuantasFallas();
}	

function cuantasFallas()
{
	var ckie = $.cookie('tecSis');
	var url2 = "http://127.0.0.1/Cantv/jsonCantv/consultarFallasUsuario.php?jsoncallback=?";
	var tab = $("#consultaFallas1");
	$.getJSON(url2,{id:ckie
	}).done(function(data){
		$("#totalFallas").text(data.num);
		if(data.num!=0)
		{
			tab.show();
			var contar=0;
			$.each(data,function(i,item){
				contar++;
				if(i!="num")
				{
					tab.append("<tr><td>"+contar+"</td><td>"+item.enlace+"</td><td>"+item.desc+"</td><td>"+item.fecha+"</td><td>"+item.hora+"</td></tr>");
				}				
			});			
		}		
	});
}