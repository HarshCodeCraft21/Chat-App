const socket = io();

let Name;
let InputVal = document.getElementById('Input-Text');
let messageArea = document.querySelector('.main-area');

do{
    Name = prompt("Enter Your Name to Join The chat:-")
}while(!Name);

InputVal.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value)
        e.target.value = ''
        scrollTopToBottom();
    }
})

function sendMessage(message){
    let msg = {
        user:Name,
        message:message,
    }
    appendMessage(msg,'right-side-message');
    socket.emit('message',{
        user:Name,
        message:message
    })
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');
    let markup = `
    <h5>${msg.user}</h5>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on('message',(msg)=>{
    appendMessage(msg,'left-side-message');
    scrollTopToBottom()
})

function scrollTopToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}