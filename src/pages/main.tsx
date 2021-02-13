import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import CrazyLoader from "../components/CrazyLoader";
import JotsView from "../components/jots"
import TagsPanel from "../components/TagsPanel";
import usePassword from "../hooks/usePassword";
import { IJot } from "../models/jot";
import { API } from "../services/api";

// show all of the jots
export function MainPage() {
  usePassword();


  const [jots, setJots] = useState<IJot[] | null>();
  const history = useHistory();

  useEffect(() => {
    if (jots) return;
    API
      .getJots()
      .then(apiJots => {
        console.log(apiJots);
        setJots(apiJots);
      })
      .catch(err => {
        alert(err);
      })
  });

  const [filter, setFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("all");

  const goToCreatePage = () => {
    history.push("/create");
  }

  const onJotClicked = (jot: IJot) => {
    console.log(jot);
    history.push(`/j/${jot._id}`, { jot });
  }

  if (!jots) {
    return <CrazyLoader />
  }

  return (
    <div>
      <div id="mainPage">
        <div id="leftBar">
          <input value={filter} onChange={e => setFilter(e.target.value)} />
          <TagsPanel jots={jots} onTagSelected={tag => setTagFilter(tag)} />
        </div>
        <JotsView onJotClicked={onJotClicked} jots={jots} textFilter={filter} tagFilter={tagFilter} />
      </div>
      <button className="floatingBtn" onClick={goToCreatePage}>+</button>
    </div>
  )
}