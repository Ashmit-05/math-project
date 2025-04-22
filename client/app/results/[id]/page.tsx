"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getResultById } from '@/lib/services/api';
import { PdfResult } from '@/lib/types';
import { ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

export default function ResultDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [result, setResult] = useState<PdfResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getResultById(params.id);
        setResult(data);
      } catch (error) {
        console.error('Error fetching result:', error);
        toast.error('Failed to fetch result details');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [params.id]);

  return (
    <div className="min-h-screen p-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Link href="/results" className="mr-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>PDF Result Details</CardTitle>
          </div>
          <CardDescription>
            Detailed assessment information for this PDF
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !result ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Result not found</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                The requested PDF result could not be found
              </p>
              <Link href="/results">
                <Button>Back to Results</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{result.name}</h2>
                  <p className="text-muted-foreground">
                    {formatDate(new Date(result.createdAt))}
                  </p>
                </div>
                <div className="bg-primary/10 text-primary rounded-full px-4 py-2 text-xl font-bold">
                  {result.actual_score}%
                </div>
              </div>
              
              <div className="border rounded-lg p-6 bg-muted/20">
                <h3 className="text-lg font-medium mb-4">Evaluations</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(result.evaluations).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-background rounded border">
                      <span>Question {key}</span>
                      <span className="font-medium">{value.marks || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}