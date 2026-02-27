import { useState, useEffect, useCallback } from 'react'
import favIcon from '../assets/images/favicon.svg'
import { SidePattern } from './SidePattern'
import { SeparatorPattern } from './SeparatorPattern'

// Types 
interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  label: string
  faqs: FAQItem[]
}

// Content
const FAQ_CATEGORIES: FAQCategory[] = [
  {
    label: 'General',
    faqs: [
      {
        question: 'What does Netizens Technologies specialize in?',
        answer:
          'Netizens Technologies is an engineering-led technology partner specializing in MVP development, AI consulting and automation, workflow digitization (CRM/ERP), and ongoing product support for growing businesses.\n\nWe help startups, SMEs, and operations-driven companies build, automate, and scale with structured execution.',
      },
      {
        question: 'Are you a software development company or a technology consulting firm?',
        answer:
          'We are both.\n\nWe provide technology consulting to define the right solution and structured engineering execution to build and scale it. Our engagement model ensures clarity before development begins.',
      },
      {
        question: 'What industries do you primarily work with?',
        answer:
          'We work with SaaS startups and product founders, real estate and property management companies, logistics and operations-driven businesses, and scaling SMEs digitizing internal processes.\n\nWe focus on businesses that need structured engineering, not just coding resources.',
      },
    ],
  },
  {
    label: 'ICP-Specific',
    faqs: [
      {
        question: 'Do you work with early-stage startups building an MVP?',
        answer:
          'Yes.\n\nWe help founders validate ideas through structured MVP development, sprint-based execution, and scalable architecture planning. Our goal is to help you launch fast without technical debt.',
      },
      {
        question: 'Can you support CTOs or in-house tech teams?',
        answer:
          'Absolutely.\n\nWe work as an extended engineering arm for CTOs who need faster delivery capacity, specialized AI expertise, structured sprint execution, and long-term product support.',
      },
      {
        question: 'Do you help traditional businesses digitize operations?',
        answer:
          'Yes.\n\nWe design and implement CRM, ERP, workflow automation, and reporting systems that reduce manual work and improve operational visibility.',
      },
    ],
  },
  {
    label: 'MVP & Product Development',
    faqs: [
      {
        question: 'How long does it take to build an MVP?',
        answer:
          'Most MVPs take between 6 to 12 weeks depending on scope and complexity.\n\nWe begin with a discovery process to define features, architecture, and sprint milestones before development starts.',
      },
      {
        question: 'What technologies do you use for product development?',
        answer:
          'We select the technology stack based on scalability, integration needs, security, and future growth plans. Our focus is long-term maintainability, not short-term builds.',
      },
      {
        question: 'Do you provide UI/UX design as part of development?',
        answer:
          'Yes.\n\nWe include structured UX planning, wireframing, and interface design to ensure usability and clarity before engineering begins.',
      },
    ],
  },
  {
    label: 'AI Consulting & Automation',
    faqs: [
      {
        question: 'What kind of AI solutions do you build?',
        answer:
          'We provide AI workflow automation, chatbots and intelligent assistants, data-driven recommendation systems, NLP and document processing solutions, and custom AI integrations into existing systems.',
      },
      {
        question: 'How do we know if AI is right for our business?',
        answer:
          'We begin with an AI feasibility assessment.\n\nWe evaluate your data maturity, use cases, ROI potential, and operational readiness before recommending implementation.',
      },
      {
        question: 'Can you integrate AI into our existing CRM or ERP?',
        answer:
          'Yes.\n\nWe specialize in integrating AI into existing systems to enhance automation, analytics, and decision-making.',
      },
    ],
  },
  {
    label: 'Workflow Digitization & Systems',
    faqs: [
      {
        question: 'Do you implement CRM and ERP systems?',
        answer:
          'Yes.\n\nWe design, customize, and implement CRM and ERP solutions tailored to your internal workflows and reporting needs.',
      },
      {
        question: 'Can you automate manual processes in our organization?',
        answer:
          'Absolutely.\n\nWe analyze current workflows, identify bottlenecks, and implement automation to reduce errors, improve efficiency, and increase transparency.',
      },
      {
        question: 'Do you provide system integration services?',
        answer:
          'Yes.\n\nWe integrate third-party platforms, payment systems, analytics tools, and internal software to create a seamless technology ecosystem.',
      },
    ],
  },
  {
    label: 'Support & Scaling',
    faqs: [
      {
        question: 'Do you provide ongoing technical support after launch?',
        answer:
          'Yes.\n\nWe offer structured retainer and SLA-based support models to ensure your systems remain secure, updated, and scalable.',
      },
      {
        question: 'Can you scale our existing application?',
        answer:
          'Yes.\n\nWe audit architecture, optimize performance, improve infrastructure, and enhance features to support growth.',
      },
    ],
  },
  {
    label: 'Engagement & Delivery',
    faqs: [
      {
        question: 'How does your process work after the discovery call?',
        answer:
          'Our process includes: (1) Discovery and scope definition, (2) Internal technical assessment, (3) Proposal and sprint roadmap, and (4) Structured execution with milestone reviews.\n\nThis ensures clarity before commitment.',
      },
      {
        question: 'Do you offer fixed-price or retainer models?',
        answer:
          'We offer fixed-scope project pricing, sprint-based engagement, and long-term retainer partnerships.\n\nThe model depends on your business goals and project nature.',
      },
      {
        question: 'How do you ensure project transparency?',
        answer:
          'We use milestone planning, sprint reviews, documentation, and structured reporting to ensure complete visibility throughout execution.',
      },
    ],
  },
  {
    label: 'UAE & Geography',
    faqs: [
      {
        question: 'Do you operate in the UAE?',
        answer:
          'Yes.\n\nWe have a presence in the UAE and support businesses across Dubai and the wider region, particularly in real estate, logistics, and scaling enterprises.',
      },
      {
        question: 'Do you work with international clients?',
        answer:
          'Yes.\n\nWe support clients across multiple countries through remote-first structured collaboration.',
      },
    ],
  },
  {
    label: 'Pricing & Decision',
    faqs: [
      {
        question: 'How much does it cost to build an MVP?',
        answer:
          'Costs vary based on scope, complexity, and integrations.\n\nAfter discovery, we provide a structured estimate with milestone-based clarity.',
      },
      {
        question: 'How do we get started?',
        answer:
          'You can schedule a discovery call.\n\nWe assess your goals, evaluate technical feasibility, and recommend the most suitable engagement model.',
      },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const AgentAvatar = () => (
  <div className="flex-shrink-0 w-[36px] h-[36px] rounded-full border border-[#0e3572] bg-[rgba(179,179,179,0.09)] p-[4px] flex items-center justify-center">
    <div className="w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center overflow-hidden">
      <img src={favIcon} alt="Netizens" className="w-[22px] h-[22px] object-contain" />
    </div>
  </div>
)

const ClickIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity"
  >
    <path
      d="M19 12H5M5 12L9 8M5 12L9 16"
      stroke="#58595b"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TypingIndicator = () => (
  <div className="flex items-center gap-1 py-1">
    <span className="w-1.5 h-1.5 bg-[#58595b]/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-1.5 h-1.5 bg-[#58595b]/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-1.5 h-1.5 bg-[#58595b]/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
)

function useTypingEffect(text: string, isActive: boolean, speed = 12) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const startTyping = useCallback(() => {
    setDisplayedText('')
    setIsTyping(true)
  }, [])

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('')
      setIsTyping(false)
      return
    }
    const t = setTimeout(startTyping, 200)
    return () => clearTimeout(t)
  }, [isActive, text, startTyping])

  useEffect(() => {
    if (!isTyping || !isActive) return
    if (displayedText.length < text.length) {
      const t = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(t)
    } else {
      setIsTyping(false)
    }
  }, [displayedText, isTyping, isActive, text, speed])

  return { displayedText, isTyping }
}

