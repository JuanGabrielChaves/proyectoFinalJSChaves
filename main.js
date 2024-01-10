const btnPrestamo = document.querySelector(".solicitar");
const MAYOR = 21;
const MONTO_MINIMO = 10000;
const TEA = 50;

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
    const listItem = document.createElement("li");
    const mensaje = document.createTextNode(
      `Cuota ${i} de ${Number(
        saldoCuotas
      )}  | Monto de la cuota $ ${montoPorCuota}   |   Saldo faltante $ ${saldoTotal}`
    );
    listItem.appendChild(mensaje);
    document.getElementById("listado").appendChild(listItem);
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
