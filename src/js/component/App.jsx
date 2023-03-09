import React, { useEffect, useState } from "react";
import ItemsList from "./ItemsList.jsx";


function App() {
    const [inputText, setInputText] = useState("");  //String vacío que contiene el texto del campo de entrada de la app.
    const [items, setItems] = useState([]);          //Array vacío que contendrá los elementos de la lista de tareas.
    const [erase, setErase] = useState();

    useEffect(() => {
        if (erase) {
            let newArray = items.filter((element) => element.id != erase);
            setItems(newArray);
        }
    }, [erase]);


    useEffect(() => {
        if(!items.length) return
        fetch("https://assets.breatheco.de/apis/fake/todos/user/sandra", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items)
        })
            .then((resp) => {
                return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
            })
            .catch(() => {
                console.log("Muy mal");
            }
            )
    }, [items])

useEffect(() =>{
    fetch("https://assets.breatheco.de/apis/fake/todos/user/sandra")
    .then(res => res.json())
    .then(res => setItems(res))
} ,[]);




    // fetch('https://assets.breatheco.de/apis/fake/todos/user/sandra', {
    //     method: "POST",
    //     body: JSON.stringify([]),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //   .then(resp => {
    //       console.log("Ha funcionado!!!");
    //   })
    //   .catch(error => {
    //       //manejo de errores
    //       console.log("ERROR");
    //   });



    const updateText = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();                         //Compruebo si inputText está vacío o no y si no lo está, 
        if (inputText.trim() == "") return;
        const newItem = {
            text: `${inputText}`,
            label: "Add a Tarea",
            done: false, 
            id: (Math.random()*20).toFixed(1)
        }

        setItems([...items, newItem]);
        setInputText("");
        console.log(items);

    };


    return (
        <div className="app">
            <header className="app-header">
                <h1>To Do List</h1>
                <form onSubmit={handleSubmit}>
                    <input className="app-input" onChange={updateText} value={inputText} placeholder="I Need To..." />
                    <button className="app-submit" title="Add task"><i className="fas fa-plus"></i></button>
                </form>
                <ItemsList listaDeTareas={items} onDelete={setErase} />
                <button className="btn btn-danger"> DELETE ALL TASKS </button>
                <footer className="app-foot">
                    <p>Made with ❤️ by Sandra </p>
                </footer>
            </header>
        </div>
    );
}



export default App;