# ReactFuelCalc ⛽

Sistema web para consulta econômica de combustível (**Gasolina x Etanol**) com base na regra prática dos **70%**, amplamente utilizada no Brasil.

Aplicação desenvolvida com **React + TypeScript + Tailwind CSS**, com interface responsiva, validações claras e testes automatizados com Vitest.

---

## 📌 Sobre o projeto

O **ReactFuelCalc** ajuda o usuário a decidir qual combustível oferece melhor custo-benefício a partir dos preços informados.

A regra utilizada é:

- Se **(etanol / gasolina) <= 0,70** → **Etanol é mais vantajoso**
- Caso contrário → **Gasolina é mais vantajosa**

> Observação: o coeficiente `0,70` é uma referência prática e pode variar conforme o rendimento específico do veículo.

---

## ✨ Funcionalidades

- Entrada de preço da gasolina e etanol
- Validação de dados com mensagens de erro claras
- Suporte a entrada com vírgula ou ponto decimal
- Cálculo imediato com:
  - razão (`etanol / gasolina`)
  - percentual equivalente
  - explicação da recomendação
- Feedback visual com toast
- Layout responsivo (mobile e desktop)
- Testes automatizados cobrindo fluxos principais e cenários de validação

---

## 🧠 Lógica do cálculo

```txt
razão = preçoEtanol / preçoGasolina

Se razão <= 0,70:
  recomendar Etanol
Senão:
  recomendar Gasolina
```

### Exemplo

- Gasolina: **R$ 6,00**
- Etanol: **R$ 4,00**
- Razão: `4,00 / 6,00 = 0,666` (66,6%)

✅ Resultado: **Etanol é mais vantajoso**.

---

## 🛠️ Tecnologias utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

---

## 📂 Estrutura de pastas (resumo)

```bash
reactfuelcalc/
├── public/
├── src/
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vitest.d.ts
├── vitest.setup.ts
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🚀 Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- npm (instalado junto com Node.js)

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Acesse no navegador (porta padrão do Vite):

- `http://localhost:5173`

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

---

## ✅ Testes automatizados

Executar todos os testes:

```bash
npm run test
```

Executar em modo watch:

```bash
npm run test:watch
```

### Cobertura atual de testes

- Renderização inicial da interface
- Habilitação/desabilitação do botão de cálculo
- Recomendação correta para:
  - razão <= 0,70
  - razão > 0,70
- Aceitação de decimal com ponto
- Tratamento de entradas inválidas:
  - não numéricas
  - zero/negativas
  - valores muito altos
- Atualização correta em múltiplos cálculos sequenciais

---

## 📸 Screenshot (opcional)

Você pode adicionar uma captura de tela em `docs/screenshot.png` e referenciar aqui:

```md
![ReactFuelCalc Screenshot](./docs/screenshot.png)
```

---

## 📜 Scripts disponíveis

- `npm run dev` — inicia servidor de desenvolvimento
- `npm run build` — gera build de produção
- `npm run preview` — visualiza build localmente
- `npm run test` — executa testes com Vitest
- `npm run test:watch` — executa testes em modo observação
- `npm run lint` — executa lint do projeto

---

## 🧭 Roadmap (sugestões futuras)

- [ ] Histórico de cálculos
- [ ] Persistência em LocalStorage
- [ ] Tema claro/escuro
- [ ] Internacionalização (i18n)
- [ ] PWA (uso offline)

---

## 🤝 Contribuição

Contribuições são bem-vindas.

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas alterações: `git commit -m "feat: minha feature"`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se à vontade para usar e adaptar.
