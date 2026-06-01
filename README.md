# Portfólio — Adriano Negrão

Landing page de portfólio em **HTML, CSS e JavaScript puro** (sem build, sem dependências).
Pronta para hospedar no **GitHub Pages**.

## Estrutura

```
portfolio/
├── index.html      # conteúdo e estrutura
├── styles.css      # tema dark, layout responsivo, animações
├── script.js       # fundo animado, terminal, contadores, menu mobile
├── assets/
│   └── adriano.jpeg
└── README.md
```

## Rodar localmente

Como é só HTML estático, basta abrir o `index.html` no navegador.
Para um servidor local (recomendado, evita restrições de file://):

```bash
cd portfolio
python3 -m http.server 8080
# abra http://localhost:8080
```

## Publicar no GitHub Pages

### Opção A — site principal (recomendado): `adrianohsnegrao.github.io`

1. Crie um repositório **público** com o nome exato `adrianohsnegrao.github.io`.
2. Suba estes arquivos na raiz:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "feat: portfolio landing page"
   git branch -M main
   git remote add origin https://github.com/adrianohsnegrao/adrianohsnegrao.github.io.git
   git push -u origin main
   ```
3. Em **Settings → Pages**, confirme que a fonte é a branch `main` / pasta `/ (root)`.
4. Acesse `https://adrianohsnegrao.github.io` (pode levar 1–2 min).

### Opção B — site de projeto: `adrianohsnegrao.github.io/portfolio`

1. Crie um repositório (ex: `portfolio`) e suba os arquivos.
2. Em **Settings → Pages**, selecione a branch `main` e pasta `/ (root)`.
3. Acesse `https://adrianohsnegrao.github.io/portfolio`.

## Personalizar

- **Textos / seções:** edite `index.html`.
- **Cores:** variáveis CSS no topo de `styles.css` (`:root`).
- **Foto:** substitua `assets/adriano.jpeg`.
- **Animações:** ajuste `script.js`.

Tudo respeita `prefers-reduced-motion` para acessibilidade.
