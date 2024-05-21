import { useLocation } from "@solidjs/router"
import { JSXElement } from "solid-js";

export const A = (props: { href: string; children: JSXElement }) => {
  const location = useLocation()
  return (
    <a
      href={props.href}
      class={location.pathname === props.href ? 'text-accent' : ''}
      children={props.children}
    />
  )
}

export const Modal = (props: {
  children: JSXElement;
  ref?: HTMLDialogElement
}) => {
  return (
    <dialog ref={props.ref} id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {props.children}
      </div>
    </dialog>
  )
}