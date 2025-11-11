# RMT Global - Guia de Execução com Docker

## 📋 Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- Git (opcional, para clonar o repositório)

## 🚀 Início Rápido

### 1. Build e Execução com Docker Compose

```bash
# Clone o repositório (se necessário)
git clone <seu-repositorio> rmt-global
cd rmt-global

# Build e inicie os containers
docker-compose up -d

# Acesse a aplicação
# http://localhost:3000
```

### 2. Build Manual com Docker

```bash
# Build da imagem
docker build -t rmt-global:latest .

# Execute o container
docker run -d \
  --name rmt-global \
  -p 3000:3000 \
  -e NODE_ENV=production \
  rmt-global:latest

# Acesse a aplicação
# http://localhost:3000
```

## 📦 Estrutura do Projeto

```
rmt-global/
├── client/                 # Frontend React
│   ├── public/            # Assets estáticos
│   ├── src/               # Código fonte
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas
│   │   ├── lib/           # Utilitários
│   │   └── index.css      # Estilos globais
│   └── package.json
├── server/                # Backend (placeholder)
├── shared/                # Código compartilhado
├── Dockerfile             # Configuração Docker
├── docker-compose.yml     # Orquestração Docker
├── .dockerignore          # Arquivos ignorados no build
└── package.json           # Dependências do projeto
```

## 🐳 Comandos Docker Úteis

### Gerenciamento de Containers

```bash
# Ver containers em execução
docker ps

# Ver logs da aplicação
docker logs rmt-global

# Acessar terminal do container
docker exec -it rmt-global sh

# Parar o container
docker stop rmt-global

# Reiniciar o container
docker restart rmt-global

# Remover o container
docker rm rmt-global
```

### Gerenciamento de Imagens

```bash
# Listar imagens
docker images

# Remover imagem
docker rmi rmt-global:latest

# Tag para registro
docker tag rmt-global:latest seu-usuario/rmt-global:latest

# Push para registro
docker push seu-usuario/rmt-global:latest
```

### Docker Compose

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f rmt-global

# Rebuild após mudanças
docker-compose up -d --build

# Remover volumes
docker-compose down -v
```

## 🔧 Variáveis de Ambiente

Configure as seguintes variáveis no `docker-compose.yml` ou via `.env`:

```env
NODE_ENV=production
VITE_APP_TITLE=RMT Global
VITE_APP_ID=rmt-global
VITE_APP_LOGO=/mario-logo.png
```

## 📊 Health Check

O container inclui um health check automático que verifica a saúde da aplicação a cada 30 segundos:

```bash
# Verificar status
docker ps --format "table {{.Names}}\t{{.Status}}"
```

## 🔒 Segurança

### Boas Práticas

1. **Use tags específicas de versão**: `node:22-alpine` em vez de `node:latest`
2. **Rode como usuário não-root**: Considere adicionar um usuário no Dockerfile
3. **Escaneie imagens**: Use `docker scan rmt-global:latest`
4. **Mantenha dependências atualizadas**: Execute `pnpm update` regularmente

### Exemplo com Usuário Não-Root

```dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
```

## 📈 Performance

### Otimizações Implementadas

- **Multi-stage build**: Reduz tamanho final da imagem
- **Alpine Linux**: Imagem base mínima (~150MB)
- **Layer caching**: Aproveita cache do Docker
- **Production dependencies**: Apenas dependências necessárias

### Tamanho da Imagem

```bash
docker images rmt-global
# Esperado: ~200-300MB
```

## 🌐 Nginx Reverse Proxy (Opcional)

Para usar Nginx como reverse proxy:

```bash
# Inicie com o profile nginx
docker-compose --profile with-nginx up -d

# Acesse via Nginx
# http://localhost
```

Certifique-se de que `nginx.conf` está configurado corretamente.

## 🐛 Troubleshooting

### Porta já em uso

```bash
# Encontre o processo usando a porta 3000
lsof -i :3000

# Ou altere a porta no docker-compose.yml
# ports:
#   - "8000:3000"
```

### Container não inicia

```bash
# Verifique os logs
docker logs rmt-global

# Verifique o health check
docker inspect rmt-global | grep -A 10 Health
```

### Build falha

```bash
# Limpe o cache
docker builder prune

# Rebuild sem cache
docker build --no-cache -t rmt-global:latest .
```

## 📝 Deployment em Produção

### Recomendações

1. **Use Docker Swarm ou Kubernetes** para orquestração
2. **Configure volumes** para dados persistentes
3. **Use secrets** para variáveis sensíveis
4. **Implemente load balancing** com Nginx/Traefik
5. **Configure CI/CD** com GitHub Actions/GitLab CI

### Exemplo com Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rmt-global
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rmt-global
  template:
    metadata:
      labels:
        app: rmt-global
    spec:
      containers:
      - name: rmt-global
        image: seu-usuario/rmt-global:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
```

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Alpine Linux](https://alpinelinux.org/)

## 💬 Suporte

Para problemas ou dúvidas:

1. Verifique os logs: `docker logs rmt-global`
2. Consulte a documentação oficial do Docker
3. Abra uma issue no repositório

---

**Versão**: 1.0.0  
**Última atualização**: 2025-01-10
