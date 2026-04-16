import { JOB_POSITIONS } from '@/data/careers'
import { JobCard, JobNewCard } from './JobCard'

export function JobListings() {
  return (
    <section id="job-listings" className="py-24 bg-surface">
      <div className="content-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-2xs font-bold uppercase tracking-[0.3em] text-primary">
            Cơ Hội
          </span>
          <h2
            className="text-4xl md:text-heading-md text-text-dark mt-3 font-semibold"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Vị Trí Đang Tuyển Dụng
          </h2>
          <p className="mt-4 text-md text-text-secondary max-w-xl mx-auto leading-relaxed">
            Chúng tôi đang tìm kiếm những Intern tài năng và đam mê để cùng xây dựng
            huyền sử số Việt Nam.
          </p>
        </div>

        {/* Job cards grid — 3 columns on wide, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {JOB_POSITIONS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          <JobNewCard/>
        </div>

        {/* Open application CTA */}
        <div
          className="mt-16 glass-card rounded-2xl p-10 text-center"
          style={{ boxShadow: 'var(--shadow-neu-light)' }}
        >
          <h3
            className="text-2xl font-semibold text-text-dark mb-3"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Không thấy vị trí phù hợp?
          </h3>
          <p className="text-md text-text-secondary mb-6 max-w-lg mx-auto leading-relaxed">
            Gửi CV và portfolio của bạn — chúng tôi luôn chào đón những tài năng
            có chung chí hướng.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-text-light text-md font-semibold hover:bg-secondary transition-colors"
            style={{ boxShadow: 'var(--shadow-neu-cta)' }}
          >
            Liên hệ chúng tôi
          </a>
        </div>
      </div>
    </section>
  )
}
