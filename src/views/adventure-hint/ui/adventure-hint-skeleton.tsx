/** 라우트 loading.tsx용. AdventureHintView의 제목과 로드뷰 자리를 같은 배치로 채움 */
export default function AdventureHintSkeleton() {
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 flex-col items-center px-page pt-[max(--spacing(16),calc(--spacing(5)+var(--safe-top)))] pb-4">
        <h1 className="text-point text-primary-400">ADVENTURE MODE</h1>
      </header>
      <section className="relative min-h-0 flex-1 bg-natural-500" />
    </main>
  );
}
