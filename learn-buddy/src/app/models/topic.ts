export type TopicSatus='done' | 'in-progress' | 'not-started';
export interface Topic
{
    no:number;
    title:string;
    status:TopicSatus;
    subTopicsDone:number;
    subTopicsTotal:number;
}