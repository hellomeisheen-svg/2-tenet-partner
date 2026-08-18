import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/moments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/moments"!</div>
}
