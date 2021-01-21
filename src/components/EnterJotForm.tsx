import { useState } from "react"


interface IProps {
  onCreateJot: (jotText: string) => void;
}

export default function EnterJotForm(props: IProps) {
  const { onCreateJot } = props;
  const [jotText, setJotText] = useState<string>("");

  const submitJot = () => {
    onCreateJot(jotText);
  }

  return (
    <div>
      <textarea
        value={jotText}
        onChange={e => setJotText(e.target.value)}
      />
      {/* <br /> */}
      <button onClick={submitJot}> Submit Jot </button>
    </div>
  )
}