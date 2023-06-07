export default function Notes(props) {
    // const {
    //   notes,
    //   input,
    //   important,
    //   showAll,
    //   setShowAlltoggle,
    //   inputhandle,
    //   submithandle,
    //   removehandle,
    //   handlecheck,
    //   handleShowAll,
    // } = props;
  
    return (
      <div>
        <button onClick = { () => setShowAlltoggle(!showAll)} > show {showAll ? "important": "all"} </button> 
        <h2>
          {handleShowAll.map((note) => {
            return (
              <p key={note.id}>
                <h2>Note {note.id}  <button onClick={() => removehandle(note.id)}> Delete </button></h2>
                <h6>
                  {note.content} {note.important ? "!!!" : ""}{" "}
                </h6>
              </p>
            );
          })}
        </h2>
        <form onSubmit={submithandle}>
          <input
            type="text"
            value={input}
            onChange={inputhandle}
            placeholder="Enter note"
            required
          />{" "}
          <button type="submit">Add </button>{" "}
          <label>
            important
            <input type="checkbox" checked={important} onChange={handlecheck} />
          </label>
        </form>
      </div>
    );
  }
  