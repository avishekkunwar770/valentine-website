'use client'

import { useState } from 'react'
import ValentineBox from '@/components/valentine-box'
import NameForm from '@/components/name-form'
import ValentineQuestion from '@/components/valentine-question'
import ValentineSuccess from '@/components/valentine-success'

export default function Page() {
  const [stage, setStage] = useState<'box' | 'name' | 'question' | 'success'>('box')

  return (
    <main className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {stage === 'box' && <ValentineBox onOpen={() => setStage('name')} />}
      {stage === 'name' && <NameForm onContinue={() => setStage('question')} />}
      {stage === 'question' && <ValentineQuestion onYes={() => setStage('success')} />}
      {stage === 'success' && <ValentineSuccess />}
    </main>
  )
}