function FAQItemRow({
  faq,
  index,
  isActive,
  onToggle,
}: {
  faq: FAQItem
  index: number
  isActive: boolean
  onToggle: (i: number) => void
}) {
  const { displayedText, isTyping } = useTypingEffect(faq.answer, isActive)
  const showTypingDots = isActive && displayedText.length === 0

  // Render answer text with newlines preserved
  const renderAnswer = (text: string) =>
    text.split('\n\n').map((para, i) => (
      <p key={i} className={i > 0 ? 'mt-3' : ''}>
        {para}
      </p>
    ))

  return (
    <div className="w-full flex flex-col items-end">
      {/* Question bubble */}
      <button
        onClick={() => onToggle(index)}
        className={`
          flex items-center gap-[10px] justify-end p-2 sm:px-[18px] sm:py-[15px]
          rounded-tl-md rounded-tr-md rounded-bl-md
          sm:rounded-tl-[20px] sm:rounded-tr-[20px] sm:rounded-bl-[20px]
          border border-[rgba(88,89,91,0.1)]
          transition-all duration-200 cursor-pointer text-left group
          ${isActive
            ? 'bg-white shadow-sm'
            : 'bg-[rgba(14,53,114,0.05)] hover:bg-[rgba(14,53,114,0.1)] hover:border-[rgba(14,53,114,0.2)]'
          }
        `}
      >
        <h3 className="font-headings font-normal text-xs sm:text-[18px] leading-[25px] text-[#16181b]">
          {faq.question}
        </h3>
        {!isActive && <ClickIcon />}
      </button>

      {/* Answer — expands below active question */}
      <div
        className="w-full overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isActive ? '500px' : '0px', opacity: isActive ? 1 : 0 }}
      >
        <div className="flex flex-col gap-[20px] pt-[20px] w-full">
          <div className="flex gap-2 sm:gap-4 items-start w-full">
            <AgentAvatar />
            <div className="flex-1 min-h-[44px] flex items-start pt-1">
              {showTypingDots ? (
                <TypingIndicator />
              ) : (
                <div className="font-sans font-medium text-xs sm:text-[16px] leading-[22px] text-[#58595b]">
                  {renderAnswer(displayedText)}
                  {isTyping && (
                    <span className="inline-block w-[2px] h-[16px] bg-[#0e3572] ml-[1px] align-middle animate-pulse" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-0 border-t border-[rgba(88,89,91,0.1)]" />
        </div>
      </div>
    </div>
  )
}

// Main Component
export const FAQSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  // Reset active FAQ when switching tabs
  const handleTabChange = (i: number) => {
    setActiveTab(i)
    setActiveIndex(0)
  }

  const handleToggle = (i: number) => {
    setActiveIndex(prev => (prev === i ? -1 : i))
  }

  const currentFAQs = FAQ_CATEGORIES[activeTab].faqs

  return (
    <section className="relative w-full bg-[#FFFAFA] flex flex-col items-center py-16 lg:py-20 overflow-hidden">

      {/* ── Eyebrow + heading ── */}
      <div className="flex flex-col items-start gap-2 text-left mb-10 sm:mb-20 px-4">
        <div className="inline-flex items-center justify-center px-[18px] py-2 rounded-[4px] border border-[#0e3572]/10 bg-[#0e3572]/5">
          <span className="font-sans text-[12px] text-[#0e3572]">Clarity Before Commitment</span>
        </div>
        <h2 className="font-headings font-normal text-2xl md:text-[32px] leading-tight text-[#16181b]">
          Frequently asked questions
        </h2>
        <p className="font-sans text-[16px] leading-[24px] text-[#58595b] max-w-4xl">
          Everything you need to know about our MVP development, AI consulting, workflow
          automation, and structured delivery approach.
        </p>
      </div>

      <SeparatorPattern />
      <div className="relative w-full">
        <SidePattern invert />

        <div className="relative z-10 w-full max-w-[1096px] mx-auto px-4 lg:px-0 flex flex-col gap-8 items-center mt-10 sm:mt-20">

          {/* ── Category tab pills ── */}
          <div className="relative flex flex-wrap gap-2 justify-center">

            {FAQ_CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => handleTabChange(i)}
                className={`
                px-2 py-1 sm:px-[18px] sm:py-[8px] rounded-[6px] border text-sm sm:text-base sm:leading-[24px]
                font-sans font-normal transition-all duration-200 whitespace-nowrap
                ${activeTab === i
                    ? 'bg-[#0e3572] border-[#0e3572] text-[#fffafa] shadow-[0px_52px_15px_0px_rgba(0,0,0,0),0px_33px_13px_0px_rgba(0,0,0,0.01),0px_19px_11px_0px_rgba(0,0,0,0.05),0px_8px_8px_0px_rgba(0,0,0,0.09),0px_2px_5px_0px_rgba(0,0,0,0.1)]'
                    : 'bg-[#fffafa] border-[rgba(88,89,91,0.1)] text-[#58595b] hover:bg-[rgba(14,53,114,0.05)] hover:border-[rgba(14,53,114,0.2)]'
                  }
              `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── Chat window ── */}
          <div className="w-full rounded-[10px] overflow-hidden shadow-[0px_434px_121px_0px_rgba(0,0,0,0),0px_278px_111px_0px_rgba(0,0,0,0.01),0px_156px_94px_0px_rgba(0,0,0,0.03),0px_69px_69px_0px_rgba(0,0,0,0.04),0px_17px_38px_0px_rgba(0,0,0,0.05)]">

            {/* Browser chrome bar */}
            <div
              className="flex items-center sm:gap-[10px] px-[10px] py-[10px] w-full"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(88,89,91,0.1) 0%, rgba(88,89,91,0.1) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)',
              }}
            >
              <div className="flex gap-1 sm:gap-[10px] flex-1 items-center">
                <div className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] rounded-full bg-[#FF5F56]" />
                <div className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] rounded-full bg-[#FFBD2E]" />
                <div className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] rounded-full bg-[#27C93F]" />
              </div>
              <p className="flex-1 text-center font-sans font-bold text-[12px] text-[#58595b]/75">
                Simply — Click the question
              </p>
              <div className="flex-1 flex justify-end">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-40">
                  <path d="M11 3H17V9M17 3L10 10M7 5H4C3.44772 5 3 5.44772 3 6V16C3 16.5523 3.44772 17 4 17H14C14.5523 17 15 16.5523 15 16V13" stroke="#58595B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Chat body — animated tab transition */}
            <div className="bg-white px-4 sm:px-8 md:px-[112px] py-[35px] min-h-[520px]">
              <div
                key={activeTab}
                className="flex flex-col gap-[13px] items-end w-full max-w-[872px] mx-auto
                         animate-[fadeSlideIn_0.35s_ease-out_forwards]"
              >
                {/* "Also Ask" label above the list */}
                <p className="text-[12px] text-[#0e3572] font-sans self-end">Also Ask</p>

                {currentFAQs.map((faq, i) => (
                  <FAQItemRow
                    key={`${activeTab}-${i}`}
                    faq={faq}
                    index={i}
                    isActive={activeIndex === i}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default FAQSection
