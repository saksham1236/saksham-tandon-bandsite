const commentForm = document.getElementById('commentForm');

commentForm.addEventListener('submit', commentResponseHandler);

let hasNum = /\d/;

function commentResponseHandler (event) {
    let nameInput = event.target.nameInput;
    let commentInput = event.target.commentInput;
    nameInput.classList.remove("error");
    commentInput.classList.remove("error")
    event.preventDefault();
    const userName = event.target.nameInput.value
    const commentText = event.target.commentInput.value;
    const date = new Date();
    console.log(userName, commentText, `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);

    if(hasNum.test(userName) || userName == "") {
        nameInput.classList.add("error");
        const errorMessage = document.createElement("p");
        const messageContent = document.createTextNode("Please enter valid name");
        errorMessage.appendChild(messageContent);
        errorMessage.classList.add('errorMsg');
        document.getElementById('nameInputContainer').insertBefore(errorMessage, nameInput);

    }
}