import { useLocation } from "@solidjs/router"
import { createEffect, createSignal, For } from "solid-js"
import { createToast } from "~/components/toast"


export default function Colors() {
  const location = useLocation()

  const [swatches, setSwatches] = createSignal<string[]>([])
  createEffect(() => {
    console.log(location.hash);
    setSwatches(
      location.hash.slice(1).split(',').map(hex => '#' + hex)
    )
  })

  const handleCopy = async (color: string) => {
    await navigator.clipboard.writeText(color)
    console.log('Copied', color);
    createToast(`Copied ${color}`)
  }

  return (
    <article class="prose">
      <h1>Sam's Devtools</h1>
    </article>
  )
}