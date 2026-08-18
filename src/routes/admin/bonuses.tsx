import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/bonuses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/bonuses"!</div>
}
