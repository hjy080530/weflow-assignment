import Image from 'next/image'
import Link from 'next/link'

interface CaseCardProps {
  name: string
  business: string
  image: string
  url: string
}

export default function CaseCard({ name, business, image, url }: CaseCardProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden group"
    >
      <div className="relative aspect-[4/3] bg-[#F2F4F6] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-1.5">
        <span className="inline-block text-xs text-[#1B64DA] bg-[#1B64DA]/10 px-2 py-0.5 rounded-full w-fit">
          {business}
        </span>
        <p className="text-base font-semibold text-[#191F28]">{name}</p>
        <span className="text-[#1B64DA] text-sm font-medium group-hover:underline">
          자세히 보기 →
        </span>
      </div>
    </Link>
  )
}
