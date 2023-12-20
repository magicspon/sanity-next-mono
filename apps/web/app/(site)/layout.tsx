export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="grow">{children}</main>
}
