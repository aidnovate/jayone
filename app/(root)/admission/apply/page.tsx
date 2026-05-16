'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ApplyRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/apply-now')
  }, [router])

  return null
}