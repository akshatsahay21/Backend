import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [ notes, setNotes ] = useState([])
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  console.log("Hello Integration")

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
    .then(res =>{
      setNotes(res.data.notes)
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    const {title, description} = e.target.elements
    console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res => {
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then(res => {
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleUpdateNote(noteId){
    axios.patch("http://localhost:3000/api/notes/"+noteId,{
      description: editText
    })
    .then(res => {
      fetchNotes()
      setEditId(null)
      setEditText("")
    })
  }

  return (
    <>

    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type='text' placeholder='Enter title' />
      <input name='description' type='text' placeholder='Enter description' />
      <button>Create note</button>

    </form>
      <div className="notes">
  {
    notes.map(note => {

      if(editId === note._id){
        return (
          <div className="note" key={note._id}>

            <h1>{note.title}</h1>

            <input
              value={editText}
              onChange={(e)=>setEditText(e.target.value)}
            />

            <button onClick={()=>handleUpdateNote(note._id)}>
              save
            </button>

          </div>
        )
      }

      return (
        <div className="note" key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>

          <div className="note-buttons">
  <button onClick={()=>handleDeleteNote(note._id)}>
    delete
  </button>

  <button onClick={()=>{
    setEditId(note._id)
    setEditText(note.description)
  }}>
    update
  </button>
</div>

        </div>
      )

    })
  }
      </div>
    </>
  )
}

export default App