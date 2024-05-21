import { Modal } from ".";

export const AddColorModalForm = (props: { onSubmit: (color: string) => void }) => {
  let modalRef: HTMLDialogElement | undefined;

  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    let color = fd.get("color")?.toString();
    if (!color) return e.preventDefault();

    if (color?.startsWith("#")) color = color.slice(1);
    props.onSubmit(color);

    modalRef?.close();
    form.reset();
    e.preventDefault();
  };

  return (
    <>
      <button
        class="btn w-24 h-24 center text-4xl"
        textContent="+"
        onClick={() => modalRef?.showModal()}
      />
      <Modal ref={modalRef}>
        <form class="flex" onSubmit={handleSubmit}>
          <input
            autofocus
            type="text"
            name="color"
            placeholder="hex color"
            class="input input-bordered input-primary w-full max-w-xs"
          />
          <button class="btn btn-primary ml-2" type="submit">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
};


export const SaveGroupForm = (props: {
  onSubmit: (name: string) => void;
}) => {
  let modalRef: HTMLDialogElement | undefined;

  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    let name = fd.get("name")?.toString();
    if (!name) return e.preventDefault();

    props.onSubmit(name);    

    modalRef?.close();
    form.reset();
    e.preventDefault();
  };

  return (
    <>
      <button
        class="btn btn-ghost"
        textContent="Save as Group"
        onClick={() => modalRef?.showModal()}
      />
      <Modal ref={modalRef}>
        <form class="flex" onSubmit={handleSubmit}>
          <input
            autofocus
            type="text"
            name="name"
            placeholder="Group Name"
            class="input input-bordered input-primary w-full max-w-xs"
          />
          <button class="btn btn-primary ml-2" type="submit">
            Save!
          </button>
        </form>
      </Modal>
    </>
  );
};