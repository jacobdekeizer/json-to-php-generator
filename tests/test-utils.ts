import {App, createApp} from 'vue'

export function withSetup<T>(composable: () => T): [T, App<Element>] {
    let result: T = {} as T;
    const app = createApp({
        setup() {
            result = composable()
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return () => {}
        }
    })
    app.mount(document.createElement('div'))
    // return the result and the app instance
    // for testing provide / unmount
    return [result, app]
}