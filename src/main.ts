import { Editor, Plugin } from 'obsidian';

interface TextTransformsSettings {}

const DEFAULT_SETTINGS: TextTransformsSettings = {};

export default class TextTransforms extends Plugin {
  settings: TextTransformsSettings;

  async onload() {
    await this.loadSettings();

    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, editor) => {
        const text = editor.getSelection();
        const noSelection = !text || !text.trim();
        console.log({ text, noSelection });
        menu.addItem((item) => {
          item
            .setTitle('UPPER')
            .setIcon('case-upper')
            .setDisabled(noSelection)
            .onClick(async () => editor.replaceSelection(text.toUpperCase()));
        });

        menu.addItem((item) => {
          item
            .setTitle('lower')
            .setIcon('case-lower')
            .setDisabled(noSelection)
            .onClick(async () => editor.replaceSelection(text.toLowerCase()));
        });
      })
    );

    this.addCommand({
      id: 'upper',
      name: 'UPPER',
      icon: 'A',
      editorCallback: (editor: Editor) => {
        const selected = editor.getSelection();
        editor.replaceSelection(selected.toUpperCase());
      }
    });

    this.addCommand({
      id: 'lower',
      name: 'lower',
      icon: 'a',
      editorCallback: (editor: Editor) => {
        const selected = editor.getSelection();
        editor.replaceSelection(selected.toLowerCase());
      }
    });
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
