window.onload=function(){
    const url = "http://35.153.175.88:8080/items/";
    const addForm = document.getElementById("addItemForm"),
        updateForm = document.getElementById("updateForm"),
        deleteForm = document.getElementById("deleteForm"),
        getForm = document.getElementById("getForm"),
        addTitle = document.getElementById("titleInput"),
        addType = document.getElementById("type"),
        addDue = document.getElementById("due"),
        addQty = document.getElementById("quantity"),
        getDB = document.getElementById("getDB"),
        updateID = this.document.getElementById("updateID"),
        deleteID = this.document.getElementById("deleteID"),
        getID = this.document.getElementById("getID"),
        updateTitle = this.document.getElementById("updateTitle"),
        updateType = this.document.getElementById("updateType"),
        updateDue = this.document.getElementById("updateDue"),
        updateQty = this.document.getElementById("updateQty");
    getDB.setAttribute("value", "getDB");


    getDB.addEventListener("click", function(){
        function intervalUpdate(){
            const http = new XMLHttpRequest();
            http.open("GET", url+"getAll", true);
            http.onload = function(){
                let obj = JSON.parse(http.responseText);
                const itemsList = document.getElementById("itemsList");
    
                while(itemsList.firstChild){
                    itemsList.removeChild(itemsList.firstChild);
                }
    
                for(let i=0; i<obj.length; i++){
                    const li = document.createElement("li");
                    li.setAttribute("id", "li"+i);
                    const tempNode = document.createTextNode(JSON.stringify(obj[i]));
                    li.appendChild(tempNode);
                    itemsList.appendChild(li);
                }
            }
            http.send();

            setTimeout(intervalUpdate, 5000);
        }
        // setInterval(intervalUpdate, 5000);
        intervalUpdate();
    });

    getForm.addEventListener("submit", function(e){
        const http = new XMLHttpRequest();
        e.preventDefault();

        http.open("GET", url+getID.value, true);
        http.onload = function(){
            // debugger
            let obj = JSON.parse(http.responseText);
            const itemsList = document.getElementById("itemsList");

            while(itemsList.firstChild){
                itemsList.removeChild(itemsList.firstChild);
            }
            const li = document.createElement("li");
            li.setAttribute("id", "li0");
            const tempNode = document.createTextNode(JSON.stringify(obj));
            li.appendChild(tempNode);
            itemsList.appendChild(li);
        };
        http.send();
    });

    deleteForm.addEventListener("submit", function(e){
        // debugger
        const http = new XMLHttpRequest();
        e.preventDefault();

        http.open("DELETE", url+deleteID.value+"/delete", true);
        http.onload = function(){
            console.log('DELETING: '+url+deleteID.value+"/delete");
        };
        http.send(deleteID.value);
    });

    updateForm.addEventListener("submit", function(e){
        const http = new XMLHttpRequest();
        e.preventDefault();

        let param = [];

        http.open("PUT", url+updateID.value+"/update", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        param = [encodeURIComponent("name")+"="+encodeURIComponent(updateTitle.value),
        encodeURIComponent("type")+"="+encodeURIComponent(updateType.options[updateType.selectedIndex].value),
        encodeURIComponent("due")+"="+encodeURIComponent(updateDue.value),
        encodeURIComponent("quantity")+"="+encodeURIComponent(updateQty.value)]
        console.log(param.join('&'));
        // debugger
        http.onload = function(){
            if(http.status==200 && http.readyState==4){
                param = [encodeURIComponent("name")+"="+encodeURIComponent(updateTitle.value),
                encodeURIComponent("type")+"="+encodeURIComponent(updateType.options[updateType.selectedIndex].value),
                encodeURIComponent("due")+"="+encodeURIComponent(updateDue.value),
                encodeURIComponent("quantity")+"="+encodeURIComponent(updateQty.value)]
                console.log(param.join('&'));
            }else{
                alert(http.status);
            }
        }
        http.send(param.join('&'));
    });

    addForm.addEventListener("submit", function(e){
        const http = new XMLHttpRequest();
        // debugger
        e.preventDefault();

        let param = [];

        http.open("POST", url+"create", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        param = [encodeURIComponent("name")+"="+encodeURIComponent(addTitle.value),
        encodeURIComponent("type")+"="+encodeURIComponent(addType.options[addType.selectedIndex].value),
        encodeURIComponent("due")+"="+encodeURIComponent(addDue.value),
        encodeURIComponent("quantity")+"="+encodeURIComponent(addQty.value)]
        console.log(param.join('&'));

        http.onload = function(){
            if(http.status==200 && http.readyState==4){
                param = [encodeURIComponent("name")+"="+encodeURIComponent(addTitle.value),
                encodeURIComponent("type")+"="+encodeURIComponent(addType.options[addType.selectedIndex].value),
                encodeURIComponent("due")+"="+encodeURIComponent(addDue.value),
                encodeURIComponent("quantity")+"="+encodeURIComponent(addQty.value)]
                console.log('Created new item: '+param.join('&'));
            }else{
                alert(http.status);
            }
        }
        http.send(param.join('&'));
    });


}