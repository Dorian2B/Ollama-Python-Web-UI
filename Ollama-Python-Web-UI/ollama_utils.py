import subprocess

def get_available_models():
    return ["llama3", "phi3"]

def generate_response(model, message):
    try:
        command = ["ollama", "run", model, message]
        result = subprocess.run(command, capture_output=True, text=True, encoding='utf-8')
        output = result.stdout.strip()
        # Supprimer la première ligne d'erreur si elle est présente
        lines = output.split('\n')
        if lines[0].startswith("failed to get console mode"):
            lines = lines[2:]  # Suppression des deux premières lignes d'erreur
        return '\n'.join(lines).strip()
    except Exception as e:
        return f"Error: {e}"
