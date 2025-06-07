const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_AZqP5gx9-_SgmtZ0WrPmaN3CayY0vpcR96pPQ7QHVJ1uudNwxzM0OSK2loqU3GNWFxC0VWZfwGbQ/pub?gid=0&single=true&output=csv'
const container = document.getElementById('cursos');
const timerEl = document.getElementById('timer');
let countdown = 30;


function atualizarTimer() {
  countdown--;
  if (countdown <= 0) {
    carregarDados();
    countdown = 30;
  }
  timerEl.textContent = countdown;
}
setInterval(atualizarTimer, 1000);

async function carregarDados() {
  try {
    const resposta = await fetch(sheetURL);
    const texto = await resposta.text();
    const linhas = texto.trim().split('\n').map(l => l.split(','));

    const cabecalhos = linhas[0];
    const dados = linhas.slice(1);

    container.innerHTML = ''; 

    dados.forEach((linha) => {
      const veiculo = document.createElement('div');
    
      veiculo.className = 'bg-blue rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 flex flex-col justify-between';

     
      const nomeVeiculo = linha[1]; // 

      const tituloVeiculo = document.createElement('h3');
      tituloVeiculo.className = 'text-2xl font-bold text-blue-800 mb-3';
      tituloVeiculo.textContent = nomeVeiculo;
      veiculo.appendChild(tituloVeiculo);

      const detalhesContainer = document.createElement('div');
      detalhesContainer.className = 'space-y-2 mb-4'; 

      linha.forEach((valor, i) => {

        if (cabecalhos[i] && i !== 0 && i !== 1) { 
          const item = document.createElement('p');
        
          item.className = 'text-gray-700 text-base';
          item.innerHTML = `<strong class="font-semibold text-gray-900">${cabecalhos[i]}:</strong> ${valor}`;
          detalhesContainer.appendChild(item);
        }
      });
      veiculo.appendChild(detalhesContainer);

     
      const botao = document.createElement('a');
      botao.href = `https://wa.me/5599999999999?text=Olá! Tenho interesse no veículo: ${encodeURIComponent(nomeVeiculo)}`;
      botao.target = '_blank';
 
      botao.className = ' w-full inline-block text-center bg-blue-200 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors duration-200 mt-auto';
      botao.textContent = '🚗 COMPRAR VEÍCULO';

      veiculo.appendChild(botao);
      container.appendChild(veiculo);
    });

  } catch (erro) {
    console.error('Erro ao carregar os dados:', erro);

    container.innerHTML = '<p class="col-span-full text-center text-red-600 text-lg font-semibold">Não foi possível carregar os veículos no momento. Por favor, tente novamente mais tarde.</p>';
  }
}


carregarDados();