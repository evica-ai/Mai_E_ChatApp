export default {
    name: 'TheChatStatusComponent',
    props: [`message`],

    template: 
    `
    
    <ul>
        <li><h2>{{ message.name }} is typing...</h2></li>
    </ul>
   
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