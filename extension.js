//import * as vscode from 'vscode';
import * as cp from 'child_process';
const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.installFlutterDependency', () => {
        // Get the current workspace folder
        const workspaceFolder = vscode.workspace.onDidChangeWorkspaceFolders[0];

        if (workspaceFolder) {
            // Prompt the user for the dependency name
            vscode.window.showInputBox({
                prompt: 'Enter Flutter dependency name'
            }).then(dependencyName => {
                if (dependencyName) {
                    // Run the 'flutter pub get' command to install the dependency
                    const command = `flutter pub get ${dependencyName}`;
                    const options = { cwd: workspaceFolder.uri.fsPath };

                    cp.exec(command, options, (error, stdout, stderr) => {
                        if (error) {
                            vscode.window.showErrorMessage(`Failed to install ${dependencyName}.`);
                        } else {
                            vscode.window.showInformationMessage(`${dependencyName} installed successfully.`);
                        }
                    });
                }
            });
        }
    });

    context.subscriptions.push(disposable);
	// console.log('Congratulations, your extension "select-package-flutter" is now active!');
	// let disposable = vscode.commands.registerCommand('select-package-flutter.helloWorld', function () {
	// 	vscode.window.showInformationMessage('Hello World from Select Package Flutter!');
	// });
	// context.subscriptions.push(disposable);
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



// export function activates(context: vscode.ExtensionContext) {
//     let disposable = vscode.commands.registerCommand('extension.installFlutterDependency', () => {
//         // Get the current workspace folder
//         const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

//         if (workspaceFolder) {
//             // Prompt the user for the dependency name
//             vscode.window.showInputBox({
//                 prompt: 'Enter Flutter dependency name'
//             }).then(dependencyName => {
//                 if (dependencyName) {
//                     // Run the 'flutter pub get' command to install the dependency
//                     const command = `flutter pub get ${dependencyName}`;
//                     const options = { cwd: workspaceFolder.uri.fsPath };

//                     cp.exec(command, options, (error, stdout, stderr) => {
//                         if (error) {
//                             vscode.window.showErrorMessage(`Failed to install ${dependencyName}.`);
//                         } else {
//                             vscode.window.showInformationMessage(`${dependencyName} installed successfully.`);
//                         }
//                     });
//                 }
//             });
//         }
//     });

//     context.subscriptions.push(disposable);
// }

// export function deactivate() {}


module.exports = {
	activate,
	deactivate,
	searchFlutterDependency,
	installDependency,
	

}
