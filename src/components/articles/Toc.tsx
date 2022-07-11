import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export interface IToc {
  name: string
  active: boolean
  offsetTop: number
  children?: IToc[]
}

const Toc = defineComponent({
  props: {
    toc: {
      type: Object as PropType<IToc[]>,
      required: true,
    },
  },
  setup(props) {
    const scrollTo = (top: number) => {
      window.scrollTo({ top: top - 24, behavior: 'smooth' })
    }

    return () => (
      <ul>
        {props.toc?.map((item, index) => (
          <li key={index} class="my1">
            <div
              class={[
                item.active && 'bg-$primary-color !text-white',
                'px3 py0.5 text-base hover:text-$primary-color rounded-md cursor-pointer duration-300 line-clamp-1',
              ]}
              onClick={() => scrollTo(item.offsetTop)}
            >
              {item.name}
            </div>
            {item.children && <Toc toc={item.children} class="pl4" />}
          </li>
        ))}
      </ul>
    )
  },
})

export default Toc
