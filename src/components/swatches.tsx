import { Component, For } from 'solid-js'
import { copyText } from './toast'

const Swatches: Component<{
  colors: string[];
  onDelete: (color: string) => void
}> = (props) => {
  return (
    <For
      each={props.colors}
      children={(color) => (
        <div class="relative group">
          <button
            class="btn btn-xs btn-circle btn-ghost absolute right-1 top-1 invisible group-hover:visible"
            onClick={() => props.onDelete(color)}
          >
            ✕
          </button>
          <div
            class="btn w-24 h-24 center hover:cursor-pointer bg-base-100 shadow-xl"
            style={{ background: `#${color}` }}
            onClick={() => copyText(`#${color}`)}
          >
            {`#${color}`}
          </div>
        </div>
      )}
    />
  );
};

export default Swatches