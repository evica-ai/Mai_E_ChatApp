export default {
    name: 'TheChatMessageComponent',
    props: [`message`],

    template: 
    `
    <article class="chat-messages" :class="{ 'other-messages' :matchedID }">
        <h2>{{ message.name }} says:</h2>
        <p>{{ message.content }}</p>
    </article>
    `,

    data() {
        return {
            message: 'hello from the template',
            // everytime an incoming message arrives, check against the user ID to see if this is ours
            // if it IS, apply a CSS class to indicate that it is ours
            // if it ISNT, apply a different CSS class to make that obvious
            // comparison function
            matchedID: this.$parent.socketID == this.message.id
        }
    }
}