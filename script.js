const btn = document.getElementById('convertBtn');

btn.addEventListener('click', () => {
  const input = document.getElementById('inputNumber').value.trim();
  const base = parseInt(document.getElementById('baseSelect').value);

  if (!input) {
    alert('Por favor, digite um número!');
    return;
  }

  let decimal;
  try {
    decimal = parseInt(input, base);
    if (isNaN(decimal)) throw new Error();
  } catch {
    alert('Número inválido para a base selecionada!');
    return;
  }

  document.getElementById('decimal').textContent = decimal.toString(10);
  document.getElementById('binario').textContent = decimal.toString(2);
  document.getElementById('octal').textContent = decimal.toString(8);
  document.getElementById('hexadecimal').textContent = decimal.toString(16).toUpperCase();
});