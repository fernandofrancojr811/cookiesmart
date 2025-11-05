"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ConvertPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to new convert input page
    router.replace("/convert/input")
  }, [router])

  return null
}
