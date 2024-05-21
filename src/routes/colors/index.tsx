import { useLocation, useNavigate } from "@solidjs/router"
import { For, createEffect, createMemo, onMount } from "solid-js"
import { isServer } from "solid-js/web"
import { AddColorModalForm, SaveGroupForm } from "~/components/forms";
import { Swatches } from "~/components/client";
import { createLocalStorage } from "~/lib";
import { produce } from "solid-js/store";
import { copyText } from "~/components/toast";

type ColorGroup = {
  id: number
  name: string
  colors: string[]
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

  const [groups, setGroups] = createLocalStorage<ColorGroup[]>("groups", []);

  const saveGroup = (name: string) => {  
    setGroups((state) => [
      ...state,
      {
        id: Math.random(),
        name,
        colors: colors(),
      },
    ]);
  }

  createEffect(() => {
    console.log(groups());
  })


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
        <SaveGroupForm onSubmit={saveGroup} />
      </div>
      <div class="flex flex-wrap">
        <Swatches
          colors={colors()}
          onDelete={(color) =>
            setColors(colors().filter((item) => item !== color))
          }
        />

        <AddColorModalForm
          onSubmit={(color) => setColors([...colors(), color])}
        />
      </div>

      {groups().length > 0 && (
        <>
          <For
            each={groups()}
            children={(group) => (
              <div class="group">
                <div class="flex items-center gap-2 ">
                  <h3 class="mt-0">{group.name}</h3>
                  <button
                    class="btn btn-primary btn-xs invisible group-hover:visible"
                    onClick={() =>
                      copyText(
                        `${window.location.origin}${
                          location.pathname
                        }#${colors().join(",")}`,
                        "Copied Shareable URL"
                      )
                    }
                  >
                    Share
                  </button>
                  <button
                    class="btn btn-xs btn-circle btn-ghost invisible group-hover:visible"
                    onClick={() =>
                      setGroups((groups) =>
                        groups.filter((g) => g.id !== group.id)
                      )
                    }
                  >
                    ✕
                  </button>{" "}
                </div>
                <div class="flex flex-wrap">
                  <Swatches colors={group.colors} />
                </div>
              </div>
            )}
          />
        </>
      )}
    </article>
  );
  }