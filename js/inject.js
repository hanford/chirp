document.addEventListener('DOMContentLoaded', () => {
  const {
    SpellCheckHandler,
    ContextMenuListener,
    ContextMenuBuilder
  } = require('electron-spellchecker')

  window.spellCheckHandler = new SpellCheckHandler()
  window.spellCheckHandler.attachToInput()

  window.spellCheckHandler.switchLanguage(navigator.language)

  let contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler)
  let contextMenuListener = new ContextMenuListener((info) => {
      contextMenuBuilder.showPopupMenu(info);
  })
})
