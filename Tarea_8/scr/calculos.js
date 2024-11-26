
function mensajeTipoSeguro() {
    const seguroSelect = document.getElementById("seguro");
    const tipoSeguro = seguroSelect.value;
    let mensaje = "";

    switch (tipoSeguro) {
        case "10.45": 
            mensaje = "Protección Básica Obligatoria (PBO): Cubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito. Costo de alquiler diario: $5.45 por día.";
            break;
        case "15.50": 
            mensaje = "Protección Extendida de Daños (PED): Cubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones. Costo de alquiler diario: $9.50 por día.";
            break;
        case "18.25": 
            mensaje = "Protección Gasto Médicos (PGM): Cubre la Protección Extendida de Daños (PED) más gastos médicos para los ocupantes del vehículo. Costo de alquiler diario: $11.25 por día.";
            break;
        default:
            mensaje = "Seleccione un tipo de seguro.";
    }

    alert(mensaje);
}

function calcularCotizacion() {
    const fechaRetiro = new Date(document.querySelector('input[name="fechaRetiro"]').value);
    const fechaDevolucion = new Date(document.querySelector('input[name="fechadevolucion"]').value);
    const diasInput = document.querySelector('input[name="dias"]');
    const tipoVehiculoSelect = document.getElementById("tipoVehiculo");
    const seguroSelect = document.getElementById("seguro");
    const totalPagarInput = document.querySelector('input[name="totalPagar"]');
    const tdInput = document.querySelector('input[name="td"]');

    const dias = Math.ceil((fechaDevolucion - fechaRetiro) / (1000 * 60 * 60 * 24));
    
    if (dias < 3 || dias > 365) {
        alert("Los días no son correctos. Deben estar entre 3 y 365 días.");
        return;
    }
    
    diasInput.value = dias;

    
    const tarifaVehiculo = parseFloat(tipoVehiculoSelect.value);
    const tarifaSeguro = parseFloat(seguroSelect.value);
    
    let tarifaDiaria = tarifaVehiculo + tarifaSeguro;

   
    if (dias > 30 && dias < 120) {
        tarifaDiaria *= 0.85; 
    } else if (dias >= 120) {
        tarifaDiaria *= 0.75; 
    }

    tdInput.value = tarifaDiaria.toFixed(2);
    const totalPagar = tarifaDiaria * dias;
    totalPagarInput.value = totalPagar.toFixed(2);
}

function guardarCotizacion() {
    const dias = document.querySelector('input[name="dias"]').value;
    const td = document.querySelector('input[name="td"]').value;
    const totalPagar = document.querySelector('input[name="totalPagar"]').value;
    const nacionalidad = document.getElementById("nacionalidad").value;

    const cotizacion = {
        dias,
        td,
        totalPagar,
        nacionalidad
    };

    localStorage.setItem("cotizacion", JSON.stringify(cotizacion));
    alert("Cotización guardada.");
}

document.addEventListener("DOMContentLoaded", function() {
    cargarNacionalidades();
    mostrarUltimaCotizacion();
});

function mostrarUltimaCotizacion() {
    const cotizacion = JSON.parse(localStorage.getItem("cotizacion"));
    if (cotizacion) {
        document.querySelector('input[name="dias"]').value = cotizacion.dias;
        document.querySelector('input[name="td"]').value = cotizacion.td;
        document.querySelector('input[name="totalPagar"]').value = cotizacion.totalPagar;
        document.getElementById("nacionalidad").value = cotizacion.nacionalidad;
    }
}