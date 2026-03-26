import type { RoiResponse } from "@/types/roi";
import { formatCurrency } from "@/utils/format";

interface ResultsPanelProps {
  result: RoiResponse | null;
  showLivingCost: boolean;
  onToggleLivingCost: () => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export function ResultsPanel({
  result,
  showLivingCost,
  onToggleLivingCost,
  currency,
  onCurrencyChange,
}: ResultsPanelProps) {
  const educationCurrent = result ? result.breakdown.tuition * result.breakdown.duration : 0;
  const livingCurrent = result ? result.breakdown.living * result.breakdown.duration : 0;
  const livingFuture = showLivingCost ? livingCurrent : 0;
  const educationFuture = result ? result.future_cost - livingFuture : 0;

  return (
    <div className="mt-6 rounded border border-gray-300 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold text-blue-900">Edu Cost Calculator Result</h2>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="font-medium text-blue-700">Show Living Cost</span>

        <div className="flex items-center gap-2">
          <span>No</span>
          <input type="checkbox" checked={showLivingCost} onChange={onToggleLivingCost} />
          <span>Yes</span>
        </div>

        <select className="border border-gray-300 px-2 py-1 text-sm" value={currency} onChange={(event) => onCurrencyChange(event.target.value)}>
          <option>INR</option>
          <option>USD</option>
          <option>CAD</option>
        </select>
      </div>

      <div className="border-t border-blue-900" />

      {!result && <p className="mt-3 text-sm text-gray-500">Run a calculation to view costs and projection.</p>}

      {result && (
        <>
          <div className="grid grid-cols-3 py-3 text-xs font-semibold text-blue-900">
            <span>DETAILS</span>
            <span className="text-center">CURRENT COST</span>
            <span className="text-right">FUTURE COST</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3">
              <span>Total Education Cost</span>
              <span className="text-center font-semibold">{formatCurrency(educationCurrent, currency)}</span>
              <span className="text-right font-semibold">{formatCurrency(educationFuture, currency)}</span>
            </div>

            <div className="grid grid-cols-3">
              <span>Total Living Cost</span>
              <span className="text-center font-semibold">{formatCurrency(livingCurrent, currency)}</span>
              <span className="text-right font-semibold">{formatCurrency(livingFuture, currency)}</span>
            </div>

            <div className="grid grid-cols-3 border-t border-gray-300 pt-2 font-semibold">
              <span>Total Cost :</span>
              <span className="text-center">{formatCurrency(result.current_cost, currency)}</span>
              <span className="text-right text-blue-900">{formatCurrency(result.future_cost, currency)}</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">Note: The cost mentioned are indicative based on available institutional dataset values.</p>
        </>
      )}
    </div>
  );
}
