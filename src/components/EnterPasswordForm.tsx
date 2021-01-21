import { useState } from "react"

interface IProps {
  onPassword: (password: string) => void;
}

export default function EnterPasswordForm(props: IProps) {
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => props.onPassword(password)} > Submit </button>
    </div>
  )
}