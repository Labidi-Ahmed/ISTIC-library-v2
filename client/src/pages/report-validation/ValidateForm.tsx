'use client';

import type React from 'react';

import {useState} from 'react';
import {FileUp, Loader2} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {toast} from 'sonner';

// Sample data for professors - in a real app, this would come from an API or database
const professors = [
  {id: '1', name: 'Dr. Sarah Johnson', department: 'Computer Science'},
  {id: '2', name: 'Prof. Michael Chen', department: 'Electrical Engineering'},
  {id: '3', name: 'Dr. Emily Rodriguez', department: 'Data Science'},
  {id: '4', name: 'Prof. David Kim', department: 'Information Technology'},
  {id: '5', name: 'Dr. Lisa Patel', department: 'Software Engineering'},
];

// Sample data for fields of study
const fields = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Data Science',
  'Information Technology',
  'Software Engineering',
  'Artificial Intelligence',
];

export default function ReportSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    class: '',
    field: '',
    professor: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check if file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file', {
          description: 'Invalid file type',
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!file) {
      toast({
        title: 'Missing report',
        description: 'Please upload your report PDF',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.class || !formData.field || !formData.professor) {
      toast({
        title: 'Incomplete form',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Submit form
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Report submitted',
        description: 'Your report has been submitted successfully',
      });

      // Reset form
      setFile(null);
      setFormData({
        class: '',
        field: '',
        professor: '',
      });

      // Reset file input
      const fileInput = document.getElementById(
        'report-file'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 2000);
  };

  return (
    <Card className="w-full bg-muted/20">
      <CardHeader>
        <CardTitle>Validate Report</CardTitle>
        <CardDescription>
          Upload your final year report and select a professor for validation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="space-y-2">
          <div className="grid w-full gap-2">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="report-file"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-md cursor-pointer bg-muted/40 hover:bg-muted/60 border-muted-foreground/25">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-2">
                  <FileUp className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {file
                      ? file.name
                      : 'Drag and drop or click to upload your report'}
                  </p>
                  {file && (
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
                <Input
                  id="report-file"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Class */}
        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Input
            id="class"
            placeholder="e.g. CS-2023, ENG-4A"
            value={formData.class}
            onChange={(e) => setFormData({...formData, class: e.target.value})}
          />
        </div>

        {/* Field of Study */}
        <div className="space-y-2">
          <Label htmlFor="field">Field of Study</Label>
          <Select
            value={formData.field}
            onValueChange={(value) => setFormData({...formData, field: value})}>
            <SelectTrigger id="field">
              <SelectValue placeholder="Select your field of study" />
            </SelectTrigger>
            <SelectContent>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Professor Selection */}
        <div className="space-y-2">
          <Label htmlFor="professor">Professor</Label>
          <Select
            value={formData.professor}
            onValueChange={(value) =>
              setFormData({...formData, professor: value})
            }>
            <SelectTrigger id="professor">
              <SelectValue placeholder="Select a professor for validation" />
            </SelectTrigger>
            <SelectContent>
              {professors.map((professor) => (
                <SelectItem key={professor.id} value={professor.id}>
                  {professor.name} ({professor.department})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
