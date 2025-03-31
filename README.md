# 🎬 CineMatch

CineMatch é uma aplicação web projetada para auxiliar usuários na **seleção de filmes**, oferecendo diversos **filtros personalizados** para proporcionar uma experiência **intuitiva e responsiva**.  

🚀 O objetivo do CineMatch é **otimizar o tempo** gasto na escolha de filmes, ao mesmo tempo em que **sugere títulos inéditos** ao usuário.  

---

## 📌 **Tecnologias Utilizadas**

O projeto é desenvolvido utilizando as seguintes tecnologias:  

### **1. Linguagens de Programação**  
- **Python** (3.8 ou superior) – Backend com Flask  
- **JavaScript** (ES6 ou superior) – Frontend dinâmico  

### **2. Linguagens de Suporte**  
- **HTML** – Estruturação da interface  
- **CSS** – Estilização da aplicação  

### **3. Frameworks e Ferramentas**  
####  **Backend**  
- **Flask** – Construção da API  
- **Pytest** (Última versão) – Testes unitários  

####  **Frontend**  
- **React** (Última versão recomendada) – Construção da interface de usuário  
- **React Router DOM** – Gerenciamento de rotas  
- **Axios** – Requisições HTTP para APIs  

####   **Ambiente de Desenvolvimento**  
- **Node.js** (Versão 16 ou superior) – Gerenciamento de pacotes e execução do frontend  
- **Vite API** (^6.0.3) – Build otimizado do projeto  
- **Vite Test** (^3.0.6) – Testes do frontend  

---

##**Pré-requisitos**  

Antes de rodar o projeto, certifique-se de ter instalado:  
- [Python 3.8+](https://www.python.org/downloads/)  
- [Node.js 16+](https://nodejs.org/)  
- **Gerenciador de pacotes** (npm ou yarn)  

---

## **1-Como Rodar o Projeto**  

### **Clonar o Repositório**
git clone https://github.com/Labourguignonn/cinematch/.git
cd cinematch

## **2-Criar um ambiente virtual (recomendado)**
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instalar as dependências do backend
pip install -r requirements.txt

# Rodar a API Flask
flask run

## **3-Configurar o Frontend (React + Vite)**

cd frontend
npm install  # ou yarn install
npm run build  # ou yarn dev

## **4 - Para rodar o projeto**

1. **Obtenha sua API Key da OpenAI**:
   - Cadastre-se no [site da OpenAI](https://platform.openai.com/signup) e gere uma chave de API.

2. **Adicione a chave no código**:
   - Abra o arquivo `main.py` e localize a classe `API`.
   - No método `__init__`, adicione sua chave de API da OpenAI:
   
   ```python
   class API:
       def __init__(self):
           self.api_key = "SUA_API_KEY_AQUI"  # Substitua pela sua chave
3. **Rodando o projeto:**

#Abra um terminal e navegue até a pasta do backend:

cd backend

python3 main.py # Linux/Mac
python main.py  # Windows

#Em outro terminal, navegue até a pasta do frontend:

cd frontend/app
npm run dev

CineMatch/
├── Backend/                  # Código do backend (API e banco de dados)
│   ├── BancoFilmes.py        # Comunicação com API do TMDb
│   ├── crud.py               # Operações CRUD para manipulação de dados
│   ├── IntegracaoAPI.py      # Comunicação com API da OpenIA
│   ├── main.py               # Ponto de entrada da API (Flask/FastAPI)
│   ├── teste_db.py           # Testes unitários para banco de dados
│   ├── testes_backend/       # Pasta de testes automatizados do backend
│   │   ├── test_crud.py
│   │   ├── test_integracaoAPI.py
│   │   ├── test_main.py
│   │   ├── test_movieDB.py
│   ├── usuarios.db           # Banco de dados SQLite
│   └── __pycache__/          # Cache de compilação do Python (IGNORAR)
│
├── Frontend/                 # Código do frontend (React + Vite)
│   ├── App.css               # Estilos globais
│   ├── App.jsx               # Componente principal do React
│   ├── main.jsx              # Arquivo de inicialização do React
│   ├── assets/               # Imagens e ícones utilizados no projeto
│   │   ├── movie posters     # Imagens dos filmes
│   │   ├── Login_register/   # Imagens usadas na tela de login e registro
│   ├── components/           # Componentes reutilizáveis do frontend
│   │   ├── BackButton.jsx
│   │   ├── NextButton.jsx
│   │   ├── ErrorMessage/
│   │   ├── Footer/
│   │   └── Navbar/
│   ├── pages/                # Páginas do site
│   │   ├── EmptyLine/        # Página de erro, quando não foi gerados filmes
│   │   ├── FiltersPage/      # Página de seleção de filmes
│   │   ├── Home/             # Página inicial
│   │   ├── LastPage/         # Ultima página
│   │   ├── Loading/          # Pagina de carregamento
│   │   ├── Login/            # Tela de Login
│   │   ├── MovieSelection/   # Seleção de filmes
│   │   ├── Myfilms/          # Página de acesso aos filmes
│   │   └── Register/         # Registro
│   ├── services/             # Configuração de API e requisições
│   │   ├── axios.js
│   │   └── config.js
│   ├── test/                 # Testes unitários e de integração do frontend
│   │   ├── EmptyLine.test.jsx
│   │   ├── example.test.js
│   │   ├── GenreSelection.test.jsx
│   │   ├── InfoMovies.test.jsx
│   │   ├── LastPage.test.jsx
│   │   ├── Loading.test.jsx
│   │   ├── Login.test.jsx
│   │   ├── MovieSelection.test.jsx
│   │   ├── RatingSelection.test.jsx
│   │   ├── RuntimeSelection.test.jsx
│   │   └── setup.js
│   ├── package.json          # Dependências do frontend
│   ├── package-lock.json     # Controle de versões das dependências
│   ├── vite.config.js        # Configuração do Vite para build
│   ├── vitest.config.js      # Configuração de testes para frontend
│   ├── eslint.config.js      # Configuração do ESLint para padronização de código
│
├── test-results/             # Resultados de testes automatizados
├── package.json              # Dependências do projeto (se tiver monorepo)
├── package-lock.json         # Controle de versões das dependências
├── requirements.txt          # Lista de dependências do backend (Python)
├── vercel.json               # Configuração para deploy no Vercel (se aplicável)
├── README.md                 # Documentação principal do projeto
└── README copy.md            # Provavelmente um backup do README (pode ser removido)

