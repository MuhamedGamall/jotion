export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className=" dark:bg-[#1F1F1F]">{children}</div>;
}
