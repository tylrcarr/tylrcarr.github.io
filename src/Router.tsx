import {useRouter} from "./hooks/use-router.hook";


export const Router = () => {
    return <>
        {useRouter().current.render()}
    </>
}
