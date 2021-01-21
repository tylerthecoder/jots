import { Jot } from "../models/jot";
import { JotView } from "./jot";

interface IProps {
  jots: Jot[];
  textFilter: string;
  tagFilter: string;
  onJotClicked: (jot: Jot) => void;
}

export default function JotsView(props: IProps) {
  const { tagFilter, textFilter, onJotClicked } = props;

  const jots = props.jots
    .filter(jot => {
      if (!jot.data.includes(textFilter)) return false;
      if (tagFilter === "all") return true;

      return jot.tag === tagFilter;
    });


  return <div>
    {
      jots.map(jot => <JotView jot={jot} onClick={() => onJotClicked(jot)} />)
    }
  </div>

}