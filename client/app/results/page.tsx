"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getResults } from '@/lib/services/api';
import { PdfResult } from '@/lib/types';
import { ArrowLeft, Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { PdfResultItem } from '@/components/PdfResultItem';

export default function ResultsPage() {
  const [results, setResults] = useState<PdfResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();
        console.log("data in page: ",data);
        setResults(data);
        console.log("results in page: ",results);
      } catch (error) {
        console.error('Error fetching results:', error);
        toast.error('Failed to fetch results');
      } finally {
        setLoading(false);
        console.log("results: ",results);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen p-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Link href="/" className="mr-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>PDF Results</CardTitle>
          </div>
          <CardDescription>
            View assessment results for all your uploaded PDFs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                You haven't uploaded any PDFs yet
              </p>
              <Link href="/upload">
                <Button>Upload a PDF</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <PdfResultItem key={result.id} result={result} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}