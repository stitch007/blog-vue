import type { LoadingBarProviderInst, MessageProviderInst } from 'naive-ui'

declare global {
  export interface Window {
    $message?: MessageProviderInst
    $loadingBar?: LoadingBarProviderInst
  }
}

export {}
