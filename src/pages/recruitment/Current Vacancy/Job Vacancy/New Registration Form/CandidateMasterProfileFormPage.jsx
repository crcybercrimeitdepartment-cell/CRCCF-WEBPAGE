/**
 * ============================================================================
 * CandidateMasterProfileFormPage.jsx - CONSOLIDATED FORM & PAGE MODULE
 * ============================================================================
 *
 * Contains all UI components, context provider, and pages for the application:
 * 1. CandidateMasterProfileFormPage (Default & Named Export) -> Main 15-step form page
 * 2. CandidateMasterProfileForm (Named Export) -> Section fields renderer & layout
 * 3. FormProvider (Named Export) -> Central Form Context provider & state manager
 * 4. ProgressBar (Named Export) -> 15-step interactive progress tracker
 * 5. SectionNavigation (Named Export) -> Bottom form navigation buttons
 * 6. TrustFooter (Named Export) -> Security and trust badges footer
 * 7. PreviewPage (Named Export) -> Review page before submission
 * 8. SuccessPage (Named Export) -> Submission success confirmation screen
 * 9. NotFound (Named Export) -> 404 error page
 *
 * ============================================================================
 */

import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Info,
  UserRound,
  Check,
  ArrowLeft,
  ArrowRight,
  Save,
  BadgeCheck,
  FileBadge,
  Headphones,
  ShieldCheck,
  ChevronDown,
  Search,
  Send,
  CheckCircle2,
  AlertCircle,
  User, Mail, Phone, Calendar, MapPin, Briefcase, GraduationCap, Award, FileText, Building, Hash, Languages, Globe, Activity, Link as LinkIcon
} from 'lucide-react'
import applicationSections, { FormContext, useFormContext } from './CandidateMasterProfileFormPageData'

// ============================================================================
// ICON MAPPING FUNCTION
// ============================================================================
const getFieldIcon = (fieldName, fieldType) => {
  const lower = fieldName.toLowerCase()
  if (lower.includes('name') || lower.includes('spouse') || lower.includes('father') || lower.includes('mother') || lower.includes('gender')) return User
  if (lower.includes('email')) return Mail
  if (lower.includes('mobile') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('contact')) return Phone
  if (lower.includes('date') || lower.includes('year') || lower.includes('dob') || lower.includes('session') || lower.includes('period') || lower.includes('duration') || lower.includes('time')) return Calendar
  if (lower.includes('address') || lower.includes('city') || lower.includes('state') || lower.includes('pin') || lower.includes('location') || lower.includes('place')) return MapPin
  if (lower.includes('occupation') || lower.includes('company') || lower.includes('employment') || lower.includes('designation') || lower.includes('role') || lower.includes('internship') || lower.includes('work')) return Briefcase
  if (lower.includes('school') || lower.includes('college') || lower.includes('university') || lower.includes('institute') || lower.includes('degree') || lower.includes('qualification') || lower.includes('diploma') || lower.includes('iti') || lower.includes('bachelor') || lower.includes('master') || lower.includes('stream') || lower.includes('board') || lower.includes('study')) return GraduationCap
  if (lower.includes('certificate') || lower.includes('certification') || lower.includes('marks') || lower.includes('grade') || lower.includes('percentage') || lower.includes('cgpa') || lower.includes('result') || lower.includes('division')) return Award
  if (lower.includes('skill') || lower.includes('language') || lower.includes('tongue')) return Languages
  if (lower.includes('nationality') || lower.includes('country') || lower.includes('religion') || lower.includes('community') || lower.includes('caste')) return Globe
  if (lower.includes('blood') || lower.includes('height') || lower.includes('weight') || lower.includes('disability') || lower.includes('mark') || lower.includes('age') || lower.includes('status')) return Activity
  if (lower.includes('url') || lower.includes('link') || lower.includes('profile') || lower.includes('website')) return LinkIcon
  if (lower.includes('number') || lower.includes('id') || lower.includes('roll') || lower.includes('code') || lower.includes('pan') || lower.includes('aadhaar')) return Hash
  
  if (fieldType === 'email') return Mail
  if (fieldType === 'tel') return Phone
  if (fieldType === 'number') return Hash
  if (fieldType === 'url') return LinkIcon

  return FileText
}

// ============================================================================
// CUSTOM SELECT COMPONENT (Strictly Opens Downwards / Niche)
// ============================================================================

/**
 * CustomSelect Component - Replaces native HTML <select> so dropdown always opens DOWNWARDS (niche).
 * Includes click-outside detection, option searching for long lists (e.g. Board names),
 * and handles 'Other' option specification input.
 */
