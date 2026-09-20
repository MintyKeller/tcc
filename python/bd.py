import psycopg2  

conexao = psycopg2.connect(
    host="localhost",
    database="tcc",
    user="postgres",
    password="pepesani8"
)

cursor = conexao.cursor()
print("Conectado ao PostgreSQL!")

with open("/home/talita-keller/Documents/abc.wav", "rb") as arquivo:
    audio = arquivo.read()

cursor.execute("""
    INSERT INTO faixa_audio (nome, arquivo_audio)
    VALUES (%s, %s)
""", ("abc", psycopg2.Binary(audio)))

print("Áudio inserido!")


conexao.commit()

cursor.close()
conexao.close()
print("Tudo pronto!")

#cd /home/talita-keller/TCC/python
#source .venv/bin/activate
