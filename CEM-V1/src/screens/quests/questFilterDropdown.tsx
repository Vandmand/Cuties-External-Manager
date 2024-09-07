export default function QuestFilterDropdown(props: {
  filterObject: Record<string, boolean>;
  name: string;
  onDropdownChange: (newFilter: Record<string, boolean>) => void;
}) {
  const renderOptions = () => {
    const renderedOptions: JSX.Element[] = [];

    for (const key in props.filterObject) {
      if (Object.prototype.hasOwnProperty.call(props.filterObject, key)) {
        const filter = props.filterObject[key];

        renderedOptions.push(
          <li className="flex gap-4 flex-row" key={key}>
            <input
              className="checkbox"
              type="checkbox"
              checked={filter}
              onChange={() => {
                props.onDropdownChange(
                  Object.assign({}, props.filterObject, { [key]: !filter })
                );
              }}
            />
            <p>{key}</p>
          </li>
        );
      }
    }

    return renderedOptions;
  };

  return (
    <details className="dropdown">
      <summary className="btn m-1 btn-outline shadow-md ">{props.name}</summary>
      <ul className="dropdown-content bg-base-100 rounded-box z-[1] shadow w-fit flex flex-col gap-4 p-4">
        {renderOptions()}
      </ul>
    </details>
  );
}
