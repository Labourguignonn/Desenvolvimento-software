import pytest
import sqlite3
import sys
import os
from unittest.mock import patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from crud import buscar_usuario, inserir_usuario, buscar_login  # Substitua 'your_module' pelo nome real do módulo

TMP_DB = "/tmp/test_usuarios.db"

def setup_module(module):
    """Configuração do banco de dados de teste."""
    conn = sqlite3.connect(TMP_DB)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    """)
    conn.commit()
    conn.close()

def teardown_module(module):
    """Remove o banco de dados de teste após os testes."""
    if os.path.exists(TMP_DB):
        os.remove(TMP_DB)

@patch("your_module.TMP_DB", TMP_DB)
def test_inserir_usuario(mock_db):
    resultado = inserir_usuario("teste_user", "senha123")
    assert resultado == {"usuario_existe": False, "message": "Usuário cadastrado com sucesso!"}
    
    # Testar inserção repetida
    resultado_repetido = inserir_usuario("teste_user", "senha123")
    assert resultado_repetido == {"usuario_existe": True}

@patch("your_module.TMP_DB", TMP_DB)
def test_buscar_usuario(mock_db):
    inserir_usuario("teste_user2", "senha456")
    resultado = buscar_usuario("teste_user2")
    assert resultado["usuario_existe"] is True
    assert resultado["dados"]["username"] == "teste_user2"

    resultado_inexistente = buscar_usuario("usuario_nao_existente")
    assert resultado_inexistente == {"usuario_existe": False}

@patch("your_module.TMP_DB", TMP_DB)
def test_buscar_login(mock_db):
    inserir_usuario("login_user", "login_pass")
    resultado = buscar_login("login_user", "login_pass")
    assert resultado == {"success": True, "message": "Login bem-sucedido!", "dados": {"id": 1, "username": "login_user"}}

    resultado_falha = buscar_login("login_user", "senha_errada")
    assert resultado_falha == {"success": False, "message": "Usuário ou senha incorretos."}
