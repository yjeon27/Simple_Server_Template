window.onload=function(){
    const url = "http://35.153.175.88:8080/items/";
    const addForm = document.getElementById("addItemForm"),
        updateForm = document.getElementById("updateForm"),
        addTitle = document.getElementById("titleInput"),
        addType = document.getElementById("type"),
        addDue = document.getElementById("due"),
        addQty = document.getElementById("quantity"),
        getDB = document.getElementById("getDB"),
        updateID = this.document.getElementById("updateID"),
        updateTitle = this.document.getElementById("updateTitle"),
        updateType = this.document.getElementById("updateType"),
        updateDue = this.document.getElementById("updateDue"),
        updateQty = this.document.getElementById("updateQty");
    getDB.setAttribute("value", "getDB");


    getDB.addEventListener("click", function(){
        // debugger;
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



            // for(let i=0; i<obj.length; i++){
            //     // debugger;
            //     const li = document.createElement("li");
            //     li.setAttribute("id", "li"+i);
            //     const itemsList = document.getElementById("itemsList");

            //     const tempNode = document.createTextNode(JSON.stringify(obj[i]));
            //     li.appendChild(tempNode);

            //     let flag=1;
            //     for(let j=0; j<itemsList.childElementCount; j++){
            //         if(JSON.parse(document.getElementById("li"+j).innerHTML).name==obj[i].name){
            //             console.log('ALRDY EXISTS');
            //             flag=0;
            //             break;
            //         }else{
            //             console.log('nope');
            //         }
            //     }
                
            //     if(flag){
            //         itemsList.appendChild(li);
            //     }
            // }
        }
        http.send();
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