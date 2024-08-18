
import DocumentsContent from "./_components/DocumentsContent";

export default function DocumentsPage() {
  // const create = useMutation(api.documents.create)

  // const onCreate = () => {
  //   const promise = create({title:'Untitled'})

  //   toast.promise(promise,{
  //     loading:"Creating a new note...",
  //     success:"New note created",
  //     error:'Failed to create a new note'
  //   })
  // }

  return <DocumentsContent />;
}
