"use client";
import { useState } from "react";
import Feedback from "./feedback";
import Counter from "./Counter";
import SimpleCounter from "./components/counter";
import Notes from "./components/Notes";
import axios from "axios";


export default function Home() {
  
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [important, setImportant] = useState(false);
  const [showAll, setShowAll] = useState(true); 
  const [editId, setEditId] = useState(null);

  const inputhandle = (event) => {
    setInput(event.target.value);
  };

  
  const baseUrl  = 'http://localhost:4000/notes';
  const submithandle = (event) => {
    event.preventDefault();
    if (editId === null) {
      setNotes([...notes, { id: Date.now(), content: input, important }]);
      axios.post(baseUrl, { content: input, important }).then((response) => {
        console.log(response.data);
        setNotes(response.data);
      });
    } else {
      const editedNote = notes.find((note) => note.id === editId);
      editedNote.content = input;
      editedNote.important = important;
      setNotes(notes.map((note) => (note.id !== editId ? note : editedNote)));
      setEditId(null);
      axios.put(baseUrl, editedNote).then((response) => {
        console.log(response.data);
        setNotes(response.data);
      },);
    }
    }

  const removehandle = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      // setNotes(notes.filter((note) => note.id !== id));
      axios.delete(`${baseUrl}/${id}`).then((response) => {
        setNotes(notes.filter((note) => note.id !== id));
      });
      
    }
  };

   const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setInput(noteToEdit.content);
    setImportant(noteToEdit.important);
    setEditId(id);

  }
  const setShowAlltoggle = () => {
    setShowAll(!showAll);
  };
  const handlecheck = (event) => {
    setImportant(event.target.checked);
  };
  
  const handleShowAll = showAll ? notes
  : notes.filter((note) => note.important === true);

  

  return (
    <div>
      {/* <SimpleCounter count={count} handleClick= {handleClick} />
      
      <SimpleCounter count={count} handleClick= {handleClick} /> */}
      <Notes
        notes={notes}
        setNotes={setNotes}
        input={input}
        important={important}
        showAll={showAll}
        editId = {editId}
        inputhandle={inputhandle}
        submithandle={submithandle}
        removehandle={removehandle}
        edithandle = {handleEdit}
        handlecheck={handlecheck} 
        setShowAlltoggle={setShowAlltoggle} 
        handleShowAll={handleShowAll}

      />
    </div>
  );
}




//-----------------------------------------PHONEBOOK----------------------------------------------------------------
// import { useState } from 'react';

// export default function Home() {
//   const [contacts, setContacts] = useState([]);
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [search, setSearch] = useState('');
//   const [editId, setEditId] = useState(null);

//   const handleAdd = (event) => {
//     event.preventDefault();
//     if(editId === null) {
//       setContacts([...contacts, { id: Date.now(), name, phoneNumber }]);
//     } else {
//       setContacts(contacts.map(contact => contact.id === editId ? {id: editId, name, phoneNumber} : contact));
//       setEditId(null);
//     }
//     setName('');
//     setPhoneNumber('');
//   }

//   const handleDelete = (id) => {
//     setContacts(contacts.filter(contact => contact.id !== id));
//   }

//   const handleEdit = (id) => {
//     const contactToEdit = contacts.find(contact => contact.id === id);
//     setName(contactToEdit.name);
//     setPhoneNumber(contactToEdit.phoneNumber);
//     setEditId(id);
//   }

//   const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div>
//       <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
//       <form onSubmit={handleAdd}>
//         <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//         < br />
//         <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
//         < br />
//         <button type="submit">{editId === null ? 'Add' : 'Update'}</button>
//       </form>
      
//       <table>
        
//         <tbody>
//           {filteredContacts.map(contact => (
//             <tr key={contact.id}>
//               <h2>{contact.name} {contact.phoneNumber}</h2>
//               <td>
//                 <button onClick={() => handleEdit(contact.id)}>Update</button>
//                 {' '}
//                 <button onClick={() => handleDelete(contact.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

