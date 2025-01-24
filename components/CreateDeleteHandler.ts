import { toast } from "sonner"; // Assuming you're using shadcn/ui toast

// Type for the delete function
type DeleteFunction = (id: number) => Promise<{
  success: boolean;
  error?: string;
}>;

// Generic delete handler
export function createDeleteHandler<T extends { id: number }>(
  deleteFunc: DeleteFunction,
  successMessage: string,
  errorMessage: string,
  onSuccessCallback?: (deletedItems: T[]) => void
) {
  return async (selectedRows: T[]): Promise<void> => { // Explicitly return Promise<void>
    const deletePromise = Promise.all(
      selectedRows.map(async (item) => {
        const result = await deleteFunc(item.id);

        if (!result.success) {
          throw new Error(result.error || errorMessage);
        }

        return item; // This is fine because we're using it internally
      })
    );

    toast.promise(deletePromise, {
      loading: 'Deleting selected items...',
      success: () => {
        if (onSuccessCallback) {
          onSuccessCallback(selectedRows); // Call the callback if provided
        }
        return successMessage;
      },
      error: (error) => error.message || errorMessage,
    });

    await deletePromise; // Ensure the function resolves to void
  };
}


