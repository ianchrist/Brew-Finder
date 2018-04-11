from flask import Flask, request, Response
import requests as req
import urllib

app = Flask(__name__)

@app.route('/api/breweries/')
def do_proxy():
	args = request.url.split('?')[1]
	res = req.get("https://api.brewerydb.com/v2/locations?{}".format(args) + "&key=94b47267204e747505d05fb3eaf543db&format=json")
	res = Response(res.text)
	res.headers['Access-Control-Allow-Origin'] = '*'
	res.headers['Content-type'] = 'application/json'

	return res

app.run(debug=True, host ="0.0.0.0", port=8001)
