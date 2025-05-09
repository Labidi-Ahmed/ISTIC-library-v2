import {useState, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Upload, FileText} from 'lucide-react';
import {useDropzone} from 'react-dropzone';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {useSubmitReport} from '@/hooks/useSubmitReport';
import {ReportSchema} from '@/zod';

export type FormValues = z.infer<typeof ReportSchema>;

export default function SubmitReportPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const {mutate: uploadReport, isPending} = useSubmitReport();

  const form = useForm<FormValues>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      description: '',
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        form.setValue('pdfFile', file, {shouldValidate: true});
      }
    },
    [form]
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    uploadReport(data);
  };

  const classes = ["Bachelor's", "Master's", 'PhD'];
  const fields = ['GLSI', 'ISI', 'IOT', 'LAII', 'LT'];

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-xl mx-auto bg-muted/20">
        <CardHeader>
          <CardTitle className="text-2xl">Submit Final Year Report</CardTitle>
          <CardDescription>
            Upload your end of study report in PDF format along with relevant
            details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-muted/40 transition-colors ${
                      isDragActive
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-muted/50'
                    }`}>
                    <input {...getInputProps()} />
                    {fileName ? (
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="h-10 w-10 text-primary" />
                        <span className="text-sm font-medium">{fileName}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFileName(null);
                            form.setValue(
                              'pdfFile',
                              new File([], '', {type: 'application/pdf'}),
                              {
                                shouldValidate: true,
                              }
                            );
                          }}>
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {isDragActive
                            ? 'Drop the PDF file here'
                            : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          PDF File
                        </span>
                      </div>
                    )}
                  </div>
                  {form.formState.errors.pdfFile && (
                    <p className="text-sm text-red-500 mt-2">
                      {form.formState.errors.pdfFile.message}
                    </p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="class"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((className) => (
                            <SelectItem key={className} value={className}>
                              {className}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="field"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your field of study" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fields.map((fieldName) => (
                            <SelectItem key={fieldName} value={fieldName}>
                              {fieldName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your report and its findings..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a brief summary of your report (10-500
                        characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit Report'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
