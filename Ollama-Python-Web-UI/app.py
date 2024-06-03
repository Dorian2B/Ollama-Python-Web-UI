from flask import Flask, render_template, request, jsonify
import ollama_utils

app = Flask(__name__)

@app.route('/')
def index():
    models = ollama_utils.get_available_models()
    return render_template('index.html', models=models)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    conversation = data.get('conversation')
    model = data.get('model')
    response = ollama_utils.generate_response(model, conversation)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)