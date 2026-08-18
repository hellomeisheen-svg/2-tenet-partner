import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/lead-form')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/lead-form"!</div>
}
