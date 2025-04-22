"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { uploadPdf } from '@/lib/services/api';
import { WorkflowDiagram } from '@/components/WorkflowDiagram';

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
      <WorkflowDiagram />
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>
            Upload a PDF file to evaluate answers
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
    </main>
  );
}