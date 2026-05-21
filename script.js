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
            error.textContent = mensaje;

        }

        function limpiarError(input, idError){

            input.classList.remove("input-error");

            const error = document.getElementById(idError);

            error.style.display = "none";
            error.textContent = "";

        }

        function calcularPorcentaje(base, porcentaje){
            return base * porcentaje;
        }

        formulario.addEventListener("submit", function(e){

            e.preventDefault();

            let valido = true;

            const nombreCompleto = document.getElementById("nombreCompleto");
            const edad = document.getElementById("edad");
            const tipoDoc = document.getElementById("tipoDoc");
            const numeroDoc = document.getElementById("numeroDoc");
            const salario = document.getElementById("salario");
            const comisiones = document.getElementById("comisiones");
            const horasExtras = document.getElementById("horasExtras");

            limpiarError(nombreCompleto, "errorNombre");
            limpiarError(edad, "errorEdad");
            limpiarError(tipoDoc, "errorTipoDoc");
            limpiarError(numeroDoc, "errorNumeroDoc");
            limpiarError(salario, "errorSalario");


            if(nombreCompleto.value.trim().length < 5){

                mostrarError(
                    nombreCompleto,
                    "El nombre debe tener mínimo 5 caracteres",
                    "errorNombre"
                );

                valido = false;
            }

            if(
                edad.value === "" ||
                edad.value < 0 ||
                edad.value > 120
            ){

                mostrarError(
                    edad,
                    "La edad debe estar entre 0 y 120",
                    "errorEdad"
                );

                valido = false;
            }

            if(tipoDoc.value === ""){

                mostrarError(
                    tipoDoc,
                    "Seleccione un tipo de documento",
                    "errorTipoDoc"
                );

                valido = false;
            }

            if(
                numeroDoc.value.length < 5 ||
                numeroDoc.value.length > 15
            ){

                mostrarError(
                    numeroDoc,
                    "El documento debe tener entre 5 y 15 números",
                    "errorNumeroDoc"
                );

                valido = false;
            }

            if(salario.value <= 0){

                mostrarError(
                    salario,
                    "Ingrese un salario válido",
                    "errorSalario"
                );

                valido = false;
            }

            if(!valido){
                return;
            }


            let edadValor = Number(edad.value);
            let salarioValor = Number(salario.value);
            let comisionesValor = Number(comisiones.value) || 0;
            let horasExtrasValor = Number(horasExtras.value) || 0;

            let mensajeEdad = "";

            if (edadValor < 18){

                mensajeEdad = "No tiene permitido entrar";

            } 
            else if (edadValor >= 18 && edadValor <= 25){

                mensajeEdad = "Usuario beneficiario por cotizante, no puede entrar";

            } 
            else if (edadValor >= 60){

                mensajeEdad = "Se calculará la pensión";

            } 
            else {

                mensajeEdad = "Puede entrar";

            }


            let salarioTotal = salarioValor + comisionesValor + horasExtrasValor;

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
