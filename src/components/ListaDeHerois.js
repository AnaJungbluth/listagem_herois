import React, { useState, useEffect } from 'react';
import CartaoHeroi from './CartaoHeroi';
import FiltroDeBusca from './FiltroDeBusca';
import ModalBatalhaHeroi from './ModalBatalhaHeroi';
import { obterHerois } from '../services/servicosHeroi';

const ITEMS_POR_PAGINA = 10;

const ListaDeHerois = () => {
  const [herois, setHerois] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [heroiSelecionado1, setHeroiSelecionado1] = useState(null);
  const [heroiSelecionado2, setHeroiSelecionado2] = useState(null);
  const [vencedorBatalha, setVencedorBatalha] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    obterHerois().then(dados => {
      setCarregando(false);
      if (dados.length === 0) {
        setMensagemErro('Nenhum herói encontrado.');
      } else {
        setHerois(dados);
        setMensagemErro('');
      }
    }).catch(() => {
      setCarregando(false);
      setMensagemErro('Erro ao buscar heróis.');
    });
  }, []);

  useEffect(() => {
    if (heroiSelecionado1 && heroiSelecionado2) {
      lidarBatalha();
    }
  }, [heroiSelecionado1, heroiSelecionado2]);

  const lidarMudancaBusca = (evento) => {
    setTermoBusca(evento.target.value);
    setPaginaAtual(1); 
  };

  const heroisFiltrados = herois.filter(heroi =>
    heroi.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const totalPaginas = Math.ceil(heroisFiltrados.length / ITEMS_POR_PAGINA);
  const heroisNaPagina = heroisFiltrados.slice(
    (paginaAtual - 1) * ITEMS_POR_PAGINA,
    paginaAtual * ITEMS_POR_PAGINA
  );

  const selecionarHeroi = (heroi, selecionado) => {
    if (selecionado === 1) {
      setHeroiSelecionado1(heroi);
    } else {
      setHeroiSelecionado2(heroi);
    }
  };

  const lidarBatalha = () => {
    if (heroiSelecionado1 && heroiSelecionado2) {
      const somaHeroi1 = calcularSomaAtributos(heroiSelecionado1);
      const somaHeroi2 = calcularSomaAtributos(heroiSelecionado2);
  
      const vencedor = somaHeroi1 > somaHeroi2 ? heroiSelecionado1 : heroiSelecionado2;
      setVencedorBatalha(vencedor);

      // Limpar seleção após batalha
      setHeroiSelecionado1(null);
      setHeroiSelecionado2(null);
    }
  };

  const fecharModal = () => {
    setVencedorBatalha(null);
  };

  const calcularSomaAtributos = (heroi) => {
    const { powerstats } = heroi;
    return powerstats.intelligence + powerstats.strength + powerstats.speed + powerstats.durability + powerstats.power + powerstats.combat;
  };

  return (
    <div>
      <h1>Lista de Heróis</h1>
      <FiltroDeBusca termoBusca={termoBusca} onBuscaChange={lidarMudancaBusca} />
      {carregando ? (
        <p>Carregando...</p>
      ) : mensagemErro ? (
        <p>{mensagemErro}</p>
      ) : (
        <div className="lista-herois">
          {heroisNaPagina.length === 0 ? (
            <p>Nenhum herói encontrado com o termo de busca.</p>
          ) : (
            heroisNaPagina.map(heroi => (
              <CartaoHeroi
                key={heroi.id}
                heroi={heroi}
                onSelecionar={() => selecionarHeroi(heroi, heroiSelecionado1 ? 2 : 1)}
                selecionado={heroi === heroiSelecionado1 || heroi === heroiSelecionado2}
              />
            ))
          )}
        </div>
      )}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <button
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <span>Página {paginaAtual} de {totalPaginas}</span>
          <button
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}
      <div className="batalha-container">
        {heroiSelecionado1 && heroiSelecionado2 && (
          <button onClick={lidarBatalha} disabled={!heroiSelecionado1 || !heroiSelecionado2}>
            Iniciar Batalha
          </button>
        )}
      </div>
      {vencedorBatalha && <ModalBatalhaHeroi vencedor={vencedorBatalha} onFechar={fecharModal} />}
    </div>
  );
};

export default ListaDeHerois;
