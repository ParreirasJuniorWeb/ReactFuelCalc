# ReactFuelCalc

ReactFuelCalc — Sistema de consulta econômica de combustível (Gasolina ou Etanol).

Um aplicativo simples e responsivo em React para ajudar o usuário a decidir, com base nos preços informados, qual combustível é mais vantajoso economicamente: gasolina ou etanol.

---

## Sumário

- [Sobre](#sobre)
- [Recursos](#recursos)
- [Demonstração](#demonstra%C3%A7%C3%A3o)
- [Instalação](#instala%C3%A7%C3%A3o)
- [Uso](#uso)
- [Lógica do Cálculo](#l%C3%B3gica-do-c%C3%A1lculo)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts úteis](#scripts-%C3%BAteis)
- [Testes](#testes)
- [Deploy](#deploy)
- [Contribuição](#contribui%C3%A7%C3%A3o)
- [Licença](#licen%C3%A7a)
- [Contato](#contato)

---

## Sobre

ReactFuelCalc é uma aplicação front-end construída com React que recebe os preços de gasolina e etanol e indica qual combustível oferece melhor custo-benefício com base na fórmula econômica comumente usada no Brasil.

Objetivos:
- Fornecer uma forma rápida e intuitiva para comparar preços.
- Interface acessível e responsiva.
- Código simples e fácil de manter.

---

## Recursos

- Entrada de preços com validação básica.
- Resultado imediato com explicação do porquê da escolha.
- Interface responsiva para desktop e mobile.
- Mensagens de erro claras para entradas inválidas.

---

## Demonstração

(Adicione aqui um link para demo, vídeo ou screenshots. Exemplo:)
- Demo: https://seu-deploy-aqui.example.com
- Screenshot: docs/screenshot.png

---

## Instalação

Pré-requisitos:
- Node.js (recomendado >= 14)
- npm ou yarn

Passos para rodar localmente:

1. Clone o repositório
   git clone https://github.com/ParreirasJuniorWeb/ReactFuelCalc.git
2. Entre na pasta do projeto
   cd ReactFuelCalc
3. Instale as dependências
   npm install
   # ou
   yarn
4. Inicie a aplicação em modo de desenvolvimento
   npm start
   # ou
   yarn start
5. Abra http://localhost:3000 (ou a porta indicada) no navegador.

---

## Uso

- Insira o preço da gasolina (R$).
- Insira o preço do etanol (R$).
- Clique em "Calcular" (ou similar).
- A aplicação exibirá qual dos combustíveis é mais vantajoso e mostrará a razão/porcentagem usada no cálculo.

Exemplo:
- Gasolina: R$ 6,00
- Etanol: R$ 4,00
- Razão: 4,00 / 6,00 = 0,666 → Etanol é mais vantajoso (se < 0.70).

---

## Lógica do Cálculo

A regra utilizada (prática comum no Brasil):

- Se (preço do etanol / preço da gasolina) <= 0.70 → Etanol é mais vantajoso.
- Caso contrário → Gasolina é mais vantajosa.

Observação: O coeficiente 0.70 é uma referência prática que considera rendimento médio; ajuste caso deseje considerar eficiência específica do seu veículo.

---

## Estrutura do Projeto

Uma estrutura típica sugerida (ajuste conforme seu repositório real):

- public/              — arquivos estáticos
- src/
  - components/        — componentes React reutilizáveis
  - pages/             — telas/rotas
  - styles/            — arquivos CSS / styled-components
  - utils/             — utilitários (ex.: função de cálculo)
  - App.jsx
  - index.jsx
- .gitignore
- package.json
- README.md

---

## Scripts úteis (package.json)

- npm start — inicia em modo desenvolvimento
- npm run build — gera build para produção
- npm test — executa testes
- npm run lint — executa lint (se configurado)

(Substitua/ajuste conforme os scripts reais do package.json do projeto.)

---

## Testes

Se houver testes configurados (Jest, React Testing Library, etc.):

- Executar testes: npm test
- Para cobertura: npm test -- --coverage

Adicione instruções específicas aqui conforme a configuração do projeto.

---

## Deploy

Sugestões de hospedagem:
- Vercel — deploy automático a partir do repositório GitHub.
- Netlify — deploy estático para builds React.
- GitHub Pages — rodar `npm run build` e publicar a pasta `build`/`dist`.

Exemplo (GitHub Pages com pacote `gh-pages`):
1. npm run build
2. npm run deploy (configurar script `deploy` no package.json)

---

## Contribuição

Contribuições são bem-vindas! Sugestões:
- Abra uma issue descrevendo o problema/feature.
- Submeta PRs com mudanças pequenas e descrições claras.
- Siga o padrão de lint/format do projeto (ex.: ESLint, Prettier).

Template rápido:
- Fork do repositório
- Crie uma branch: feature/nova-funcionalidade
- Commit suas mudanças com mensagens claras
- Abra um Pull Request descrevendo o que foi feito

---

## Licença

Este projeto está disponível sob a licença MIT. Substitua se desejar outra licença.

---

## Contato

Desenvolvedor: ParreirasJuniorWeb  
GitHub: https://github.com/ParreirasJuniorWeb

---

Obrigado por usar o ReactFuelCalc! Se desejar, posso:
- Ajustar o texto para combinar exatamente com o estilo dos seus outros READMEs;
- Inserir badges (ex.: licença, npm, build) específicos;
- Criar e commitar este README no repositório (preciso que confirme o repositório alvo).
