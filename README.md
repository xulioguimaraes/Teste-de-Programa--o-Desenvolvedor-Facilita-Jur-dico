# Teste de Programação Desenvolvedor Facilita Jurídico

## Sistema de Gerenciamento de Clientes

É uma plataforma completa para gerenciar clientes. Possibilitamos o cadastro e a visualização de clientes, incluindo nome, email e telefone. Além disso, implementamos uma funcionalidade avançada de otimização de rotas, calculando a rota mais eficiente para visitar todos os clientes no mapa bidimensional.

_Recursos Principais:_

- Listagem e filtragem de clientes.
- Cadastro de novos clientes.
- Otimização de rotas para visitação eficiente.

### Tecnologias Utilizadas

**Frontend:**

- [Vite](https://vitejs.dev/): Build rápido para aplicações React.
- [React](https://reactjs.org/): Biblioteca JavaScript para construção de interfaces de usuário.
- [React Hook Form](https://react-hook-form.com/): Gerenciamento de formulários em React.
- [Material-UI](https://mui.com/): Biblioteca de componentes React para um design mais rápido e fácil.

**Backend:**

- [NestJS](https://nestjs.com/): Framework para construção de aplicativos server-side eficientes e escaláveis.
- [Swagger](https://swagger.io/): Ferramenta para design, construção, documentação e consumo de serviços da Web RESTful.
- [class-validator](https://github.com/typestack/class-validator): Validador de objetos para classes TypeScript.
- [class-transformer](https://github.com/typestack/class-transformer): Ferramenta para transformação de classes em objetos JSON e vice-versa.

Este projeto utiliza um conjunto moderno de tecnologias para proporcionar uma experiência eficiente e escalável tanto no frontend quanto no backend.

Claro, aqui está uma seção "Como Executar o Projeto" que você pode adicionar ao seu README.md:

### Como Executar o Projeto

### Como Clonar o Projeto

Para obter uma cópia local do projeto, siga os passos abaixo:

1. Abra um terminal e navegue até o diretório onde deseja armazenar o projeto.

2. Execute o seguinte comando para clonar o repositório:

   ```bash
   git clone https://github.com/xulioguimaraes/Teste-de-Programa--o-Desenvolvedor-Facilita-Jur-dico
   ```

3. Entre no diretório do projeto:

   ```bash
   cd Teste-de-Programa--o-Desenvolvedor-Facilita-Jur-dico
   ```

Agora você tem uma cópia local do projeto em seu ambiente de desenvolvimento.

#### Configuração do Backend

1. **Configuração do .env:**

   - Na pasta `backend`, copie o arquivo `.env.example` e renomeie para `.env`.
   - Preencha as variáveis de ambiente no arquivo `.env`, incluindo as informações de conexão com o banco de dados (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`) e a URL do site (`SITE_URL`).

2. **Criação do Banco de Dados:**

   - Execute o script `ddl.sql` no seu banco de dados PostgreSQL para criar a tabela `clients` e a função de gatilho para atualizar `updated_at`.

3. **Instalação de Dependências:**

   - Abra um terminal na pasta `backend` e execute o comando:
     ```bash
     yarn
     ```

4. **Execução do Backend:**
   - Inicie o servidor Nest.js com o comando:
     ```bash
     yarn run start:dev
     ```

### Documentação de Rotas

A documentação detalhada das rotas do backend pode ser acessada através do Swagger. Siga os passos abaixo para explorar a documentação:

1. Após iniciar o backend, abra o seu navegador e acesse a seguinte URL:

   [http://127.0.0.1:4000/docs](http://127.0.0.1:4000/docs)

2. Navegue pela documentação interativa para obter informações sobre todas as rotas disponíveis, parâmetros necessários e exemplos de solicitações e respostas.

A documentação do Swagger proporciona uma visão clara e organizada das APIs do backend, facilitando o entendimento e a interação durante o desenvolvimento e testes.

#### Configuração do Frontend

1. **Configuração do .env:**

   - Na pasta `frontend`, copie o arquivo `.env.example` e renomeie para `.env`.
   - Preencha a variável de ambiente no arquivo `.env` com a URL da API (`VITE_API_URL`).

2. **Instalação de Dependências:**

   - Abra um terminal na pasta `frontend` e execute o comando:
     ```bash
     yarn
     ```

3. **Execução do Frontend:**

   - Inicie o servidor Vite com o comando:
     ```bash
     yarn run dev
     ```

4. **Acesso à Aplicação:**
   - Abra o navegador e acesse a aplicação através do endereço fornecido durante a execução do frontend.

Com essas etapas, seu projeto deve estar configurado e em execução com sucesso. Certifique-se de seguir cada passo cuidadosamente para evitar problemas de configuração.
