const axios = require('axios');

function searchFlutterDependency(query) {
  const apiUrl = `https://pub.dev/api/search?q=${query}`;
  
  return axios.get(apiUrl)
    .then(response => response.data.packages)
    .catch(error => {
      console.error('Error searching for Flutter dependency:', error);
      return [];
    });
}
const vscode = require('vscode');

function installDependency(packageName) {
  const terminal = vscode.window.createTerminal('Flutter Terminal');
  terminal.sendText(`flutter pub get ${packageName}`);
  terminal.show();
}
