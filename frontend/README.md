# ReservaLab — Frontend

Sistema de reservas de Biblioteca e Salas Maker. Este é o frontend em React, construído a partir do protótipo do Figma (mesmas cores, tipografia e telas).

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Faça login com qualquer e-mail/senha (login é mockado por enquanto — ver seção "Backend" abaixo).

## Estrutura

```
src/
  components/   # Button, Card, StatusBadge, Modal, Toast, Sidebar, AppLayout, RequireAuth
  context/      # AccessibilityContext — preferências de acessibilidade (tamanho de texto,
                # alto contraste, reduzir animações), aplicadas via atributos data-* em <html>
  pages/        # todas as telas do fluxo completo (ver lista abaixo)
  data/
    types.ts            # tipos compartilhados (Space, Reservation, Notification, ReservationDraft)
    mockData.ts          # dados de exemplo (seed inicial)
    api.ts               # camada de acesso a dados — troque aqui pelas chamadas reais
    reservationDraft.ts  # rascunho da reserva em andamento (sessionStorage)
```

## O que já está pronto

Frontend 100% implementado — todas as telas do protótipo do Figma, com dados mockados
persistidos em `localStorage`/`sessionStorage` (sem backend ainda, ver seção abaixo):

- **Login** (`/login`) — formulário funcional, salva um token mockado e redireciona pro Dashboard.
- **Dashboard** (`/`) — resumo de espaços e próximas reservas.
- **Espaços** (`/espacos`) — lista de todos os espaços, com filtro por categoria (Biblioteca / Sala Maker).
- **Detalhes do Espaço** (`/espacos/:id`) — capacidade, equipamentos, localização e status; bloqueia reserva quando o espaço está indisponível.
- **Calendário** (`/espacos/:id/calendario`) — escolha de data (próximos 10 dias) e horário.
- **Revisão da Reserva** (`/espacos/:id/revisao`) — confirmação final antes de criar a reserva.
- **Confirmação** (`/espacos/:id/confirmacao`) — tela de sucesso com atalho para os detalhes da reserva.
- **Minhas Reservas** (`/minhas-reservas`) — lista de todas as reservas do usuário.
- **Detalhes da Reserva** (`/minhas-reservas/:id`) — código, data, horário e fluxo de cancelamento (com modal de confirmação).
- **Notificações** (`/notificacoes`) — avisos de confirmação/cancelamento, com contagem de não lidas na barra lateral.
- **Perfil** (`/perfil`) — dados do usuário e opção de sair.
- **Ajuda e Regras** (`/ajuda`) — regras de uso e perguntas frequentes.
- **Acessibilidade** (`/acessibilidade`) — tamanho do texto, alto contraste e redução de animações, aplicados em tempo real e salvos entre acessos.
- Sistema de design consistente com o Figma: cores, tipografia (Inter), botões, cards e badges de status (sempre ícone + texto), além de `:focus-visible` visível em toda a navegação por teclado.
- Navegação lateral (sidebar) com todos os links do fluxo completo e indicador de notificações não lidas.

## Backend

Ainda não há backend conectado — esta etapa fica para a próxima fase do projeto. Toda leitura/escrita
de dados passa por `src/data/api.ts`, que hoje simula persistência com `localStorage`
(reservas e notificações sobrevivem a um reload da página). É o único lugar que precisa
mudar quando o backend estiver pronto: troque o corpo de cada função por uma chamada
`fetch`/`axios` de verdade. O resto do app (páginas e componentes) não precisa ser tocado.

## Próximos passos sugeridos

1. Conectar `src/data/api.ts` na API real assim que o backend estiver no ar.
2. Trocar o `RequireAuth` mockado por uma verificação de sessão de verdade.
3. Trocar a persistência em `localStorage` pelas respostas reais da API.
