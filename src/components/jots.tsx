import { IJot } from "../models/jot";
import { JotView } from "./jot";

interface IProps {
  jots: IJot[];
  textFilter: string;
  tagFilter: string;
  onJotClicked: (jot: IJot) => void;
}

export default function JotsView(props: IProps) {
  const { tagFilter, textFilter, onJotClicked } = props;

  const jots = props.jots
    .filter(jot => {
      if (!jot.text.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase())) return false;
      if (tagFilter === "all") return true;
      if (!jot.tags) return false;
      return jot.tags.some(tag => tag.text.toLocaleLowerCase() === tagFilter.toLocaleLowerCase());
    });


  return <div>
    {
      jots.map(jot => <JotView jot={jot} onClick={() => onJotClicked(jot)} />)
    }
  </div>

}