import { IJot } from "../models/jot";

interface IProps {
  jot: IJot;
  onClick: () => void;
}

export function JotView(props: IProps) {
  const { jot } = props;

  return (
    <div className="card" >
      <p onClick={props.onClick}>
        {jot.text}
      </p>
    </div>
  )
}