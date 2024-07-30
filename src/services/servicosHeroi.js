export const obterHerois = async () => {
    try {
      const response = await fetch('https://homologacao3.azapfy.com.br/api/ps/metahumans');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados: ' + response.statusText);
      }
      const data = await response.json();
      // Verifique a estrutura dos dados
      console.log('Dados recebidos da API:', data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar heróis:', error);
      return [];
    }
  };