$(document).on("ready",listo);

var f=new Date();
var fechaYear=f.getFullYear();
var yearSelect=fechaYear;
var yearSelect2=fechaYear;
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
    	graficos(yearSelect2);
    	$("#yearGraficoSelect3").hide();
    	$("#yearGraficoSelect2 option[value=0]").attr("selected","selected");
    	$("#yearGraficoSelect3 option:first").attr("selected","selected");
    });
    validar("14/02/93");
    graficos(fechaYear);
    for (var i = fechaYear; i >= fechaYear-10; i--) 
    {
    	$("#yearGraficoSelect").append("<option value='"+i+"'>"+i+"</option>");
    	$("#yearGraficoSelect3").append("<option value='"+i+"'>"+i+"</option>");
    };
    $("#yearGraficoSelect").on("change",function(){
    	var fec=$("#yearGraficoSelect").val();
    	graficos(fec);
	}); 

	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarCentrales.php?jsoncallback=?";
	$.getJSON(url,{
	}).done(function(data){
		$.each(data, function(i,item)
		{	
			$("#yearGraficoSelect2").append("<option class='optionCentrales' value='"+item.idCentral+"'>"+item.nombreCentral+"</option>");
		});
	});
	$("#yearGraficoSelect2").on("change",function(){
    	var central=$("#yearGraficoSelect2").val();
    	var central2=$("#yearGraficoSelect2 option:selected").text();
    	paraVerCentrales(central,central2,yearSelect);
	});
	$("#yearGraficoSelect3").on("change",function()
	{
    	var central=$("#yearGraficoSelect2").val();
    	var yearrr=$("#yearGraficoSelect3").val();
    	var central2=$("#yearGraficoSelect2 option:selected").text();
    	paraVerCentrales(central,central2,yearrr);
	});
};

