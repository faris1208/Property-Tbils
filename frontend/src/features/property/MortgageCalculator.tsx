'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export function MortgageCalculator({ price }: { price: number }) {
  const [loanAmount, setLoanAmount] = useState(price * 0.8);
  const [rate, setRate] = useState(18);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState<number | null>(null);

  const calculate = () => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const m = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthly(m);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Mortgage Estimator</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label className="text-xs">Loan Amount (NGN)</Label>
          <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs">Interest Rate (%)</Label>
          <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs">Loan Term (Years)</Label>
          <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1" />
        </div>
      </div>
      <Button onClick={calculate} variant="outline" className="w-full mb-3">Calculate</Button>
      {monthly !== null && (
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Estimated monthly payment</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(monthly)}</p>
          <p className="text-xs text-muted-foreground mt-1">This is an estimate only. Consult your bank for actual rates.</p>
        </div>
      )}
    </div>
  );
}
