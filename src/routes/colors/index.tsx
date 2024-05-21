import { useLocation, useNavigate } from "@solidjs/router"
import { createComputed, createEffect, createMemo, createSignal, For } from "solid-js"
import { Modal } from "~/components"
import { createToast } from "~/components/toast"


export default function Colors() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const colors = createMemo(() => location.hash.slice(1).split(',').filter(Boolean))
  // For rendering
  const [swatches, setSwatches] = createSignal<string[]>([])

  createEffect(() => {
    if (location.hash.length === 0) return
    setSwatches(colors().map(hex => '#' + hex))
  })

  let modal: HTMLDialogElement|undefined;

  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement
    const fd = new FormData(form)
    let color = fd.get('color')?.toString()
    if (color?.startsWith('#')) color = color.slice(1);
    console.log(colors());
    
    const hash = '#' + [...colors(), color].join(',')
    console.log(hash);
            
    navigate(location.pathname + hash)
    
    modal?.close()
    form.reset()
    e.preventDefault()
  }


  const handleCopy = async (color: string) => {
    await navigator.clipboard.writeText(color)
    createToast(`Copied ${color}`)
  }

  return (
    <article class="prose">
      <h1>Colors</h1>
      <div class="flex items-center mb-4">
        <h2 class="m-0">Swatches</h2>
        <button
          class="btn btn-ghost"
          textContent="clear"
          onClick={() => {
            navigate(location.pathname)
            setSwatches([]) // TODO why doesn't this update when location updates?
          }}
        />
      </div>
      <div class="flex">
        <For each={swatches()} children={color =>
          <div
            class="btn w-24 h-24 center hover:cursor-pointer bg-base-100 shadow-xl"
            style={{background: color}}
            onClick={() => handleCopy(color)}
          >
            {color}
          </div>
        }/>
      </div>
      <button
        class="btn w-24 h-24 center text-4xl"
        textContent="+"
        onClick={() => modal?.showModal()}
      />


      <Modal ref={modal}>
        <form class="flex" onSubmit={handleSubmit}>
          <input autofocus type="text" name="color" placeholder="hex color" class="input input-bordered input-primary w-full max-w-xs" />
          <button class="btn" type="submit">Add</button>
        </form>
      </Modal>
    </article>
  )
}