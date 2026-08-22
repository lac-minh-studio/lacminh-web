import { ContactInfo } from './ContactInfo'
import { PartnershipInquiryForm } from './PartnershipInquiryForm'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-surface-dark py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="content-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          <div className="w-full lg:w-[55%]">
            <PartnershipInquiryForm />
          </div>
          <div className="w-full lg:w-[45%]">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  )
}
