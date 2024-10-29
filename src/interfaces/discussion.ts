import { User } from "@/entity/Sql/User"
import { DiscussionTopics } from "@/enum/discussion"
export interface discussion {
    title: string
    content: string, 
    topic: DiscussionTopics
    user: User
}