import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error connecting to server:", error);
      });
  }, []);

  return (
    <div>
      <h1>SOPE</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;