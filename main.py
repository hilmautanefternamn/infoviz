from flask import Flask, render_template
import json

#Initialize Flask App
app = Flask(__name__)


@app.route('/')
def hello() :
	return json.dumps('Hello World!')


def home() :
    return render_template('main.html', jsondata = hey)


if __name__ == '__main__':
    hey = hello()
    app.run(debug=True)
