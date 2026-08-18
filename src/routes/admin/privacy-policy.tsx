import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/privacy-policy"!</div>
}
