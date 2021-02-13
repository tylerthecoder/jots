import { useState } from "react";
import { IJot } from "../models/jot";

interface IProps {
  jots: IJot[],
  onTagSelected: (tag: string) => void;
}

export default function TagsPanel(props: IProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const { jots, onTagSelected } = props;

  const allTagsSet = jots
    .flatMap(jot => jot.tags)
    .reduce((acc, tag) => {
      if (tag) acc.add(tag.text);
      return acc;
    }, new Set<string>());

  const allTags = Array.from(allTagsSet.values()).concat(["all"]);

  const onTagClick = (tag: string) => {
    setSelectedTag(tag);
    onTagSelected(tag);
  }

  return (
    <div>
      {
        allTags.map(tag => (
          <p
            key={tag}
            onClick={() => onTagClick(tag)}
          >
            {tag}
            {tag === selectedTag && "*"}
          </p>
        ))
      }
    </div>
  )
}