function validar(fecha)
{

	var ar = fecha.split("/");
	/*alert(ar[2]);*/
} 
function paraVerCentrales(idCentral,nombreCentral,fecha) 
{
	$("#yearGraficoSelect3").show("slide");
	yearSelect=fecha;
	var arrayNumeros=new Array();
	var arrayNumeros2=new Array();
	arrayNumeros2[0]=0;
	arrayNumeros2[1]=0;
	arrayNumeros2[2]=0;
	arrayNumeros2[3]=0;
	arrayNumeros2[4]=0;
	arrayNumeros2[5]=0;
	arrayNumeros2[6]=0;
	arrayNumeros2[7]=0;
	arrayNumeros2[8]=0;
	arrayNumeros2[9]=0;
	arrayNumeros2[10]=0;
	arrayNumeros2[11]=0;
	if(idCentral!=0)
	{
		var url = "http://127.0.0.1/Cantv/jsonCantv/consultaFallasCentral.php?jsoncallback=?";
	$.getJSON(url,{id:idCentral}).done(function(data){
		if(data.num != 0){
			var cantidad=0;
			$.each(data,function(i,item)
			{
				var fecha2=validar(item.fecha);
				fecha2=fecha2.replace(/^\s+/,'').replace(/\s+$/,'');
				if(fecha2==fecha)
				{
					arrayNumeros[cantidad]=validar2(item.fecha);
					cantidad++;
				}				
			});
			if(cantidad==0)
			{
				$('#container2').highcharts({
			        title: {
			            text: 'Fallas En La Central '+nombreCentral
			        },

			        subtitle: {
			            text: fecha
			        },


			        xAxis: {
			            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic']
			        },

			        series: [{
			            data: [
			            	0,0,0,0,0,0,0,0,0,0,0,0
			            ]
			        }]
			    });
			}
			else
			{
				for (var i = arrayNumeros.length - 1; i >= 0; i--) 
				{
					if(arrayNumeros[i]==1 || arrayNumeros[i]==01)
					{
						arrayNumeros2[0]++;
					}
					if(arrayNumeros[i]==2 || arrayNumeros[i]==02)
					{
						arrayNumeros2[1]++;
					}
					if(arrayNumeros[i]==3 || arrayNumeros[i]==03)
					{
						arrayNumeros2[2]++;
					}
					if(arrayNumeros[i]==4 || arrayNumeros[i]==04)
					{
						arrayNumeros2[3]++;
					}
					if(arrayNumeros[i]==5 || arrayNumeros[i]==05)
					{
						arrayNumeros2[4]++;
					}
					if(arrayNumeros[i]==6 || arrayNumeros[i]==06)
					{
						arrayNumeros2[5]++;
					}
					if(arrayNumeros[i]==7 || arrayNumeros[i]==07)
					{
						arrayNumeros2[6]++;
					}
					if(arrayNumeros[i]==8 || arrayNumeros[i]==08)
					{
						arrayNumeros2[7]++;
					}
					if(arrayNumeros[i]==9 || arrayNumeros[i]==09)
					{
						arrayNumeros2[8]++;
					}
					if(arrayNumeros[i]==10)
					{
						arrayNumeros2[9]++;
					}
					if(arrayNumeros[i]==11)
					{
						arrayNumeros2[10]++;
					}
					if(arrayNumeros[i]==12)
					{
						arrayNumeros2[11]++;
					}
				}
				$('#container2').highcharts({
			        title: {
			            text: 'Fallas En La Central '+nombreCentral
			        },

			        subtitle: {
			            text: fecha
			        },


			        xAxis: {
			            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic']
			        },

			        series: [{
			            data: [
			            	arrayNumeros2[0],arrayNumeros2[1],arrayNumeros2[2],arrayNumeros2[3],arrayNumeros2[4],arrayNumeros2[5],arrayNumeros2[6],arrayNumeros2[7],arrayNumeros2[8],arrayNumeros2[9],arrayNumeros2[10],arrayNumeros2[11]
			            ]
			        }]
			    });
			}
		}
		else
		{
			$('#container2').highcharts({
		        title: {
		            text: 'Fallas En La Central '+nombreCentral
		        },

		        subtitle: {
		            text: fecha
		        },


		        xAxis: {
		            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic']
		        },

		        series: [{
		            data: [
		            	0,0,0,0,0,0,0,0,0,0,0,0
		            ]
		        }]
		    });
		}
	});
	}
	else
	{
		$('#container2').highcharts({
		        title: {
		            text: ''
		        },

		        subtitle: {
		            text: ""
		        },


		        xAxis: {
		            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic']
		        },

		        series: [{
		            data: [
		            	0,0,0,0,0,0,0,0,0,0,0,0
		            ]
		        }]
		    });
	}
}
function graficos(fecha)
{
	yearSelect2=fecha;
	var arrayNumeros=new Array();
	var arrayNumeros2=new Array();
	arrayNumeros2[0]=0;
	arrayNumeros2[1]=0;
	arrayNumeros2[2]=0;
	arrayNumeros2[3]=0;
	arrayNumeros2[4]=0;
	arrayNumeros2[5]=0;
	arrayNumeros2[6]=0;
	arrayNumeros2[7]=0;
	arrayNumeros2[8]=0;
	arrayNumeros2[9]=0;
	arrayNumeros2[10]=0;
	arrayNumeros2[11]=0;
	var url = "http://127.0.0.1/Cantv/jsonCantv/consultarFalla.php?jsoncallback=?";
	$.getJSON(url).done(function(data){
		if(data.num != 0){
			var cantidad=0;
			$.each(data,function(i,item)
			{
				var fecha2=validar(item.fecha);
				fecha2=fecha2.replace(/^\s+/,'').replace(/\s+$/,'');
				if(fecha2==fecha)
				{
					arrayNumeros[cantidad]=validar2(item.fecha);
					cantidad++;
				}				
			});
			if(cantidad==0)
			{
				$('#container').highcharts({
			        title: {
			            text: 'Fallas Por Año'
			        },

			        subtitle: {
			            text: fecha
			        },


			        xAxis: {
			            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic']
			        },

			        series: [{
			            data: [
			            	0,0,0,0,0,0,0,0,0,0,0,0
			            ]
			        }]
			    });
			}
			else
			{
				for (var i = arrayNumeros.length - 1; i >= 0; i--) 
				{
					if(arrayNumeros[i]==1 || arrayNumeros[i]==01)
					{
						arrayNumeros2[0]++;
					}
					if(arrayNumeros[i]==2 || arrayNumeros[i]==02)
					{
						arrayNumeros2[1]++;
					}
					if(arrayNumeros[i]==3 || arrayNumeros[i]==03)
					{
						arrayNumeros2[2]++;
					}
					if(arrayNumeros[i]==4 || arrayNumeros[i]==04)
					{
						arrayNumeros2[3]++;
					}
					if(arrayNumeros[i]==5 || arrayNumeros[i]==05)
					{
						arrayNumeros2[4]++;
					}
					if(arrayNumeros[i]==6 || arrayNumeros[i]==06)
					{
						arrayNumeros2[5]++;
					}
					if(arrayNumeros[i]==7 || arrayNumeros[i]==07)
					{
						arrayNumeros2[6]++;
					}
					if(arrayNumeros[i]==8 || arrayNumeros[i]==08)
					{
						arrayNumeros2[7]++;
					}
					if(arrayNumeros[i]==9 || arrayNumeros[i]==09)
					{
						arrayNumeros2[8]++;
					}
					if(arrayNumeros[i]==10)
					{
						arrayNumeros2[9]++;
					}
					if(arrayNumeros[i]==11)
					{
						arrayNumeros2[10]++;
					}
					if(arrayNumeros[i]==12)
					{
						arrayNumeros2[11]++;
					}
				}
				$('#container').highcharts({
			        title: {
			            text: 'Fallas Por Año'
			        },

			        subtitle: {
			            text: fecha
			        },


			        xAxis: {
			            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic']
			        },

			        series: [{
			            data: [
			            	arrayNumeros2[0],arrayNumeros2[1],arrayNumeros2[2],arrayNumeros2[3],arrayNumeros2[4],arrayNumeros2[5],arrayNumeros2[6],arrayNumeros2[7],arrayNumeros2[8],arrayNumeros2[9],arrayNumeros2[10],arrayNumeros2[11]
			            ]
			        }]
			    });
			}
		}
		else
		{
			$('#container').highcharts({
		        title: {
		            text: 'Fallas Por Año'
		        },

		        subtitle: {
		            text: fecha
		        },


		        xAxis: {
		            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic']
		        },

		        series: [{
		            data: [
		            	0,0,0,0,0,0,0,0,0,0,0,0
		            ]
		        }]
		    });
		}
	});
}
function validar(fecha)
{
	var ar = fecha.split("/");
	return ar[2];	
} 
function validar2(fecha)
{
	var ar = fecha.split("/");
	return ar[1];	
} 