import Link from 'next/link'

interface PlanCardProps {
  name: string
  originalPrice: string
  salePrice: string
  discountRate: string
  isMaster?: boolean
  features: string[]
  perMonth?: boolean
}

export default function PlanCard({
  name,
  originalPrice,
  salePrice,
  discountRate,
  isMaster = false,
  features,
  perMonth = false,
}: PlanCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 ${
        isMaster
          ? 'border-2 border-[#1B64DA]'
          : 'border border-[#E5E8EB]'
      }`}
    >
      {isMaster && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#1B64DA] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
            추천 플랜
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#191F28]">{name}</h3>
      </div>

      <div className="mb-5">
        <span className="text-sm text-[#8B95A1] line-through block">
          {originalPrice}
        </span>
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-3xl font-bold text-[#F04452]">{salePrice}</span>
          {perMonth && (
            <span className="text-sm text-[#4E5968]">/월</span>
          )}
          <span className="ml-1 text-sm font-medium text-[#F04452]">
            {discountRate}
          </span>
        </div>
        <span className="text-xs text-[#8B95A1] mt-1 block">VAT 포함</span>
      </div>

      <ul className="flex-1 space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[#4E5968]">
            <span className="text-[#1B64DA] font-bold mt-0.5 shrink-0 text-sm">—</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/diagnosis"
        className="block text-center bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors"
      >
        무료상담 시작하기
      </Link>
    </div>
  )
}
