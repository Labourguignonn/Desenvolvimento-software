import sqlite3
import os

# Caminho para o arquivo do banco de dados
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOCAL_DB = os.path.join(BASE_DIR, "usuarios.db")

# Conectar ao banco de dados SQLite
conn = sqlite3.connect(LOCAL_DB)
cursor = conn.cursor()

# Executar a consulta para pegar todos os usuários
cursor.execute("SELECT username FROM usuarios;")  # Ajuste os campos conforme necessário
usuarios = cursor.fetchall()

# Exibir os resultados
for usuario in usuarios:
    print(f"Nome: {usuario[0]}")  # Ajuste os índices conforme os campos que você está selecionando

# Fechar a conexão
conn.close()
