import os
import sqlite3
import bcrypt
import json

def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verificar_senha(password, hashed_password):
    return bcrypt.checkpw(password.encode(), hashed_password.encode())

"""LOCALHOST VERSION"""

def inicializar_banco():
    if not os.path.exists("usuarios.db"):
        conn = sqlite3.connect("usuarios.db")
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                watched_movies TEXT,
                selected_movies TEXT
            )
        ''')
        conn.commit()
        conn.close()
        print("Banco de dados e tabela 'usuarios' criados com sucesso!")
    else:
        print("Banco de dados já existe.") 

def inserir_usuario(username, password):
    hashed_password = hash_password(password)
    resultado = buscar_usuario(username)

    if resultado["usuario_existe"]:
        return {"usuario_existe": True} 
    
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (username, password, watched_movies, selected_movies) VALUES (?, ?, ?, ?)", 
                   (username, hashed_password, json.dumps([]), json.dumps([]))) 
    conn.commit()
    conn.close()

    return {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}


def buscar_usuario(username):
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()

    conn.close()

    if usuario:
        return {"usuario_existe": True, "dados": {"id": usuario[0], "username": usuario[1], "password": usuario[2], "watched_movies": json.loads(usuario[3])}}
    else:
        return {"usuario_existe": False}

import json

import json
import sqlite3

def carregar_filmes(filmes_json):
    """
    Converte uma string JSON de filmes armazenados no banco para um dicionário estruturado.

    Parâmetros:
    - filmes_json (str): String JSON contendo os filmes assistidos ou selecionados.

    Retorna:
    - dict: Dicionário com os filmes indexados por 'title_en'.
    """
    try:
        filmes = json.loads(filmes_json) if filmes_json else {}

        if isinstance(filmes, list):
            filmes = {filme['title_en']: filme for filme in filmes}
        elif not isinstance(filmes, dict):
            filmes = {}

        return filmes

    except json.JSONDecodeError:
        return {}

def buscar_login(username, password):
    """
    Verifica o login de um usuário e retorna seus dados caso as credenciais sejam válidas.

    Parâmetros:
    - username (str): Nome de usuário.
    - password (str): Senha fornecida.

    Retorna:
    - dict: Dicionário com o status do login e os dados do usuário (se bem-sucedido).
    """
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()

    if usuario:
        if verificar_senha(password, usuario[2]):
            filmes_assistidos = carregar_filmes(usuario[3])
            filmes_selecionados = carregar_filmes(usuario[4])   

            cursor.close()
            return {
                "success": True,
                "message": "Login bem-sucedido!",
                "dados": {
                    "id": usuario[0],
                    "username": usuario[1],
                    "watched_movies": filmes_assistidos,
                    "selected_movies": filmes_selecionados
                }
            }
        else:
            cursor.close()
            return {"success": False, "message": "Usuário ou senha incorretos."}
    else:
        cursor.close()
        return {"success": False, "message": "Usuário não cadastrado."}
    
    
"""""FRONT"""

def verificar_usuarios():
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios;")
    usuarios = cursor.fetchall()

    if usuarios:
        print("Usuários cadastrados:")
        for u in usuarios:
            print(f"ID: {u[0]}, Username: {u[1]}, Watched Movies: {u[3]}")
    else:
        print("Nenhum usuário cadastrado.")

    conn.close()

    verificar_usuarios()

def adicionar_filme_assistido(usuario, filme):
    conn = sqlite3.connect("usuarios.db")
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
    conn = sqlite3.connect("usuarios.db")
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

"""VERCEL VERSION"""

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Diretório do arquivo atual
# ORIGINAL_DB = os.path.join(BASE_DIR, "usuarios.db")   # Caminho correto do banco
# TMP_DB = "/tmp/usuarios.db"  # Caminho temporário no Vercel

# ##Verifica se o banco já foi copiado para /tmp, senão copia
# if not os.path.exists(TMP_DB):
#     if os.path.exists(ORIGINAL_DB):  
#         shutil.copy(ORIGINAL_DB, TMP_DB)
#         print("Banco de dados copiado para /tmp/")
#     else:
#         print("Erro: 'usuarios.db' não encontrado dentro do Backend!")


# def buscar_usuario(username):

#     conn = sqlite3.connect(TMP_DB, check_same_thread=False)
#     cursor = conn.cursor()

#     cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
#     usuario = cursor.fetchone()
    
#     conn.close()

#     if usuario:
#         return {"usuario_existe": True, "dados": {"id": usuario[0], "username": usuario[1], "password": usuario[2]}}
#     else:
#         return {"usuario_existe": False}

# def inserir_usuario(username, password):
#     hashed_password = hash_password(password)
#     resultado = buscar_usuario(username)

#     if resultado["usuario_existe"]:
#         return {"usuario_existe": True}  
    
#     hashed_password = hash_password(password)

#     conn = sqlite3.connect(TMP_DB, check_same_thread=False)
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", (username, hashed_password))
#     conn.commit()
#     conn.close()
    
#     return {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}

# def buscar_login(username, password):

#     conn = sqlite3.connect(TMP_DB, check_same_thread=False)
#     cursor = conn.cursor()

#     cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
#     usuario = cursor.fetchone()

#     conn.close()

#     if usuario:
#         # Verifica se a senha fornecida corresponde ao hash no banco
#         if verificar_senha(password, usuario[2]):
#             return {"success": True, "message": "Login bem-sucedido!", "dados": {"id": usuario[0], "username": usuario[1]}}
#         else:
#             return {"success": False, "message": "Usuário ou senha incorretos."}
#     else:
#         return {"success": False, "message": "Usuário ou senha incorretos."}