function CustomSelect({ field, value, onChange, controlClassName }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [openUpwards, setOpenUpwards] = useState(false)
  const dropdownRef = useRef(null)
  const hiddenInputRef = useRef(null)

  const hasOtherOption = field.options?.includes('Other')
  const isOtherMode =
    hasOtherOption &&
    (value === 'Other' || (value !== '' && !field.options?.includes(value)))

  const selectDisplayValue = isOtherMode ? 'Other' : value

  // Clear custom validity whenever value updates
  useEffect(() => {
    if (hiddenInputRef.current && selectDisplayValue) {
      hiddenInputRef.current.setCustomValidity('')
    }
  }, [selectDisplayValue, isOtherMode])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = useMemo(() => {
    if (!field.options) return []
    if (!searchTerm.trim()) return field.options
    return field.options.filter((opt) =>
      opt.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [field.options, searchTerm])

  const handleSelectOption = (optionValue) => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.setCustomValidity('')
    }
    onChange({ target: { name: field.name, value: optionValue } })
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleOtherTextChange = (e) => {
    onChange({ target: { name: field.name, value: e.target.value } })
  }

  const handleToggle = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      // If less than 240px below and more room above, open upwards
      setOpenUpwards(spaceBelow < 240 && spaceAbove > spaceBelow)
    }
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className={`relative ${isOpen ? 'z-30' : ''}`} ref={dropdownRef}>
        {/* Hidden input for HTML5 form validation */}
        <input
          ref={hiddenInputRef}
          type="text"
          tabIndex={-1}
          required={field.required && !isOtherMode}
          value={selectDisplayValue || ''}
          onChange={() => {
            if (hiddenInputRef.current) {
              hiddenInputRef.current.setCustomValidity('')
            }
          }}
          className="absolute inset-0 h-full w-full opacity-0 pointer-events-none z-[-1]"
          onInvalid={(e) => {
            if (!selectDisplayValue) {
              const cleanPlaceholder = field.placeholder
                ? field.placeholder.replace(/^Select\s+/i, '')
                : 'an option'
              e.target.setCustomValidity(`Please select ${cleanPlaceholder}`)
            } else {
              e.target.setCustomValidity('')
            }
          }}
          onInput={(e) => {
            e.target.setCustomValidity('')
          }}
        />

        {/* Field Icon */}
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-[#f1f5f9] text-[#071733] z-10 pointer-events-none transition-colors group-focus-within:bg-[#071733] group-focus-within:text-amber-400">
          {(() => {
            const FieldIcon = getFieldIcon(field.name, field.type)
            return <FieldIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-3.5 lg:w-3.5" />
          })()}
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          id={field.name}
          onClick={handleToggle}
          className={`${controlClassName} flex items-center justify-between text-left cursor-pointer bg-white ${!selectDisplayValue ? 'text-slate-500' : 'text-slate-900 font-medium'
            }`}
        >
          <span className="truncate">
            {selectDisplayValue || field.placeholder || 'Select...'}
          </span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#071733]' : ''
              }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className={`absolute left-0 right-0 z-50 max-h-64 overflow-hidden rounded-md border border-slate-300 bg-white shadow-2xl text-xs sm:text-sm ${
            openUpwards ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}>
            {/* Search Box if options count > 5 */}
            {field.options?.length > 5 && (
              <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
                <div className="relative flex items-center">
                  <Search size={14} className="absolute left-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search option..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full rounded border border-slate-300 bg-white pl-8 pr-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-[#071733]"
                    autoFocus
                  />
                </div>
              </div>
            )}

            <div className="max-h-52 overflow-y-auto py-1 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
              <button
                type="button"
                onClick={() => handleSelectOption('')}
                className="w-full px-3 py-2 text-left text-slate-400 hover:bg-slate-100 text-xs italic border-0 border-b border-slate-100 bg-transparent outline-none focus:outline-none cursor-pointer"
              >
                {field.placeholder || 'Select option...'}
              </button>

              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selectDisplayValue === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className={`w-full px-3 py-2 text-left transition-colors flex items-center justify-between text-xs sm:text-sm border-0 border-none outline-none focus:outline-none cursor-pointer ${isSelected
                          ? 'bg-[#071733] text-amber-400 font-semibold'
                          : 'bg-transparent text-slate-800 hover:bg-amber-50 hover:text-[#071733]'
                        }`}
                    >
                      <span className="truncate">{option}</span>
                      {isSelected && <Check size={16} className="text-amber-400 ml-2 shrink-0" />}
                    </button>
                  )
                })
              ) : (
                <div className="px-3 py-3 text-center text-xs text-slate-500">
                  No matching options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Text input shown when 'Other' is selected */}
      {isOtherMode && (
        <div className="relative mt-2">
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-[#f1f5f9] text-[#071733] z-10 pointer-events-none transition-colors">
            {(() => {
              const FieldIcon = getFieldIcon(field.name, field.type)
              return <FieldIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-3.5 lg:w-3.5" />
            })()}
          </div>
          <input
            type="text"
            name={field.name}
            value={value === 'Other' ? '' : value}
            onChange={handleOtherTextChange}
            placeholder="Please specify..."
            required={field.required}
            autoFocus
            className={controlClassName}
          />
        </div>
      )}
    </div>
  )
}

// ============================================================================
// AGE CALCULATION & DATE OF BIRTH VALIDATION
// ============================================================================

/**
 * validateDateOfBirth() - Validates Date of Birth format, validity, future dates, and minimum age (>10).
 *
 * @param {string} dobStr - Date string "DD/MM/YYYY" or "YYYY-MM-DD"
 * @returns {object} { isValid: boolean, age?: number, status: string, message: string }
 */
export function validateDateOfBirth(dobStr) {
  if (!dobStr || typeof dobStr !== 'string') {
    return { isValid: false, status: 'empty', message: 'Date of birth is required.' }
  }

  const clean = dobStr.trim()
  let day, month, year

  if (clean.includes('-')) {
    const parts = clean.split('-').map(Number)
    if (parts.length === 3) [year, month, day] = parts
  } else if (clean.includes('/')) {
    const parts = clean.split('/').map(Number)
    if (parts.length === 3) [day, month, year] = parts
  }

  if (!day || !month || !year || String(year).length !== 4) {
    return { isValid: false, status: 'incomplete', message: 'Please enter complete Date of Birth in DD/MM/YYYY format.' }
  }

  if (month < 1 || month > 12) {
    return { isValid: false, status: 'invalid_month', message: 'Month must be between 01 and 12.' }
  }

  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) {
    return { isValid: false, status: 'invalid_day', message: `Day must be between 01 and ${daysInMonth} for the selected month.` }
  }

  if (year < 1920) {
    return { isValid: false, status: 'invalid_year', message: 'Please enter a valid year of birth (after 1920).' }
  }

  const dobDate = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dobDate.setHours(0, 0, 0, 0)

  // Disallow future date of birth
  if (dobDate > today) {
    return { isValid: false, status: 'future_date', message: 'Date of birth cannot be in the future.' }
  }

  // Calculate age
  let age = today.getFullYear() - dobDate.getFullYear()
  const monthDiff = today.getMonth() - dobDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age -= 1
  }

  // Candidates aged 0 to 10 years are not allowed to fill the form
  if (age <= 10) {
    return {
      isValid: false,
      age,
      status: 'underage',
      message: `Age is ${age} year${age === 1 ? '' : 's'}. Candidates aged 0 to 10 years are not eligible to apply (minimum age must be above 10 years).`
    }
  }

  return {
    isValid: true,
    age,
    status: 'valid',
    message: `Valid Date of Birth (Age: ${age} Years)`
  }
}

/**
 * calculateAge() - Date of Birth se age calculate karta hai.
 *
 * @param {string} dateOfBirth - Date string "DD/MM/YYYY" ya "YYYY-MM-DD" format mein
 * @returns {string} Age as string (e.g., "25"), ya empty string agar date invalid hai
 */
function calculateAge(dateOfBirth) {
  const res = validateDateOfBirth(dateOfBirth)
  if (res.isValid && res.age !== undefined) {
    return String(res.age)
  }
  return ''
}

/**
 * validateYearOfPassing() - Validates education passing year.
 * Ensures 4 digits, 1950 <= year <= currentYear, and year >= birthYear + 10 (if candidate's DOB provided).
 *
 * @param {string|number} yearStr - Year string or number
 * @param {string} dobStr - Candidate's DOB in "DD/MM/YYYY" format
 * @returns {object} { isValid: boolean, status: string, message: string }
 */
export function validateYearOfPassing(yearStr, dobStr = '') {
  if (!yearStr && yearStr !== 0) {
    return { isValid: false, status: 'empty', message: 'Year of passing is required.' }
  }

  const str = String(yearStr).trim()
  if (!/^\d{4}$/.test(str)) {
    return { isValid: false, status: 'invalid_format', message: 'Please enter a valid 4-digit passing year (e.g., 2018).' }
  }

  const yearNum = parseInt(str, 10)
  const currentYear = new Date().getFullYear()

  if (yearNum < 1950) {
    return { isValid: false, status: 'too_early', message: 'Year of passing cannot be earlier than 1950.' }
  }

  if (yearNum > currentYear) {
    return { isValid: false, status: 'future', message: `Year of passing cannot be in the future (maximum ${currentYear}).` }
  }

  // Candidate must have completed 10th at reasonable age (at least 10 years after birth)
  if (dobStr && typeof dobStr === 'string') {
    let birthYear = null
    if (dobStr.includes('/')) {
      const parts = dobStr.split('/')
      if (parts.length === 3 && parts[2]?.length === 4) birthYear = parseInt(parts[2], 10)
    } else if (dobStr.includes('-')) {
      const parts = dobStr.split('-')
      if (parts.length === 3 && parts[0]?.length === 4) birthYear = parseInt(parts[0], 10)
    }

    if (birthYear && !isNaN(birthYear)) {
      if (yearNum < birthYear + 10) {
        return {
          isValid: false,
          status: 'before_minimum_age',
          message: `Year of passing (${yearNum}) cannot be earlier than birth year + 10 years (${birthYear + 10}).`
        }
      }
    }
  }

  return { isValid: true, status: 'valid', message: `Valid Passing Year (${yearNum})` }
}

/**
 * validateMarks() - Validates obtained and maximum marks.
 * Ensures maximum marks > 0, marks obtained >= 0, and marks obtained <= maximum marks.
 *
 * @param {string|number} obtainedVal - Total marks obtained
 * @param {string|number} maxVal - Maximum marks
 * @returns {object} { isValid: boolean, field?: string, message: string }
 */
export function validateMarks(obtainedVal, maxVal) {
  const obtStr = String(obtainedVal ?? '').trim()
  const maxStr = String(maxVal ?? '').trim()

  if (!obtStr && !maxStr) {
    return { isValid: true, status: 'empty', message: '' }
  }

  const obtNum = parseFloat(obtStr)
  const maxNum = parseFloat(maxStr)

  if (maxStr !== '') {
    if (isNaN(maxNum) || maxNum <= 0) {
      return { isValid: false, field: 'max', message: 'Maximum marks must be greater than 0.' }
    }
  }

  if (obtStr !== '') {
    if (isNaN(obtNum) || obtNum < 0) {
      return { isValid: false, field: 'obtained', message: 'Marks obtained cannot be negative.' }
    }
  }

  if (obtStr !== '' && maxStr !== '' && !isNaN(obtNum) && !isNaN(maxNum)) {
    if (obtNum > maxNum) {
      return {
        isValid: false,
        field: 'obtained',
        message: `Total marks obtained (${obtNum}) cannot exceed maximum marks (${maxNum}).`
      }
    }
  }

  return { isValid: true, status: 'valid', message: 'Valid marks' }
}

/**
 * validateCertificateIssueDate() - Validates certificate issue date.
 * Format DD/MM/YYYY, not in the future, not earlier than passing year.
 *
 * @param {string} dateStr - Date string in DD/MM/YYYY
 * @param {string|number} yearOfPassing - Year of passing
 * @returns {object} { isValid: boolean, status: string, message: string }
 */
export function validateCertificateIssueDate(dateStr, yearOfPassing = '') {
  if (!dateStr || typeof dateStr !== 'string') {
    return { isValid: true, status: 'empty', message: '' }
  }

  const clean = dateStr.trim()
  if (!clean) return { isValid: true, status: 'empty', message: '' }

  let day, month, year
  if (clean.includes('/')) {
    const parts = clean.split('/').map(Number)
    if (parts.length === 3) [day, month, year] = parts
  } else if (clean.includes('-')) {
    const parts = clean.split('-').map(Number)
    if (parts.length === 3) [year, month, day] = parts
  }

  if (!day || !month || !year || String(year).length !== 4) {
    return { isValid: false, status: 'incomplete', message: 'Enter complete date in DD/MM/YYYY format.' }
  }

  if (month < 1 || month > 12) {
    return { isValid: false, status: 'invalid_month', message: 'Month must be between 01 and 12.' }
  }

  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) {
    return { isValid: false, status: 'invalid_day', message: `Day must be between 01 and ${daysInMonth}.` }
  }

  if (year < 1950) {
    return { isValid: false, status: 'too_early', message: 'Issue year cannot be before 1950.' }
  }

  const certDate = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  certDate.setHours(0, 0, 0, 0)

  if (certDate > today) {
    return { isValid: false, status: 'future_date', message: 'Certificate issue date cannot be in the future.' }
  }

  if (yearOfPassing) {
    const passYearNum = parseInt(yearOfPassing, 10)
    if (!isNaN(passYearNum) && year < passYearNum) {
      return {
        isValid: false,
        status: 'before_passing_year',
        message: `Issue date year (${year}) cannot be earlier than passing year (${passYearNum}).`
      }
    }
  }

  return { isValid: true, status: 'valid', message: 'Valid Certificate Issue Date' }
}

// ============================================================================
// VALIDATION RULES (Form Input Validation)
// ============================================================================

export const CANDIDATE_MOBILE_FIELDS = [
  'mobileNumber',
  'whatsappNumber',
  'alternateMobileNumber',
  'personalMobileNumber',
  'emergencyContactMobileNumber',
  'preferredContactNumber',
  'travelMobileNumber',
]

const validationRules = {
  alphabet: {
    pattern: "^[a-zA-Z][a-zA-Z\\s\\.]*$",
    title: "Must start with a letter and contain only alphabets, spaces, and dots."
  },
  mobile: {
    pattern: "^[6-9]\\d{9}$",
    title: "Must be a valid 10-digit mobile number starting with 6, 7, 8, or 9."
  },
  aadhaar: {
    pattern: "^\\d{12}$",
    title: "Must be a 12-digit Aadhaar number."
  },
  pan: {
    pattern: "^[a-zA-Z]{5}\\d{4}[a-zA-Z]{1}$",
    title: "Must be a valid 10-character PAN (e.g., ABCDE1234F)."
  },
  pincode: {
    pattern: "^\\d{6}$",
    title: "Must be a 6-digit PIN code."
  },
  percentage: {
    pattern: "^\\d{1,3}(\\.\\d{1,2})?%?$",
    title: "Must be a valid percentage (e.g., 95.5%) or CGPA (e.g., 9.8)."
  },
  yearOfPassing: {
    pattern: "^[1-2][0-9]{3}$",
    title: "Must be a valid 4-digit year (e.g., 2018)."
  }
}

const getValidationRule = (fieldName) => {
  const alphabetFields = [
    'candidateFullName',
    'fathersName',
    'mothersName',
    'nationality',
    'placeOfBirth',
    'religion',
    'emergencyContactPersonName',
    'emergencyContactRelationship',
    'nameAsPerAadhaarCard',
    'nameAsPerPanCard',
    'cityTownVillage',
    'districtName',
    'state',
    'country',
    'policeStation',
    'tehsilBlock'
  ]

  if (alphabetFields.includes(fieldName)) return validationRules.alphabet
  if (CANDIDATE_MOBILE_FIELDS.includes(fieldName)) return validationRules.mobile
  if (fieldName === 'aadhaarNumber') return validationRules.aadhaar
  if (fieldName === 'panNumber') return validationRules.pan
  if (fieldName === 'postalPinCode') return validationRules.pincode
  if (fieldName === 'percentageCgpa') return validationRules.percentage
  if (fieldName.toLowerCase().includes('yearofpassing')) return validationRules.yearOfPassing

  return null
}

const getNumericLimits = (fieldName) => {
  const currentYear = new Date().getFullYear()
  const lower = fieldName.toLowerCase()

  if (fieldName === 'communicationSkillsSelfRating') {
    return { min: 1, max: 10 }
  }
  if (lower.includes('yearofpassing') || lower.includes('passingyear') || fieldName === 'residingSinceYear') {
    return { min: 1950, max: currentYear }
  }
  if (lower.includes('maximummarks')) {
    return { min: 1, max: 10000 }
  }
  if (lower.includes('marksobtained')) {
    return { min: 0, max: 10000 }
  }
  if (fieldName === 'totalFamilyMembers') {
    return { min: 1 }
  }
  if (fieldName === 'heightCm') {
    return { min: 30, max: 300 }
  }
  if (fieldName === 'weightKg') {
    return { min: 10, max: 500 }
  }
  return { min: 0 }
}

// ============================================================================
// FIELD CONTROL COMPONENT
// ============================================================================

function FieldControl({ field, value, onChange, formData = {} }) {
  const [isTouched, setIsTouched] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isCandidateMobileField = CANDIDATE_MOBILE_FIELDS.includes(field.name)
  const valStr = String(value || '')
  const isCompleteValid = isCandidateMobileField && /^[6-9]\d{9}$/.test(valStr)
  const startsWrong = isCandidateMobileField && valStr.length > 0 && !/^[6-9]/.test(valStr)
  const isTooShort = isCandidateMobileField && valStr.length > 0 && valStr.length < 10 && !startsWrong
  const isInvalid = isCandidateMobileField && valStr.length > 0 && !isCompleteValid

  const isDobField = field.name === 'dateOfBirth'
  const dobValidation = isDobField && valStr.length > 0 ? validateDateOfBirth(valStr) : null
  const isDobValid = isDobField && dobValidation?.isValid
  const isDobIncomplete = isDobField && valStr.length > 0 && valStr.length < 10
  const isDobInvalid = isDobField && valStr.length === 10 && !isDobValid

  // Year of passing fields (e.g., tenthYearOfPassing)
  const isYearField = field.name.toLowerCase().includes('yearofpassing')
  const yearValidation = isYearField && valStr.length > 0 ? validateYearOfPassing(valStr, formData.dateOfBirth) : null
  const isYearValid = isYearField && yearValidation?.isValid
  const isYearIncomplete = isYearField && valStr.length > 0 && valStr.length < 4
  const isYearInvalid = isYearField && ((valStr.length === 4 && !isYearValid) || valStr === '0')

  // Marks fields (tenthTotalMarksObtained, tenthMaximumMarks)
  const isTenthMarksObtained = field.name === 'tenthTotalMarksObtained'
  const isTenthMaxMarks = field.name === 'tenthMaximumMarks'
  const currentMarksObt = isTenthMarksObtained ? valStr : (formData.tenthTotalMarksObtained || '')
  const currentMaxMarks = isTenthMaxMarks ? valStr : (formData.tenthMaximumMarks || '')
  const marksValidation = (isTenthMarksObtained || isTenthMaxMarks) && (currentMarksObt || currentMaxMarks)
    ? validateMarks(currentMarksObt, currentMaxMarks)
    : null
  const marksErrorForThisField = marksValidation && !marksValidation.isValid && (
    (marksValidation.field === 'max' && isTenthMaxMarks) ||
    (marksValidation.field === 'obtained' && isTenthMarksObtained)
  )

  // Certificate Issue Date (generic for 10th, 12th, ITI, Diploma, Other, Degree, Master)
  const isCertDateField =
    field.name.toLowerCase().endsWith('certificateissuedate') ||
    field.name.toLowerCase().endsWith('certificatedate') ||
    field.name.toLowerCase().endsWith('dateofissue')

  let relatedYearOfPassing = ''
  if (field.name.startsWith('twelfth')) {
    relatedYearOfPassing = formData.twelfthYearOfPassing || formData.tenthYearOfPassing
  } else if (field.name.startsWith('iti')) {
    relatedYearOfPassing = formData.itiYearOfPassing || formData.tenthYearOfPassing
  } else if (field.name.startsWith('diploma')) {
    relatedYearOfPassing = formData.diplomaYearOfPassing || formData.tenthYearOfPassing
  } else if (field.name.startsWith('otherQual')) {
    relatedYearOfPassing = formData.otherQualYearOfPassing || formData.tenthYearOfPassing
  } else if (field.name.startsWith('bachelor')) {
    relatedYearOfPassing = formData.bachelorGraduationYear || formData.twelfthYearOfPassing
  } else if (field.name.startsWith('master')) {
    relatedYearOfPassing = formData.masterGraduationYear || formData.bachelorGraduationYear
  } else if (field.name.startsWith('tenth')) {
    relatedYearOfPassing = formData.tenthYearOfPassing
  }

  const certDateValidation = isCertDateField && valStr.length > 0
    ? validateCertificateIssueDate(valStr, relatedYearOfPassing)
    : null
  const isCertDateValid = isCertDateField && certDateValidation?.isValid
  const isCertDateIncomplete = isCertDateField && valStr.length > 0 && valStr.length < 10
  const isCertDateInvalid = isCertDateField && valStr.length === 10 && !isCertDateValid

  const isNameField = [
    'candidateFirstName',
    'candidateMiddleName',
    'candidateLastName',
    'fathersFirstName',
    'fathersMiddleName',
    'fathersLastName',
    'mothersFirstName',
    'mothersMiddleName',
    'mothersLastName',
    'spouseFirstName',
    'spouseMiddleName',
    'spouseLastName',
    'candidateFullName',
    'fathersName',
    'mothersName',
    'emergencyContactPersonName',
    'nameAsPerAadhaarCard',
    'nameAsPerPanCard',
    'travelCandidateFullName',
    'trainerSupervisorName',
    'nickname',
    'relativeNameRelationship',
    'panNumber',
  ].includes(field.name)

  const isEmailField =
    field.type === 'email' ||
    [
      'emailId',
      'alternateEmailId',
      'trainerSupervisorEmailId',
      'travelEmailId',
    ].includes(field.name)

  let fieldBorderClass = ''
  if (isCandidateMobileField && valStr.length > 0) {
    if (isCompleteValid) {
      fieldBorderClass = 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-100 pr-10'
    } else if (isTouched || !isFocused) {
      fieldBorderClass = 'border-red-500 focus:border-red-500 focus:ring-red-100 pr-10'
    }
  } else if (isDobField && valStr.length > 0) {
    if (isDobValid) {
      fieldBorderClass = 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-100 pr-10'
    } else if (valStr.length === 10 || (isTouched && !isFocused)) {
      fieldBorderClass = 'border-red-500 focus:border-red-500 focus:ring-red-100 pr-10'
    }
  } else if (isYearField && valStr.length > 0) {
    if (isYearValid) {
      fieldBorderClass = 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-100 pr-10'
    } else if (valStr.length === 4 || valStr === '0' || (isTouched && !isFocused)) {
      fieldBorderClass = 'border-red-500 focus:border-red-500 focus:ring-red-100 pr-10'
    }
  } else if ((isTenthMarksObtained || isTenthMaxMarks) && valStr.length > 0) {
    if (marksErrorForThisField) {
      fieldBorderClass = 'border-red-500 focus:border-red-500 focus:ring-red-100 pr-10'
    } else if (marksValidation?.isValid && currentMarksObt && currentMaxMarks) {
      fieldBorderClass = 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-100 pr-10'
    }
  } else if (isCertDateField && valStr.length > 0) {
    if (isCertDateValid) {
      fieldBorderClass = 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-100 pr-10'
    } else if (valStr.length === 10 || (isTouched && !isFocused)) {
      fieldBorderClass = 'border-red-500 focus:border-red-500 focus:ring-red-100 pr-10'
    }
  }

  const controlClassName =
    `h-12 w-full rounded-md border bg-white pl-12 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#071733] focus:ring-4 focus:ring-amber-100 read-only:bg-slate-50 read-only:text-slate-500 sm:h-14 sm:pl-14 sm:pr-4 lg:h-10 lg:pl-10 lg:pr-3 lg:text-xs ${
      isEmailField ? 'lowercase' : isNameField ? 'uppercase' : ''
    } ${fieldBorderClass || 'border-slate-300'}`

  if (field.type === 'select') {
    return (
      <CustomSelect
        field={field}
        value={value}
        onChange={onChange}
        controlClassName={controlClassName}
      />
    )
  }

  if (field.type === 'textarea') {
    const FieldIcon = getFieldIcon(field.name, field.type)
    return (
      <div className="relative group">
        <div className="absolute left-1.5 top-1.5 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-[#f1f5f9] text-[#071733] z-10 pointer-events-none transition-colors group-focus-within:bg-[#071733] group-focus-within:text-amber-400">
          <FieldIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-3.5 lg:w-3.5" />
        </div>
        <textarea
          id={field.name}
          name={field.name}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          rows={3}
          className={`min-h-24 w-full resize-y rounded-md border border-slate-300 bg-white pl-12 pr-3 py-3 sm:py-4 lg:py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#071733] focus:ring-4 focus:ring-amber-100 sm:pl-14 sm:pr-4 lg:min-h-14 lg:pl-10 lg:text-xs ${isNameField ? 'uppercase' : ''
            }`}
        />
      </div>
    )
  }

  const rule = getValidationRule(field.name)
  const limits = (field.type === 'number' || isYearField) ? getNumericLimits(field.name) : {}
  const FieldIcon = getFieldIcon(field.name, field.type)

  const handleKeyDown = (e) => {
    if (isCandidateMobileField) {
      // Allow navigation and shortcut keys
      if (
        [
          'Backspace',
          'Delete',
          'Tab',
          'Escape',
          'Enter',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Home',
          'End',
        ].includes(e.key) ||
        e.ctrlKey ||
        e.metaKey
      ) {
        return
      }
      // Block non-digit characters
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault()
        return
      }
      // Block typing beyond 10 digits if text is not selected
      const target = e.target
      if (
        target.value.length >= 10 &&
        target.selectionStart === target.selectionEnd
      ) {
        e.preventDefault()
      }
    } else if (isYearField) {
      if (
        [
          'Backspace',
          'Delete',
          'Tab',
          'Escape',
          'Enter',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Home',
          'End',
        ].includes(e.key) ||
        e.ctrlKey ||
        e.metaKey
      ) {
        return
      }
      // Block non-digit characters
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault()
        return
      }
      // Prevent entering 0 as first digit for year
      if (e.target.value.length === 0 && e.key === '0') {
        e.preventDefault()
        return
      }
      // Block typing beyond 4 digits if text is not selected
      const target = e.target
      if (
        target.value.length >= 4 &&
        target.selectionStart === target.selectionEnd
      ) {
        e.preventDefault()
      }
    }
  }

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-[#f1f5f9] text-[#071733] z-10 pointer-events-none transition-colors group-focus-within:bg-[#071733] group-focus-within:text-amber-400">
          <FieldIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-3.5 lg:w-3.5" />
        </div>
        <input
          id={field.name}
          type={isCandidateMobileField ? 'tel' : isYearField ? 'text' : (field.type || 'text')}
          name={field.name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false)
            setIsTouched(true)
            if (isCandidateMobileField) {
              if (valStr.length > 0 && !isCompleteValid) {
                if (startsWrong) {
                  e.target.setCustomValidity('Must start with 6, 7, 8, or 9.')
                } else if (isTooShort) {
                  e.target.setCustomValidity(`Must be exactly 10 digits (currently ${valStr.length} digits).`)
                } else {
                  e.target.setCustomValidity('Must be a valid 10-digit mobile number starting with 6, 7, 8, or 9.')
                }
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isDobField) {
              if (valStr.length > 0) {
                if (valStr.length < 10) {
                  e.target.setCustomValidity('Please enter complete Date of Birth in DD/MM/YYYY format.')
                } else if (!dobValidation?.isValid) {
                  e.target.setCustomValidity(dobValidation?.message || 'Invalid Date of Birth')
                } else {
                  e.target.setCustomValidity('')
                }
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isYearField) {
              if (valStr.length > 0) {
                if (!yearValidation?.isValid) {
                  e.target.setCustomValidity(yearValidation?.message || 'Please enter a valid 4-digit passing year.')
                } else {
                  e.target.setCustomValidity('')
                }
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isTenthMarksObtained || isTenthMaxMarks) {
              if (marksErrorForThisField) {
                e.target.setCustomValidity(marksValidation?.message || 'Invalid marks entered.')
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isCertDateField) {
              if (valStr.length > 0) {
                if (valStr.length < 10) {
                  e.target.setCustomValidity('Please enter complete Certificate Issue Date in DD/MM/YYYY format.')
                } else if (!certDateValidation?.isValid) {
                  e.target.setCustomValidity(certDateValidation?.message || 'Invalid Certificate Issue Date.')
                } else {
                  e.target.setCustomValidity('')
                }
              } else {
                e.target.setCustomValidity('')
              }
            }
          }}
          placeholder={field.placeholder}
          required={field.required}
          readOnly={field.readOnly}
          step={field.type === 'number' ? 'any' : undefined}
          inputMode={isCandidateMobileField || isDobField || isYearField ? 'numeric' : (field.type === 'number' ? 'decimal' : field.inputMode)}
          pattern={isYearField ? '^[1-2][0-9]{3}$' : rule?.pattern}
          minLength={isCandidateMobileField ? 10 : isYearField ? 4 : undefined}
          maxLength={
            isCandidateMobileField
              ? 10
              : isDobField || isCertDateField
                ? 10
                : isYearField
                  ? 4
                  : field.name === 'aadhaarNumber'
                    ? 12
                    : field.name === 'postalPinCode'
                      ? 6
                      : field.name === 'panNumber'
                        ? 10
                        : undefined
          }
          title={isYearField ? 'Must be a 4-digit valid year (e.g., 2018)' : rule?.title}
          min={limits.min}
          max={limits.max}
          onInvalid={(e) => {
            if (isCandidateMobileField) {
              if (e.target.validity.valueMissing) {
                e.target.setCustomValidity(`Please enter your active 10-digit ${field.label || 'mobile number'}`)
              } else if (startsWrong) {
                e.target.setCustomValidity('Must start with 6, 7, 8, or 9.')
              } else if (isTooShort || e.target.validity.patternMismatch || e.target.validity.tooShort) {
                e.target.setCustomValidity(`Must be exactly 10 digits starting with 6-9 (currently ${valStr.length} digits).`)
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isDobField) {
              if (e.target.validity.valueMissing) {
                e.target.setCustomValidity('Date of Birth is required.')
              } else if (!dobValidation?.isValid) {
                e.target.setCustomValidity(dobValidation?.message || 'Please enter a valid Date of Birth.')
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isYearField) {
              if (e.target.validity.valueMissing) {
                e.target.setCustomValidity(`${field.label || 'Year of Passing'} is required.`)
              } else if (!yearValidation?.isValid) {
                e.target.setCustomValidity(yearValidation?.message || 'Please enter a valid 4-digit year (e.g., 2018).')
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isTenthMarksObtained || isTenthMaxMarks) {
              if (e.target.validity.valueMissing) {
                e.target.setCustomValidity(`${field.label || 'Marks'} is required.`)
              } else if (marksErrorForThisField) {
                e.target.setCustomValidity(marksValidation?.message || 'Invalid marks.')
              } else {
                e.target.setCustomValidity('')
              }
            } else if (isCertDateField) {
              if (!certDateValidation?.isValid) {
                e.target.setCustomValidity(certDateValidation?.message || 'Please enter a valid Certificate Issue Date.')
              } else {
                e.target.setCustomValidity('')
              }
            } else if (
              (e.target.validity.patternMismatch || e.target.validity.tooShort) &&
              rule?.title
            ) {
              e.target.setCustomValidity(rule.title)
            } else {
              e.target.setCustomValidity('')
            }
          }}
          onInput={(e) => {
            e.target.setCustomValidity('')
          }}
          className={controlClassName}
        />

        {/* Valid Checkmark Icon inside input on right */}
        {(
          (isCandidateMobileField && isCompleteValid) ||
          (isDobField && isDobValid) ||
          (isYearField && isYearValid) ||
          ((isTenthMarksObtained || isTenthMaxMarks) && marksValidation?.isValid && currentMarksObt && currentMaxMarks) ||
          (isCertDateField && isCertDateValid)
        ) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-emerald-600">
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
        )}

        {/* Invalid Alert Icon inside input on right for completed invalid inputs */}
        {(
          (isCandidateMobileField && (startsWrong || (!isFocused && isInvalid))) ||
          (isDobField && isDobInvalid) ||
          (isYearField && (valStr.length === 4 || valStr === '0' || (isTouched && !isFocused && !isYearValid)) && isYearInvalid) ||
          ((isTenthMarksObtained || isTenthMaxMarks) && marksErrorForThisField) ||
          (isCertDateField && isCertDateInvalid)
        ) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-red-500">
            <AlertCircle size={18} className="text-red-500" />
          </div>
        )}
      </div>

      {/* Live Helper / Validation Status Text below input for Mobile Fields */}
      {isCandidateMobileField && valStr.length > 0 && (
        <div className="mt-1 px-0.5">
          {startsWrong ? (
            <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
              <span>⚠️ Must start with 6, 7, 8, or 9</span>
            </p>
          ) : isTooShort ? (
            <p className="text-xs font-medium text-amber-600 flex items-center justify-between">
              <span>Enter 10 digits ({valStr.length}/10 entered)</span>
              <span className="font-bold">{10 - valStr.length} more needed</span>
            </p>
          ) : isCompleteValid ? (
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check size={12} className="stroke-[3]" /> Valid 10-digit number
            </p>
          ) : null}
        </div>
      )}

      {/* Live Helper / Validation Status Text below input for Date of Birth */}
      {isDobField && valStr.length > 0 && (
        <div className="mt-1 px-0.5">
          {isDobIncomplete ? (
            <p className="text-xs font-medium text-amber-600 flex items-center justify-between">
              <span>Enter complete date (DD/MM/YYYY)</span>
              <span className="font-bold">{10 - valStr.length} chars needed</span>
            </p>
          ) : isDobValid ? (
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check size={12} className="stroke-[3]" /> {dobValidation.message}
            </p>
          ) : isDobInvalid ? (
            <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
              <span>⚠️ {dobValidation.message}</span>
            </p>
          ) : null}
        </div>
      )}

      {/* Live Helper / Validation Status Text below input for Year of Passing */}
      {isYearField && valStr.length > 0 && (
        <div className="mt-1 px-0.5">
          {valStr.length < 4 && valStr !== '0' ? (
            <p className="text-xs font-medium text-amber-600 flex items-center justify-between">
              <span>Enter 4-digit passing year (e.g., 2018)</span>
              <span className="font-bold">{4 - valStr.length} digits needed</span>
            </p>
          ) : isYearValid ? (
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check size={12} className="stroke-[3]" /> {yearValidation.message}
            </p>
          ) : isYearInvalid ? (
            <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
              <span>⚠️ {yearValidation.message}</span>
            </p>
          ) : null}
        </div>
      )}

      {/* Live Helper / Validation Status Text below input for Marks */}
      {(isTenthMarksObtained || isTenthMaxMarks) && marksErrorForThisField && (
        <div className="mt-1 px-0.5">
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
            <span>⚠️ {marksValidation.message}</span>
          </p>
        </div>
      )}

      {/* Live Helper / Validation Status Text below input for Certificate Issue Date */}
      {isCertDateField && valStr.length > 0 && (
        <div className="mt-1 px-0.5">
          {isCertDateIncomplete ? (
            <p className="text-xs font-medium text-amber-600 flex items-center justify-between">
              <span>Enter complete date (DD/MM/YYYY)</span>
              <span className="font-bold">{10 - valStr.length} chars needed</span>
            </p>
          ) : isCertDateValid ? (
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check size={12} className="stroke-[3]" /> {certDateValidation.message}
            </p>
          ) : isCertDateInvalid ? (
            <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
              <span>⚠️ {certDateValidation.message}</span>
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// APPLICATION SECTION FORM COMPONENT (Main Section Layout)
// ============================================================================

export function CandidateMasterProfileForm({ section, formData, onChange }) {
  const ageValidation = useMemo(
    () => validateDateOfBirth(formData.dateOfBirth),
    [formData.dateOfBirth]
  )

  const getFieldValue = (field) => {
    if (field.name === 'age' || field.name === 'ageAsOnApplicationDate') {
      if (ageValidation.isValid && ageValidation.age !== undefined) {
        return `${ageValidation.age} Years`
      }
      if (ageValidation.age !== undefined && ageValidation.age <= 10 && ageValidation.age >= 0) {
        return `${ageValidation.age} Years (Ineligible - Age must be above 10)`
      }
      return ''
    }
    return formData[field.name] || ''
  }

  let fieldCounter = 0

  return (
    <div className="w-full min-w-0 px-3 py-5 sm:px-8 sm:py-7 lg:px-6 lg:py-4">
      <div className="mb-5 flex items-start gap-3 border-b border-slate-200 pb-5 sm:mb-7 sm:gap-4 sm:pb-7 lg:mb-4 lg:pb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#071733] text-amber-400 sm:h-16 sm:w-16 lg:h-11 lg:w-11">
          <UserRound size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-black leading-6 text-slate-950 sm:text-2xl sm:leading-8 lg:text-xl lg:leading-6">
            Section {section.id}: {section.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base lg:text-xs lg:leading-4">
            {section.subtitle}
          </p>
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2 lg:gap-y-3 xl:gap-x-10 min-w-0">
        {section.fields.map((field) => {
          if (
            section.id === 6 &&
            field.name !== 'internshipIfAny' &&
            formData.internshipIfAny !== 'Yes'
          ) {
            return null
          }

          if (
            section.id === 8 &&
            field.name !== 'employmentIfAny' &&
            formData.employmentIfAny !== 'Yes'
          ) {
            return null
          }

          if (section.id === 11 && field.name !== 'twelfthQualificationName') {
            const selectedQual = formData.twelfthQualificationName || '12th'

            if (selectedQual === '12th' || !selectedQual) {
              if (!field.name.startsWith('twelfth')) return null
            } else if (selectedQual === 'ITI') {
              if (!field.name.startsWith('iti')) return null
            } else if (selectedQual === 'Diploma') {
              if (!field.name.startsWith('diploma')) return null
            } else {
              if (!field.name.startsWith('otherQual')) return null
            }
          }

          if (
            section.id === 12 &&
            field.name !== 'hasBachelorDegree' &&
            formData.hasBachelorDegree !== 'Yes'
          ) {
            return null
          }

          if (
            section.id === 13 &&
            field.name !== 'hasMasterDegree' &&
            formData.hasMasterDegree !== 'Yes'
          ) {
            return null
          }
          const nameTriplets = {
            candidateFirstName: ['candidateFirstName', 'candidateMiddleName', 'candidateLastName'],
            fathersFirstName: ['fathersFirstName', 'fathersMiddleName', 'fathersLastName'],
            mothersFirstName: ['mothersFirstName', 'mothersMiddleName', 'mothersLastName'],
            spouseFirstName: ['spouseFirstName', 'spouseMiddleName', 'spouseLastName'],
          }

          const middleAndLastNames = [
            'candidateMiddleName', 'candidateLastName',
            'fathersMiddleName', 'fathersLastName',
            'mothersMiddleName', 'mothersLastName',
            'spouseMiddleName', 'spouseLastName',
          ]

          if (middleAndLastNames.includes(field.name)) {
            return null
          }

          fieldCounter++
          const currentFieldNumber = fieldCounter

          if (nameTriplets[field.name]) {
            const groupTitles = {
              candidateFirstName: 'Candidate Name',
              fathersFirstName: "Father's Name",
              mothersFirstName: "Mother's Name",
              spouseFirstName: 'Spouse Name',
            }

            const subLabels = ['First Name', 'Middle Name', 'Last Name']
            const tripletNames = nameTriplets[field.name]
            const tripletFields = tripletNames
              .map((n) => section.fields.find((f) => f.name === n))
              .filter(Boolean)

            return (
              <div key={field.name} className="md:col-span-2 min-w-0">
                <div className="mb-2">
                  <span className="text-sm font-black text-slate-950 lg:text-xs">
                    {currentFieldNumber}. {groupTitles[field.name]}
                    {field.required && <span className="ml-1 text-red-600">*</span>}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3 min-w-0">
                  {tripletFields.map((f, idx) => (
                    <div key={f.name} className="min-w-0">
                      <label
                        htmlFor={f.name}
                        className="mb-1.5 block text-xs font-bold text-slate-700"
                      >
                        {subLabels[idx]}
                        {f.required && <span className="ml-1 text-red-600">*</span>}
                      </label>

                      <FieldControl
                        field={f}
                        value={getFieldValue(f)}
                        onChange={f.readOnly ? undefined : onChange}
                        formData={formData}
                      />

                      <div className="mt-1 flex justify-end">
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none ring-1 ${f.status?.startsWith('Required')
                            ? 'bg-red-50 text-red-700 ring-red-200'
                            : 'bg-slate-100 text-slate-600 ring-slate-200'
                            }`}
                        >
                          {f.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <div
              key={field.name}
              className={`${field.fullWidth ? 'md:col-span-2' : ''} min-w-0`}
            >
              <div className="mb-2 flex items-center justify-between lg:mb-1">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-black leading-5 text-slate-950 lg:text-xs lg:leading-4"
                >
                  {currentFieldNumber}. {field.label}
                  {field.required && <span className="ml-1 text-red-600">*</span>}
                </label>

                {field.name === 'whatsappNumber' && formData.mobileNumber && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange({
                        target: { name: 'whatsappNumber', value: formData.mobileNumber },
                      })
                    }}
                    className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 hover:bg-amber-100 hover:text-amber-900 border border-amber-200 cursor-pointer transition"
                  >
                    Same as Mobile
                  </button>
                )}
              </div>

              <FieldControl
                field={field}
                value={getFieldValue(field)}
                onChange={field.readOnly ? undefined : onChange}
                formData={formData}
              />

              <div className="mt-2 flex justify-end lg:mt-1">
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none ring-1 lg:px-2 lg:py-0.5 lg:text-[10px] ${field.status?.startsWith('Required')
                    ? 'bg-red-50 text-red-700 ring-red-200'
                    : field.status === 'Auto-Calculated'
                      ? 'bg-blue-50 text-blue-700 ring-blue-200'
                      : 'bg-slate-100 text-slate-600 ring-slate-200'
                    }`}
                >
                  {field.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-sm leading-6 text-slate-700 sm:items-center sm:px-4 lg:mt-4 lg:py-2 lg:text-xs lg:leading-4">
        <Info size={16} className="shrink-0 text-[#071733]" />
        <span>
          Fields marked with <span className="font-bold text-red-600">*</span>{' '}
          are mandatory. You can save and continue later.
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// FORM PROVIDER COMPONENT
// ============================================================================

const initialFormData = applicationSections.reduce((sectionFields, section) => {
  section.fields.forEach((field) => {
    sectionFields[field.name] = ''
  })
  return sectionFields
}, {})

export function FormProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('jobApplicationDraft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.currentStep && parsed.currentStep >= 1 && parsed.currentStep <= applicationSections.length) {
          return parsed.currentStep
        }
      } catch (e) {
        console.error('Failed to restore step from draft:', e)
      }
    }
    return 1
  })

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('jobApplicationDraft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.formData) {
          return { ...initialFormData, ...parsed.formData }
        }
      } catch (e) {
        console.error('Failed to restore form data from draft:', e)
      }
    }
    return initialFormData
  })

  useEffect(() => {
    localStorage.setItem(
      'jobApplicationDraft',
      JSON.stringify({
        currentStep,
        formData,
      })
    )
  }, [currentStep, formData])

  const updateField = (event) => {
    let { name, value } = event.target
    const previousValue = formData[name] || ''

    const personalNameFields = [
      'candidateFirstName',
      'candidateMiddleName',
      'candidateLastName',
      'fathersFirstName',
      'fathersMiddleName',
      'fathersLastName',
      'mothersFirstName',
      'mothersMiddleName',
      'mothersLastName',
      'spouseFirstName',
      'spouseMiddleName',
      'spouseLastName',
      'candidateFullName',
      'fathersName',
      'mothersName',
      'emergencyContactPersonName',
      'nameAsPerAadhaarCard',
      'nameAsPerPanCard',
      'travelCandidateFullName',
      'trainerSupervisorName',
      'nickname',
      'relativeNameRelationship',
      'panNumber',
    ]

    const emailFields = [
      'emailId',
      'alternateEmailId',
      'trainerSupervisorEmailId',
      'travelEmailId',
    ]

    if ((emailFields.includes(name) || event.target.type === 'email') && typeof value === 'string') {
      value = value.toLowerCase()
    }

    if (personalNameFields.includes(name) && typeof value === 'string') {
      value = value.toUpperCase()
    }

    if (personalNameFields.includes(name) && name !== 'panNumber') {
      value = value.replace(/[0-9]/g, '')
    }

    const isDateField =
      name === 'dateOfBirth' ||
      name.toLowerCase().endsWith('certificatedate') ||
      name.toLowerCase().endsWith('issuedate') ||
      name.toLowerCase().endsWith('dateofissue')

    if (isDateField) {
      const isDeleting = value.length < previousValue.length

      if (isDeleting) {
        value = value.replace(/[^\d/]/g, '')
      } else {
        let clean = value.replace(/[^\d/]/g, '')
        const digits = clean.replace(/\//g, '')

        let formatted = ''
        if (digits.length > 0) {
          formatted += digits.substring(0, 2)
          if (digits.length === 2) {
            formatted += '/'
          }
        }
        if (digits.length > 2) {
          formatted += '/' + digits.substring(2, 4)
          if (digits.length === 4) {
            formatted += '/'
          }
        }
        if (digits.length > 4) {
          formatted += '/' + digits.substring(4, 8)
        }
        value = formatted
      }
    }

    if (name.toLowerCase().includes('yearofpassing')) {
      value = value.replace(/[^0-9]/g, '').substring(0, 4)
    }

    if (name.toLowerCase().includes('marksobtained') || name.toLowerCase().includes('maximummarks')) {
      value = value.replace(/[^0-9.]/g, '')
      const dotParts = value.split('.')
      if (dotParts.length > 2) {
        value = dotParts[0] + '.' + dotParts.slice(1).join('')
      }
    }

    if (name === 'panNumber') {
      let clean = value.toUpperCase()
      let formatted = ''
      for (let i = 0; i < clean.length && i < 10; i++) {
        const char = clean[i]
        if (i < 5) {
          if (/[A-Z]/.test(char)) formatted += char
        } else if (i < 9) {
          if (/[0-9]/.test(char)) formatted += char
        } else {
          if (/[A-Z]/.test(char)) formatted += char
        }
      }
      value = formatted
    }

    if (name === 'percentageCgpa') {
      value = value.replace(/[^0-9.%]/g, '')
    }

    if (name === 'aadhaarNumber') {
      value = value.replace(/[^0-9]/g, '').substring(0, 12)
    }

    if (CANDIDATE_MOBILE_FIELDS.includes(name)) {
      let clean = value.replace(/[^0-9]/g, '')
      if (clean.length > 10 && clean.startsWith('91')) {
        clean = clean.slice(2)
      } else if (clean.length > 10 && clean.startsWith('0')) {
        clean = clean.slice(1)
      }
      value = clean.substring(0, 10)
    }

    if (name === 'postalPinCode') {
      value = value.replace(/[^0-9]/g, '').substring(0, 6)
    }

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      }

      const calcPairs = [
        ['tenthTotalMarksObtained', 'tenthMaximumMarks', 'tenthPercentageGradeDivision'],
        ['twelfthTotalMarksObtained', 'twelfthMaximumMarks', 'twelfthPercentageGradeDivision'],
        ['itiTotalMarksObtained', 'itiMaximumMarks', 'itiPercentageGradeDivision'],
        ['diplomaTotalMarksObtained', 'diplomaMaximumMarks', 'diplomaPercentageGradeDivision'],
        ['otherQualTotalMarksObtained', 'otherQualMaximumMarks', 'otherQualPercentageGradeDivision'],
        ['bachelorTotalMarksObtained', 'bachelorMaximumMarks', 'bachelorFinalResult'],
        ['masterTotalMarksObtained', 'masterMaximumMarks', 'masterFinalResult'],
      ]

      calcPairs.forEach(([totField, maxField, targetField]) => {
        if (name === totField || name === maxField) {
          const totalStr = name === totField ? value : previous[totField]
          const maxStr = name === maxField ? value : previous[maxField]

          const totalNum = parseFloat(totalStr)
          const maxNum = parseFloat(maxStr)

          if (!isNaN(totalNum) && !isNaN(maxNum) && maxNum > 0 && totalNum >= 0) {
            if (totalNum > maxNum) {
              updated[targetField] = 'Invalid Marks'
            } else {
              const calcPct = (totalNum / maxNum) * 100
              const formatted = (calcPct % 1 === 0 ? calcPct.toFixed(0) : calcPct.toFixed(2)) + '%'
              updated[targetField] = formatted
            }
          } else if (!totalStr || !maxStr) {
            updated[targetField] = ''
          }
        }
      })

      if (name === 'hasBachelorDegree' && value === 'No') {
        const bachelorSection = applicationSections.find((s) => s.id === 12)
        if (bachelorSection) {
          bachelorSection.fields.forEach((f) => {
            if (f.name !== 'hasBachelorDegree') {
              updated[f.name] = ''
            }
          })
        }
      }

      if (name === 'hasMasterDegree' && value === 'No') {
        const masterSection = applicationSections.find((s) => s.id === 13)
        if (masterSection) {
          masterSection.fields.forEach((f) => {
            if (f.name !== 'hasMasterDegree') {
              updated[f.name] = ''
            }
          })
        }
      }

      return updated
    })

    if (name === 'internshipIfAny' && value === 'No') {
      setTimeout(() => setCurrentStep(8), 100)
    }

    if (name === 'employmentIfAny' && value === 'No') {
      setTimeout(() => setCurrentStep(9), 100)
    }

    if (name === 'hasBachelorDegree' && value === 'No') {
      setTimeout(() => setCurrentStep(13), 100)
    }

    if (name === 'hasMasterDegree' && value === 'No') {
      setTimeout(() => setCurrentStep(14), 100)
    }
  }

  const nextStep = () => {
    setCurrentStep((previous) => {
      if (previous === 6 && formData.internshipIfAny === 'No') {
        return 8
      }
      if (previous === 8 && formData.employmentIfAny === 'No') {
        return 9
      }
      if (previous === 12 && formData.hasBachelorDegree === 'No') {
        return 13
      }
      if (previous === 13 && formData.hasMasterDegree === 'No') {
        return 14
      }
      return Math.min(previous + 1, applicationSections.length)
    })
  }

  const previousStep = () => {
    setCurrentStep((previous) => {
      if (previous === 8 && formData.internshipIfAny === 'No') {
        return 6
      }
      if (previous === 9 && formData.employmentIfAny === 'No') {
        return 8
      }
      if (previous === 14 && formData.hasMasterDegree === 'No') {
        return 13
      }
      if (previous === 13 && formData.hasBachelorDegree === 'No') {
        return 12
      }
      return Math.max(previous - 1, 1)
    })
  }

  const goToStep = (step) => {
    if (step === 7 && formData.internshipIfAny === 'No') {
      return
    }
    setCurrentStep(step)
  }

  const saveDraft = () => {
    localStorage.setItem(
      'jobApplicationDraft',
      JSON.stringify({
        currentStep,
        formData,
      })
    )
    alert('Draft saved successfully!')
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
    localStorage.removeItem('jobApplicationDraft')
  }

  const value = {
    currentStep,
    formData,
    updateField,
    nextStep,
    previousStep,
    goToStep,
    saveDraft,
    resetForm,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

// ============================================================================
// PROGRESS BAR COMPONENT
// ============================================================================

const steps = applicationSections.map((section) => section.title)

export function ProgressBar({ currentStep = 1 }) {
  const progressPercentage = (currentStep / steps.length) * 100
  const currentStepName = steps[currentStep - 1]
  const nextStepName = currentStep < steps.length ? steps[currentStep] : null

  return (
    <div className="mb-6 sm:mb-8 lg:mb-4 pt-8 sm:pt-10 lg:pt-8">
      <div className="mb-5 text-center sm:mb-7 lg:mb-4">
        <h2 className="text-xl font-black tracking-[0.12em] text-slate-950 sm:text-3xl sm:tracking-[0.18em] lg:text-2xl">
          CANDIDATE MASTER PROFILE FORM
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 lg:mt-2 lg:text-xs lg:leading-4">
          Please fill out all the details carefully. You can save your progress and continue later.
        </p>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-amber-500 lg:mt-3 lg:w-20" />
      </div>

      <div className="block lg:hidden px-4 py-4 rounded-xl border border-slate-200 bg-white shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-600 ring-1 ring-amber-500/20">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {Math.round(progressPercentage)}% Completed
          </span>
        </div>

        <h3 className="text-base font-black text-slate-900 mb-3.5">
          {currentStepName}
        </h3>

        <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {nextStepName && (
          <div className="mt-3.5 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2.5">
            <span className="font-medium">Next Section:</span>
            <span className="font-bold text-slate-700">{nextStepName}</span>
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <div className="flex flex-row items-start">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const completed = stepNumber < currentStep
            const active = stepNumber === currentStep

            return (
              <div
                key={step}
                className="relative flex flex-1 flex-col items-center px-1 text-center"
              >
                {index < steps.length - 1 && (
                  <span className="absolute left-1/2 top-4 h-px w-full bg-slate-300" />
                )}

                <div
                  className={`relative z-10 mb-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-black shadow-sm ${completed
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : active
                      ? 'border-amber-500 bg-amber-500 text-white shadow-amber-200'
                      : 'border-slate-300 bg-white text-slate-600'
                    }`}
                >
                  {completed ? <Check size={14} /> : stepNumber}
                </div>

                <span className="max-w-24 text-[10px] font-semibold leading-snug text-slate-900">
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// SECTION NAVIGATION COMPONENT
// ============================================================================

export function SectionNavigation({
  currentStep = 1,
  totalSteps = 15,
  onPrevious,
  onSaveDraft,
  isSubmitting = false,
}) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div className="pt-4 lg:pt-3">
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-4">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstStep}
          className={`inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border px-5 font-bold transition sm:h-14 md:w-auto md:px-6 lg:h-10 lg:px-5 lg:text-sm ${isFirstStep
            ? 'cursor-not-allowed border-slate-200 bg-white text-slate-400'
            : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 cursor-pointer'
            }`}
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-slate-300 bg-white px-5 font-bold text-slate-800 transition hover:border-amber-400 hover:bg-amber-50 sm:h-14 md:w-auto md:px-6 lg:h-10 lg:px-5 lg:text-sm cursor-pointer"
        >
          <Save size={18} />
          Save & Exit
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#071733] px-6 font-black text-amber-400 shadow-lg shadow-slate-300 transition hover:bg-[#0b2148] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 md:w-auto md:px-8 lg:h-10 lg:px-6 lg:text-sm cursor-pointer"
        >
          {isLastStep ? 'Submit Application' : 'Save & Continue'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// TRUST FOOTER COMPONENT
// ============================================================================

const footerCards = [
  {
    icon: ShieldCheck,
    title: 'Secure',
    text: 'Your data is encrypted and protected.',
    color: 'bg-[#071733] text-amber-400',
  },
  {
    icon: BadgeCheck,
    title: 'Save & Continue',
    text: 'You can save your progress anytime.',
    color: 'bg-emerald-600 text-white',
  },
  {
    icon: FileBadge,
    title: 'Easy to Fill',
    text: 'Simple and structured application process.',
    color: 'bg-orange-500 text-white',
  },
  {
    icon: Headphones,
    title: 'Need Help?',
    text: 'Contact our support team anytime.',
    color: 'bg-violet-600 text-white',
  },
]

export function TrustFooter() {
  return (
    <div className="mt-5 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/70 sm:mt-6 sm:grid-cols-2 sm:p-5 lg:mt-4 lg:grid-cols-4 lg:gap-3 lg:p-3">
      {footerCards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className="flex gap-3 sm:gap-4 lg:border-r lg:border-slate-200 lg:pr-3 last:border-r-0"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 lg:h-10 lg:w-10 ${card.color}`}
            >
              <Icon size={20} />
            </span>

            <div>
              <h3 className="font-black text-slate-900 lg:text-sm">{card.title}</h3>
              <p className="mt-1 text-sm leading-5 text-slate-600 lg:text-xs lg:leading-4">
                {card.text}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ============================================================================
