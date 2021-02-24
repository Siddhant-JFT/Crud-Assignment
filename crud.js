fetched = false
data = []

const load = async () => {
    let result = await fetch('https://jsonplaceholder.typicode.com/users')
    let json = await result.json()
    json.forEach(item => {
        data.push(item)
    })
    fetched = true
}


const toAdd = async () => {
    if (!fetched) {
        await load();
    }
    // console.log(data)
    document.getElementById('test1').innerHTML = ""
    let rowTag = document.createElement('div')
    rowTag.classList.add('row')

    const iHead = createHeader('col-md-1', 'ID')
    const nHead = createHeader('col-md-3', 'Name')
    const uHead = createHeader('col-md-3', 'Username')
    const wHead = createHeader('col-md-5', 'Website')

    iHead.classList.add('d-none', 'd-md-block')
    nHead.classList.add('d-none', 'd-md-block')
    uHead.classList.add('d-none', 'd-md-block')
    wHead.classList.add('d-none', 'd-md-block')

    rowTag.appendChild(iHead)
    rowTag.appendChild(nHead)
    rowTag.appendChild(uHead)
    rowTag.appendChild(wHead)
    counter = 0
    data.forEach((user) => {
        counter++;
        let idDisplay = createData('col-md-1', user.id)
        let nameDisplay = createData('col-md-3', user.name)
        let unameDisplay = createData('col-md-3', user.username)
        let websDisplay = createData('col-md-3', user.website)


        let editBtn = document.createElement('button')
        editBtn.classList.add('btn', 'btn-primary', 'col-md-1')
        editBtn.addEventListener("click", function () {
            ToEdit(user.id);
        });
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#EditModal");
        editBtn.innerText = "Edit"

        // let editBtn = "<button class='btn btn-primary col-md-1' data-bs-toggle='modal' data-bs-target='#AddModal'>Edit</button>"
        // button type="button" class="mx-5 btn btn-primary" data-bs-toggle="modal" >
        // Add Data
        // </button >

        let delBtn = document.createElement('button');
        delBtn.classList.add('btn', 'btn-danger', 'col-md-1');
        delBtn.setAttribute("data-bs-toggle", "modal");
        delBtn.setAttribute("data-bs-target", "#DeleteModal");
        delBtn.addEventListener("click", function () {
            fordel(user.id);
        });
        delBtn.innerText = "Delete";

        rowTag.appendChild(idDisplay)
        rowTag.appendChild(nameDisplay)
        rowTag.appendChild(unameDisplay)
        rowTag.appendChild(websDisplay)
        rowTag.appendChild(editBtn)
        rowTag.appendChild(delBtn)
        rowTag.appendChild(document.createElement('hr'))
    })

    document.getElementById('test1').appendChild(rowTag);
    document.getElementById('count').innerHTML = counter;
    // counter++;
}

toAdd();
// console.log(data)

const createHeader = (className, text) => {
    const el = document.createElement('h5')
    el.classList.add(className)
    el.innerHTML = text
    return el
}

const createData = (className, text) => {
    const p = document.createElement('p')
    p.innerHTML = text
    p.classList.add(className)
    return p
}

function addData() {

    let id;

    let newObj = {
        id: (data.length > 0) ? (id = data[data.length - 1].id + 1) : (id = 1),
        name: document.getElementById("name").value,
        username: document.getElementById("uname").value,
        website: document.getElementById("webs").value
    }
    data.push(newObj)
    counter++;
    console.log(data)
    document.getElementById('test1').innerHTML = ''
    toAdd()
    document.getElementById("uname").value = ''
    document.getElementById("name").value = ''
    document.getElementById("webs").value = ''
}


let ind = 0;
function ToEdit(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            ind = i;
        }

    }
    fname = data[ind].name;
    urname = data[ind].username;
    webs = data[ind].website;

    document.getElementById("edname").value = data[ind].name;
    document.getElementById("eduname").value = data[ind].username;
    document.getElementById("edwebs").value = data[ind].website;
}
function editData() {
    data[ind].name = document.getElementById("edname").value;
    data[ind].username = document.getElementById("eduname").value;
    data[ind].website = document.getElementById("edwebs").value;
    toAdd();
}

function DeleteData() {

    id = document.getElementById('delitem').value;
    data = data.filter(d => d.id != id);
    --counter;

    toAdd();
}

function fordel(id) {
    document.getElementById('delitem').value = id;
}
