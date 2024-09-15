export default function Modal(props: {
  modalState: boolean;
  setModalState: (s: boolean) => void;
}) {
  return (
    <div
      hidden={props.modalState}
      className="left-0 top-0 w-screen h-screen backdrop-blur z-50 fixed"
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="modal-box w-4/5 h-3/5">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="input flex-grow input-primary"
              placeholder="Search anything"
            />
            <button
              className="btn btn-circle"
              onClick={() => props.setModalState(true)}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
