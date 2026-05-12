# 🤖 Laboratório de Classificação Visual
 
## 📝 Descrição do Projeto
Este projeto consiste em uma análise prática sobre o mecanismo de vieses algorítmicos em modelos de classificação. O experimento foi conduzido utilizando a ferramenta Teachable Machine, onde um modelo foi treinado com um conjunto de dados deliberadamente restrito: 20 imagens de pessoas de terno para representar "Perfil de Liderança" e 20 imagens de pessoas com roupas casuais para "Perfil Operacional".
 
Essa seleção limitada cria uma associação artificial entre vestimenta e competência profissional. O estudo demonstra as consequências práticas quando sistemas desse tipo são aplicados em contextos reais, como recrutamento ou avaliação de desempenho.

## 🚀 Tecnologias Utilizadas
* **Plataforma:** Teachable Machine
* **Conceitos:** Visão Computacional, Ética em IA, Mitigação de Viés Algorítmico
* **Metodologia Mitigadora:** Human-in-the-loop
 
## 📊 Resultados e Aprendizados
O experimento revelou que o algoritmo absorve padrões superficiais do conjunto de treinamento e passa a aplicá-los de forma generalizada.
* **Comprovação do Viés:** Durante os testes, ao processar uma foto com 100% do rosto visível, o sistema classificou o perfil como 76% operacional e 24% liderança. Em contrapartida, ao processar outra imagem com apenas metade do rosto e maior destaque para a postura corporal, mesmo com vestimenta casual, o modelo apontou 95% liderança e 5% operacional.
* **Impactos Sociais e Profissionais:** O uso de conjuntos de dados não representativos gera o risco de indivíduos serem classificados de forma imprecisa para cargos de liderança com base em características visuais rasas, resultando em sistemas que reforçam preconceitos estruturais ao invés de avaliar competências reais.
* **Estratégias de Correção:** A principal ação mitigadora abordada é a implementação do modelo *Human-in-the-loop*, que exige a participação ativa de especialistas na curadoria e revisão prévia dos dados para garantir a diversidade e quebrar padrões discriminatórios.
* **Manutenção Contínua:** O projeto ressalta a necessidade de auditorias periódicas e testes com amostras variadas para assegurar a justiça e a representatividade do modelo em produção.
 
## 🔧 Como Executar
1. Acesse o ambiente do Teachable Machine e inicie um novo projeto de imagem.
2. Configure as categorias de "Perfil Liderança" e "Perfil Operacional".
3. Alimente o modelo com a amostragem de dados para simular a associação entre vestimenta e classe.
4. Ative a funcionalidade "Preview this model live", configurando a entrada de vídeo para a Webcam.
5. Observe a variação das predições no painel "Output" conforme a alteração de enquadramento e vestimenta.

---
[Voltar ao início](https://github.com/Andrei-RB/portfolio-andrei-rodrigues-de-barros/)
