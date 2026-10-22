/**
 * Todos os textos e números do site ficam aqui.
 * Para mudar um texto: troque o que está entre aspas, salve e publique. O layout se ajusta sozinho.
 * Nos textos com <strong>…</strong>, o trecho entre as marcas aparece em destaque.
 */

export const contato = {
  whatsapp: 'https://wa.me/554195902537',
  whatsappDiagnostico: `https://wa.me/554195902537?text=${encodeURIComponent('Olá Victor, quero solicitar o diagnóstico gratuito')}`,
  telefone: '+55 41 9590-2537',
  email: 'victorodarp@gmail.com',
  instagram: 'https://instagram.com/victorodarp',
  arroba: '@victorodarp',
  cidade: 'Curitiba - PR',
}

export const seo = {
  titulo: 'Victor Eduardo | Marketing para Serviços & Facilities',
  descricao:
    'Site profissional, Google Meu Negócio, tráfego pago e conteúdo para empresas de serviços e facilities. Mais contatos pelo Google, menos dependência de indicação.',
}

export const topo = {
  selo: 'Marketing para Serviços & Facilities',
  cargo: 'Gestor de Mídias · Marketing para Serviços & Facilities',
  titulo: ['Pare de perseguir clientes', 'e comece a ser a primeira escolha.'],
  texto:
    'Enquanto você cuida da excelência da operação, <strong>eu faço sua empresa aparecer, ser encontrada e receber contatos</strong>. Site profissional, tráfego pago, Google Meu Negócio e conteúdo estratégico, pensados para empresas de serviços que querem liderar na sua região.',
  botao: 'Quero uma análise gratuita',
  botaoSecundario: 'Ver resultados reais',
}

/** Os balões em volta do pino: resultados reais da Inove Serviços. */
export const destaquesInove = {
  legenda: 'Resultados reais · Inove Serviços',
  itens: [
    { icone: 'trending-up', valor: 'Top 1', texto: 'no Google Maps' },
    { icone: 'star', valor: '4,9 ★', texto: '120+ avaliações' },
    { icone: 'target', valor: 'R$ 6,06', texto: 'por lead' },
    { icone: 'users', valor: '40 leads', texto: 'por mês' },
  ],
}

export const numeros = [
  { n: '8+', l: 'Empresas atendidas' },
  { n: '166%', l: 'Aumento médio de leads' },
  { n: '10.34k+', l: 'Visitas geradas no Google / mês' },
  { n: '14+', l: 'Sites criados no nicho' },
]

/** Faixa de clientes: sem logotipos, cada cliente aparece com as iniciais, o ramo e a cidade. */
export const clientes = [
  { nome: 'Inove Serviços', sigla: 'IS', ramo: 'Limpeza e portaria', cidade: 'Ponta Grossa/PR' },
  { nome: 'LimperSofá', sigla: 'LS', ramo: 'Higienização de estofados', cidade: 'Toledo/PR' },
  { nome: 'NékeLimpa', sigla: 'NL', ramo: 'Higienização de estofados', cidade: 'Toledo/PR' },
  { nome: 'LimperSofá Paraguay', sigla: 'LP', ramo: 'Limpieza de tapizados', cidade: 'Hernandarias/PY' },
]

export const problema = {
  selo: 'O problema de hoje',
  titulo: 'Empresas boas que o Google não encontra.',
  texto:
    'O serviço é bom, a equipe é confiável, mas os clientes novos somem, os concorrentes aparecem na frente e o telefone só toca por indicação. Reconhece?',
  itens: [
    {
      icone: 'search',
      titulo: 'Invisível no Google e no Maps',
      texto: 'Quando alguém busca "empresa de terceirização em [sua cidade]", o seu nome não aparece, mas o do concorrente aparece. Oportunidades que somem antes mesmo de chegarem até você.',
    },
    {
      icone: 'globe',
      titulo: 'Site que não transmite credibilidade',
      texto: 'Um site amador, ou nenhum site, faz o cliente desconfiar antes de entrar em contato. Em serviços, a primeira impressão digital vale tanto quanto a primeira visita presencial.',
    },
    {
      icone: 'trending-down',
      titulo: 'Tráfego pago jogando dinheiro fora',
      texto: 'Ou você nunca anunciou, ou já tentou e "não funcionou". Anúncios para serviços exigem configuração especializada: com a palavra errada, a verba vai para contatos que nunca vão contratar.',
    },
    {
      icone: 'smartphone',
      titulo: 'Sem presença consistente nas redes',
      texto: 'Conteúdo postado sem estratégia, sem frequência, sem pauta. Resultado: seguidores que não viram clientes e uma marca que não se diferencia de nenhuma outra.',
    },
    {
      icone: 'star',
      titulo: 'Poucas avaliações no Google',
      texto: 'Um perfil com 3 avaliações, ou com críticas sem resposta, é um freio de mão no crescimento. O cliente compara antes de ligar: menos estrelas, menos ligações.',
    },
    {
      icone: 'users',
      titulo: '100% dependente de indicação',
      texto: 'Indicação é ótima, mas não é previsível. Quando ela seca, o faturamento oscila. Uma empresa sólida precisa de canais que tragam clientes todo mês.',
    },
  ],
  fecho: ['Esses problemas não são falta de qualidade.', 'São falta de marketing especializado no setor.'],
}

