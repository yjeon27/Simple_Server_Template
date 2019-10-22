window.onload=function(){
    const http = new this.XMLHttpRequest(),
        url = "http://34.201.141.150:8080/items/";
    const addTitle = document.getElementById("titleInput"),
        addType = document.getElementById("type"),
        addDue = document.getElementById("due"),
        addQty = document.getElementById("quantity"),
        submitBtn = document.getElementById("addItem");

    http.open("GET", url+"getAll", true);
    http.send();

    http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            console.log(http.responseText);
        }
    }
    
        
    submitBtn.addEventListener("submit", function(e){
        if(e){
            console.log(e);
        }

        
    })
}