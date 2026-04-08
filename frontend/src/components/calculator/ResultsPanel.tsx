import type { RoiResponse } from "@/types/roi";
import { formatCurrency, formatPercent } from "@/utils/format";

interface ResultsPanelProps {
  result: RoiResponse | null;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export function ResultsPanel({ result, currency, onCurrencyChange }: ResultsPanelProps) {

  return (
    <div className="mt-6 rounded border border-gray-300 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold text-blue-900">Edu Cost Calculator Result</h2>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="font-medium text-blue-700">Results Summary</span>

        <select className="border border-gray-300 px-2 py-1 text-sm" value={currency} onChange={(event) => onCurrencyChange(event.target.value)}>
          <option>INR</option>
          <option>USD</option>
          <option>CAD</option>
        </select>
      </div>

      <div className="border-t border-blue-900" />

      {!result && <p className="mt-3 text-sm text-gray-500">Run a calculation to view total cost, ROI, and payback years.</p>}

      {result && (
        <>
          <div className="grid grid-cols-3 py-3 text-xs font-semibold text-blue-900">
            <span>DETAILS</span>
            <span className="text-center">VALUE</span>
            <span className="text-right">SOURCE</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3">
              <span>Total Cost (Current)</span>
              <span className="text-center font-semibold">{formatCurrency(result.current_cost, currency)}</span>
              <span className="text-right text-gray-500">Calculated</span>
            </div>

            <div className="grid grid-cols-3">
              <span>Total Cost (Future)</span>
              <span className="text-center font-semibold">{formatCurrency(result.future_cost, currency)}</span>
              <span className="text-right text-gray-500">Calculated</span>
            </div>

            <div className="grid grid-cols-3">
              <span>ROI</span>
              <span className="text-center font-semibold">{formatPercent(result.dataset_roi)}</span>
              <span className="text-right text-gray-500">Dataset</span>
            </div>

            <div className="grid grid-cols-3 border-t border-gray-300 pt-2 font-semibold">
              <span>Payback Years</span>
              <span className="text-center">{result.dataset_payback_years.toFixed(2)} years</span>
              <span className="text-right text-gray-500">Dataset</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">Note: The cost mentioned are indicative based on available institutional dataset values.</p>
        </>
      )}
    </div>
  );
}
