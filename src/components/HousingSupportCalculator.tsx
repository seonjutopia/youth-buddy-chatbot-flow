
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, ExternalLink, Download, Calendar } from 'lucide-react';
import { HousingSupportChart } from './HousingSupportChart';

interface CalculatorData {
  monthlyRent: number;
  income: number;
  householdSize: number;
}

interface SupportResult {
  supportAmount: number;
  personalContribution: number;
  loanLimit: number;
}

export const HousingSupportCalculator = () => {
  const [data, setData] = useState<CalculatorData>({
    monthlyRent: 50,
    income: 200,
    householdSize: 1
  });

  // Calculate support results based on input data
  const monthlyRentResult = useMemo((): SupportResult => {
    const baseSupport = Math.min(data.monthlyRent * 0.6, 30); // 60% up to 30만원
    const incomeAdjustment = data.income > 250 ? 0.8 : 1.0; // Reduce for higher income
    const householdBonus = (data.householdSize - 1) * 2; // 2만원 per additional member
    
    const supportAmount = Math.min(baseSupport * incomeAdjustment + householdBonus, 35);
    const personalContribution = data.monthlyRent - supportAmount;
    
    return {
      supportAmount: Math.max(0, supportAmount),
      personalContribution: Math.max(0, personalContribution),
      loanLimit: 0
    };
  }, [data]);

  const depositLoanResult = useMemo((): SupportResult => {
    const maxLoan = data.householdSize === 1 ? 1200 : 1500; // 1200-1500만원
    const incomeRatio = Math.min(data.income / 300, 1); // Income ratio factor
    const loanLimit = maxLoan * incomeRatio;
    
    return {
      supportAmount: 0,
      personalContribution: 0,
      loanLimit: Math.max(0, loanLimit)
    };
  }, [data]);

  const handleDownload = (type: 'png' | 'pdf') => {
    // Placeholder for download functionality
    console.log(`Downloading as ${type.toUpperCase()}...`);
    alert(`시뮬레이션 결과를 ${type.toUpperCase()}로 다운로드합니다.`);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <Calculator className="w-5 h-5" />
          <span>주거 지원비 계산기</span>
        </CardTitle>
        <p className="text-sm text-blue-700">
          월세·소득·가구원 정보를 입력하시면 맞춤형 지원금액을 확인하실 수 있습니다.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Controls */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              월세 금액: {data.monthlyRent}만원
            </label>
            <Slider
              value={[data.monthlyRent]}
              onValueChange={([value]) => setData(prev => ({ ...prev, monthlyRent: value }))}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              월 소득: {data.income}만원
            </label>
            <Slider
              value={[data.income]}
              onValueChange={([value]) => setData(prev => ({ ...prev, income: value }))}
              max={500}
              min={100}
              step={10}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              가구원 수: {data.householdSize}명
            </label>
            <Slider
              value={[data.householdSize]}
              onValueChange={([value]) => setData(prev => ({ ...prev, householdSize: value }))}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">월세 지원</TabsTrigger>
            <TabsTrigger value="deposit">전세자금 대출</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="space-y-4">
            <HousingSupportChart
              data={[
                { name: '지원금액', value: monthlyRentResult.supportAmount, color: '#3b82f6' },
                { name: '본인부담금', value: monthlyRentResult.personalContribution, color: '#f59e0b' }
              ]}
              title="월세 지원 시나리오"
            />
            <div className="bg-white rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">월 지원금액:</span>
                <span className="font-semibold text-blue-600">{monthlyRentResult.supportAmount.toFixed(0)}만원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">본인 부담금:</span>
                <span className="font-semibold text-orange-600">{monthlyRentResult.personalContribution.toFixed(0)}만원</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deposit" className="space-y-4">
            <HousingSupportChart
              data={[
                { name: '대출 한도', value: depositLoanResult.loanLimit, color: '#10b981' }
              ]}
              title="전세자금 대출 한도"
            />
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">최대 대출 한도:</span>
                <span className="font-semibold text-green-600">{depositLoanResult.loanLimit.toFixed(0)}만원</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
            <ExternalLink className="w-4 h-4 mr-2" />
            지원 공고 보기
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDownload('png')}>
              <Download className="w-4 h-4 mr-1" />
              PNG 저장
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDownload('pdf')}>
              <Download className="w-4 h-4 mr-1" />
              PDF 저장
            </Button>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Calendar className="w-4 h-4 mr-2" />
            상담 신청
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
