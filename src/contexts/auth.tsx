import { createContext, onMount, ParentComponent } from "solid-js";

const AuthStateContext = createContext();

const AuthProvider: ParentComponent = (props) => {
    onMount(() => {
        console.log("Init Auth Provider")
    })

    onMount(() => {
        console.log("Clean Auth Provider")
    })
    return (
        <AuthStateContext.Provider value={{
            testValue: 100,
            testFunction: () => "Hello World"
        }}>
            {props.children}
        </AuthStateContext.Provider>
    )
}

export default AuthProvider;