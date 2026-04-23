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
import { AppButton } from '@/components/hero-ui'

const DEFAULT_CATEGORY_OPTIONS = [
  'Venture Capital',
  'Private Angel',
  'Strategic Partner',
]

interface ContactFormProps {
  title?: string
  categoryLabel?: string
  categoryOptions?: string[]
  notesLabel?: string
  notesPlaceholder?: string
  submitLabel?: string
}

function isValidPhone(value: string) {
  return /^[+\d\s()-]{8,20}$/.test(value.trim())
}

const labelClass = 'text-text-light/60 text-2xs uppercase tracking-widest mb-1 block'
const inputClass =
  'w-full h-11 bg-white/5 border border-primary/40 rounded-lg text-text-light px-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm placeholder:text-text-light/20'

export function ContactForm({
  title = 'Gửi đề xuất hợp tác',
  categoryLabel = 'Lĩnh vực đầu tư',
  categoryOptions = DEFAULT_CATEGORY_OPTIONS,
  notesLabel = 'Ghi chú',
  notesPlaceholder = 'Lời nhắn của bạn...',
  submitLabel = 'Gửi lời mời hợp tác',
}: ContactFormProps) {
  const formCategories =
    categoryOptions.length > 0 ? categoryOptions : DEFAULT_CATEGORY_OPTIONS

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(formCategories[0])
  const [notes, setNotes] = useState('')
  const [phoneError, setPhoneError] = useState<string | undefined>()

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
    // Submission handler — wire to API service when ready
  }

  return (
    <div className="glass-form p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-(--shadow-neu-dark) border border-white/10">
      <h3
        className="text-heading-sm text-text-light font-bold mb-10"
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {title}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Name */}
        <TextField value={name} onChange={setName} className="flex flex-col gap-1">
          <Label className={labelClass}>Họ và tên</Label>
          <Input placeholder="Nguyễn Văn A" className={inputClass} />
        </TextField>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <TextField value={email} onChange={setEmail} className="flex flex-col gap-1">
            <Label className={labelClass}>Email</Label>
            <Input type="email" placeholder="investor@example.com" className={inputClass} />
          </TextField>

          <TextField
            value={phone}
            onChange={setPhone}
            isInvalid={!!phoneError}
            className="flex flex-col gap-1"
          >
            <Label className={labelClass}>Số điện thoại</Label>
            <Input
              type="tel"
              placeholder="+84 xxx xxx xxx"
              onBlur={handlePhoneBlur}
              className={`${inputClass} ${phoneError ? 'border-red-500' : ''}`}
            />
            {phoneError && (
              <p className="text-red-400 text-2xs mt-1 font-medium italic">{phoneError}</p>
            )}
          </TextField>
        </div>

        {/* Category type */}
        <Select
          selectedKey={selectedCategory}
          onSelectionChange={(key: Key | null) => {
            if (key !== null) setSelectedCategory(String(key))
          }}
          className="flex flex-col gap-1"
        >
          <Label className={labelClass}>{categoryLabel}</Label>
          <Select.Trigger className="w-full h-11 bg-surface-dark border border-primary/40 rounded-lg text-text-light px-4 text-sm flex items-center justify-between">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="bg-surface-dark border border-primary/30 rounded-lg overflow-hidden py-1">
              {formCategories.map((type) => (
                <ListBoxItem
                  key={type}
                  id={type}
                  className="px-4 py-2.5 text-text-light text-sm hover:bg-primary/20 cursor-pointer outline-none"
                >
                  {type}
                </ListBoxItem>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Notes */}
        <TextField value={notes} onChange={setNotes} className="flex flex-col gap-1">
          <Label className={labelClass}>{notesLabel}</Label>
          <TextArea
            rows={3}
            placeholder={notesPlaceholder}
            className="w-full bg-white/5 border border-primary/40 rounded-lg text-text-light p-4 focus:ring-1 focus:ring-primary transition-all text-sm resize-none placeholder:text-text-light/20"
          />
        </TextField>

        <AppButton type="submit" className="w-full h-14 text-base uppercase tracking-widest mt-4">
          {submitLabel}
        </AppButton>
      </form>
    </div>
  )
}

