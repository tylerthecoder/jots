import { useHistory } from "react-router-dom";
import EnterPasswordForm from "../components/EnterPasswordForm";
import StorageService from "../services/storage";

export default function LoginPage() {
  const history = useHistory();

  const submitPassword = async (password: string) => {
    if (!password) {
      alert("Enter Password");
      return;
    }
    StorageService.setPassword(password);
    history.push("/");
    return;
  }

  return <EnterPasswordForm
    onPassword={submitPassword}
  />
};
