//Rodrigo Santomauro (199089) - Nicolas Brandi (248135)
class Telecentro {
     constructor(telecentro) {
          this.telecentro     = telecentro;
          this.listaOperador  = [];
          this.listaLlamada   = [];
     }
     agregarListaOperador(unOperador){ //Nico aca  va el nombre de como llamas al operador al crearlo
          this.listaOperador.push(unOperador);
     }
     darListaOperador(){
          return this.listaOperador;
     }
     agregarListaLlamada(unaLlamada) {
          this.listaLlamada.push(unaLlamada);
     }
     darListaLlamada(){
          return this.listaLlamada;
     }
}

class Operador {
     constructor(nombre,edad,mail) {
          this.nombre    = nombre;
          this.edad      = edad;
          this.mail      = mail;
     }
     darNombre(){
          this.nombre;
     }
     toString(){
          return this.nombre + " " + this.edad + " " + this.mail;
     }
}

class Llamada {
     constructor(numero,operador,descricionLlamada,motivoLlamada,duracionLlamada,celularCliente) {
          this.numero              = numero;
          this.operador            = operador;
          this.descricionLlamada   = descricionLlamada;
          this.motivoLlamada       = motivoLlamada;
          this.duracionLlamada     = duracionLlamada;
          this.celularCliente      = celularCliente;
     }
     darOperador(){
          return this.operador.toString();
     }
     toString(){
          return "Numero" + this.numero + " Operador: " + this.operador + " descricion: " + this.descricionLlamada + " motivo: " + this.motivoLlamada + " duracion " + this.duracionLlamada + " celular " + this.celularCliente;
          //return this.operador;
     }
}
