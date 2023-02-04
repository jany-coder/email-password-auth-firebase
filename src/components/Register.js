import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const Register = () => {
    const [passWordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleRegister = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);

        // Validate password

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Please provide at least two uppercase')
            return;
        } if(password.length < 6) {
            setPasswordError('Password should be at least 6 characters')
            return;
        } if(!/(?=.*[!@$&*])/.test(password)) {
            setPasswordError('Please add at least one special characters')
            return;
        }
        setPasswordError('')
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess(true)
            form.reset()
            verifyEmail();
            updateUserName(name);
        })
        .catch (error => {
            console.error('error', error)
            setPasswordError(error.message)
        })
    }
    
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email and verify')
            });

    }

    const updateUserName = (name) => {
        
        updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            console.log("display name updated")
          }).catch((error) => {
            console.log(error);
          });
    }

  

    return (
        <>
          
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Register to your account
                            </h2>
                            
                        </div>
                        <form onSubmit={handleRegister} className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="name" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <div  className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </div>
                                </div>
                            </div>
                            <p className='text-red-600'>{passWordError}</p>
                            {success && <p className='text-green-500'>User created successfully</p>}
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                    </span>
                                    Register
                                </button>
                            </div>
                        </form>
                        <p><small>Already have an account? <Link className='underline text-blue-700' to='/login'>Login</Link></small></p>
                    </div>
            </div>
        </>
    );
};

export default Register;