import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BadReq = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>400 Bad Request</AlertTitle>
          <AlertDescription>
            Oops! Something went wrong with your request. Please try again.
          </AlertDescription>
        </Alert>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BadReq;