//Botones:
const btnPrestamo = document.querySelector(".solicitar");
const btnBuscar = document.querySelector("#buscar");
const btnAllMonedas = document.querySelector(".monedasAll");

//Constantes:
const MAYOR = 21;
const MONTO_MINIMO = 10000;
const TEA = 50;

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

let monedas = [
  { nombre: "Dolar BNA", valor: 804.5 },
  { nombre: "Dolar MEP", valor: 1218.25 },
  { nombre: "Dolar Blue", valor: 1249.8 },
  { nombre: "Euro", valor: 887.97 },
  { nombre: "Reales", valor: 167.8 },
  { nombre: "Libra Esterlina", valor: 1041.97 },
  { nombre: "Yen", valor: 5.6094 },
  { nombre: "Peso Uruguayo", valor: 20.77 },
];

function buscarMoneda() {
  const nombreMonedaInput = document
    .querySelector("#inputMoneda")
    .value.trim()
    .toLowerCase();
  const monedasCoincidentes = monedas.filter((moneda) =>
    moneda.nombre.toLowerCase().includes(nombreMonedaInput)
  );
  const resultadoDiv = document.querySelector("#resultado");
  if (monedasCoincidentes.length > 0) {
    resultadoDiv.innerHTML = "";
    monedasCoincidentes.forEach((moneda) => {
      resultadoDiv.innerHTML += `
              <p>1 <strong>${moneda.nombre}</strong>  =  <strong>$ </strong>${moneda.valor}</p>
          `;
    });
  } else {
    resultadoDiv.innerHTML = `
    <p><strong>No se encontró la moneda, por favor vuelva a intentar</strong></p>
`;
  }
}

let valorParaMostrar = monedas.map((moneda) => {
  return {
    nombre: moneda.nombre,
    valor: `1 ${moneda.nombre} = <strong>Pesos Argentinos</strong> $${moneda.valor} `,
  };
});

crearGrillaMonedas = () => {
  const gridContainer = document.querySelector(".grid-container");
  valorParaMostrar.forEach((moneda) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.innerHTML = `<strong>${moneda.nombre}:</strong> ${moneda.valor}`;
    gridContainer.appendChild(gridItem);
  });
};

const esMayor = (edad) => edad >= MAYOR;

const montoSolicitado = () => {
  let monto = Number(
    prompt(
      `Ingrese el monto que desar solicitarnos (sin puntos ni caracteres extraños)`
    )
  );
  if (monto) {
    while (monto < MONTO_MINIMO) {
      monto = Number(prompt("Ingrese un monto mayor o igual a $ 10.000"));
    }
    return monto;
  }
};

const cantCuotas = () => {
  let cuotas = Number(prompt("Ingrese la cantidad de cuotas"));
  if (cuotas) {
    while (cuotas < 1) {
      cuotas = Number(
        prompt("Ingrese la cantidad de cuotas (debe ser mayor a 0)")
      );
    }
    return cuotas;
  }
};

const armarForm = (monto, cuotas) => {
  let saldoTotal = Number(monto);
  const saldoCuotas = Number(cuotas);
  const montoPorCuota = Number(saldoTotal / saldoCuotas);
  let saldoRestante;
  for (let i = 1; i <= saldoCuotas; i++) {
    saldoTotal -= montoPorCuota;
    const gridItem = document.createElement("div");
    gridItem.innerHTML = `Cuota ${i} de ${Number(
      saldoCuotas
    )}  | Monto de la cuota $ ${montoPorCuota}   |   Saldo faltante $ ${saldoTotal}`;
    document.querySelector("#listado").appendChild(gridItem);
  }
};

const solicitar = () => {
  let edad = prompt("ingrese su edad");
  if (edad) {
    if (!esMayor(edad)) {
      alert("NO TIENE EDAD PARA SOLICITAR PRESTAMOS");
    } else {
      let monto = montoSolicitado();
      if (monto) {
        let cuotas = cantCuotas();
        armarForm((monto * TEA) / 100 + monto, cuotas);
      }
    }
  }
};
btnBuscar.addEventListener("click", buscarMoneda);
btnPrestamo.addEventListener("click", solicitar);
btnAllMonedas.addEventListener("click", crearGrillaMonedas);
