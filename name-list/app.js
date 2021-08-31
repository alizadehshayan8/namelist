//reprasents information
class information {
    constructor(name, lastname, code) {
        this.name = name;
        this.lastname = lastname;
        this.code = code;
    }
}


// ui claasses handealing

class UI {
    static displayInformation() {
        const names = store.getnames();

        names.forEach((data) => {
            UI.addNameToTist(data)
        });
    }

    static addNameToTist(data) {
        const list = document.querySelector("#information-list");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.lastname}</td>
        <td>${data.code}</td>
        <td><a href="#" class=" btn btn-danger delete btn-sm w-100 " title="remove">X</td>`;


        list.appendChild(row);


    }


    static clearfields() {
        document.querySelector("#name").value = "";
        document.querySelector("#lastname").value = "";
        document.querySelector("#code").value = "";
    }


    static deletename(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    static showalert(message, classname) {
        const div = document.createElement("div");
        div.className = `alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#name-form");
        container.insertBefore(div, form);

        //diaper after 3seconds
        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 3000);
    }
}

//storage handeling
class store {
    static getnames() {
        let names;
        if (localStorage.getItem("names") === null) {
            names = [];
        } else {
            names = JSON.parse(localStorage.getItem('names'));
        }
        return names;
    }

    static addnames(data) {

        const names = store.getnames();
        names.push(data);
        localStorage.setItem("names", JSON.stringify(names));
    }


    static removename(code) {

        const names = store.getnames();
        names.forEach((data, index) => {
            if (data.code === code) {

                names.splice(index, 1);

            }
        })
        localStorage.setItem("names", JSON.stringify(names));
    }


    // static removename(code) {
    //     localStorage.removeItem('code')

    // }
}





//dispaly information

document.addEventListener("DOMContentLoaded", UI.displayInformation);


// add a information
document.querySelector("#name-form").addEventListener("submit", (e) => {

    e.preventDefault();

    //get form value

    const name = document.querySelector("#name").value;
    const lastname = document.querySelector("#lastname").value;
    const code = document.querySelector("#code").value;


    // valideteaon

    if (name === "" || lastname === "" || code === "") {
        UI.showalert("fill out the form completely", "info")
    } else {

        //enter names

        const data = new information(name, lastname, code);

        //add nemes ti ui

        UI.addNameToTist(data);

         //SHOW SUCCES MESSAGE

         UI.showalert("Aded Successfully", "success");


        //clear filds
        UI.clearfields();


        store.addnames(data);
    }



})

//rmeove a book

document.querySelector("#information-list").addEventListener("click", (e) => {
    //remove from ui
    UI.deletename(e.target);

    store.removename(e.target.parentElement.previousElementSibling.textContent);
     //SHOW SUCCES MESSAGE

     UI.showalert("Removed Successfully", "danger")
})