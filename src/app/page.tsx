import React, { Suspense } from 'react'
import SignInForm from '@/components/auth/SignInForm'
import Loading from '@/components/common/Loading'

const LoginPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <SignInForm />
        </Suspense>
    )
}

export default LoginPage
