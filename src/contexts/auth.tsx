import { onMount, ParentComponent } from "solid-js";

const AuthProvider: ParentComponent = (props) => {
    onMount(() => {
        console.log("Init Auth Provider")
    })

    onMount(() => {
        console.log("Clean Auth Provider")
    })
    return props.children
}

export default AuthProvider;