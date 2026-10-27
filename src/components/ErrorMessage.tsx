
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type Props = { message: string; onRetry: () => void };

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <Alert variant="destructive">
      <AlertDescription className="flex flex-col items-start gap-3">
        {message}
        <Button type="button" variant="outline" onClick={onRetry}>
          Försök igen
        </Button>
      </AlertDescription>
    </Alert>
  );
}