import { getUser } from "@/lib/actions";
import { EditUserPageProps } from "@/types/types";
import EditUserForm from "./EditUserForm";

  

  
  export default async function EditUserPage({ params }: EditUserPageProps) {
    const user = await getUser(parseInt(params.id));
  
    return (
      <div className="container mx-auto py-10">
        <EditUserForm user={user} />
      </div>
    );
  }