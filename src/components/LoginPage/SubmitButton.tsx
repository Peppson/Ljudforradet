import React from "react";
import { Button, Spinner } from "react-bootstrap";

interface SubmitButtonProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export default function SubmitButton({ isLoading, children }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="btn btn-primary py-2 rounded-3"
      disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner
            animation="border"
            size="sm"
            role="status"
            variant="dark"
          />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
