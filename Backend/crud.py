import os
import sqlite3
import json
import bcrypt
import shutil

# Detecta se está rodando no Vercel
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Diretório do script atual
LOCAL_DB = os.path.join(BASE_DIR, "usuarios.db")  # Banco local
VERCEL_DB = "/tmp/usuarios.db"  # Banco temporário no Vercel

def get_db_path():
    """
    Retorna o caminho correto do banco de dados automaticamente.
    Se estiver no Vercel, copia o banco para '/tmp/' caso necessário.
    """
    if "VERCEL" in os.environ:  # Verifica se está rodando no Vercel
        if not os.path.exists(VERCEL_DB) and os.path.exists(LOCAL_DB):
            shutil.copy(LOCAL_DB, VERCEL_DB)
            print("Banco copiado para /tmp/")
        return VERCEL_DB
    return LOCAL_DB

def get_db_connection():
    """
    Retorna uma conexão com o banco de dados usando o caminho correto.
    """
    return sqlite3.connect(get_db_path(), check_same_thread=False)
    
# ========== INICIALIZAÇÃO ==========
def inicializar_banco():
    """ Cria o banco de dados e a tabela 'usuarios' se não existirem. """
    db_path = get_db_path()
    if not os.path.exists(db_path):
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                watched_movies TEXT DEFAULT '{}',
                selected_movies TEXT DEFAULT '{}'
            )
        ''')
        conn.commit()
        conn.close()
        print(f"Banco de dados criado em: {db_path}")
    else:
        print("Banco de dados já existe.")

# ========== FUNÇÕES CRUD ==========

def buscar_usuario(username):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()
    conn.close()

    if usuario:
        return {
            "usuario_existe": True,
            "dados": {
                "id": usuario[0],
                "username": usuario[1],
                "password": usuario[2],
                "watched_movies": json.loads(usuario[3]) if usuario[3] else {},
                "selected_movies": json.loads(usuario[4]) if usuario[4] else {}
            }
        }
    else:
        return {"usuario_existe": False}

def inserir_usuario(username, password):
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    if buscar_usuario(username)["usuario_existe"]:
        return {"usuario_existe": True}

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO usuarios (username, password, watched_movies, selected_movies) VALUES (?, ?, ?, ?)",
        (username, hashed_password, json.dumps({}), json.dumps({}))
    )
    conn.commit()
    conn.close()

    return {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}

def buscar_login(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()
    conn.close()

    if usuario and bcrypt.checkpw(password.encode(), usuario[2].encode()):
        return {
            "success": True,
            "message": "Login bem-sucedido!",
            "dados": {
                "id": usuario[0],
                "username": usuario[1],
                "watched_movies": json.loads(usuario[3]) if usuario[3] else {},
                "selected_movies": json.loads(usuario[4]) if usuario[4] else {}
            }
        }
    return {"success": False, "message": "Usuário ou senha incorretos."}

def autalizar_filmes(username):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()
    conn.close()
    if usuario:
        return {
            "success": True,
            "message": "Filmes atualizados com sucesso!",
            "dados": {
                "watched_movies": json.loads(usuario[3]) if usuario[3] else {},
                "selected_movies": json.loads(usuario[4]) if usuario[4] else {}
            }
        }
    return {"success": False, "message": "Erro ao atualizar filmes."}


def adicionar_filme_assistido(usuario, filme):
    conn = get_db_connection()
    cursor = conn.cursor()

    print(f"Verificando usuário com username: {usuario}")

    cursor.execute("SELECT watched_movies FROM usuarios WHERE username = ?", (usuario,))
    resultado = cursor.fetchone()

    if resultado:
        watched_movies_str = resultado[0] if resultado[0] else "{}"

        try:
            filmes_assistidos = json.loads(watched_movies_str)

            if not isinstance(filmes_assistidos, dict):
                filmes_assistidos = {}

            print(f"Filmes assistidos antes: {filmes_assistidos.keys()}")

            title_en = filme['title_en']
            if title_en in filmes_assistidos:
                print("Filme já adicionado aos filmes assistidos.")
            else:
                filmes_assistidos[title_en] = {
                    "title_pt": filme["title_pt"],
                    "title_en": filme["title_en"],
                    "overview": filme["overview"],
                    "director": filme["director"],
                    "runtime": filme["runtime"],
                    "review": filme["review"],
                    "poster_path": filme["poster_path"]
                }

                filmes_json = json.dumps(filmes_assistidos)
                cursor.execute("UPDATE usuarios SET watched_movies = ? WHERE username = ?", 
                               (filmes_json, usuario))
                conn.commit()

                print("Filme adicionado aos filmes assistidos com sucesso.")
                
        except json.JSONDecodeError:
            print("Erro ao decodificar JSON de watched_movies. Verifique o formato dos dados no banco.")
    else:
        print("Usuário não encontrado. Verifique o username e tente novamente.")

    conn.close()
    
def adicionar_filme_selecionado(usuario, filme):
    conn = get_db_connection()
    cursor = conn.cursor()

    print(f"Verificando usuário com username: {usuario}")

    cursor.execute("SELECT selected_movies FROM usuarios WHERE username = ?", (usuario,))
    resultado = cursor.fetchone()

    if resultado:
        selected_movies_str = resultado[0] if resultado[0] else "{}"

        try:
            filmes_assistidos = json.loads(selected_movies_str)

            if not isinstance(filmes_assistidos, dict):
                filmes_assistidos = {}

            print(f"Filmes assistidos antes: {filmes_assistidos.keys()}")

            title_en = filme['title_en']
            if title_en in filmes_assistidos:
                print("Filme já adicionado aos filmes assistidos.")
            else:
                filmes_assistidos[title_en] = {
                    "title_pt": filme["title_pt"],
                    "title_en": filme["title_en"],
                    "overview": filme["overview"],
                    "director": filme["director"],
                    "runtime": filme["runtime"],
                    "review": filme["review"],
                    "poster_path": filme["poster_path"]
                }

                filmes_json = json.dumps(filmes_assistidos)
                cursor.execute("UPDATE usuarios SET selected_movies = ? WHERE username = ?", 
                               (filmes_json, usuario))
                conn.commit()

                print("Filme adicionado aos filmes assistidos com sucesso.")
                
        except json.JSONDecodeError:
            print("Erro ao decodificar JSON de selected_movies. Verifique o formato dos dados no banco.")
    else:
        print("Usuário não encontrado. Verifique o username e tente novamente.")

    conn.close()

def buscar_filmes_assistidos(usuario):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT watched_movies FROM usuarios WHERE username = ?", (usuario,))
    resultado = cursor.fetchone()
    
    if resultado:
        try:
            filmes_assistidos = json.loads(resultado[0]) if resultado[0] else {}
            if not isinstance(filmes_assistidos, dict):
                filmes_assistidos = {}
                conn.close()
            return filmes_assistidos
        except json.JSONDecodeError:
            print("Erro ao decodificar JSON de watched_movies. Verifique o formato dos dados no banco.")
            conn.close()
            return {}
    else:
        print("Usuário não encontrado. Verifique o username e tente novamente.")
        conn.close()
        return {}

def buscar_filmes_selecionados(usuario):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT selected_movies FROM usuarios WHERE username = ?", (usuario,))
    resultado = cursor.fetchone()
    
    if resultado:
        try:
            filmes_selecionados = json.loads(resultado[0]) if resultado[0] else {}
            if not isinstance(filmes_selecionados, dict):
                filmes_selecionados = {}
                conn.close()
            return filmes_selecionados
        except json.JSONDecodeError:
            print("Erro ao decodificar JSON de selected_movies. Verifique o formato dos dados no banco.")
            conn.close()
            return {}
    else:
        print("Usuário não encontrado. Verifique o username e tente novamente.")
        conn.close()
        return {}