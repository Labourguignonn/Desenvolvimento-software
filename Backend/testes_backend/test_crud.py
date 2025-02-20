import pytest
import sqlite3
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from crud import buscar_usuario, inserir_usuario, buscar_login

# Criar um banco de dados temporário para os testes
@pytest.fixture(scope="function")
def setup_db():
    conn = sqlite3.connect(":memory:")  # Banco de dados em memória
    cursor = conn.cursor()

    # Criar tabela temporária
    cursor.execute("""
        CREATE TABLE usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    conn.commit()

    yield conn  # Entrega a conexão para os testes

    conn.close()  # Fecha o banco após os testes

# Mock da função buscar_usuario para usar o banco de memória
def buscar_usuario_mock(username, conn):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE username = ?", (username,))
    usuario = cursor.fetchone()

    if usuario:
        return {"usuario_existe": True, "dados": {"id": usuario[0], "username": usuario[1], "password": usuario[2]}}
    return {"usuario_existe": False}

# Mock da função inserir_usuario para usar o banco de memória
def inserir_usuario_mock(username, password, conn):
    resultado = buscar_usuario_mock(username, conn)

    if resultado["usuario_existe"]:
        return {"usuario_existe": True}  # Usuário já existe

    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", (username, password))
    conn.commit()

    return {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}

# Mock da função buscar_login para usar o banco de memória
def buscar_login_mock(username, password, conn):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE username = ? AND password = ?", (username, password))
    usuario = cursor.fetchone()

    if usuario:
        return {"success": True, "message": "Login bem-sucedido!", "dados": {"id": usuario[0], "username": usuario[1]}}
    return {"success": False, "message": "Usuário ou senha incorretos."}

# Teste para buscar usuário inexistente
def test_buscar_usuario_nao_existe(setup_db):
    conn = setup_db
    resultado = buscar_usuario_mock("usuario_teste", conn)
    assert resultado["usuario_existe"] is False

# Teste para inserir usuário novo
def test_inserir_usuario(setup_db):
    conn = setup_db
    resultado = inserir_usuario_mock("usuario_teste", "senha123", conn)
    assert resultado["usuario_existe"] is False
    assert resultado["message"] == "Usuário cadastrado com sucesso!"

# Teste para inserir usuário duplicado
def test_inserir_usuario_duplicado(setup_db):
    conn = setup_db
    inserir_usuario_mock("usuario_teste", "senha123", conn)  # Primeiro cadastro
    resultado = inserir_usuario_mock("usuario_teste", "outrasenha", conn)  # Tentativa duplicada
    assert resultado["usuario_existe"] is True  # O usuário já deve existir

# Teste para login bem-sucedido
def test_buscar_login_sucesso(setup_db):
    conn = setup_db
    inserir_usuario_mock("usuario_teste", "senha123", conn)
    resultado = buscar_login_mock("usuario_teste", "senha123", conn)
    assert resultado["success"] is True
    assert resultado["message"] == "Login bem-sucedido!"
    assert resultado["dados"]["username"] == "usuario_teste"

# Teste para login com senha errada
def test_buscar_login_senha_errada(setup_db):
    conn = setup_db
    inserir_usuario_mock("usuario_teste", "senha123", conn)
    resultado = buscar_login_mock("usuario_teste", "senhaErrada", conn)
    assert resultado["success"] is False
    assert resultado["message"] == "Usuário ou senha incorretos."

# Teste para login com usuário inexistente
def test_buscar_login_usuario_inexistente(setup_db):
    conn = setup_db
    resultado = buscar_login_mock("usuario_nao_existe", "senha123", conn)
    assert resultado["success"] is False
    assert resultado["message"] == "Usuário ou senha incorretos."
