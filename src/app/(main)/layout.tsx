import PageTransition from "@/components/layout/PageTransition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-grow flex flex-col relative pt-24 pb-8 px-6 max-w-7xl mx-auto w-full h-full">
        <PageTransition>{children}</PageTransition>
      </div>
    </>
  );
}
