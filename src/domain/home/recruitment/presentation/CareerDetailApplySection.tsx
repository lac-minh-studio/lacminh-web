import { CareerContactInfo } from './CareerContactInfo'
import { JobApplicationForm } from './JobApplicationForm'

interface CareerDetailApplySectionProps {
  activeJobTitle: string
  positionOptions: string[]
}

export function CareerDetailApplySection({
  activeJobTitle,
  positionOptions,
}: CareerDetailApplySectionProps) {
  return (
    <section id="apply" className="relative bg-surface-dark py-20 md:py-28 overflow-hidden">
      <div className="content-container relative z-10">
        <div className="mb-10">
          <span className="text-2xs uppercase tracking-widest text-primary font-bold block mb-3">
            Ứng tuyển
          </span>
          <h2
            className="text-heading-md md:text-4xl text-text-light font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Ứng tuyển vị trí {activeJobTitle}
          </h2>
          <p className="text-text-light/70 text-body leading-relaxed max-w-2xl">
            Hoàn thiện form bên dưới để gửi hồ sơ. Đội ngũ Lạc Minh sẽ phản hồi
            trong thời gian sớm nhất.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          <div className="w-full lg:w-3/5">
            <JobApplicationForm
              initialPosition={activeJobTitle}
              positionOptions={positionOptions}
              includeOpenPositionOption={false}
              messageLabel="Lời nhắn và portfolio"
              messagePlaceholder="Chia sẻ ngắn gọn về kinh nghiệm và đường dẫn portfolio của bạn"
              submitLabel="Gửi hồ sơ"
            />
          </div>
          <div className="w-full lg:w-2/5">
            <CareerContactInfo />
          </div>
        </div>
      </div>
    </section>
  )
}
