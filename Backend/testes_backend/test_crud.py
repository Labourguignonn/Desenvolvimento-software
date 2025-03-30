import pytest
import sqlite3
import sys
import os
import json
import bcrypt

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from crud import (
    buscar_usuario, inserir_usuario, buscar_login,
    adicionar_filme_assistido, adicionar_filme_selecionado,
    buscar_filmes_assistidos, buscar_filmes_selecionados
)

@pytest.fixture(scope="function")
def setup_db():
    conn = sqlite3.connect(":memory:")  # Banco de dados em memória
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            watched_movies TEXT DEFAULT '{}',
            selected_movies TEXT DEFAULT '{}'
        )
    """)
    conn.commit()
    yield conn  # Entrega a conexão para os testes
    conn.close()

# Teste para buscar usuário inexistente
def test_buscar_usuario_nao_existe(setup_db):
    conn = setup_db
    resultado = buscar_usuario("usuario_teste")
    assert resultado["usuario_existe"] is False

# Teste para inserir usuário novo
def test_inserir_usuario(setup_db):
    conn = setup_db
    resultado = inserir_usuario("usuario_teste", "senha123")
    assert resultado["usuario_existe"] is False
    assert resultado["message"] == "Usuário cadastrado com sucesso!"

# Teste para inserir usuário duplicado
def test_inserir_usuario_duplicado(setup_db):
    conn = setup_db
    inserir_usuario("usuario_teste", "senha123")
    resultado = inserir_usuario("usuario_teste", "outrasenha")
    assert resultado["usuario_existe"] is True

# Teste para login bem-sucedido
def test_buscar_login_sucesso(setup_db):
    conn = setup_db
    senha_hash = bcrypt.hashpw("senha123".encode(), bcrypt.gensalt()).decode()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", ("usuario_teste", senha_hash))
    conn.commit()

    resultado = buscar_login("usuario_teste", "senha123")
    assert resultado["success"] is True
    assert resultado["message"] == "Login bem-sucedido!"
    assert resultado["dados"]["username"] == "usuario_teste"

# Teste para login com senha errada
def test_buscar_login_senha_errada(setup_db):
    conn = setup_db
    inserir_usuario("usuario_teste", "senha123")
    resultado = buscar_login("usuario_teste", "senhaErrada")
    assert resultado["success"] is False
    assert resultado["message"] == "Usuário ou senha incorretos."

# Teste para login com usuário inexistente
def test_buscar_login_usuario_inexistente(setup_db):
    conn = setup_db
    resultado = buscar_login("usuario_nao_existe", "senha123")
    assert resultado["success"] is False
    assert resultado["message"] == "Usuário ou senha incorretos."

# Teste para adicionar e buscar filmes assistidos
def test_adicionar_buscar_filme_assistido(setup_db):
    conn = setup_db
    inserir_usuario("usuario_teste", "senha123")
    filme = {"title_pt": "Filme Teste", "title_en": "Test Movie", "overview": "Descrição", "director": "Diretor", "runtime": 120, "review": "8.5", "poster_path": "/caminho.jpg"}
    adicionar_filme_assistido("usuario_teste", filme)
    filmes = buscar_filmes_assistidos("usuario_teste")
    assert "Test Movie" in filmes

# Teste para adicionar e buscar filmes selecionados
def test_adicionar_buscar_filme_selecionado(setup_db):
    conn = setup_db
    inserir_usuario("usuario_teste", "senha123")
    filme = {"title_pt": "Filme Teste", "title_en": "Test Movie", "overview": "Descrição", "director": "Diretor", "runtime": 120, "review": "8.5", "poster_path": "/caminho.jpg"}
    adicionar_filme_selecionado("usuario_teste", filme)
    filmes = buscar_filmes_selecionados("usuario_teste")
    assert "Test Movie" in filmes
