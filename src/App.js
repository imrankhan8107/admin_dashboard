import { createContext, useState } from "react";
import "./App.css";
import Members from "./pages/Members";

export const memberContext = createContext({
  members: [],
  setMembers: () => {},
  page: 1,
  setPage: () => {},
});

function App() {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  return (
    <div className="App">
      <memberContext.Provider
        value={{
          members: members,
          setMembers: setMembers,
          page: page,
          setPage: setPage,
        }}
      >
        <Members />
      </memberContext.Provider>
    </div>
  );
}

export default App;
