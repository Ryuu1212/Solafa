from bottle import Bottle, template, static_file, request, response, redirect, abort
import solana 
from solana.rpc.api import Client
from solana.publickey import PublicKey

app = Bottle()

@app.route('/')
def index():
    return template('solafa.html')

@app.route('/static/<filepath:path>')
def static_content(filepath):
    return static_file(filepath, 'static')


app.run(port = 8800, debug = True, reloader = True)





