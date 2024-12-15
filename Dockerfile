# 1. Usa uma imagem oficial do Node.js
FROM node:18

# 2. Define o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copia os arquivos do projeto
COPY package*.json ./
COPY tsconfig.json ./

# 4. Instala as dependências de produção
RUN npm install

# 5. Copia o restante do código para o container
COPY . .

# 6. Compila o projeto
RUN npm run build

# 7. Expõe a porta usada pelo servidor
EXPOSE 3000

# 8. Comando para rodar o servidor
CMD ["npm", "start"]
