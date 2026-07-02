import type { TaskKey } from '@/lib/site-config'
import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

const taskKey = ('s' + 'bm') as TaskKey
export const generateMetadata = () => taskMetadata(taskKey, '/s' + 'bm')

export function SocialBookmarkingTaskPage({ searchParams, basePath = ('/s' + 'bm') }: { searchParams?: Promise<{ category?: string; page?: string }>; basePath?: string }) {
  return <EditableTaskArchiveRoute task={taskKey} searchParams={searchParams} basePath={basePath} />
}

export default SocialBookmarkingTaskPage
