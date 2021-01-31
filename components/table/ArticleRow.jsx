import Dropdown from "components/form/Dropdown";

export default function ArticleRow({ entry }) {
  return (
    <tr>
      <td>{entry.title}</td>
      <td>{entry.abstract}</td>
      <td>
        <Dropdown primaryLabel="Show" buttonClasses="is-small primary" />
      </td>
    </tr>
  );
}
