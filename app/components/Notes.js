import { useEffect } from "react";
import axios from "axios";
import NavBar from "./navbar";

export default function Notes(props) {
  const {
    setNotes,
    editId,
    input,
    important,
    showAll,
    setShowAlltoggle,
    inputhandle,
    submithandle,
    removehandle,
    edithandle,
    handlecheck,
    handleShowAll,
  } = props;

  
  useEffect(() => {
    axios.get("http://localhost:4000/notes").then((response) => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <br />
      <button className="btn bg-blue-300" onClick={() => setShowAlltoggle(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <br />
      <h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Note ID</th>
                <th>Note</th>
                <th>Important</th>
                <th>Actions</th>
              </tr>
            </thead>

            {handleShowAll.map((note) => {
              return (
                <tbody>
                  <tr>
                    <th>{note.id} </th>
                    <td>{note.content}</td>
                    <td>{note.important ? "True" : "False"}</td>
                    <td>
                      <button onClick={() => removehandle(note.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </h2>

     
      <button className="btn bg-green-500" onClick={() => window.my_modal_3.showModal()}>
        Add Note
      </button>
      <dialog id="my_modal_3" className="modal">
        <form onSubmit={submithandle} method="dialog" className="modal-box">
          {/* <button
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button> */}
          <h3 className="font-bold text-lg">Add Notes</h3>
          <p className="py-4">
            <input
              type="text"
              value={input}
              onChange={inputhandle}
              placeholder="Enter note"
              required
            />
            <label>
              important
              <input
                type="checkbox"
                checked={important}
                onChange={handlecheck}
              />
            </label>
          </p>
          <div className="modal-action">
            <button type="submit" className="btn">
              {editId === null ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </dialog>

      {/* <form onSubmit={submithandle}>
        <input
          type="text"
          value={input}
          onChange={inputhandle}
          placeholder="Enter note"
          required
        />{" "}
        <label>
          important
          <input type="checkbox" checked={important} onChange={handlecheck} />
          <button type="submit">{editId === null ? "Add" : "Update"}</button>
        </label>
      </form> */}
    </div>
  );
}
