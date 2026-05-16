'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PaymentRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/apply-now')
  }, [router])

  return null
}