export const servicos = {
  selo: 'O que eu entrego',
  titulo: 'Estratégia direta para quem presta serviços essenciais.',
  texto:
    'Não sou um profissional generalista: trabalho com empresas de serviços. Por isso entrego com velocidade, porque já sei como o seu cliente pesquisa, compara e decide.',
  itens: [
    {
      icone: 'monitor-smartphone',
      titulo: 'Site profissional que converte',
      texto: 'Página construída para transformar visitante em contato, não apenas para "ter uma presença online".',
      inclui: [
        'Design focado em credibilidade e conversão',
        'Textos persuasivos, escritos para o seu cliente',
        'Rápido, adaptado ao celular e otimizado para o Google',
        'Formulário e botão de WhatsApp integrados',
        'Medição de contatos configurada',
      ],
    },
    {
      icone: 'map-pin',
      titulo: 'Google Meu Negócio',
      texto: 'Seu perfil local configurado e gerenciado para aparecer para quem está perto e pronto para contratar.',
      inclui: [
        'Otimização completa do perfil',
        'Estratégia para conseguir mais avaliações',
        'Publicações semanais e respostas',
        'Acompanhamento das buscas da sua região',
        'Fotos e informações sempre atualizadas',
      ],
    },
    {
      icone: 'megaphone',
      titulo: 'Tráfego pago (Google Ads e Meta Ads)',
      texto: 'Campanhas feitas para o seu nicho: segmentação, palavras-chave e criativos pensados para quem contrata serviços.',
      inclui: [
        'Configuração e estrutura das campanhas',
        'Palavras-chave específicas do setor',
        'Otimização contínua e relatório mensal',
        'Foco em custo por contato, não em cliques',
        'Criação dos anúncios e dos textos',
      ],
    },
    {
      icone: 'pen-tool',
      titulo: 'Criação de conteúdo',
      texto: 'Pauta estratégica, produção e publicação de conteúdo que posiciona sua empresa como referência.',
      inclui: [
        'Conteúdo para Instagram, Facebook e LinkedIn',
        'Posts educativos, cases e depoimentos',
        'Artes e legendas alinhadas à sua identidade',
        'Calendário com frequência definida',
        'Reels, posts estáticos e carrosséis',
      ],
    },
  ],
}

export const processo = {
  selo: 'Como funciona',
  titulo: 'Do diagnóstico ao crescimento, em 5 passos.',
  passos: [
    { icone: 'search', titulo: 'Diagnóstico', texto: 'Análise gratuita da sua presença digital atual' },
    { icone: 'compass', titulo: 'Estratégia', texto: 'Plano personalizado com metas e canais' },
    { icone: 'rocket', titulo: 'Execução', texto: 'Entrega dos serviços com prazo definido' },
    { icone: 'chart-column', titulo: 'Relatório', texto: 'Números reais e transparentes todo mês' },
    { icone: 'trending-up', titulo: 'Crescimento', texto: 'Otimização contínua baseada em dados' },
  ],
}

