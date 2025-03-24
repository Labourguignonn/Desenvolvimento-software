import os
import sqlite3
import shutil
import bcrypt

def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verificar_senha(password, hashed_password):
    return bcrypt.checkpw(password.encode(), hashed_password.encode())

"""LOCALHOST VERSION"""

# def inserir_usuario(username, password):
#     hashed_password = hash_password(password)
#     resultado = buscar_usuario(username)

#     if resultado["usuario_existe"]:
#         return {"usuario_existe": True}  # Usuário já existe

#     conn = sqlite3.connect("usuarios.db")
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", (username, hashed_password))
#     conn.commit()
#     conn.close()
    
#     return {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}

# def buscar_usuario(username):
#     conn = sqlite3.connect("usuarios.db")
#     cursor = conn.cursor()

#     cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
#     usuario = cursor.fetchone()

#     conn.close()

#     if usuario:
#         return {"usuario_existe": True, "dados": {"id": usuario[0], "username": usuario[1], "password": usuario[2]}}
#     else:
#         return {"usuario_existe": False}

# def buscar_login(username, password):
#     # Busca o usuário no banco de dados
#     conn = sqlite3.connect("usuarios.db")
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

"""VERCEL VERSION"""

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Diretório do arquivo atual
ORIGINAL_DB = os.path.join(BASE_DIR, "usuarios.db")   # Caminho correto do banco
TMP_DB = "/tmp/usuarios.db"  # Caminho temporário no Vercel

##Verifica se o banco já foi copiado para /tmp, senão copia
if not os.path.exists(TMP_DB):
    if os.path.exists(ORIGINAL_DB):  
        shutil.copy(ORIGINAL_DB, TMP_DB)
        print("Banco de dados copiado para /tmp/")
    else:
        print("Erro: 'usuarios.db' não encontrado dentro do Backend!")


def buscar_usuario(username):

    conn = sqlite3.connect(TMP_DB, check_same_thread=False)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()
    
    conn.close()

    if usuario:
        return {"usuario_existe": True, "dados": {"id": usuario[0], "username": usuario[1], "password": usuario[2]}}
    else:
        return {"usuario_existe": False}

def inserir_usuario(username, password):
    hashed_password = hash_password(password)
    resultado = buscar_usuario(username)

    if resultado["usuario_existe"]:
        return {"usuario_existe": True}  
    
    hashed_password = hash_password(password)

    conn = sqlite3.connect(TMP_DB, check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", (username, hashed_password))
    conn.commit()
    conn.close()
    
    return {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}

def buscar_login(username, password):

    conn = sqlite3.connect(TMP_DB, check_same_thread=False)
    cursor = conn.cursor()

        cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
        usuario = cursor.fetchone()

        conn.close()

        if usuario:
            # Verifica se a senha fornecida corresponde ao hash no banco
            if verificar_senha(password, usuario[2]):
                return {"success": True, "message": "Login bem-sucedido!", "dados": {"id": usuario[0], "username": usuario[1]}}
            else:
                return {"success": False, "message": "Usuário ou senha incorretos."}
        else:
            return {"success": False, "message": "Usuário ou senha incorretos."}


