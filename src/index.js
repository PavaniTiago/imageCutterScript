const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Diretório de entrada e saída
const diretorioEntrada = 'src/assets/';
const diretorioSaida = 'src/imagens_recortadas/';

// Altura total do recorte (superior + inferior)
const alturaTotalRecorte = 220;

// Função para recortar uma imagem na parte superior e inferior
async function recortarImagem(nomeDoArquivo) {
  try {
    const caminhoEntrada = path.join(diretorioEntrada, nomeDoArquivo);
    const caminhoSaida = path.join(diretorioSaida, nomeDoArquivo);

    // Lê a imagem
    const imagem = await sharp(caminhoEntrada);

    // Obtém as dimensões originais da imagem
    const { width, height } = await imagem.metadata();

    // Calcula a nova altura após o recorte
    const novaAltura = height - alturaTotalRecorte;

    // Realiza o recorte na parte superior e inferior
    await imagem
      .extract({ left: 0, top: alturaTotalRecorte / 2, width, height: novaAltura })
      .toFile(caminhoSaida);

    console.log(`Imagem recortada: ${nomeDoArquivo}`);
  } catch (erro) {
    console.error(`Erro ao recortar imagem ${nomeDoArquivo}: ${erro.message}`);
  }
}

// Lista todos os arquivos no diretório de entrada
fs.readdir(diretorioEntrada, (erro, arquivos) => {
  if (erro) {
    console.error(`Erro ao listar arquivos: ${erro.message}`);
    return;
  }

  // Itera sobre a lista de arquivos e recorta cada imagem
  arquivos.forEach(recortarImagem);
});
