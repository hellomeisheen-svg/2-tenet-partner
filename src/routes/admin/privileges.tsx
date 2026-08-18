import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/privileges')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/privileges"!</div>
}
