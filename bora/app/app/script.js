// script.js — conversão manual + upload do arquivo ao backend

// --- Conversão manual (DOM)
const inputNumber = document.getElementById('inputNumber');
const baseSelect = document.getElementById('baseSelect');
const convertBtn = document.getElementById('convertBtn');

const decimalResult = document.getElementById('decimal');
const binarioResult = document.getElementById('binario');
const octalResult = document.getElementById('octal');
const hexadecimalResult = document.getElementById('hexadecimal');

convertBtn.addEventListener('click', () => {
  const numberStr = inputNumber.value.trim();
  const fromBase = parseInt(baseSelect.value, 10);

  if (numberStr === "") {
    alert("Digite um número primeiro.");
    return;
  }

  // parseInt pode lançar NaN se inválido
  const decimalValue = parseInt(numberStr, fromBase);

  if (isNaN(decimalValue)) {
    alert("Número inválido para a base selecionada.");
    decimalResult.textContent = '—';
    binarioResult.textContent = '—';
    octalResult.textContent = '—';
    hexadecimalResult.textContent = '—';
    return;
  }

  // converte
  decimalResult.textContent = decimalValue.toString(10);
  binarioResult.textContent = decimalValue.toString(2);
  octalResult.textContent = decimalValue.toString(8);
  hexadecimalResult.textContent = decimalValue.toString(16).toUpperCase();
});

// --- Upload do arquivo e recebimento de links (DOM)
const uploadForm = document.getElementById('uploadForm');
const resultDiv = document.getElementById('result');

if (uploadForm) {
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const fromBase = document.getElementById('fromBase').value;

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Por favor selecione um arquivo (.txt ou .csv).");
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('from_base', fromBase);

    // feedback para o usuário
    resultDiv.textContent = "⏳ Processando...";

    try {
      const resp = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      if (!resp.ok) {
        // tenta obter mensagem de erro do servidor
        let err = await resp.text();
        try { err = JSON.parse(err).message || err; } catch(_) {}
        resultDiv.textContent = `❌ Erro: ${err}`;
        return;
      }

      const json = await resp.json();

      // mostra links de download
      resultDiv.innerHTML = `
        <div style="text-align:center; margin-top:8px;">
          <div class="result-msg">✅ Arquivo processado com sucesso!</div>
          <a class="result-link" href="${json.csv}" download>📥 Baixar CSV</a><br>
          <a class="result-link" href="${json.json}" download>📥 Baixar JSON</a>
        </div>
      `;
    } catch (err) {
      console.error(err);
      resultDiv.textContent = "❌ Erro de rede. Tente novamente.";
    }
  });
}
