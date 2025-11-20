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

  // Validação simples (se o valor for inválido, ex: "ABC" em base 10)
  if (isNaN(decimalValue)) {
    alert("Número inválido para a base selecionada.");
    decimalResult.textContent = '—';
    binarioResult.textContent = '—';
    octalResult.textContent = '—';
    hexadecimalResult.textContent = '—';
    return;
  }

  // Converte para as outras bases
  const binarioValue = decimalValue.toString(2);
  const octalValue = decimalValue.toString(8);
  const hexadecimalValue = decimalValue.toString(16).toUpperCase();

  // Exibe os resultados
  decimalResult.textContent = decimalValue.toString(10);
  binarioResult.textContent = binarioValue;
  octalResult.textContent = octalValue;
  hexadecimalResult.textContent = hexadecimalValue;
});
