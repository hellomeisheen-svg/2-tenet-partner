import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/service-certificate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/service-certificate"!</div>
}
