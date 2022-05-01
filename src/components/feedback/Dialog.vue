<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'update:show', show: boolean): void }>()
const show = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
})

const contentEl = ref<HTMLDivElement>()
let enterAnimate: Animation
let leaveAnimate: Animation
const contentAppear: Keyframe[] = [
  {
    opacity: 0,
    transform: 'translateY(-20px)',
  },
  {
    opacity: 1,
    transform: 'translateY(0)',
  },
]

onMounted(() => {
  if (contentEl.value) {
    enterAnimate = contentEl.value.animate(contentAppear, { duration: 200 })
    leaveAnimate = contentEl.value.animate(contentAppear.reverse(), { duration: 200 })
    enterAnimate.pause()
    leaveAnimate.pause()
  }
})

const onEnter = (el: HTMLElement, done: () => void) => {
  el.style.opacity = '1'
  enterAnimate.play()
  enterAnimate.onfinish = () => done()
}
const onLeave = (el: HTMLElement, done: () => void) => {
  el.style.opacity = '0'
  leaveAnimate.play()
  leaveAnimate.onfinish = () => done()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog" @enter="onEnter" @leave="onLeave">
      <div
        v-show="show"
        pos="fixed top-0 right-0 bottom-0 left-0"
        flex
        justify-center
        items-center
        bg="[#00000033]"
        z-999
        duration-200
        @touchmove.prevent
        @mousewheel.prevent
        @click="show = false"
      >
        <div ref="contentEl" class="content" @click.stop>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.content {
  box-shadow: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
}
</style>
