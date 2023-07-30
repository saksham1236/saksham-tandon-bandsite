const comments = [
    {
        userId: "Jack Marston",
        commentToken: "12332454325423",
        commentDate: "26/07/23",
        commentText: "I want to know what Great Attractor is, curiosity is just killing me."
    },
    {
        userId: "Rose Zapata",
        commentToken: "2342423q52345",
        commentDate: "1/03/23",
        commentText: "How to make the world a better place? It is easy, everyone should do his/her job and don't disturb other people from them doing the same thing."
    }
]
const commentForm = document.getElementById('commentForm');


commentForm.addEventListener('submit', commentResponseHandler);

let hasNum = /\d/;

function removeErrorMsg():void {
    const errorMsg = document.getElementsByClassName('errorMsg');
    for(let i = 0; i < errorMsg.length; ++i) {
        errorMsg[i].remove();
    }
}

function formReset() {
    document.getElementById('commentForm').reset;
}

function commentResponseHandler (event) {
    event.preventDefault();
    removeErrorMsg();
    let hasError:boolean;
    let nameInput = event.target.nameInput;
    let commentInput = event.target.commentInput;
    nameInput.classList.remove("error");
    commentInput.classList.remove("error")
    const userName = event.target.nameInput.value
    const commentText = event.target.commentInput.value;
    const date = new Date();
    const today = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    console.log(userName, commentText, `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);

    if(hasNum.test(userName) || userName == "") {
        nameInput.classList.add("error");
        const errorMessage = document.createElement("p");
        const messageContent = document.createTextNode("Please enter valid name");
        errorMessage.appendChild(messageContent);
        errorMessage.classList.add('errorMsg');
        document.getElementById('nameInputContainer').insertBefore(errorMessage, nameInput);
        hasError = true;
    }

    if(commentText == "") {
        commentInput.classList.add("error");
        const errorMessage = document.createElement("p");
        const messageContent = document.createTextNode("Please enter a comment");
        errorMessage.appendChild(messageContent);
        errorMessage.classList.add('errorMsg');
        document.getElementById('commentInputContainer').insertBefore(errorMessage, commentInput);
        hasError = true;
    }
    const newCommentHeader = document.createElement('h4');
    if (hasError) {
        return
    } else {
        hasError = false;
        const newComment = {
        userId: `${userName}`,
        commentToken: (Math.random()*100000000),
        commentDate: `${today}`,
        commentText: `${commentText}`
        }
        comments.push(newComment);
        loadComments();
        removeErrorMsg();
        formReset();
    }

}

function loadComments(){
    const commentSection = document.getElementById('commentSection');
    while (commentSection.firstChild){
        commentSection.removeChild(commentSection.firstChild);
    }

    for(let i = 0; i < comments.length; ++i) {
        const commentTemplate = document.getElementById('commentTemplate');
        const clone = commentTemplate.cloneNode(true);
        const newComment = document.createElement('div');
        newComment.innerHTML = clone.innerHTML;

        const commentUserName = newComment.getElementsByClassName('comment__id__heading');
        commentUserName[0].innerHTML = comments[i].userId;

        const commentDate = newComment.getElementsByClassName('comment__date');
        commentDate[0].innerHTML = comments[i].commentDate;

        const commentText = newComment.getElementsByClassName('comment__text');
        commentText[0].innerHTML = comments[i].commentText;

        commentSection.appendChild(newComment);
        
    }
}

window.addEventListener('load', (event) => {
    loadComments();
});