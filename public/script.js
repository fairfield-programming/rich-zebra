fetch("/api/blockchain").then(data => data.json()).then((data) => {

    data.forEach(element => {

        createBlockUI(element, document.getElementById('parent'));

    });

})

function addBlockFromUI() {

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    addBlock(title, description);

}

function addBlock(title, description) {

    let jsonBody = JSON.stringify({
        title,
        description
    });

    fetch(`/api/block/add`, {
        method: 'POST',
        body: jsonBody,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json()).then((data) => {

        console.log(data);

        window.location.href = "/";

    })

}

function createBlockUI(data, parent) {

    const container = document.createElement('article')
    const buttons = document.createElement('div')
    const button = document.createElement('button')

    button.onclick = () => {

        fetch('/api/block/' + data.id + '/delete').then(res => res.json()).then((data) => {

            console.log(data);

            window.location.href = "/";

        })

    }

    const title = document.createElement('h2');

    const dataHeader = document.createElement('h3');
    const hashHeader = document.createElement('h3');

    const description = document.createElement('p');
    const hashUI = document.createElement('p');
    const prevUI = document.createElement('p');

    dataHeader.innerHTML = "Block Data:"
    hashHeader.innerHTML = "Hash Data:"

    hashUI.innerHTML = "Block_Hash: " + data.hash;
    prevUI.innerHTML = "Previous_Hash: " + data.prev;

    description.innerHTML = data.data.description || "some lameo didnt give this a description";
    title.innerHTML = data.data.title || "untitled block";
    buttons.className = "buttons";
    button.innerHTML = "X";

    container.append(buttons);
    buttons.append(button);
    container.append(title);

    container.append(description);
    container.append(hashUI);
    container.append(prevUI);

    parent.append(container);

}