const inputNumber = document.getElementById('inputNumber');
const baseSelect = document.getElementById('baseSelect');
const convertBtn = document.getElementById('convertBtn');

const decimalResult = document.getElementById('decimal');
const binarioResult = document.getElementById('binario');
const octalResult = document.getElementById('octal');
const hexadecimalResult = document.getElementById('hexadecimal');

function limparResultados() {
  decimalResult.textContent = '—';
  binarioResult.textContent = '—';
  octalResult.textContent = '—';
  hexadecimalResult.textContent = '—';
}

convertBtn.addEventListener('click', () => {
  const numberStr = inputNumber.value.trim();
  const fromBase = parseInt(baseSelect.value, 10);

  const decimalValue = parseInt(numberStr, fromBase);

  if (isNaN(decimalValue)) {
    alert("Número inválido para a base selecionada.");
    limparResultados();
    return;
  }

  decimalResult.textContent = decimalValue.toString(10);
  binarioResult.textContent = decimalValue.toString(2);
  octalResult.textContent = decimalValue.toString(8);
  hexadecimalResult.textContent = decimalValue.toString(16).toUpperCase();
});

