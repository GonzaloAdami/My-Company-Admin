const calculadora_comisiones = (ventas: number, local: string) => {
    let calculo = 0;

  switch (local) {
    case "F1 / F2 / Cabildo":
      if (ventas > 0) {
        calculo = 100 + ((ventas - 25000) / 5000) * 100;
      }
      break;
    case "F3":
      if (ventas > 0 && ventas <= 200000) {
        calculo = 100 + ((ventas - 25000) / 5000) * 100;
      } else if (ventas > 200000) {
        calculo = 3600 + ((ventas - 200000) / 3000) * 100;
      }
      break;

  }

  // Redondear a múltiplos de 100 y evitar negativos
  const redondeado = Math.max(0, Math.floor(calculo / 100) * 100);
  return redondeado;
}
export default calculadora_comisiones;