from config import Config
from eXistWrapper.wrapper import ExistWrapper
from flask import Flask, render_template
from Naked.toolshed.shell import execute_js, muterun_js




# Initialise app
app = Flask(__name__)



exist = ExistWrapper(Config().existURI)


@app.route("/")
def index():
	return render_template('testLinkurious.html')


@app.route("/letter/")
@app.route("/letter/<path:path>/")
def letter(path=None):
	return render_template('testLinkurious.html')


@app.route('/ajax/letter/<int:letterId>/')
def letterAjax(letterId):
	try:
		return exist.letter(letterId)
	except:
		return "NO LETTER OF THAT ID"

@app.route('/ajax/letter/')
def letterDefault():
	return '<em>Sorry no letter</em>'

@app.route('/ajax/defaultGraph')
def defaultGraph():
	return exist.buildGraph()



@app.route('/ajax/testNode')
def testNode():
	print('run')
	graph = exist.buildGraph()
	with open('graph.json', 'w') as f:
		f.write(graph)

	response = muterun_js('test.js')
	if response.exitcode == 0:
		return response.stdout
	else:
		return 'fail'




if __name__ == '__main__':
    app.run(debug=True)
    
    
