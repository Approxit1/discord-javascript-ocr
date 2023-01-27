// JAVASCRIPT IMPORTS:
const { client } = require('discord.js')
const { createWorker } = require('tesseract.js')

// JAVASCRIPT EXPORTS:
module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    const image = message.attachments.first()
    if (!image) {
      return
    }

    try {
      const worker = await createWorker()
      await worker.load()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const {
        data: { text },
      } = await worker.recognize(image.url)
      await worker.terminate()

      console.log(text)
      message.reply(`\`\`\`\n${text}\`\`\``)
    } catch (e) {
      console.error(e)
    }
  })
}

// JAVASCRIPT EXPORTS:
module.exports.config = {
  dbName: 'IMAGE_TO_TEXT',
  displayName: 'Image to Text',
}

