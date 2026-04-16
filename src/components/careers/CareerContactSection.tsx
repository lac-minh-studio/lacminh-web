import { CareerContactForm } from './CareerContactForm'
import { CareerContactInfo } from './CareerContactInfo'

export function CareerContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-surface-dark py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="content-container relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-2xs uppercase tracking-widest text-primary font-bold block mb-3">
            Liên hệ
          </span>
          <h2
            className="text-heading-md md:text-4xl text-text-light font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Bạn Quan Tâm? Hãy Nói Chuyện
          </h2>
          <p className="text-text-light/70 text-body leading-relaxed max-w-xl">
            Dù bạn tốt nghiệp hay còn đi học — chúng tôi tìm đam mê, không chỉ
            bằng cấp.
          </p>
        </div>

        {/* Form + Info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          <div className="w-full lg:w-3/5">
            <CareerContactForm />
          </div>
          <div className="w-full lg:w-2/5">
            <CareerContactInfo />
          </div>
        </div>
      </div>
    </section>
  )
}
