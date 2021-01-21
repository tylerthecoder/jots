import { useHistory } from "react-router-dom";
import StorageService from "../services/storage";


export default function usePassword() {
  const hasPassword = StorageService.hasPassword();
  const history = useHistory();

  if (!hasPassword) {
    history.push("/login");
  }
}