export const cases = {
  selo: 'Cases reais',
  titulo: 'Resultados de quem já apostou no marketing especializado.',
  texto: 'Dados reais, clientes reais.',
  itens: [
    {
      aba: 'Inove Serviços',
      nome: 'Inove Serviços Terceirização',
      ramo: 'Limpeza e portaria profissional',
      local: 'Ponta Grossa, PR · 2025',
      canais: ['Google Ads', 'Meta Ads', 'Google Meu Negócio', 'Redes sociais', 'Site'],
      metricas: [
        { n: '4x', l: 'mais leads por mês' },
        { n: 'Top 1', l: 'no Google Maps' },
        { n: 'R$6,06', l: 'custo por lead' },
      ],
      partes: [
        { titulo: 'Antes', texto: 'Três gargalos de conversão: site com design e textos desalinhados, pouca autoridade no Google (menos de 60 avaliações) e anúncios que não geravam resultado real.' },
        { titulo: 'O que foi feito', texto: 'Reestruturação digital completa (site, Google Meu Negócio, tráfego e conteúdo) para reverter a baixa conversão e fortalecer a autoridade local.' },
        { titulo: 'Resultado em 4 meses', texto: 'De 4 a 5 leads por mês para 40 leads por mês, com custo 70% abaixo da média do setor.' },
      ],
      citacao: 'O nível das entregas faz toda a diferença para nós. O trabalho de marketing tem sido importantíssimo para alavancar o crescimento da empresa.',
      autor: 'Proprietário · Inove Serviços',
    },
    {
      aba: 'LimperSofá',
      nome: 'LimperSofá',
      ramo: 'Higienização de estofados',
      local: 'Toledo, PR · 2025',
      canais: ['Google Meu Negócio', 'Redes sociais', 'Site'],
      metricas: [
        { n: '3x', l: 'mais leads por mês' },
        { n: '12+', l: 'novas avaliações no Google' },
        { n: '16%', l: 'conversão do site' },
      ],
      partes: [
        { titulo: 'Antes', texto: 'Dependência quase total de indicação, Instagram desorganizado (só fotos estáticas) e Google Meu Negócio desatualizado e com poucas fotos.' },
        { titulo: 'O que foi feito', texto: 'Reestruturação do Google Meu Negócio para captar quem já está pronto para contratar e conteúdo estratégico para gerar desejo e confiança.' },
        { titulo: 'Resultado em 5 meses', texto: 'Salto de 2 para 9 orçamentos por mês, de forma constante, preenchendo a agenda da equipe e reduzindo o tempo parado.' },
      ],
      citacao: 'Estou satisfeito com a cara do nosso site e com os conteúdos. O reflexo disso é real, tem dias e momentos faço orçamentos em quantidades que não estava acostumado',
      autor: 'Proprietário · LimperSofá',
    },
    {
      aba: 'NékeLimpa',
      nome: 'NékeLimpa',
      ramo: 'Higienização de estofados',
      local: 'Toledo, PR · 2025',
      canais: ['Google Ads', 'Meta Ads', 'Google Meu Negócio', 'Redes sociais', 'Site'],
      metricas: [
        { n: '1.297k', l: 'impressões por mês no Google' },
        { n: '53+', l: 'novos orçamentos' },
        { n: '6x', l: 'retorno sobre o investimento' },
      ],
      partes: [
        { titulo: 'Antes', texto: 'Pouca presença digital na região, fora do ranking do Google e com uma comunicação que não mostrava o valor do serviço, atraindo clientes que só comparavam preço.' },
        { titulo: 'O que foi feito', texto: 'Posicionamento de marca focado em autoridade, Google Meu Negócio reestruturado com estratégia de avaliações e anúncios de pesquisa voltados ao público de maior poder aquisitivo.' },
        { titulo: 'Resultado em 5 meses', texto: 'Crescimento forte nas buscas locais e clientes mais qualificados, que fecham pelo valor percebido e não só pelo menor preço.' },
      ],
      citacao: 'Gostei demais de como o instagram ficou e do nível dos conteúdos. O retorno em orçamentos é visível.',
      autor: 'Proprietário · NékeLimpa',
    },
    {
      aba: 'LimperSofá Paraguay',
      nome: 'LimperSofá Paraguay',
      ramo: 'Limpieza de tapizados y alfombras',
      local: 'Hernandarias, Paraguai · 2025',
      canais: ['Google Ads', 'Meta Ads', 'Redes sociais', 'Site', 'Adaptação de mercado'],
      metricas: [
        { n: '100%', l: 'estrutura digital do zero' },
        { n: '3+', l: 'canais ativos no novo país' },
        { n: 'Ativo', l: 'em fase de tração' },
      ],
      partes: [
        { titulo: 'O desafio', texto: 'Levar uma marca brasileira para o Paraguai começando do zero, ainda sem Google Meu Negócio (aguardando liberação de endereço), o que exigiu presença forte no Meta Ads e em um site próprio.' },
        { titulo: 'O que foi feito', texto: 'Site focado em conversão, adaptado ao idioma e ao comportamento local, base de conteúdo no Instagram para gerar autoridade e primeiras campanhas de Meta Ads para testar público e marca.' },
        { titulo: 'Status do projeto', texto: 'Estrutura digital 100% implantada. Em fase de testes de tráfego, coletando dados do novo mercado para aumentar o investimento nas próximas semanas.' },
      ],
      citacao: 'Entrar em um novo país é um desafio gigante, mas ter o site e as redes sociais montados com tanta qualidade nos deu a base e a segurança que precisávamos para dar esse primeiro passo.',
      autor: 'Proprietário · LimperSofá Paraguay',
    },
  ],
}

