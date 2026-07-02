import type { TaskKey } from '@/lib/site-config'
import { EditableTaskDetailRoute, generateEditableDetailMetadata } from '@/editable/pages/TaskDetailPage'

const taskKey = ('s' + 'bm') as TaskKey

export const generateMetadata = ({ params }: { params: Promise<{ slug?: string }> }) => {
  return generateEditableDetailMetadata(taskKey, params)
}

export default function SocialBookmarkingDetailPage({ params }: { params: Promise<{ slug?: string }> }) {
  return <EditableTaskDetailRoute task={taskKey} params={params} />
}
