# Game Marketplace - RMT Platform TODO

## Fase 1: Configuração do Banco de Dados
- [x] Criar tabelas no schema (Users, Tokens, Orders, Chat, Reviews)
- [x] Configurar relacionamentos entre tabelas
- [x] Executar migrations do banco de dados

## Fase 2: Layout e Design
- [x] Copiar componentes do layout de referência (Header, Sidebars)
- [x] Adaptar tema Mario Bros para o projeto
- [x] Criar componentes base (Button, Card, Panel)
- [x] Implementar responsividade mobile

## Fase 3: Autenticação e Cadastro
- [x] Implementar cadastro com campos (País, Nickname, Senha)
- [x] Gerar ID aleatório de 6 dígitos para novos usuários
- [x] Conceder 10 TOKENS iniciais ao cadastro
- [x] Implementar login com autenticação JWT
- [x] Criar página de perfil do usuário

## Fase 4: Sistema de Tokens
- [x] Implementar lógica de consumo de tokens (1 TOKEN por ordem)
- [x] Implementar consumo de 1 TOKEN a cada 24 horas por ordem ativa (scheduler implementado)
- [x] Implementar consumo de 0,5 TOKEN para editar ordem
- [x] Criar página de compra de tokens (1000 TOKENS = 1 $)
- [x] Exibir aviso quando saldo insuficiente
- [x] Mostrar saldo de tokens no header

## Fase 5: Formulários de Criação de Ordem
- [x] Criar formulário para Venda/Compra de Adena
- [x] Criar formulário para Venda/Compra de Itens
- [x] Criar formulário para Venda/Compra de Contas
- [x] Implementar validação de tokens antes de criar ordem
- [x] Implementar cálculo automático de valor por 1kk (Adena)

## Fase 6: Marketplace e Exibição de Ordens
- [x] Criar página do marketplace
- [x] Implementar exibição dinâmica de ordens
- [x] Criar filtros por Servidor
- [x] Criar filtros por Tipo de Ordem
- [x] Criar busca por Nome do Item
- [x] Implementar padrão de exibição para Adena (Servidor/Quantidade/Valor)
- [x] Implementar padrão de exibição para Itens (Servidor/Nome/Valor)
- [x] Implementar padrão de exibição para Contas (Servidor/Descrição/Valor)

## Fase 7: Exchange (Book de Ordens)
- [x] Criar página Exchange
- [x] Implementar book de ordens de compra
- [x] Implementar book de ordens de venda
- [x] Adicionar filtros no exchange
- [x] Adicionar busca rápida no exchange

## Fase 8: Chat e Comunicação
- [x] Implementar botão "Mensagem" em cada ordem
- [x] Criar interface de chat entre usuários
- [x] Armazenar histórico de chat no banco de dados
- [x] Implementar notificações de mensagens

## Fase 9: Sistema de Reputação
- [x] Implementar cálculo de nível do anunciante
- [x] Implementar sistema de recomendações (Positivas/Negativas)
- [x] Exibir índice de confiança do anunciante
- [x] Mostrar número de ordens no mercado
- [x] Mostrar número de trades na plataforma
- [x] Criar página de reviews/avaliações

## Fase 10: Testes e Refinamento
- [x] Testar fluxo completo de cadastro
- [x] Testar criação de ordens
- [x] Testar consumo de tokens
- [x] Testar filtros e busca
- [x] Testar chat
- [x] Testar cálculo de reputação
- [x] Revisar design e UX

## Fase 11: Deploy e Finalização
- [x] Revisar código
- [x] Criar checkpoint final
- [x] Entregar projeto ao usuário


## Fase 12: Chat em Tempo Real
- [x] Criar componente ChatBox para interface de chat
- [x] Implementar procedimento tRPC para enviar mensagens
- [x] Implementar procedimento tRPC para receber mensagens
- [x] Armazenar mensagens no banco de dados
- [x] Implementar notificações de novas mensagens
- [x] Criar página de conversas (inbox)

## Fase 13: Sistema de Reputação e Reviews
- [x] Criar página de Reviews/Avaliações
- [x] Implementar procedimento tRPC para criar review
- [x] Implementar cálculo automático do índice de confiança
- [x] Exibir reviews no perfil do usuário
- [x] Mostrar badge de confiança nas ordens

## Fase 14: Integração com Stripe
- [x] Criar página de compra de tokens
- [x] Implementar procedimento tRPC para compra de tokens
- [x] Configurar arquivo de integração com Stripe
- [x] Implementar webhook para confirmar pagamento
- [x] Criar procedimento tRPC para checkout session

## Fase 15: Melhorias no Home.tsx
- [x] Atualizar Home.tsx com links para marketplace
- [x] Adicionar CTA para criar primeira ordem
- [x] Mostrar estatísticas em tempo real
- [x] Melhorar responsividade

## Fase 16: Testes e Refinamento Final
- [x] Testar fluxo completo de cadastro
- [x] Testar criação de ordens
- [x] Testar consumo de tokens
- [x] Testar chat
- [x] Testar compra de tokens
- [x] Testar sistema de reputação
- [x] Revisar design e UX


## Fase 17: WebSocket e Chat em Tempo Real
- [x] Instalar socket.io e socket.io-client
- [x] Criar arquivo de inicialização WebSocket
- [x] Implementar chat com WebSocket
- [x] Adicionar indicador de digitação
- [x] Criar página ChatWebSocket.tsx

## Fase 18: Scheduler de Tokens
- [x] Instalar node-cron
- [x] Criar arquivo scheduler.ts
- [x] Implementar consumo automático de tokens (24h)
- [x] Integrar scheduler no servidor

## Fase 19: Otimizações Finais
- [x] Corrigir erros de TypeScript
- [x] Testar todas as funcionalidades
- [x] Revisar design e responsividade
- [x] Preparar para deploy


## Fase 20: Páginas Adicionais
- [x] Criar página Admin para moderação
- [x] Criar página Notifications para notificações
- [x] Criar página Reports para denúncias
- [x] Criar página Support com FAQ
- [x] Atualizar App.tsx com todas as rotas

## Fase 21: Funcionalidades Extras
- [x] Sistema de moderação de ordens
- [x] Gerenciamento de usuários (admin)
- [x] Relatórios e estatísticas
- [x] Sistema de denúncias
- [x] FAQ e Suporte
- [x] Notificações do sistema
- [x] Configurações de notificações

## Fase 22: Testes Finais
- [x] Testar todas as 13 páginas
- [x] Validar fluxo completo de usuário
- [x] Verificar responsividade mobile
- [x] Confirmar sem erros TypeScript
- [x] Revisar design Mario Bros

## Fase 23: Preparação para Deploy
- [x] Revisar código
- [x] Otimizar performance
- [x] Preparar documentação
- [x] Criar checkpoint final

## Fase 24: Sincronização de Navegação
- [x] Atualizar Header.tsx com botões (LOJA, CHAT, AVISOS, CONTA)
- [x] Atualizar LeftSidebar.tsx com todas as 12 páginas
- [x] Atualizar RightSidebar.tsx com links rápidos
- [x] Implementar navegação com wouter
- [x] Testar cliques em todos os botões
- [x] Sincronizar estado ativo dos botões
