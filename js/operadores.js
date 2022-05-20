//Rodrigo Santomauro (199089) - Nicolas Brandi (248135)

function agregarOperador() {
     let nombre    = document.getElementById("operadorNombre").value;
	let edad      = parseInt(document.getElementById("operadorEdad").value);
	let mail      = document.getElementById("operadorMail").value;

     if (!controlDeRango(edad,18,65) || !(nombre.length > 0) || !(nombre.length < 20) || !(mail.length > 0)){
          alert("Los datos ingresados son invalidos");
     }
     else{
          if(buscarNombre(nombre)){
               let unOperador = new Operador(nombre,edad,mail);
               elTelecentro.agregarListaOperador(unOperador);
          }
     }
     mostrarOperadores();
     cargaOperadorCombo();
}

function buscarNombre(nombre) {
     let listaOperadorAux = elTelecentro.listaOperador;
     let esNuevo = true;
     let primeraVez = true;
     for(let i = 0; i < listaOperadorAux.length; i++){
          let operador = listaOperadorAux[i];
          let buscarNombre=0;
          for(let k in operador){
               buscarNombre++;
               if(buscarNombre===1){
                    let nombreaux=operador[k];
                    if(nombre===nombreaux){
                         alert("El usuario ya existe");
                         esNuevo=false;
                         return esNuevo;
                    }
               }
          }
     buscarNombre=0;
     }
     if(primeraVez || esNuevo){
          return esNuevo;
          primeraVez=false;
     }
}

function mostrarOperadores() {
     let ordenadoOperadorPorNombre = document.getElementById("ordenarNombre").checked;
     let ul = document.getElementById("listaDeOperadores");
     ul.innerHTML="";

     let listaOperadorAux = elTelecentro.listaOperador;

     let listaOperadorOrdenada = ordenarOperadores(ordenadoOperadorPorNombre,listaOperadorAux);

     for(let i = 0; i < listaOperadorAux.length; i++){
          let textoHTML = "";
          let operador = listaOperadorAux[i];
          let contador=0;
          for (let k in operador){
               contador++;
               if (contador===3){
                    textoHTML = textoHTML + " " + "<a href='mailto:"+operador[k]+"'>" + operador[k] + "</a>";
               }
               else{
                    textoHTML = textoHTML + " " + operador[k];
               }
          }
          contador=0;
          let li         =    document.createElement('li');
          li.innerHTML   =    textoHTML;
          ul.appendChild(li);
     }
}

function ordenarOperadores(ordenadoOperadorPorNombre,listaOperadorAux) {
     if (ordenadoOperadorPorNombre){
          elTelecentro.darListaOperador().sort(function (a, b) {
               if (a.nombre > b.nombre) {
                    return 1;
               }
               if (a.nombre < b.nombre) {
                    return -1;
               }
               return 0;
          });
     }
     else{
          elTelecentro.darListaOperador().sort(function (primer, segunda){
			let retorno = 0;
			if (primer.edad < segunda.edad){
				retorno = -1;
			}
			if (primer.edad > segunda.edad){
				retorno = 1;
			}
				return retorno;
			});
     }
}

function cargaOperadorCombo() {
     let selectllamada = document.getElementById("operadorCombo");
     let selectConsulta = document.getElementById("operadorConsultaCombo");
     selectllamada.innerHTML="";
     selectConsulta.innerHTML="";

     let listaAux = elTelecentro.darListaOperador().sort(function (a, b) {
          if (a.nombre > b.nombre) {
               return 1;
          }
          if (a.nombre < b.nombre) {
               return -1;
          }
          return 0;
     });
     let comboHTML = "";
     for (let i = 0; i < listaAux.length; i++){
		let operador       = listaAux[i];
          comboHTML = comboHTML + "<option value='"+operador.nombre+"'>"+operador.nombre+"</option>";
     }
     selectllamada.innerHTML = comboHTML;
     selectConsulta.innerHTML = comboHTML;
}

function consultarHistoria() {
     let listaAux = elTelecentro.darListaLlamada();
     let nombreOperador = document.getElementById("operadorConsultaCombo").value;
     let coincide=false;
     let contador=0;
     let motivos=[];
     for(let i = 0; i < listaAux.length; i++){
          let llamada = listaAux[i];
          for(let k in llamada){
               contador++;
               if((contador===2) && (nombreOperador===llamada[k])){
                    coincide=true;
               }
               if((contador===4) && (coincide)){
                    motivos.push(llamada[k]);
                    coincide=false;
               }
          }
          contador=0;
     }
     motivos.sort();
     motivos.unique();
     let loEscribo = true;
     let p = document.getElementById("motivosNoAtendioOperador");
     let texto = "";
     for(let i = 1; i < 7; i++){
          loEscribo=true;
          for (let j = 0; j < motivos.length; j++){
               if(i===motivos[j]){
                    loEscribo=false;
               }
          }
          if (loEscribo){
               texto = texto + "<img class='motivoNoAtendio' src='img/"+i+".png'/>" + " ";
          }
     }
     p.innerHTML= texto;

     llamadaMasLarga(listaAux,nombreOperador);
}

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function llamadaMasLarga(listaAux,nombreOperador) {
     let listaOrdenadaPorDuracion = listaAux.sort(function (primer, segunda){
          let retorno = 0;
          if (primer.duracionLlamada < segunda.duracionLlamada){
               retorno = 1;
          }
          if (primer.duracionLlamada > segunda.duracionLlamada){
               retorno = -1;
          }
               return retorno;
          });
     let encontre=false;
     let p = document.getElementById("masLarga");
     let promedio = document.getElementById("promedioAtencion");
     let promedioDuracion = 0;
     for(let i = 0; i < 2;i++){
          let llamada = listaOrdenadaPorDuracion[i];
          for(let k in llamada){
               if ((llamada.operador===nombreOperador) && (!encontre)){
                    encontre=true;
                    p.innerHTML= "Numero: "+llamada.numero + " Duracion " + llamada.duracionLlamada;
               }
          }
          if(listaOrdenadaPorDuracion.length>1){
               promedioDuracion = promedioDuracion + llamada.duracionLlamada;
          }
     }
     if(listaOrdenadaPorDuracion.length>1){
          promedioDuracion = (promedioDuracion / listaOrdenadaPorDuracion.length);
          promedio.innerHTML= ""+promedioDuracion;
     }
}
