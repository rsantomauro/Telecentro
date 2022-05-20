//Rodrigo Santomauro (199089) - Nicolas Brandi (248135)
onload=inicio;

let elTelecentro = new Telecentro("Telecentro");

function inicio(){
     cargaOperadorCombo();
     document.getElementById("agregarOperador").addEventListener("click", agregarOperador);
     document.getElementById("ordenarNombre").addEventListener("change", mostrarOperadores);
     document.getElementById("ordenarEdad").addEventListener("change", mostrarOperadores);
     document.getElementById("agregarLlamada").addEventListener("click", agregarLlamada);
     document.getElementById("ordenarLlamadaPorNumero").addEventListener("change", mostrarTablaLlamadas);
     document.getElementById("ordenarLlamadaPorNombre").addEventListener("change", mostrarTablaLlamadas);
     document.getElementById("consultarHistoria").addEventListener("click", consultarHistoria);
     document.getElementById("consultarDuracionLlamadas").addEventListener("click", consultarDuracionLlamadas);
     document.getElementById("consultarDescripcionLlamadas").addEventListener("click", consultarDescripcionLlamadas);
     document.getElementById("distribuirLlamadas").addEventListener("click", distribuirLlamadas);
}

function agregarLlamada(){
     let operador            = document.getElementById("operadorCombo").value;
	let descricionLlamada   = document.getElementById("descricionLlamada").value;
	let motivoLlamada       = parseInt(document.getElementById("motivoLlamada").value);
     let duracionLlamada     = parseInt(document.getElementById("duracionLlamada").value);
     let celularCliente      = document.getElementById("celular").value;

     if (!controlDeRango(motivoLlamada,1,6) || !controlDeRango(duracionLlamada,1,60) || !controlDeRango(celularCliente,091000000,099999999) || !(descricionLlamada.length > 0)){
          alert("Los datos ingresados son invalidos");
     }
     else{
          let numero = (elTelecentro.listaLlamada.length + 1);
          let unaLlamada = new Llamada(numero,operador,descricionLlamada,motivoLlamada,duracionLlamada,celularCliente);
          elTelecentro.agregarListaLlamada(unaLlamada);
          //alert(unaLlamada.toString());
          limpiarPantalla();
          mostrarTablaLlamadas();
     }
}

function controlDeRango(numero,mayor,menor){
	return numero >= mayor && numero <= menor;
}

function limpiarPantalla(){
	let tabla = document.getElementById("tablaMuestraLlamadas");
	tabla.innerHTML ="";
}

function mostrarTablaLlamadas(){
	let tabla = document.getElementById("tablaMuestraLlamadas");
	let ordenadoLlamadaPorNumero = document.getElementById("ordenarLlamadaPorNumero").checked;
	tabla.innerHTML ="";
	let header = tabla.createTHead();
          let row = header.insertRow(0);
          let cellNumero = row.insertCell();
          cellNumero.innerHTML          = "<p class='textoTablaTitulo'>NUMERO</p>";
          let cellOperador              = row.insertCell();
          cellOperador.innerHTML        = "<p class='textoTablaTitulo'>OPERADOR</p>";
          let cellDescripcion           = row.insertCell();
          cellDescripcion.innerHTML     = "<p class='textoTablaTitulo'>DESCRIPCION</p>";
          let cellMotivo                = row.insertCell();
          cellMotivo.innerHTML          = "<p class='textoTablaTitulo'>MOTIVO</p>";
          let cellDuracion              = row.insertCell();
          cellDuracion.innerHTML        = "<p class='textoTablaTitulo'>DURACION</p>";
          let cellCelular               = row.insertCell();
          cellCelular.innerHTML         = "<p class='textoTablaTitulo'>CELULAR</p>";

	let listaMostrar = ordenar(ordenadoLlamadaPorNumero);

	for (let i = 0; i < listaMostrar.length; i++){
		let fila          = tabla.insertRow();
		let llamada       = listaMostrar[i];
          let buscarImagen = 0;
		for (let k in llamada){
               buscarImagen ++;
               if (buscarImagen === 4){
                    cargarImagen(llamada[k],fila);
               }
               else{
                    let celda = fila.insertCell();
			     celda.innerHTML      = "<p class='textoTabla'>" + llamada[k] + "</p>";
               }
		}
	}
}

function cargarImagen(motivo,fila){
     let img=document.createElement("img");
     let celda = fila.insertCell();
     switch (motivo) {
          case 1:
               celda.innerHTML= "<img class='motivoLlamada' src='img/1.png'/>";
               break;
          case 2:
               celda.innerHTML= "<img class='motivoLlamada' src='img/2.png'/>";
               break;
          case 3:
               celda.innerHTML= "<img class='motivoLlamada' src='img/3.png'/>";
               break;
          case 4:
               celda.innerHTML= "<img class='motivoLlamada' src='img/4.png'/>";
               break;
          case 5:
               celda.innerHTML= "<img class='motivoLlamada' src='img/5.png'/>";
               break;
          case 6:
               celda.innerHTML= "<img class='motivoLlamada' src='img/6.png'/>";
               break;
          }
}


