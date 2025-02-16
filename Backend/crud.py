import sqlite3

def buscar_usuario(username):
    conn = sqlite3.connect("/tmp/usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()
    
    conn.close()

    if usuario:
        return {"usuario_existe": True, "dados": {"id": usuario[0], "username": usuario[1], "password": usuario[2]}}
    else:
        return {"usuario_existe": False}

def inserir_usuario(username, password):
    resultado = buscar_usuario(username)

    if resultado["usuario_existe"]:
        return {"usuario_existe": True}  # Usuário já existe

    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    conn.close()
    
    return {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}

def buscar_login(username, password):
    conn = sqlite3.connect("usuarios.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE username = ? AND password = ?", (username, password))
    usuario = cursor.fetchone()

    conn.close()

    if usuario:
        return {"success": True, "message": "Login bem-sucedido!", "dados": {"id": usuario[0], "username": usuario[1]}}
    else:
        return {"success": False, "message": "Usuário ou senha incorretos."}


# print(buscar_login("admin", "1234"))  # Deve retornar sucesso se o usuário existir
# print(buscar_login("admin", "senha_errada"))  # Deve retornar erro
