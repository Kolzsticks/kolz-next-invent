import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AccessDenied = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Access Denied
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 mt-[-5px]" />
          <AlertDescription>
            You do not have permission to view this page.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AccessDenied;
