* {
    margin: 0;
    padding: 0;
    box- sizing: border - box;
}

body{
    font - family: Arial, sans - serif;
    background: #f4f4f4;
}

.container{
    width: 90 %;
    margin: 30px auto;
}

h1{
    text - align: center;
    margin - bottom: 20px;
}

#addBtn{
    padding: 10px 15px;
    background: green;
    color: white;
    border: none;
    cursor: pointer;
    margin - bottom: 15px;
}

table{
    width: 100 %;
    border - collapse: collapse;
    background: white;
}

th, td{
    border: 1px solid #ddd;
    padding: 10px;
    text - align: center;
}

th{
    background:#333;
    color: white;
}

.edit - btn{
    background: orange;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.delete -btn{
    background: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.stats{
    margin: 15px 0;
    font - weight: bold;
}

#message{
    margin: 10px 0;
    color: green;
}

.modal{
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    justify - content: center;
    align - items: center;
}

.modal - content{
    background: white;
    width: 400px;
    padding: 20px;
    border - radius: 10px;
}

.modal - content form{
    display: flex;
    flex - direction: column;
    gap: 10px;
}

.modal - content input{
    padding: 10px;
}

.buttons{
    display: flex;
    justify - content: space - between;
}