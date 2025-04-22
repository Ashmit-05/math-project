"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { uploadPdf } from '@/lib/services/api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) {
      toast.error('Please select a file and enter a name');
      return;
    }

    setLoading(true);
    try {
      await uploadPdf(file, name);
      toast.success('PDF uploaded successfully');
      router.push('/results');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast.error('Failed to upload PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Math PDF Evaluator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-6 w-6 text-primary" />
                <CardTitle>Upload PDF</CardTitle>
              </div>
              <CardDescription>
                Upload a new PDF file to evaluate answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name for this PDF"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">PDF File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload PDF
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* View Results Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>View Results</CardTitle>
              </div>
              <CardDescription>
                Check evaluation results for previously uploaded PDFs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Access detailed evaluations, scores, and feedback for all your uploaded PDFs.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => router.push('/results')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View All Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}