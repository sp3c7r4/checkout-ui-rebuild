import arthurite from '@/assets/arthurite.png'
import aws from '@/assets/aws.png'
import { LoginForm } from '@/components/login-form'
import { SignupForm } from '@/components/signup-form'
import { useState } from 'react'
import checkout from '@/assets/light.png'
import mascot from '@/assets/mascot.png'

function Auth() {
  const [isSignup, setIsSignup] = useState(false)

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo - top corner style on md+ screens */}
        <div className="hidden md:flex justify-start gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src={checkout} className='w-30 h-auto'/>
          </a>
        </div>
        
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* Logo - centered on top for mobile only */}
            <div className="flex md:hidden justify-center mb-8">
              <a href="#" className="flex items-center gap-2 font-medium">
                <img src={checkout} className='w-40 h-auto'/>
              </a>
            </div>
            
            {isSignup ? (
              <SignupForm onSwitchToLogin={() => setIsSignup(false)} />
            ) : (
              <LoginForm onSwitchToSignup={() => setIsSignup(true)} />
            )}
          </div>
        </div>
      </div>
      <div className={"bg-gradient-to-t from-gray-900 via-gray-600 to-transparent relative hidden lg:block group"}>
        <img
          src={mascot}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale transition-all duration-300 group-hover:dark:brightness-100 group-hover:dark:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        {/* <div className="absolute top-8 left-8 text-white">
          <h1 className="text-4xl font-light mb-2">Qwik</h1>
        </div> */}
        <div className="absolute bottom-8 left-8 text-white max-w-md">
          <h2 className="text-white text-xl md:text-2xl font-light tracking-wide mb-4">Checkout - SAAS + AAAS SOLUTION</h2>
          <p className="text-sm mb-4 leading-relaxed opacity-90">
        A SaaS solution helping businesses manage products and customers with seamless checkout experiences.
          </p>
          <div className="flex items-center gap-2 text-xs opacity-75">
        <span>Powered by</span>
        <span className="font-medium">Arthurite</span>
        <img src={arthurite} className="h-5 w-auto" alt="Arthurite" />
          <img src={aws} className="h-6 w-auto" alt="AWS" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;
