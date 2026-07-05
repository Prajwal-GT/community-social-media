import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

export default function MainLayout({ children, selectedCommunity, onSelectCommunity, selectedWorkspace, onSelectWorkspace }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="mx-auto grid max-w-[1480px] gap-6 px-4 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <aside className="hidden xl:block">
            <div className="sticky top-6 space-y-5">
              <div className="rounded-[32px] border border-slate-800/70 bg-slate-900/75 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
                <Sidebar selectedCommunity={selectedCommunity} onSelectCommunity={onSelectCommunity} selectedWorkspace={selectedWorkspace} onSelectWorkspace={onSelectWorkspace} />
              </div>
            </div>
          </aside>

          <section className="space-y-6">{children}</section>

          <aside className="hidden xl:block">
            <div className="sticky top-6 space-y-5">
              <div className="rounded-[32px] border border-slate-800/70 bg-slate-900/75 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
                <RightSidebar />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}