import EnterJotForm from "../components/EnterJotForm";
import { API } from "../services/api";


export default function CreatePage() {
  const createJot = (jotText: string) => {
    API.createJot(jotText);
  }

  return <div>
    <EnterJotForm
      onCreateJot={jot => createJot(jot)}
    />
  </div>
};
