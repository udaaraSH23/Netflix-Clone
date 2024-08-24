import React from 'react'
import Link from 'next/link'
import './getstarted.css'

const GetStarted = () => {
  return (
    <div className='container'>
        <div>
        <header id="navbar" className="get-navbar">
        <div>
        <Link href="/" className='logo'> Netflix</Link>
        </div>
        <div>
        <Link href="/signIn" className='sign-in'> Sign In</Link>
        </div>
      </header>
        </div>

        <div className='form-wrapper'>
            <form action="">
                <span>STEP</span>
                <span>Joining Netflix is easy.</span>
                <span>Create Password to start your membership</span>
                <span>Enter your password and you'll be watching in no time.</span>
                <input type="text" readOnly/>
                <div className="password-box">
                <input type="password" id="password" required />
                <label className="floating-label" htmlFor="password">
                Add a Password
                </label>
              </div>
                <input type="submit" value="Next" />
            </form>
        </div>
    </div>
  )
}

export default GetStarted