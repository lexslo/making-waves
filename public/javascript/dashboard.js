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

    const parentEl = e.target.parentNode.parentNode;
    const secondChildEl = parentEl.querySelector('.card-divider');
    const thirdChildEl = parentEl.querySelector('.card-section');

    const btnsParent = e.target.parentNode.id;
    const btnsContainer = document.getElementById(btnsParent);

    // show save button and hide edit button
    btnsContainer.querySelector('#save-post').classList.remove('hide');
    btnsContainer.querySelector('#edit-post').classList.add('hide');

    // target the post title and the post content
    const prevPostTitle = secondChildEl.querySelector('#post-title');
    const prevPostContent = thirdChildEl.querySelector('#post-content');

    prevPostTitle.setAttribute('contenteditable', true);
    prevPostContent.setAttribute('contenteditable', true);

}

async function savePostHandler(e) {

    const post_id = e.target.parentNode.parentNode.id;
    const clickedPost = document.getElementById(post_id);

    const title = clickedPost.getElementById('post-title').textContent;
    const content = clickedPost.getElementById('post-content').textContent;

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

    // show edit button and hide save button
    document.getElementById('save-post').classList.add('hide');
    document.getElementById('edit-post').classList.remove('hide');
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

document.querySelector('#edit-post').addEventListener('click', editPostHandler);
document.querySelector('#del-post').addEventListener('click', deletePostHandler);
document.querySelector('#save-post').addEventListener('click', savePostHandler);
document.querySelector('#new-post').addEventListener('click', newPostHandler);
document.querySelector('.post-form').addEventListener('submit', postFormHandler);