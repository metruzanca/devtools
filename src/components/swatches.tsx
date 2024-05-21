import { For } from 'solid-js'
import { copyText } from './toast'

const Swatches = (props: { colors: string[] }) => {
  return (
    <div class="flex">
      <For each={props.colors.map(hex => '#' + hex)} children={color =>
        <div
          class="btn w-24 h-24 center hover:cursor-pointer bg-base-100 shadow-xl"
          style={{background: color}}
          onClick={() => copyText(color)}
        >
          {color}
        </div>
      }/>
    </div>
  )
}

export default Swatches