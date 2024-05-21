import { createEffect, createSignal, onMount } from "solid-js";

export function createLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = createSignal<T>(initialValue);

  onMount(() => {
    const localState = localStorage.getItem(key)
    if (!localState) return
    
    setState(JSON.parse(localState))
  })

  createEffect(() => {    
    localStorage.setItem(key, JSON.stringify(state()))
  })

  return [state, setState] as const
}
