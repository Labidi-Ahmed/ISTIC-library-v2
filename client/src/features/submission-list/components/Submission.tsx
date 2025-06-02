'use client';

import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {
  Download,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import useSubmission from '../hooks/useSubmission';
import {Link} from 'react-router-dom';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'CHANGES_REQUESTED':
      return <XCircle className="h-5 w-5 text-red-600" />;
    case 'PENDING':
      return <Clock className="h-5 w-5 text-yellow-600" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-600" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Approved
        </Badge>
      );
    case 'CHANGES_REQUESTED':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Changes Requested
        </Badge>
      );
    case 'PENDING':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending Review
        </Badge>
      );
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Submission = () => {
  const {data, isLoading, error} = useSubmission();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p>Loading submission...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Error Loading Submission
              </h3>
              <p className="text-muted-foreground">{error.message}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Submission Found
              </h3>
              <p className="text-muted-foreground mb-4">
                You haven't created a submission yet.
              </p>
              <Button asChild>
                <Link to="/app/validation">Create Submission</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {student, professor, versions, title, createdAt, updatedAt} = data;
  const latestVersion = versions[versions.length - 1];
  console.log('Latest Version:', latestVersion);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>
                Submitted on {formatDate(createdAt.toString())} • Last updated{' '}
                {formatDate(updatedAt.toString())}
              </CardDescription>
            </div>
            {getStatusBadge(latestVersion.status)}
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={student.avatarUrl || '/placeholder.svg'}
                  alt={student.username}
                />
                <AvatarFallback>
                  {student.username
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{student.username}</p>
                <p className="text-sm text-muted-foreground">Student</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={professor.avatarUrl || '/placeholder.svg'}
                  alt={professor.username}
                />
                <AvatarFallback>
                  {professor.username
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{professor.username}</p>
                <p className="text-sm text-muted-foreground">Supervisor</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>
            {versions.length} version{versions.length !== 1 ? 's' : ''}{' '}
            submitted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {versions.map((version, index) => (
            <div key={version.id} className="space-y-4">
              {/* Student Submission */}
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 mt-1">
                  <AvatarImage
                    src={student.avatarUrl || '/placeholder.svg'}
                    alt={student.username}
                  />
                  <AvatarFallback>
                    {student.username
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{student.username}</p>
                    <span className="text-sm text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">
                      Version {index + 1}
                    </p>
                    <span className="text-sm text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(version.createdAt.toString())}
                    </p>
                    {getStatusIcon(version.status)}
                  </div>

                  {version.studentMessage && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm">{version.studentMessage}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium flex-1">
                      {version.filePath.split('/').pop()}
                    </span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Professor Response */}
              {version.professorMessage && (
                <div className="flex gap-4 ml-8">
                  <Avatar className="h-10 w-10 mt-1">
                    <AvatarImage
                      src={professor.avatarUrl || '/placeholder.svg'}
                      alt={professor.username}
                    />
                    <AvatarFallback>
                      {professor.username
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{professor.username}</p>
                      <span className="text-sm text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">Feedback</p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm">{version.professorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pending Review State */}
              {version.status === 'PENDING' && !version.professorMessage && (
                <div className="flex gap-4 ml-8">
                  <Avatar className="h-10 w-10 mt-1">
                    <AvatarImage
                      src={professor.avatarUrl || '/placeholder.svg'}
                      alt={professor.username}
                    />
                    <AvatarFallback>
                      {professor.username
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <p className="font-medium">{professor.username}</p>
                      <span className="text-sm text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">
                        Review pending
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          Waiting for professor review...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {index < versions.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {latestVersion.status !== 'APPROVED' && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Button
                disabled={latestVersion.status === 'PENDING'}
                className="flex-1">
                <Link to="/app/validation">Submit New Version</Link>
              </Button>
              <Button variant="outline">Contact Professor</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Submission;