function ordenar(ordenadoLlamadaPorNumero){
     let operador = [];
     if (!ordenadoLlamadaPorNumero){
          //Ordena nombres
          let listaAux = elTelecentro.listaLlamada;
     	for (let i = 0; i < listaAux.length; i++){
               let llamada       = listaAux[i];
               let buscarNombres = 0;
               let cont=0;
               let nombreaux;
     		for (let k in llamada){
                    buscarNombres ++;
                    if (buscarNombres === 2){
                         nombreaux = llamada[k];
                         if (cont===0){
                              operador.push(llamada[k]);
                              cont=1;
                         }
                         for (let j = 0; j < operador.length; j++){
                              if (!nombreaux === operador[j]){
                                   operador.push(llamada[k]);
                              }
                         }
                    }
               }
     	}
          operador.sort();
          let telecentroAux = new Telecentro("telecentroAux");
          let seGuarda = false;
          let numeroAux;
          let operadorAux;
          let descricionLlamadaAux;
          let motivoLlamadaAux;
          let buscarNombres = 0;
          let duracionLlamadaAux;
          let celularClienteAux;
          let ultimoNumero = 0;
          let contandor=0;
          for (let i = 0; i < operador.length; i++){
               contandor=0;
               for (let j = 0; j < listaAux.length; j++){
                    let llamada = listaAux[j];
                    seGuarda=false;
                    for(let k in llamada){
                         buscarNombres ++;
                         if (buscarNombres === 2){
                              if (operador[i]===llamada[k]){
                                   seGuarda=true;
                                   ultimoNumero=llamada[k-1];
                              }
                              buscarNombres = 0;
                         }
                    }
                    if(seGuarda){
                         let unaLlamadaAux = new Llamada(numeroAux,operadorAux,descricionLlamadaAux,motivoLlamadaAux,duracionLlamadaAux,celularClienteAux);
                         unaLlamadaAux = llamada;
                         telecentroAux.agregarListaLlamada(unaLlamadaAux);
                    }
               }
          }
          return telecentroAux.darListaLlamada();
     }
     else{
          return elTelecentro.darListaLlamada();
     }
}

function consultarDuracionLlamadas() {
     let duracion   = document.getElementById("consultaDuracion").value;
     let listaAux   = elTelecentro.darListaLlamada();
     let ul = document.getElementById("listaDuracionLlamada");
     let li         =    document.createElement('li');
     ul.innerHTML = "";
     for(let i = 0; i < listaAux.length;i++){
          let llamada = listaAux[i];
          if (llamada.duracionLlamada==duracion){
               li.innerHTML = llamada.operador;
               ul.appendChild(li);
          }
     }
}

function consultarDescripcionLlamadas() {
     let palabras = document.getElementById("consultaPalabra").value;
     let listaAux = elTelecentro.darListaLlamada();

     let tabla = document.getElementById("consultarPalabras");
	tabla.innerHTML ="";
	let header = tabla.createTHead();
          let row = header.insertRow(0);
          let cellNumero = row.insertCell();
          cellNumero.innerHTML          = "<p class='textoTablaTitulo'>NUMERO</p>";
          let cellOperador              = row.insertCell();
          cellOperador.innerHTML        = "<p class='textoTablaTitulo'>OPERADOR</p>";
          let cellDescripcion           = row.insertCell();
          cellDescripcion.innerHTML     = "<p class='textoTablaTitulo'>DESCRIPCION</p>";
          let cellMotivo                = row.insertCell();
          cellMotivo.innerHTML          = "<p class='textoTablaTitulo'>MOTIVO</p>";
          let cellDuracion              = row.insertCell();
          cellDuracion.innerHTML        = "<p class='textoTablaTitulo'>DURACION</p>";
          let cellCelular               = row.insertCell();
          cellCelular.innerHTML         = "<p class='textoTablaTitulo'>CELULAR</p>";

     for (let i = 0; i < listaAux.length; i++){
          let fila          = tabla.insertRow();
          let llamada = listaAux[i];
          let llamadaDescripcion = llamada.descricionLlamada;
          let aparece = llamada.descricionLlamada.search(palabras);
          let buscarImagen = 0;
          if (aparece >=0){
               for (let k in llamada){
                    buscarImagen ++;
                    if (buscarImagen === 4){
                         cargarImagen(llamada[k],fila);
                    }
                    else{
                         let celda = fila.insertCell();
     			     celda.innerHTML      = "<p class='textoTabla'>" + llamada[k] + "</p>";
                    }
     		}
          }
     }
}

function distribuirLlamadas() {
     let listaAux = elTelecentro.darListaLlamada();
     let operadores = [];
     let totales = [];
     let sumaPorOperador=0;
     let datosGrafica = {operador: "", llamadas: ""};
     for(let i = 0; i < listaAux.length; i++){
          let llamada = listaAux[i];
          if(!operadores.includes(llamada.operador)){
               operadores.push(llamada.operador);
          }
     }

     for(let i = 0; i < operadores.length; i++){
          for(let j = 0; j < listaAux.length; j++){
               let llamada = listaAux[j];
               if (operadores[i]===llamada.operador){
                    sumaPorOperador++;
               }
          }
          totales[i]=sumaPorOperador;
     }
     cargarElCharter(operadores,totales);
}

function cargarElCharter(operadores,totales) {
     var data;
     var chart;

     function drawChart() {
          data = new google.visualization.DataTable();
          data.addColumn('string', 'Operador');
          data.addColumn('number','totales');
          for(let i = 0; i < operadores.length; i++){
               data.addRows([operadores[i], totales[i]]);
          }

          var options = {
               'title'  : 'Llamadas por cada Operador',
               'width'  : 400,
               'height' : 300
          };

          chart = new google.visualization.PieChart(document.getElementById('chart_div'));
          google.visualization.events.addListener(chart, 'select', selectHandler);
          chart.draw(data, options);
     }

     function selectHandler() {
          var selectedItem = chart.getSelection()[0];
          var value = data.getValue(selectedItem.row,0);
          alert('U selected' + value);
     }
}
