import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  Upload,
  Search,
  FileText,
  ChevronDown,
  User,
  Loader,
} from 'lucide-react';
import useSubmissionForm from '../hooks/useSubmitionForm';

export default function DocumentUploadPage() {
  const {
    message,
    setMessage,

    // Composed functionality
    fileUpload,
    professorSearch,

    // Submission
    handleSubmit,
    isSubmitting,
    isSubmitDisabled,
  } = useSubmissionForm();

  const {
    selectedProfessor,
    searchQuery,
    handleProfessorSelect,
    handleSearchChange,
    loading,
    professors,
    showDropdown,
  } = professorSearch;

  const {handleFileChange, selectedFile} = fileUpload;

  console.log(professors);

  return (
    <div className="py-8 px-4">
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
          <CardContent className="p-6">
            <div className="space-y-6">
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
                      onChange={handleFileChange}
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
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Dropdown Results */}
                  {showDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          Searching...
                        </div>
                      ) : Array.isArray(professors) && professors.length > 0 ? (
                        professors.map((professor) => (
                          <div
                            key={professor.id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleProfessorSelect(professor)}>
                            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900">
                                {professor.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {professor.department}
                              </div>
                              <div className="text-xs text-gray-500">
                                {professor.email}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : searchQuery.trim().length > 2 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No professors found matching "{searchQuery}"
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* Selected Professor Display */}
                {selectedProfessor && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded">
                    <User className="h-4 w-4" />
                    <div>
                      <span className="font-medium">
                        {selectedProfessor.name}
                      </span>
                      <span className="text-blue-500 ml-2">
                        ({selectedProfessor.department})
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Section */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  maxLength={500}
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
                type="button"
                className="w-full"
                disabled={isSubmitDisabled}
                onClick={() => handleSubmit()}>
                Submit Report
                {isSubmitting && <Loader className=" animate-spin" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
