let nombreCompleto = "";
let edad = 0;
let tipoDoc = "";
let numeroDoc = "";  

if (edad < 18 ) {
console.log ("No tiene permitido entrar");
}
else if (edad >=18 && edad <= 25) { 
        console.log("Usuario beneficiario por cotizante, no puede entrar");
    }
else if (edad >= 60){
console.log("Se calculara la pensión");
}
else {
    console.log("Puede entrar");
}


let salario = 0;
let comisiones = 0;
let horasExtras = 0;
let nivelRiesgo = "";

const SMLV = 1750905;
const SMIV = 22761765;
const SubTransporte = 249095;
const undValorTributario = 52.37;  

const riesgo1 = 0.522;
const riesgo2 = 1.044;
const riesgo3 = 2.436;
const riesgo4 = 4.350;
const riesgo5 = 6.960;

const porcentajeIBC = 0.7;
const porcentajeSalud = 0.04;
const porcentajePension = 0.04;
const porcentFondoSolidaridad = 0.01;

function calcularPorcentaje (base, porcentaje) {
  return base * porcentaje;
}

let fondoSolidaridad = calcularPorcentaje(IBC, porcentFondoSolidaridad);
IBC>=4*SMLV ? fondoSolidaridad : fondoSolidaridad = 0;

let SalarioTotal = salario + comisiones + horasExtras;
let IBC = calcularPorcentaje(SalarioTotal, porcentajeIBC);
let salud = calcularPorcentaje(IBC, porcentajeSalud);
let pension = calcularPorcentaje(IBC, porcentajePension);


