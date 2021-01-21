import { useState } from "react";
import { Jot } from "../models/jot";
import { API } from "../services/api";

interface IJot {
  jot: Jot;
  onClick: () => void;
}

export function JotView(props: IJot) {
  const { jot } = props;

  const [isEditingTag, setIsEditingTag] = useState<boolean>();
  const [editingTagText, setEditingTagText] = useState<string>("");

  function showTagForm() {
    setIsEditingTag(true);
  }

  async function addTag() {
    await API.setTag(jot._id, editingTagText);
  }

  return (
    <div className="jot" onClick={props.onClick}>
      <p> {jot.data} </p>
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
        jot.tag ?
          <p> {jot.tag} </p> :
          !isEditingTag && <button onClick={showTagForm}> Add Tag </button>
      }
    </div>
  )
}