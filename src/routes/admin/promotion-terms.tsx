import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/promotion-terms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/promotion-terms"!</div>
}
