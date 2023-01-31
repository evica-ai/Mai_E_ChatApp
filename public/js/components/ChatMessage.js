export default {
    name: 'TheChatMessageComponent',
    props: [`message`],

    template: `
    <section>
        <h2>{{ message.name }} says:</h2>
        <p>{{ message.content }}</p>
    </section>
    `
}