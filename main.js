//Botones:
const btnPrestamo = document.querySelector(".solicitar");
const btnBuscar = document.querySelector("#buscar");
const btnAllMonedas = document.querySelector(".monedasAll");

//Constantes:
const MAYOR = 21;
const MONTO_MINIMO = 10000;
const TEA = 50;
const datosAGuardar = [];

class Persona {
  constructor(nombre, apellido, edad, dni, telefono) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.telefono = telefono;
  }
  esMayor = () => this.edad >= MAYOR;
  getNombre = () => this.nombre;
  getApellido = () => this.apellido;
  getEdad = () => this.edad;
  getDni = () => this.dni;
  getTelefono = () => this.telefono;
}

class SolicitudPrestamo {
  constructor(Persona, montoSolicitado, cantCuotas) {
    this.Persona = Persona;
    this.montoSolicitado = montoSolicitado;
    this.cantCuotas = cantCuotas;
  }
}

// Variable para controlar si los datos ya se cargaron
let datosCargados = false;
// Función asincrona que trae los datos del dolar de la api: dolarapi
const traerDatosDolares = async () => {
  if (!datosCargados) {
    // Verifica si los datos aún no se han cargado
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      const data = await response.json();

      // Guardar los datos en el localStorage
      localStorage.setItem("monedas", JSON.stringify(data));
      console.log("Monedas guardadas en el localStorage");

      // Crear elementos en el DOM con los datos
      const datosDls = document.querySelector(".datos-dls");
      const titulo = document.createElement("div");
      titulo.innerHTML = `<h2>Datos actuales por tipo de dólar:</h2>`;
      datosDls.appendChild(titulo);
      const gridContainer = document.querySelector(".grid-container-dls");

      data.forEach((moneda) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.innerHTML = `<strong>Dólar ${moneda.nombre}:</strong> 
          <p>Valor de venta:  <strong>$ ${moneda.venta}</strong></p> 
          <p>Valor de compra: <strong>$ ${moneda.compra}</strong></p>`;
        gridContainer.appendChild(gridItem);
      });

      datosCargados = true; // Marcar los datos como cargados
    } catch (error) {
      console.log(error);
    }
  }
};
// Función para mostrar fecha en formato amigable
function convertirFechaCorta(fecha) {
  const fechaNueva = new Date(fecha);
  const opciones = { año: "numeric", mes: "short", dia: "numeric" };
  return fechaNueva.toLocaleDateString(undefined, opciones);
}
// Función para buscar una moneda en los datos guardados en el localStorage
const buscarMoneda = () => {
  const nombreMonedaInput = document
    .querySelector("#inputMoneda")
    .value.trim()
    .toLowerCase();

  if (!nombreMonedaInput) {
    Swal.fire({
      title: "No hay datos para mostrar",
      text: "Debe ingresar un tipo de dólar!",
      icon: "error",
    });
    return;
  }

  const todasLasMonedas = JSON.parse(localStorage.getItem("monedas"));
  const monedasCoincidentes = todasLasMonedas.filter((moneda) =>
    moneda.nombre.toLowerCase().includes(nombreMonedaInput)
  );
  const resultadoDiv = document.querySelector("#resultado");
  if (monedasCoincidentes.length > 0) {
    resultadoDiv.innerHTML = "";
    monedasCoincidentes.forEach((moneda) => {
      resultadoDiv.innerHTML += `
        <strong>Dólar ${moneda.nombre}:</strong>
        <p><strong>${moneda.moneda}</strong></p>
        <p>Valor de venta:  <strong>$ ${moneda.venta}</strong></p> 
        <p>Valor de compra: <strong>$ ${moneda.compra}</strong></p>
        <p>Fecha de actualización: <strong>${convertirFechaCorta(
          moneda.fechaActualizacion
        )}</strong></p>
      `;
    });
  } else {
    resultadoDiv.innerHTML = `
      <p><strong>No se encontró la moneda, por favor vuelva a intentar</strong></p>
    `;
  }
};

// booleano que retorna true si es mayor de edad
const esMayor = (edad) => edad >= MAYOR;

const ingresoDeEdad = async () => {
  const result = await Swal.fire({
    title: "Ingrese su edad (sin puntos ni caracteres extraños)",
    input: "number",
    inputLabel: "Edad",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe ingresar su edad!";
      }
    },
  });

  let edad;
  if (result.isConfirmed) {
    edad = Number(result.value);
  }
  return edad;
};

