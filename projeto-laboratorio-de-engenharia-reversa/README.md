# 🎨 QR Code Styling - Gerador Customizável Moderno

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4A4A4A?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)

## 📝 Descrição do Projeto
Este projeto é uma ferramenta avançada de geração e estilização de QR Codes, inspirada no popular motor "QR Code Styling". Ele permite que usuários criem códigos QR altamente personalizados, indo muito além do padrão preto e branco, integrando logos, gradientes de cores e formas geométricas únicas.

Desenvolvido com foco em **UI/UX e Performance**, o sistema oferece um feedback visual instantâneo (Real-time Preview), permitindo o ajuste fino de cada detalhe, desde o arredondamento dos cantos até a densidade dos pontos, garantindo que o código final se alinhe perfeitamente à identidade visual da marca ou projeto.

## 🚀 Tecnologias Utilizadas
*   **Framework:** React 19 com Vite
*   **Estilização:** Tailwind CSS v4 & Shadcn/ui
*   **Gerenciamento de Estado:** Zustand (Arquitetura centralizada)
*   **Core:** `qr-code-styling` (Engine de renderização SVG/Canvas)
*   **Ícones:** Lucide React

## 📊 Resultados e Diferenciais
O projeto foi estruturado utilizando os princípios de **Atomic Design** e **Clean Architecture**, resultando em um código modular e fácil de manter.
*   **Performance Otimizada:** Utilização de `useRef` e `useEffect` para manipular o canvas do QR Code sem re-renderizações desnecessárias da DOM.
*   **Customização Extrema:** Suporte para 6 tipos de pontos, 3 tipos de cantos, upload de logos e controle de nível de erro (Error Correction).
*   **Exportação Multiformato:** Suporte nativo para download em PNG, JPEG, WEBP e SVG.

## 🔧 Como Executar
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Inicie o servidor de desenvolvimento: `npm run dev`.
4. Acesse o projeto em `http://localhost:3000`.

## 🎨 Funcionalidades Prontas
- [x] Entrada de dados dinâmica (URL/Texto)
- [x] Upload de Logo personalizada
- [x] Customização de cores (Pontos, Fundo, Cantos)
- [x] Seleção de estilos geométricos
- [x] Download em múltiplos formatos
- [x] Exportação de configurações em JSON

---
[Voltar ao topo](https://github.com/Andrei-RB/portfolio-andrei-rodrigues-de-barros)
