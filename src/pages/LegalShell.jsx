import { Link } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'

export default function LegalShell({ title, children }) {
  return (
    <div className="min-h-[100dvh] bg-bg text-ink">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to Ember &amp; Oak
        </Link>
        <h1 className="font-display mt-8 text-4xl">{title}</h1>
        <div className="mt-8 space-y-5 leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ink [&_h2]:pt-4">
          {children}
        </div>
      </div>
    </div>
  )
}
