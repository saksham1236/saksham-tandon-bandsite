var commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', commentResponseHandler);
var hasNum = /\d/;
function commentResponseHandler(event) {
    var nameInput = event.target.nameInput;
    var commentInput = event.target.commentInput;
    nameInput.classList.remove("error");
    commentInput.classList.remove("error");
    event.preventDefault();
    var userName = event.target.nameInput.value;
    var commentText = event.target.commentInput.value;
    var date = new Date();
    console.log(userName, commentText, date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
    if (hasNum.test(userName) || userName == "") {
        nameInput.classList.add("error");
        var errorMessage = document.createElement("p");
        var messageContent = document.createTextNode("Please enter valid name");
        errorMessage.appendChild(messageContent);
        errorMessage.classList.add('errorMsg');
        document.getElementById('nameInputContainer').insertBefore(errorMessage, nameInput);
    }
}
