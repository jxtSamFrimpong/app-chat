const { client, modelName } = require('../config/openai.config')
const systemRole = require('./role')

const messageHandler = async (socket, data) => {
    console.log(`received message from ${socket.id}`, data)

    console.log(data)

    // const aiResponse = await client.chat.completions.create({
    //     model: modelName,
    //     messages: [
    //         ...data.messages
    //     ],
    //     max_tokens: 100,
    // });

    try {
        //throw new Error('Simulated error for testing purposes'); // Simulate an error for testing

        const aiResponse = await client.chat.completions.create({
            model: modelName,
            messages: [
                {
                    role: 'system',
                    content: systemRole
                },
                ...data.messages
            ],
            max_tokens: 400,
            stream: true
        });

        for await (const chunk of aiResponse) {
            const aiMessage = chunk.choices[0]?.delta.content || '';
            if (aiMessage) {
                const aiResponseContent = {
                    chatID: data.id,
                    content: aiMessage,
                    role: 'assistant'
                }
                socket.emit('ai-response', aiResponseContent)
                await new Promise(resolve => setTimeout(resolve, 100))
            }
        }
    } catch (error) {
        console.error('Error during AI response streaming:', error);
        const aiResponseContent = {
            chatID: data.id,
            content: 'Sorry, there was an error processing your request.',
            role: 'assistant',
            error: error.message || error.toString()
        }
        socket.emit('ai-error', aiResponseContent)
    }


    //stream is false
    // const aiMessage = aiResponse?.choices[0]?.message?.content

    // const aiResponseContent = {
    //     chatID: data.id,
    //     content: aiMessage ? aiMessage : 'Chat didnt respond ...',
    //     role: 'assistant'
    // }
    // socket.emit('ai-response', aiResponseContent)
}

module.exports = {
    messageHandler
}