'use client'

import { useState } from 'react'
import type { Key } from 'react-aria-components'
import {
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  ListBoxItem,
} from '@heroui/react'
import { CheckCircle } from 'lucide-react'
import { AppButton } from '@/components/hero-ui'
import { JOB_POSITIONS } from '@/data/careers'

const POSITION_OPTIONS = JOB_POSITIONS.map((p) => p.title)

function isValidPhone(value: string) {
  return /^[+\d\s()-]{8,20}$/.test(value.trim())
}

const labelClass =
  'text-text-light/60 text-2xs uppercase tracking-widest mb-1 block'
const inputClass =
  'w-full h-11 bg-white/5 border border-primary/40 rounded-lg text-text-light px-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm placeholder:text-text-light/20'

export function CareerContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [position, setPosition] = useState(POSITION_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [phoneError, setPhoneError] = useState<string | undefined>()
  const [submitted, setSubmitted] = useState(false)

  function handlePhoneBlur() {
    if (phone && !isValidPhone(phone)) {
      setPhoneError('Số điện thoại không hợp lệ')
    } else {
      setPhoneError(undefined)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (phone && !isValidPhone(phone)) {
      setPhoneError('Số điện thoại không hợp lệ')
      return
    }
    setSubmitted(true)
    // TODO: replace with API call
  }

  return (
    <div className="glass-form p-10 rounded-3xl shadow-(--shadow-neu-dark) border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={name}
            onChange={setName}
            className="flex flex-col gap-1"
          >
            <Label className={labelClass}>Họ và tên</Label>
            <Input placeholder="Nguyễn Văn A" className={inputClass} />
          </TextField>

          <TextField
            value={email}
            onChange={setEmail}
            className="flex flex-col gap-1"
          >
            <Label className={labelClass}>Email</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              className={inputClass}
            />
          </TextField>
        </div>

        {/* Phone + Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={phone}
            onChange={setPhone}
            isInvalid={!!phoneError}
            className="flex flex-col gap-1"
          >
            <Label className={labelClass}>Số điện thoại</Label>
            <Input
              type="tel"
              placeholder="0000 123 4567"
              onBlur={handlePhoneBlur}
              className={`${inputClass} ${phoneError ? 'border-red-500' : ''}`}
            />
            {phoneError && (
              <p className="text-red-400 text-2xs mt-1 font-medium italic">
                {phoneError}
              </p>
            )}
          </TextField>

          <Select
            selectedKey={position}
            onSelectionChange={(key: Key | null) => {
              if (key !== null) setPosition(String(key))
            }}
            className="flex flex-col gap-1"
          >
            <Label className={labelClass}>Vị trí</Label>
            <Select.Trigger className="w-full h-11 bg-surface-dark border border-primary/40 rounded-lg text-text-light px-4 text-sm flex items-center justify-between">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="bg-surface-dark border border-primary/30 rounded-lg overflow-hidden py-1">
                {POSITION_OPTIONS.map((title) => (
                  <ListBoxItem
                    key={title}
                    id={title}
                    className="px-4 py-2.5 text-text-light text-sm hover:bg-primary/20 cursor-pointer outline-none"
                  >
                    {title}
                  </ListBoxItem>
                ))}
                  <ListBoxItem
                    key={"New title"}
                    id={"New title"}
                    className="px-4 py-2.5 text-text-light text-sm hover:bg-primary/20 cursor-pointer outline-none"
                  >
                    New title
                  </ListBoxItem>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Message / Portfolio */}
        <TextField
          value={message}
          onChange={setMessage}
          className="flex flex-col gap-1"
        >
          <Label className={labelClass}>Lời nhắn &amp; Portfolio link</Label>
          <TextArea
            rows={3}
            placeholder="Chia sẻ thêm về đam mê của bạn..."
            className="w-full bg-white/5 border border-primary/40 rounded-lg text-text-light p-4 focus:ring-1 focus:ring-primary transition-all text-sm resize-none placeholder:text-text-light/20"
          />
        </TextField>

        <AppButton
          type="submit"
          className="w-full h-14 text-base uppercase tracking-widest mt-4"
        >
          Gửi hồ sơ ứng tuyển
        </AppButton>

        {submitted && (
          <div className="flex items-center gap-2 text-success text-sm">
            <CheckCircle size={16} strokeWidth={1.5} />
            <span>
              Chúng tôi đã nhận được thông tin của bạn. Sẽ liên hệ trong 1–3
              ngày làm việc.
            </span>
          </div>
        )}
      </form>
    </div>
  )
}
