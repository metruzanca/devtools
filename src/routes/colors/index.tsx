import { useLocation, useNavigate } from "@solidjs/router"
import { createMemo, For, onMount } from "solid-js"
import { isServer } from "solid-js/web"
import { Modal } from "~/components"
import { clientOnly } from "@solidjs/start";

const Swatches = clientOnly(() => import('../../components/swatches'))

const AddColorModalForm = (props: {
  onSubmit: (color: string) => void
}) => {
  let modalRef: HTMLDialogElement|undefined;

  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement
    const fd = new FormData(form)
    let color = fd.get('color')?.toString()
    if (!color) return e.preventDefault();
      
    if (color?.startsWith('#')) color = color.slice(1);
    props.onSubmit(color)
    
    modalRef?.close()
    form.reset()
    e.preventDefault()
  }

  return (
    <>
      <button
        class="btn w-24 h-24 center text-4xl"
        textContent="+"
        onClick={() => modalRef?.showModal()}
      />
      <Modal ref={modalRef}>
        <form class="flex" onSubmit={handleSubmit}>
          <input autofocus type="text" name="color" placeholder="hex color" class="input input-bordered input-primary w-full max-w-xs" />
          <button class="btn" type="submit">Add</button>
        </form>
      </Modal>
    </>
  )
}

export default function Colors() {
  const location = useLocation()
  const navigate = useNavigate()

  onMount(() => {
    if (location.hash !== '') return
    
    const localColors = localStorage.getItem('colors')
    if (!localColors) return
    
    navigate(location.pathname + localColors)
  })



  const colors = createMemo(() => 
    location.hash
      .slice(1)
      .split(',')
      .filter(Boolean)
  )

  const setColors = (nextColors: string[]) => {
    const hash = '#' + nextColors.join(',')
    navigate(location.pathname + hash)
    if (!isServer) localStorage.setItem('colors', hash)
  }

  return (
    <article class="prose">
      <h1>Colors</h1>
      <div class="flex items-center mb-4">
        <h2 class="m-0">Swatches</h2>
        <button
          class="btn btn-ghost"
          textContent="clear"
          onClick={() => setColors([])}
        />
      </div>
      <Swatches colors={colors()}/>

      <AddColorModalForm
        onSubmit={color => setColors([...colors(), color])}
      />
      
      </article>
    )
  }