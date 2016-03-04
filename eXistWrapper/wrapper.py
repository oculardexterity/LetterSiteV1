import requests

class ExistWrapper:
	def __init__(self, existURI):
		self.connection = existURI

	def run(self, suff):
		run_string = self.connection + suff
		r = requests.get(run_string)
		if "<null></null>" not in r.text:
			return r.text
		else:
			raise(Exception)

	def letter(self, req):
		return self.run("letter.xql?letter=" + str(req))

	def buildGraph(self):
		return self.run("buildGraph.xql")