const montoSolicitado = async () => {
  const result = await Swal.fire({
    title:
      "Ingrese el monto que desea solicitarnos (sin puntos ni caracteres extraños)",
    input: "number",
    inputLabel: "Monto solicitado",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe ingresar un monto!";
      } else if (value < 10000) {
        return "Debe ingresar un monto mayor o igual a $ 10.000!";
      }
    },
  });

  let montoPedido;
  if (result.isConfirmed) {
    montoPedido = Number(result.value);
  }
  return montoPedido;
};

const ingresoNombre = async () => {
  const result = await Swal.fire({
    title: "Ingrese su nombre",
    input: "text",
    inputLabel: "Nombres:",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe ingresar su nombre!";
      }
    },
  });

  let nombre;
  if (result.isConfirmed) {
    nombre = result.value;
  }
  return nombre;
};

const ingresoApellido = async () => {
  const result = await Swal.fire({
    title: "Ingrese su apellido",
    input: "text",
    inputLabel: "Apellidos:",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe ingresar su apellido!";
      }
    },
  });

  let apellido;
  if (result.isConfirmed) {
    apellido = result.value;
  }
  return apellido;
};

const ingresoDNI = async () => {
  const result = await Swal.fire({
    title: "Ingrese su DNI (sin puntos ni caracteres extraños)",
    input: "number",
    inputLabel: "Documento Nacional de Identidad",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe ingresar su DNI!";
      }
    },
  });

  let dni;
  if (result.isConfirmed) {
    dni = Number(result.value);
  }
  return dni;
};

const ingresoTelefono = async () => {
  const result = await Swal.fire({
    title: "Ingrese su número de teléfono (sin puntos ni caracteres extraños)",
    input: "number",
    inputLabel: "Teléfono",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe ingresar su número de teléfono!";
      }
    },
  });

  let telefono;
  if (result.isConfirmed) {
    telefono = Number(result.value);
  }
  return telefono;
};

const cantCuotas = async () => {
  const result = await Swal.fire({
    title: "Ingrese la cantidad de cuotas",
    icon: "question",
    input: "range",
    inputLabel: "Cantidad de Cuotas:",
    inputAttributes: {
      min: "1",
      max: "60",
      step: "1",
    },
    inputValue: 12,
  });

  let cuotas;
  if (result.isConfirmed) {
    cuotas = Number(result.value);
  }
  return cuotas;
};

const armarForm = (monto, cuotas) => {
  let saldoTotal = Number(monto);
  const saldoCuotas = Number(cuotas);
  const montoPorCuota = Number(saldoTotal / saldoCuotas);
  for (let i = 1; i <= saldoCuotas; i++) {
    saldoTotal -= montoPorCuota;
    const gridItem = document.createElement("div");
    gridItem.innerHTML = `Cuota ${i} de ${Number(
      saldoCuotas
    )}  | Monto de la cuota $ ${montoPorCuota}   |   Saldo faltante $ ${saldoTotal}`;
    document.querySelector("#listado").appendChild(gridItem);
  }
};

const solicitar = async () => {
  const edad = await ingresoDeEdad();
  if (!esMayor(edad)) {
    Swal.fire({
      title: "Operación Cancelada",
      text: "No tiene edad para solicitar prestamos!",
      icon: "error",
    });
    return;
  }
  const monto = await montoSolicitado();
  if (monto) {
    const nombre = await ingresoNombre();
    const apellido = await ingresoApellido();
    const dni = await ingresoDNI();
    const telefono = await ingresoTelefono();
    let persona = new Persona(nombre, apellido, edad, dni, telefono);
    const cuotas = await cantCuotas();
    let solicitud = new SolicitudPrestamo(persona, monto, cuotas);
    localStorage.setItem(`solicitud${persona.dni}`, JSON.stringify(solicitud));
    if (localStorage.getItem(`solicitud${persona.dni}`) != null) {
      Swal.fire({
        title: "Solicitud exitosa!",
        text: "Se ha grabado con exito su solicitud!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Ha ocurrido un error!",
        text: "No se ha podido guardar la solicitud",
        icon: "error",
      });
    }
    armarForm((monto * TEA) / 100 + monto, cuotas);
  }
};
btnBuscar.addEventListener("click", buscarMoneda);
btnPrestamo.addEventListener("click", solicitar);
btnAllMonedas.addEventListener("click", traerDatosDolares);
