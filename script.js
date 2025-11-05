// ... (variáveis do DOM) ...
const inputNumber = document.getElementById('inputNumber');
const baseSelect = document.getElementById('baseSelect');
const convertBtn = document.getElementById('convertBtn');
const decimalResult = document.getElementById('decimal');
const binarioResult = document.getElementById('binario');
const octalResult = document.getElementById('octal');
const hexadecimalResult = document.getElementById('hexadecimal');

// ... (variáveis do DOM) ...

convertBtn.addEventListener('click', () => {
  const numberStr = inputNumber.value;
  const fromBase = parseInt(baseSelect.value, 10);

  const decimalValue = parseInt(numberStr, fromBase);

  // 2. Converte o valor decimal para as outras bases
  // Esta é a outra função-chave: numero.toString(baseDeDestino)
  const binarioValue = decimalValue.toString(2);
  const octalValue = decimalValue.toString(8);
  const hexadecimalValue = decimalValue.toString(16).toUpperCase(); // .toUpperCase() para Ficar "A" e não "a"

  console.log(`Binário: ${binarioValue}, Octal: ${octalValue}, Hex: ${hexadecimalValue}`);
});