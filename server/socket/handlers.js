const { client, modelName } = require('../config/openai.config')

const messageHandler = async (socket, data) => {
    console.log(`received message from ${socket.id}`, data)

    console.log(data)

    const aiResponse = await client.chat.completions.create({
        model: modelName,
        messages: [
            ...data.messages
        ],
        max_tokens: 1000,
    });

    const aiMessage = aiResponse?.choices[0]?.message?.content

    const aiResponseContent = {
        chatID: data.id,
        content: aiMessage ? aiMessage : 'Chat didnt respond ...',
        role: 'assistant'
    }
    socket.emit('ai-response', aiResponseContent)
}

module.exports = {
    messageHandler
}