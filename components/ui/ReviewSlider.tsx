'use client'

import { REVIEW_LIST } from '@/lib/constants'

interface Review {
  name: string
  business: string
  rating: number
  content: string
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="min-w-[280px] max-w-[280px] rounded-2xl bg-white border border-[#E5E8EB] p-5 flex flex-col gap-2 flex-shrink-0 hover:shadow-md transition-shadow duration-200">
      <div className="text-[#F5A623] text-base leading-none" aria-label={`별점 ${review.rating}점`}>
        {'★'.repeat(review.rating)}
      </div>
      <p className="text-sm text-[#4E5968] leading-relaxed line-clamp-3">{review.content}</p>
      <div className="mt-auto pt-1">
        <p className="text-sm font-semibold text-[#191F28]">{review.name}</p>
        <p className="text-xs text-[#8B95A1]">{review.business}</p>
      </div>
    </div>
  )
}

function SliderRow({ reviews, reverse }: { reviews: Review[]; reverse?: boolean }) {
  const doubled = [...reviews, ...reviews]
  const trackWidth = doubled.length * (280 + 16)

  return (
    <div className="slider-row overflow-hidden w-full">
      <div
        className={reverse ? 'slider-track-right' : 'slider-track-left'}
        style={{ display: 'flex', gap: '16px', width: `${trackWidth}px` }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

export default function ReviewSlider() {
  const topReviews = REVIEW_LIST.filter((_, i) => i % 2 === 0)
  const bottomReviews = REVIEW_LIST.filter((_, i) => i % 2 !== 0)

  return (
    <section className="py-20 md:py-28 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-10">
        <p className="text-sm font-semibold text-[#1B64DA] mb-2">고객 후기</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#191F28]">
          실제 고객들의 생생한 후기
        </h2>
        <p className="text-base text-[#4E5968] leading-relaxed mt-2">
          WEFLOW와 함께한 고객들의 솔직한 이야기입니다.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SliderRow reviews={topReviews} />
        <SliderRow reviews={bottomReviews} reverse />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 text-right">
        <a
          href="/diagnosis"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B64DA] hover:text-[#1348A8] transition-colors"
        >
          후기 더보기 →
        </a>
      </div>
    </section>
  )
}
