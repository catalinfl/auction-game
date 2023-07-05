/// <reference types="vite/client" />

import { ThemeStateType } from "./redux/slices/themeSlice"

export type ContainerProps = {
    theme: ThemeStateType
}