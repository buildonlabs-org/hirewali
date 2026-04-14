'use client';

import { useState } from 'react';
import {
  Upload,
  Briefcase,
  MapPin,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Plus,
} from 'lucide-react';

type Step = 'resume' | 'preferences' | 'criteria' | 'confirm';

const STEPS: { key: Step; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { key: 'resume', label: 'Resume', icon: Upload },
  { key: 'preferences', label: 'Preferences', icon: Briefcase },
  { key: 'criteria', label: 'Criteria', icon: MapPin },
  { key: 'confirm', label: 'Confirm', icon: Check },
];

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level', desc: '0-2 years' },
  { value: 'mid', label: 'Mid Level', desc: '3-5 years' },
  { value: 'senior', label: 'Senior', desc: '6-10 years' },
  { value: 'executive', label: 'Executive', desc: '10+ years' },
];

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'E-commerce',
  'SaaS',
  'Consulting',
  'Media',
  'Government',
  'Non-profit',
];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<Step>('resume');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [titleInput, setTitleInput] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [remote, setRemote] = useState(true);
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [excludeCompanies, setExcludeCompanies] = useState('');

  const stepIndex = STEPS.findIndex((s) => s.key === currentStep);

  const addTag = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
    setInput: (v: string) => void
  ) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
    setInput('');
  };

  const removeTag = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.filter((v) => v !== value));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Set up Wali</h1>
        <p className="text-neutral-500 text-sm">
          Tell Wali what you&apos;re looking for and it&apos;ll start applying.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium shrink-0 ${
                i < stepIndex
                  ? 'bg-black text-white'
                  : i === stepIndex
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {i < stepIndex ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                i <= stepIndex ? 'text-black' : 'text-neutral-400'
              }`}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px ${
                  i < stepIndex ? 'bg-black' : 'bg-neutral-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8">
        {/* Step 1: Resume */}
        {currentStep === 'resume' && (
          <div>
            <h2 className="text-lg font-semibold mb-1">Upload your resume</h2>
            <p className="text-sm text-neutral-500 mb-8">
              Wali will use this to match and apply to relevant jobs.
            </p>

            <div
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
                resumeFile
                  ? 'border-black bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {resumeFile ? (
                <div>
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mx-auto mb-3">
                    <Check size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-medium mb-1">{resumeFile.name}</p>
                  <button
                    onClick={() => setResumeFile(null)}
                    className="text-xs text-neutral-400 hover:text-black"
                  >
                    Remove & re-upload
                  </button>
                </div>
              ) : (
                <div>
                  <Upload size={24} className="text-neutral-300 mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">
                    Drop your resume here or click to browse
                  </p>
                  <p className="text-xs text-neutral-400">PDF, DOCX up to 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={(e) =>
                      e.target.files?.[0] && setResumeFile(e.target.files[0])
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    style={{ position: 'relative', marginTop: '12px' }}
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                LinkedIn profile URL
                <span className="text-neutral-400 font-normal"> (optional)</span>
              </label>
              <input
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300"
              />
            </div>
          </div>
        )}

        {/* Step 2: Job Preferences */}
        {currentStep === 'preferences' && (
          <div>
            <h2 className="text-lg font-semibold mb-1">Job preferences</h2>
            <p className="text-sm text-neutral-500 mb-8">
              What kind of roles are you looking for?
            </p>

            {/* Job titles */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Job titles</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    addTag(titleInput, jobTitles, setJobTitles, setTitleInput))
                  }
                  placeholder="e.g. Software Engineer"
                  className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300"
                />
                <button
                  onClick={() =>
                    addTag(titleInput, jobTitles, setJobTitles, setTitleInput)
                  }
                  className="px-4 bg-black text-white rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobTitles.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 bg-neutral-100 text-sm px-3 py-1.5 rounded-lg"
                  >
                    {t}
                    <button
                      onClick={() => removeTag(t, jobTitles, setJobTitles)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience level */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Experience level</label>
              <div className="grid grid-cols-2 gap-2">
                {EXPERIENCE_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setExperienceLevel(level.value)}
                    className={`text-left p-3 rounded-xl border text-sm transition-colors ${
                      experienceLevel === level.value
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <p className="font-medium">{level.label}</p>
                    <p
                      className={`text-xs ${
                        experienceLevel === level.value
                          ? 'text-neutral-400'
                          : 'text-neutral-400'
                      }`}
                    >
                      {level.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div>
              <label className="block text-sm font-medium mb-2">Industries</label>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((industry) => (
                  <button
                    key={industry}
                    onClick={() =>
                      setSelectedIndustries((prev) =>
                        prev.includes(industry)
                          ? prev.filter((i) => i !== industry)
                          : [...prev, industry]
                      )
                    }
                    className={`text-sm px-3.5 py-2 rounded-lg border transition-colors ${
                      selectedIndustries.includes(industry)
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Criteria */}
        {currentStep === 'criteria' && (
          <div>
            <h2 className="text-lg font-semibold mb-1">Search criteria</h2>
            <p className="text-sm text-neutral-500 mb-8">
              Fine-tune where and how Wali searches.
            </p>

            {/* Locations */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Preferred locations</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    addTag(locationInput, locations, setLocations, setLocationInput))
                  }
                  placeholder="e.g. San Francisco, CA"
                  className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300"
                />
                <button
                  onClick={() =>
                    addTag(locationInput, locations, setLocations, setLocationInput)
                  }
                  className="px-4 bg-black text-white rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 bg-neutral-100 text-sm px-3 py-1.5 rounded-lg"
                  >
                    {loc}
                    <button
                      onClick={() => removeTag(loc, locations, setLocations)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Remote toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium">Include remote jobs</p>
                  <p className="text-xs text-neutral-400">
                    Wali will also search for remote positions
                  </p>
                </div>
                <button
                  onClick={() => setRemote(!remote)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    remote ? 'bg-black' : 'bg-neutral-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-sm ${
                      remote ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Salary range */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Salary range (USD)
                <span className="text-neutral-400 font-normal"> (optional)</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <DollarSign
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"
                  />
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="Min"
                    className="w-full border border-neutral-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300"
                  />
                </div>
                <span className="text-neutral-300">—</span>
                <div className="relative flex-1">
                  <DollarSign
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"
                  />
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="Max"
                    className="w-full border border-neutral-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Key skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    addTag(skillInput, skills, setSkills, setSkillInput))
                  }
                  placeholder="e.g. React, Python, AWS"
                  className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300"
                />
                <button
                  onClick={() =>
                    addTag(skillInput, skills, setSkills, setSkillInput)
                  }
                  className="px-4 bg-black text-white rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 bg-neutral-100 text-sm px-3 py-1.5 rounded-lg"
                  >
                    {s}
                    <button
                      onClick={() => removeTag(s, skills, setSkills)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Exclude companies */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Exclude companies
                <span className="text-neutral-400 font-normal"> (optional)</span>
              </label>
              <input
                type="text"
                value={excludeCompanies}
                onChange={(e) => setExcludeCompanies(e.target.value)}
                placeholder="Comma separated, e.g. Acme Corp, WidgetCo"
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300"
              />
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {currentStep === 'confirm' && (
          <div>
            <h2 className="text-lg font-semibold mb-1">Review & confirm</h2>
            <p className="text-sm text-neutral-500 mb-8">
              Make sure everything looks good before Wali starts working.
            </p>

            <div className="space-y-4">
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  Resume
                </p>
                <p className="text-sm font-medium">
                  {resumeFile ? resumeFile.name : 'No resume uploaded'}
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  Target roles
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {jobTitles.length > 0 ? (
                    jobTitles.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-white border border-neutral-200 px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-neutral-400">Not specified</span>
                  )}
                </div>
              </div>

              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  Experience
                </p>
                <p className="text-sm font-medium">
                  {EXPERIENCE_LEVELS.find((l) => l.value === experienceLevel)?.label}
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  Locations
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {remote && (
                    <span className="text-xs bg-black text-white px-2.5 py-1 rounded-md">
                      Remote
                    </span>
                  )}
                  {locations.map((loc) => (
                    <span
                      key={loc}
                      className="text-xs bg-white border border-neutral-200 px-2.5 py-1 rounded-md"
                    >
                      {loc}
                    </span>
                  ))}
                  {!remote && locations.length === 0 && (
                    <span className="text-sm text-neutral-400">Not specified</span>
                  )}
                </div>
              </div>

              {(salaryMin || salaryMax) && (
                <div className="bg-neutral-50 rounded-xl p-4">
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                    Salary range
                  </p>
                  <p className="text-sm font-medium">
                    ${salaryMin || '—'} — ${salaryMax || '—'}
                  </p>
                </div>
              )}

              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.length > 0 ? (
                    skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-white border border-neutral-200 px-2.5 py-1 rounded-md"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-neutral-400">Not specified</span>
                  )}
                </div>
              </div>

              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                  Platforms
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-medium">
                    LinkedIn
                  </span>
                  <span className="text-xs bg-purple-50 text-purple-600 px-2.5 py-1 rounded-md font-medium">
                    Nakuri
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-8 bg-black text-white py-3.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              Confirm & start Wali
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep(STEPS[stepIndex - 1]?.key)}
          disabled={stepIndex === 0}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-black disabled:opacity-0 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        {currentStep !== 'confirm' && (
          <button
            onClick={() => setCurrentStep(STEPS[stepIndex + 1]?.key)}
            className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Continue
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
