import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/trust')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/trust"!</div>
}
