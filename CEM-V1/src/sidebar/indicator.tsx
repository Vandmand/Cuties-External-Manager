const Connected = () => {
  return (
    <div className="tooltip tooltip-success" data-tip={"Connected"}>
      <div className="rounded-full h-3 w-3 bg-success shadow" />
    </div>
  );
};

const Connecting = () => {
  return (
    <div className="tooltip tooltip-warning" data-tip={"Connecting..."}>
      <div className="rounded-full h-3 w-3 bg-warning shadow" />
    </div>
  );
};

const Failed = () => {
  return (
    <div className="tooltip tooltip-error" data-tip={"Connection Failed"}>
      <div className="rounded-full h-3 w-3 bg-error shadow" />
    </div>
  );
};

export default { Connected, Connecting, Failed };
