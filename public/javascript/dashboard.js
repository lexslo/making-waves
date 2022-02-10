async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#form-post-title').value.trim();
    const content = document.querySelector('textarea[name="form-post-body"]').value.trim();

    if (content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }

    document.querySelector('.post-form').classList.add('hide');
    document.querySelector('#new-post').classList.remove('hide');
}

async function editPostHandler(e) {
    // css rule that adds a border around the elements that can be edited

    // target the corresponding parent and child elements
    const parentEl = e.target.parentNode.parentNode;
    const secondChildEl = parentEl.querySelector('.card-divider');
    const thirdChildEl = parentEl.querySelector('.card-section');

    const btnsParent = e.target.parentNode.id;
    const btnsContainer = document.getElementById(btnsParent);

    // show save button and hide edit button
    btnsContainer.querySelector('#save-post').classList.remove('hide');
    btnsContainer.querySelector('#edit-post').classList.add('hide');
    // add class edit-border when edit is clicked, remove when save is clicked

    // target the post title and the post content
    const prevPostTitle = secondChildEl.querySelector('#post-title');
    const prevPostContent = thirdChildEl.querySelector('#post-content');

    // allow user to edit the elements
    prevPostTitle.setAttribute('contenteditable', true);
    prevPostContent.setAttribute('contenteditable', true);

}

async function savePostHandler(e) {

    const post_id = e.target.parentNode.parentNode.id;

    const parentEl = e.target.parentNode.parentNode;
    const secondChildEl = parentEl.querySelector('.card-divider');
    const thirdChildEl = parentEl.querySelector('.card-section');

    const title = secondChildEl.querySelector('#post-title').textContent;
    const content = thirdChildEl.querySelector('#post-content').textContent;

    const response = await fetch('/api/posts/' + post_id, {
        method: 'put',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

    const btnsParent = e.target.parentNode.id;
    const btnsContainer = document.getElementById(btnsParent);

    // show save button and hide edit button
    btnsContainer.querySelector('#save-post').classList.add('hide');
    btnsContainer.querySelector('#edit-post').classList.remove('hide');
}

async function deletePostHandler(e) {
    const post_id = e.target.parentNode.parentNode.id;

    const response = await fetch('/api/posts/' + post_id, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

async function newPostHandler() {
    document.querySelector('.post-form').classList.remove('hide');
    document.querySelector('#new-post').classList.add('hide');
}

// target edit, save, delete buttons on each  post and trigger associated functions
document.addEventListener("click", function(event) {

    switch (event.target.id) {
        case 'edit-post':
            console.log('edit post btn clicked');
            editPostHandler(event);
            break;
        case 'save-post':
            console.log('save post btn clicked');
            savePostHandler(event);
            break;
        case 'del-post':
            console.log('del post btn clicked');
            deletePostHandler(event);
            break;
    }
});

document.querySelector('#new-post').addEventListener('click', newPostHandler);
document.querySelector('.post-form').addEventListener('submit', postFormHandler);