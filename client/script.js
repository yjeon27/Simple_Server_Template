window.onload=function(){
    const http = new this.XMLHttpRequest(),
        url = "http://34.239.142.161:8080/items/";
    const addForm = document.getElementById("addItemForm"),
        addTitle = document.getElementById("titleInput"),
        addType = document.getElementById("type"),
        addDue = document.getElementById("due"),
        addQty = document.getElementById("quantity"),
        submitBtn = document.getElementById("addItem"),
        getDB = document.getElementById("getDB");
    getDB.setAttribute("value", "getDB");


    getDB.addEventListener("click", function(){
        http.open("GET", url+"getAll", true);
        http.onload = function(){
            let obj = JSON.parse(http.responseText);
            console.log(obj);
            console.log(obj.length);

            for(let i=0; i<obj.length; i++){
                // debugger;
                const li = document.createElement("li");
                li.setAttribute("id", "li"+i);
                const itemsList = document.getElementById("itemsList");

                const tempNode = document.createTextNode(JSON.stringify(obj[i]));
                li.appendChild(tempNode);

                let flag=1;
                for(let j=0; j<itemsList.childElementCount; j++){
                    if(JSON.parse(document.getElementById("li"+j).innerHTML).name==obj[i].name){
                        console.log('ALRDY EXISTS');
                        flag=0;
                        break;
                    }else{
                        console.log('nope');
                    }
                }
                
                if(flag){
                    itemsList.appendChild(li);
                }
            }
        }
        http.send();
    });

    addForm.addEventListener("submit", function(e){
        // debugger
        e.preventDefault();

        console.log('Title: '+addTitle.value);
        console.log('Type: '+addType.options[addType.selectedIndex].value);
        console.log('Due: '+addDue.value);
        console.log('Qty: '+addQty.value);

        let param = [];
        http.onload = function(){
            param = [encodeURIComponent("name")+"="+encodeURIComponent(addTitle.value),
                encodeURIComponent("type")+"="+encodeURIComponent(addType.options[addType.selectedIndex].value),
                encodeURIComponent("due")+"="+encodeURIComponent(addDue.value),
                encodeURIComponent("quantity")+"="+encodeURIComponent(addQty.value)]
            param.join('&');
            console.log(param);
        }

        http.open("POST", url+"create", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.send(param);
    });
}