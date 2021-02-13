import { useState } from "react";
import { useHistory } from "react-router-dom";
import StorageService from "../services/storage";

export default function LoginPage() {
  const history = useHistory();
  const [password, setPassword] = useState<string>("");

  const submitPassword = async (password: string) => {
    if (!password) {
      alert("Enter Password");
      return;
    }
    StorageService.setPassword(password);
    history.push("/");
    return;
  }

  return <div className="centerContainer">
    <div className="card centerCard">
      <h3> Enter Password </h3>
      <input type="text" value={password} onChange={e => setPassword(e.target.value)} /> <br />
      <button onClick={() => submitPassword(password)} > Submit </button>
    </div>
  </div>
};
