from config import Config
from eXistWrapper.wrapper import ExistWrapper
from flask import Flask, render_template




	
app = Flask(__name__)
exist = ExistWrapper(Config().existURI)

@app.route("/")
def index():
	return render_template('index.html')

@app.route("/letter/")
@app.route("/letter/<path:path>/")
def letter(path=None):
	return render_template('index.html')

@app.route('/ajax/letter/<int:letterId>/')
def letterAjax(letterId):
	try:
		return exist.letter(letterId)
	except:
		return "NO LETTER OF THAT ID"

@app.route('/ajax/letter/')
def letterDefault():
	return '<em>Sorry no letter</em>'


if __name__ == '__main__':
    app.run(debug=True)
    