// PAGE COMPONENTS (CandidateMasterProfileFormPage, PreviewPage, SuccessPage, NotFound)
// ============================================================================

/**
 * CandidateMasterProfileFormPage Component - Main 15-step application form page
 */
export function CandidateMasterProfileFormPage({ onGoToPreview, appliedJob }) {
  const {
    currentStep,
    formData,
    updateField,
    nextStep,
    previousStep,
    saveDraft,
  } = useFormContext()

  const navigate = useNavigate()

  const currentSection =
    applicationSections.find((section) => section.id === currentStep) ||
    applicationSections[0]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Programmatic validation for Section 1 (Personal Information - Date of Birth)
    if (currentStep === 1) {
      const dobCheck = validateDateOfBirth(formData.dateOfBirth || '')
      if (!dobCheck.isValid) {
        const dobEl = document.getElementById('dateOfBirth')
        if (dobEl) {
          dobEl.focus()
          dobEl.setCustomValidity(dobCheck.message)
          dobEl.reportValidity()
        }
        return
      }
    }

    // Programmatic validation for Section 4 (Address & Contact Information)
    if (currentStep === 4) {
      const mobileRegex = /^[6-9]\d{9}$/

      if (!mobileRegex.test(formData.mobileNumber || '')) {
        const mobileEl = document.getElementById('mobileNumber')
        if (mobileEl) {
          mobileEl.focus()
          mobileEl.setCustomValidity('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.')
          mobileEl.reportValidity()
        }
        return
      }

      if (!mobileRegex.test(formData.whatsappNumber || '')) {
        const whatsappEl = document.getElementById('whatsappNumber')
        if (whatsappEl) {
          whatsappEl.focus()
          whatsappEl.setCustomValidity('Please enter a valid 10-digit WhatsApp number starting with 6, 7, 8, or 9.')
          whatsappEl.reportValidity()
        }
        return
      }

      if (formData.alternateMobileNumber && !mobileRegex.test(formData.alternateMobileNumber)) {
        const altEl = document.getElementById('alternateMobileNumber')
        if (altEl) {
          altEl.focus()
          altEl.setCustomValidity('Alternate Mobile Number must be a valid 10-digit number starting with 6-9, or leave empty.')
          altEl.reportValidity()
        }
        return
      }
    }

    // Programmatic validation for Section 10 (10th Standard Qualification Details)
    if (currentStep === 10) {
      // 1. Qualification Name (10th)
      const qualName = (formData.tenthQualificationName || '').trim()
      if (!qualName) {
        const el = document.getElementById('tenthQualificationName')
        if (el) {
          el.focus()
          el.setCustomValidity('Qualification Name (10th) is required.')
          el.reportValidity()
        }
        return
      }

      // 2. Year of Passing (10th)
      const yearCheck = validateYearOfPassing(formData.tenthYearOfPassing, formData.dateOfBirth)
      if (!yearCheck.isValid) {
        const el = document.getElementById('tenthYearOfPassing')
        if (el) {
          el.focus()
          el.setCustomValidity(yearCheck.message)
          el.reportValidity()
        }
        return
      }

      // 3. Name of the Board
      const boardName = (formData.tenthBoardName || '').trim()
      if (!boardName) {
        const el = document.getElementById('tenthBoardName') || document.querySelector('[name="tenthBoardName"]')
        if (el) {
          el.focus()
          if (el.setCustomValidity) {
            el.setCustomValidity('Please select 10th Class Board.')
            el.reportValidity()
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
        return
      }

      // 4. Type of Board
      const boardType = (formData.tenthBoardType || '').trim()
      if (!boardType) {
        const el = document.getElementById('tenthBoardType') || document.querySelector('[name="tenthBoardType"]')
        if (el) {
          el.focus()
          if (el.setCustomValidity) {
            el.setCustomValidity('Please select Type of Board.')
            el.reportValidity()
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
        return
      }

      // 5. Student Roll Number
      const rollNum = (formData.tenthRollNumber || '').trim()
      if (!rollNum) {
        const el = document.getElementById('tenthRollNumber')
        if (el) {
          el.focus()
          el.setCustomValidity('Student Roll Number is required.')
          el.reportValidity()
        }
        return
      }

      // 6. Certificate Issue Date (if provided)
      if (formData.tenthCertificateIssueDate) {
        const certCheck = validateCertificateIssueDate(formData.tenthCertificateIssueDate, formData.tenthYearOfPassing)
        if (!certCheck.isValid) {
          const el = document.getElementById('tenthCertificateIssueDate')
          if (el) {
            el.focus()
            el.setCustomValidity(certCheck.message)
            el.reportValidity()
          }
          return
        }
      }

      // 7. Maximum Marks
      const maxMarksNum = parseFloat(formData.tenthMaximumMarks)
      if (isNaN(maxMarksNum) || maxMarksNum <= 0) {
        const el = document.getElementById('tenthMaximumMarks')
        if (el) {
          el.focus()
          el.setCustomValidity('Maximum Marks must be greater than 0.')
          el.reportValidity()
        }
        return
      }

      // 8. Total Marks Obtained
      const obtMarksNum = parseFloat(formData.tenthTotalMarksObtained)
      if (isNaN(obtMarksNum) || obtMarksNum < 0) {
        const el = document.getElementById('tenthTotalMarksObtained')
        if (el) {
          el.focus()
          el.setCustomValidity('Total Marks Obtained cannot be negative.')
          el.reportValidity()
        }
        return
      }

      if (obtMarksNum > maxMarksNum) {
        const el = document.getElementById('tenthTotalMarksObtained')
        if (el) {
          el.focus()
          el.setCustomValidity(`Total Marks Obtained (${obtMarksNum}) cannot exceed Maximum Marks (${maxMarksNum}).`)
          el.reportValidity()
        }
        return
      }

      // 9. Subjects Studied
      const subjects = (formData.tenthSubjectsStudied || '').trim()
      if (!subjects) {
        const el = document.getElementById('tenthSubjectsStudied')
        if (el) {
          el.focus()
          el.setCustomValidity('Please enter main subjects studied.')
          el.reportValidity()
        }
        return
      }

      // 10. School Name
      const schoolName = (formData.tenthSchoolName || '').trim()
      if (!schoolName) {
        const el = document.getElementById('tenthSchoolName')
        if (el) {
          el.focus()
          el.setCustomValidity('School Name is required.')
          el.reportValidity()
        }
        return
      }

      // 11. Medium of Instruction
      const medium = (formData.tenthMediumOfInstruction || '').trim()
      if (!medium) {
        const el = document.getElementById('tenthMediumOfInstruction') || document.querySelector('[name="tenthMediumOfInstruction"]')
        if (el) {
          el.focus()
          if (el.setCustomValidity) {
            el.setCustomValidity('Please select Medium of Instruction.')
            el.reportValidity()
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
        return
      }
    }

    // Programmatic validation for Section 11 (Secondary / Higher Secondary / Technical Qualification Details)
    if (currentStep === 11) {
      const selectedQual = formData.twelfthQualificationName || '12th'

      if (selectedQual === '12th' || !selectedQual) {
        if (formData.twelfthYearOfPassing) {
          const yearCheck = validateYearOfPassing(formData.twelfthYearOfPassing, formData.dateOfBirth)
          if (!yearCheck.isValid) {
            const el = document.getElementById('twelfthYearOfPassing')
            if (el) {
              el.focus()
              el.setCustomValidity(yearCheck.message)
              el.reportValidity()
            }
            return
          }
          if (formData.tenthYearOfPassing) {
            const tenthY = parseInt(formData.tenthYearOfPassing, 10)
            const twelY = parseInt(formData.twelfthYearOfPassing, 10)
            if (!isNaN(tenthY) && !isNaN(twelY) && twelY < tenthY) {
              const el = document.getElementById('twelfthYearOfPassing')
              if (el) {
                el.focus()
                el.setCustomValidity(`12th passing year (${twelY}) cannot be earlier than 10th passing year (${tenthY}).`)
                el.reportValidity()
              }
              return
            }
          }
        }

        if (formData.twelfthCertificateIssueDate) {
          const certCheck = validateCertificateIssueDate(
            formData.twelfthCertificateIssueDate,
            formData.twelfthYearOfPassing || formData.tenthYearOfPassing
          )
          if (!certCheck.isValid) {
            const el = document.getElementById('twelfthCertificateIssueDate')
            if (el) {
              el.focus()
              el.setCustomValidity(certCheck.message)
              el.reportValidity()
            }
            return
          }
        }
      } else if (selectedQual === 'ITI') {
        if (formData.itiCertificateIssueDate) {
          const certCheck = validateCertificateIssueDate(
            formData.itiCertificateIssueDate,
            formData.itiYearOfPassing || formData.tenthYearOfPassing
          )
          if (!certCheck.isValid) {
            const el = document.getElementById('itiCertificateIssueDate')
            if (el) {
              el.focus()
              el.setCustomValidity(certCheck.message)
              el.reportValidity()
            }
            return
          }
        }
      } else if (selectedQual === 'Diploma') {
        if (formData.diplomaCertificateIssueDate) {
          const certCheck = validateCertificateIssueDate(
            formData.diplomaCertificateIssueDate,
            formData.diplomaYearOfPassing || formData.tenthYearOfPassing
          )
          if (!certCheck.isValid) {
            const el = document.getElementById('diplomaCertificateIssueDate')
            if (el) {
              el.focus()
              el.setCustomValidity(certCheck.message)
              el.reportValidity()
            }
            return
          }
        }
      } else if (selectedQual === 'Other') {
        if (formData.otherQualCertificateIssueDate) {
          const certCheck = validateCertificateIssueDate(
            formData.otherQualCertificateIssueDate,
            formData.otherQualYearOfPassing || formData.tenthYearOfPassing
          )
          if (!certCheck.isValid) {
            const el = document.getElementById('otherQualCertificateIssueDate')
            if (el) {
              el.focus()
              el.setCustomValidity(certCheck.message)
              el.reportValidity()
            }
            return
          }
        }
      }
    }

    if (currentStep === applicationSections.length) {
      if (onGoToPreview) {
        onGoToPreview()
      } else {
        navigate('/preview')
      }
    } else {
      nextStep()
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <main className="mx-auto w-full max-w-[1440px] rounded-t-[1.5rem] border-t-4 border-amber-400 bg-slate-50 px-2 py-4 sm:px-6 sm:py-8 lg:rounded-t-[2rem] lg:px-5 lg:py-4 xl:px-6">
        <ProgressBar currentStep={currentStep} />

        <div className="w-full min-w-0 relative z-20">
          <section className="w-full min-w-0 rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <form onSubmit={handleSubmit} className="w-full min-w-0">
              <CandidateMasterProfileForm
                section={currentSection}
                formData={formData}
                onChange={updateField}
              />

              <div className="border-t border-slate-200 px-3 pb-5 sm:px-8 sm:pb-6 lg:px-6 lg:pb-4">
                <SectionNavigation
                  currentStep={currentStep}
                  totalSteps={applicationSections.length}
                  onPrevious={previousStep}
                  onSaveDraft={saveDraft}
                />
              </div>
            </form>
          </section>
        </div>

        <TrustFooter />
      </main>
    </div>
  )
}

/**
 * PreviewPage Component - Review page before final submit
 */
export function PreviewPage({ onBackToEdit, onSubmitSuccess, appliedJob }) {
  const navigate = useNavigate()
  const { formData } = useFormContext()

  const handleFinalSubmit = () => {
    localStorage.removeItem('jobApplicationDraft')
    if (onSubmitSuccess) {
      onSubmitSuccess()
    } else {
      navigate('/success')
    }
  }

  const handleBackToEdit = () => {
    if (onBackToEdit) {
      onBackToEdit()
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
            <CheckCircle2 size={14} />
            Preview Before Submission
          </div>
          <h1 className="text-2xl font-black tracking-wide text-slate-900 sm:text-3xl">
            Review Your Application
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please review all your details carefully before submitting. Click "Back to Edit" to make any changes.
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {applicationSections.map((section, index) => {
          const prevFormTitle = index > 0 ? applicationSections[index - 1].formTitle : null
          const showHeader = index === 0 || section.formTitle !== prevFormTitle

          if (section.id === 7 && formData.internshipIfAny === 'No') {
            return null
          }

          return (
            <div key={section.id}>
              {showHeader && (
                <div className="mb-4 mt-8 rounded-lg bg-[#061326] px-5 py-3 text-center first:mt-0">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
                    {section.formTitle}
                  </h2>
                </div>
              )}

              <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[11px] font-black text-white">
                      {section.id}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">
                      {section.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-5 py-4 sm:grid-cols-2">
                  {section.fields.map((field) => {
                    if (
                      section.id === 6 &&
                      field.name !== 'internshipIfAny' &&
                      formData.internshipIfAny === 'No'
                    ) {
                      return null
                    }

                    if (
                      section.id === 8 &&
                      field.name !== 'employmentIfAny' &&
                      formData.employmentIfAny === 'No'
                    ) {
                      return null
                    }

                    if (section.id === 11 && field.name !== 'twelfthQualificationName') {
                      const selectedQual = formData.twelfthQualificationName || '12th'
                      if (selectedQual === '12th' && !field.name.startsWith('twelfth')) return null
                      if (selectedQual === 'ITI' && !field.name.startsWith('iti')) return null
                      if (selectedQual === 'Diploma' && !field.name.startsWith('diploma')) return null
                      if (selectedQual === 'Other' && !field.name.startsWith('otherQual')) return null
                    }

                    if (
                      section.id === 12 &&
                      field.name !== 'hasBachelorDegree' &&
                      formData.hasBachelorDegree !== 'Yes'
                    ) {
                      return null
                    }

                    if (
                      section.id === 13 &&
                      field.name !== 'hasMasterDegree' &&
                      formData.hasMasterDegree !== 'Yes'
                    ) {
                      return null
                    }
                    const nameGroupConfigs = {
                      candidateFirstName: {
                        label: 'Candidate Full Name',
                        keys: ['candidateFirstName', 'candidateMiddleName', 'candidateLastName'],
                      },
                      fathersFirstName: {
                        label: "Father's Full Name",
                        keys: ['fathersFirstName', 'fathersMiddleName', 'fathersLastName'],
                      },
                      mothersFirstName: {
                        label: "Mother's Full Name",
                        keys: ['mothersFirstName', 'mothersMiddleName', 'mothersLastName'],
                      },
                      spouseFirstName: {
                        label: "Spouse's Full Name",
                        keys: ['spouseFirstName', 'spouseMiddleName', 'spouseLastName'],
                      },
                    }

                    const skippedNameKeys = [
                      'candidateMiddleName',
                      'candidateLastName',
                      'fathersMiddleName',
                      'fathersLastName',
                      'mothersMiddleName',
                      'mothersLastName',
                      'spouseMiddleName',
                      'spouseLastName',
                    ]

                    if (skippedNameKeys.includes(field.name)) {
                      return null
                    }

                    let displayLabel = field.label
                    let val = formData[field.name]

                    if (nameGroupConfigs[field.name]) {
                      const config = nameGroupConfigs[field.name]
                      displayLabel = config.label
                      val = config.keys
                        .map((k) => (formData[k] ? String(formData[k]).trim() : ''))
                        .filter(Boolean)
                        .join(' ')
                    }

                    const isEmpty = !val || val.trim() === ''

                    return (
                      <div key={field.name} className="min-w-0">
                        <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          {displayLabel}
                        </p>
                        {isEmpty ? (
                          <p className="text-sm italic text-slate-300">— Not provided —</p>
                        ) : (
                          <p className="break-words text-sm font-medium text-slate-800">
                            {val}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

        <div className="sticky bottom-0 mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-lg backdrop-blur sm:flex-row">
          <button
            type="button"
            onClick={handleBackToEdit}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] sm:w-auto cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Edit
          </button>

          <p className="text-xs text-slate-400 sm:text-center hidden sm:block">
            Once submitted, you cannot edit your application.
          </p>

          <button
            type="button"
            onClick={handleFinalSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#061326] px-6 py-3 text-sm font-black text-amber-400 shadow-md transition hover:bg-[#0b2148] active:scale-[0.98] sm:w-auto cursor-pointer"
          >
            <Send size={16} />
            Submit Application
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * SuccessPage Component - Submission success screen
 */
export function SuccessPage({ onContinue, appliedJob }) {
  const navigate = useNavigate()
  const { resetForm } = useFormContext()

  const handleContinue = () => {
    if (resetForm) resetForm()
    if (onContinue) {
      onContinue()
    } else {
      navigate('/recruitment/current-vacancy/job-vacancy')
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-slate-50 px-4 overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(at 0% 0%, rgba(245, 158, 11, 0.08) 0px, transparent 50%), radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(245, 158, 11, 0.08) 0px, transparent 50%)',
      }}
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-400/5 blur-[100px] pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-400/5 blur-[100px] pointer-events-none animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative overflow-hidden w-full max-w-md rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-xl p-10 text-center shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-indigo-500" />

        <div className="mx-auto mb-8 relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-50 to-teal-50/50 text-emerald-500 shadow-[0_10px_30px_rgba(16,_185,_129,_0.15)] ring-1 ring-emerald-500/10">
          <span className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping opacity-40" />
          <div className="absolute inset-2 rounded-full border border-emerald-500/5 bg-white/40 shadow-inner" />
          <Check size={40} className="stroke-[3.5] relative z-10 drop-shadow-sm" />
        </div>

        <h1 className="text-3xl font-black text-[#061326] tracking-tight leading-snug">
          Application Submitted<br />
          <span className="bg-gradient-to-r from-[#061326] via-indigo-950 to-[#061326] bg-clip-text text-transparent">
            Successfully!
          </span>
        </h1>

        <div className="mx-auto my-6 h-0.5 w-12 bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full" />

        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs mx-auto">
          Thank you for your submission. Your profile has been securely received and is under initial screening.
        </p>

        {appliedJob && (
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <span className="font-bold text-slate-800">{appliedJob.jobTitle}</span> ({appliedJob.jobCode})
          </div>
        )}

        <div className="mt-8">
          <button
            type="button"
            onClick={handleContinue}
            className="group relative inline-flex items-center justify-center w-full gap-2.5 px-8 py-3.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-[#061326] via-indigo-950 to-[#061326] shadow-[0_10px_25px_rgba(6,_19,_38,_0.2)] hover:shadow-[0_15px_30px_rgba(6,_19,_38,_0.3)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Return to Job Vacancies</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * CandidateMasterProfilePageContent - Handles state switching between Form, Preview, and Success
 */
function CandidateMasterProfilePageContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const appliedJob = location.state?.job || null
  const [viewMode, setViewMode] = useState('form') // 'form' | 'preview' | 'success'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {viewMode === 'form' && (
        <CandidateMasterProfileFormPage
          appliedJob={appliedJob}
          onGoToPreview={() => setViewMode('preview')}
        />
      )}

      {viewMode === 'preview' && (
        <PreviewPage
          appliedJob={appliedJob}
          onBackToEdit={() => setViewMode('form')}
          onSubmitSuccess={() => setViewMode('success')}
        />
      )}

      {viewMode === 'success' && (
        <SuccessPage
          appliedJob={appliedJob}
          onContinue={() => navigate('/recruitment/current-vacancy/job-vacancy')}
        />
      )}
    </div>
  )
}

/**
 * NotFound Component - 404 Error Page
 */
export function NotFound() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-red-700">
        404 - Page Not Found
      </h1>
    </div>
  )
}

export default function CandidateMasterProfilePageWrapper() {
  return (
    <FormProvider>
      <CandidateMasterProfilePageContent />
    </FormProvider>
  )
}

