import type { RoiResponse } from "@/types/roi";
import { formatCurrency } from "@/utils/format";

interface AffordabilityPanelProps {
  result: RoiResponse | null;
  returnRate: number;
}

export function AffordabilityPanel({ result, returnRate }: AffordabilityPanelProps) {
  if (!result) {
    return null;
  }

  return (
    <section className="rounded border border-gray-300 bg-white p-4 text-center">
      <h3 className="text-2xl font-semibold text-[#2d86d7]">Do you have any existing investment for your child?</h3>
      <p className="mt-5 text-3xl font-semibold text-[#152d4f]">
        You will need to invest <span className="text-[#18b8b6]">{formatCurrency(result.monthly_sip_required)}</span> / Month
      </p>
      <p className="mt-1 text-lg text-gray-500">for next {result.breakdown.duration + 1} Year(s)</p>

      <div className="mx-auto mt-6 h-2 w-full max-w-[380px] rounded bg-[#d8eaf9]">
        <div className="h-2 rounded bg-[#2a8be4]" style={{ width: `${Math.min(returnRate, 100)}%` }} />
      </div>
      <p className="mt-2 text-2xl font-semibold text-[#2d5d93]">Returns ({returnRate}%)</p>

      <div className="mx-auto mt-6 grid w-full max-w-[420px] gap-3">
        <button className="rounded-md bg-[#2a9ce9] py-3 text-lg font-semibold text-white">Check Affordability</button>
        <button className="rounded-md bg-[#2a9ce9] py-3 text-lg font-semibold text-white">Save Goal</button>
      </div>
    </section>
  );
}
