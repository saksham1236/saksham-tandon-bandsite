let comments:Array<object> = [];
const commentSection = document.getElementById('commentSection');
const commentForm = document.getElementById('commentForm');
const apiKey = 'b3e54ac2-9fdd-4d52-9d94-9ee20d522a69';
const apiUrl = 'https://project-1-api.herokuapp.com/';
const apiRoute = 'comments'
const config = {
    headers:{
        "Content-Type": "application/json"
    }
}

function getComments{
    axios.get(`${apiUrl}${apiRoute}/?api_key=${apiKey}`)
.then((response:object) =>{
    console.log(response.data);
    comments = [...response.data];
    comments.sort((a, b) => b.timestamp - a.timestamp);
    loadComments();
})
.catch((error:object) => {
    console.log(error);
});}

getComments();

function postComment(name:string, text:string){
    const commentPost = {
        "name": name,
        "comment": text
    }
    axios.post(`${apiUrl}${apiRoute}/?api_key=${apiKey}`, commentPost, config)
    .then((response) => {
    console.log(response);
    getComments();
}).catch((error:object) => {
    console.log(error);
})
}

commentForm.addEventListener('submit', commentResponseHandler);

let hasNum = /\d/;

function removeErrorMsg():void {
    const errorMsg = document.getElementsByClassName('errorMsg');
    for(let i = 0; i < errorMsg.length; ++i) {
        errorMsg[i].remove();
    }
}

function formReset() {
    document.getElementById("commentForm").reset();
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
        postComment(`${userName}`, `${commentText}`);

        //No longer need to create comments locally
        // const newComment = {
        // userId: `${userName}`,
        // commentToken: (Math.random()*100000000),
        // commentDate: `${today}`,
        // commentText: `${commentText}`
        // }
        removeErrorMsg();
        formReset();
    }

}

function loadComments(){
    while (commentSection.firstChild){
        commentSection.removeChild(commentSection.firstChild);
    }

    for(let i = 0; i < comments.length; ++i) {
        const commentTemplate = document.getElementById('commentTemplate');
        const clone = commentTemplate.cloneNode(true);
        const newComment = document.createElement('div');
        newComment.innerHTML = clone.innerHTML;

        
        newComment.classList.add('comment__container')

        const commentUserName = newComment.getElementsByClassName('comment__id__heading');
        commentUserName[0].innerText = comments[i].name;

        const commentDate = newComment.getElementsByClassName('comment__date');
        const formatedDate = new Intl.DateTimeFormat("en-US").format(comments[i].timestamp);
        commentDate[0].innerText = formatedDate;

        const commentText = newComment.getElementsByClassName('comment__text');
        commentText[0].innerText = comments[i].comment;

        const commentLikes = newComment.getElementsByClassName('comment__id__likes__inner');
        commentLikes[0].innerText = `${comments[i].likes} Likes •`;

        const commentDeleteBtn = newComment.getElementsByClassName('delete');
        commentDeleteBtn[0].setAttribute("data", `${comments[i].id}`);
        commentDeleteBtn[1].setAttribute("data", `${comments[i].id}`);

        const commentLikeBtn = newComment.getElementsByClassName('like');
        commentLikeBtn[0].setAttribute("data", `${comments[i].id}`);
        commentLikeBtn[1].setAttribute("data", `${comments[i].id}`);

        commentSection.appendChild(newComment);
    }
    
    addEventdel();
    addEventLike();
    
}
const delBtnEl = document.getElementsByClassName('delete');
console.log(delBtnEl);
function addEventdel(){
    for(let i = 0; i < delBtnEl.length; ++i){
        delBtnEl[i].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(e);
            const del = e.target;
            const commentId = del.getAttribute('data');
            console.log(commentId);
            deleteComment(commentId);
        });
    }
}

function deleteComment(commentId) {
    axios
    .delete(`${apiUrl}${apiRoute}/${commentId}/?api_key=${apiKey}`)
    .then((response) => {
        console.log(response);
        getComments();
    }).catch((error) => {
        console.log(error);
    });
}

const likeBtnEl = document.getElementsByClassName('like');
function addEventLike(){
    for(let i = 0; i < likeBtnEl.length; ++i){
        likeBtnEl[i].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(e);
            const like = e.target;
            const commentId = like.getAttribute('data');
            console.log(commentId);
            likeComment(commentId);
        });
    }
}

function likeComment(commentId) {
    axios
    .put(`${apiUrl}${apiRoute}/${commentId}/like/?api_key=${apiKey}`)
    .then((response) => {
        getComments();
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}
