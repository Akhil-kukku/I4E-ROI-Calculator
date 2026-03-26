"use client";

import { useEffect, useMemo, useState } from "react";

import { AffordabilityPanel } from "@/components/calculator/AfordabilityPanel";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { ResultsPanel } from "@/components/calculator/ResultsPanel";
import { Header } from "@/components/layout/Header";
import { InfoCards } from "@/components/sidebar/InfoCards";
import { getCatalogOptions, getColleges, getCourses } from "@/services/catalog";
import { calculateRoi } from "@/services/roi";
import type { CalculatorFormState, RoiRequest, RoiResponse, StudyLevel } from "@/types/roi";

const initialFormState: CalculatorFormState = {
  country: "",
  stream: "",
  level: "UG",
  collegeName: "",
  courseName: "",
  targetYear: 2031,
  monthlyInvestment: "",
  currentSavings: "0",
  showLivingCost: true,
  expectedReturnRate: 12,
  scholarshipPercent: "0",
};

export function CalculatorShell() {
  const [values, setValues] = useState<CalculatorFormState>(initialFormState);
  const [result, setResult] = useState<RoiResponse | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState("INR");
  const [countries, setCountries] = useState<string[]>([]);
  const [streams, setStreams] = useState<string[]>([]);
  const [levels, setLevels] = useState<StudyLevel[]>(["UG", "PG"]);
  const [colleges, setColleges] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const options = await getCatalogOptions();
        setCountries(options.countries);
        setStreams(options.streams);
        const nextLevels = options.levels.filter((level): level is StudyLevel => level === "UG" || level === "PG");
        if (nextLevels.length > 0) {
          setLevels(nextLevels);
        }
        setValues((prev) => ({
          ...prev,
          country: prev.country || options.countries[0] || "",
          stream: prev.stream || options.streams[0] || "",
          level: prev.level || (nextLevels[0] ?? "UG"),
        }));
      } catch (unknownError) {
        console.error(unknownError);
        setError("Unable to load catalog options.");
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    async function loadColleges() {
      if (!values.country || !values.stream || !values.level) {
        return;
      }
      try {
        const items = await getColleges({
          country: values.country,
          stream: values.stream,
          level: values.level,
        });
        setColleges(items);
        setValues((prev) => ({
          ...prev,
          collegeName: items.includes(prev.collegeName) ? prev.collegeName : (items[0] ?? ""),
        }));
      } catch (unknownError) {
        console.error(unknownError);
      }
    }

    loadColleges();
  }, [values.country, values.stream, values.level]);

  useEffect(() => {
    async function loadCourses() {
      if (!values.country || !values.stream || !values.level || !values.collegeName) {
        return;
      }
      try {
        const items = await getCourses({
          country: values.country,
          stream: values.stream,
          level: values.level,
          college_name: values.collegeName,
        });
        setCourses(items);
        setValues((prev) => ({
          ...prev,
          courseName: items.includes(prev.courseName) ? prev.courseName : (items[0] ?? ""),
        }));
      } catch (unknownError) {
        console.error(unknownError);
      }
    }

    loadCourses();
  }, [values.country, values.stream, values.level, values.collegeName]);

  const requestPayload = useMemo<RoiRequest>(
    () => ({
      country: values.country,
      stream: values.stream,
      level: values.level,
      college_name: values.collegeName,
      course_name: values.courseName,
      target_year: values.targetYear,
      monthly_investment: values.monthlyInvestment ? Number(values.monthlyInvestment) : undefined,
      current_savings: Number(values.currentSavings || 0),
      show_living_cost: values.showLivingCost,
      expected_return_rate: values.expectedReturnRate,
      scholarship_percent: Number(values.scholarshipPercent || 0),
    }),
    [values],
  );

  const handleCalculate = async () => {
    if (!values.collegeName || !values.courseName) {
      setError("Select a college and course before calculating.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const data = await calculateRoi(requestPayload);
      setResult(data);
    } catch (unknownError) {
      setError("We could not calculate ROI right now. Please verify your inputs and try again.");
      setResult(null);
      console.error(unknownError);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb]">
      <Header />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <CalculatorForm
            values={values}
            pending={pending}
            countries={countries}
            streams={streams}
            levels={levels}
            colleges={colleges}
            courses={courses}
            onChange={setValues}
            onSubmit={handleCalculate}
          />
          {error && <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <ResultsPanel
            result={result}
            showLivingCost={values.showLivingCost}
            onToggleLivingCost={() => setValues((prev) => ({ ...prev, showLivingCost: !prev.showLivingCost }))}
            currency={currency}
            onCurrencyChange={setCurrency}
          />
          <AffordabilityPanel result={result} returnRate={values.expectedReturnRate} />
        </div>
        <InfoCards />
      </main>
    </div>
  );
}
