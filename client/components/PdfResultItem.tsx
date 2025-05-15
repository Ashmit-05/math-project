import { useState } from 'react';
import Link from 'next/link';
import { PdfResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Evaluation {
  answer_number: number;
  marks: number;
  is_correct: boolean;
  reason: string;
}

interface PdfResultItemProps {
  result: PdfResult;
}

export function PdfResultItem({ result }: PdfResultItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedReasons, setExpandedReasons] = useState<number[]>([]);

  const toggleReason = (answerNumber: number) => {
    setExpandedReasons(prev => 
      prev.includes(answerNumber) 
        ? prev.filter(n => n !== answerNumber)
        : [...prev, answerNumber]
    );
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <h3 className="font-medium text-lg truncate">{result.name}</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{result.actual_score}</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
            
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {isExpanded ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t p-4 bg-muted/20">
            <h4 className="font-medium mb-3">Question Evaluations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.evaluations.evaluations.map((evaluation: Evaluation) => (
                <div 
                  key={evaluation.answer_number} 
                  className="flex flex-col gap-2 p-2 bg-background rounded border"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Answer {evaluation.answer_number}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{evaluation.marks} marks</span>
                      {evaluation.reason && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleReason(evaluation.answer_number)}
                        >
                          {expandedReasons.includes(evaluation.answer_number) ? 'Hide' : 'Show'} Reason
                        </Button>
                      )}
                    </div>
                  </div>
                  {expandedReasons.includes(evaluation.answer_number) && evaluation.reason && (
                    <p className="text-sm text-muted-foreground mt-1">{evaluation.reason}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}