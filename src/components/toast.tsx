import { For, createSignal } from "solid-js";

const [toasts, setToasts] = createSignal<Array<{
  id: number
  message: string
  delay: number
}>>([]);

export const createToast = (message: string, delay: number = 1500) => {
  const id = Math.random()
  setToasts(prev => [...prev, { id, message, delay }])
  setTimeout(() => {
    setToasts(prev => prev.filter(msg => msg.id !== id))
  }, delay)
}

export const copyText = async (text: string) => {
  await navigator.clipboard.writeText(text)
  createToast(`Copied ${text} to Clipboard!`)
}

export const Toast = () => {
  return (
    <div class="toast">
      <For each={toasts()} children={toast =>
        <div class="alert alert-success">{toast.message}</div>
      }/>
    </div>
  )
}