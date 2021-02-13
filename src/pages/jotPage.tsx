import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ILocationState } from "../App";
import CrazyLoader from "../components/CrazyLoader";
import usePassword from "../hooks/usePassword";
import { IJot } from "../models/jot";
import { API } from "../services/api";


interface ILocationParams {
  jid: string
}

export default function JotPage() {
  usePassword();

  const { jid } = useParams<ILocationParams>();
  const location = useLocation<ILocationState>();
  const [jot, setJot] = useState<IJot | null>(location.state?.jot ?? null);

  // now clear the jot from the location state (so reloading page refetchs the data)
  if (location.state?.jot) {
    window.history.replaceState({}, '');
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingTag, setIsEditingTag] = useState<boolean>();
  const [editingTagText, setEditingTagText] = useState<string>("");

  function showTagForm() {
    setIsEditingTag(true);
  }


  useEffect(() => {
    if (jot) return;
    console.log("Fetching jot");

    API.getJot(jid).then(setJot);

    return () => { };
  }, [jot, jid]);

  if (!jot) {
    return <CrazyLoader />
  }

  const addTag = async () => {
    await API.addTag(jot._id, editingTagText);
    setEditingTagText("");
    setIsEditingTag(false);
    setJot(oldJot => {
      if (!oldJot) return oldJot;
      const newTags = oldJot.tags.concat({
        text: editingTagText,
        time: Date.now(),
      });
      return {
        ...oldJot,
        tags: newTags,
      }
    });
  }

  const removeTag = async (tag: string) => {
    await API.removeTag(jot._id, tag);
    setJot(oldJot => {
      if (!oldJot) return oldJot;
      const newTags = oldJot.tags.filter(t => t.text !== tag);
      return {
        ...oldJot,
        tags: newTags,
      }
    });
  }

  const editJot = () => {
    setIsEditing(old => !old);
  }

  if (!jot.tags) jot.tags = [];

  return <div>
    <div className="card">
      {
        isEditing ?
          <textarea value={jot.text} /> :
          <p> {jot.text} </p>
      }
      <button onClick={editJot}> Edit </button>
      <div className="tagsPanel">
        {jot.tags.map(tag => {
          return (
            <div key={tag.text}>
              <p>
                {tag.text}
                <button onClick={() => removeTag(tag.text)}> Remove Tag </button>
              </p>
            </div>
          )
        })}
      </div>
      {
        isEditingTag ?
          <div>
            <input
              value={editingTagText}
              onChange={e => setEditingTagText(e.target.value)}
            />
            <button onClick={addTag}> Set Tag </button>
          </div> :
          <p> {editingTagText} </p>
      }

      {
        !isEditingTag && <button onClick={showTagForm}> Add Tag </button>
      }
    </div>
  </div>
};
