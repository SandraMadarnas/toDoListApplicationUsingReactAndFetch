import React, { useEffect, useState } from "react";
import ItemsList from "./ItemsList.jsx";


// // POST  // Creo mi BD y usuario
// fetch('https://assets.breatheco.de/apis/fake/todos/user/sandra', {
//     method: "POST",
//     body: JSON.stringify([{ "label": "Make the bed", "done": false },
//     { "label": "Walk the dog", "done": false }]),
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


function App() {
    const [inputText, setInputText] = useState("");  //String vacío que contiene el texto del campo de entrada de la app.
    const [items, setItems] = useState([]);          //Array vacío que contendrá los elementos de la lista de tareas.
    const [erase, setErase] = useState();
    const [userName, setUserName] = useState("");



    // GET  // Traigo info de la BD
    useEffect(() => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/sandra")
            .then(res => res.json())
            .then(res => setItems(res))
    }, []);


    // PUT  // Añado tareas a mi app y a la BD
    useEffect(() => {
        if (!items.length) return
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


    // DELETE TASK // Borro una tarea de mi app y de la BD
    useEffect(() => {
        if (erase) {
            let newArray = items.filter((element) => element.id != erase);
            setItems(newArray);
        }
    }, [erase]);


    // AÑADIR O CARGAR USER
    const handleOpenUser = () => {
        // Hacemos una petición GET a la API para obtener el usuario
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${userName}`)
            .then((res) => {
                // Si la respuesta no es exitosa (por ej, el usuario no existe), creamos el usuario
                if (!res.ok) {
                    return fetch(
                        `https://assets.breatheco.de/apis/fake/todos/user/${userName}`,
                        {
                            method: "POST",
                            body: JSON.stringify([]),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                }
                // Si la respuesta es exitosa, regresamos la respuesta original
                return res;
            })
            .then((res) => res.json())
            // Actualizamos el estado de los items con la lista de tareas del usuario obtenido
            .then((data) => setItems(data))
            .catch((err) => {
                console.log("ERROR");
            });
    };



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
            id: (Math.random() * 20).toFixed(1)
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
                <input className="app-input" placeholder="User..." />
                <button className="btn btn-danger" onClick={handleOpenUser}>Open/Load User</button>
                {/* <button className="btn btn-danger"> DELETE ALL TASKS </button> */}
                <footer className="app-foot">
                    <p>Made with ❤️ by Sandra </p>
                </footer>
            </header>
        </div>
    );
}



export default App;