export const depoimentos = {
  selo: 'O que dizem os clientes',
  titulo: 'Donos de empresas que pararam de depender só de indicação.',
  texto: 'Prints reais de conversas com clientes. Toque para ampliar.',
  // As imagens ficam em src/assets e são ligadas em src/pages/index.astro.
  quem: ['Proprietário · Inove Serviços · Ponta Grossa/PR', 'Proprietário · NékeLimpa · Toledo/PR', 'Proprietário · LimperSofá · Toledo/PR'],
}

export const antesDepois = {
  selo: 'O que muda na prática',
  titulo: 'Antes e depois de um marketing feito para serviços.',
  antes: [
    'Dependência total de indicação',
    'Invisível nas buscas do Google',
    'Site desatualizado ou inexistente',
    'Poucas avaliações no Google Maps',
    'Conteúdo sem estratégia ou frequência',
    'Verba de marketing desperdiçada',
  ],
  depois: [
    'Contatos chegando todo dia pelo Google',
    'Top 3 nas buscas locais do nicho',
    'Site que transmite credibilidade e converte',
    '120+ avaliações com nota 4,9',
    'Conteúdo que posiciona como referência',
    'Campanhas com retorno medido todo mês',
  ],
}

export const sobre = {
  selo: 'Quem faz isso acontecer',
  titulo: 'Não sou generalista.',
  anos: '3+',
  paragrafos: [
    'Sou <strong>Victor Eduardo</strong>, gestor focado em presença digital, com ênfase em serviços essenciais e facilities. Atuo com um objetivo claro: <strong>garantir que empresas sérias parem de perder contratos por falta de visibilidade.</strong> No seu mercado, confiança não se constrói com curtidas, mas com autoridade e presença no momento certo.',
    'Atendo negócios no Paraná e região e conheço o que realmente faz diferença: o tempo de decisão de quem contrata para empresas, a urgência do cliente residencial e o peso das avaliações locais que a maioria ignora. Sei como encurtar o caminho até o orçamento.',
    'Minha entrega é direta: <strong>site, Google, anúncios e conteúdo que geram contatos reais, não números vazios.</strong> Trabalho com relatórios claros e foco total em conversão.',
    'Venho do "chão de fábrica" e de uma família de empreendedores. Como ex-inspetor de qualidade, aplico no marketing o mesmo rigor técnico que você exige na sua operação. Sei como o mercado funciona por dentro, não apenas por trás de uma tela.',
  ],
  credenciais: [
    { icone: 'graduation-cap', texto: 'Formando em Análise e Desenvolvimento de Sistemas' },
    { icone: 'award', texto: 'Subido · Aluno do Pedro Sobral' },
    { icone: 'map-pin', texto: 'Curitiba - PR' },
  ],
}

export const faq = {
  selo: 'Perguntas frequentes',
  titulo: 'Dúvidas que aparecem antes de fechar.',
  texto: 'Prefiro responder aqui do que deixar uma dúvida travar a sua decisão.',
  itens: [
    {
      p: 'Preciso contratar todos os serviços juntos?',
      r: 'Não. Posso atuar em <strong>um canal específico</strong> (só Google Meu Negócio, só tráfego, só site) ou em pacotes combinados. No diagnóstico gratuito, analiso sua situação e recomendo o que fará mais diferença no menor tempo. Sem vender o que você não precisa.',
    },
    {
      p: 'Em quanto tempo aparecem os resultados?',
      r: 'Depende do canal. <strong>Tráfego pago</strong> pode gerar contatos já na primeira semana com a campanha no ar. O <strong>Google Meu Negócio</strong> mostra evolução em 30 a 60 dias. O <strong>SEO orgânico</strong> leva de 3 a 6 meses para se consolidar. Por isso costumo combinar canais de resultado rápido com estratégias de longo prazo.',
    },
    {
      p: 'Há fidelidade ou contrato mínimo?',
      r: 'Trabalho com contratos mensais renováveis, com <strong>3 meses de compromisso inicial</strong>: o tempo necessário para implantar a estratégia e colher os primeiros resultados consistentes. Não existe multa abusiva: se você não estiver vendo valor, conversamos antes de qualquer decisão.',
    },
    {
      p: 'Como funciona a verba do tráfego pago?',
      r: 'O <strong>dinheiro dos anúncios (Google Ads/Meta Ads) fica 100% na sua conta</strong>. Você tem acesso, visibilidade e controle total. Eu cobro apenas pela gestão estratégica das campanhas. Assim, você nunca depende de mim para saber onde seu dinheiro foi parar.',
    },
  ],
}

export const chamadaFinal = {
  selo: 'Próximo passo',
  titulo: ['Pronto para sua empresa', 'aparecer na frente dos concorrentes?'],
  texto: 'Uma análise gratuita mostra exatamente onde você está perdendo clientes. Sem compromisso, sem enrolação.',
  botao: 'Falar no WhatsApp agora',
}
