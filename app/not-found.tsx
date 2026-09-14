import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="m-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center">
      <p className="text-sm text-fd-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold">页面未找到</h1>
      <p>请通过文档导航查找内容，或返回首页。</p>
      <Link href="/" className="rounded-full bg-fd-primary px-6 py-3 text-fd-primary-foreground">返回首页</Link>
    </main>
  );
}
