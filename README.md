## MyMovies Frontend

### Tecnologias utilizadas 
* NodeJS
* ReactJS   
* Axios
* The Movie Database API
* JWT

### Funcionalidades
* **Criar conta**  
* **Login da conta**  
* **Busca de filmes**  
* **Marcar filme como para assistir**  
* **Visualizar lista para assistir**  
* Criar Perfil  
* Listar perfis  

#### Para executar:
1. Obter uma key da <a href="https://developers.themoviedb.org/3/getting-started/introduction">The Movie Database API</a>
2. Criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:
  ```
  REACT_APP_TMDB_KEY=<sua_api_key>
  REACT_APP_API_URL=http://localhost:3100
  ```
3. `npm install` para instalar as dependências
4. `npm run start`
5. Acessar `localhost:3000`
