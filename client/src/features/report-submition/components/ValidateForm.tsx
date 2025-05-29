import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Upload, Search, FileText, ChevronDown} from 'lucide-react';

export default function DocumentUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState<string | null>(
    null
  );
  return (
    <div className=" py-8 px-4 ">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit your report for validation
          </h1>
          <p className="text-gray-600">
            Upload your PDF report and select a professor to submit to
          </p>
        </div>

        <Card>
          <CardContent>
            <form className="space-y-6">
              {/* File Upload Section */}
              <div className="space-y-2">
                <Label htmlFor="pdf-upload" className="text-sm font-medium">
                  Upload PDF Document
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      className="cursor-pointer"
                    />
                  </div>
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                    <FileText className="h-4 w-4" />
                    <span>
                      {selectedFile.name} (
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}
              </div>

              {/* Professor Search Section */}
              <div className="space-y-2">
                <Label
                  htmlFor="professor-search"
                  className="text-sm font-medium">
                  Select Professor
                </Label>
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="professor-search"
                      type="text"
                      placeholder="Search professors by name or department..."
                      className="pl-10 pr-10"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Dropdown Results */}
                </div>
              </div>

              {/* Message Section */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Add a message for the professor (optional)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <div className="text-xs text-gray-500 text-right">
                  {message.length}/500 characters
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!selectedFile || !selectedProfessor}>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
