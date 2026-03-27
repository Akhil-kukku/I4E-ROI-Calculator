import type { CalculatorFormState, StudyLevel } from "@/types/roi";

interface CalculatorFormProps {
  values: CalculatorFormState;
  pending: boolean;
  countries: string[];
  streams: string[];
  levels: StudyLevel[];
  colleges: string[];
  courses: string[];
  onChange: (next: CalculatorFormState) => void;
  onSubmit: () => void;
}

export function CalculatorForm({
  values,
  pending,
  countries,
  streams,
  levels,
  colleges,
  courses,
  onChange,
  onSubmit,
}: CalculatorFormProps) {
  return (
    <section className="mb-6 rounded border border-gray-300 bg-white p-4">
      <h1 className="mb-3 text-xl font-semibold text-blue-900">Edu Cost Calculator</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <label>
          <span className="mb-1 block text-xs text-gray-600">Preferred Country</span>
          <select
            value={values.country}
            onChange={(e) => onChange({ ...values, country: e.target.value })}
            className="input"
          >
            {countries.length === 0 && <option value="">Select Country</option>}
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs text-gray-600">Preferred Stream</span>
          <select
            value={values.stream}
            onChange={(e) => onChange({ ...values, stream: e.target.value })}
            className="input"
          >
            {streams.length === 0 && <option value="">Select Stream</option>}
            {streams.map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs text-gray-600">Level</span>
          <select
            value={values.level}
            onChange={(e) => onChange({ ...values, level: e.target.value as StudyLevel })}
            className="input"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs text-gray-600">Preferred College</span>
          <select
            value={values.collegeName}
            onChange={(e) => onChange({ ...values, collegeName: e.target.value, courseName: "" })}
            className="input"
          >
            {colleges.length === 0 && <option value="">Select College</option>}
            {colleges.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs text-gray-600">Target Year</span>
          <input
            className="input"
            type="number"
            value={values.targetYear}
            onChange={(e) => onChange({ ...values, targetYear: Number(e.target.value) })}
            min={new Date().getFullYear()}
          />
        </label>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-5">
        <label>
          <span className="mb-1 block text-xs text-gray-600">Preferred Course</span>
          <select
            value={values.courseName}
            onChange={(e) => onChange({ ...values, courseName: e.target.value })}
            className="input"
          >
            {courses.length === 0 && <option value="">Select Course</option>}
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs text-gray-600">Monthly SIP</span>
          <input
            className="input"
            type="number"
            min={0}
            value={values.monthlyInvestment}
            onChange={(e) => onChange({ ...values, monthlyInvestment: e.target.value })}
            placeholder="Optional"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs text-gray-600">Current Savings</span>
          <input
            className="input"
            type="number"
            min={0}
            value={values.currentSavings}
            onChange={(e) => onChange({ ...values, currentSavings: e.target.value })}
          />
        </label>

        <label>
          <span className="mb-1 block text-xs text-gray-600">Expected Return (%)</span>
          <input
            className="input"
            type="number"
            min={0}
            max={100}
            value={values.expectedReturnRate}
            onChange={(e) => onChange({ ...values, expectedReturnRate: Number(e.target.value) })}
          />
        </label>

        <div className="flex items-end gap-2">
          <label className="w-full">
            <span className="mb-1 block text-xs text-gray-600">Scholarship (%)</span>
            <input
              className="input"
              type="number"
              min={0}
              max={100}
              value={values.scholarshipPercent}
              onChange={(e) => onChange({ ...values, scholarshipPercent: e.target.value })}
            />
          </label>
          <button
            className="rounded bg-blue-900 px-4 py-1.5 text-sm text-white"
            onClick={onSubmit}
            disabled={pending}
            type="button"
          >
            {pending ? "..." : "CALCULATE"}
          </button>
        </div>
      </div>
    </section>
  );
}
