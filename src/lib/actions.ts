'use server'
 
// import { signIn } from '@/auth'
 import { signIn } from 'next-auth/react'
export async function authenticate(_currentState: unknown, formData: any) {
  try {
    await signIn('credentials', formData)
  } catch (error:any) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}