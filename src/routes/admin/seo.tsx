import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/seo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/seo"!</div>
}
