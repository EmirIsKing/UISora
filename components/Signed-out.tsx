import React, {ReactNode} from 'react'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/utils/firebase";

type Props = {
    children: ReactNode
}


const SignedOut = ({children}:Props) => {

    const [user] = useAuthState(auth);

    if (user) return null;

    return (
        <>{children}</>
    )
}
export default SignedOut
