const autos = require("./autos");

const concesionaria = {
   //debe tener un atributo llamado autos que contenga la lista de automóviles importada anteriormente
   autos: autos,
   //buscarAuto recibe por parámetro la patente y devuelve el auto al cual le corresponde
   //En caso de no encontrar el mismo, deberá retornar null
   buscarAuto : function (patente){
      for (let i = 0; i < this.autos.length; i++) {
         if (this.autos[i].patente == patente) {
            return this.autos[i];
         } else {
            return null;
         }
      }
   },
   //venderAuto recibe la patente y, en caso de encontrar al automóvil, le asigna el estado de vendido
   venderAuto : function(patente){
      //primero buscamos si existe el auto
      const autoVendido = this.buscarAuto(patente);
      if (autoVendido != null){
         autoVendido.vendido = true;
         return autoVendido;
      } else {
         return "No se encontró el automovil";
      }
   },
   //listar autos en venta, sin que aparezcan los que ya fueron vendidos.
   autosParaLaVenta : function(){
      const autosFiltrados = this.autos.filter(function(unAuto){
         return unAuto.vendido == false;
      });
      return autosFiltrados;
   },
   //Indicar cuáles de los autos para la venta son 0 km (menor a 100 km).
   autosNuevos : function(){
      const autosEnVenta = this.autosParaLaVenta();
      const autos0km = autosEnVenta.filter(function(autoNuevo){
         return autoNuevo.km < 100;
      });
      return autos0km;
   },
   //Devolver una lista que contiene el precio de venta de cada auto vendido
   listaDeVentas : function(){
      let listado = [];
      for (let i = 0; i < this.autos.length; i++) {
         if (this.autos[i].vendido == true){
            listado.push(autos[i].precio);
         }
      }
      return listado;
   },
   //Devolver la sumatoria del valor de todas las ventas realizadas
   totalDeVentas : function (){
      let totalVentas = this.listaDeVentas();
      let sumaVentas = totalVentas.reduce((acumulador, numero) => acumulador + numero, 0);
      return sumaVentas;
   },
   //Verificar si una persona puede comprar o no un auto
   puedeComprar : function(auto, persona){
      if (auto.precio <= persona.capacidadDePagoTotal && auto.precio/auto.cuotas <= persona.capacidadDePagoEnCuotas){
         return true;
      } else {
         return false;
      };
   },
   //ofrecer fácilmente qué autos puede comprar así no tiene que estar preguntando uno por uno
   autosQuePuedeComprar : function (persona){
      const autosEnVenta = this.autosParaLaVenta();
      const autosParaPersona = autosEnVenta.filter(function(unAuto){
         return unAuto.precio <= persona.capacidadDePagoTotal && ((unAuto.precio/unAuto.cuotas) <= persona.capacidadDePagoEnCuotas);
      });
      return autosParaPersona;
   },
};

let persona = {
   nombre: "Juan",
   capacidadDePagoEnCuotas: 20000,
   capacidadDePagoTotal: 100000
};

let auto = {
   marca: 'Toyota',
   modelo: 'Corolla',
   precio: 200000,
   km: 0,
   color: 'Blanco',
   cuotas: 14,
   anio: 2019,
   patente: 'JJK116',
   vendido: false
}

//console.log(concesionaria.buscarAuto("APL123"));
//console.log(concesionaria.venderAuto("APL123"));
//console.log(concesionaria.autosParaLaVenta());
//console.log(concesionaria.autosNuevos());
//console.log(concesionaria.listaDeVentas());
//console.log(concesionaria.totalDeVentas())
console.log(concesionaria.puedeComprar(auto, persona));
//console.log(concesionaria.autosQuePuedeComprar(persona));