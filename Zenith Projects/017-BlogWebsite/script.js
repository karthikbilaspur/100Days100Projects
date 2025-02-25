const blogPosts = document.querySelectorAll('#blog li');
const commentForms = document.querySelectorAll('#blog form');

commentForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value;
        const comment = form.querySelector('textarea[name="comment"]').value;
        const commentsList = form.parentNode.querySelector('.comments ul');
        const newComment = document.createElement('li');
        newComment.textContent = `${name}: ${comment}`;
        commentsList.appendChild(newComment);
    });
});