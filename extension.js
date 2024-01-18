
const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "select-package-flutter" is now active!');
	let disposable = vscode.commands.registerCommand('select-package-flutter.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from Select Package Flutter!');
	});
	context.subscriptions.push(disposable);
}
function deactivate() {}
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

function installDependency(packageName) {
  const terminal = vscode.window.createTerminal('Flutter Terminal');
  terminal.sendText(`flutter pub get ${packageName}`);
  terminal.show();
}


module.exports = {
	activate,
	deactivate,
	searchFlutterDependency,
	installDependency,
	

}
