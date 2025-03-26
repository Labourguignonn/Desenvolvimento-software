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
        return {"usuario_existe": True}  # Usuário já existe

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

def buscar_login(username, password):
    # Busca o usuário no banco de dados
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()

    if usuario:
        if verificar_senha(password, usuario[2]):
            filmes_assistidos = json.loads(usuario[3])
            filmes_selecionados = json.loads(usuario[4])  

            assistidos_dict = {
                filme['title_en']: filme for filme in filmes_assistidos
            }
            selecionados_dict = {
                filme['title_en']: filme for filme in filmes_selecionados
            }
            cursor.close()
            
            exibir_filmes(usuario[2])
            return {"success": True, "message": "Login bem-sucedido!", "dados": {"id": usuario[0], "username": usuario[1], "watched_movies": assistidos_dict, "selected_movies": selecionados_dict}}
        else:
            cursor.close()
            return {"success": False, "message": "Usuário ou senha incorretos."}
    else:
        cursor.close()
        return {"success": False, "message": "Usuário não cadastrado."}

def adicionar_filme_assistido(usuario_id, filme):
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT watched_movies FROM usuarios WHERE id = ?", (usuario_id,))
    usuario = cursor.fetchone()

    if usuario:
        filmes_assistidos = json.loads(usuario[0]) 
        if any(f['title_en'] == filme['title_en'] for f in filmes_assistidos):
            print("Filme já adicionado aos filmes assistidos.")
        else:
            filmes_assistidos.append(filme)  
            cursor.execute("UPDATE usuarios SET watched_movies = ? WHERE id = ?", (json.dumps(filmes_assistidos), usuario_id))
            conn.commit()
            print("Filme adicionado aos filmes assistidos com sucesso.")
    else:
        print("Usuário não encontrado.")
            
    conn.close()
    
def adicionar_filme_selecionado(usuario_id, filme):
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT selected_movies FROM usuarios WHERE id = ?", (usuario_id,))
    usuario = cursor.fetchone()

    if usuario:
        filmes_selecionados = json.loads(usuario[0]) 
        if any(f['title_en'] == filme['title_en'] for f in filmes_selecionados):
            print("Filme já adicionado aos filmes selecionados.")
        else:
            filmes_selecionados.append(filme)  
            cursor.execute("UPDATE usuarios SET selected_movies = ? WHERE id = ?", (json.dumps(filmes_selecionados), usuario_id))
            conn.commit()
            print("Filme adicionado aos filmes selecionados com sucesso.")
    else:
        print("Usuário não encontrado.")
            
    conn.close()

def exibir_filmes(usuario_id):
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()
    cursor.execute("SELECT watched_movies, selected_movies FROM usuarios WHERE id = ?", (usuario_id,))
    resultado = cursor.fetchone()
    conn.close()

    if resultado:
        print("Filmes assistidos:", json.loads(resultado[0]))
        print("Filmes selecionados:", json.loads(resultado[1]))
    else:
        print("Usuário não encontrado.")



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

