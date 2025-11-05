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
  const fromBase = parseInt(baseSelect.value, 10); // Converte "10" (string) para 10 (número)

  // 1. Converte o número de entrada (qualquer base) para Decimal (base 10)
  // Esta é a função-chave: parseInt(string, baseDeOrigem)
  const decimalValue = parseInt(numberStr, fromBase);

  console.log(`Valor em decimal: ${decimalValue}`);
});