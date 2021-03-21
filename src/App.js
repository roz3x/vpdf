import "./styles.css";
import { useState } from "react";
export default function App() {
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [rollNumber, setRollNumber] = useState(0);
  const [selected, setSelected] = useState(false);
  const [print, setPrint] = useState(false);
  return (
    <div className="App">
      <div> Date: {Date()} </div>
      {!print ? (
        <>
          <div> add the header for the paper</div>
          <label> name </label>{" "}
          <div
            style={{
              maxWidth: "30ch",
              display: "flex",
              flexDirection: "column",
              gap: "1ch"
            }}
          >
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label> roll number </label>
            <input
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
            <label> subject </label>{" "}
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <input
              onChange={(e) => {
                let f = [];
                for (let src of e.target.files) {
                  f.push(URL.createObjectURL(src));
                }
                setFiles(f);
                setSelected(true);
              }}
              accept="image/x-png,image/gif,image/jpeg"
              alt="yo"
              type="file"
              multiple
            />
          </div>
        </>
      ) : (
        <>
          <div> name : {name}</div>
          <div> roll number : {rollNumber} </div>
        </>
      )}

      {selected && (
        <>
          {files.map((e, idx) => {
            return (
              <img style={{ width: "100%" }} src={e} key={idx} alt={idx} />
            );
          })}
          {!print && (
            <button
              onClick={() => {
                setPrint(true);
                document.title = `${name} ${rollNumber} ${subject}`;
                setTimeout(() => {
                  window.print();
                }, 2000);
              }}
            >
              print
            </button>
          )}
        </>
      )}
    </div>
  );
}
