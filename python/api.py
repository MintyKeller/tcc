from flask import Flask, Response
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)


def conectar_banco():
    return psycopg2.connect(
        host="localhost",
        database="tcc",
        user="postgres",
        password="pepesani8"
    )


@app.route("/audio/<int:id_audio>")
def buscar_audio(id_audio):

    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        """
        SELECT arquivo_audio
        FROM faixa_audio
        WHERE id_audio = %s
        """,
        (id_audio,)
    )

    resultado = cursor.fetchone()

    cursor.close()
    conexao.close()

    if resultado is None:
        return "Áudio não encontrado", 404

    audio = resultado[0]

    return Response(
        audio,
        mimetype="audio/wav"
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)