import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import CrazyLoader from "../components/CrazyLoader";
import JotsView from "../components/jots"
import TagsPanel from "../components/TagsPanel";
import usePassword from "../hooks/usePassword";
import { Jot } from "../models/jot";
import { API } from "../services/api";

// show all of the jots
export function MainPage() {
  usePassword();


  const [jots, setJots] = useState<Jot[] | null>();
  const history = useHistory();

  useEffect(() => {
    API
      .getJots()
      .then(apiJots => {
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

  const onJotClicked = (jot: Jot) => {
    console.log(jot);
    history.push(`/j/${jot._id}`, { jot });
  }

  if (!jots) {
    return <CrazyLoader />
  }

  return (
    <div>
      <div style={{ display: "flex" }} >
        <div>
          <input value={filter} onChange={e => setFilter(e.target.value)} />
          <TagsPanel jots={jots} onTagSelected={tag => setTagFilter(tag)} />
        </div>
        <JotsView onJotClicked={onJotClicked} jots={jots} textFilter={filter} tagFilter={tagFilter} />
      </div>
      <button className="floatingBtn" onClick={goToCreatePage}>+</button>
    </div>
  )
}