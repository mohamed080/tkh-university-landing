export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex animate-fade-in items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-orange/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-orange" />
        </div>

        <p className="text-sm font-medium tracking-widest text-primary">THE KNOWLEDGE HUB</p>
      </div>
    </div>
  )
}
