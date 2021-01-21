import { Jot } from "../models/jot";

interface IProps {
  jots: Jot[],
  onTagSelected: (tag: string) => void;
}

export default function TagsPanel(props: IProps) {
  const { jots, onTagSelected } = props;

  const allTagsSet = jots
    .map(jot => jot.tag)
    .reduce((acc, tag) => {
      if (tag) acc.add(tag);
      return acc;
    }, new Set<string>());

  const allTags = Array.from(allTagsSet.values()).concat(["all"]);

  const onTagClick = (tag: string) => {
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
          </p>
        ))
      }
    </div>
  )
}