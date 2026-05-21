const formulario = document.getElementById("formulario");

const SMLV = 1750905;
const porcentajeIBC = 0.7;
const porcentajeSalud = 0.04;
const porcentajePension = 0.04;
const porcentFondoSolidaridad = 0.01;


function mostrarError(input, mensaje, idError){

    input.classList.add("input-error");

    const error = document.getElementById(idError);

    error.style.display = "block";
    error.innerText = mensaje;
}


function limpiarError(input, idError){

    input.classList.remove("input-error");

    const error = document.getElementById(idError);

    error.style.display = "none";
    error.innerText = "";
}

function validarNombre(){

    const input = document.getElementById("nombreCompleto");
    const valor = input.value.trim();

    if(valor === ""){

        mostrarError(
            input,
            "El nombre es obligatorio",
            "errorNombre"
        );

        return false;
    }

    if(valor.length < 5){

        mostrarError(
            input,
            "Debe tener mínimo 5 caracteres",
            "errorNombre"
        );

        return false;
    }

    if(valor.length > 50){

        mostrarError(
            input,
            "Máximo 50 caracteres",
            "errorNombre"
        );

        return false;
    }

    if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(valor)){

        mostrarError(
            input,
            "Solo se permiten letras",
            "errorNombre"
        );

        return false;
    }

    limpiarError(input, "errorNombre");

    return true;
}


function validarEdad(){

    const input = document.getElementById("edad");

    const valor = Number(input.value);

    if(input.value === ""){

        mostrarError(
            input,
            "La edad es obligatoria",
            "errorEdad"
        );

        return false;
    }

    if(valor < 0 || valor > 120){

        mostrarError(
            input,
            "Edad inválida",
            "errorEdad"
        );

        return false;
    }

    limpiarError(input, "errorEdad");

    return true;
}

function validarTipoDoc(){

    const input = document.getElementById("tipoDoc");

    if(input.value === ""){

        mostrarError(
            input,
            "Seleccione un tipo de documento",
            "errorTipoDoc"
        );

        return false;
    }

    limpiarError(input, "errorTipoDoc");

    return true;
}

function validarDocumento(){

    const input = document.getElementById("numeroDoc");

    const valor = input.value;

    if(valor === ""){

        mostrarError(
            input,
            "El documento es obligatorio",
            "errorNumeroDoc"
        );

        return false;
    }

    if(valor.length < 5){

        mostrarError(
            input,
            "Mínimo 5 números",
            "errorNumeroDoc"
        );

        return false;
    }

    if(valor.length > 15){

        mostrarError(
            input,
            "Máximo 15 números",
            "errorNumeroDoc"
        );

        return false;
    }

    if(!/^[0-9]+$/.test(valor)){

        mostrarError(
            input,
            "Solo se permiten números",
            "errorNumeroDoc"
        );

        return false;
    }

    limpiarError(input, "errorNumeroDoc");

    return true;
}


function validarSalario(){

    const input = document.getElementById("salario");

    const valor = Number(input.value);

    if(input.value === ""){

        mostrarError(
            input,
            "El salario es obligatorio",
            "errorSalario"
        );

        return false;
    }

    if(valor <= 0){

        mostrarError(
            input,
            "Ingrese un salario válido",
            "errorSalario"
        );

        return false;
    }

    limpiarError(input, "errorSalario");

    return true;
}

function calcularPorcentaje(base, porcentaje){

    return base * porcentaje;
}


formulario.addEventListener("submit", function(e){

    e.preventDefault();

    let valido = true;


    if(!validarNombre()){
        valido = false;
    }

    if(!validarEdad()){
        valido = false;
    }

    if(!validarTipoDoc()){
        valido = false;
    }

    if(!validarDocumento()){
        valido = false;
    }

    if(!validarSalario()){
        valido = false;
    }


    if(!valido){

        alert("Corrija los errores antes de continuar");

        return;
    }


    const nombreCompleto = document.getElementById("nombreCompleto").value;

    const edad = Number(
        document.getElementById("edad").value
    );

    const salario = Number(
        document.getElementById("salario").value
    );

    const comisiones = Number(
        document.getElementById("comisiones").value
    ) || 0;

    const horasExtras = Number(
        document.getElementById("horasExtras").value
    ) || 0;


    let mensajeEdad = "";

    if (edad < 18){

        mensajeEdad = "No tiene permitido entrar";

    } 
    else if (edad >= 18 && edad <= 25){

        mensajeEdad = "Usuario beneficiario por cotizante, no puede entrar";

    } 
    else if (edad >= 60){

        mensajeEdad = "Se calculará la pensión";

    } 
    else {

        mensajeEdad = "Puede entrar";

    }


    let salarioTotal = salario + comisiones + horasExtras;

    let IBC = calcularPorcentaje(
        salarioTotal,
        porcentajeIBC
    );

    let salud = calcularPorcentaje(
        IBC,
        porcentajeSalud
    );

    let pension = calcularPorcentaje(
        IBC,
        porcentajePension
    );

    let fondoSolidaridad = 0;

    if(IBC >= 4 * SMLV){

        fondoSolidaridad = calcularPorcentaje(
            IBC,
            porcentFondoSolidaridad
        );

    }

    const resultado = document.getElementById("resultado");

    resultado.style.display = "block";

    resultado.innerHTML = `

        <p><strong>Nombre:</strong> ${nombreCompleto}</p>

        <p><strong>Estado:</strong> ${mensajeEdad}</p>

        <p><strong>Salario Total:</strong> 
        $${salarioTotal.toLocaleString()}</p>

        <p><strong>IBC:</strong> 
        $${IBC.toLocaleString()}</p>

        <p><strong>Salud:</strong> 
        $${salud.toLocaleString()}</p>

        <p><strong>Pensión:</strong> 
        $${pension.toLocaleString()}</p>

        <p><strong>Fondo Solidaridad:</strong> 
        $${fondoSolidaridad.toLocaleString()}</p>

    `;

});